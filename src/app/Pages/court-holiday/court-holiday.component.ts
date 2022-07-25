import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { CourtHolidayService } from 'src/app/Services/CourtHoliday/court-holiday.service';
import { CourtHoliday, courtHolidayModel } from 'src/app/Models/Models/courtHoliday.Model';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common'
import { get } from 'lodash';

@Component({
  selector: 'app-court-holiday',
  templateUrl: './court-holiday.component.html',
  styleUrls: ['./court-holiday.component.scss']
})
export class CourtHolidayComponent implements OnInit {
  date = new FormControl(new Date());

  serializedDate = new FormControl(new Date().toISOString());
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!: ElementRef;

  displayedColumns: string[] = ['holidayDate', 'holidayDescription', 'holidayRecordNumber', 'Action'];
  holidayList!: any;
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  dataSource = new MatTableDataSource<CourtHoliday>();
  alertMsg!: string;
  successMsg!: string;
  holidayForm!: FormGroup;
  titleAlert: string = 'This field is required';
  updateHoliday!: courtHolidayModel;
  showDataTable: boolean = true;
  updatedValues!: courtHolidayModel;
  minDate!: Date;
  welcome: any;

  constructor(public translate: TranslateService,
    private headerSection: LanguageService,
    private courtHolidayService: CourtHolidayService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService,) { }
  filterData(): void {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.holidayDate?.toLocaleLowerCase().includes(filter) || data.holidayDescription?.toLocaleLowerCase().includes(filter) || data.holidayRecordNumber?.toString() === filter;
    };
  }

  ngOnInit(): void {
    this.minDate = new Date();
    this.getCourtHoliday();
    this.headerSection.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    this.holidayForm = new FormGroup({
      'holidayDate': new FormControl(""),
      'holidayDescription': new FormControl("", [Validators.required, Validators.maxLength(50)]),
      'holidayRecordNumber': new FormControl(0, [Validators.pattern('^[0-9]\\d*$'), Validators.minLength(1)]),
    });
  }
  //------------------------------GETTING/SETTING FORM VALUES---------------------------->
  get holidayDate() {
    return this.holidayForm.get('holidayDate') as FormControl
  }

  get holidayDescription() {
    return this.holidayForm.get('holidayDescription') as FormControl
  }

  get holidayRecordNumber() {
    return this.holidayForm.get('holidayRecordNumber') as FormControl
  }

  //-----------------------------------SORTING------------------------------------------>
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  //<<---------------------------------------------SORTING END-------------------------------->

  addHoliday() {
    this.holidayForm.controls["holidayRecordNumber"].setValue(0);
    this.showAddForm = true;
    this.showDataTable = false;
  }
  getCourtHoliday() {
    this.courtHolidayService.getCourtHoliday().subscribe(res => {
      this.holidayList = res.map((element: any) => new CourtHoliday(element));
      this.dataSource = new MatTableDataSource<CourtHoliday>(this.holidayList.reverse());
      this.dataSource.sort = this.sort;
      this.sort.disableClear = true;

      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
        switch (sortHeaderId) {
          case 'holidayDate': return new Date(data.holidayDate).getUTCFullYear().toLocaleString();
          case 'holidayDescription': return data.holidayDescription.toLocaleLowerCase();
          case 'holidayRecordNumber': return data.holidayRecordNumber;
          default: return data[sortHeaderId];
        }
      };
      this.dataSource.paginator = this.paginator;
      this.filterData();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  cancelCourtlHoliday() {
    this.showAddForm = false;
    this.showDataTable = true;
    this.showEditForm = false;
    this.holidayForm.reset();
    this.getCourtHoliday();
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }
  toggleCourtHoliday(id: number, status: boolean) {
    const msgs = "";
    if (status) {
      if (confirm(this.translate.instant(`Are you sure you want to Enable the court holiday?`, { msg: msgs }))) {
        const obj = {
          "holidayId": id
        }
        this.courtHolidayService.toggleCourtHoliday(obj).subscribe(res => {
          if (res.status == "Success") {
            this.notificationService.success(this.translate.instant("Court Holiday Enabled Successfully", { msg: msgs }));
            this.getCourtHoliday();
          }
        })

      }
    } else {
      if (confirm(this.translate.instant(`Are you sure you want to Disable the court holiday?`, { msg: msgs }))) {
        const obj = {
          "holidayId": id
        }
        this.courtHolidayService.toggleCourtHoliday(obj).subscribe(res => {
          if (res.status === "Success") {
            this.notificationService.success(this.translate.instant("Court Holiday Disabled Successfully", { msg: msgs }));
            this.getCourtHoliday();
          }
        })

      }
    }
  }
  //                                UPDATING COURT HOLIDAY
  updateHolidayRecord(data: courtHolidayModel) {
    this.showEditForm = true;
    this.showDataTable = false;
    this.updateHoliday = data;
    const date = formatDate(new Date(this.updateHoliday.holidayDate).toLocaleDateString(), 'yyyy-MM-dd', 'en');
    this.holidayForm.patchValue({
      holidayDate: date,
      holidayDescription: get(this.updateHoliday, 'holidayDescription'),
      holidayRecordNumber: get(this.updateHoliday, 'holidayRecordNumber')
    })
  }
  saveHolidayChanges(data: any) {
    if (data.holidayDate == "") {
      this.holidayForm.get('holidayDate')?.setErrors({ required: this.titleAlert })
    }
    if (this.holidayForm.valid) {
      const obj = {
        "courtHolidayModel": {
          "createUserID": 0,
          "updateUserID": 0,
          "createDatetime": "2022-04-04T05:02:40.543Z",
          "updateDatetime": "2022-04-04T05:02:40.543Z",
          "holidayId": this.updateHoliday.holidayId,
          "contractID": 0,
          "active": true,
          "isDeleted": 'N',
          "holidayDate": data.holidayDate,
          "holidayDescription": data.holidayDescription.trim(),
          "holidayRecordNumber": data.holidayRecordNumber,
        }
      }
      this.courtHolidayService.updateCourtHoliday(obj).subscribe(res => {
        if (res.status === "Success") {
          const msg = "";
          this.notificationService.success(this.translate.instant("Court Holiday Updated Successfully", { msg: msg }));
          this.getCourtHoliday();
          this.showDataTable = true;
          this.showEditForm = false;
          this.holidayForm.reset();
          this.searchString.nativeElement.value = ""
        }
      }, error => this.errorResponseCheck(error))
    }
  }
  createCHoliday(data: any) {
    this.sort.sort({ id: '', start: 'asc', disableClear: false }) //To Disable the applied sorting so that the inserted record will appear at top
    if (data.holidayDate === "" || data.holidayDate === null) {
      this.holidayForm.get('holidayDate')?.setErrors({ required: this.titleAlert })
    }
    if (this.holidayForm.valid) {
      const obj = {
        "courtHolidayModel": {
          "createUserID": 0,
          "updateUserID": 0,
          "createDatetime": "2022-04-04T05:02:40.543Z",
          "updateDatetime": "2022-04-04T05:02:40.543Z",
          "holidayId": 0,
          "contractID": 0,
          "isDeleted": 'N',
          "active": true,
          "holidayDate": data.holidayDate,
          "holidayDescription": data.holidayDescription.trim(),
          "holidayRecordNumber": data.holidayRecordNumber,
        }
      }
      this.courtHolidayService.addCourtHoliday(obj).subscribe((res) => {
        if (res.status === "Success") {
          const msg = "";
          this.successMsg = this.translate.instant(res.details[0].code, { msg: msg });
          this.notificationService.success(this.successMsg);
          this.holidayForm.reset();
          this.paginator.pageIndex = 0;
          this.getCourtHoliday();
          this.showAddForm = false;
          this.showDataTable = true;
          this.searchString.nativeElement.value = ""
        }
      }, error => {
        this.errorResponseCheck(error)
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
        this.holidayForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        if(error.error.details[i].fieldName === "holidayDateAndHolidayDescription") {
          this.holidayForm.get('holidayDate')?.setErrors({ invalid: "Duplicate Record Found" })
          this.holidayForm.get('holidayDescription')?.setErrors({ invalid: "Duplicate Record Found" })
          this.notificationService.error(this.translate.instant("Duplicate Record Found", { msg: msg }))
        }
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }

}



