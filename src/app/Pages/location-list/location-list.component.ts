import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import * as _ from 'lodash';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ViewportScroller } from "@angular/common";


@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})

export class LocationListComponent implements OnInit {
  @ViewChild('search') searchString!: ElementRef;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  locationDataSource!: MatTableDataSource<any>;
  lanesDataSource!: MatTableDataSource<any>;
  speedDataSource!: MatTableDataSource<any>;

  @ViewChild('locationsort') locationsort = new MatSort();
  @ViewChild('lanesSort') lanesSort = new MatSort();
  @ViewChild('speedSort') speedSort = new MatSort();
  @ViewChild('searchLane') searchStrings!: ElementRef;
  @ViewChild('searchSpeed') searchSpeedStr!: ElementRef;
  @ViewChild('lanesPaginator') lanesPaginator!: MatPaginator;
  @ViewChild('speedPaginator') speedPaginator!: MatPaginator;

  showAddForm = false;
  displayedColumns: string[] = ['locationsName', 'locationsCode', 'locationsDescription', 'amberTime', 'latitude',
    'longitude', 'jurisdictionsName', 'active',];
  lanesDisplayColumns: string[] = ['laneNum', 'laneMinSpeed', 'action'];
  speedDisplayColumns: string[] = ['speedLimit', 'enforcementSpeed', 'startTime', 'endTime', 'weekDays', 'action']

  titleAlert: string = 'This field is required';
  editData: any;
  searchData: any;
  contractId: string = '2';
  isRedLight: boolean = true;
  showEditForm: boolean = false;
  LocationForm!: FormGroup;
  successMsg: any;
  welcome: any;
  cameraTypes: any;
  Jurisdictions: any = [];
  juridictionResp: any;
  rejectYellowCat: any;
  showAddLane: boolean = false;
  hideLaneList: boolean = false;
  valueItems: any;
  locationsData: any;
  alertMsg: any;
  editRowId!: number;
  laneList: any = [];
  updatedLaneList: any = [];
  isLaneDeleted: boolean = false;
  lanesTableData: any;
  deletedLaneData: any = [];
  isDuplicateLane: boolean = false;
  showAddSpeed: boolean = false;
  hideSpeedList: boolean = false;
  speedList: any = [];
  updatedSpeedList: any = [];
  isDuplicateSpeed: boolean = false;
  deletedSpeedData: any = [];
  isSpeedDeleted: boolean = false;
  contractID: any;
  contractType: any;
  laneNumError: boolean = false;
  laneMinSpeedError: boolean = false;
  selected: string = 'WB';
  varSpeedError: boolean = false;
  varStartTimeError: boolean = false;
  varEndTimeError: boolean = false;
  weekDaysError: boolean = false;
  valWarningPeriodStart: boolean = false;
  valEnforcementPeriodStart: boolean = false;
  minDate!: any;

  constructor(private apiService: ApiService, public translate: TranslateService,
    private language: LanguageService, private notificationService: ToastrService,
    private validationService: ValidationService, private scroller: ViewportScroller,
    private _liveAnnouncer: LiveAnnouncer,) { }

  ngOnInit(): void {
    this.language.sendLang.subscribe(lang => {
      if (lang != "") {
        this.appendLang(lang);
      }
    });
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    this.minDate = now;
    // For Value dropdown
    this.valueItems = [{
      id: 1,
      name: 'WB'
    },
    {
      id: 2,
      name: 'EB'
    },
    {
      id: 3,
      name: 'NB'
    },
    {
      id: 4,
      name: 'SB'
    }
    ]

    // For Contract dropdown
    this.contractType = [{
      id: 2,
      name: 'Red Light'
    },
    {
      id: 1,
      name: 'Speed'
    }
    ]

    this.contractID = this.contractType[0].id;

    this.LocationForm = new FormGroup({
      'locationsCode': new FormControl(null, [Validators.required]),
      'locationsName': new FormControl(null, [Validators.required]),
      'cameraType': new FormControl(null, [Validators.required]),
      'latitude': new FormControl(null, [Validators.maxLength(10), Validators.pattern("^(\\+|-)?(?:90(?:(?:\\.000{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$")]),
      'longitude': new FormControl(null, [Validators.maxLength(10), Validators.pattern("^(\\+|-)?(?:180(?:(?:\\.000{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$")]),
      'locationsDescription': new FormControl(),
      'enable': new FormControl(false),
      'lprEnable': new FormControl(false),
      'speedLimit': new FormControl(0),
      'warningPeriodStart': new FormControl(null, [Validators.required]),
      'enforcementPeriodStart': new FormControl(null, [Validators.required]),
      // 'enforcementSpeed': new FormControl(0),
      'redSeconds': new FormControl(null, [Validators.required, Validators.pattern('[1-9]|10')]),
      'yellowSeconds': new FormControl(null, [Validators.required, Validators.pattern('[1-9]|10')]),
      'value': new FormControl(),
      'jurisdictionsID': new FormControl(null, [Validators.required]),
      'rejectAmberSecBelow': new FormControl(false),
      'belowSecondsValue': new FormControl(''),
      'rejectYellowSec': new FormControl(null, [Validators.required]),
      'laneNum': new FormControl(),
      'laneMinSpeed': new FormControl(),
      'varSpeedLimit': new FormControl(null),
      'varEnforcementSpeed': new FormControl(),
      'startTime': new FormControl(),
      'endTime': new FormControl(),
      'weekDays': new FormControl(),
    });

    //To get Camera Type Dropdown Values
    this.apiService.get('CameraType/getAllCameraType', true).subscribe(res => {
      this.cameraTypes = res;
    });

    //To get Jurisdictions Dropdown Values
    this.apiService.get('Jurisdictions/getAllJurisdictions', true).subscribe(res => {
      this.juridictionResp = res;
    });

    // To get Reject Yellow Seconds Dropdown Values
    this.apiService.get('ActionCategories/getActionCategories', true).subscribe(resp => {
      if (resp) {
        this.rejectYellowCat = resp;
      }
    });

    this.getList();
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  appendLangInAdd(lang: string) {
    this.translate.use(lang);
    this.setLanePagelabel(lang);
    let red=!this.isRedLight;
    if (!this.isRedLight) {
      this.setSpeedPagelabel(lang);
    }
  }

  appendLang(lang: string) {
    this.translate.use(lang);
    this.setLocationPagelabel(lang);
  }

  setLocationPagelabel(lang: any) {
    const msg = "";
    this.translate.use(lang).toPromise();
    this.translate
      .use(lang)
      .subscribe(res => {
        if(this.paginator)
        {
          this.locationDataSource.paginator = this.paginator;
          this.alertMsg = this.translate.instant("Items per page", { msg: msg });
          this.locationDataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;
        }
      });
  }

  setLanePagelabel(lang: any) {
    const msg = "";
    this.translate.use(lang).toPromise();
    this.translate
      .use(lang)
      .subscribe(res => {
        if(this.lanesPaginator)
       { this.lanesDataSource.paginator = this.lanesPaginator;
        this.alertMsg = this.translate.instant("Items per page", { msg: msg });
        this.lanesDataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;}
      });
  }

  setSpeedPagelabel(lang: any) {
    const msg = "";
    this.translate.use(lang).toPromise();
    this.translate
      .use(lang)
      .subscribe(res => {
        if(this.speedPaginator)
      {  this.speedDataSource.paginator = this.speedPaginator;
        this.alertMsg = this.translate.instant("Items per page", { msg: msg });
        this.speedDataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;}
      });
  }

  // ----------------------------------DROPDOWN RELATED OPERATION-----------------------------------------//

  Cameralist(event: any) {
    if(event)
   {
    const result = this.cameraTypes.filter((element: { cameraTypesID: any; }) => {
      return element.cameraTypesID === event.value;
    });
    // To set the value
    if(result[0]!=undefined)
  {  this.LocationForm.controls['cameraType'].setValue(result[0].cameraTypesID);}
  }
  }

  rejectYellowCategory(event: any) {
    const result = this.rejectYellowCat.filter((element: { categoriesID: any; }) => {
      return element.categoriesID === event.value;
    });
    // To set the value
    if(result[0]!=undefined)
    {this.LocationForm.controls['rejectYellowSec'].setValue(result[0].categoriesID);}
  }

  valueSelect(event: any) {
    const result = this.valueItems.filter((element: { name: any; }) => {
      return element.name === event.value;
    });
    // To set the value
    if(result[0]!=undefined)
    {this.LocationForm.controls['value'].setValue(result[0].name);}
  }

  contractSelect(event: any) {
    const result = this.contractType.filter((element: { id: any; }) => {
      return element.id === event.value;
    });
    // To set the value
    if(result[0]!=undefined)
    {this.contractID = result[0].id}
    this.getList();
  }

  juriID(event: any) {
    const result = this.Jurisdictions.filter((element: { jurisdictionsID: any; }) => {
      return element.jurisdictionsID === event.value;
    });
    // To set the value
    if(result[0]!=undefined)
    {this.LocationForm.controls['jurisdictionsID'].setValue(result[0].jurisdictionsID);}
  }

  // ----------------------------------LANES RELATED OPERATION STARTS-----------------------------------------//

  getLanesList(laneLocId?: number) {
    this.apiService.get('lanes/getLanebyLocationId?Id=' + laneLocId, true).subscribe(resp => {
      this.laneList = resp;
      this.lanesTableData = resp;
      console.log("LaneList:",this.laneList);
      if (resp) {
        this.lanesDataSource = new MatTableDataSource<any>(resp);
          this.lanesDataSource.sort = this.lanesSort;
          this.lanesSort.disableClear = true;
        this.lanefilterdata();
        this.lanesDataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
          if (typeof data[sortHeaderId] === 'string') {
            return data[sortHeaderId].toLocaleLowerCase();
          }
          return data[sortHeaderId];
        };
        this.lanesDataSource.paginator = this.lanesPaginator;
      }
    });
  }

  lanefilterdata() {
    this.lanesDataSource.filterPredicate = function (data, filter: string): boolean {
      return data.lanesNumber?.toString().includes(filter) || data.lanesMinimumSpeed?.toString().includes(filter)

    };
  }

  applyLaneFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
   this.lanesDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortLanesData(sortState: Sort) {
    if (sortState.active == 'laneNum') {
      if (sortState.direction == 'asc') {
        this.laneList = this.sortData
        this.lanesDataSource = new MatTableDataSource<any>(this.laneList);
      }
      else {
        this.laneList = this.sortData
        this.lanesDataSource = new MatTableDataSource<any>(this.laneList);
      }
    }
    if (sortState.active == 'laneMinSpeed') {
      if (sortState.direction == 'asc') {
        this.laneList = this.sortData
        this.lanesDataSource = new MatTableDataSource<any>(this.laneList);
      }
      else {
        this.laneList = this.sortData
        this.lanesDataSource = new MatTableDataSource<any>(this.laneList);
      }
    }
  }
get sortData() {
  return this.laneList.sort((a: any, b: any) => {
    return <any>new Date(b.createDatetime) - <any>new Date(a.createDatetime);
  });
}
  addLane() {
    this.LocationForm.controls['laneNum'].reset();
    this.LocationForm.controls['laneMinSpeed'].reset();
    this.showAddLane = true;
    this.scroller.scrollToAnchor("jurisdictionsID");
  }

  cancelLane() {
      if(this.searchStrings)
      {this.searchStrings.nativeElement.value = ""}

    this.LocationForm.controls['laneNum'].reset();
    this.LocationForm.controls['laneMinSpeed'].reset();
    this.showAddLane = false;
    this.laneList = [];
  }

  createLanesList() {
    this.lanesDataSource = new MatTableDataSource<any>();
    this.laneList = [];
  }

  errorHandlingLane(data: any) {
    if (data.laneMinSpeed == null) {
      this.LocationForm.get('laneMinSpeed')?.setErrors({ required: this.titleAlert })
    }
    if (data.laneNum == null) {
      this.LocationForm.get('laneNum')?.setErrors({ required: this.titleAlert })
    }
  }

  createLanesTable(data: any) {
    if (data.laneNum != null && data.laneMinSpeed != null) {
      if (this.laneList.length > 0) {
        this.isDuplicateLane = false;
        this.laneList!.forEach((item: any) => {
          if (data.laneNum == item.lanesNumber) {
            alert("Lane Number already exists");
            this.isDuplicateLane = true;
          }
        });
        if (!this.isDuplicateLane) {
          this.laneList.push({
            "createUserID": 1,
            "updateUserID": 1,
            "createDatetime": "2022-05-19T06:58:26.374Z",
            "updateDatetime": "2022-05-19T06:58:26.374Z",
            "isDeleted": 'N',
            "lanesID": 0,
            "contractID": this.isRedLight ? 2 : 1,
            "lanesNumber": data.laneNum,
            "lanesMinimumSpeed": data.laneMinSpeed,
            "locationsID": 0,
            "active": true
          })
        }
      }
      else {
        this.laneList.push({
          "createUserID": 1,
          "updateUserID": 1,
          "createDatetime": "2022-05-19T06:58:26.374Z",
          "updateDatetime": "2022-05-19T06:58:26.374Z",
          "isDeleted": 'N',
          "lanesID": 0,
          "contractID": this.isRedLight ? 2 : 1,
          "lanesNumber": data.laneNum,
          "lanesMinimumSpeed": data.laneMinSpeed,
          "locationsID": 0,
          "active": true
        })
      }
      if (this.showEditForm && !this.isDuplicateLane) {
        this.updatedLaneList.push({
          "createUserID": 1,
          "updateUserID": 1,
          "createDatetime": "2022-05-19T06:58:26.374Z",
          "updateDatetime": "2022-05-19T06:58:26.374Z",
          "isDeleted": 'N',
          "lanesID": 0,
          "contractID": this.isRedLight ? 2 : 1,
          "lanesNumber": data.laneNum,
          "lanesMinimumSpeed": data.laneMinSpeed,
          "locationsID": 0,
          "active": true
        })
      }

      this.lanesDataSource = new MatTableDataSource<any>();
      for (let i = 0; i < this.laneList.length; i++) {
        this.lanesDataSource.filteredData.push(this.laneList[i]);
      }
      if(this.lanesSort)
    {this.lanesDataSource.sort = this.lanesSort;
    this.lanesSort.disableClear = true;}
      this.lanefilterdata();
      this.lanesDataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
        return data[sortHeaderId];
      };
      if(this.lanesPaginator)
      {this.lanesDataSource.paginator = this.lanesPaginator;
      this.lanesPaginator.pageIndex = 0;}
      if(this.searchStrings)
      {this.searchStrings.nativeElement.value = "";}
      if(this.lanesSort)
    {  this.lanesSort.sort(
        { id: '', start: 'asc', disableClear: false }
      )}
      this.LocationForm.controls['laneNum'].reset();
      this.LocationForm.controls['laneMinSpeed'].reset();
      this.showAddLane = false;
    }
    else {
      if (data.laneNum == null) {
        this.laneNumError = true;
      }
      if (data.laneMinSpeed == null) {
        this.laneMinSpeedError = true;
      }
    }
  }

  validateLaneField(event: any) {
    if (event.value != null) {
      if (event.id == 'laneNum') {
        this.laneNumError = false
      }
      if (event.id == 'laneMinSpeed') {
        this.laneMinSpeedError = false;
      }
      if (event.id == 'varSpeedLimit') {
        this.varSpeedError = false;
      }
      if (event.id == 'startTime') {
        this.varStartTimeError = false;
      }
      if (event.id == 'endTime') {
        this.varEndTimeError = false;
      }
    }
  }


  addLanesData(lanesLocID: any) {
    if (this.searchStrings !== undefined) {
      this.searchStrings.nativeElement.value = ""
    }
    if(this.lanesSort)
   { this.lanesSort.sort(
      { id: '', start: 'asc', disableClear: false }
    )}
    this.laneList.forEach((item: any) => {
      item.locationsID = lanesLocID;
    });
    var obj = {
      "laneModel": this.laneList
    }
    this.apiService.post('Lanes/addLanes', obj, true).subscribe(resp => {
      if (resp.status == 'Success') {
        this.LocationForm.controls['laneNum'].reset();
        this.LocationForm.controls['laneMinSpeed'].reset();
      }
    },
      error => {
        this.errorResponseCheck(error);
      });
  }

  updateLanesData(lanesLocID: any) {
    if(this.searchStrings)
    {this.searchStrings.nativeElement.value = ""}
    if(this.lanesSort)
    {this.lanesSort.sort(
      { id: '', start: 'asc', disableClear: false }
    )}
    this.updatedLaneList.forEach((item: any) => {
      item.locationsID = lanesLocID;
    });
    const obj = {
      "laneModel": this.updatedLaneList
    }
    this.apiService.post('Lanes/addLanes', obj, true).subscribe(resp => {
      if (resp.status == 'Success') {
        this.LocationForm.controls['laneNum'].reset();
        this.LocationForm.controls['laneMinSpeed'].reset();
        this.updatedLaneList = [];
      }
    },
      error => {
        this.errorResponseCheck(error);
      });
  }

  // To delete Lanes record from the table list
  deleteLaneRow(data: any) {
    const msgs = "";
    if (confirm(this.translate.instant("Are you sure to delete the lane?", { msg: msgs }))) {
      this.deletedLaneData.push({
        "lanesID": data.lanesID ? data.lanesID : 0,
        "laneNum": data.lanesNumber,
        "laneSpeed": data.lanesMinimumSpeed
      });
      this.isLaneDeleted = true;
      this.laneList = this.removeRecordByID(this.laneList, 'lanesNumber', data.lanesNumber);
      if (this.showEditForm) {
        this.updatedLaneList = this.removeRecordByID(this.updatedLaneList, 'lanesNumber', data.lanesNumber);
      }
      this.lanesDataSource = new MatTableDataSource<any>();
      for (let i = 0; i < this.laneList.length; i++) {
        this.lanesDataSource.filteredData.push(this.laneList[i]);
      }
      if(this.searchStrings)
      {this.searchStrings.nativeElement.value = ""}
      if (this.lanesSort)
     {
      this.lanesSort.sort({ id: '', start: 'asc', disableClear: false })
    }
      if (this.lanesPaginator) {
        this.lanesPaginator.pageIndex = 0;
        this.lanesDataSource.paginator = this.lanesPaginator;;
      }
    }
  }

  // To remove data from the table list
  removeRecordByID(arrName: any, attr: any, value: number) {
    var i = arrName.length;
    while (i--) {
      if (arrName[i]
        && arrName[i].hasOwnProperty(attr)
        && (arguments.length > 2 && arrName[i][attr] === value)) {
        arrName.splice(i, 1);
      }
    }
    return arrName;
  }

  // API call to delete Lanes record
  deleteLaneData(delLaneId: number) {
    this.apiService.delete(`Lanes/deleteLanes?LaneId=${delLaneId}`, delLaneId, true).subscribe(res => {
      if (res.status == "Success") {
      }
    }, error => {
      this.errorResponseCheck(error);
    })
  }

  errorHandling(data: any) {
    if (data.warningPeriodStart == null || data.warningPeriodStart == "") {
      this.LocationForm.get('warningPeriodStart')?.setErrors({ required: 'Please enter a valid value' })
    }
    if (data.enforcementPeriodStart == null || data.enforcementPeriodStart == "") {
      this.LocationForm.get('enforcementPeriodStart')?.setErrors({ required: 'Please enter a valid value' })
    }
  }

  // ----------------------------------LANES RELATED OPERATION ENDS-----------------------------------------//

  // ----------------------------------SPEED RELATED OPERATION STARTS-----------------------------------------//

  getSpeedList(speedLocId?: number) {
    this.apiService.get('variableSpeedLimit/getVariableSpeedLimitbyLocationId?Id=' + speedLocId, true).subscribe(resp => {
      this.speedList = resp;
      if (resp) {
        this.speedDataSource = new MatTableDataSource<any>(resp);
        if(this.speedSort)
       { this.speedDataSource.sort = this.speedSort;}
        this.speedDataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
          if (typeof data[sortHeaderId] === 'string') {
            return data[sortHeaderId].toLocaleLowerCase();
          }
          return data[sortHeaderId];
        };
        if(this.speedPaginator)
        {this.speedDataSource.paginator = this.speedPaginator;}
        this.speedfilterdata();
      }
    });
  }

  speedfilterdata() {
      this.speedDataSource.filterPredicate = function (data, filter: string): boolean {
        return data.speedLimit?.toString().includes(filter) || data.enforcementSpeed?.toString().includes(filter)
          || data.startTime?.toString().includes(filter) || data.endTime?.toString().includes(filter)
          || data.daysOfTheWeek?.toString().includes(filter)
    };

  }

  applySpeedFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.speedDataSource.filter = filterValue.trim().toLowerCase();
  }

  addSpeed() {
    this.LocationForm.controls['varSpeedLimit'].reset();
    this.LocationForm.controls['varEnforcementSpeed'].reset();
    this.LocationForm.controls['startTime'].reset();
    this.LocationForm.controls['endTime'].reset();
    this.LocationForm.controls['weekDays'].reset();
    this.showAddSpeed = true;
    this.laneNumError = false;
    this.laneMinSpeedError = false;
    this.scroller.scrollToAnchor("cancelSpeed");
  }

  cancelSpeed() {
    this.showAddSpeed = false;
    this.varSpeedError = false;
    this.varStartTimeError = false;
    this.varEndTimeError = false;
  }

  createSpeedList() {
    this.speedDataSource = new MatTableDataSource<any>();
    this.speedList = [];
  }

  validateField(event: any) {
    if (event.value == null || event.value == "") {
      if (event.id == 'varSpeedLimit') {
        this.LocationForm.controls['varSpeedLimit']?.setErrors({ required: this.titleAlert })
      }
      if (event.id == 'startTime') {
        this.LocationForm.controls['startTime']?.setErrors({ invalid: "Incorrect time" })
      }
      if (event.id == 'endTime') {
        this.LocationForm.controls['endTime']?.setErrors({ invalid: "Incorrect time" })
      }
      if (event.id == 'laneNum') {
        this.LocationForm.controls['laneNum']?.setErrors({ required: this.titleAlert })
      }
      if (event.id == 'laneMinSpeed') {
        this.LocationForm.controls['laneMinSpeed']?.setErrors({ required: this.titleAlert })
      }
      if (event.id == 'warningPeriodStart') {
        this.LocationForm.controls['warningPeriodStart']?.setErrors({ invalid: "Invalid Warning Period Start" })
      }
      if (event.id == 'enforcementPeriodStart') {
        this.LocationForm.controls['enforcementPeriodStart']?.setErrors({ invalid: "Invalid Enforcement Period Start" })
      }
    }
    if (event.id == 'weekDays') {
      if (event.value != 'M' && event.value != 'T' && event.value != 'W' && event.value != 'TH' &&
        event.value != 'F' && event.value != 'S' && event.value != 'Su' && event.value != "" && event.value != null) {
        this.LocationForm.controls['weekDays']?.setErrors({ invalid: "Incorrect format" })
      }
      else {
        this.weekDaysError = false;
      }
    }
  }

  validateField1(data: any) {
    if (data.varSpeedLimit == null) {
      this.LocationForm.controls['varSpeedLimit']?.setErrors({ required: this.titleAlert })
      this.varSpeedError = false;
      return false;
    }
    if (data.startTime == null) {
      this.LocationForm.controls['startTime']?.setErrors({ invalid: "Incorrect time" })
      this.varStartTimeError = false;
      return false;
    }
    if (data.endTime == null) {
      this.LocationForm.controls['endTime']?.setErrors({ invalid: "Incorrect time" })
      this.varEndTimeError = false;
      return false;
    }
    if (data.weekDays != 'M' && data.weekDays != 'T' && data.weekDays != 'W' && data.weekDays != 'TH' &&
      data.weekDays != 'F' && data.weekDays != 'S' && data.weekDays != 'Su' && data.weekDays != "" && data.weekDays != null) {
      this.LocationForm.controls['weekDays']?.setErrors({ invalid: "Incorrect format" })
      this.weekDaysError = true;
      return false
    }
    else {
      return true;
    }
  }

  createSpeedTable(data: any) {
    this.validateField1(data);
    if (data.varSpeedLimit == null || data.startTime == null || data.startTime == "" ||
      data.endTime == null || data.endTime == "" || this.weekDaysError == true) {
      if (data.varSpeedLimit == null) {
        this.varSpeedError = true;
      }
      if (data.startTime == null || data.startTime == "") {
        this.LocationForm.controls['startTime']?.setErrors({ 'invalid': null });
        this.varStartTimeError = true;
      }
      if (data.endTime == null || data.endTime == "") {
        this.LocationForm.controls['endTime']?.setErrors({ 'invalid': null });
        this.varEndTimeError = true;
      }
    }
    else {
      this.speedList.push({
        "isDeleted": 'N',
        "variableSpeedLimitsID": 0,
        "daysOfTheWeek": data.weekDays,
        "enforcementSpeed": data.varEnforcementSpeed,
        "startTime": data.startTime,
        "endTime": data.endTime,
        "contractId": this.isRedLight ? 2 : 1,
        "locationId": 0,
        "speedLimit": data.varSpeedLimit,
        "active": true
      })
      console.log("Create Table Speed List:",this.speedList);
      if (this.showEditForm) {
        this.updatedSpeedList.push({
          "isDeleted": 'N',
          "variableSpeedLimitsID": 0,
          "daysOfTheWeek": data.weekDays,
          "enforcementSpeed": data.varEnforcementSpeed,
          "startTime": data.startTime,
          "endTime": data.endTime,
          "contractId": this.isRedLight ? 2 : 1,
          "locationId": 0,
          "speedLimit": data.varSpeedLimit,
          "active": true
        })
        console.log("Create Table Updated Speed List:",this.updatedSpeedList);
      }

      this.speedDataSource = new MatTableDataSource<any>();
      for (let i = 0; i < this.speedList.length; i++) {
        this.speedDataSource.filteredData.push(this.speedList[i]);
      }
      this.speedDataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
        return data[sortHeaderId];
      };
      this.speedDataSource.paginator = this.speedPaginator;
      this.speedPaginator.pageIndex = 0;
    
        this.speedDataSource.sort = this.speedSort;
        this.speedSort.disableClear = true;
        this.speedSort.sort(
        { id: '', start: 'asc', disableClear: false }
      )
    
      this.showAddSpeed = false;
      this.LocationForm.controls['varSpeedLimit'].reset();
      this.LocationForm.controls['varEnforcementSpeed'].reset();
      this.LocationForm.controls['startTime'].reset();
      this.LocationForm.controls['endTime'].reset();
      this.LocationForm.controls['weekDays'].reset();
    }
  }

  addSpeedData(speedLocID: any) {
    this.speedSort.sort(
      { id: '', start: 'asc', disableClear: false }
    )
    this.speedList.forEach((item: any) => {
      item.locationId = speedLocID;
    });
    console.log("speedList:",this.speedList);
    var obj = {
      "variableSpeedLimitModel": this.speedList
    }
    this.apiService.post('variableSpeedLimit/addVariableSpeedLimit', obj, true).subscribe(resp => {
      if (resp.status == 'Success') {
        this.LocationForm.controls['varSpeedLimit'].reset();
        this.LocationForm.controls['varEnforcementSpeed'].reset();
        this.LocationForm.controls['startTime'].reset();
        this.LocationForm.controls['endTime'].reset();
        this.LocationForm.controls['weekDays'].reset();
      }
    },
      error => {
        this.errorResponseCheck(error);
      });
  }

  updateSpeedData(speedLocID: any) {
    this.speedSort.sort(
      { id: '', start: 'asc', disableClear: false }
    )
    this.updatedSpeedList.forEach((item: any) => {
      item.locationId = speedLocID;
    });
    console.log("UpdatedList:",this.updatedSpeedList);
    var obj = {
      "variableSpeedLimitModel": this.updatedSpeedList
    }
    this.apiService.post('variableSpeedLimit/addVariableSpeedLimit', obj, true).subscribe(resp => {
      if (resp.status == 'Success') {
        this.LocationForm.controls['varSpeedLimit'].reset();
        this.LocationForm.controls['varEnforcementSpeed'].reset();
        this.LocationForm.controls['startTime'].reset();
        this.LocationForm.controls['endTime'].reset();
        this.LocationForm.controls['weekDays'].reset();
        this.updatedSpeedList = [];
      }
    },
      error => {
        this.errorResponseCheck(error);
      });
  }

  // To delete Speed record from the table list
  deleteSpeedRow(data: any) {
    const msgs = "";
    if (confirm(this.translate.instant("Are you sure to delete the variable speed limit?", { msg: msgs }))) {
      this.deletedSpeedData.push({
        "variableSpeedLimitsID": data.variableSpeedLimitsID,
        "daysOfTheWeek": data.daysOfTheWeek,
        "enforcementSpeed": data.enforcementSpeed,
        "startTime": data.startTime,
        "endTime": data.endTime,
        "speedLimit": data.speedLimit,
      });
      this.isSpeedDeleted = true;
      this.speedList = this.removeRecordByID(this.speedList, 'variableSpeedLimitsID', data.variableSpeedLimitsID);
      if (this.showEditForm) {
        this.updatedSpeedList = this.removeRecordByID(this.updatedSpeedList, 'variableSpeedLimitsID', data.variableSpeedLimitsID);
      }
      this.speedDataSource = new MatTableDataSource<any>();
      for (let i = 0; i < this.speedList.length; i++) {
        this.speedDataSource.filteredData.push(this.speedList[i]);
      }

     this.speedSort.sort(
        { id: '', start: 'asc', disableClear: false }
      )
      if(this.speedPaginator)
      {
        this.speedPaginator.pageIndex = 0;
        this.speedDataSource.paginator = this.speedPaginator;}
    }
  }

  // API call to delete Speed record
  deleteSpeedData(delSpeedId: number) {
    this.apiService.delete(`variableSpeedLimit/deleteVariableSpeedLimit?VariableSpeedLimitsID=${delSpeedId}`, delSpeedId, true).subscribe(res => {
   
    }, error => {
      this.errorResponseCheck(error);
    })
  }

  // ----------------------------------SPEED RELATED OPERATION ENDS-----------------------------------------//

  // ----------------------------------LOCATION RELATED OPERATION STARTS-----------------------------------------//

  getList() {
    this.apiService.get('Locations/getAllLocations?ContractId=' + this.contractID, true).subscribe(res => {
      if (res) {
        // if (_.isArray(res) && res.length > 0 && res[0].contractTypesName.toString() === 'Red Light') {
          if (this.contractID == 2) {
          this.isRedLight = true;
          this.LocationForm.removeControl('enforcementSpeed');
          this.LocationForm.addControl('redSeconds', new FormControl(null, [Validators.required]));
          this.LocationForm.addControl('yellowSeconds', new FormControl(null, [Validators.required]));
          this.LocationForm.addControl('rejectAmberSecBelow', new FormControl(false));
          this.LocationForm.addControl('belowSecondsValue', new FormControl(''));
          this.LocationForm.addControl('rejectYellowSec', new FormControl(null, [Validators.required]));
        }
        else {
          this.isRedLight = false;
          this.LocationForm.addControl('enforcementSpeed', new FormControl(0));
          this.LocationForm.removeControl('redSeconds');
          this.LocationForm.removeControl('yellowSeconds');
          this.LocationForm.removeControl('rejectAmberSecBelow');
          this.LocationForm.removeControl('belowSecondsValue');
          this.LocationForm.removeControl('rejectYellowSec');
        }
        this.locationDataSource = new MatTableDataSource<any>(res.reverse());
        this.locationDataSource.sort = this.sort;
        this.locationDataSource.sort.disableClear = true;
        this.locationDataSource.paginator = this.paginator;
        this.locationDataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
          if (typeof data[sortHeaderId] === 'string') {
            return data[sortHeaderId].toLocaleLowerCase();
          }
          return data[sortHeaderId];
        };
        this.filterData();
      }
    });
  }

  filterData() {
    this.locationDataSource.filterPredicate = function (data, filter: string): boolean {
      return data.locationsName?.toLowerCase().includes(filter) ||
        data.locationsCode?.toLowerCase().includes(filter) ||
        data.locationsDescription?.toLowerCase().includes(filter) ||
        data.amberTime?.toString() === filter ||
        data.latitude?.toString().includes(filter) ||
        data.longitude?.toString().includes(filter) ||
        data.jurisdictionsName?.toLowerCase().includes(filter)
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.locationDataSource.filter = filterValue.trim().toLowerCase();
  }

  addLocation() {
    this.createLanesList();
    this.language.sendLang.subscribe(lang => {
      if (lang != "") {
        this.appendLangInAdd(lang);
      }
    });
    if (!this.isRedLight) {
      this.createSpeedList();
      this.Jurisdictions = this.juridictionResp.filter((element: { contractID: any; }) => {
        return element.contractID == 1;
      });
    }
    else {
      this.Jurisdictions = this.juridictionResp.filter((element: { contractID: any; }) => {
        return element.contractID == 2;
      });
    }
    this.LocationForm.reset({
      enable: false,
      lprEnable: false,
      rejectAmberSecBelow: false,
      speedLimit: 0
    });
    this.LocationForm.controls['value'].setValue(this.valueItems[0].name);
    this.showAddForm = true;
    this.showEditForm = false;
    this.showAddLane = false;
    this.laneNumError = false;
    this.varSpeedError = false;
    this.varStartTimeError = false;
    this.varEndTimeError = false;
    this.laneMinSpeedError = false;
    this.showAddSpeed = false;
  }

  cancel() {
    if(this.searchStrings)
    {this.searchString.nativeElement.value = ""}
    this.showAddForm = false;
    this.showEditForm = false;
    if(this.paginator)
    {this.paginator.pageIndex = 0;}
    this.LocationForm.reset({
      enable: false,
      lprEnable: false,
      rejectAmberSecBelow: false,
      speedLimit: 0
    });
    this.getList();
    this.notificationService.info(this.translate.instant('Process Cancelled'));
  }


  validateDate(data: any, date1?: any, date2?: any) {
    if (data.warningPeriodStart != null) {
      let year = date1?.toString().substring(0, 4);
      if (parseInt(year) < 1753 || parseInt(year) > 2099) {
        this.LocationForm.controls['warningPeriodStart']?.setErrors({ invalid: "Warning Period Start Year should be between 1753 and 2099" });
        this.valWarningPeriodStart = false;
      }
      else {
        this.valWarningPeriodStart = true;
      }
    }

    if (data.enforcementPeriodStart != null) {
      let year = date2?.toString().substring(0, 4);
      if (parseInt(year) < 1753 || parseInt(year) > 2099) {
        this.LocationForm.controls['enforcementPeriodStart']?.setErrors({ invalid: "Enforcement Period Start Year should be between 1753 and 2099" });
        this.valEnforcementPeriodStart = false;
      }
      else {
        this.valEnforcementPeriodStart = true;
      }
    }
  }

  createDate(date: any) {
    let newDate;
    if (date != null) {
      let d = date.getDate().toString().padStart(2, 0);
      let m = (date.getMonth() + 1).toString().padStart(2, 0);
      let y = date.getFullYear();
      let h = date.getHours().toString().padStart(2, 0);
      let min = date.getMinutes().toString().padStart(2, 0);

      newDate = y + '-' + m + '-' + d + 'T' + h + ':' + min;
    }
    return newDate?.toString();
  }

  addData(data: any) {
    let warningDate = this.createDate(new Date(data.warningPeriodStart));
    let enfDate = this.createDate(new Date(data.enforcementPeriodStart));
    this.validateDate(data, warningDate, enfDate);
    // this.errorHandling(data);
    if(this.paginator)
   { this.paginator.pageIndex = 0;}
   if(this.searchStrings)
    {this.searchString.nativeElement.value = ""}
    if(this.locationsort)
  {  this.locationsort.sort(
      { id: '', start: 'asc', disableClear: false }
    )}
    if (this.LocationForm.valid && this.valWarningPeriodStart && this.valEnforcementPeriodStart) {
      const obj = {
        "locationsModel": {
          "isDeleted": "N",
          "locationsID": 0,
          "cameraTypesID": data.cameraType,
          "locationsCode": data.locationsCode,
          "contractID": this.isRedLight ? 2 : 1,
          "locationsDescription": data.locationsDescription,
          "locationsEnabled": data.enable,
          "latitude": data.latitude != null ? data.latitude : 0,
          "longitude": data.longitude != null ? data.longitude : 0,
          "locationsName": data.locationsName,
          "active": true,
          "lprEnable": data.lprEnable,
          "speedLimit": data.speedLimit != null ? data.speedLimit : 0,
          "direction": data.value,
          "jurisdictionsID": data.jurisdictionsID,
          "warningPeriodStart": warningDate,
          "enforcementPeriodStart": enfDate,
          "redLightLocations": this.isRedLight ? {
            "isDeleted": "N",
            "redLightLocationsID": 0,
            "locationsID": 0,
            "redSeconds": data.redSeconds,
            "yellowSeconds": data.yellowSeconds,
            "contractId": 2,
            "active": true,
            "locationCode": this.isRedLight ? data.locationsCode : "",
            "rejectYellowSecondsBelow": data.rejectAmberSecBelow ? data.rejectAmberSecBelow : false,
            "rejectYellowSecondsBelowCategoryId": data.rejectYellowSec ? data.rejectYellowSec : 0,
            "rejectYellowSecondsBelowValue": data.belowSecondsValue ? data.belowSecondsValue : 0
          } : null,
          "speedLocations": !this.isRedLight ? {
            "isDeleted": "N",
            "speedLocationsId": 0,
            "locationsId": 0,
            "enforcementSpeed": data.enforcementSpeed ? data.enforcementSpeed : 0,
            "active": true,
            "enable": true,
            "locationCode": data.locationsCode ? data.locationsCode : null,
            "contractId": 1
          } : null
        }
      };
      this.apiService.post('Locations/addLocations', obj, true).subscribe(
        (res) => {
          if (res.status == 'Success') {
            if (this.laneList.length > 0) {
              console.log("LaneList:",this.laneList);
              this.addLanesData(res.data.locationsID);
            }
            if (this.speedList.length > 0) {
              console.log("speedList:",this.speedList);
              this.addSpeedData(res.data.locationsID);
            }
            this.LocationForm.reset({
              enable: false,
              lprEnable: false,
              rejectAmberSecBelow: false,
              speedLimit: 0
            });
            if (this.locationDataSource.paginator) {
              this.locationDataSource.paginator.firstPage();
            }
            this.getList();
            const msg = '';
            const code = res.details[0].code;
            this.successMsg = this.translate.instant('Record Added Successfully', {
              msg: msg,
            });
            this.notificationService.success(this.successMsg);
            this.showAddForm = false;
            this.showEditForm = false;

          }
        },
        error => {
          this.errorResponseCheck(error);
        })
    }
  }

  onEditIconClick(id: number) {
    this.showEditForm = true;
    this.editRowId = id;
    this.getLanesList(this.editRowId);
    this.updatedLaneList = [];

    if (!this.isRedLight) {
      this.getSpeedList(this.editRowId)
      this.updatedSpeedList = [];
      this.Jurisdictions = this.juridictionResp.filter((element: { contractID: any; }) => {
        return element.contractID == 1;
      });
    }
    else {
      this.Jurisdictions = this.juridictionResp.filter((element: { contractID: any; }) => {
        return element.contractID == 2;
      });
    }
    this.apiService.get('Locations/getLocationByLocationId?LocationId=' + id, true).subscribe((resp) => {
      this.locationsData = resp;
      if (resp) {
        this.LocationForm.controls['locationsCode'].setValue(resp.locationsCode);
        this.LocationForm.controls['locationsName'].setValue(resp.locationsName);
        this.LocationForm.controls['cameraType'].setValue(resp.cameraTypesID);
        this.LocationForm.controls['latitude'].setValue(resp.latitude);
        this.LocationForm.controls['longitude'].setValue(resp.longitude);
        this.LocationForm.controls['locationsDescription'].setValue(resp.locationsDescription);
        this.LocationForm.controls['enable'].setValue(resp.locationsEnabled);
        this.LocationForm.controls['lprEnable'].setValue(resp.lprEnable);
        this.LocationForm.controls['speedLimit'].setValue(resp.speedLimit);
        this.LocationForm.controls['warningPeriodStart'].setValue(resp.warningPeriodStart);
        this.LocationForm.controls['enforcementPeriodStart'].setValue(resp.enforcementPeriodStart);
        if (this.isRedLight) {
          this.LocationForm.controls['redSeconds'].setValue(resp.redLightLocations?.redSeconds);
          this.LocationForm.controls['yellowSeconds'].setValue(resp.redLightLocations?.yellowSeconds);
          this.LocationForm.controls['rejectAmberSecBelow'].setValue(resp.redLightLocations?.rejectYellowSecondsBelow);
          this.LocationForm.controls['belowSecondsValue'].setValue(resp.redLightLocations?.rejectYellowSecondsBelowValue);
          this.LocationForm.controls['rejectYellowSec'].setValue(resp.redLightLocations?.rejectYellowSecondsBelowCategoryId);
          this.Jurisdictions = this.juridictionResp.filter((element: { contractID: any; }) => {
            return element.contractID == 2;
          });
        }
        else {
          this.LocationForm.controls['enforcementSpeed'].setValue(resp.speedLocations?.enforcementSpeed);
          this.Jurisdictions = this.juridictionResp.filter((element: { contractID: any; }) => {
            return element.contractID == 1;
          });
        }
        this.LocationForm.controls['value'].setValue(resp.direction);
        this.LocationForm.controls['jurisdictionsID'].setValue(resp.jurisdictionsID);
      }
    });
  }

  editLocationData(data: any) {
    let warningDate = (typeof data.warningPeriodStart !== 'string') ? this.createDate(new Date(data.warningPeriodStart)) : new Date(data.warningPeriodStart);
    let enfDate = (typeof data.enforcementPeriodStart !== 'string') ? this.createDate(new Date(data.enforcementPeriodStart)) : new Date(data.enforcementPeriodStart);
    // this.validateDate(data, warningDate, enfDate);
    if (data.warningPeriodStart != null) {
      let year = data.warningPeriodStart?.toString().substring(0, 4);
      if (parseInt(year) < 1753 || parseInt(year) > 2099) {
        this.LocationForm.controls['warningPeriodStart']?.setErrors({ invalid: "Warning Period Start Year should be between 1753 and 2099" });
        this.valWarningPeriodStart = false;
      }
      else {
        this.valWarningPeriodStart = true;
      }
    }

    if (data.enforcementPeriodStart != null) {
      let year = data.enforcementPeriodStart.toString().substring(0, 4);
      if (parseInt(year) < 1753 || parseInt(year) > 2099) {
        this.LocationForm.controls['enforcementPeriodStart']?.setErrors({ invalid: "Enforcement Period Start Year should be between 1753 and 2099" });
        this.valEnforcementPeriodStart = false;
      }
      else {
        this.valEnforcementPeriodStart = true;
      }
    }
    let locationsData=this.locationsData;
    let isDeleted=locationsData?.isDeleted;
    let locationsID=locationsData?.locationsID;
    let locationsModel= {
      "locationsID": locationsID,
      "isDeleted": isDeleted,
      "cameraTypesID": data.cameraType,
      "locationsCode": data.locationsCode,
      "contractID":locationsData?.contractID,
      "locationsDescription": data.locationsDescription,
      "locationsEnabled": data.enable,
      "latitude": data.latitude != null ? data.latitude : 0,
      "longitude": data.longitude != null ? data.longitude : 0,
      "locationsName": data.locationsName,
      "active": locationsData?.active,
      "lprEnable": data.lprEnable,
      "speedLimit": data.speedLimit != null ? data.speedLimit : 0,
      "direction": data.value,
      "jurisdictionsID": data.jurisdictionsID,
      "warningPeriodStart": warningDate,
      "enforcementPeriodStart": enfDate,
      "redLightLocations": this.isRedLight ? {
        "isDeleted": isDeleted,
        "redLightLocationsID": 0,
        "locationsID": 0,
        "redSeconds": data.redSeconds ? data.redSeconds : 0,
        "yellowSeconds": data.yellowSeconds ? data.yellowSeconds : 0,
        "contractId": 2,
        "active": true,
        "locationCode": this.isRedLight ? data.locationsCode : "",
        "rejectYellowSecondsBelow": data.rejectAmberSecBelow ? data.rejectAmberSecBelow : false,
        "rejectYellowSecondsBelowCategoryId": data.rejectYellowSec ? data.rejectYellowSec : 0,
        "rejectYellowSecondsBelowValue": data.belowSecondsValue ? data.belowSecondsValue : 0
      } : null,
      "speedLocations": !this.isRedLight ? {
        "isDeleted": isDeleted,
        "speedLocationsId": 0,
        "locationsId": 0,
        "enforcementSpeed": data.enforcementSpeed ? data.enforcementSpeed : 0,
        "active": true,
        "enable": true,
        "locationCode": data.locationsCode ? data.locationsCode : null,
        "contractId": 1
      } : null
    }
    const obj = {
    "locationsModel":locationsModel
    };
    if (this.LocationForm.valid && this.valWarningPeriodStart && this.valEnforcementPeriodStart) {
      this.apiService.put('Locations/updateLocations', obj, true).subscribe(
        (res) => {
          if (res.status == 'Success') {
            if (this.isLaneDeleted) {
              if (this.deletedLaneData) {
                this.deletedLaneData.forEach((item: any) => {
                  this.deleteLaneData(item.lanesID);
                });
                if (this.updatedLaneList.length > 0) {
                  this.updateLanesData(res.data.locationsID);
                }
              }
              this.deletedLaneData = [];
            }
            else if (this.updatedLaneList.length > 0) {
              this.updateLanesData(res.data.locationsID);
            }
            if (!this.isRedLight) {
              if (this.isSpeedDeleted) {
                if (this.deletedSpeedData) {
                  this.deletedSpeedData.forEach((item: any) => {
                    this.deleteSpeedData(item.variableSpeedLimitsID);
                  });
                  if (this.updatedSpeedList.length > 0) {
                    this.updateSpeedData(res.data.locationsID);
                  }
                }
                this.deletedSpeedData = [];
              }
              else if (this.updatedSpeedList.length > 0) {
                this.updateSpeedData(res.data.locationsID);
              }
            }
            if (this.locationDataSource.paginator) {
              this.locationDataSource.paginator.firstPage();
            }
            if(this.searchStrings)
            {this.searchString.nativeElement.value = ""}
            this.getList();
            const msg = '';
            this.successMsg = this.translate.instant('Record Updated Successfully', {
              msg: msg,
            });
            this.notificationService.success(this.successMsg);
            this.showAddForm = false;
            this.showEditForm = false;

          }
        },
        error => {
          this.errorResponseCheck(error);
        })
    }
  }

  toggleLocation(id: number, status: boolean) {
    let locId = {
      locationId: id
    }
    const msgs = "";
    if (status) {
      if (confirm(this.translate.instant("Are you sure you want to Enable the Location", { msg: msgs }))) {
        this.apiService.put('Locations/updateLocationToggle', locId, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            this.successMsg = this.translate.instant("Location Enabled Successfully", { msg: msg });
            this.notificationService.success(this.successMsg);
            this.getList();
          }
        })
      }
    } else {
      if (confirm(this.translate.instant("Are you sure you want to Disable the Location", { msg: msgs }))) {
        this.apiService.put('Locations/updateLocationToggle', locId, true).subscribe(res => {
          if (res.status === "Success") {
            const msg = "";
            this.successMsg = this.translate.instant("Location Disabled Successfully", { msg: msg });
            this.notificationService.success(this.successMsg);
            this.getList();
          }
        })
      }
    }
  }

  // ----------------------------------LOCATION RELATED OPERATION ENDS-----------------------------------------//

  // ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//
  errorResponseCheck(error: any) {

    for (var i = 0; i < error.error.details.length; i++) {
      if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
        const msg = "";
        let date1Error;
        let date2Error;
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.LocationForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
        if (error.error.details[i].fieldName == "location") {
          this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
          this.LocationForm.get("locationsCode")?.setErrors({ invalid: "Location Code Duplicate" });
        }
        if (error.error.details[i].fieldName == "warningPeriodStart") {
          date1Error = "Invalid Warning Period Start";
          date1Error = this.translate.instant(date1Error, { msg: msg });
          this.notificationService.error(this.translate.instant("Invalid Warning Period Start"))
          this.LocationForm.get('warningPeriodStart')?.markAllAsTouched();
          this.LocationForm.get('warningPeriodStart')?.setErrors({ invalid: date1Error });
        }
        if (error.error.details[i].fieldName == "enforcementPeriodStart") {
          date2Error = "Invalid Enforcement Period Start";
          date2Error = this.translate.instant(date2Error, { msg: msg });
          this.notificationService.error(this.translate.instant("Invalid Enforcement Period Start"))
          this.LocationForm.get('enforcementPeriodStart')?.markAllAsTouched();
          this.LocationForm.get('enforcementPeriodStart')?.setErrors({ invalid: date2Error });

        }
      }

      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
      }

      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }
}
