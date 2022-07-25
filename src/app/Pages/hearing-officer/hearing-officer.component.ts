import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { hearingOfficerList } from 'src/app/Models/hearingofficer.interface';

import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-hearing-officer',
  templateUrl: './hearing-officer.component.html',
  styleUrls: ['./hearing-officer.component.scss']
})
export class HearingOfficerComponent implements OnInit {

  displayedColumns: string[] = ['hearingOfficerID', 'hearingOfficerFullName', 'hearingCAD', 'hearingDivision', 'agencyName', 'agencyCode', 'Action'];
  public data: any;

  dataSource = new MatTableDataSource<hearingOfficerList>();
  HOfficerForm!: FormGroup;
  HOffiverList!: hearingOfficerList[];
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
  juridictionResp: any;
  showCross: boolean = false;
  file: any;
  fileData: any = [];
  fileArray: any = [];
  urlData: any;
  uploadfile: any;
  hearingofficerResp: any;
  weekDaysResp: any;
  weeks: any = [];
  hearingDivisionResp: any;
  disable: boolean = false;
  logoImgBytes: any;
  isFileUploaded: string = "N";
  fileName: any;
  pdfSrc: any;
  starttime!: string;
  endtime!: string;


  constructor(
    public translate: TranslateService,
    private language: LanguageService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData();
    this.language.sendLang.subscribe(lang => {
      if (lang != "") {
        this.appendLang(lang);
      }
    });

    this.HOfficerForm = new FormGroup({
      'hearingOfficerNumber': new FormControl("", [Validators.required, Validators.maxLength(6)]),
      'hearingOfficerFullName': new FormControl("", [Validators.required, Validators.maxLength(50)]),
      'hearingCAD': new FormControl("", [Validators.required, Validators.maxLength(9)]),
      'hearingBadge': new FormControl("", [Validators.required, Validators.maxLength(6)]),
      'hearingDivisionID': new FormControl("", [Validators.required]),
      'jurisdictionsID': new FormControl("", [Validators.required]),
      'signatureUpload': new FormControl(""),
      'timeRangeScheduleStartTime': new FormControl(""),
      'timeRangeScheduleEndTime': new FormControl(""),
      'weekDays': new FormControl(""),
      'hearingAgencyID': new FormControl("", [Validators.required]),
      'hearingAgencyCode': new FormControl(""),
      'hearingAgencyLongName': new FormControl(""),

    });

    //To get Jurisdictions Dropdown Values
    this.apiService.get('Jurisdictions/getAllJurisdictions', true).subscribe(res => {
      this.juridictionResp = res;
    });


    //To get HearingOfficer Dropdown Values
    this.apiService.get('HearingOfficer/getHearingAgencyList', true).subscribe(res => {
      this.hearingofficerResp = res;
    });

    //To get WeekDays list Values
    this.apiService.get('HearingOfficer/getWeekDays', true).subscribe(res => {
      this.weekDaysResp = res;
    });

    //To get WeekDays list Values
    this.apiService.get('HearingOfficer/getHearingDivisionList', true).subscribe(res => {
      this.hearingDivisionResp = res;
    });

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


  getData() {
    this.apiService.get('HearingOfficer/getAllHearingOfficer', true).subscribe(res => {
      this.HOffiverList = res.map((element: any) => {
        return new hearingOfficerList(element)
      });
      this.dataSource = new MatTableDataSource<hearingOfficerList>(this.HOffiverList.reverse());
      this.dataSource.sort = this.sort;
      this.sort.disableClear = true;

      this.isFileUploaded = res.isFileUploaded;
      console.log(res);
      console.log(this.isFileUploaded);
      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
        return data[sortHeaderId];
      };
      this.dataSource.paginator = this.paginator;
      this.filterData();
    })
  }
  filterData() {
    this.dataSource.filterPredicate = this.predicateFilter
  }
  predicateFilter(rowData: any, filterValue: string): boolean {
    return Object.keys(rowData).some(s => (rowData[s]?.toString().toLowerCase().includes(filterValue)))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  showAddFormPage() {
    this.showAddForm = true;
    this.addBtn = true;
    this.showEditForm = false;

  }
  cancelAdd_Save() {
    this.showAddForm = false;
    this.HOfficerForm.reset();
    this.resetUpload();
    this.searchString.nativeElement.value = "";
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.getData();
    this.notificationService.info(this.translate.instant('Process Cancelled'));

  }
  setAgencyCode(event: any) {
    this.hearingofficerResp.forEach((element: any) => {
      if (element.hearingAgencyID == event) {
        this.HOfficerForm.controls['hearingAgencyCode'].setValue(element.hearingAgencyCode);
      }
    })
  }

  addRecord(data: any) {
    // this.checkValidations(data);
    this.paginator.pageIndex = 0;
    this.searchString.nativeElement.value = ""
    // if (data.timeRangeScheduleStartTime) {
    //   const start = data.timeRangeScheduleStartTime;
    //   const matche = start.toLowerCase().match(/(\d{1,2}):(\d{2}) ([ap]m)/);
    //   this.starttime = (parseInt(matche[1]) + (matche[3] == 'pm' ? 12 : 0)) + ':' + matche[2] + ':00';
    // }
    // if (data.timeRangeScheduleStartTime) {
    //   const end = data.timeRangeScheduleEndTime;
    //   const matches = end.toLowerCase().match(/(\d{1,2}):(\d{2}) ([ap]m)/);
    //   this.endtime = (parseInt(matches[1]) + (matches[3] == 'pm' ? 12 : 0)) + ':' + matches[2] + ':00';
    // }


    this.sort.sort(
      { id: '', start: 'asc', disableClear: false }
    )
    if (this.HOfficerForm.valid) {
      const obj = {
        hearingOfficerModel: {
          createUserID: 1,
          updateUserID: 1,
          isDeleted: "N",
          hearingOfficerID: 0,
          contractID: 2,
          hearingOfficerNumber: data.hearingOfficerNumber,
          hearingCAD: data.hearingCAD,
          hearingAgencyID: parseInt(data.hearingAgencyID),
          hearingDivisionID: 1,
          hearingBadge: data.hearingBadge,
          hearingAgencyCode: data.hearingAgencyCode,
          hearingOfficerFullName: data.hearingOfficerFullName,
          hearingOfficerShortName: data.hearingOfficerShortName,
          imagePath: data.imagePath,
          jurisdictionsID: parseInt(data.jurisdictionsID),
          active: true,
          isFileUploaded: data.isFileUploaded,
          timeRangeScheduleStartTime: data.timeRangeScheduleStartTime,
          timeRangeScheduleEndTime: data.timeRangeScheduleEndTime,
          weekDays: data.weekDays ? data.weekDays : [],
          fileToUpload: this.logoImgBytes,
          fileName: this.file,
        }

      };

      this.apiService.post('HearingOfficer/addHearingOfficer', obj, true).subscribe(
        (res) => {
          if (res.status == 'Success') {
            const msg = '';
            const code = res.details[0].code;
            this.successMsg = this.translate.instant('Record Added Successfully', {
              msg: msg,
            });
            this.notificationService.success(this.successMsg);
            this.resetUpload();
            this.HOfficerForm.reset();
            if (this.dataSource.paginator) {
              this.dataSource.paginator.firstPage();
            }
            this.getData();
            this.showAddForm = false;
            this.showEditForm = false;

          }
        },
        error => {
          this.errorResponseCheck(error);
        })
    }
  }

  editRecord(ID: any) {

    this.apiService.get(`HearingOfficer/getHearingOfficerById?HearingOfficerId=${ID}`, true).subscribe(res => {
      this.editData = res;
      this.showAddForm = true;
      this.showEditForm = true;
      this.addBtn = false;
      if (res.timeRangeScheduleStartTime) {
        const timeString = res.timeRangeScheduleStartTime;
        const starttime = new Date('1970-01-01T' + timeString + 'Z').toLocaleTimeString('en-US',
          { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
        );
        this.HOfficerForm.controls['timeRangeScheduleStartTime'].setValue(res.timeRangeScheduleStartTime);
      } else this.HOfficerForm.controls['timeRangeScheduleStartTime'].setValue('');

      if (res.timeRangeScheduleEndTime) {
        const timeStrings = res.timeRangeScheduleEndTime;
        const endtime = new Date('1970-01-01T' + timeStrings + 'Z').toLocaleTimeString('en-US',
          { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
        );
        this.HOfficerForm.controls['timeRangeScheduleEndTime'].setValue(res.timeRangeScheduleEndTime);

      } else this.HOfficerForm.controls['timeRangeScheduleEndTime'].setValue('');
      this.HOfficerForm.controls['hearingOfficerNumber'].setValue(this.editData?.hearingOfficerNumber);
      this.HOfficerForm.controls['hearingOfficerFullName'].setValue(this.editData?.hearingOfficerFullName);
      this.HOfficerForm.controls['hearingCAD'].setValue(this.editData?.hearingCAD);
      this.HOfficerForm.controls['hearingBadge'].setValue(this.editData?.hearingBadge);
      this.HOfficerForm.controls['hearingAgencyID'].setValue(this.editData?.hearingAgencyID.toString());
      this.HOfficerForm.controls['hearingDivisionID'].setValue(this.editData?.hearingDivisionID.toString());
      this.hearingofficerResp.forEach((element: any) => {
        if (element.hearingAgencyID == this.editData?.hearingAgencyID) {
          this.HOfficerForm.controls['hearingAgencyCode'].setValue(element.hearingAgencyCode);
        }
      })

      this.HOfficerForm.controls['jurisdictionsID'].setValue(this.editData?.jurisdictionsID.toString());
      this.HOfficerForm.controls['weekDays'].setValue(this.editData?.weekDays);
      if (res.fileName) {
        this.file = res.fileName;
      } else this.file = ''


    })
  }
  updateRecord(data: any) {
    // this.checkValidations(data);
    this.searchString.nativeElement.value = ""
    if (this.HOfficerForm.valid) {
      // if (data.timeRangeScheduleStartTime) {
      //   const start = data.timeRangeScheduleStartTime;
      //   const matche = start.toLowerCase().match(/(\d{1,2}):(\d{2}) ([ap]m)/);
      //   this.starttime = (parseInt(matche[1]) + (matche[3] == 'pm' ? 12 : 0)) + ':' + matche[2] + ':00';
      // }
      // if (data.timeRangeScheduleStartTime) {
      //   const end = data.timeRangeScheduleEndTime;
      //   const matches = end.toLowerCase().match(/(\d{1,2}):(\d{2}) ([ap]m)/);
      //   this.endtime = (parseInt(matches[1]) + (matches[3] == 'pm' ? 12 : 0)) + ':' + matches[2] + ':00';
      // }

      const obj = {
        hearingOfficerModel: {
          createUserID: 0,
          updateUserID: 0,
          createDatetime: "2022-06-28T14:28:38.905Z",
          updateDatetime: "2022-06-28T14:28:38.905Z",
          isDeleted: "N",
          hearingOfficerID: this.editData.hearingOfficerID,
          contractID: 0,
          hearingOfficerNumber: data.hearingOfficerNumber,
          hearingCAD: data.hearingCAD,
          hearingBadge: data.hearingBadge,
          hearingAgencyID: data.hearingAgencyID,
          hearingDivisionID: data.hearingDivisionID,
          hearingOfficerFullName: data.hearingOfficerFullName,
          hearingOfficerShortName: data.hearingOfficerShortName,
          imagePath: this.editData.imagePath,
          jurisdictionsID: data.jurisdictionsID,
          active: true,
          isFileUploaded: data.isFileUploaded,
          timeRangeScheduleStartTime: data.timeRangeScheduleStartTime,
          timeRangeScheduleEndTime: data.timeRangeScheduleEndTime,
          weekDays: data.weekDays ? data.weekDays : [],
          fileToUpload: this.logoImgBytes,
          fileName: this.file,
        }
      }

      this.apiService.put(`HearingOfficer/UpdateHearingOfficer`, obj, true).subscribe(res => {
        if (res.status === 'Success') {
          this.showAddForm = false;
          this.HOfficerForm.reset();
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
          this.getData();
          const msg = '';
          this.welcome = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.welcome);
          this.resetUpload();
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }

  toggleRecord(data: any, status: boolean) {
    const msgs = "";
    if (status) {
      if (confirm(this.translate.instant(`Are you sure you want to Enable the Hearing Officer?`, { msg: msgs }))) {

        this.apiService.put(`HearingOfficer/changeStatusHearingOfficer?HearingOfficerId=${data}`, data, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Hearing Officer Enabled Successfully", { msg: msgs }));
            this.getData();
          }
        })

      }
    } else {
      if (confirm(this.translate.instant(`Are you sure you want to Disable the Hearing Officer?`, { msg: msgs }))) {

        this.apiService.put(`HearingOfficer/changeStatusHearingOfficer?HearingOfficerId=${data}`, data, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Hearing Officer Disabled Successfully", { msg: msgs }));
            this.getData();
          }
        })

      }
    }
  }

  UploadFile(file: any) {
    let files = file.target.files[0];
    if (file.target.files[0].type == "image/png" || file.target.files[0].type == "image/jpeg") {
      if (file.target.files[0].size < 2000000) {
        this.fileData = [];
        this.fileData.push(file.target.files[0]);
        this.file = this.fileData[0].name;
        this.showCross = true;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.logoImgBytes = e.target.result.split('base64,')[1];
        };
        reader.readAsDataURL(files);
        this.isFileUploaded = 'Y'
      }
      else {
        const msg = "";
        this.successMsg = this.translate.instant("File size should not greater than 2MB", { msg: msg });
        this.notificationService.error(this.successMsg);
        this.HOfficerForm.controls['signatureUpload'].setValue(null);
        this.isFileUploaded = 'N'
      }
    } else {
      const msg = "";
      this.successMsg = this.translate.instant("Please Upload file only JPEG/PNG format", { msg: msg });
      this.notificationService.error(this.successMsg);
      this.HOfficerForm.controls['signatureUpload'].setValue(null);
    }
  }

  resetUpload() {
    this.HOfficerForm.controls['signatureUpload'].setValue(null);
    this.file = "";
    this.showCross = false;
    this.fileData = [];
  }



  // checkValidations(data: any) {
  //   console.log(data)
  //   if ((this.HOfficerForm.get("weekDays")?.value == [] || !this.HOfficerForm.get("weekDays")?.value) && ((this.HOfficerForm.get("timeRangeScheduleStartTime")?.value) || (this.HOfficerForm.get("timeRangeScheduleEndTime")?.value))) {
  //     this.HOfficerForm.get("weekDays")?.setErrors({ invalid: "Days of the Week must be selected when time is present" });
  //   }

  //   if ((this.HOfficerForm.get("timeRangeScheduleStartTime")?.value == "") &&
  //     (this.HOfficerForm.get("weekDays")?.value?.length) || (this.HOfficerForm.get("timeRangeScheduleEndTime")?.value)) {
  //     this.HOfficerForm.get("timeRangeScheduleStartTime")?.setErrors({ invalid: "Start Time need to select" });
  //   }

  //   if ((this.HOfficerForm.get("timeRangeScheduleEndTime")?.value == "") && (this.HOfficerForm.get("weekDays")?.value?.length) || this.HOfficerForm.get("timeRangeScheduleStartTime")?.value) {
  //     this.HOfficerForm.get("timeRangeScheduleEndTime")?.setErrors({ invalid: "End Time need to select" });
  //   }
  //   if ((this.HOfficerForm.get("weekDays")?.value == []) && !(this.HOfficerForm.get("timeRangeScheduleStartTime")?.value) && !(this.HOfficerForm.get("timeRangeScheduleEndTime")?.value)) {
  //     this.HOfficerForm.get("weekDays")?.setErrors({});
  //     this.HOfficerForm.get("timeRangeScheduleStartTime")?.setErrors({});
  //     this.HOfficerForm.get("timeRangeScheduleEndTime")?.setErrors({});
  //     this.HOfficerForm.get("weekDays")?.updateValueAndValidity();
  //     this.HOfficerForm.get("timeRangeScheduleStartTime")?.updateValueAndValidity();
  //     this.HOfficerForm.get("timeRangeScheduleEndTime")?.updateValueAndValidity();
  //   }
  // }


  // ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//
  errorResponseCheck(error: any) {

    for (var i = 0; i < error.error.details.length; i++) {
      if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
        const msg = "";
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        this.welcome = this.translate.instant(translateCode, { msg: msg });

      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.HOfficerForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
        this.HOfficerForm.get("hearingOfficerNumber")?.setErrors({ invalid: "Hearing Officer ID Duplicate" });

      } 

      else if (error.error.details[i].message == "UnexpectedError" && error.error.details[i].code == "6000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.developerMessage, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });

        if (error.error.developerMessage === "One or more errors occurred. (WeekDaysMissing) (EndTimeMissing)"){
          this.HOfficerForm.get("weekDays")?.setErrors({ invalid: "Week Days Is Missing" });
          this.HOfficerForm.get("timeRangeScheduleEndTime")?.setErrors({ invalid: "End Time Is Missing" });
        }
        if (error.error.developerMessage === "One or more errors occurred. (WeekDaysMissing) (StartTimeMissing)"){
          this.HOfficerForm.get("weekDays")?.setErrors({ invalid: "Week Days Is Missing" });
          this.HOfficerForm.get("timeRangeScheduleStartTime")?.setErrors({ invalid: "Start Time Is Missing" });
        }
        if (error.error.developerMessage === "One or more errors occurred. (StartTimeMissing) (EndTimeMissing)") {
          this.HOfficerForm.get("timeRangeScheduleStartTime")?.setErrors({ invalid: "Start Time Is Missing" });
          this.HOfficerForm.get("timeRangeScheduleEndTime")?.setErrors({ invalid: "End Time Is Missing" });

        }

        if (error.error.developerMessage === "One or more errors occurred. (WeekDaysMissing)") {
          this.HOfficerForm.get("weekDays")?.setErrors({ invalid: "Week Days Is Missing" });
        }
        if (error.error.developerMessage === "One or more errors occurred. (StartTimeMissing)") {
          this.HOfficerForm.get("timeRangeScheduleStartTime")?.setErrors({ invalid: "Start Time Is Missing" });
        }

        if (error.error.developerMessage === "One or more errors occurred. (EndTimeMissing)") {
          this.HOfficerForm.get("timeRangeScheduleEndTime")?.setErrors({ invalid: "End Time Is Missing" });
        }

      }



      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }



  openDialogWithTemplateRef(templateRef: TemplateRef<any>, element: any) {

    this.pdfSrc = element;
    this.dialog.open(templateRef);
  }


  changeLeagueOwner(value: any) {

    console.log(value)
  }
}