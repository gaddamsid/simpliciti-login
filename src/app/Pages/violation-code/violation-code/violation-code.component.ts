import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ViolatioCodeService } from 'src/app/Services/violation/violatio-code.service';
import { ViolationCode } from 'src/app/Models/violation-code';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, formatDate } from '@angular/common';
@Component({
  selector: 'app-violation-code',
  templateUrl: './violation-code.component.html',
  styleUrls: ['./violation-code.component.scss'],
})
export class ViolationCodeComponent implements AfterViewInit {

  @ViewChild(MatPaginator) 'paginator': MatPaginator;
  @ViewChild('search') searchString!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<ViolationCode>();

  showAddForm: boolean = false;
  voilationList!: ViolationCode[];
  violatonForm!: FormGroup;
  successMsg: any;
  showEditForm: boolean = false;
  addviolationButton: boolean = true;
  alertMsg: any;
  titleAlert: string = 'This field is required';
  welcome: any;
  incrementval!: number;
  amt!: boolean;


  constructor(
    public translate: TranslateService,
    private language: LanguageService,
    private fb: FormBuilder,
    private ViolatioCodeService: ViolatioCodeService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService,
    private currencyPipe: CurrencyPipe
  ) { }



  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.ViolatioCodeService.incrementviolation().subscribe(
      (res) => {
        if (res != undefined) {
          // this.violatonForm.get('violCodeInt')?.patchValue(res);
          this.incrementval = res
        }
      }
    )
    console.log(this.violatonForm);
    // throw new Error('Method not implemented.');
    this.getlist();
    this.language.sendLang.subscribe((lang) => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });

    this.violatonForm = new FormGroup({
      contractId: new FormControl(''),
      createUserID: new FormControl(''),
      createDatetime: new FormControl(''),
      updateUserId: new FormControl(''),
      updateDateTime: new FormControl(''),
      violClassTbl: new FormControl(''),
      violCodeAltExt: new FormControl(''),
      violCodeInt: new FormControl(''),
      violCodeExt: new FormControl(''),
      violPriority: new FormControl(''),
      violClass: new FormControl(''),
      violType: new FormControl(''),
      violName: new FormControl(''),
      violLongName: new FormControl(''),
      violProcessDesc: new FormControl(''),
      violProcessDate1: new FormControl(''),
      violAgencyGroup: new FormControl(''),
      violProcessDate2: new FormControl(''),
      violProcessData2: new FormControl(''),
      codeText: new FormControl(''),
      clientNumber: new FormControl(''),
      violationCodeCharges: new FormControl(''),

      effDate1: new FormControl('01/01/1999'),
      effDate2: new FormControl(''),
      effDate3: new FormControl(''),

      fine1: new FormControl(''),
      fine2: new FormControl(''),
      fine3: new FormControl(''),
      pen1: new FormControl(''),
      pen2: new FormControl(''),
      pen3: new FormControl(''),
      pen4: new FormControl(''),
      pen5: new FormControl(''),
      pen6: new FormControl(''),
      pen7: new FormControl(''),
      pen8: new FormControl(''),
      pen9: new FormControl(''),
      pen10: new FormControl(''),
      pen11: new FormControl(''),
      pen12: new FormControl(''),
      pen13: new FormControl(''),
      pen14: new FormControl(''),
      pen15: new FormControl(''),
      violationCodeChargesId: new FormControl(''),
    });


  }
  /*currency 0.00fixed */
  transformTotal(input: any) {
    var value = this.violatonForm.get(input)?.value;
    if (value == "" || value == null) {
      this.violatonForm.controls[input].setValue("0.00");
    }
    else {
      var decimalValue = parseFloat(value).toFixed(2);
      this.violatonForm.controls[input].setValue(decimalValue);
    }
  }

  displayedColumns: string[] = [
    'violCodeInt',
    'violLongName',
    'Effective Yr/Day',
    'Std.Fine',
    'Penalty1',
    'Penalty2',
    'Penalty3',
    'Penalty4',
    'Penalty5',
    'description',
    'action',
  ];

  datasource!: MatTableDataSource<ViolationCode>;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  appendLang(lang: string) {
    this.translate.use(lang);
    this.setPagelabel(lang);
  }



  getlist() {
    this.ViolatioCodeService.getViolationCode().subscribe((res) => {
      this.voilationList = res.map((element: any) => {
        return new ViolationCode(element);

      });
      console.log("before sort --" + JSON.stringify(this.voilationList));
      this.voilationList.sort(function (a: { violCodeInt: number; }, b: { violCodeInt: number; }) {
        return b.violCodeInt - a.violCodeInt;
      });
      console.log("after sort --" + JSON.stringify(this.voilationList));
      this.dataSource = new MatTableDataSource<ViolationCode>(
        this.voilationList
      );
      this.sort.disableClear = true;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.filterData();
    });
  }

  setPagelabel(lang: any) {
    const msg = "";
    this.translate.use(lang).toPromise();
    this.translate
      .use(lang)
      .subscribe(res => {
        this.dataSource.paginator = this.paginator;
        this.alertMsg = this.translate.instant("Items per page", { msg: msg });
        if(this.dataSource.paginator && this.dataSource.paginator._intl) {
          this.dataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;
        }
      });
  }



  errorHandling(data: any) {
    if (data.effDate1 == "") {
      this.violatonForm.get('effDate1')?.setErrors({ required: this.titleAlert })
      return;
    }

    if (data.violCodeExt == null || data.violCodeExt == "") {

      this.violatonForm.get('violCodeExt')?.setErrors({ required: this.titleAlert })

    }
    if (data.violPriority == null || data.violPriority == "") {

      this.violatonForm.get('violPriority')?.setErrors({ required: this.titleAlert })
    }

    if (data.violClass == null || data.violClass == "") {

      this.violatonForm.get('violClass')?.setErrors({ required: this.titleAlert })
    }

    if (data.violType == null || data.violType == "") {

      this.violatonForm.get('violType')?.setErrors({ required: this.titleAlert })
    }

    if (data.violName == null || data.violName == "") {

      this.violatonForm.get('violName')?.setErrors({ required: this.titleAlert })
    }

    if (data.violLongName == null || data.violLongName == "") {

      this.violatonForm.get('violLongName')?.setErrors({ required: this.titleAlert })
    }
  }


  addViolationForm(data: any) {
    this.errorHandling(data);
    if(this.paginator && this.paginator.pageIndex) this.paginator.pageIndex = 0;
    this.searchString.nativeElement.value = "";
    this.sort.sort(
      { id: '', start: 'asc', disableClear: false }
    )
    if (this.violatonForm.valid) {
      const objdata = [
        {
          contractId: 2,
          createUserId: 5,
          createDateTime: '1905-06-15T00:00:00',
          updateUserId: 5,
          updateDateTime: '1905-06-15T00:00:00',
          fine: data.fine1,
          effDate: new Date(data.effDate1).toISOString(),
          pen1: data.pen1,
          pen2: data.pen2,
          pen3: data.pen3,
          pen4: data.pen4,
          pen5: data.pen5,
        },
        {
          contractId: 2,
          createUserId: 5,
          createDateTime: '1905-06-15T00:00:00',
          updateUserId: 5,
          updateDateTime: '1905-06-15T00:00:00',
          fine: data.fine2,
          effDate: new Date(data.effDate2).toISOString(),
          pen1: data.pen6,
          pen2: data.pen7,
          pen3: data.pen8,
          pen4: data.pen9,
          pen5: data.pen10,
        },

        {
          contractId: 2,
          createUserId: 5,
          createDateTime: '1905-06-15T00:00:00',
          updateUserId: 5,
          updateDateTime: '1905-06-15T00:00:00',
          fine: data.fine3,
          effDate: new Date(data.effDate3).toISOString(),
          pen1: data.pen11,
          pen2: data.pen12,
          pen3: data.pen13,
          pen4: data.pen14,
          pen5: data.pen15,
        },
      ];

      const obj = {
        clientNumber: 51,
        codeText: data.codeText,
        contractId: 2,
        createUserID: 4,
        createDatetime: '1905-06-15T00:00:00',
        updateUserId: 4,
        violAgencyGroup: 'VAgeGrp_D',
        violClass: data.violClass,
        violClassTbl: 'A',
        violCodeAltExt: 'ViolCodeAltExt_Java',
        updateDateTime: '1905-06-15T00:00:00',
        violCodeInt: (this.incrementval),
        violCodeExt: data.violCodeExt,
        violPriority: data.violPriority,
        violType: data.violType,
        violName: data.violName,
        violLongName: data.violLongName,
        violProcessDesc: data.violProcessDesc,
        violProcessDate1: '1905-06-15T00:00:00',
        violProcessDate2: '1905-06-15T00:00:00',
        violProcessData2: 'VPData2_D',
        violationCodeCharges: objdata,

      };
      this.ViolatioCodeService.addViolationCode(obj).subscribe(
        (res) => {
          if (res.status == 'Success') {
            const msg = '';
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant('Record Added Successfully', { msg: msg });
            this.notificationService.success(this.successMsg);
            this.getlist();
            this.showAddForm = false;
            this.showEditForm = false;
            this.searchString.nativeElement.value = "";
            this.violatonForm.reset();
          }
          this.ViolatioCodeService.incrementviolation().subscribe(
            (res) => {
              if (res != undefined) {
                // this.violatonForm.get('violCodeInt')?.patchValue(res);
                this.incrementval = res
              }
            }
          )
        },
        error => {
          this.errorResponseCheck(error);
        })
    }
  }


  editdata: any;
  editViolation(data: any) {
    this.errorHandling(data);
    console.log(data);
    this.editdata = [];
    this.editdata = data;
    this.showEditForm = true;
    this.showAddForm = true;
    this.addviolationButton = false;
    // this.violatonForm.controls['violationCodesId'].setValue(data.violationCodesId);
    this.violatonForm.controls['violCodeInt'].setValue(data.violCodeInt);
    this.violatonForm.controls['violCodeExt'].setValue(data.violCodeExt);
    this.violatonForm.controls['violLongName'].setValue(data.violLongName);
    this.violatonForm.controls['violName'].setValue(data.violName);
    this.violatonForm.controls['violClass'].setValue(data.violClass);
    this.violatonForm.controls['violType'].setValue(data.violType);
    this.violatonForm.controls['violPriority'].setValue(data.violPriority);
    this.violatonForm.controls['violProcessDesc'].setValue(
      data.violProcessDesc
    );
    this.violatonForm.controls['codeText'].setValue(data.codeText);

    this.violatonForm.controls['effDate1'].setValue(
      formatDate(
        new Date(data.violationCodeCharges[0].effDate).toLocaleDateString(),
        'yyyy-MM-dd',
        'en'
      )
    );
    this.violatonForm.controls['effDate2'].setValue(
      formatDate(
        new Date(data.violationCodeCharges[1].effDate).toLocaleDateString(),
        'yyyy-MM-dd',
        'en'
      )
    );
    this.violatonForm.controls['effDate3'].setValue(
      formatDate(
        new Date(data.violationCodeCharges[2].effDate).toLocaleDateString(),
        'yyyy-MM-dd',
        'en'
      )
    );

    this.violatonForm.controls['fine1'].setValue(
      parseFloat(data.violationCodeCharges[0].fine).toFixed(2)

    );
    this.violatonForm.controls['fine2'].setValue(
      parseFloat(data.violationCodeCharges[1].fine).toFixed(2)

    );
    this.violatonForm.controls['fine3'].setValue(
      parseFloat(data.violationCodeCharges[2].fine).toFixed(2)

    );

    this.violatonForm.controls['pen1'].setValue(
      parseFloat(data.violationCodeCharges[0].pen1).toFixed(2)

    );
    this.violatonForm.controls['pen2'].setValue(
      parseFloat(data.violationCodeCharges[0].pen2).toFixed(2)

    );
    this.violatonForm.controls['pen3'].setValue(
      parseFloat(data.violationCodeCharges[0]?.pen3).toFixed(2)

    );
    this.violatonForm.controls['pen4'].setValue(
      parseFloat(data.violationCodeCharges[0].pen4).toFixed(2)

    );
    this.violatonForm.controls['pen5'].setValue(
      parseFloat(data.violationCodeCharges[0].pen5).toFixed(2)

    );

    this.violatonForm.controls['pen6'].setValue(
      parseFloat(data.violationCodeCharges[1].pen1).toFixed(2)

    );
    this.violatonForm.controls['pen7'].setValue(
      parseFloat(data.violationCodeCharges[1].pen2).toFixed(2)

    );
    this.violatonForm.controls['pen8'].setValue(
      parseFloat(data.violationCodeCharges[1].pen3).toFixed(2)

    );
    this.violatonForm.controls['pen9'].setValue(
      parseFloat(data.violationCodeCharges[1].pen4).toFixed(2)

    );
    this.violatonForm.controls['pen10'].setValue(
      parseFloat(data.violationCodeCharges[1].pen5).toFixed(2)

    );

    this.violatonForm.controls['pen11'].setValue(
      parseFloat(data.violationCodeCharges[2].pen1).toFixed(2)

    );
    this.violatonForm.controls['pen12'].setValue(
      parseFloat(data.violationCodeCharges[2].pen2).toFixed(2)

    );
    this.violatonForm.controls['pen13'].setValue(
      parseFloat(data.violationCodeCharges[2].pen3).toFixed(2)

    );
    this.violatonForm.controls['pen14'].setValue(
      parseFloat(data.violationCodeCharges[2].pen4).toFixed(2)

    );
    this.violatonForm.controls['pen15'].setValue(
      parseFloat(data.violationCodeCharges[2].pen5).toFixed(2)

    );
  }

  saveViolation(data: any) {

    this.errorHandling(data);
    if (this.violatonForm.valid) {
      const objdata = [
        {
          contractId: 2,
          createUserId: 5,
          createDateTime: '1905-06-15T00:00:00',
          updateUserId: 5,
          updateDateTime: '1905-06-15T00:00:00',
          fine: data.fine1,
          effDate: new Date(data.effDate1).toISOString(),
          pen1: data.pen1,
          pen2: data.pen2,
          pen3: data.pen3,
          pen4: data.pen4,
          pen5: data.pen5,
        },
        {
          contractId: 2,
          createUserId: 5,
          createDateTime: '1905-06-15T00:00:00',
          updateUserId: 5,
          updateDateTime: '1905-06-15T00:00:00',
          fine: data.fine2,
          effDate: new Date(data.effDate2).toISOString(),
          pen1: data.pen6,
          pen2: data.pen7,
          pen3: data.pen8,
          pen4: data.pen9,
          pen5: data.pen10,
        },

        {
          contractId: 2,
          createUserId: 5,
          createDateTime: '1905-06-15T00:00:00',
          updateUserId: 5,
          updateDateTime: '1905-06-15T00:00:00',
          fine: data.fine3,
          effDate: new Date(data.effDate3).toISOString(),
          pen1: data.pen11,
          pen2: data.pen12,
          pen3: data.pen13,
          pen4: data.pen14,
          pen5: data.pen15,
        },
      ];

      const obj = {
        clientNumber: 51,
        codeText: data.codeText,
        contractId: 2,
        createUserID: 4,
        createDatetime: '1905-06-15T00:00:00',
        updateUserId: 4,
        violAgencyGroup: 'VAgeGrp_D',
        violClass: data.violClass,
        violClassTbl: 'A',
        violCodeAltExt: 'ViolCodeAltExt_Java',
        updateDateTime: '1905-06-15T00:00:00',
        violCodeInt: Number(data.violCodeInt),
        violCodeExt: data.violCodeExt,
        violPriority: data.violPriority,
        violType: data.violType,
        violName: data.violName,
        violLongName: data.violLongName,
        violProcessDesc: data.violProcessDesc,
        violProcessDate1: '1905-06-15T00:00:00',
        violProcessDate2: '1905-06-15T00:00:00',
        violProcessData2: 'VPData2_D',
        violationCodeCharges: objdata,
      };
      this.ViolatioCodeService.updateViolationCode(
        obj,
        this.editdata.violationCodesId
      ).subscribe(
        (res) => {
          if (res.status == 'Success') {
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant('Record Updated Successfully');
            this.notificationService.success(this.successMsg);
            this.showAddForm = false;
            this.addviolationButton = false;
            this.violatonForm.reset();
            this.getlist();
          }
        },
        error => {
          this.errorResponseCheck(error);
        })
    }

  }

  deleteViolation(data: any) {
    const msgs = '';
    if (
      confirm(this.translate.instant('Are you sure to delete', { msg: msgs }))
    ) {
      this.ViolatioCodeService.deleteViolationCode(
        data.violationCodesId
      ).subscribe(
        (res) => {
          if (res.status == 'Success') {
            const msg = '';

            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant('Record Deleted Successfully', { msg: msg });
            this.notificationService.success(this.successMsg);
            this.getlist();
            this.showAddForm = false;
            this.showEditForm = false;
            this.violatonForm.reset();
          }
        },
        error => {
          this.errorResponseCheck(error);
        })

    }
  }

  addviolation() {
    this.showAddForm = true;
    this.showEditForm = false;
    this.addviolationButton = true;
    this.violatonForm.reset();

    this.violatonForm.controls['effDate1'].setValue(formatDate(
      new Date('01/01/1900').toLocaleDateString(), 'yyyy-MM-dd', 'en'));
    this.violatonForm.controls['effDate2'].setValue(formatDate(
      new Date('01/01/1900').toLocaleDateString(), 'yyyy-MM-dd', 'en'));
    this.violatonForm.controls['effDate3'].setValue(formatDate(
      new Date('01/01/1900').toLocaleDateString(), 'yyyy-MM-dd', 'en'));
    this.violatonForm.controls['fine1'].setValue('0.00');
    this.violatonForm.controls['fine2'].setValue('0.00');
    this.violatonForm.controls['fine3'].setValue('0.00');

    this.violatonForm.controls['pen1'].setValue('0.00');
    this.violatonForm.controls['pen2'].setValue('0.00');
    this.violatonForm.controls['pen3'].setValue('0.00');
    this.violatonForm.controls['pen4'].setValue('0.00');
    this.violatonForm.controls['pen5'].setValue('0.00');
    this.violatonForm.controls['pen6'].setValue('0.00');
    this.violatonForm.controls['pen7'].setValue('0.00');
    this.violatonForm.controls['pen8'].setValue('0.00');
    this.violatonForm.controls['pen9'].setValue('0.00');
    this.violatonForm.controls['pen10'].setValue('0.00');
    this.violatonForm.controls['pen11'].setValue('0.00');
    this.violatonForm.controls['pen12'].setValue('0.00');
    this.violatonForm.controls['pen13'].setValue('0.00');
    this.violatonForm.controls['pen14'].setValue('0.00');
    this.violatonForm.controls['pen15'].setValue('0.00');
    this.violatonForm.controls['violCodeInt'].setValue(this.incrementval);


  }

  cancelvoilation() {
    this.violatonForm.reset();
    this.showAddForm = false;
    this.searchString.nativeElement.value = "";
    this.getlist();
    this.notificationService.info(this.translate.instant('Process Cancelled'));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  filterData() {

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.violCodeInt.toString().includes(filter) || data.violCodeExt.toLowerCase().includes(filter) || data.violLongName.toLowerCase().includes(filter) || data.violName.toLowerCase().includes(filter);
    };
  }

  // ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//
  errorResponseCheck(error: any) {

    for (var i = 0; i < error.error.details.length; i++) {
      if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
        const msg = "";
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.violatonForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.violatonForm.get("violCodeExt")?.setErrors({ invalid: "External Violation Code Duplicate" });
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }
}

