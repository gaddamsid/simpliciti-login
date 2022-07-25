import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { IssuingAgencyModel } from 'src/app/Models/IssuingAgency/issuingAgency.Model';
import { IssuingAgencyService } from 'src/app/Services/IssuingAgency/issuing-agency.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { IssuingAgencyServiceStub } from 'src/app/shared/testCasesHelperClasses/issuing-agency/IssuingAgencyServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';

import { IssuingAgencyComponent } from './issuing-agency.component';

describe('IssuingAgencyComponent', () => {
  let component: IssuingAgencyComponent;
  let fixture: ComponentFixture<IssuingAgencyComponent>;
  let translate: TranslateService;
  let issuingAgencyService:IssuingAgencyService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuingAgencyComponent ],
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
    { provide: LiveAnnouncer, useClass: LiveAnnouncerStub},
    { provide: ToastrService, useClass: ToasterServiceStub},
    {provide: IssuingAgencyService, useClass: IssuingAgencyServiceStub}
      ]
    })
    .compileComponents();
    // httpClient = TestBed.inject(HttpClient);
    // httpTestingController = TestBed.inject(HttpTestingController);
    translate = TestBed.inject(TranslateService);
    issuingAgencyService=TestBed.inject(IssuingAgencyService)
  });
  afterEach(() => {
    // httpTestingController.verify(); //Verifies that no requests are outstanding.
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(IssuingAgencyComponent);
    component = fixture.componentInstance;
    spyOn(window,"confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Issuing Agency');
  });
  it('should create', () => {
    expect(component).toBeTruthy();
    component.getAgencyList();
  });
 it('check the form validation when empty',()=>{
  expect(component.issuingForm.valid).toBeFalsy();
 })
 it('Add Agency',()=>{
  component.addAgency()

  component.showForm = true;
  expect(component.showForm).toBeTruthy;
 })
 it('cancel Agency',()=>{
  component.cancelAdding();
  component.showForm = false;
  expect(component.showForm).toBe(false);
  component.alertMsg = "";
  expect(component.alertMsg).toBe("");
  component.successMsg = "";
  expect(component.successMsg).toBe("");
  component.issuingForm.reset();
  expect(component.issuingForm.valid).toBeFalsy();
  component.getAgencyList();
  component.addAgencyButton = true;
  expect(component.addAgencyButton).toBe(true);
 })
 it('getAgencyCode',()=>{
  let agency = {
    active: 1,
    agencyCode: 11,
    agencyDistrict: 21,
    agencyLongName: 'Hyderabad',
    agencyMoveTktsPerBk: 23,
    agencyParkTktsPerBk: 22,
    agencyShortName: 'India',
    agencyStreetEnforceInd: 'A',
    agencyViolTableGroup: 'B',
    contractId: 2,
    createDateTime: '2022-05-11T10:24:17.823',
    createUserId: 1,
    isDeleted: 'N',
    issuingAgencyId: 2,
    updateDateTime: '2022-05-11T10:24:17.823',
    updateUserId: 1,
  };
  agency=component.issuingForm.value;
  let val=component.getAgencyCode();
  component.data.push(val);
  expect(val).toBe(agency)
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
it('search and filter', () => {
  let input = fixture.debugElement.query(By.css('input'));
  let inputElement = input.nativeElement;
  component.getAgencyList();
  fixture.detectChanges();
  inputElement.value = 'abC';
  fixture.detectChanges();
  const event = new KeyboardEvent('keyup', { key: 'C' });
  inputElement.dispatchEvent(event);
  component.applyFilter(event);
  let searchData = (event.target as HTMLInputElement).value;
  expect(searchData.trim().toLowerCase()).toBe('abc');
  expect(component.dataSource.filter).toEqual('abc');
  expect(inputElement.value).toBe('abC');

  component.filterData();
  expect(component.dataSource.filter).toBe('abc');
})
it(' getAgencyCode()',()=>{
  component.getAgencyCode();
})
it('form invalid when empty', () => {
  expect(component.issuingForm.valid).toBeFalsy();
});
it('agencyCode field validity:setValue undefined validation', () => {
  let errors:any={};

  let agencyCode = component.issuingForm.controls['agencyCode'];

  errors = agencyCode.errors || {};
  expect(errors['required']).toBeTruthy();

  agencyCode.setValue(11);
  fixture.detectChanges();
  errors = agencyCode.errors || {};
  expect(errors['required']).toBeUndefined();
  expect(errors['maxLength']).toBeUndefined();
  expect(agencyCode.errors).toBeNull();
});
it('agencyLongName field validity:setValue undefined validation', () => {
  let errors:any={};

  let agencyLongName = component.issuingForm.controls['agencyLongName'];

  errors = agencyLongName.errors || {};
  expect(errors['required']).toBeTruthy();

  agencyLongName.setValue("Hyderabad");
  fixture.detectChanges();
  errors = agencyLongName.errors || {};
  expect(errors['required']).toBeUndefined();
  expect(errors['maxLength']).toBeUndefined();
  expect(agencyLongName.errors).toBeNull();
});
it('agencyShortName field validity:setValue undefined validation', () => {
  let errors:any={};

  let agencyShortName = component.issuingForm.controls['agencyShortName'];

  errors = agencyShortName.errors || {};
  expect(errors['required']).toBeTruthy();

  agencyShortName.setValue("India");
  fixture.detectChanges();
  errors = agencyShortName.errors || {};
  expect(errors['required']).toBeUndefined();
  expect(errors['maxLength']).toBeUndefined();
  expect(agencyShortName.errors).toBeNull();
});
it('agencyDistrict field validity:setValue undefined validation', () => {
  let errors:any={};

  let agencyDistrict = component.issuingForm.controls['agencyDistrict'];

  errors = agencyDistrict.errors || {};

  agencyDistrict.setValue(21);
  fixture.detectChanges();
  errors = agencyDistrict.errors || {};
  expect(errors['maxLength']).toBeUndefined();
  expect(agencyDistrict.errors).toBeNull();
});
it('agencyParkTktsPerBk field validity:setValue undefined validation', () => {
  let errors:any={};

  let agencyParkTktsPerBk = component.issuingForm.controls['agencyParkTktsPerBk'];

  errors = agencyParkTktsPerBk.errors || {};

  agencyParkTktsPerBk.setValue(22);
  fixture.detectChanges();
  errors = agencyParkTktsPerBk.errors || {};
  expect(errors['maxLength']).toBeUndefined();
  expect(agencyParkTktsPerBk.errors).toBeNull();
});
it('agencyMoveTktsPerBk field validity:setValue undefined validation', () => {
  let errors:any={};

  let agencyMoveTktsPerBk = component.issuingForm.controls['agencyMoveTktsPerBk'];

  errors = agencyMoveTktsPerBk.errors || {};

  agencyMoveTktsPerBk.setValue(23);
  fixture.detectChanges();
  errors = agencyMoveTktsPerBk.errors || {};
  expect(errors['maxLength']).toBeUndefined();
  expect(agencyMoveTktsPerBk.errors).toBeNull();
});
it('agencyStreetEnforceInd field validity:setValue undefined validation', () => {
  let errors:any={};

  let agencyStreetEnforceInd = component.issuingForm.controls['agencyStreetEnforceInd'];

  errors = agencyStreetEnforceInd.errors || {};

  agencyStreetEnforceInd.setValue("A");
  fixture.detectChanges();
  errors = agencyStreetEnforceInd.errors || {};
  expect(errors['pattern']).toBeUndefined();
  expect(agencyStreetEnforceInd.errors).toBeNull();
});
it('agencyViolTableGroup field validity:setValue undefined validation', () => {
  let errors:any={};

  let agencyViolTableGroup = component.issuingForm.controls['agencyViolTableGroup'];

  errors = agencyViolTableGroup.errors || {};

  agencyViolTableGroup.setValue("B");
  fixture.detectChanges();
  errors = agencyViolTableGroup.errors || {};
  expect(errors['pattern']).toBeUndefined();
  expect(agencyViolTableGroup.errors).toBeNull();
});
it('form invalid when filled', () => {
  let agencyCode = component.issuingForm.controls['agencyCode'];
  let agencyLongName = component.issuingForm.controls['agencyLongName'];
  let agencyShortName = component.issuingForm.controls['agencyShortName'];
  let agencyDistrict = component.issuingForm.controls['agencyDistrict'];
  let agencyParkTktsPerBk = component.issuingForm.controls['agencyParkTktsPerBk'];
  let agencyMoveTktsPerBk = component.issuingForm.controls['agencyMoveTktsPerBk'];
  let agencyStreetEnforceInd = component.issuingForm.controls['agencyStreetEnforceInd'];
  let agencyViolTableGroup = component.issuingForm.controls['agencyViolTableGroup'];

  agencyCode.setValue(11);
  agencyLongName.setValue("Hyderabad");
  agencyShortName.setValue("India");
  agencyDistrict.setValue(21);
  agencyParkTktsPerBk.setValue(22);
  agencyMoveTktsPerBk.setValue(23);
  agencyStreetEnforceInd.setValue("A");
  agencyViolTableGroup.setValue("B");
  expect(component.issuingForm.valid).toBeTruthy();
});
it(' createIssuingForm(data: any)',()=>{
  let agencyCode = component.issuingForm.controls['agencyCode'];
  let agencyLongName = component.issuingForm.controls['agencyLongName'];
  let agencyShortName = component.issuingForm.controls['agencyShortName'];
  let agencyDistrict = component.issuingForm.controls['agencyDistrict'];
  let agencyParkTktsPerBk = component.issuingForm.controls['agencyParkTktsPerBk'];
  let agencyMoveTktsPerBk = component.issuingForm.controls['agencyMoveTktsPerBk'];
  let agencyStreetEnforceInd = component.issuingForm.controls['agencyStreetEnforceInd'];
  let agencyViolTableGroup = component.issuingForm.controls['agencyViolTableGroup'];

  agencyCode.setValue(11);
  agencyLongName.setValue("Hyderabad");
  agencyShortName.setValue("India");
  agencyDistrict.setValue(21);
  agencyParkTktsPerBk.setValue(22);
  agencyMoveTktsPerBk.setValue(23);
  agencyStreetEnforceInd.setValue("A");
  agencyViolTableGroup.setValue("B");
  expect(component.issuingForm.valid).toBeTruthy();

  component.createIssuingForm(component.issuingForm.value);
  component.addNewAgency(component.issuingForm.value);
  component.getAgencyCode();
  expect(component.showForm ).toEqual(true);

  expect(component.alertMsg).toEqual("");
  expect(component.successMsg).toEqual("");
})

it('editAgency(data: any)',()=>{
  let data = {
    agencyCode: 74,
    agencyDistrict: 33,
    agencyLongName: 'Nagpur',
    agencyMoveTktsPerBk: 35,
    agencyParkTktsPerBk: 34,
    agencyShortName: 'Place',
    agencyStreetEnforceInd: 'I',
    agencyViolTableGroup: 'J',
    contractId: 2,
    createDatetime: undefined,
    createUserId: 1,
    issuingAgencyId: 47,
    moving: 'Moving',
    parking: 'Parking',
    updateDatetime: undefined,
    updateUserId: 1,
  };
  component.editAgency(data);
})
it(' saveAgency(formData: any)',()=>{
  let data = {
    agencyCode: 9,
    agencyDistrict: 3,
    agencyLongName: "Kritikaa",
    agencyMoveTktsPerBk: 4,
    agencyParkTktsPerBk: 5,
    agencyShortName: "Roy",
    agencyStreetEnforceInd: "A",
    agencyViolTableGroup: "B",
    contractId: 2,
    createDatetime: undefined,
    createUserId: 1,
    issuingAgencyId: 52,
    moving: "Moving",
    parking: "Parking",
    updateDatetime: undefined,
    updateUserId: 1
  };
  component.editAgency(data);
  let agencyCode = component.issuingForm.controls['agencyCode'];
  let agencyLongName = component.issuingForm.controls['agencyLongName'];
  let agencyShortName = component.issuingForm.controls['agencyShortName'];
  let agencyDistrict = component.issuingForm.controls['agencyDistrict'];
  let agencyParkTktsPerBk = component.issuingForm.controls['agencyParkTktsPerBk'];
  let agencyMoveTktsPerBk = component.issuingForm.controls['agencyMoveTktsPerBk'];
  let agencyStreetEnforceInd = component.issuingForm.controls['agencyStreetEnforceInd'];
  let agencyViolTableGroup = component.issuingForm.controls['agencyViolTableGroup'];

  agencyCode.setValue(74);
  agencyLongName.setValue("Kritika");
  agencyShortName.setValue("Roy");
  agencyDistrict.setValue(3);
  agencyParkTktsPerBk.setValue(5);
  agencyMoveTktsPerBk.setValue(4);
  agencyStreetEnforceInd.setValue("A");
  agencyViolTableGroup.setValue("B");
  expect(component.issuingForm.valid).toBeTruthy();

  let reqObj=
 {
  active: 0,
  agencyCode: 9,
  agencyDistrict: 3,
  agencyLongName: 'Kritika',
  agencyMoveTktsPerBk: 4,
  agencyParkTktsPerBk: 5,
  agencyShortName: 'Roy',
  agencyStreetEnforceInd: 'A',
  agencyViolTableGroup: 'B'
}
  component.saveAgency(reqObj);
  component.getAgencyList();
  expect(component.showForm).toEqual(false);
  component.getAgencyList();
  expect(component.addAgencyButton).toEqual(true);
  component.issuingForm.reset();
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
it('deleteAgency(data: any)',()=>{
  let data=
  {
    agencyCode: 64,
    agencyDistrict: 33,
    agencyLongName: "XCaliber Agency, California",
    agencyMoveTktsPerBk: 35,
    agencyParkTktsPerBk: 34,
    agencyShortName: "Place",
    agencyStreetEnforceInd: "I",
    agencyViolTableGroup: "J",
    contractId: 2,
    createDatetime: undefined,
    createUserId: 1,
    issuingAgencyId: 62,
    moving: "Moving",
    parking: "Parking",
    updateDatetime: undefined,
    updateUserId: 1
}
component.deleteAgency(data);
fixture.detectChanges();
fixture.detectChanges();
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
  })
});
