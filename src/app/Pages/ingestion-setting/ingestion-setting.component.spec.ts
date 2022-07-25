import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IngestionSettingComponent } from './ingestion-setting.component';
import { ingestionSettingServiceStub } from 'src/app/shared/testCasesHelperClasses/ingestionSettingServiceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('IngestionSettingComponent', () => {
  let component: IngestionSettingComponent;
  let translate: TranslateService;
  let fixture: ComponentFixture<IngestionSettingComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let apiService=ApiService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngestionSettingComponent ],
      imports:[
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserDynamicTestingModule,
        HttpClientTestingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AngularmaterialModule,
        TranslateStubsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule
      ],
      providers:[
        { provide: TranslateService, useClass:TranslateServiceStub},
        { provide: LanguageService, useClass:languageServiceStub},
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ToastrService, useClass: ToasterServiceStub},
        { provide: ApiService, useClass:ingestionSettingServiceStub},
        { provide: ChangeDetectorRef, useValue:{}}
      ]
    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    translate = TestBed.inject(TranslateService);
  });
  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(IngestionSettingComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('INGESTION_SETTING');
  });
  it('should create', () => {
    expect(component).toBeTruthy();
    component.contractID = 1;
    component.getData();

    component.displaySpinner=true;
    expect(component.displaySpinner).toBe(true)
  });
  it('should create', () => {
    expect(component).toBeTruthy();
    component.contractID = 2;
    component.getData();

    component.displaySpinner=false;
    expect(component.displaySpinner).toBe(false)
  });
 it('check the form validation when empty',()=>{
  expect(component.ingestionForm.valid).toBeTruthy();
 })

it('form invalid when empty', () => {
  expect(component.ingestionForm.valid).toBeTrue();
});
it('eventsExceedingSpeed field validity', () => {
  let errors:any={};
  let eventsExceedingSpeed = component.ingestionForm.controls['eventsExceedingSpeed'];
  errors = eventsExceedingSpeed.errors || {};
  expect(eventsExceedingSpeed.errors).toBeNull();
});
it('exceedingSpeed field validity', () => {
  let errors:any={};
  let exceedingSpeed = component.ingestionForm.controls['exceedingSpeed'];
  errors = exceedingSpeed.errors || {};
  expect(exceedingSpeed.errors).toBeNull();
});
it('exceedingSpeedCategory field validity', () => {
  let errors:any={};
  let exceedingSpeedCategory = component.ingestionForm.controls['exceedingSpeedCategory'];
  errors = exceedingSpeedCategory.errors || {};
  expect(exceedingSpeedCategory.errors).toBeNull();
});
it('exceedingSpeedQueue field validity', () => {
  let errors:any={};
  let exceedingSpeedQueue = component.ingestionForm.controls['exceedingSpeedQueue'];
  errors = exceedingSpeedQueue.errors || {};
  expect(exceedingSpeedQueue.errors).toBeNull();
});
it('eventsBelowSpeed field validity', () => {
  let errors:any={};
  let eventsBelowSpeed = component.ingestionForm.controls['eventsBelowSpeed'];
  errors = eventsBelowSpeed.errors || {};
  expect(eventsBelowSpeed.errors).toBeNull();
});
it('belowSpeed field validity', () => {
  let errors:any={};
  let belowSpeed = component.ingestionForm.controls['belowSpeed'];
  errors = belowSpeed.errors || {};
  expect(belowSpeed.errors).toBeNull();
});
it('belowSpeedCategory field validity', () => {
  let errors:any={};
  let belowSpeedCategory = component.ingestionForm.controls['belowSpeedCategory'];
  errors = belowSpeedCategory.errors || {};
  expect(belowSpeedCategory.errors).toBeNull();
});
it('belowSpeedQueue field validity', () => {
  let errors:any={};
  let belowSpeedQueue = component.ingestionForm.controls['belowSpeedQueue'];
  errors = belowSpeedQueue.errors || {};
  expect(belowSpeedQueue.errors).toBeNull();
});
it('eventsRedSecondsBelow field validity', () => {
  let errors:any={};
  let eventsRedSecondsBelow = component.ingestionForm.controls['eventsRedSecondsBelow'];
  errors = eventsRedSecondsBelow.errors || {};
  expect(eventsRedSecondsBelow.errors).toBeNull();
});
it('redSecondsBelow field validity', () => {
  let errors:any={};
  let redSecondsBelow = component.ingestionForm.controls['redSecondsBelow'];
  errors = redSecondsBelow.errors || {};
  expect(redSecondsBelow.errors).toBeNull();
});
it('redSecondsBelowCategory field validity', () => {
  let errors:any={};
  let redSecondsBelowCategory = component.ingestionForm.controls['redSecondsBelowCategory'];
  errors = redSecondsBelowCategory.errors || {};
  expect(redSecondsBelowCategory.errors).toBeNull();
});
it('redSecondsBelowQueue field validity', () => {
  let errors:any={};
  let redSecondsBelowQueue = component.ingestionForm.controls['redSecondsBelowQueue'];
  errors = redSecondsBelowQueue.errors || {};
  expect(redSecondsBelowQueue.errors).toBeNull();
});
it('eventsGreenSecondsBelow field validity', () => {
  let errors:any={};
  let eventsGreenSecondsBelow = component.ingestionForm.controls['eventsGreenSecondsBelow'];
  errors = eventsGreenSecondsBelow.errors || {};
  expect(eventsGreenSecondsBelow.errors).toBeNull();
});
it('greenSecondsBelow field validity', () => {
  let errors:any={};
  let greenSecondsBelow = component.ingestionForm.controls['greenSecondsBelow'];
  errors = greenSecondsBelow.errors || {};
  expect(greenSecondsBelow.errors).toBeNull();
});
it('greenSecondsBelowCategory field validity', () => {
  let errors:any={};
  let greenSecondsBelowCategory = component.ingestionForm.controls['greenSecondsBelowCategory'];
  errors = greenSecondsBelowCategory.errors || {};
  expect(greenSecondsBelowCategory.errors).toBeNull();
});
it('greenSecondsBelowQueue field validity', () => {
  let errors:any={};
  let greenSecondsBelowQueue = component.ingestionForm.controls['greenSecondsBelowQueue'];
  errors = greenSecondsBelowQueue.errors || {};
  expect(greenSecondsBelowQueue.errors).toBeNull();
});
it('eventsTestShots field validity', () => {
  let errors:any={};
  let eventsTestShots = component.ingestionForm.controls['eventsTestShots'];
  errors = eventsTestShots.errors || {};
  expect(eventsTestShots.errors).toBeNull();
});
it('testShotsCategory field validity', () => {
  let errors:any={};
  let testShotsCategory = component.ingestionForm.controls['testShotsCategory'];
  errors = testShotsCategory.errors || {};
  expect(testShotsCategory.errors).toBeNull();
});
it('testShotsQueue field validity', () => {
  let errors:any={};
  let testShotsQueue = component.ingestionForm.controls['testShotsQueue'];
  errors = testShotsQueue.errors || {};
  expect(testShotsQueue.errors).toBeNull();
});
it('eventsZeroVelocity field validity', () => {
  let errors:any={};
  let eventsZeroVelocity = component.ingestionForm.controls['eventsZeroVelocity'];
  errors = eventsZeroVelocity.errors || {};
  expect(eventsZeroVelocity.errors).toBeNull();
});
it('zeroVelocityCategory field validity', () => {
  let errors:any={};
  let zeroVelocityCategory = component.ingestionForm.controls['zeroVelocityCategory'];
  errors = zeroVelocityCategory.errors || {};
  expect(zeroVelocityCategory.errors).toBeNull();
});
it('zeroVelocityQueue field validity', () => {
  let errors:any={};
  let zeroVelocityQueue = component.ingestionForm.controls['zeroVelocityQueue'];
  errors = zeroVelocityQueue.errors || {};
  expect(zeroVelocityQueue.errors).toBeNull();
});
it('snapshotTimeMilli field validity', () => {
  let errors:any={};
  let snapshotTimeMilli = component.ingestionForm.controls['snapshotTimeMilli'];
  errors = snapshotTimeMilli.errors || {};
  expect(snapshotTimeMilli.errors).toBeNull();
});
it('snapshotTime field validity', () => {
  let errors:any={};
  let snapshotTime = component.ingestionForm.controls['snapshotTime'];
  errors = snapshotTime.errors || {};
  expect(snapshotTime.errors).toBeNull();
});
it('form invalid when filled', () => {
  let eventsExceedingSpeed = component.ingestionForm.controls['eventsExceedingSpeed'];
  let exceedingSpeed = component.ingestionForm.controls['exceedingSpeed'];
  let exceedingSpeedCategory = component.ingestionForm.controls['exceedingSpeedCategory'];
  let exceedingSpeedQueue=component.ingestionForm.controls['exceedingSpeedCategory'];
  let eventsBelowSpeed=component.ingestionForm.controls['eventsBelowSpeed'];
  let belowSpeed = component.ingestionForm.controls['belowSpeed'];
  let belowSpeedCategory = component.ingestionForm.controls['belowSpeedCategory'];
  let eventsRedSecondsBelow = component.ingestionForm.controls['eventsRedSecondsBelow'];
  let redSecondsBelow = component.ingestionForm.controls['redSecondsBelow'];
  let redSecondsBelowCategory = component.ingestionForm.controls['redSecondsBelowCategory'];
  let redSecondsBelowQueue = component.ingestionForm.controls['redSecondsBelowQueue'];
  let eventsGreenSecondsBelow = component.ingestionForm.controls['eventsGreenSecondsBelow'];
  let greenSecondsBelow = component.ingestionForm.controls['greenSecondsBelow'];
  let greenSecondsBelowCategory = component.ingestionForm.controls['greenSecondsBelowCategory'];
  let greenSecondsBelowQueue = component.ingestionForm.controls['greenSecondsBelowQueue'];
  let eventsTestShots = component.ingestionForm.controls['eventsTestShots'];
  let testShotsCategory = component.ingestionForm.controls['testShotsCategory'];
  let testShotsQueue = component.ingestionForm.controls['testShotsQueue'];
  let eventsZeroVelocity = component.ingestionForm.controls['eventsZeroVelocity'];
  let zeroVelocityCategory = component.ingestionForm.controls['zeroVelocityCategory'];
  let zeroVelocityQueue = component.ingestionForm.controls['zeroVelocityQueue'];
  let snapshotTimeMilli = component.ingestionForm.controls['snapshotTimeMilli'];
  let snapshotTime = component.ingestionForm.controls['snapshotTime'];

  eventsExceedingSpeed.setValue("");
  exceedingSpeed.setValue("");
  exceedingSpeedCategory.setValue("");
  exceedingSpeedQueue.setValue("");
  exceedingSpeed.setValue("");
  eventsBelowSpeed.setValue("");
  belowSpeed.setValue("");
  belowSpeedCategory.setValue("");
  eventsRedSecondsBelow.setValue("");
  redSecondsBelow.setValue("");
  redSecondsBelowCategory.setValue("");
  redSecondsBelowQueue.setValue("");
  eventsGreenSecondsBelow.setValue("");
  greenSecondsBelow.setValue("");
  greenSecondsBelowCategory.setValue("");
  greenSecondsBelowQueue.setValue("");
  eventsTestShots.setValue("");
  testShotsCategory.setValue("");
  testShotsQueue.setValue("");
  eventsZeroVelocity.setValue("");
  zeroVelocityCategory.setValue("");
  zeroVelocityQueue.setValue("");
  snapshotTimeMilli.setValue("");
  snapshotTime.setValue("");

  expect(component.ingestionForm.valid).toBeTruthy();
});
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
it('clearForm()',()=>{
  component.clearForm();
})
it('resetData()',()=>{
  expect(component.ingestionSettings).toBeDefined();
  component.resetData();
  let res={
    active: true,
    autoSnapMilliSeconds: 0,
    contractID: 2,
    createDatetime: '2022-05-27T08:18:05.743',
    createUserID: 2,
    enableVideoAutoSnap: false,
    ingestionSettingsID: 8,
    isDeleted: 'N',
    rejectBelowSpeed: false,
    rejectBelowSpeedCategoryId: 0,
    rejectBelowSpeedValue: 0,
    rejectBelowSpeedWorkflowId: 0,
    rejectExceedingSpeed: false,
    rejectExceedingSpeedCategoryId: 0,
    rejectExceedingSpeedValue: 0,
    rejectExceedingSpeedWorkflowId: 0,
    rejectGreenMinimumSpeed: false,
    rejectGreenMinimumSpeedCategoryId: 0,
    rejectGreenMinimumSpeedValue: 0,
    rejectGreenMinimumSpeedWorkflowId: 0,
    rejectRedSecondsBelow: false,
    rejectRedSecondsBelowCategoryId: 0,
    rejectRedSecondsBelowValue: 0,
    rejectRedSecondsBelowWorkflowId: 0,
    rejectTestShots: false,
    rejectTestShotsCategoryId: 0,
    rejectTestShotsWorkflowId: 0,
    rejectZeroVelocity: false,
    rejectZeroVelocityCategoryId: 0,
    rejectZeroVelocityCategoryWorkflowId: 0,
    updateDatetime: '2022-05-27T08:18:05.743',
    updateUserID: 0,
  }
  component.setFormsValue(component.ingestionSettings);
})
it('setFormsValue',()=>{
  let data=component.ingestionSettings;
  component.setFormsValue(data);
  expect(component.displaySpinner).toEqual(false);
  component.ingestionForm.disable();
  component.enableForm(data);
})
it('appendLang(lang: string) ',()=>{
  let lang='en';
  component.appendLang(lang);
  component.translate.use(lang);
})
it('enableForm',()=>{
  let data = {
    active: true,
    autoSnapMilliSeconds: 0,
    contractID: 2,
    createDatetime: '2022-05-27T08:18:05.743',
    createUserID: 2,
    enableVideoAutoSnap: false,
    ingestionSettingsID: 8,
    isDeleted: 'N',
    rejectBelowSpeed: false,
    rejectBelowSpeedCategoryId: 0,
    rejectBelowSpeedValue: 0,
    rejectBelowSpeedWorkflowId: 0,
    rejectExceedingSpeed: false,
    rejectExceedingSpeedCategoryId: 0,
    rejectExceedingSpeedValue: 0,
    rejectExceedingSpeedWorkflowId: 0,
    rejectGreenMinimumSpeed: false,
    rejectGreenMinimumSpeedCategoryId: 0,
    rejectGreenMinimumSpeedValue: 0,
    rejectGreenMinimumSpeedWorkflowId: 0,
    rejectRedSecondsBelow: false,
    rejectRedSecondsBelowCategoryId: 0,
    rejectRedSecondsBelowValue: 0,
    rejectRedSecondsBelowWorkflowId: 0,
    rejectTestShots: false,
    rejectTestShotsCategoryId: 0,
    rejectTestShotsWorkflowId: 0,
    rejectZeroVelocity: false,
    rejectZeroVelocityCategoryId: 0,
    rejectZeroVelocityCategoryWorkflowId: 0,
    updateDatetime: '2022-05-27T08:18:05.743',
    updateUserID: 0,
  };
  component.enableForm(data);
  expect(data.rejectExceedingSpeed).toEqual(false);
  component.ingestionForm.controls['eventsExceedingSpeed'].enable();
  component.ingestionForm.controls['eventsBelowSpeed'].enable();
  component.ingestionForm.controls['eventsRedSecondsBelow'].enable();
  component.ingestionForm.controls['eventsTestShots'].enable();
  component.ingestionForm.controls['eventsGreenSecondsBelow'].enable();
  component.ingestionForm.controls['eventsZeroVelocity'].enable();
  component.ingestionForm.controls['snapshotTime'].enable();
  component.updateValidation({ checked: true }, 'exceedingSpeedCategory',
        'exceedingSpeedQueue', 'exceedingSpeed');
})
it('saveData(ingestionForm.value)',()=>{
  let eventsExceedingSpeed =
    component.ingestionForm.controls['eventsExceedingSpeed'];
  let exceedingSpeed = component.ingestionForm.controls['exceedingSpeed'];
  let exceedingSpeedCategory =
    component.ingestionForm.controls['exceedingSpeedCategory'];
  let exceedingSpeedQueue =
    component.ingestionForm.controls['exceedingSpeedQueue'];
  let eventsBelowSpeed = component.ingestionForm.controls['eventsBelowSpeed'];
  let belowSpeed = component.ingestionForm.controls['belowSpeed'];
  let belowSpeedCategory =
    component.ingestionForm.controls['belowSpeedCategory'];
  let belowSpeedQueue = component.ingestionForm.controls['belowSpeedQueue'];
  let eventsRedSecondsBelow =
    component.ingestionForm.controls['eventsRedSecondsBelow'];
  let redSecondsBelow = component.ingestionForm.controls['redSecondsBelow'];
  let redSecondsBelowCategory =
    component.ingestionForm.controls['redSecondsBelowCategory'];
  let redSecondsBelowQueue =
    component.ingestionForm.controls['redSecondsBelowQueue'];
  let eventsGreenSecondsBelow =
    component.ingestionForm.controls['eventsGreenSecondsBelow'];
  let greenSecondsBelow = component.ingestionForm.controls['greenSecondsBelow'];
  let greenSecondsBelowCategory =
    component.ingestionForm.controls['greenSecondsBelowCategory'];
  let greenSecondsBelowQueue =
    component.ingestionForm.controls['greenSecondsBelowQueue'];
  let eventsTestShots = component.ingestionForm.controls['eventsTestShots'];
  let testShotsCategory = component.ingestionForm.controls['testShotsCategory'];
  let testShotsQueue = component.ingestionForm.controls['testShotsQueue'];
  let eventsZeroVelocity =
    component.ingestionForm.controls['eventsZeroVelocity'];
  let zeroVelocityCategory =
    component.ingestionForm.controls['zeroVelocityCategory'];
  let zeroVelocityQueue = component.ingestionForm.controls['zeroVelocityQueue'];
  let snapshotTimeMilli = component.ingestionForm.controls['snapshotTimeMilli'];
  let snapshotTime = component.ingestionForm.controls['snapshotTime'];

  eventsExceedingSpeed.setValue('');
  exceedingSpeed.setValue('');
  exceedingSpeedCategory.setValue('');
  exceedingSpeedQueue.setValue('');
  exceedingSpeed.setValue('');
  eventsBelowSpeed.setValue('');
  belowSpeed.setValue('');
  belowSpeedCategory.setValue('');
  eventsRedSecondsBelow.setValue('');
  redSecondsBelow.setValue('');
  redSecondsBelowCategory.setValue('');
  redSecondsBelowQueue.setValue('');
  eventsGreenSecondsBelow.setValue('');
  greenSecondsBelow.setValue('');
  greenSecondsBelowCategory.setValue('');
  greenSecondsBelowQueue.setValue('');
  eventsTestShots.setValue('');
  testShotsCategory.setValue('');
  testShotsQueue.setValue('');
  eventsZeroVelocity.setValue('');
  zeroVelocityCategory.setValue('');
  zeroVelocityQueue.setValue('');
  snapshotTimeMilli.setValue('');
  snapshotTime.setValue('');
  component.saveData(component.ingestionForm.value);
})
it('updateValidation($event: any, exceedingSpeedCategoryRef: any, exceedingSpeedQueueRef: any, exceedingSpeedRef?: any)',()=>{
 let  $event={ checked: true };
 let exceedingSpeedCategoryRef='exceedingSpeedCategory';
 let exceedingSpeedQueueRef='exceedingSpeedQueue';
 let exceedingSpeedRef='exceedingSpeed';
  component.updateValidation($event, exceedingSpeedCategoryRef, exceedingSpeedQueueRef, exceedingSpeedRef)
})
it('setValidation when checkboxValue:any="eventsExceedingSpeed"',()=>{
  let checkboxValue:any="eventsExceedingSpeed";
  component.setValidation(checkboxValue);
})
it('setValidation when checkboxValue:any="eventsBelowSpeed"',()=>{
  let checkboxValue:any="eventsBelowSpeed";
  component.setValidation(checkboxValue);
})
it('setValidation when checkboxValue:any="eventsRedSecondsBelow"',()=>{
  let checkboxValue:any="eventsRedSecondsBelow";
  component.setValidation(checkboxValue);
})
it('setValidation when checkboxValue:any="eventsGreenSecondsBelow"',()=>{
  let checkboxValue:any="eventsGreenSecondsBelow";
  component.setValidation(checkboxValue);
})
it('setValidation when checkboxValue:any="eventsTestShots"',()=>{
  let checkboxValue:any="eventsTestShots";
  component.setValidation(checkboxValue);
})
it('setValidation when checkboxValue:any="eventsZeroVelocity"',()=>{
  let checkboxValue:any="eventsZeroVelocity";
  component.setValidation(checkboxValue);
})
it('updateMilliValidation',()=>{
  component.updateMilliValidation({ checked: true }, 'snapshotTimeMilli');
})
it('setSavedValue',()=>{
  let exceedingSpeedCategoryRef='belowSpeedCategory';
  let data=component.ingestionSettings;
  component.setSavedValue(exceedingSpeedCategoryRef, data);
})
it('setSavedValue',()=>{
  let exceedingSpeedCategoryRef='redSecondsBelowCategory';
  let data=component.ingestionSettings;
  component.setSavedValue(exceedingSpeedCategoryRef, data);
})
it('setSavedValue',()=>{
  let exceedingSpeedCategoryRef='greenSecondsBelowCategory';
  let data=component.ingestionSettings;
  component.setSavedValue(exceedingSpeedCategoryRef, data);
})
it('setSavedValue',()=>{
  let exceedingSpeedCategoryRef='testShotsCategory';
  let data=component.ingestionSettings;
  component.setSavedValue(exceedingSpeedCategoryRef, data);
})
it('setSavedValue',()=>{
  let exceedingSpeedCategoryRef='zeroVelocityCategory';
  let data=component.ingestionSettings;
  component.setSavedValue(exceedingSpeedCategoryRef, data);
})
});
