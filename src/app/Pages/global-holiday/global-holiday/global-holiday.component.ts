import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalHolidayService } from 'src/app/Services/GlobalHoliday/global-holiday.service';
import { GlobalHoliday } from '../../../Models/global-holiday';
import { Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';

@Component({
  selector: 'admin-global-holiday',
  templateUrl: './global-holiday.component.html',
  styleUrls: ['./global-holiday.component.scss']
})
export class GlobalHolidayComponent implements OnInit {
  date = new FormControl(new Date());

  serializedDate = new FormControl(new Date().toISOString());
  showAddForm: boolean = false;
  dataSource = new MatTableDataSource<any>();
  globalHolidayList: any;
  holidayForm!: FormGroup;
  successMsg!: string;
  alertMsg!: string;
  titleAlert: string = 'This field is required';
  AddHolidayButton: boolean = true;
  editData: any;
  minDate!: Date;
  welcome: any;


  constructor(public translate: TranslateService, private language: LanguageService,
     private globalHolidayService: GlobalHolidayService, private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService) { }

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.minDate = new Date();
    this.getList();
    this.language.sendLang.subscribe(lang => {
      if (lang != "") {
        this.appendLang(lang);
      }
    });
    this.holidayForm = new FormGroup({
      'holidayDate': new FormControl(""),
      'holidayDescription': new FormControl("", [Validators.required]),
      'holidayRecordNumber': new FormControl('0', [Validators.pattern('^[0-9]\\d*$')]),
    });

  }

  displayedColumns: string[] = ['holidayDate', 'holidayDescription', 'holidayRecordNumber', 'Action'];
  appendLang(lang: string) {
    this.translate.use(lang);
    this.setPagelabel(lang);
  }

  getList() {
    this.globalHolidayService.getHolidayList().subscribe(res => {
      this.globalHolidayList = res.map(element => {
        return new GlobalHoliday(element)
      });
      this.dataSource = new MatTableDataSource<GlobalHoliday>(this.globalHolidayList.reverse());
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
        this.dataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;
      });
  }

  get holidayDate() {
    return this.holidayForm.get('holidayDate') as FormControl
  }

  get holidayDescription() {
    return this.holidayForm.get('holidayDescription') as FormControl
  }

  get holidayRecordNumber() {
    return this.holidayForm.get('holidayRecordNumber') as FormControl
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  filterData() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.holidayDate.toLowerCase().includes(filter) || data.holidayDescription.toLowerCase().includes(filter) || data.holidayRecordNumber.toString() === filter;
    };
  }

  addGlobalholiday() {
    this.holidayForm.controls["holidayRecordNumber"].setValue(0);
    this.showAddForm = true;
    this.AddHolidayButton = true;

  }

  cancelGlobalHoliday() {
    this.showAddForm = false;
    this.holidayForm.reset();
    this.getList();
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }

  addHoliday(data: any) {
    if (data.holidayDate == "") {
      this.holidayForm.get('holidayDate')?.setErrors({ required: this.titleAlert })

    }
    if (this.holidayForm.valid) {
      const obj = {
        "globalHolidayModel": {
          "createUserID": 0,
          "updateUserID": 0,
          "createDatetime": "2022-04-22T07:49:03.042Z",
          "updateDatetime": "2022-04-22T07:49:03.042Z",
          "isDeleted": "N",
          "holidayID": 0,
          "contractID": 0,
          "active": true,
          "holidayDate": data.holidayDate,
          "holidayDescription": data.holidayDescription,
          "holidayRecordNumber": data.holidayRecordNumber
        }
      }
      this.globalHolidayService.addHolidayList(obj).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant(res.details[0].code, { msg: msg });
          this.notificationService.success(this.translate.instant("Record Added Successfully", { msg: msg }))
          this.holidayForm.reset();
          this.paginator.pageIndex = 0;
          this.getList();
          this.showAddForm = false;

        }
      }, 
      error => {
        this.errorResponseCheck(error);
      }
      )
    }
  }

  updateHolidayRecord(data: any) {
    this.editData = data;
    this.showAddForm = true;
    this.AddHolidayButton = false;
    const date = formatDate(
      new Date(data.holidayDate).toLocaleDateString(),
      'yyyy-MM-dd',
      'en'
    )
    this.holidayForm.controls["holidayDate"].setValue(date);
    this.holidayForm.controls["holidayDescription"].setValue(data.holidayDescription);
    this.holidayForm.controls["holidayRecordNumber"].setValue(data.holidayRecordNumber);
  }

  saveHolidayChanges(data: any) {
    if (data.holidayDate == "") {
      this.holidayForm.get('holidayDate')?.setErrors({ required: this.titleAlert })
    }
    if (this.holidayForm.valid) {
      let holidayId;
      if(this.editData?.holidayID!=undefined){
        holidayId=this.editData?.holidayID;
      }
      const obj = {
        "globalHolidayModel": {
          "createUserID": 0,
          "updateUserID": 0,
          "createDatetime": "2022-04-22T08:10:10.007Z",
          "updateDatetime": "2022-04-22T08:10:10.007Z",
          "isDeleted": "N",
          "holidayID": holidayId,
          "contractID": 0,
          "active": true,
          "holidayDate": data.holidayDate,
          "holidayDescription": data.holidayDescription.trim(),
          "holidayRecordNumber": data.holidayRecordNumber,
        }
      }
      this.globalHolidayService.UpdateHoliday(obj).subscribe(res => {
        if (res.status == 'Success') {
          const msg = "";
          this.notificationService.success(this.translate.instant('Record Updated Successfully', { msg: msg }))
          this.getList();
          this.showAddForm = false;
          this.AddHolidayButton = true;
          this.holidayForm.reset();
        }
      },
      error => {
         this.errorResponseCheck(error);
      }
        )
    }
  }

  toggleCourtHoliday(data: any, status: boolean) {
    const msgs = "";
    const obj = {
      "holidayId": data.holidayID
    }
    if (status) {
      if (confirm(this.translate.instant("Are you sure you want to Enable Global Holiday", { msg: msgs }))) {
        this.globalHolidayService.toggleGlobalHoliday(obj).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            this.successMsg = this.translate.instant("Holiday Enabled Successfully", { msg: msg });
            this.notificationService.success(this.successMsg);
            this.getList();
          }
        })

      }
    } else {
      if (confirm(this.translate.instant("Are you sure you want to Disable Global Holiday", { msg: msgs }))) {
        this.globalHolidayService.toggleGlobalHoliday(obj).subscribe(res => {
          if (res.status === "Success") {
            const msg = "";
            this.successMsg = this.translate.instant("Holiday Disabled Successfully", { msg: msg });
            this.notificationService.success(this.successMsg);
            this.getList();
          }
        })

      }
    }
  }
  // ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//
  errorResponseCheck(error: any) { 
    if(error.error.details)
   { 
      for (var i = 0; i < error.error.details.length; i++) {
      if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
        const msg = "";
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.holidayForm.get('holidayDate')?.markAllAsTouched();
        this.holidayForm.get('holidayDate')?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }}
    else {
      this.notificationService.error("Oops... something went wrong please try again.   " + error.message)
    }
  }
}