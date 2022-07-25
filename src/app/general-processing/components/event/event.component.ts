import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild, TemplateRef, ElementRef, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { GlobalFormats } from '../../enums/global.formats';
import { EventData } from '../../models/event.model';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { PaginationControls } from '../../models/pagination-controls.model';
import { GPStateService } from '../../services/g-p-state.service';
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [DatePipe]
})
export class EventComponent implements OnInit {


  paginationDetails!: PaginationControls;
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  displayedColumns = ['select', 'eventId', 'violationDateTime', 'status', 'category', 'deploymentId', 'locationCode', 'laneNumber', 'amountDue', 'action'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  constructor(public translate: TranslateService,
    private router: Router,
    private datePipe: DatePipe,
    private language: LanguageService,
    private gpStateService: GPStateService,
  ) { }

  ngOnInit(): void {
    this.language.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    this.gpStateService.searchResults$.subscribe(s => {
      this.loadTableData(s.events);
    });
    this.gpStateService.onPaginationChange$.subscribe(s => {
      this.paginationDetails = s;
    });
  }

  loadTableData(data: EventData[]) {
    data?.forEach(s => {
      s.violationDateTime = s.violationDateTime ?
        this.datePipe.transform(s.violationDateTime, GlobalFormats.dateAndTime) : '';
    })
    this.dataSource = new MatTableDataSource<any>(data);
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
      // this.dataSource.paginator = this.paginator;
      const alertMsg = this.translate.instant("Items per page", { msg: '' });
      // this.dataSource.paginator._intl.itemsPerPageLabel = alertMsg;
    });
  }

  onClickEventId(entityData: any) {
    this.router.navigateByUrl(`gp/search/event-details/${entityData.eventId}`)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue ? filterValue.trim().toLowerCase() : '';
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  public downloadAsPDF() {
    const pdfTable = this.pdfTable?.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download('event-export.pdf');
  }

  pageChanged(event: PageEvent) {
    this.paginationDetails.pageSize = event.pageSize;
    this.paginationDetails.currentPage = event.pageIndex;
    this.gpStateService.onClickNextPage(this.paginationDetails);
  }
}

