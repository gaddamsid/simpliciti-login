import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentFeeModel } from 'src/app/Models/payment-fee.interface';
import { PaymentFeeService } from 'src/app/Services/PaymentFee/payment-fee.service'
import { LanguageService } from 'src/app/shared/Components/header/languages.service';

@Component({
  selector: 'app-payment-fee',
  templateUrl: './payment-fee.component.html',
  styleUrls: ['./payment-fee.component.scss']
})
export class PaymentFeeComponent implements OnInit {
  displayedColumns: string[] = ['chargeCode', 'chargeTypeLong', 'chargeTypeShort', 'chargeAmount', 'cashieringind', 'action'];
  public data: any;
  dataSource = new MatTableDataSource<PaymentFeeModel>();
  PaymentFeeForm!: FormGroup;
  @ViewChild('search') searchString!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  alertMsg: any;
  showAddForm: boolean = false;
  addBtn: boolean = true;
  showEditForm: boolean = false;
  successMsg: any;
  welcome: any;
  editData: any;
  constructor(
    public translate: TranslateService,
    private language: LanguageService,
    private fb: FormBuilder,
    private PaymentFeeService: PaymentFeeService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.language.sendLang.subscribe((lang) => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    this.PaymentFeeForm = new FormGroup({
      'chargeCode': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'chargeTypeLong': new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]*$"), Validators.maxLength(50)]),
      'chargeTypeShort': new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9\\s]*$"), Validators.maxLength(20)]),
      'chargeAmount': new FormControl("", [Validators.required, Validators.required]),
      'cashieringind': new FormControl("", [Validators.pattern("^[a-zA-Z1-9]*$"), Validators.maxLength(1)]),

    });
    this.getList();

  }

  /*currency 0.00fixed */
  transformTotal(input: any) {
    var value = this.PaymentFeeForm.get(input)?.value;
    if (value == "" || value == null) {
      this.PaymentFeeForm.controls[input].setValue("");
    }
    else {
      var decimalValue = parseFloat(value).toFixed(2);
      this.PaymentFeeForm.controls[input].setValue(decimalValue);
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
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
  get chargeCode() {
    return this.PaymentFeeForm.get('chargeCode') as FormControl;
  }

  get chargeTypeLong() {
    return this.PaymentFeeForm.get('chargeTypeLong') as FormControl;
  }
  get chargeTypeShort() {
    return this.PaymentFeeForm.get('chargeTypeShort') as FormControl;
  }
  get chargeAmount() {
    return this.PaymentFeeForm.get('chargeAmount') as FormControl;
  }
  get cashieringind() {
    return this.PaymentFeeForm.get('cashieringind') as FormControl;
  }



  getList() {
    this.PaymentFeeService.getPaymentFee().subscribe(
      (res: any[]) => {
        this.dataSource = new MatTableDataSource<PaymentFeeModel>(
          res.reverse()
        );
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filterData();
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  filterData() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.chargeCode.toString().includes(filter) || data.chargeTypeLong.toLowerCase().includes(filter) || data.chargeTypeShort.toLowerCase().includes(filter) || data.cashieringind.toLowerCase().includes(filter) || data.chargeAmount.toString().includes(filter);

    };
  }


  Addpayment() {
    this.showAddForm = true;
    this.addBtn = true;
    this.showEditForm = false;

  }

  cancelPayment() {
    this.showAddForm = false;
    this.PaymentFeeForm.reset();
    this.searchString.nativeElement.value = ""
    this.getList();
    this.notificationService.info(this.translate.instant('Process Cancelled'));
  }




  addPaymentFee(data: any) {
    this.paginator.pageIndex = 0;
    this.searchString.nativeElement.value = ""
    this.sort.sort(
      { id: '', start: 'asc', disableClear: false }
    )
    if (this.PaymentFeeForm.valid) {
      const obj = {
        chargeCode: data.chargeCode,
        chargeTypeLong: data.chargeTypeLong,
        chargeTypeShort: data.chargeTypeShort,
        chargeAmount: data.chargeAmount,
        cashieringind: data.cashieringind,
      };
      this.PaymentFeeService.addPaymentFee(obj).subscribe(
        (res) => {
          console.log(res.details[0].code);
          if (res.status == 'Success') {
            const msg = '';
            const code = res.details[0].code;
            this.successMsg = this.translate.instant('Record Added Successfully', {
              msg: msg,
            });
            this.notificationService.success(this.successMsg);
            this.PaymentFeeForm.reset();
            this.getList();
            this.showAddForm = false;

          }
        },
        error => {
          this.errorResponseCheck(error);
        })
    }

  }


  editIconClicked(data: any) {
    this.editData = data;
    this.showAddForm = true;
    this.showEditForm = true;
    this.addBtn = false;
    this.PaymentFeeForm.controls['chargeCode'].setValue(data.chargeCode);
    this.PaymentFeeForm.controls['chargeTypeLong'].setValue(data.chargeTypeLong);
    this.PaymentFeeForm.controls['chargeTypeShort'].setValue(data.chargeTypeShort);
    this.PaymentFeeForm.controls['chargeAmount'].setValue(parseFloat(data.chargeAmount).toFixed(2));
    this.PaymentFeeForm.controls['cashieringind'].setValue(data.cashieringind);

  }



  updatePaymentFeeRecord(data: any) {
    this.searchString.nativeElement.value = ""
    if (this.PaymentFeeForm.valid) {
      const obj = {
        "cashieringind": data.cashieringind,
        "chargeAmount": data.chargeAmount,
        "chargeCode": this.editData.chargeCode,
        "chargeTypeLong": data.chargeTypeLong,
        "chargeTypeShort": data.chargeTypeShort
      }
      this.PaymentFeeService.updatePaymentFee(this.editData.chargeCode, obj).subscribe(res => {
        console.log(res);
        if (res.status == 'Success') {
          this.showAddForm = false;
          this.PaymentFeeForm.reset();
          this.getList();
          const msg = '';
          this.welcome = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.welcome);
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }


  deleteRecord(rowData: any) {
    const msgs = "";
    if (confirm(this.translate.instant("Are you sure to delete", { msg: msgs }))) {
      this.PaymentFeeService.deletePaymentFee(rowData.chargeCode).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          const errcodes = res.details[0].code;
          this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.getList();
          this.showAddForm = false;
          this.PaymentFeeForm.reset();
        }
      }, error => {
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
        this.PaymentFeeForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.PaymentFeeForm.get("chargeCode")?.setErrors({ invalid: "Fee Code Duplicate" });
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }
}
