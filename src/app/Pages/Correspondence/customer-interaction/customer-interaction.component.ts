import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CustomerInteractionService } from 'src/app/Services/CustomerInteraction/customer-interaction.service';
import { CustomerInteraction } from '../../../Models/customer-interaction.interface';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Subscriber } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


// const ELEMENT_DATA:CustomerInteraction[] = [];

@Component({
  selector: 'admin-customer-interaction',
  templateUrl: './customer-interaction.component.html',
  styleUrls: ['./customer-interaction.component.scss'],
})
export class CustomerInteractionComponent {
  displayedColumns: string[] = ['customerInteractionCode', 'customerInteractionText', 'action',];
  @ViewChild('search') searchString!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public data: any;
  dataSource = new MatTableDataSource<CustomerInteraction>();
  profileGroup!: FormGroup;
  showAddForm: boolean = false;
  successMsg!: string;
  welcome: any;
  showEditForm: boolean = false;
  alertMsg: any;
  addcustomerInteractionButton: boolean = true;
  editData: any;


  constructor(
    public translate: TranslateService,
    private language: LanguageService,
    private fb: FormBuilder,
    private CustomerInteractionService: CustomerInteractionService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.language.sendLang.subscribe((lang) => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    this.profileGroup = new FormGroup({
      code: new FormControl(null, [
        Validators.required,
        Validators.maxLength(1),
      ]),
      desc: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
      ]),
    });
    this.getList();
  }


  getList() {
    this.CustomerInteractionService.getCustomerintractionlist().subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource<CustomerInteraction>(
          res.reverse()
        );
        this.dataSource.sort = this.sort;
        this.sort.disableClear = true;
        this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
          if (typeof data[sortHeaderId] === 'string') {
            return data[sortHeaderId].toLocaleLowerCase();
          }

          return data[sortHeaderId];
        };
        this.dataSource.paginator = this.paginator;
        this.filterData();
      }
    );
  }

  //<<---------------------------------------------Sorting-------------------------------->>
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  //<<---------------------------------------------Sorting Ends-------------------------------->>
  appendLang(lang: string) {
    this.translate.use(lang);
    this.setPagelabel(lang);
  }
  setPagelabel(lang: any) {
    const msg = "";
    this.translate.use(lang).toPromise();
    this.translate
      .use(lang)
      .subscribe(res => {
        this.dataSource.paginator = this.paginator;
        this.alertMsg = this.translate.instant("Items per page", { msg: msg });
        this.dataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

  }
  filterData() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.customerInteractionCode.toLocaleLowerCase().includes(filter) || data.customerInteractionText.toLocaleLowerCase().includes(filter);

    };

  }


  get code() {
    return this.profileGroup.get('code') as FormControl;
  }

  get desc() {
    return this.profileGroup.get('desc') as FormControl;
  }

  addCustomerInteraction(data: any) {
    this.paginator.pageIndex = 0;
    this.searchString.nativeElement.value = "";
    this.sort.sort(
      { id: '', start: 'asc', disableClear: false }
    )
    if (this.profileGroup.valid) {
    }
    const obj = {
      contractId: 0,
      createDatetime: '2022-03-31T17:16:01.351Z',
      createUserId: 0,
      customerInteractionCode: data.code,
      customerInteractionId: 0,
      customerInteractionText: data.desc,
      updateUserId: 0,
      updatedDatetime: '2022-03-31T17:16:01.351Z',
    };
    this.CustomerInteractionService.addCustomerintractionlist(obj).subscribe(
      (res) => {
        if (res.status == 'Success') {
          const msg = '';
          const code = res.details[0].code;
          this.successMsg = this.translate.instant('Record Added Successfully', {
            msg: msg,
          });
          this.notificationService.success(this.successMsg);
          this.profileGroup.reset();
          this.getList();
          this.showAddForm = false;
          this.searchString.nativeElement.value = "";
        }
      },
      error => {
        this.errorResponseCheck(error);
      })

  }

  addcustomerintractiontable() {
    this.showAddForm = true;
    this.addcustomerInteractionButton = true;
    this.showEditForm = false;
  }

  cancelCustomerInteraction() {
    this.showAddForm = false;
    this.profileGroup.reset();
    this.getList();
    this.notificationService.info(this.translate.instant('Process Cancelled'));
    this.searchString.nativeElement.value = "";
  }

  editdata: any;
  editCustomer(data: any) {
    console.log(data);
    this.editData = data;
    this.showAddForm = true;
    this.showEditForm = true;
    this.addcustomerInteractionButton = false;
    this.profileGroup.controls['code'].setValue(data.customerInteractionCode);
    this.profileGroup.controls['desc'].setValue(data.customerInteractionText);
  }

  deleteCustomer(data: any) {
    console.log(data);
    const msgs = '';
    if (
      confirm(this.translate.instant('Are you sure to delete', { msg: msgs }))
    ) {
      this.CustomerInteractionService.deleteCustomerintractionlist(
        data.customerInteractionId
      ).subscribe(
        (res) => {
          if (res.status == 'Success') {
            const msg = '';
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant('Record Deleted Successfully', { msg: msg });
            this.notificationService.success(this.successMsg);
            this.getList();
            this.showAddForm = false;
            this.profileGroup.reset();
          }
        },
        error => {
          this.errorResponseCheck(error);
        })
    }
  }

  updateCustomer(data: any) {
    console.log(data);
    if (this.profileGroup.valid) {
      const obj = {
        customerInteractionCode: data.code,
        customerInteractionText: data.desc,
      };
      this.CustomerInteractionService.updateCustomerintractionlist(
        this.editData.customerInteractionId, obj
      ).subscribe(
        (res) => {
          console.log(res);
          if (res.status == 'Success') {
            this.showAddForm = false;
            this.profileGroup.reset();
            this.getList();
            const msg = '';
            this.welcome = this.translate.instant("Record Updated Successfully", {
              msg: msg,
            });
            this.notificationService.success(this.welcome);
          }
        },
        error => {
          this.errorResponseCheck(error);
        })

    }
  }
  // ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//
  errorResponseCheck(error: any) {

    for (var i = 0; i < error.error.details.length; i++) {
      if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
        const msg = "";
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.profileGroup.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.profileGroup.get("code")?.setErrors({ invalid: "Customer Interaction code duplicate" });
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }
}
