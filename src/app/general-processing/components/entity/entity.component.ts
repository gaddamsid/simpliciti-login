import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../shared/Components/header/languages.service';
import { GlobalFormats } from '../../enums/global.formats';
import { Entity } from '../../models/entity.model';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { GPStateService } from '../../services/g-p-state.service';
import { PaginationControls } from '../../models/pagination-controls.model';
import { GPService } from '../../services/g-p.service';
import { PaymentCartService } from 'src/app/shared/services/payment-cart.service';
import { ToastrService } from 'ngx-toastr';
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
  providers: [DatePipe]
})

export class EntityComponent implements OnInit {
  paginationDetails!: PaginationControls;

  @ViewChild('pdfTable') pdfTable!: ElementRef;
  entityData: Entity[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns = ['select', 'plateNumber', 'name', 'vehicleInfo', 'dateOfBirth', 'addressInfo', 'amountDue', 'iconMenu'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  isLoading = false;

  constructor(public translate: TranslateService,
    private router: Router,
    private datePipe: DatePipe,
    private gpService: GPService,
    private gpStateService: GPStateService,
    private paymentCartService: PaymentCartService,
    private notificationService: ToastrService,
    private language: LanguageService) { }

  ngOnInit(): void {
    this.language.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    this.gpStateService.searchResults$.subscribe(s => {
      this.entityData = s.entity;
      this.loadTableData(s.entity);
    });
    this.gpStateService.onPaginationChange$.subscribe(s => {
      this.paginationDetails = s;
    });
  }

  loadTableData(data: Entity[]) {
    data?.forEach((s: Entity) => {
      s.dateOfBirth = s.dateOfBirth ? this.datePipe.transform(s.dateOfBirth, GlobalFormats.dateOnly) : '';
      s.effectiveDate = s.effectiveDate ? this.datePipe.transform(s.effectiveDate, GlobalFormats.dateOnly) : '';
      s.addressInfo = this.bindingAddress(s);
      s.vehicleInfo = this.bindingVehicleInfo(s);
    });
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.predicateFilter;
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }

  appendLang(lang: string) {
    this.translate.use(lang);
    this.setPagelabel(lang);
  }

  setPagelabel(lang: any) {
    this.translate.use(lang).subscribe((res: any) => {
      this.dataSource.paginator = this.paginator;
      const alertMsg = this.translate.instant("Items per page", { msg: '' });
      this.dataSource.paginator._intl.itemsPerPageLabel = alertMsg;
    });
  }

  onClickPlateNumber(entityData: any) {
    let type: any = 'entity';
    this.router.navigateByUrl(`gp/search/entity-details/${type}/${entityData.plateNumber}`)
  }

  predicateFilter(rowData: any, filterValue: string): boolean {
    const addressKeys = ['fullName', 'streetLine1', 'city', 'state', 'zipCode'];
    const vehicleKeys = ['make', 'model', 'color', 'year'];
    return Object.keys(rowData).some(s => (rowData[s]?.toString().toLowerCase().includes(filterValue)))
      || (rowData?.address && addressKeys.some(s => (rowData?.address[s]?.toString().toLowerCase().includes(filterValue))))
      || (rowData?.vehicle && vehicleKeys.some(s => (rowData[s]?.toString().toLowerCase().includes(filterValue))))
  }

  bindingAddress(row: any): string {
    const streetLine1 = row.address?.streetLine1 ? (row.address?.streetLine1) : '';
    const streetLine2 = row.address?.streetLine2 ? (', ' + row.address?.streetLine2) : '';
    const streetLine3 = row.address?.streetLine3 ? (', ' + row.address?.streetLine3) : '';
    const city = row.address?.city ? (', ' + row.address?.city) : '';
    const state = row.address?.state ? (', ' + row.address?.state) : '';
    const zipCode = row.address?.zipCode ? (', ' + row.address?.zipCode) : '';
    return String(streetLine1) + String(streetLine2) + String(streetLine3) + String(city) + String(state) + String(zipCode);
  }

  bindingVehicleInfo(row: any): string {
    const make = row.vehicle?.make ? (row.vehicle?.make) : '';
    const model = row.vehicle?.model ? (', ' + row.vehicle?.model) : '';
    const color = row.vehicle?.color ? (', ' + row.vehicle?.color) : '';
    const year = row.vehicle?.year ? (', ' + row.vehicle?.year) : '';
    return String(make) + String(model) + String(color) + String(year);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue ? filterValue.trim().toLowerCase() : '';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onOpenAccountChange(event: any) {
    let openAccounts: any[] = [];
    if (event.value == 'O') {
      openAccounts = this.entityData.filter((d: any) => (d.amountDue && +d.amountDue > 0));
    } else {
      openAccounts = this.entityData;
    }
    this.loadTableData(openAccounts);
  }

  public downloadAsPDF() {
    const pdfTable = this.pdfTable?.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download('entity-export.pdf');

  }

  pageChanged(event: PageEvent) {
    this.paginationDetails.pageSize = event.pageSize;
    this.paginationDetails.currentPage = event.pageIndex;
    this.gpStateService.onClickNextPage(this.paginationDetails);
  }

  onClickCart() {
    if (this.selection?.selected?.length && (this.selection?.selected?.length <= 5)) {
      const selectedItems = this.selection.selected?.filter(s => s?.amountDue > 0);
      const plateNumbers = selectedItems?.map(s => s.plateNumber);
      if (plateNumbers?.length > 0) {
        const request = {
          accountEntityChargeId: 0,
          accountEntityIds: [0],
          "amountApplied": 0,
          "cashierSessionId": 0,
          "citationFinancialsId": 0,
          "citationIds": [0],
          "contractId": 0,
          "createDateTime": "2022-07-11T08:55:38.186Z",
          "createUserId": 0,
          "ippLineItemId": 0,
          "plates": plateNumbers,
          "rppLineItemNumber": 0,
          "rppNumber": 0,
          "updateDateTime": "2022-07-11T08:55:38.186Z",
          "updateUserID": 0
        };
        this.isLoading = true;
        this.gpService.post(`shoppingCartPlate`, request).subscribe((res: any) => {
          this.isLoading = false;
          this.paymentCartService.onChangeCartItems(res.data.numberOfItems);
          this.notificationService.success(`${res.data.numberOfItems} ` + this.translate.instant(`Items are added to the Cart Successfully`));
        }, (error) => {
          this.isLoading = false;
          for (var i = 0; i < error?.error?.details?.length; i++) {
            const msg = error.error.details[i].message;
            this.notificationService.error(this.translate.instant(error.error.details[i].message, { msg: msg }));
          }
        }, () => {
          this.isLoading = false;
        });
      } else {
        this.notificationService.error(this.translate.instant('Selected Plates amount due must be greater than 0'));
      }
    } else {
      if (this.selection?.selected?.length) {
        this.notificationService.error(this.translate.instant('Maximum 5 plates can be added to shopping cart',
          { msg: 'Maximum 5 plates can be added to shopping cart' }));
      } else {
        this.notificationService.error(this.translate.instant('Please select at least one Plate No. to Proceed',
          { msg: 'Please select at least one Plate No. to Proceed' }));
      }

    }
  }
}
