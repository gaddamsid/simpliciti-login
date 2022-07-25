import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueComponent } from './queue.component';
import { NgxGalleryModule, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ApiService } from 'src/app/shared/services/api.service';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { QueuesApiservices } from 'src/app/shared/services/queues-apiservices.ts.service';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { ValidationServiceStub } from 'src/app/shared/testCasesHelperClasses/ValidationServiceStub';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { QueuesApiserviceStub } from 'src/app/shared/testCasesHelperClasses/QueuesApiserviceStub';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('QueueComponent', () => {
  let component: QueueComponent;
  let fixture: ComponentFixture<QueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueueComponent ],
      imports: [
        HttpClientTestingModule,
        TranslateStubsModule,
        TranslateModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        RouterTestingModule,
        MatSortModule,
        AngularmaterialModule,
        MatTableModule,
        MatIconModule,
        RouterTestingModule,
        NgImageSliderModule,
        NgxGalleryModule,
        MatFormFieldModule 
      ],
      providers: [
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ValidationService, useClass: ValidationServiceStub },
        { provide: ApiService, useClass: apiServiceStub },
        { provide: QueuesApiservices, useClass: QueuesApiserviceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Queue Processing');
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

  it('getToday', () => {
    component.getToday();
    expect(component.getToday()).toBeDefined();
  })

  it('getQueueList', () => {
    component.getQueueList();
    expect(component.queueList.length).toBeGreaterThan(0);
  })

  it('getEventList', () => {
    component.getEventList(1);
    expect(component.eventList.length).toBeGreaterThan(0);
  })

  it('verifyBlind', () => {
    let data = {
      doubleBlind: 'test',
      doubleBlindState: 1
    }
    component.changeEventItemId(49572);
    component.verifyBlind(data);
    expect(component.eventId).toEqual(49572);
  })

  it('clearDoubleblind', () => {
    component.clearDoubleblind();
    expect(component.queueForm.controls['doubleBlind'].value).toEqual('');
    expect(component.queueForm.controls['doubleBlindState'].value).toEqual('');
    expect(component.queueForm.controls['doubleBlindDLState'].value).toEqual('');
    expect(component.queueForm.controls['doubleBlindrejectCategory'].value).toEqual('');
  })

  it('returnVRlookup', () => {
    let data = {
      vrPlate: 'test',
      vrrejectCategory: 1
    }
    component.changeEventItemId(49572);
    component.returnVRlookup(data);
    expect(component.eventId).toEqual(49572);
  })

  it('getFirstEvent', () => {
    component.getFirstEvent(1);
    expect(component.eventList.length).toBeGreaterThan(0);
  })

  it('acceptworkData', () => {
    let data = {
      vehicleInfoPlate: 'test',
      vehicleInfoMake: 'test',
      vehicleInfoModel: 'test',
      vehicleInfoStyle: 'test',
      vehicleInfoColor: 'test',
      vehicleInfoYear: '13/07/2022',
      vehicleInfoVin : '',
      vehicleType: 'test',
      workflowState: 'test',
      workflowSection: 'test',
      workflowPlate: 'test',
      weatherType: 'test',
      workflowCategory: 'test',
      ownerInfoDl: 'test',
      ownerInfoDlstate: 'test',
      ownerInfoDlclass: 'test',
      ownerBusinessname: 'test',
      ownerInfofirstname: 'test',
      ownerInfolastname: 'test',
      ownerInfoCoOwnerDOB: 'test',
      ownerInfogender: 'test',
      ownerInfoeyeColor: 'test',
      ownerInfohaircolor: 'test',
      ownerInfoheight: 'test',
      ownerInfoWeight: 'test',
      ownerInfostreet1: 'test',
      ownerInfostreet2: 'test',
      ownerInfostreet3: 'test',
      ownerInfoaddress: 'test',
      ownerInfoState: 1,
      ownerInfozip : 75048,
      ownerInfoCoOwnername: 'test',
      ownerInfoCoOwnerlicenceNo : 'test'
    }
    component.changeEventItemId(49572);
    component.acceptworkData(data);
    expect(component.eventId).toEqual(49572);
  })

  it('skiptoNextevent', () => {
    component.changeBehaviourType(1);
    component.skiptoNextevent();
    expect(component.welcome).toEqual("Record Skipped Successfully");
  })
});
