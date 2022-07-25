import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ClientPaymentType } from 'src/app/Models/client-payment-type.interface';
import { ClientPaymentTypeService } from 'src/app/Services/ClientPaymentType/client-payment-type.service'
import { LanguageService } from 'src/app/shared/Components/header/languages.service';

@Component({
  selector: 'app-client-payment-type',
  templateUrl: './client-payment-type.component.html',
  styleUrls: ['./client-payment-type.component.scss']
})
export class ClientPaymentTypeComponent implements OnInit {

  displayedColumns: string[] = ['paymentSourceShortName', 'paymentSourceLongName', 'acctNumberInt', 'action'];
  @ViewChild('search') searchString!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<ClientPaymentType>();
  public data: any;
  clientPaytypeForm!: FormGroup;
  showAddForm: boolean = false;
  successMsg!: string;
  welcome: any;
  showEditForm: boolean = false;
  alertMsg: any;
  editData: any;
  masterList: any;
  addclientPaytypeFormbtn: boolean = true;
  clientPayment: any;


  constructor(public translate: TranslateService,
    private language: LanguageService,
    private ClientPaymentTypeService: ClientPaymentTypeService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.language.sendLang.subscribe((lang) => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    this.clientPaytypeForm = new FormGroup({

      'paymentSourceShortName': new FormControl("", [Validators.required, Validators.maxLength(5)]),
      'paymentSourceLongName': new FormControl("", [Validators.required, Validators.maxLength(20)]),
      'acctNumberInt': new FormControl(0, [Validators.pattern('^[0-9]\\d*$'), Validators.minLength(2)]),
    });
    this.getList();
    this.getPaymentMaster();
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
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  filterData() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.paymentSourceShortName.toLowerCase().includes(filter) || data.paymentSourceLongName.toLowerCase().includes(filter) || data.acctNumberInt.toString().includes(filter);

    };

  }
  getList() {
    this.ClientPaymentTypeService.getclientPayment().subscribe(
      (res: any[]) => {
        this.dataSource = new MatTableDataSource<ClientPaymentType>(
          res.reverse()
        );
        this.dataSource.sort = this.sort;
        this.sort.disableClear = true;
        this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
          if (typeof data[sortHeaderId] === 'string') {
            return data[sortHeaderId].toLowerCase();
          }

          return data[sortHeaderId];
        };
        this.dataSource.paginator = this.paginator;
        this.filterData();

      }
    );
  }

  getPaymentMaster() {
    this.ClientPaymentTypeService.getclientPaymentMaster().subscribe(
      (res) => {

        this.masterList = res;
      });
  }

  get paymentSourceShortName() {
    return this.clientPaytypeForm.get('paymentSourceShortName') as FormControl;
  }

  get paymentSourceLongName() {
    return this.clientPaytypeForm.get('paymentSourceLongName') as FormControl;
  }
  get acctNumberInt() {
    return this.clientPaytypeForm.get('acctNumberInt') as FormControl;
  }


  addClientPayType(data: any) {
    this.paginator.pageIndex = 0;
    this.searchString.nativeElement.value = "";
    this.sort.sort(
      { id: '', start: 'asc', disableClear: false }
    )
    if (this.clientPaytypeForm.valid) {
      const obj = {
        paymentSourceShortName: data.paymentSourceShortName,
        paymentSourceLongName: data.paymentSourceLongName,
        acctNumberInt: data.acctNumberInt,


      };
      this.ClientPaymentTypeService.addClientPaymentType(obj).subscribe(
        (res) => {
          console.log(res.details[0].code);
          if (res.status == 'Success') {
            const msg = '';
            const code = res.details[0].code;
            this.successMsg = this.translate.instant('Record Added Successfully', {
              msg: msg,
            });
            this.notificationService.success(this.successMsg);
            this.clientPaytypeForm.reset();
            this.getList();
            this.showAddForm = false;
            this.searchString.nativeElement.value = ""
          }
        },
        error => {
          this.errorResponseCheck(error);
        })
    }

  }

  addClientpay() {
    this.showAddForm = true;
    this.addclientPaytypeFormbtn = true;
    this.showEditForm = false;
    this.ClientPaymentTypeService.getclientPaymentMaster().subscribe((res) => {
      this.clientPayment = res;

    })

  }
  cancelClientpay() {
    this.showAddForm = false;
    this.clientPaytypeForm.reset();
    this.notificationService.info(this.translate.instant('Process Cancelled'));
    this.searchString.nativeElement.value = ""
    this.getList();
  }




  clientPaymentSelected(event: any) {
    console.log(event.value) // Shows proper selection!

    const result = this.clientPayment.filter((element: { paymentSourceMasterShortName: any; }) => {
      return element.paymentSourceMasterShortName === event.value;
    });

    // This is how I am trying to set the value
    this.clientPaytypeForm.controls['paymentSourceLongName'].setValue(result[0].paymentSourceMasterLongName);
  }

  editdata: any;
  editClientpay(data: any) {
    console.log(data);
    this.editData = data;
    this.showAddForm = true;
    this.showEditForm = true;
    this.clientPaytypeForm.reset();
    this.ClientPaymentTypeService.getclientPaymentMaster().subscribe((res) => {
      this.clientPayment = res;
      this.addclientPaytypeFormbtn = false;
      this.clientPaytypeForm.controls['paymentSourceShortName'].setValue(data.paymentSourceShortName);
      this.clientPaytypeForm.controls['paymentSourceLongName'].setValue(data.paymentSourceLongName);
      this.clientPaytypeForm.controls['acctNumberInt'].setValue(data.acctNumberInt)

    })

  }



  updateclientPay(data: any) {
    if (this.clientPaytypeForm.valid) {
      const obj = {
        acctNumberExt: 0,
        acctNumberInt: data.acctNumberInt,
        active: 0,
        paymentSourceLongName: data.paymentSourceLongName,
        paymentSourceShortName: data.paymentSourceShortName
      };
      this.ClientPaymentTypeService.updateClientPaymentType(
        this.editData.paymentSourceId, obj
      ).subscribe(
        (res) => {
          console.log(res);
          if (res.status == 'Success') {
            this.showAddForm = false;
            this.clientPaytypeForm.reset();
            this.getList();
            const msg = '';
            this.welcome = this.translate.instant("Record Updated Successfully", {
              msg: msg,
            });
            this.notificationService.success(this.welcome);
            this.searchString.nativeElement.value = ""
          }
        },
        error => {
          this.errorResponseCheck(error);
        })

    }
  }




  deleteClientpay(data: any) {
    console.log(data);
    const msgs = '';
    if (
      confirm(this.translate.instant('Are you sure to delete', { msg: msgs }))
    ) {
      this.ClientPaymentTypeService.deleteClientPaymentType(
        data.paymentSourceId
      ).subscribe(
        (res) => {
          if (res.status == 'Success') {
            const msg = '';
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant('Record Deleted Successfully', { msg: msg });
            this.notificationService.success(this.successMsg);
            this.getList();
            this.showAddForm = false;
            this.clientPaytypeForm.reset();
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
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.clientPaytypeForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.clientPaytypeForm.get("paymentSourceShortName")?.setErrors({ invalid: "Payemt Type Duplicate" });
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }

}