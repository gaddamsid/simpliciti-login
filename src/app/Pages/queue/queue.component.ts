import { Component, OnInit, Pipe, ViewChild,AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QueuesApiservices } from 'src/app/shared/services/queues-apiservices.ts.service';
import {ApiService} from 'src/app/shared/services/api.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})

export class QueueComponent implements OnInit {
  displayedColumns: string[] = ['eventsID', 'laneNumber','statePlate','stateProvincesName'];
  VRdisplayedColumns: string[] = ['createDatetime', 'action','plate','stateProvincesName'];
  vrhistroydataSource = new MatTableDataSource<any>();
  neighboursdataSource = new MatTableDataSource<any>();
  queueList:any;
  QueEnableList:any;
  eventList:any =[];
  queueForm!:FormGroup;
  categoryList :any;
  stateList:any;
  weatherList:any
  acceptButton:boolean =  false;
  rejectButton:boolean = false;
  sectionsList:any;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  eventId:any;
  alertMsg: any;
  vehicleTypelist: any;
  welcome: any;
  genderList: any;
  actionsList:any;
  selectedQueue: any;
  minDate!: Date;
  queueid: any;
  disableForm :boolean = true;
  constructor(private apiService: QueuesApiservices, private adminapiService : ApiService,public translate: TranslateService, private language:LanguageService,private _liveAnnouncer: LiveAnnouncer,
    private notificationService : ToastrService,private route: ActivatedRoute,
   ) { }

// @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
@ViewChild('MatPaginator1') paginator1!: MatPaginator;
@ViewChild('MatPaginator2') paginator2!: MatPaginator;

@ViewChild('neighbourSort') public  neighbourSort!: MatSort;
@ViewChild('historySort') public  historySort!: MatSort;

// @ViewChild('table1', {read: MatSort}) neighbourSort!: MatSort;
// @ViewChild('table2', {read: MatSort}) historySort!: MatSort;
  
  ngOnInit(): void {
    this.minDate = new Date();
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.route.params.subscribe(params => {
      const eventId = params['id'];
      this.changeBehaviourType(eventId);
    });
  
       this.loaddefaultImage();
      // this.getQueueList(eventId);
      this.getContractList();
      this.getAllstates();
      this.getweatherTypeList();
      this.getAllsections();
      this.getVehicleType();
      this.getGenderList();
      this.getAllactions();
    

      this.language.sendLang.subscribe(lang =>{
        if(lang != '') {
         this.appendLang(lang);
        }
     });

      this.queueForm = new FormGroup({
        'selectQueue': new FormControl(),
        'eventItem':new FormControl(),
        'workflowPlate': new FormControl("",[Validators.maxLength(10)]),
        'workflowState':new FormControl(),
        'workflowaction':new FormControl(),
        'workflowCategory': new FormControl(),
        'workflowSection':new FormControl(),
        'weatherType':new FormControl(),
        'vehicleInfoPlate':new FormControl("",[Validators.maxLength(10)]),
        'vehicleInfoMake': new FormControl("",[Validators.maxLength(20)]),
        'vehicleInfoModel':new FormControl("",[Validators.maxLength(20)]),
        'vehicleInfoStyle':new FormControl("",[Validators.maxLength(20)]),
        'vehicleInfoColor':new FormControl("",[Validators.maxLength(20)]),
        'vehicleInfoYear':new FormControl("",[Validators.maxLength(4)]),
        'vehicleInfoVin':new FormControl("",[Validators.maxLength(20)]),
        'vehicleType':new FormControl(),
        'doubleBlind':new FormControl("",[Validators.maxLength(8)]),
        'doubleBlindState':new FormControl(""),
        'doubleBlindDLState':new FormControl(""),
        'doubleBlindrejectCategory':new FormControl(""),
        'vrPlate': new FormControl("",[Validators.maxLength(8)]),
        'vrrejectCategory':new FormControl(""),
        'ownerBusinessname':new FormControl("",[Validators.maxLength(50)]),
        'ownerInfoDl':new FormControl("",[Validators.maxLength(25)]),
        'ownerInfoDlstate':new FormControl(""),
        'ownerInfoDlclass':new FormControl("",[Validators.maxLength(2)]),
        'ownerInfofirstname':new FormControl("",[Validators.maxLength(20)]),
        'ownerInfolastname':new FormControl("",[Validators.maxLength(20)]),
        'ownerInfoCoOwnername':new FormControl("",[Validators.maxLength(50)]),
        'ownerInfoCoOwnerlicenceNo':new FormControl("",[Validators.maxLength(25)]),
        'ownerInfoCoOwnerDOB':new FormControl(""),
        'ownerInfoCoOwnerDOBofdriver':new FormControl(""),
        'ownerInfogender':new FormControl(""),
        'ownerInfoeyeColor': new FormControl("",[Validators.maxLength(20)]),
        'ownerInfohaircolor': new FormControl("",[Validators.maxLength(20)]),
        'ownerInfoheight': new FormControl("",[Validators.maxLength(3)]),
        'ownerInfoWeight': new FormControl("",[Validators.maxLength(3)]),
        'ownerInfostreet1': new FormControl("",[Validators.maxLength(50)]),
        'ownerInfostreet2': new FormControl("",[Validators.maxLength(50)]),
        'ownerInfostreet3': new FormControl("",[Validators.maxLength(50)]),
        'ownerInfoaddress': new FormControl("",[Validators.maxLength(20)]),
        'ownerInfoState':new FormControl(),
        'ownerInfozip':new FormControl("",[Validators.maxLength(9)]),

      });
      this.galleryOptions = [
        {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          arrowPrevIcon: 'fa fa-chevron-left',
          arrowNextIcon: 'fa fa-chevron-right',
          imageAnimation: NgxGalleryAnimation.Slide
        },
        // max-width 800
        {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
        },
        // max-width 400
        {
          breakpoint: 400,
          preview: false
        }
      ];
  
  }

  ngAfterViewInit() {    
    this.vrhistroydataSource.sort = this.historySort;
    this.neighboursdataSource.sort = this.neighbourSort;
}

loaddefaultImage() {
  this.galleryImages = [{
    small: 'assets/images/image-placeholder.png',
    medium: 'assets/images/image-placeholder.png',
    big: 'assets/images/image-placeholder.png',
  },{
    small: 'assets/images/image-placeholder.png',
    medium: 'assets/images/image-placeholder.png',
    big: 'assets/images/image-placeholder.png',
  },
  {
    small: 'assets/images/image-placeholder.png',
    medium: 'assets/images/image-placeholder.png',
    big: 'assets/images/image-placeholder.png',
  },
  {
    small: 'assets/images/image-placeholder.png',
    medium: 'assets/images/image-placeholder.png',
    big: 'assets/images/image-placeholder.png',
  },
  {
    small: 'assets/images/image-placeholder.png',
    medium: 'assets/images/image-placeholder.png',
    big: 'assets/images/image-placeholder.png',
  }];
}


announceSortChange(sortState: Sort) {
  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}

  

  appendLang(lang:string) {
    this.translate.use(lang);
    this.setPagelabel(lang);
  }

  setPagelabel(lang:any) {
    const msg ="";
    this.translate.use(lang).toPromise();
    this.translate
         .use(lang)
         .subscribe(res => 
         {
           this.neighboursdataSource.paginator = this.paginator1;
            this.vrhistroydataSource.paginator = this.paginator2;
           this.alertMsg = this.translate.instant("Items per page", { msg: msg });
           this.neighboursdataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;
           this.vrhistroydataSource.paginator._intl.itemsPerPageLabel =  this.alertMsg;
         });
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
 }

  getQueueList() {
    this.apiService.get('Queues/getAllActiveQueues?ContractID=2',true).subscribe(res => {
      this.queueList = res.sort((a: any, b: any) => {
        return a.queuesName == b.queuesName ? 0
          : a.queuesName > b.queuesName ? 1 : -1
      });
      this.queueForm.controls['selectQueue'].setValue(res[0].queuesID.toString());
      this.QueEnableList = res[0];
      // this.getEventList(res[0].queuesID);
      // this.getFirstEvent(res[0].queuesID);
      
    })
  }

  getEventList(id:number) {
    this.apiService.get('Queues/getEventsByQueuesId?QueuesID='+id +'&UserID=1',true).subscribe(res =>{
      if(res.length > 0) {
        this.eventList = res;
        this.queueForm.controls['eventItem'].setValue(this.eventList[0].eventsID.toString());
        this.changeEventItemId(this.eventList[0].eventsID);
      }
    })
  }

  changeBehaviourType(id:number) {
    this.apiService.get('Queues/getActiveQueuesById?QueueID='+id,true).subscribe(res => {
        this.QueEnableList = res;
        this.selectedQueue = id;
        this.getFirstEvent(this.selectedQueue);
        this.getContractList();
    })

  }

  getContractList() {
    this.adminapiService.get('Categories/getCategoriesById?ContractID=2' ,true).subscribe(res => {
      this.categoryList = res.sort((a: any, b: any) => {
        return a.categoriesName == b.categoriesName ? 0
          : a.categoriesName > b.categoriesName ? 1 : -1
      });
    })
  }

  getAllstates() {
    this.adminapiService.get('StateProvinces/getAllStateProvinces',true).subscribe(res => {
        this.stateList = res.sort((a: any, b: any) => {
          return a.stateProvincesName == b.stateProvincesName ? 0
            : a.stateProvincesName > b.stateProvincesName ? 1 : -1
        });
    })
  }

  getweatherTypeList() {
    this.adminapiService.get('WeatherType/getWeatherTypeList',true).subscribe(res => {
      this.weatherList = res.sort((a: any, b: any) => {
        return a.weatherTypesName == b.weatherTypesName ? 0
          : a.weatherTypesName > b.weatherTypesName ? 1 : -1
      });
  })

  }

  getAllsections() {
    this.adminapiService.get('Section/getAllSection',true).subscribe(res => {
      this.sectionsList = res.sort((a: any, b: any) => {
        return a.sectionsName == b.sectionsName ? 0
          : a.sectionsName > b.sectionsName ? 1 : -1
      });
    })
  }

  getVehicleType() {
    this.apiService.get('VehicleTypes/getAllVehicleTypes',true).subscribe(res =>{
      this.vehicleTypelist = res;
    }) 
  }

  getGenderList() {
    this.apiService.get('Genders/getAllGenders',true).subscribe(res =>{
      this.genderList = res;
    }) 
  }

  getAllactions() {
     this.adminapiService.get('Actions/getAllActions?ContractID=2',true).subscribe(res => {
       this.actionsList = res;
     })
  }

  changeWorkflowCategory(value:any) { 
    for( var x in this.categoryList) {
        if(value == this.categoryList[x].categoriesID) {
            if(this.categoryList[x].categoriesName == 'Accept') {
              this.acceptButton = true;
              this.rejectButton = false;
             }else {
               this.acceptButton = false;
              this.rejectButton = true;
             }
            }
        }
    }
  

  changeEventItemId(id:number) {
    this.eventId  = id;
    this.galleryImages =[];
      this.apiService.get('Queues/getEntireQueueInfoByEventId?EventId='+id,true).subscribe(res => {
        this.changeWorkflowCategory(res.getWorkFlowInfoByEventIdQueryResponse.categoryID);
        if(res.getViolationImageInfoByEventIdQueryResponse.length) {
          for(var x in res.getViolationImageInfoByEventIdQueryResponse) {
            const obj = {
              small: res.getViolationImageInfoByEventIdQueryResponse[x].assetsLocation,
              medium: res.getViolationImageInfoByEventIdQueryResponse[x].assetsLocation,
              big: res.getViolationImageInfoByEventIdQueryResponse[x].assetsLocation
            }
            this.galleryImages.push(obj);
      }
        }else {
             this.loaddefaultImage();
        }

        const coOwnerDOB = formatDate(
          new Date(res.getRegisterOwnerInfoByEventIdQueryResponse.coOwnerDateOfBirth).toLocaleDateString(),
          'yyyy-MM-dd',
          'en'
        )

        const driverDOB = formatDate(
          new Date(res.getRegisterOwnerInfoByEventIdQueryResponse.dateOfBirth).toLocaleDateString(),
          'yyyy-MM-dd',
          'en'
        )

        const obj = {
          "createDatetime":res.getDmvHistoriesInfoByEventIdQueryResponse.createDatetime,
          "isExport":res.getDmvHistoriesInfoByEventIdQueryResponse.isExport == true ? 'Export': 'Import',
          "plate":res.getDmvHistoriesInfoByEventIdQueryResponse.plate,
          "stateProvincesName":res.getDmvHistoriesInfoByEventIdQueryResponse.stateProvincesName
        }

        this.vrhistroydataSource = new MatTableDataSource<any>(res.getDmvHistoriesInfoByEventIdQueryResponse);
        this.vrhistroydataSource.sort = this.historySort;
        this.vrhistroydataSource.paginator = this.paginator2;

        this.neighboursdataSource = new MatTableDataSource<any>(res.getNeighborsInfoByEventIdQueryResponse);
        this.neighboursdataSource.sort = this.neighbourSort;
        this.neighboursdataSource.paginator = this.paginator1;

        this.queueForm.controls['workflowPlate'].setValue(res.getWorkFlowInfoByEventIdQueryResponse.statePlate);
        this.queueForm.controls['workflowState'].setValue(res.getWorkFlowInfoByEventIdQueryResponse.stateProvincesID.toString());
        this.queueForm.controls['workflowSection'].setValue(res.getWorkFlowInfoByEventIdQueryResponse.sectionsID.toString());
        this.queueForm.controls['weatherType'].setValue(res.getWorkFlowInfoByEventIdQueryResponse.weatherTypesID.toString());
        this.queueForm.controls['workflowaction'].setValue(res.getWorkFlowInfoByEventIdQueryResponse.actionsId.toString());
        this.queueForm.controls['workflowCategory'].setValue(res.getWorkFlowInfoByEventIdQueryResponse.categoryID.toString());
        this.queueForm.controls['vehicleInfoPlate'].setValue(res.getVehicleInfoByEventIdQueryResponse.statePlate);
        this.queueForm.controls['vehicleInfoMake'].setValue(res.getVehicleInfoByEventIdQueryResponse.make);
        this.queueForm.controls['vehicleInfoModel'].setValue(res.getVehicleInfoByEventIdQueryResponse.vehicleModel);
        this.queueForm.controls['vehicleInfoStyle'].setValue(res.getVehicleInfoByEventIdQueryResponse.bodyStyle);
        this.queueForm.controls['vehicleInfoColor'].setValue(res.getVehicleInfoByEventIdQueryResponse.color);
        this.queueForm.controls['vehicleType'].setValue(res.getVehicleInfoByEventIdQueryResponse.vehicleTypesID);
        this.queueForm.controls['vehicleInfoYear'].setValue(res.getVehicleInfoByEventIdQueryResponse.vehicleYearMonth);
        this.queueForm.controls['vehicleInfoVin'].setValue(res.getVehicleInfoByEventIdQueryResponse.vinNumber);
        this.queueForm.controls['ownerInfoDl'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.licenseNumber);
        this.queueForm.controls['ownerInfoDlstate'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.stateProvincesID);
        this.queueForm.controls['ownerBusinessname'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.businessName);
        this.queueForm.controls['ownerInfoDlclass'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.licenseClass);
        this.queueForm.controls['ownerInfofirstname'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.firstName);
        this.queueForm.controls['ownerInfolastname'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.lastName);
        this.queueForm.controls['ownerInfoCoOwnername'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.coOwnerName);
        this.queueForm.controls['ownerInfoCoOwnerlicenceNo'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.coOwnerLicenseNumber);
        // this.queueForm.controls['ownerInfoCoOwnerDOB'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.coOwnerDateOfBirth);
        this.queueForm.controls["ownerInfoCoOwnerDOB"].setValue(coOwnerDOB);
        this.queueForm.controls["ownerInfoCoOwnerDOB"].setValue(driverDOB);
        // this.queueForm.controls['ownerInfoCoOwnerDOBofdriver'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.dateOfBirth);
        this.queueForm.controls['ownerInfoeyeColor'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.eye);
        this.queueForm.controls['ownerInfohaircolor'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.hair);
        this.queueForm.controls['ownerInfoheight'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.height);
        this.queueForm.controls['ownerInfoWeight'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.weight);
        this.queueForm.controls['ownerInfostreet1'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.streetLine1);
        this.queueForm.controls['ownerInfostreet2'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.streetLine2);
        this.queueForm.controls['ownerInfostreet3'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.streetLine3);
        this.queueForm.controls['ownerInfoaddress'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.city);
        this.queueForm.controls['ownerInfoState'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.stateProvincesID.toString());
        this.queueForm.controls['ownerInfozip'].setValue(res.getRegisterOwnerInfoByEventIdQueryResponse.zipCode);
      })
  }

  verifyBlind(data:any) {
    const obj = {
      "eventId":this.eventId,
      "plate": data.doubleBlind,
      "stateProvinceId": data.doubleBlindState
    }
    this.apiService.post('Queues/getDoubleBlindStatus',obj,true).subscribe(res => {
    })
    
  }

  clearDoubleblind() {
    this.queueForm.controls['doubleBlind'].setValue("");
    this.queueForm.controls['doubleBlindState'].setValue("");
    this.queueForm.controls['doubleBlindDLState'].setValue("");
    this.queueForm.controls['doubleBlindrejectCategory'].setValue("");
  }

  returnVRlookup(data:any) {
    const obj =
      {
        "eventId": this.eventId,
        "plate": data.vrPlate,
        "stateProvinceId":data.vrrejectCategory
      }
    
    this.apiService.post('Queues/ReturnToVRLookup',obj,true).subscribe(res => {
        if(res.status == 'Success') {
          const msg = "";
          this.welcome = this.translate.instant("Record Returned Successfully", { msg: msg });
          this.notificationService.success(this.welcome);
          this.queueForm.controls['vrPlate'].setValue("");
          this.queueForm.controls['vrrejectCategory'].setValue("");
          this.getEventList(this.selectedQueue);
        }
    })
    
  }

  acceptworkData(data:any) {
    const obj = {
      "addUpdateVehicleInfoByEventIdRequest": {
        "contractID": 2,
        "statePlate":data.vehicleInfoPlate,
        "eventsID": this.eventId,
        "vehicleRecordsID": 0,
        "make": data.vehicleInfoMake,
        "vehicleModel": data.vehicleInfoModel,
        "bodyStyle": data.vehicleInfoStyle,
        "color": data.vehicleInfoColor,
        "vehicleYearMonth": data.vehicleInfoYear,
        "vinNumber": data.vehicleInfoVin == ("" || null) ? null : data.vehicleInfoVin,
        "vehicleTypesID":data.vehicleType,
        "userID": 1
      },
      "addUpdateWorkFlowInfoByEventIdRequest": {
        "contractID": 2,
        "eventsID": this.eventId,
        "stateProvincesID": data.workflowState,
        "sectionsID": data.workflowSection,
        "plate": data.workflowPlate,
        "weatherTypesID": data.weatherType,
        "actionsID": 1,
        "categoriesID": data.workflowCategory,
        "userID": 1
      },
      "addUpdateRegisterOwnerInfoByEventIdRequest": {
        "contractID": 2,
        "eventsID": this.eventId,
        "licenseNumber": data.ownerInfoDl == ("" || null) ? null : data.ownerInfoDl,
        "licenseStateProvinceId": data.ownerInfoDlstate == ("" || null) ? null : data.ownerInfoDlstate,
        "licenseClass": data.ownerInfoDlclass == ("" || null) ? null : data.ownerInfoDlclass,
        "businessName": data.ownerBusinessname == ("" || null) ? null : data.ownerBusinessname,
        "firstName": data.ownerInfofirstname == ("" || null) ? null : data.ownerInfofirstname,
        "lastName": data.ownerInfolastname == ("" || null) ? null : data.ownerInfolastname,
        "dateOfBirth": data.ownerInfoCoOwnerDOB == ("" || null) ? null : data.ownerInfoCoOwnerDOB,
        "gendersID": data.ownerInfogender == ("" || null) ? null : data.ownerInfogender,
        "eye":  data.ownerInfoeyeColor == ("" || null) ? null : data.ownerInfoeyeColor,
        "hair": data.ownerInfohaircolor == ("" || null) ? null : data.ownerInfohaircolor,
        "height": data.ownerInfoheight == ("" || null) ? null : data.ownerInfoheight,
        "weight": data.ownerInfoWeight == ("" || null) ? null : data.ownerInfoWeight,
        "streetLine1": data.ownerInfostreet1 == ("" || null) ? null : data.ownerInfostreet1,
        "streetLine2": data.ownerInfostreet2 == ("" || null) ? null : data.ownerInfostreet2,
        "streetLine3": data.ownerInfostreet3 == ("" || null) ? null : data.ownerInfostreet3,
        "city": data.ownerInfoaddress == ("" || null) ? null : data.ownerInfoaddress,
        "stateProvincesID": data.ownerInfoState == ("" || null) ? null : data.ownerInfoState,
        "zipCode": data.ownerInfozip == ("" || null) ? null : data.ownerInfozip,
        "coOwnerName": data.ownerInfoCoOwnername == ("" || null) ? null : data.ownerInfoCoOwnername,
        "coOwnerDateOfBirth": data.ownerInfoCoOwnerDOB == ("" || null) ? null : data.ownerInfoCoOwnerDOB,
        "coOwnerLicenseNumber": data.ownerInfoCoOwnerlicenceNo == ("" || null) ? null : data.ownerInfoCoOwnerlicenceNo,
        "userID": 1
      }
    }
    this.apiService.post('Queues/addUpdateEntireQueueInfoByEventId',obj,true).subscribe(res => {
      if(res.status =="Success") {
        const msg = "";
        this.welcome = this.translate.instant("Record Updated Successfully", { msg: msg });
        this.notificationService.success(this.welcome);
        this.getEventList(this.selectedQueue);
        this.getFirstEvent(this.selectedQueue);
      }
    })
  }

  rejectworkData(data:any) {

  }

  getFirstEvent(id:any) {
    this.eventList =[];
    this.apiService.get('Queues/getFirstEventsByQueuesId?QueuesID='+ id +'&UserID=1',true).subscribe(res => {
      this.eventList.push(res);
      this.queueForm.controls['eventItem'].setValue(this.eventList[0].eventsID.toString());
      // this.selectedQueue = this.eventList[0].eventsID;
      this.queueid = id;
      this.changeEventItemId(this.eventList[0].eventsID);
    })
  }

  skiptoNextevent() {
    const obj ={
      "eventsId": this.selectedQueue,
      "userId": 1,
      "comments": ""
    }
    this.apiService.post('Queues/skipEventByEventsId',obj,true).subscribe(res => {
        if(res.status == "Success") {
          const msg = "";
          this.welcome = this.translate.instant("Record Skipped Successfully", { msg: msg });
          this.notificationService.success(this.welcome);
          this.getFirstEvent(this.queueid);
        }
    })
  }

}