import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { GPStateServiceStub } from 'src/app/shared/testCasesHelperClasses/GPStateServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { GPService } from '../../services/g-p.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlateDetailsComponent } from './plate-details.component';
import { BehaviorSubject } from 'rxjs';
import { MatDialogRefStub } from 'src/app/shared/testCasesHelperClasses/MatDialogRefStub';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { MatNativeDateModule } from '@angular/material/core';
import { PlateDetailsComponentStub } from 'src/app/shared/testCasesHelperClasses/PlateDetailsComponentStub';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';


describe('PlateDetailsComponent', () => {
  let component: PlateDetailsComponent;
  let fixture: ComponentFixture<PlateDetailsComponent>;
  let componentStub  = new PlateDetailsComponentStub();
  let gpService: GPService;

  let res = {
    customerInformation : null,
    registryInformation : null,
    installmentPaymentPlan: {

    },
    excludeInformation : {

    },
    collectionInformation : {

    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlateDetailsComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        RouterTestingModule,
        ReactiveFormsModule,
        AngularmaterialModule,
        TranslateStubsModule,
        HttpClientTestingModule,
        BrowserDynamicTestingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        // { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: ToastrService, useClass: ToasterServiceStub },
        
        // { provide: ApiService, useClass: apiServiceStub },
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateDetailsComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getPlateDetails should return value', () => {

    let res : any[] = [];
    // debugger
    component.getPlateDetails();
    let isLoading = component.isLoading;

    expect(component.customerInfo).toBeTruthy();
    expect(component.registeryInfo).toBeTruthy();
    expect(component.installmentPaymentPlan).toBeTruthy();
    expect(component.excludeInfo).toBeTruthy();
    expect(component.collectionInfo).toBeTruthy();

  });

  // it('customerInformation should return expected value', () => {
  //   debugger
  //   let custInfo = componentStub.getCustInfoMockData();

  //   let registeryInfo = componentStub.registryInfo;

  //   let res = component.customerInformation(custInfo,registeryInfo);

  //   let mockData = componentStub.getCustInfoReturnValue();
  //   expect(res).toBeTruthy();
  //   expect(res).toEqual(mockData);
  // })

  it('customerInformation return failed expected value', () => {
    let mockData = {
    title: 'Customer Information',
    titleTextRight: false,
    headingTextRight: false,
    bodyTextRight: false,
    id: 'customer_info',
    details:[]};
    let custInfo = null;

    let registeryInfo = null;

    let res = component.customerInformation(custInfo,registeryInfo);

    expect(res).toEqual(mockData);

  })

  it('registryInformation should return failed expected value', () => {
    let mockData = {
      title: 'Registry Information',
      titleTextRight: false,
      headingTextRight: false,
      bodyTextRight: false,
      id: 'registry_info',
      details: []
    };
    let custInfo = null;

    let registeryInfo = null;

  let res = component.registryInformation(registeryInfo);

  expect(res).toEqual(mockData);

  });

  it('installmentPaymentPlanList should return failed expected value', () => {
    let mockData = {
      title: 'Installment Payment Plan',
      titleTextRight: false,
      headingTextRight: false,
      bodyTextRight: false,
      id: 'IPP_info',
      details: []
    };
    let custInfo = null;

    let installmentPlan :any;

  let res = component.installmentPaymentPlanList(installmentPlan);

  expect(res).toEqual(mockData);

  });

  it('excludeInformation should return failed expected value', () => {
    let mockData = {
      title: 'Exclude Information',
      titleTextRight: false,
      headingTextRight: false,
      bodyTextRight: false,
      id: 'exclude_info',
      details: []
    };
    let custInfo = null;

    let excludeInfo :any;

  let res = component.excludeInformation(excludeInfo);

  expect(res).toEqual(mockData);

  });

  it('collectionInformation should return failed expected value', () => {
    
    let mockData = {
      title: 'Collection Information',
      titleTextRight: false,
      headingTextRight: false,
      bodyTextRight: false,
      id: 'collection_info',
      details: []
    };
    let custInfo = null;

    let collectionInfo :any;

  let res = component.collectionInformation(collectionInfo);

  expect(res).toEqual(mockData);

  });

  it('onlyDateFormat should return the expected format', () => {

    let expRes = 'Mar 25, 2015';
    let mock = new Date("2015-03-25T12:00:00Z");
    
    let res = component.onlyDateFormat(expRes);

    expect(res).toEqual(expRes);
  })

  it('onlyTime should return expected value', () => {
    // debugger
    let expRes = '5:30 PM'
    let mock = new Date("2015-03-25T12:00:00Z");
    let res = component.onlyTime(mock);

    expect(res).toEqual(expRes);
  })

});
