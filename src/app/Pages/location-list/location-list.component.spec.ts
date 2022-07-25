import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LocationListServiceStub } from 'src/app/shared/testCasesHelperClasses/LocationListServiceStub';
import { sampleArray } from 'src/app/shared/testCasesHelperClasses/LocationMockData/mockLocationArray';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { LocationListComponent } from './location-list.component';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { ValidationServiceStub } from 'src/app/shared/testCasesHelperClasses/ValidationServiceStub';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatFormFieldModule } from '@angular/material/form-field';
const translateServiceSpy = jasmine.createSpyObj<TranslateService>('TranslateService', ['instant','use']);
xdescribe('LocationListComponent', () => {
  let translate: TranslateService;
  let component: LocationListComponent;
  let fixture: ComponentFixture<LocationListComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let apiService:ApiService;
  let inputElement: HTMLInputElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationListComponent ],
      imports:[
        HttpClientTestingModule,
        TranslateStubsModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        RouterTestingModule,
        MatSortModule,
        AngularmaterialModule,
        MatTableModule,
        MatIconModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule
      ],
      providers:[
        { provide: TranslateService, useClass:TranslateServiceStub},
        { provide: LanguageService, useClass:languageServiceStub},
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub},
        { provide: ToastrService, useClass: ToasterServiceStub},
        { provide: ApiService, useClass:LocationListServiceStub},
        { provide: ValidationService, useClass:ValidationServiceStub}
      ]
    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    apiService = TestBed.inject(ApiService);
    translate = TestBed.inject(TranslateService);
  });
  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(LocationListComponent).toBeDefined();
    spyOn(window, "confirm").and.returnValue(true);
    component.showAddLane=true;
    component.showAddForm=true;
    component.showEditForm=true;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('location_list');
  });
  it('should get user list',()=>{
    component.getList();
    fixture.detectChanges();
    expect(component.locationDataSource.data).toBe(sampleArray);
    expect(component.locationDataSource.data.length).toBe(43);
  });
  it('Form should be invalid',()=>{
    expect(component.LocationForm.valid).toBeFalsy();
  })
  it('locationsCode:check required Validation',()=>{
    let errors:any={};
    let locationsCode=component.LocationForm.controls["locationsCode"];
    expect(locationsCode.valid).toBeFalsy();

    errors = locationsCode.errors || {};
    expect(errors['required']).toBeTruthy();

    locationsCode.setValue("001");
    errors = locationsCode.errors || {};
    fixture.detectChanges();
    expect(errors['required']).toBeFalsy();
  })
  it('locationsName field validity', () => {
    let errors: any;
    let locationsName = component.LocationForm.controls['locationsName'];
    expect(locationsName.valid).toBeFalsy();

    // email field is required
    errors = locationsName.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    locationsName.setValue('Noarway');
    fixture.detectChanges();
    errors = locationsName.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('checking cameraType validations',()=>{

    let errors:any={};
    let cameraType= component.LocationForm.controls["cameraType"];
    expect(cameraType.valid).toBeFalsy();

    errors = cameraType.errors || {};
    expect(errors['required']).toBeTruthy();

    cameraType.setValue("test");
    fixture.detectChanges();
    errors = cameraType.errors || {};
    expect(errors['required']).toBeFalsy();
  })
  it('checking latitude validations',()=>{

    let errors:any={};
    let latitude=component.LocationForm.controls["latitude"];
    expect(latitude.valid).toBeTruthy();

    errors = latitude.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxLength(10)']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();

    latitude.setValue("0.000000000");
    fixture.detectChanges();
    errors = latitude.errors || {};
    expect(errors['maxLength(10)']).toBeUndefined();
    expect(errors['required']).toBeUndefined();
    expect(errors['pattern']).toBeTruthy();
  })
  it('checking longitude validations',()=>{

    let errors:any={};
    let longitude=component.LocationForm.controls["longitude"];
    expect(longitude.valid).toBeTruthy();

    errors = longitude.errors || {};
    expect(errors['required']).toBeUndefined();
    expect(errors['maxLength(10)']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();

    longitude.setValue("0.000000000");
    fixture.detectChanges();
    expect(errors['maxLength(10)']).toBeUndefined();
    expect(errors['required']).toBeUndefined();
    expect(errors['pattern']).toBeUndefined();
  })
  it('checking locationsDescription validations',()=>{

    let errors:any={};
    let locationsDescription=component.LocationForm.controls["locationsDescription"];
    expect(locationsDescription.valid).toBeTruthy();

    errors = locationsDescription.errors || {};
    expect(errors['required']).toBeUndefined();

    locationsDescription.setValue("Noarway");
    fixture.detectChanges();
    errors = locationsDescription.errors || {};
    expect(errors['required']).toBeUndefined();
  })
  it('checking enable validations',()=>{
    let errors:any={};
   let enable=component.LocationForm.controls["enable"];
   expect(enable.valid).toBeTruthy();
  }
  )
  it('checking lprEnable validations',()=>{
    let errors:any={};
   let lprEnable=component.LocationForm.controls["lprEnable"];
   expect(lprEnable.valid).toBeTruthy();
  }
  )
  it('checking speedLimit validations',()=>{
    let errors:any={};
   let speedLimit=component.LocationForm.controls["speedLimit"];
   expect(speedLimit.valid).toBeTruthy();
  }
  )
  it('checking warningPeriodStart validations',()=>{
    let errors:any={};
   let warningPeriodStart=component.LocationForm.controls["warningPeriodStart"];
   expect(warningPeriodStart.valid).toBeFalsy();

   errors = warningPeriodStart.errors || {};
    expect(errors['required']).toBeTruthy();

    warningPeriodStart.setValue("2022-07-14T13:45");
    fixture.detectChanges();
    errors = warningPeriodStart.errors || {};
    expect(errors['required']).toBeUndefined();
  }
  )
  it('checking enforcementPeriodStart validations',()=>{
    let errors:any={};
   let enforcementPeriodStart=component.LocationForm.controls["enforcementPeriodStart"];
   expect(enforcementPeriodStart.valid).toBeFalsy();

   errors = enforcementPeriodStart.errors || {};
    expect(errors['required']).toBeTruthy();

    enforcementPeriodStart.setValue("2022-07-14T01:44");
    fixture.detectChanges();
    errors = enforcementPeriodStart.errors || {};
    expect(errors['required']).toBeUndefined();
  }
  )
  it('checking redSeconds validations',()=>{
    let errors:any={};
   let redSeconds=component.LocationForm.controls["redSeconds"];
   expect(redSeconds.valid).toBeFalsy();

   errors = redSeconds.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(errors['pattern']).toBeUndefined();

    redSeconds.setValue("Noarway");
    fixture.detectChanges();
    errors = redSeconds.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    redSeconds.setValue(1);
    fixture.detectChanges();
    errors = redSeconds.errors || {};
    expect(redSeconds.errors).toBeNull()
  }
  )
  it('checking yellowSeconds validations',()=>{
    let errors:any={};
   let yellowSeconds=component.LocationForm.controls["yellowSeconds"];
   expect(yellowSeconds.valid).toBeFalsy();

   errors = yellowSeconds.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(errors['pattern']).toBeUndefined();

    yellowSeconds.setValue("Noarway");
    fixture.detectChanges();
    errors = yellowSeconds.errors || {};
    expect(errors['required']).toBeUndefined();
    expect(errors['pattern']).toBeTruthy();

    yellowSeconds.setValue(1);
    fixture.detectChanges();
    errors = yellowSeconds.errors || {};
    expect(errors['required']).toBeUndefined();
    expect(errors['pattern']).toBeUndefined();
  }
  )
  it('checking value validations',()=>{
    let errors:any={};
   let value=component.LocationForm.controls["value"];
   expect(value.valid).toBeTruthy();
  })
  it('checking jurisdictionsID validations',()=>{
    let errors:any={};
   let jurisdictionsID=component.LocationForm.controls["jurisdictionsID"];
   expect(jurisdictionsID.valid).toBeFalsy();

   errors = jurisdictionsID.errors || {};
   expect(errors['required']).toBeTruthy();

   jurisdictionsID.setValue("Noarway");
   errors = jurisdictionsID.errors || {};
   expect(errors['required']).toBeUndefined();
  })
  it('checking rejectAmberSecBelow validations',()=>{
    let errors:any={};
   let rejectAmberSecBelow=component.LocationForm.controls["rejectAmberSecBelow"];
   expect(rejectAmberSecBelow.valid).toBeTruthy();
  }
  )
  it('checking belowSecondsValue validations',()=>{
    let errors:any={};
   let belowSecondsValue=component.LocationForm.controls["belowSecondsValue"];
   expect(belowSecondsValue.valid).toBeTruthy();
  }
  )
  it('checking rejectYellowSec validations',()=>{
    let errors:any={};
   let rejectYellowSec=component.LocationForm.controls["rejectYellowSec"];
   expect(rejectYellowSec.valid).toBeFalsy();

   errors = rejectYellowSec.errors || {};
   expect(errors['required']).toBeTruthy();

   rejectYellowSec.setValue(null);
   errors = rejectYellowSec.errors || {};
   expect(errors['required']).toBeTruthy();

   rejectYellowSec.setValue("Noarway");
   errors = rejectYellowSec.errors || {};
   expect(errors['required']).toBeUndefined();
  }
  )
  it('checking laneNum validations',()=>{
    let errors:any={};
   let laneNum=component.LocationForm.controls["laneNum"];
   expect(laneNum.valid).toBeTruthy();
  }
  )
  it('checking laneMinSpeed validations',()=>{
    let errors:any={};
   let laneMinSpeed=component.LocationForm.controls["laneMinSpeed"];
   expect(laneMinSpeed.valid).toBeTruthy();
  }
  )
  it('checking varSpeedLimit validations',()=>{
    let errors:any={};
   let varSpeedLimit=component.LocationForm.controls["varSpeedLimit"];
   expect(varSpeedLimit.valid).toBeTruthy();
  }
  )
  it('checking varEnforcementSpeed validations',()=>{
    let errors:any={};
   let varEnforcementSpeed=component.LocationForm.controls["varEnforcementSpeed"];
   expect(varEnforcementSpeed.valid).toBeTruthy();
  }
  )
  it('checking startTime validations',()=>{
    let errors:any={};
   let startTime=component.LocationForm.controls["startTime"];
   expect(startTime.valid).toBeTruthy();
  }
  )
  it('checking endTime validations',()=>{
    let errors:any={};
   let endTime=component.LocationForm.controls["endTime"];
   expect(endTime.valid).toBeTruthy();
  }
  )
  it('checking weekDays validations',()=>{
    let errors:any={};
   let weekDays=component.LocationForm.controls["weekDays"];
   expect(weekDays.valid).toBeTruthy();
  }
  )
  it('Form should be valid',()=>{
    let locationsCode=component.LocationForm.controls["locationsCode"];
    locationsCode.setValue("001");

    let locationsName = component.LocationForm.controls['locationsName'];
    locationsName.setValue("Noarway");

    let cameraType= component.LocationForm.controls["cameraType"];
    cameraType.setValue("Mesa");

    let latitude=component.LocationForm.controls["latitude"];
    latitude.setValue(89.999999);

    let longitude=component.LocationForm.controls["longitude"];
    longitude.setValue(89.999999);

    let locationsDescription=component.LocationForm.controls["locationsDescription"];
    locationsDescription.setValue("Noarway");

    let enable=component.LocationForm.controls["enable"];
    locationsDescription.setValue(false);

    let lprEnable=component.LocationForm.controls["lprEnable"];
    lprEnable.setValue(false);

    let speedLimit=component.LocationForm.controls["speedLimit"];
    speedLimit.setValue(1);

    let warningPeriodStart=component.LocationForm.controls["warningPeriodStart"];
     warningPeriodStart.setValue("2022-06-16T20:37:00");

     let enforcementPeriodStart=component.LocationForm.controls["enforcementPeriodStart"];
    enforcementPeriodStart.setValue("Noarway");

    let redSeconds=component.LocationForm.controls["redSeconds"];
     redSeconds.setValue(999);

     let yellowSeconds=component.LocationForm.controls["yellowSeconds"];
    yellowSeconds.setValue(999);

    let value=component.LocationForm.controls["value"];
    value.setValue("WB");

    let jurisdictionsID=component.LocationForm.controls["jurisdictionsID"];
    jurisdictionsID.setValue(129);

    let rejectAmberSecBelow=component.LocationForm.controls["rejectAmberSecBelow"];
    rejectAmberSecBelow.setValue(false);

    let belowSecondsValue=component.LocationForm.controls["belowSecondsValue"];
    belowSecondsValue.setValue("Noarway");

    let rejectYellowSec=component.LocationForm.controls["rejectYellowSec"];
    rejectYellowSec.setValue(false);

    let laneNum=component.LocationForm.controls["laneNum"];
    laneNum.setValue("Noarway");

    let laneMinSpeed=component.LocationForm.controls["laneMinSpeed"];
    laneMinSpeed.setValue(129);

    let varSpeedLimit=component.LocationForm.controls["varSpeedLimit"];
    varSpeedLimit.setValue(99);

    let varEnforcementSpeed=component.LocationForm.controls["varEnforcementSpeed"];
    varEnforcementSpeed.setValue(99);

    let startTime=component.LocationForm.controls["startTime"];
    startTime.setValue("12");

    let endTime=component.LocationForm.controls["endTime"];
    endTime.setValue("Noarway");

    let weekDays=component.LocationForm.controls["weekDays"];
    weekDays.setValue("12");
    expect(component.LocationForm.valid).toBeTruthy();
  })
  it('call getLanesList()',()=>{
    let payloadObj = {
      active: true,
      contractID: 2,
      createDatetime: "2022-07-01T09:19:20.713",
      createUserID: 1,
      isDeleted: "N",
      lanesID: 159,
      lanesMinimumSpeed: 243,
      lanesNumber: 99,
      locationsID: 433,
      updateDatetime: "2022-07-01T09:19:20.713",
      updateUserID: 1,
      warningPeriodStart: "2022-06-16T20:37:00"
    }
    let laneLocId=433;
    component.getLanesList(laneLocId);
    let resp=[
      {
          lanesID: 166,
          contractID: 2,
          lanesNumber: 4,
          lanesMinimumSpeed: 3,
          locationsID: 443,
          active: true,
          createUserID: 1,
          updateUserID: 1,
          createDatetime: "2022-07-14T11:45:52.65",
          updateDatetime: "2022-07-14T11:45:52.65",
          isDeleted: "N"
      }
  ]
    component.lanesSort=new MatSort({disableClear: true});
    component.lanesDataSource = new MatTableDataSource<any>(resp);
    component.lanesDataSource.sort = component.lanesSort;
    spyOn(component, 'getLanesList').and.callThrough;
    component.lanefilterdata();
  })
  it('should call getSpeedList',()=>{
    let speedLocId:any=421;
    let speedLimitObj=[
			{
				active: true,
				contractId: 1,
				createDatetime: "2022-07-01T06:37:34.64",
				createUserID: 0,
				daysOfTheWeek: "M",
				endTime: "02:02:00",
				enforcementSpeed: 123,
				isDeleted: "N",
				locationCode: null,
				locationId: 421,
				speedLimit: 99,
				startTime: "14:02:00",
				updateDatetime: "2022-07-01T06:37:34.64",
				updateUserID: 0,
				variableSpeedLimitsID: 76
			}
		]
    component.getSpeedList(speedLocId);
    expect(component.speedDataSource.data).toEqual(component.speedList);
  })
  it('check addLane()',()=>{
    component.addLane();

    let laneNum=component.LocationForm.controls['laneNum'];
    // laneNum.reset();
    expect(laneNum.value).toEqual(null);

    let laneMinSpeed=component.LocationForm.controls['laneMinSpeed'];
    expect(laneMinSpeed.value).toEqual(null);

    expect(component.showAddLane).toEqual(true);
  })
  it('should call getlist', () => {
    component.getList;
    fixture.detectChanges;
    spyOn(component, 'filterData').and.callThrough;
    expect(component.filterData).toHaveBeenCalled;
  });
  it('call cancelLane() ',()=>{
    component.showAddLane=true;
    component.cancelLane();

    let laneNum=component.LocationForm.controls['laneNum'];
    expect(laneNum.value).toEqual(null);

    let laneMinSpeed=component.LocationForm.controls['laneMinSpeed'];
    expect(laneMinSpeed.value).toEqual(null);

    expect(component.showAddLane).toEqual(false);
    expect(component.laneList).toEqual([]);
  })
  it('createLanesList',()=>{
    component.createLanesList()
    expect(component.lanesDataSource.data).toEqual([])
    expect(component.laneList).toEqual([]);

  })
  it('applyLaneFilter',()=>{
    let input = fixture.debugElement.query(By.css('input'));
    let inputElement = input.nativeElement;
    let laneLocId=411;
    component.getLanesList(laneLocId);
    fixture.detectChanges();
    inputElement.value = 'abC';
    fixture.detectChanges();
    const event = new KeyboardEvent('keyup', { key: 'C' });
    inputElement.dispatchEvent(event);
    component.applyLaneFilter(event);
    let searchData= (event.target as HTMLInputElement).value;

    expect(searchData.trim().toLowerCase()).toBe('abc');

    expect(component.lanesDataSource.filter).toEqual('abc');

    expect(inputElement.value).toBe('abC');

    component.lanefilterdata();

    expect(component.lanesDataSource.filter).toBe('abc');
  })
  it('addData',()=>{
    let locationsCode=component.LocationForm.controls["locationsCode"];
    locationsCode.setValue("506");

    let locationsName = component.LocationForm.controls['locationsName'];
    locationsName.setValue("Kolkata");

    let cameraType= component.LocationForm.controls["cameraType"];
    cameraType.setValue("Vitronic");

    let latitude=component.LocationForm.controls["latitude"];
    latitude.setValue(85);

    let longitude=component.LocationForm.controls["longitude"];
    longitude.setValue(167.9999);

    let locationsDescription=component.LocationForm.controls["locationsDescription"];
    locationsDescription.setValue("Work");

    let enable=component.LocationForm.controls["enable"];
    enable.setValue(true);

    let lprEnable=component.LocationForm.controls["lprEnable"];
    lprEnable.setValue(true);

    let speedLimit=component.LocationForm.controls["speedLimit"];
    speedLimit.setValue(3);

    let warningPeriodStart=component.LocationForm.controls["warningPeriodStart"];
     warningPeriodStart.setValue("2022-07-17T18:28");

     let enforcementPeriodStart=component.LocationForm.controls["enforcementPeriodStart"];
    enforcementPeriodStart.setValue("2022-07-31T18:28");

    let redSeconds=component.LocationForm.controls["redSeconds"];
     redSeconds.setValue(6);

     let yellowSeconds=component.LocationForm.controls["yellowSeconds"];
    yellowSeconds.setValue(6);

    let value=component.LocationForm.controls["value"];
    value.setValue("EB");

    let jurisdictionsID=component.LocationForm.controls["jurisdictionsID"];
    jurisdictionsID.setValue(133);

    let rejectAmberSecBelow=component.LocationForm.controls["rejectAmberSecBelow"];
    rejectAmberSecBelow.setValue(false);

    let belowSecondsValue=component.LocationForm.controls["belowSecondsValue"];
    belowSecondsValue.setValue("Noarway");

    let rejectYellowSec=component.LocationForm.controls["rejectYellowSec"];
    rejectYellowSec.setValue(false);

    let laneNum=component.LocationForm.controls["laneNum"];
    laneNum.setValue("Noarway");

    let laneMinSpeed=component.LocationForm.controls["laneMinSpeed"];
    laneMinSpeed.setValue(129);

    let varSpeedLimit=component.LocationForm.controls["varSpeedLimit"];
    varSpeedLimit.setValue(99);

    let varEnforcementSpeed=component.LocationForm.controls["varEnforcementSpeed"];
    varEnforcementSpeed.setValue(99);

    let startTime=component.LocationForm.controls["startTime"];
    startTime.setValue("12");

    let endTime=component.LocationForm.controls["endTime"];
    endTime.setValue("Noarway");

    let weekDays=component.LocationForm.controls["weekDays"];
    weekDays.setValue("12");
    expect(component.LocationForm.valid).toBeTruthy();
    let locationsModel:any = {
      active: true,
      cameraTypesID: 1,
      contractID: 2,
      direction: 'EB',
      enforcementPeriodStart: '2022-07-31T18:28',
      isDeleted: 'N',
      jurisdictionsID: 133,
      latitude: '85',
      locationsCode: '506',
      locationsDescription: 'Work',
      locationsEnabled: true,
      locationsID: 0,
      locationsName: 'Kolkata',
      longitude: '167.9999',
      lprEnable: true,
      redLightLocations: {
        active: true,
        contractId: 2,
        isDeleted: 'N',
        locationCode: '506',
        locationsID: 0,
        redLightLocationsID: 0,
        redSeconds: 6,
        rejectYellowSecondsBelow: true,
        rejectYellowSecondsBelowCategoryId: 1,
        rejectYellowSecondsBelowValue: 3,
        yellowSeconds: 6,
      },
      speedLimit: 3,
      speedLocations: null,
      warningPeriodStart: '2022-07-17T18:28',
    };
    component.addData(locationsModel);
    component.laneList=[{
      active: true,
      contractID: 1,
      createDatetime: "2022-07-18T15:49:21.337",
      createUserID: 1,
      isDeleted: "N",
      lanesID: 175,
      lanesMinimumSpeed: 3,
      lanesNumber: 4,
      locationsID: 448,
      updateDatetime: "2022-07-18T15:49:21.337",
      updateUserID: 1
    }]
    expect(component.laneList.length).toBeGreaterThan(0);
    component.addLanesData(506);
  })
  it('addLanesData',()=>{
    let lanesLocID=412;
    var obj = {
			laneModel:[{
				active: true,
				contractID: 1,
				createDatetime: "2022-05-19T06:58:26.374Z",
				createUserID: 1,
				isDeleted: "N",
				lanesID: 0,
				lanesMinimumSpeed: 2,
				lanesNumber: 1,
				locationsID: 412,
				updateDatetime: "2022-05-19T06:58:26.374Z",
				updateUserID: 1,
			}]
		  }
component.addLanesData(lanesLocID);
  })
  it('updateLanesData',()=>{
    let lanesLocID=412;
    component.updateLanesData(lanesLocID)
  })
  it('addSpeed()',()=>{
    component.addSpeed();
  })
  it('addLocation()',()=>{
    component.addLocation();
  })
  it('addLocation()',()=>{
    component.isRedLight=false;
    expect(component.isRedLight).toEqual(false);
    component.addLocation();
    component.createSpeedList();
  })
  it('announceSortChange', () => {
    let sortState: Sort = {
      direction: 'asc',
      active:'true'
    }
    component.announceSortChange(sortState);
    expect(sortState.direction).toEqual('asc');
  })
  it('announceSortChange if direction is missing', () => {
    let sortState: Sort = {
      direction: '',
      active:'true'
    }
    component.announceSortChange(sortState);
    expect(sortState.direction).toEqual('');
  })
  it('appendLang',()=>{
    let lang='en';
    component.appendLang(lang);
  })
  it('appendLangInAdd',()=>{
    let lang='en';
    component.isRedLight=false;
    component.appendLangInAdd(lang);
    let isRedLight: boolean = false;
   expect(component.isRedLight).toEqual(isRedLight);
      component.setSpeedPagelabel(lang);
      spyOn(component, 'setSpeedPagelabel').and.callThrough;
      expect(component.setSpeedPagelabel).toHaveBeenCalled;
  })
    it('appendLangInAdd',()=>{
    let lang='en';
    component.isRedLight=true;
    component.appendLangInAdd(lang);
    let isRedLight: boolean = false;
   expect(component.isRedLight).toEqual(!isRedLight);
      component.setSpeedPagelabel(lang);
      spyOn(component, 'setSpeedPagelabel').and.callThrough;
      expect(component.setSpeedPagelabel).toHaveBeenCalled;
  })
  it('setLanePagelabel(lang: any)',()=>{
    let lang='en';
    component.setLanePagelabel(lang);
    expect(lang).toEqual('en');
    let alertMsg=translateServiceSpy.instant("Items per page")
    translateServiceSpy.instant.and.returnValue("Items per page");
  })
  it('should call seLanetPagelabel', () => {
    let lang = {};
    component.setLanePagelabel(lang);
    expect(lang).toEqual({});
  });
  it('should call setLocationPagelabel', () => {
    let lang = {};
    component.setLocationPagelabel(lang);
    expect(lang).toEqual({});
  });
  it('setLocationPagelabel(lang: any)',()=>{
    let lang='en';
    component.setLocationPagelabel(lang);
    expect(lang).toEqual('en');
    expect(component.locationDataSource).toBeTruthy();
    translateServiceSpy.instant.and.returnValue("Items per page")
    let alertMsg=translateServiceSpy.instant("Items per page");
    component.alertMsg=alertMsg;
    expect(component.alertMsg).toEqual(alertMsg)
  })
  it('should call setSpeedPagelabel', () => {
    let lang = {};
    component.setSpeedPagelabel(lang);
    expect(lang).toEqual({});
  });
  it('setSpeedPagelabel(lang: any)',()=>{
    let lang='en';
    component.setSpeedPagelabel(lang);
    expect(lang).toEqual('en');
    translateServiceSpy.instant.and.returnValue("Items per page")
    let alertMsg=translateServiceSpy.instant("Items per page");
    component.alertMsg=alertMsg;
    expect(component.alertMsg).toEqual(alertMsg)
  })
  it('cancelSpeed',()=>{
    component.cancelSpeed()
      expect(component.showAddSpeed).toEqual(false);
     expect(component.varSpeedError).toEqual(false);
     expect(component.varStartTimeError).toEqual(false);
      expect(component.varEndTimeError).toEqual(false);
  })
  it('Cameralist',()=>{
    let event={
      value: 1
    }
    component.Cameralist(event)
  })
  it('rejectYellowCategory',()=>{
    let event={
      value: 1
    }
    component.rejectYellowCategory(event)
  })
  it('valueSelect',()=>{
    let event={
      value: "EB"
    }
    component.valueSelect(event)
  })
  it('contractSelect',()=>{
    let event={
      value: 1
    }
    component.contractSelect(event)
  })
  it('juriID',()=>{
    let event={
      value: 133
    }
    component.juriID(event);
    component.LocationForm.controls['jurisdictionsID'].setValue(133);
  })
  xit('deleteLaneRow(data: any)',()=>{
    let data=
    {
      active: true,
      contractID: 2,
      createDatetime: "2022-07-01T09:19:20.713",
      createUserID: 1,
      isDeleted: "N",
      lanesID: 159,
      lanesMinimumSpeed: 243,
      lanesNumber: 99,
      locationsID: 433,
      updateDatetime: "2022-07-01T09:19:20.713",
      updateUserID: 1
}
component.deleteLaneRow(data);
component.laneList=[{
  active: true,
  contractID: 1,
  createDatetime: "2022-07-18T15:49:21.337",
  createUserID: 1,
  isDeleted: "N",
  lanesID: 175,
  lanesMinimumSpeed: 3,
  lanesNumber: 4,
  locationsID: 448,
  updateDatetime: "2022-07-18T15:49:21.337",
  updateUserID: 1
}]
fixture.detectChanges();
fixture.detectChanges();
component.speedSort.sort(
  { id: '', start: 'asc', disableClear: false }
)
    })
  it('deleteLaneData',()=>{
    let LaneId=159;
    component.deleteLaneData(LaneId);
    fixture.detectChanges();
    fixture.detectChanges();
  })
  it(' onEditIconClick(id: number) ',()=>{
    component.locationsort=new MatSort({disableClear: true});
    let locationsID=443;
    component.isRedLight=false;
    let isRedLight: boolean = false;
   expect(component.isRedLight).toEqual(isRedLight);
    component.onEditIconClick(locationsID);
    expect(component.showEditForm ).toEqual(true);
    expect(component.editRowId).toEqual(locationsID);
    component.getLanesList(locationsID);
    expect(component.updatedLaneList).toEqual([]);
    })
    it(' onEditIconClick(id: number) ',()=>{
      let locationsID=443;
      component.isRedLight=true;
      let isRedLight: boolean = false;
     expect(component.isRedLight).toEqual(!isRedLight);
      component.onEditIconClick(locationsID);
      expect(component.showEditForm ).toEqual(true);
      expect(component.editRowId).toEqual(locationsID);
      component.getLanesList(locationsID);
      expect(component.updatedLaneList).toEqual([]);
      })
    it('error response when code is 5000 and message is not DuplicateKey', () => {
      let error = {
        error: {
          details: [{
            "timestamp": "2022-06-29T06:47:59.717+0000",
            "code": 5000,
            "error": "Not Found",
            "message": "No message available",
            "path": "/admin/v1/interaction1"
          }]
        }
      }
      component.errorResponseCheck(error);
      expect(error.error.details[0].code).toEqual(5000);
    })
    it('error response when message is DuplicateKey and code 5000', () => {
      let error = {
        error: {
          details: [{
            "timestamp": "2022-06-29T06:47:59.717+0000",
            "code": 5000,
            "error": "Not Found",
            "message": "DuplicateKey",
            "path": "/admin/v1/interaction1"
          }]
        }
      }
      component.errorResponseCheck(error);
      expect(error.error.details[0].code).toEqual(5000);
    })
    it('error response when message is DuplicateKey and code 5000', () => {
      let error = {
        error: {
          details: [{
            "timestamp": "2022-06-29T06:47:59.717+0000",
            "code": 5000,
            "error": "Not Found",
            "message": "No message available",
            "path": "/admin/v1/interaction1",
            "fieldName": "location"
          }]
        }
      }
      component.errorResponseCheck(error);
      expect(error.error.details[0].code).toEqual(5000);
    })
    it('error response when message is DuplicateKey and code 5000', () => {
      let error = {
        error: {
          details: [{
            "timestamp": "2022-06-29T06:47:59.717+0000",
            "code": 5000,
            "error": "Not Found",
            "message": "No message available",
            "path": "/admin/v1/interaction1",
            "fieldName": "warningPeriodStart"
          }]
        }
      }
      component.errorResponseCheck(error);
      expect(error.error.details[0].code).toEqual(5000);
    })
    it('error response when message is DuplicateKey and code 5000', () => {
      let error = {
        error: {
          details: [{
            "timestamp": "2022-06-29T06:47:59.717+0000",
            "code": 5000,
            "error": "Not Found",
            "message": "No message available",
            "path": "/admin/v1/interaction1",
            "fieldName": "enforcementPeriodStart"
          }]
        }
      }
      component.errorResponseCheck(error);
      expect(error.error.details[0].code).toEqual(5000);
    })
    it('error response when code is not 5000 and message is not DuplicateKey', () => {
      let error = {
        error: {
          details: [{
            "timestamp": "2022-06-29T06:47:59.717+0000",
            "code": 404,
            "error": "Not Found",
            "message": "No message available",
            "path": "/admin/v1/interaction1"
          }]
        }
      }
      component.errorResponseCheck(error);
      expect(error.error.details[0].code).toEqual(404);
    })
    it('toggleLocation if status true', () => {
      let id = 444;
      component.toggleLocation(id, true);
      fixture.detectChanges();
      // expect(component.successMsg).toEqual("Location  Enabled Successfully");
    })
  
    it('toggleLocation if status false', () => {
      let id = 444;
      component.toggleLocation(id, false);
      fixture.detectChanges();
      // expect(component.successMsg).toEqual("Location  Disabled Successfully");
    })
    it('sortLanesData',()=>{
      let date="15/07/2022"
      let sortState:Sort = {
        active: 'laneNum',
        direction: 'asc',
      };
      component.sortLanesData(sortState)
    })
    it('sortLanesData',()=>{
      let sortState:Sort = {
        active: 'laneNum',
        direction: 'desc',
      };
      component.sortLanesData(sortState)
    })
    it('sortLanesData',()=>{
      let sortState:Sort = {
        active: 'laneMinSpeed',
        direction: 'asc',
      };
      component.sortLanesData(sortState)
    })
    it('sortLanesData',()=>{
      let sortState:Sort = {
        active: 'laneMinSpeed',
        direction: 'desc',
      };
      component.sortLanesData(sortState)
    })
    it('errorHandlingLane',()=>{
      let data={laneMinSpeed:""}
      component.errorHandlingLane(data);
    })
    it('errorHandlingLane',()=>{
      let data={laneNum :""}
      component.errorHandlingLane(data);
    })
    it('createLanesTable',()=>{
      let data = {
        belowSecondsValue: null,
        cameraType: null,
        enable: false,
        endTime: null,
        enforcementPeriodStart: null,
        jurisdictionsID: null,
        laneMinSpeed: 2,
        laneNum: 2,
        latitude: null,
        locationsCode: null,
        locationsDescription: null,
        locationsName: null,
        longitude: null,
        lprEnable: false,
        redSeconds: null,
        rejectAmberSecBelow: false,
        rejectYellowSec: null,
        speedLimit: 0,
        startTime: null,
        value: "WB",
        varEnforcementSpeed: null,
        varSpeedLimit: null,
        warningPeriodStart: null,
        weekDays: null,
        yellowSeconds: null
      };
      expect(component.laneList.length).toEqual(0)
      component.createLanesTable(data);
      expect(component.isDuplicateLane).toEqual(false);
    })
    it('createLanesTable',()=>{
      let data = {
        belowSecondsValue: null,
        cameraType: null,
        enable: false,
        endTime: null,
        enforcementPeriodStart: null,
        jurisdictionsID: null,
        laneMinSpeed: 7,
        laneNum: 3,
        latitude: null,
        locationsCode: null,
        locationsDescription: null,
        locationsName: null,
        longitude: null,
        lprEnable: false,
        redSeconds: null,
        rejectAmberSecBelow: false,
        rejectYellowSec: null,
        speedLimit: 0,
        startTime: null,
        value: 'WB',
        varEnforcementSpeed: null,
        varSpeedLimit: null,
        warningPeriodStart: null,
        weekDays: null,
        yellowSeconds: null,
      };
      component.laneList=
      [{
        active: true,
        contractID: 2,
        createDatetime: "2022-07-14T12:59:05.957",
        createUserID: 1,
        isDeleted: "N",
        lanesID: 168,
        lanesMinimumSpeed: 5,
        lanesNumber: 4,
        locationsID: 445,
        updateDatetime: "2022-07-14T12:59:05.957",
        updateUserID: 1
      }]
      expect(component.laneList.length).toBeGreaterThan(0)
      component.createLanesTable(data);
      expect(component.isDuplicateLane).toEqual(false);
    })
    it('validateLaneField(event: any)',()=>{
      let event={
        value: "17",
        id: "laneNum"
      }
      component.validateLaneField(event)
    })
    it('validateLaneField(event: any)',()=>{
      let event={
        value: "17",
        id: "laneMinSpeed"
      }
      component.validateLaneField(event)
    })
    it('validateLaneField(event: any)',()=>{
      let event={
        value: "17",
        id: "varSpeedLimit"
      }
      component.validateLaneField(event)
    })
    it('validateLaneField(event: any)',()=>{
      let event={
        value: "17",
        id: "startTime"
      }
      component.validateLaneField(event)
    })
    it('validateLaneField(event: any)',()=>{
      let event={
        value: "17",
        id: "endTime"
      }
      component.validateLaneField(event)
    })
    it('removeRecordByID',()=>{
      component.laneList=
      [{
        active: true,
        contractID: 2,
        createDatetime: "2022-07-14T12:59:05.957",
        createUserID: 1,
        isDeleted: "N",
        lanesID: 168,
        lanesMinimumSpeed: 5,
        lanesNumber: 4,
        locationsID: 445,
        updateDatetime: "2022-07-14T12:59:05.957",
        updateUserID: 1
      }]
      let arrName=component.laneList;
      let obj={
        arrName:arrName,
        attr:'lanesNumber',
        value:4
      }

      component.removeRecordByID(obj.arrName, obj.attr, obj.value)
    })
    it('errorHandling',()=>{
      let data={
       warningPeriodStart:""
      }
      component.errorHandling(data)
    })
    it('errorHandling',()=>{
      let data={
       warningPeriodStart:null
      }
      component.errorHandling(data)
    })
    it('errorHandling',()=>{
      let data={
        enforcementPeriodStart:""
      }
      component.errorHandling(data)
    })
    it('errorHandling',()=>{
      let data={
        enforcementPeriodStart:null
      }
      component.errorHandling(data)
    })
    it('applySpeedFilter',()=>{
      let input = fixture.debugElement.query(By.css('input'));
      let inputElement = input.nativeElement;
      let Id=439
      component.getSpeedList(Id);
      fixture.detectChanges();
      inputElement.value = 'abC';
      fixture.detectChanges();
      const event = new KeyboardEvent('keyup', { key: 'C' });
      inputElement.dispatchEvent(event);
      component.applySpeedFilter(event);
      let searchData= (event.target as HTMLInputElement).value;

      expect(searchData.trim().toLowerCase()).toBe('abc');

      expect(component.speedDataSource.filter).toEqual('abc');

      expect(inputElement.value).toBe('abC');

      component.speedfilterdata();

      expect(component.speedDataSource.filter).toBe('abc');
    })
    it('createSpeedList() ',()=>{
      component.createSpeedList();
      expect(component.speedDataSource.data).toEqual([]);;
      expect(component.speedList).toEqual([]);
    })
    it('validateField(event: any)',()=>{
      let event={
        value: "",
        id: "varSpeedLimit"
      }
      component.validateField(event)
    })
    it('validateField(event: any)',()=>{
      let event={
        value: "",
        id: "startTime"
      }
      component.validateField(event)
    })
    it('validateField(event: any)',()=>{
      let event={
        value: "",
        id: "endTime"
      }
      component.validateField(event)
    })
    it('validateField(event: any)',()=>{
      let event={
        value: "",
        id: "laneNum"
      }
      component.validateField(event)
    })
    it('validateField(event: any)',()=>{
      let event={
        value: "",
        id: "laneMinSpeed"
      }
      component.validateField(event)
    })
    it('validateField(event: any)',()=>{
      let event={
        value: "",
        id: "warningPeriodStart"
      }
      component.validateField(event)
    })
    it('validateField(event: any)',()=>{
      let event={
        value: "",
        id: "enforcementPeriodStart"
      }
      component.validateField(event)
    })
    it('validateField(event: any)',()=>{
      let event={
        value: "",
        id: "weekDays"
      }
      component.validateField(event)
    })
    it('validateField(event: any)',()=>{
      let event={
        value: "",
        id: "weekDays"
      }
      component.validateField(event)
    })
    xit('createSpeedTable',()=>{
      component.showAddSpeed=true;
      let data={
        cameraType: null,
        enable: false,
        endTime: "22:10",
        enforcementPeriodStart: null,
        enforcementSpeed: null,
        jurisdictionsID: null,
        laneMinSpeed: null,
        laneNum: null,
        latitude: null,
        locationsCode: null,
        locationsDescription: null,
        locationsName: null,
        longitude: null,
        lprEnable: false,
        speedLimit: 0,
        startTime: "19:16",
        value: "WB",
        varEnforcementSpeed: 3,
        varSpeedLimit: 2,
        warningPeriodStart: null,
        weekDays: "M"
}
component.createSpeedTable(data);
component.speedList=[{
  active: true,
contractId: 1,
createDatetime: "2022-07-01T09:41:00.46",
createUserID: 0,
daysOfTheWeek: "M",
endTime: "02:02:00",
enforcementSpeed: 123,
isDeleted: "N",
locationCode: null,
locationId: 440,
speedLimit: 99,
startTime: "14:02:00",
updateDatetime: "2022-07-01T09:41:00.46",
updateUserID: 0,
variableSpeedLimitsID: 86
},
{
  active: true,
contractId: 1,
createDatetime: "2022-07-16T13:04:14.783",
createUserID: 0,
daysOfTheWeek: "M",
endTime: "21:33:00",
enforcementSpeed: 4,
isDeleted: "N",
locationCode: null,
locationId: 440,
speedLimit: 3,
startTime: "07:33:00",
updateDatetime: "2022-07-16T13:04:14.783",
updateUserID: 0,
variableSpeedLimitsID: 89
},
{
  active: true,
contractId: 1,
daysOfTheWeek: "M",
endTime: "21:07",
enforcementSpeed: 5,
isDeleted: "N",
locationId: 0,
speedLimit: 4,
startTime: "07:07",
variableSpeedLimitsID: 0
}]
component.validateField1(data);
component.speedSort.sort(
  { id: '', start: 'asc', disableClear: false }
)
component.speedDataSource.sort = component.speedSort;
component.speedSort.disableClear = true;
expect(component.speedSort.disableClear).toEqual(true);
    })
    xit('createSpeedTable',()=>{
      component.showEditForm=true;
      let data={
        cameraType: null,
        enable: false,
        endTime: "22:10",
        enforcementPeriodStart: null,
        enforcementSpeed: null,
        jurisdictionsID: null,
        laneMinSpeed: null,
        laneNum: null,
        latitude: null,
        locationsCode: null,
        locationsDescription: null,
        locationsName: null,
        longitude: null,
        lprEnable: false,
        speedLimit: 0,
        startTime: "19:16",
        value: "WB",
        varEnforcementSpeed: 3,
        varSpeedLimit: 2,
        warningPeriodStart: null,
        weekDays: "M"
}
component.createSpeedTable(data);
component.speedList=[{
  active: true,
contractId: 1,
createDatetime: "2022-07-01T09:41:00.46",
createUserID: 0,
daysOfTheWeek: "M",
endTime: "02:02:00",
enforcementSpeed: 123,
isDeleted: "N",
locationCode: null,
locationId: 440,
speedLimit: 99,
startTime: "14:02:00",
updateDatetime: "2022-07-01T09:41:00.46",
updateUserID: 0,
variableSpeedLimitsID: 86
},
{
  active: true,
contractId: 1,
createDatetime: "2022-07-16T13:04:14.783",
createUserID: 0,
daysOfTheWeek: "M",
endTime: "21:33:00",
enforcementSpeed: 4,
isDeleted: "N",
locationCode: null,
locationId: 440,
speedLimit: 3,
startTime: "07:33:00",
updateDatetime: "2022-07-16T13:04:14.783",
updateUserID: 0,
variableSpeedLimitsID: 89
},
{
  active: true,
contractId: 1,
daysOfTheWeek: "M",
endTime: "21:07",
enforcementSpeed: 5,
isDeleted: "N",
locationId: 0,
speedLimit: 4,
startTime: "07:07",
variableSpeedLimitsID: 0
}]
component.validateField1(data);
expect(component.showAddSpeed).toEqual(false);
component.LocationForm.controls['varSpeedLimit'].reset();
component.LocationForm.controls['varEnforcementSpeed'].reset();
component.LocationForm.controls['startTime'].reset();
component.LocationForm.controls['endTime'].reset();
component.LocationForm.controls['weekDays'].reset();
component.speedSort.sort(
  { id: '', start: 'asc', disableClear: false }
)
component.speedDataSource.sort = component.speedSort;
component.speedSort.disableClear = true;
expect(component.speedSort.disableClear).toEqual(true);

    })
    xit('createSpeedTable',()=>{
      component.showEditForm=true;
      let data={
        cameraType: null,
        enable: false,
        endTime: "22:10",
        enforcementPeriodStart: null,
        enforcementSpeed: null,
        jurisdictionsID: null,
        laneMinSpeed: null,
        laneNum: null,
        latitude: null,
        locationsCode: null,
        locationsDescription: null,
        locationsName: null,
        longitude: null,
        lprEnable: false,
        speedLimit: 0,
        startTime: "19:16",
        value: "WB",
        varEnforcementSpeed: 3,
        varSpeedLimit: null,
        warningPeriodStart: null,
        weekDays: "M"
}
component.createSpeedTable(data);
component.validateField1(data);
expect(component.showAddSpeed).toEqual(false);
component.LocationForm.controls['varSpeedLimit'].reset();
component.LocationForm.controls['varEnforcementSpeed'].reset();
component.LocationForm.controls['startTime'].reset();
component.LocationForm.controls['endTime'].reset();
component.LocationForm.controls['weekDays'].reset();
component.speedSort.sort(
  { id: '', start: 'asc', disableClear: false }
)
component.speedDataSource.sort = component.speedSort;
component.speedSort.disableClear = true;
expect(component.speedSort.disableClear).toEqual(true);
    })
    xit('createSpeedTable',()=>{
      component.showEditForm=true;
      let data={
        cameraType: null,
        enable: false,
        endTime: "22:10",
        enforcementPeriodStart: null,
        enforcementSpeed: null,
        jurisdictionsID: null,
        laneMinSpeed: null,
        laneNum: null,
        latitude: null,
        locationsCode: null,
        locationsDescription: null,
        locationsName: null,
        longitude: null,
        lprEnable: false,
        speedLimit: 0,
        startTime: "",
        value: "WB",
        varEnforcementSpeed: 3,
        varSpeedLimit: 2,
        warningPeriodStart: null,
        weekDays: "M"
}
component.createSpeedTable(data);
component.validateField1(data);
expect(component.showAddSpeed).toEqual(false);
component.LocationForm.controls['varSpeedLimit'].reset();
component.LocationForm.controls['varEnforcementSpeed'].reset();
component.LocationForm.controls['startTime'].reset();
component.LocationForm.controls['endTime'].reset();
component.LocationForm.controls['weekDays'].reset();
component.speedSort.sort(
  { id: '', start: 'asc', disableClear: false }
)
component.speedDataSource.sort = component.speedSort;
component.speedSort.disableClear = true;
expect(component.speedSort.disableClear).toEqual(true);
    })
    xit('createSpeedTable',()=>{
      component.showEditForm=true;
      let data={
        cameraType: null,
        enable: false,
        endTime: "",
        enforcementPeriodStart: null,
        enforcementSpeed: null,
        jurisdictionsID: null,
        laneMinSpeed: null,
        laneNum: null,
        latitude: null,
        locationsCode: null,
        locationsDescription: null,
        locationsName: null,
        longitude: null,
        lprEnable: false,
        speedLimit: 0,
        startTime: "19:16",
        value: "WB",
        varEnforcementSpeed: 3,
        varSpeedLimit: 2,
        warningPeriodStart: null,
        weekDays: "M"
}
component.createSpeedTable(data);
component.validateField1(data);
expect(component.showAddSpeed).toEqual(false);
component.LocationForm.controls['varSpeedLimit'].reset();
component.LocationForm.controls['varEnforcementSpeed'].reset();
component.LocationForm.controls['startTime'].reset();
component.LocationForm.controls['endTime'].reset();
component.LocationForm.controls['weekDays'].reset();
component.speedSort.sort(
  { id: '', start: 'asc', disableClear: false }
)
component.speedDataSource.sort = component.speedSort;
component.speedSort.disableClear = true;
expect(component.speedSort.disableClear).toEqual(true);
    })
    it(' validateField1(data: any)',()=>{
      component.showAddSpeed=true;
      let data={
        varSpeedLimit: ""
      }
      component.validateField1(data)
    })
    it(' validateField1(data: any)',()=>{
      component.showAddSpeed=true;
      let data={
        startTime: ""
      }
      component.validateField1(data)
    })
    it(' validateField1(data: any)',()=>{
      component.showAddSpeed=true;
      let data={
        endTime : ""
      }
      component.validateField1(data)
    })
    it(' validateField1(data: any)',()=>{
      component.showAddSpeed=true;
      let data={
        weekDays : ""
      }
      component.validateField1(data)
    })
    it('validateDate(data: any, date1?: any, date2?: any)',()=>{
      let locationsModel:any = {
        active: true,
        cameraTypesID: 1,
        contractID: 1,
        direction: 'EB',
        enforcementPeriodStart:  "2022-07-31T18:28",
        isDeleted: 'N',
        jurisdictionsID: 156,
        latitude: 89.999999,
        locationsCode: "40000008",
        locationsDescription: "Max length added violattion long description fieldMax length added violattion long description fieldMax length added violattion long description field",
        locationsEnabled: true,
        locationsID: 440,
        locationsName:  "Che8 Tonkin- 86 Baker St.North- Sydney NSW 2156- Australia- Landmark- Opposite St. Marys High School",
        longitude:  179.999999,
        lprEnable: true,
        speedLocations: {
          active: true,
          contractId: 1,
          enable: true,
          enforcementSpeed: 123,
          isDeleted: "N",
          locationCode: "40000008",
          locationsId: 0,
          speedLocationsId: 0
        },
        warningPeriodStart: "2022-07-19T18:28"
      };
      component.showAddSpeed=true;
      component.validateDate(locationsModel,locationsModel.warningDate,locationsModel.enfDate)
    })
    xit('validateDate(data: any, date1?: any, date2?: any)',()=>{
      let locationsModel:any = {
        active: true,
        cameraTypesID: 1,
        contractID: 1,
        direction: 'EB',
        enforcementPeriodStart:  "3000-07-31T18:28",
        isDeleted: 'N',
        jurisdictionsID: 156,
        latitude: 89.999999,
        locationsCode: "40000008",
        locationsDescription: "Max length added violattion long description fieldMax length added violattion long description fieldMax length added violattion long description field",
        locationsEnabled: true,
        locationsID: 440,
        locationsName:  "Che8 Tonkin- 86 Baker St.North- Sydney NSW 2156- Australia- Landmark- Opposite St. Marys High School",
        longitude:  179.999999,
        lprEnable: true,
        speedLocations: {
          active: true,
          contractId: 1,
          enable: true,
          enforcementSpeed: 123,
          isDeleted: "N",
          locationCode: "40000008",
          locationsId: 0,
          speedLocationsId: 0
        },
        warningPeriodStart: "3000-07-19T18:28"
      };
      component.showAddSpeed=true;
      component.validateDate(locationsModel,locationsModel.warningDate,locationsModel.enfDate);
      component.LocationForm.controls['warningPeriodStart']?.setErrors({ invalid: "Warning Period Start Year should be between 1753 and 2099" });
     expect(component.valWarningPeriodStart).toEqual(false);
     component.LocationForm.controls['enforcementPeriodStart']?.setErrors({ invalid: "Enforcement Period Start Year should be between 1753 and 2099" });
     expect(component.valEnforcementPeriodStart).toEqual(false);
    })
    xit('addSpeedData',()=>{ 
      let locationsModel:any = {
        active: true,
        cameraTypesID: 1,
        contractID: 2,
        direction: 'EB',
        enforcementPeriodStart: '2022-07-31T18:28',
        isDeleted: 'N',
        jurisdictionsID: 133,
        latitude: '85',
        locationsCode: '506',
        locationsDescription: 'Work',
        locationsEnabled: true,
        locationsID: 0,
        locationsName: 'Kolkata',
        longitude: '167.9999',
        lprEnable: true,
        redLightLocations: {
          active: true,
          contractId: 2,
          isDeleted: 'N',
          locationCode: '506',
          locationsID: 0,
          redLightLocationsID: 0,
          redSeconds: 6,
          rejectYellowSecondsBelow: true,
          rejectYellowSecondsBelowCategoryId: 1,
          rejectYellowSecondsBelowValue: 3,
          yellowSeconds: 6,
        },
        speedLimit: 3,
        speedLocations: null,
        warningPeriodStart: '2022-07-17T18:28',
      };
      component.addData(locationsModel);
      let speedLocID=412;
      var obj = {
        laneModel:[{
          active: true,
          contractID: 1,
          createDatetime: "2022-05-19T06:58:26.374Z",
          createUserID: 1,
          isDeleted: "N",
          lanesID: 0,
          lanesMinimumSpeed: 2,
          lanesNumber: 1,
          locationsID: 412,
          updateDatetime: "2022-05-19T06:58:26.374Z",
          updateUserID: 1,
        }]
        }
  component.addSpeedData(speedLocID);
  component.speedList={
    active: true,
    contractId: 1,
    daysOfTheWeek: "M",
    endTime: "17:01",
    enforcementSpeed: 3,
    isDeleted: "N",
    locationId: 446,
    speedLimit: 1,
    startTime: "02:57",
    variableSpeedLimitsID: 0
  }
  component.speedList.forEach((item: any) => {
    item.locationId = speedLocID;
  });
    })
    xit('updateSpeedData(speedLocID);',()=>{
      component.speedSort.sort(
        { id: '', start: 'asc', disableClear: false }
      )
      let speedLocID=412;
      component.updateSpeedData(speedLocID);
      component.updatedSpeedList=[{
        active: true,
        contractId: 1,
        daysOfTheWeek: "M",
        endTime: "21:07",
        enforcementSpeed: 5,
        isDeleted: "N",
        locationId: 0,
        speedLimit: 4,
        startTime: "07:07",
        variableSpeedLimitsID: 0
      }]
      component.updatedSpeedList.forEach((item: any) => {
        item.locationId = speedLocID;
      });
    })
    xit('editLocationData',()=>{
      let locationsCode=component.LocationForm.controls["locationsCode"];
      locationsCode.setValue("40000008");
  
      let locationsName = component.LocationForm.controls['locationsName'];
      locationsName.setValue("Che8 Tonkin- 86 Baker St.North- Sydney NSW 2156- Australia- Landmark- Opposite St. Marys High School");
  
      let cameraType= component.LocationForm.controls["cameraType"];
      cameraType.setValue("Gatso");
  
      let latitude=component.LocationForm.controls["latitude"];
      latitude.setValue(89.9);
  
      let longitude=component.LocationForm.controls["longitude"];
      longitude.setValue(179.9999);
  
      let locationsDescription=component.LocationForm.controls["locationsDescription"];
      locationsDescription.setValue("Max length added violattion long description fieldMax length added violattion long description fieldMax length added violattion long description field");
  
      let enable=component.LocationForm.controls["enable"];
      enable.setValue(true);
  
      let lprEnable=component.LocationForm.controls["lprEnable"];
      lprEnable.setValue(true);
  
      let speedLimit=component.LocationForm.controls["speedLimit"];
      speedLimit.setValue(123);
  
      let warningPeriodStart=component.LocationForm.controls["warningPeriodStart"];
       warningPeriodStart.setValue("2022-07-17T18:28");
  
       let enforcementPeriodStart=component.LocationForm.controls["enforcementPeriodStart"];
      enforcementPeriodStart.setValue("2022-07-31T18:28");
  
      let redSeconds=component.LocationForm.controls["redSeconds"];
       redSeconds.setValue(6);
  
       let yellowSeconds=component.LocationForm.controls["yellowSeconds"];
      yellowSeconds.setValue(6);
  
      let value=component.LocationForm.controls["value"];
      value.setValue("EB");
  
      let jurisdictionsID=component.LocationForm.controls["jurisdictionsID"];
      jurisdictionsID.setValue(156);
  
      let rejectAmberSecBelow=component.LocationForm.controls["rejectAmberSecBelow"];
      rejectAmberSecBelow.setValue(false);
  
      let belowSecondsValue=component.LocationForm.controls["belowSecondsValue"];
      belowSecondsValue.setValue("Noarway");
  
      let rejectYellowSec=component.LocationForm.controls["rejectYellowSec"];
      rejectYellowSec.setValue(false);
  
      let laneNum=component.LocationForm.controls["laneNum"];
      laneNum.setValue(5);
  
      let laneMinSpeed=component.LocationForm.controls["laneMinSpeed"];
      laneMinSpeed.setValue(17);
  
      let varSpeedLimit=component.LocationForm.controls["varSpeedLimit"];
      varSpeedLimit.setValue(99);
  
      let varEnforcementSpeed=component.LocationForm.controls["varEnforcementSpeed"];
      varEnforcementSpeed.setValue(123);
  
      let startTime=component.LocationForm.controls["startTime"];
      startTime.setValue("14:02:00");
  
      let endTime=component.LocationForm.controls["endTime"];
      endTime.setValue("02:02:00");
  
      let weekDays=component.LocationForm.controls["weekDays"];
      weekDays.setValue("M");
      expect(component.LocationForm.valid).toBeTruthy();
      
      // let warningDate ="Sun Jul 17 2022 18:28:00 GMT+0530" ;
      // let enfDate ="Sun Jul 31 2022 18:28:00 GMT+0530";
      let locationsModel:any = {
        active: true,
        cameraTypesID: 1,
        contractID: 1,
        direction: 'EB',
        enforcementPeriodStart:  "2022-07-31T18:28",
        isDeleted: 'N',
        jurisdictionsID: 156,
        latitude: 89.999999,
        locationsCode: "40000008",
        locationsDescription: "Max length added violattion long description fieldMax length added violattion long description fieldMax length added violattion long description field",
        locationsEnabled: true,
        locationsID: 440,
        locationsName:  "Che8 Tonkin- 86 Baker St.North- Sydney NSW 2156- Australia- Landmark- Opposite St. Marys High School",
        longitude:  179.999999,
        lprEnable: true,
        speedLocations: {
          active: true,
          contractId: 1,
          enable: true,
          enforcementSpeed: 123,
          isDeleted: "N",
          locationCode: "40000008",
          locationsId: 0,
          speedLocationsId: 0
        },
        warningPeriodStart: "2022-07-19T18:28"
      };
      let warningDate = (typeof locationsModel.warningPeriodStart !== 'string') ? component.createDate(new Date(locationsModel.warningPeriodStart)) : new Date(locationsModel.warningPeriodStart);
      let enfDate = (typeof locationsModel.enforcementPeriodStart !== 'string') ? component.createDate(new Date(locationsModel.enforcementPeriodStart)) : new Date(locationsModel.enforcementPeriodStart);
      component.deletedLaneData=true;
      component.editLocationData(locationsModel);
      fixture.detectChanges();
      component.validateDate(locationsModel, warningDate, enfDate);
      // component.valWarningPeriodStart=true;
      // component.valEnforcementPeriodStart=true;
      fixture.detectChanges();
      expect(component.valWarningPeriodStart).toBeTruthy();
      expect(component.valEnforcementPeriodStart).toBeTruthy();
      fixture.detectChanges();
    
      let speedLocID=412;
      component.updateSpeedData(speedLocID);
      fixture.detectChanges();
    })
    xit('editLocationData',()=>{
      let locationsCode=component.LocationForm.controls["locationsCode"];
      locationsCode.setValue("40000008");
  
      let locationsName = component.LocationForm.controls['locationsName'];
      locationsName.setValue("Che8 Tonkin- 86 Baker St.North- Sydney NSW 2156- Australia- Landmark- Opposite St. Marys High School");
  
      let cameraType= component.LocationForm.controls["cameraType"];
      cameraType.setValue("Gatso");
  
      let latitude=component.LocationForm.controls["latitude"];
      latitude.setValue(89.9);
  
      let longitude=component.LocationForm.controls["longitude"];
      longitude.setValue(179.9999);
  
      let locationsDescription=component.LocationForm.controls["locationsDescription"];
      locationsDescription.setValue("Max length added violattion long description fieldMax length added violattion long description fieldMax length added violattion long description field");
  
      let enable=component.LocationForm.controls["enable"];
      enable.setValue(true);
  
      let lprEnable=component.LocationForm.controls["lprEnable"];
      lprEnable.setValue(true);
  
      let speedLimit=component.LocationForm.controls["speedLimit"];
      speedLimit.setValue(123);
  
      let warningPeriodStart=component.LocationForm.controls["warningPeriodStart"];
       warningPeriodStart.setValue("3000-07-17T18:28");
  
       let enforcementPeriodStart=component.LocationForm.controls["enforcementPeriodStart"];
      enforcementPeriodStart.setValue("3000-07-31T18:28");
  
      let redSeconds=component.LocationForm.controls["redSeconds"];
       redSeconds.setValue(6);
  
       let yellowSeconds=component.LocationForm.controls["yellowSeconds"];
      yellowSeconds.setValue(6);
  
      let value=component.LocationForm.controls["value"];
      value.setValue("EB");
  
      let jurisdictionsID=component.LocationForm.controls["jurisdictionsID"];
      jurisdictionsID.setValue(156);
  
      let rejectAmberSecBelow=component.LocationForm.controls["rejectAmberSecBelow"];
      rejectAmberSecBelow.setValue(false);
  
      let belowSecondsValue=component.LocationForm.controls["belowSecondsValue"];
      belowSecondsValue.setValue("Noarway");
  
      let rejectYellowSec=component.LocationForm.controls["rejectYellowSec"];
      rejectYellowSec.setValue(false);
  
      let laneNum=component.LocationForm.controls["laneNum"];
      laneNum.setValue(5);
  
      let laneMinSpeed=component.LocationForm.controls["laneMinSpeed"];
      laneMinSpeed.setValue(17);
  
      let varSpeedLimit=component.LocationForm.controls["varSpeedLimit"];
      varSpeedLimit.setValue(99);
  
      let varEnforcementSpeed=component.LocationForm.controls["varEnforcementSpeed"];
      varEnforcementSpeed.setValue(123);
  
      let startTime=component.LocationForm.controls["startTime"];
      startTime.setValue("14:02:00");
  
      let endTime=component.LocationForm.controls["endTime"];
      endTime.setValue("02:02:00");
  
      let weekDays=component.LocationForm.controls["weekDays"];
      weekDays.setValue("M");
      expect(component.LocationForm.valid).toBeTruthy();
      // let warningDate ="Sun Jul 17 2022 18:28:00 GMT+0530" ;
      // let enfDate ="Sun Jul 31 2022 18:28:00 GMT+0530";
      component.locationsData={
        active: true,
        cameraTypesID: 2,
        contractID: 1,
        createDatetime: "2022-07-18T12:23:23.88",
        createUserID: 0,
        direction: "EB",
        enforcementPeriodStart: "2022-07-30T19:28:00",
        isDeleted: "N",
        jurisdictionsID: 156,
        latitude: 89.999999,
        locationsCode: "40000008",
        locationsDescription: "Max length added violattion long description fieldMax length added violattion long description fieldMax length added violattion long description field",
        locationsEnabled: true,
        locationsID: 440,
        locationsName: "Che8 Tonkin- 86 Baker St.North- Sydney NSW 2156- Australia- Landmark- Opposite St. Marys High School",
        longitude: 179.999999,
        lprEnable: true,
        redLightLocations: null,
        speedLimit: 123,
        speedLocations:
        {
          active: true,
          contractId: 1,
          createDatetime: "2022-07-18T12:23:23.897",
          createUserID: 0,
          enable: true,
          enforcementSpeed: 123,
          isDeleted: "N",
          locationCode: "40000008",
          locationsId: 440,
          speedLocationsId: 102,
          updateDatetime: "2022-07-18T12:23:23.897",
          updateUserID: 0
        },
        updateDatetime: "2022-07-18T12:23:23.88",
        updateUserID: 0,
        warningPeriodStart: "2022-07-19T18:28:00"
      }
   
      let locationsModel:any = {
        active: true,
        cameraTypesID: 1,
        contractID: 1,
        direction: 'EB',
        enforcementPeriodStart:  "3000-07-31T18:28",
        isDeleted: 'N',
        jurisdictionsID: 156,
        latitude: 89.999999,
        locationsCode: "40000008",
        locationsDescription: "Max length added violattion long description fieldMax length added violattion long description fieldMax length added violattion long description field",
        locationsEnabled: true,
        locationsID: 440,
        locationsName:  "Che8 Tonkin- 86 Baker St.North- Sydney NSW 2156- Australia- Landmark- Opposite St. Marys High School",
        longitude:  179.999999,
        lprEnable: true,
        speedLocations: {
          active: true,
          contractId: 1,
          enable: true,
          enforcementSpeed: 123,
          isDeleted: "N",
          locationCode: "40000008",
          locationsId: 0,
          speedLocationsId: 0
        },
        warningPeriodStart: "3000-07-19T18:28"
      };
      let warningDate = (typeof locationsModel.warningPeriodStart !== 'string') ? component.createDate(new Date(locationsModel.warningPeriodStart)) : new Date(locationsModel.warningPeriodStart);
      let enfDate = (typeof locationsModel.enforcementPeriodStart !== 'string') ? component.createDate(new Date(locationsModel.enforcementPeriodStart)) : new Date(locationsModel.enforcementPeriodStart);
      component.editLocationData(locationsModel);
      fixture.detectChanges();
      component.validateDate(locationsModel, warningDate, enfDate);
      fixture.detectChanges();
      expect(component.valWarningPeriodStart).toBeFalsy();
      expect(component.valEnforcementPeriodStart).toBeFalsy();
      fixture.detectChanges();
    
      let speedLocID=412;
      component.updateSpeedData(speedLocID);
      fixture.detectChanges();
    })
    xit('updateSpeedData',()=>{
      let speedLocID=412;
      component.updateSpeedData(speedLocID)
      fixture.detectChanges();
    })
    it('cancel()',()=>{
      component.cancel();
    })
    xit('deleteSpeedRow(data: any)',()=>{
    let data=
    {
      active: true,
      contractId: 1,
      createDatetime: "2022-07-01T09:35:29.123",
      createUserID: 0,
      daysOfTheWeek: "M",
      endTime: "02:02:00",
      enforcementSpeed: 123,
      isDeleted: "Y",
      locationCode: null,
      locationId: 437,
      speedLimit: 99,
      startTime: "14:02:00",
      updateDatetime: "2022-07-01T09:35:29.123",
      updateUserID: 0,
      variableSpeedLimitsID: 82
}
component.deleteSpeedRow(data);
let delOBJ=[{
  "variableSpeedLimitsID": data.variableSpeedLimitsID,
  "daysOfTheWeek": data.daysOfTheWeek,
  "enforcementSpeed": data.enforcementSpeed,
  "startTime": data.startTime,
  "endTime": data.endTime,
  "speedLimit": data.speedLimit
}]
component.deletedSpeedData.push({delOBJ});
fixture.detectChanges();
expect(component.isSpeedDeleted ).toEqual(true);
component.speedList = component.removeRecordByID(component.speedList, 'variableSpeedLimitsID', data.variableSpeedLimitsID);
expect(component.showEditForm).toEqual(true);
component.updatedSpeedList = component.removeRecordByID(component.updatedSpeedList, 'variableSpeedLimitsID', data.variableSpeedLimitsID);

fixture.detectChanges();
component.speedSort.sort(
  { id: '', start: 'asc', disableClear: false }
)
    })
    it('deleteSpeedData',()=>{
      let VariableSpeedLimitsID=82;
      component.deleteSpeedData(VariableSpeedLimitsID)
      fixture.detectChanges();
    })
});
