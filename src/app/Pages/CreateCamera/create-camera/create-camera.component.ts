import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl, FormGroup, Validators,FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-create-camera',
  templateUrl: './create-camera.component.html',
  styleUrls: ['./create-camera.component.scss']
})
export class CreateCameraComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!: ElementRef;
  displayedColumns: string[] = ['cameraTypesName', 'locationsName', 'latitude', 'longitude', 'firmwareVersion', 'rententionDays', 'edit'];
  data: any;
  successMsg!: string;
  titleAlert: string = 'This field is required';
  arra:any;
  alertMsg!: string;
  welcome: any;
  addBtn: boolean = true;
  editData: any;
  showEditForm: boolean = false;
  cameraList: any;
  locationList: any;
  firmwareList: any;
  filetransferList: any;
  contractID: any = 2;
  enableFile:boolean = false;

  dataSource!: MatTableDataSource<any>;
  showAddForm = false;
  CameraForm!: FormGroup;
  searchData: any;
  tableDisplayedColumns: any[] = [
    {
      'columnName': 'cameraTypesName',
      'translateName': 'cameraTypesName',
      'elementValue': 'cameraTypesName',
      'textAlign': 'text-left',
      'actionButtons': false,
      'editButton': false,
      'deleteButton': false,
      'enableButton': false
    },
    {
      'columnName': 'locationsName',
      'translateName': 'locationsName',
      'elementValue': 'locationsName',
      'textAlign': 'text-left',
      'actionButtons': false,
      'editButton': false,
      'deleteButton': false,
      'enableButton': false
    },
    {
      'columnName': 'latitude',
      'translateName': 'latitude',
      'elementValue': 'latitude',
      'textAlign': 'text-center',
      'actionButtons': false,
      'editButton': false,
      'deleteButton': false,
      'enableButton': false
    },
    {
      'columnName': 'longitude',
      'translateName': 'longitude',
      'elementValue': 'longitude',
      'textAlign': 'text-center',
      'actionButtons': false,
      'editButton': false,
      'deleteButton': false,
      'enableButton': false
    },
    {
      'columnName': 'firmwareVersion',
      'translateName': 'firmwareVersion',
      'elementValue': 'firmwareVersion',
      'textAlign': 'text-center',
      'actionButtons': false,
      'editButton': false,
      'deleteButton': false,
      'enableButton': false
    },
    {
      'columnName': 'rententionDays',
      'translateName': 'rententionDays',
      'elementValue': 'rententionDays',
      'textAlign': 'text-right',
      'actionButtons': false,
      'editButton': false,
      'deleteButton': false,
      'enableButton': false
    },
    {
      'columnName': 'edit',
      'translateName': 'edit',
      'elementValue': 'edit',
      'textAlign': 'text-center',
      'actionButtons': true,
      'editButton': true,
      'deleteButton': false,
      'enableButton': true
    }
  ];

  constructor(public translate: TranslateService,
    private language: LanguageService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService,
    private apiService: ApiService,
    private validationService: ValidationService) { }

  ngOnInit(): void {
    this.getList();
    this.language.sendLang.subscribe(lang => {
      if (lang != "") {
        this.appendLang(lang);
      }
    });
    //Language Code
    this.CameraForm = new FormGroup({
      'cameraID': new FormControl('0'),
      'cameraTypesName': new FormControl('', [Validators.required]),
      'locationsName': new FormControl('', [Validators.required]),
      'asset': new FormControl('', [Validators.required, Validators.maxLength(140)]),
      'firmwareVersionsID': new FormControl('', [Validators.required]),
      'fileTransfersID': new FormControl('', [Validators.required]),
      'retentionDays': new FormControl('',[ Validators.maxLength(4)]),
      'latitude': new FormControl('',[ Validators.maxLength(10),Validators.pattern("^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$")]),
      'longitude': new FormControl('',[ Validators.maxLength(10),Validators.pattern("^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$")]),
      'inAlarm': new FormControl(''),
      'isEnforcement': new FormControl(''),
      'isEncrypted': new FormControl(''),
      'cameraEnabled': new FormControl(''),
      'encryprtionFile': new FormControl('',[ Validators.maxLength(140)]),
      'approach': new FormControl('',[ Validators.maxLength(140)]),
      'cameraDescription': new FormControl('',[ Validators.maxLength(140)])
    });
    // this.dataSource.sort = this.sort;
    // this.sort.disableClear = true;
    // this.dataSource.paginator = this.paginator;
  }

  //<<-----------Sorting-------------------------------->>
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  //<<-----------Sorting Ends-------------------------------->>
  //<<-----------Language-------------------------------->>
  appendLang(lang: string) {
    this.translate.use(lang);
  }
  //<<-----------Language-------------------------------->>
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

//   this.CameraForm.get('isEnforcement').valueChanges
//     .subscribe(value => {
//       if(value) {
//         this.CameraForm.get('encryprtionFile').setValidators(Validators.required)
//       } else {
//         this.myForm.get('encryprtionFile').clearValidators();
//       }
//     }
// );

  
  getList() {
    // api for List in table grid
    this.apiService.get('Cameras/getAllCameras', true).subscribe(res => {
      if (res) {
        this.dataSource = new MatTableDataSource<any>(res.reverse());
        this.filterData();
      }
    });

    // drop down api's in add 
    this.apiService.get('CameraType/getAllCameraType', true).subscribe(res => {
      if (res) {
        this.cameraList = res;
      }
    });
    this.apiService.get('Locations/getAllLocations?ContractId=2', true).subscribe(res => {
      if (res) {
        this.locationList = res;
      }
    });
    this.apiService.get('FirmwareVersions/getAllFirmwareVersion', true).subscribe(res => {
      if (res) {
        this.firmwareList = res;
      }
    });
    this.apiService.get('FileTransfer/getFileTransferList', true).subscribe(res => {
      if (res) {
        this.filetransferList = res;
      }
    });
  }


  filterData() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      console.log('data', data)
      // ['cameraTypesName', 'locationsName', 'latitude','longitude','firmwareVersion','rententionDays','edit'];
      return data.cameraTypesName?.toLowerCase().includes(filter) ||
        data.locationsName?.toLowerCase().includes(filter) ||
        data.latitude?.toString().includes(filter) ||
        data.longitude?.toString().includes(filter) ||
        data.firmwareVersion?.toLowerCase().includes(filter) ||
        data.rententionDays?.toString().includes(filter)
    };
  }

  cancelAdd_Save(formDirective:any) {
    this.showAddForm = false;
    // this.searchString.nativeElement.value = "";
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.getList();
    formDirective.resetForm();
    this.CameraForm.reset();
    this.searchData = "";
    this.notificationService.info(this.translate.instant('Process Cancelled'));

  }
  

  enabledEncryption(val:any) {
      this.enableFile = val.checked;
      if(this.enableFile) {
        this.CameraForm.controls['encryprtionFile'].markAsTouched();
        this.CameraForm.controls['encryprtionFile'].setValidators(Validators.required);
        this.CameraForm.controls['encryprtionFile'].updateValueAndValidity();
      }else {
        this.CameraForm.controls['encryprtionFile'].setValidators([]);
        this.CameraForm.controls['encryprtionFile'].updateValueAndValidity();
      }
  }

  addCameraType() {
    this.showAddForm = true;
    this.showEditForm = false;
    this.addBtn = true;
    this.CameraForm.reset();
    this.CameraForm.controls['encryprtionFile'].setValidators([]);
    this.CameraForm.controls['encryprtionFile'].updateValueAndValidity();
  }
  addData(data: any,formDirective:any) {
    // this.paginator.pageIndex = 0;
    // this.searchString.nativeElement.value = ""
    // this.sort.sort(
    //   { id: '', start: 'asc', disableClear: false }
    // )
    console.log(data);
    if (this.CameraForm.valid) {
      const obj = {
        "camerasModel": {
          "createUserID": 0,
          "updateUserID": 0,
          "createDatetime": "2022-05-10T15:49:19.687Z",
          "updateDatetime": "2022-05-10T15:49:19.687Z",
          "isDeleted": 'N',
          "cameraID": 0,
          "approach": data.approach,
          "asset": data.asset,
          "cameraTypesID": data.cameraTypesName,
          "contractID": 0,
          "cameraDescription": data.cameraDescription,
          "cameraEnabled": data.cameraEnabled == true ? true : false,
          "encryprtionFile": data.encryprtionFile,
          "fileTransfersID": data.fileTransfersID ,
          "firmwareVersionsID": data.firmwareVersionsID,
          "inAlarm": data.inAlarm == true ? true : false ,
          "isEncrypted": data.isEncrypted == true ? true : false,
          "isEnforcement": data.isEnforcement == true ? true : false,
          "lastUpdateTime": "2022-05-10T15:49:19.687Z",
          "latitude": data.latitude,
          "locationsID": data.locationsName,
          "longitude": data.longitude,
          "retentionDays": data.retentionDays,
          "active": true
        }
      };
      console.log(obj);
      this.apiService.post('Cameras/addCameras', obj, true).subscribe(
        (res) => {
          if (res.status == 'Success') {
            const msg = '';
            const code = res.details[0].code;
            this.successMsg = this.translate.instant('Record Added Successfully', {
              msg: msg,
            });
            this.notificationService.success(this.successMsg);
            formDirective.resetForm();
            this.CameraForm.reset();
            if (this.dataSource.paginator) {
              this.dataSource.paginator.firstPage();
            }
            this.getList();
            this.addBtn = true;
            this.searchData="";
            this.showAddForm = false;
            this.showEditForm = false;
            this.enableFile = false;

          }
        }, error => {
          this.errorResponseCheck(error);
        })
    }
  }

  editRowOutput(data: any) {
    console.log(data);// 
    this.apiService.get('Cameras/getCamerasById?Id='+ data.cameraID, true).subscribe(
      (resdata) => {
        console.log(resdata);
        this.editData = resdata;
        this.enableFile = resdata.isEncrypted == true ? true : false;
        this.showAddForm = true;
        this.showEditForm = true;
        this.addBtn = false;
        this.CameraForm.controls['cameraID'].setValue(resdata.cameraID);
        this.CameraForm.controls['cameraTypesName'].setValue(resdata.cameraTypesID.toString());
        this.CameraForm.controls['locationsName'].setValue(resdata.locationsID.toString());
        this.CameraForm.controls['asset'].setValue(resdata.asset);
        this.CameraForm.controls['firmwareVersionsID'].setValue(resdata.firmwareVersionsID.toString());
        this.CameraForm.controls['fileTransfersID'].setValue(resdata.fileTransfersID.toString());
        this.CameraForm.controls['retentionDays'].setValue(resdata.retentionDays);
        this.CameraForm.controls['latitude'].setValue(resdata.latitude);
        this.CameraForm.controls['longitude'].setValue(resdata.longitude);
        this.CameraForm.controls['inAlarm'].setValue(resdata.inAlarm);
        this.CameraForm.controls['isEnforcement'].setValue(resdata.isEnforcement);
        this.CameraForm.controls['isEncrypted'].setValue(resdata.isEncrypted);
        this.CameraForm.controls['cameraEnabled'].setValue(resdata.cameraEnabled);
        this.CameraForm.controls['encryprtionFile'].setValue(resdata.encryprtionFile);
        this.CameraForm.controls['approach'].setValue(resdata.approach);
        this.CameraForm.controls['cameraDescription'].setValue(resdata.cameraDescription);
        this.CameraForm.controls['cameraEnabled'].setValue(resdata.cameraEnabled);
      }, error => {
        this.errorResponseCheck(error);
      })
  }
  deleteRowOutput($event: any) {
    console.log($event);
  }

  updateRecord(data: any) {
    // this.searchString.nativeElement.value = ""
    if (this.CameraForm.valid) {
      const obj = {
        "camerasModel": {
          "createUserID": 0,
          "updateUserID": 0,
          "createDatetime": "2022-05-10T15:49:19.687Z",
          "updateDatetime": "2022-05-10T15:49:19.687Z",
          "isDeleted": 'N',
          "cameraID": data.cameraID,
          "approach": data.approach,
          "asset": data.asset,
          "cameraTypesID": data.cameraTypesName,
          "contractID": 0,
          "cameraDescription": data.cameraDescription,
          "cameraEnabled": data.cameraEnabled,
          "encryprtionFile": data.encryprtionFile,
          "fileTransfersID": data.fileTransfersID,
          "firmwareVersionsID": data.firmwareVersionsID,
          "inAlarm": data.inAlarm,
          "isEncrypted": data.isEncrypted,
          "isEnforcement": data.isEnforcement,
          "lastUpdateTime": "2022-05-10T15:49:19.687Z",
          "latitude": data.latitude,
          "locationsID": data.locationsName,
          "longitude": data.longitude,
          "retentionDays": data.retentionDays,
          "active": this.editData.active
        }
      };
      // let params = new HttpParams();
      // params = params.append("phoneStatusId", this.phoneStatusId);
      this.apiService.put(`Cameras/updateCameras`, obj, true).subscribe(res => {
        if (res.status === 'Success') {
          this.showAddForm = false;
          this.CameraForm.reset();
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
          this.getList();
          const msg = '';
          this.searchData="";
          this.welcome = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.welcome);
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    }

  }

  toggleClient(data: any) {
    const msgs = "";
    if (!data.cameraEnabled) {
      if (confirm(this.translate.instant(`Are you sure you want to Enable Camera`, { msg: msgs }))) {
        const obj = {
          "camerasId": data.cameraID
        }

        this.apiService.put(`Cameras/UpdateCamerasStatus`, obj, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Camera Enabled Successfully", { msg: msgs }));
            this.getList();
          }
        })

      }
    } else {
      if (confirm(this.translate.instant(`Are you sure you want to Disable Camera`, { msg: msgs }))) {
        const obj = {
          "camerasId": data.cameraID
        }
        this.apiService.put(`Cameras/UpdateCamerasStatus`, obj, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Camera Disabled Successfully", { msg: msgs }));
            this.getList();
          }
        })

      }
    }
  }

  enableRowOutput(item : any){
    this.toggleClient(item);
  };
   // ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//
   errorResponseCheck(error: any) {
    for (var i = 0; i < error.error.details.length; i++) {
      if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
        const msg = "";
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.CameraForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.CameraForm.get("phoneExt")?.setErrors({ invalid: "Phone Extensions Duplicate" });
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }

}
