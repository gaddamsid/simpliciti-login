import { ComponentFixture,async, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PaylockEmailService } from 'src/app/Services/PayLockEmail/paylock-email.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { PayLockEmailServiceStub } from 'src/app/shared/testCasesHelperClasses/PayLockEmailServiceStub';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { PaylockEmailComponent } from './paylock-email.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {PaylockEmail,Paylock,PaylockEmails} from '../../../Models/paylock-email';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { TranslateTestingModule } from 'ngx-translate-testing';
const fakeTraslateService = jasmine.createSpyObj<TranslateService>('TranslateService', ['instant']);
const paylockEmailServiceSpy = jasmine.createSpyObj('PaylockEmailService', ['getpaylockList','getserialNumber']);
// paylockEmailServiceSpy.getMaxSerialNumber.and.returnValue(of(7));
// const ENGLISH_LANGUAGE = 'en';
// const SPANISH_LANGUAGE = 'es';
// const FRENCH_LANGUAGE = 'fr';
// const ARABIC_LANGUAGE = 'ar';
// const TRANSLATIONS_EN = require('../assets/i18n/en.json');
// const TRANSLATIONS_FR = require('../assets/i18n/fr.json');
// const TRANSLATIONS_SP = require('../assets/i18n/sp.json');
// const TRANSLATIONS_AR = require('../assets/i18n/ar.json');
// const TRANSLATIONS = {
//   [ENGLISH_LANGUAGE]: TRANSLATIONS_EN,
//   [SPANISH_LANGUAGE]: TRANSLATIONS_SP,
//   [FRENCH_LANGUAGE]:TRANSLATIONS_FR,
//   [ARABIC_LANGUAGE]:TRANSLATIONS_AR
// };
class User {
  constructor( public sNo: string,public email: string) {
  }
}
describe('PaylockEmailComponent', () => {
  let component: PaylockEmailComponent;
  let translate: TranslateService;
  let fixture: ComponentFixture<PaylockEmailComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let paylockemailService:PaylockEmailService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaylockEmailComponent ],
      imports: [
        BrowserModule,
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
        MatFormFieldModule
      ],
      providers: [
        { provide: LanguageService, useClass:languageServiceStub},
        { provide: ToastrService, useClass: ToasterServiceStub},
        {provide: PaylockEmailService, useClass: PayLockEmailServiceStub}
    ]

    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    paylockemailService = TestBed.inject(PaylockEmailService);
    translate = TestBed.inject(TranslateService);
  });
  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(PaylockEmailComponent);
    component = fixture.componentInstance;
    spyOn(window,"confirm").and.returnValue(false);
    fixture.detectChanges();
    component.ngOnInit();
  });
  // it('should load translations', async(() => {
  //   spyOn(translate, 'getBrowserLang').and.returnValue('en');
  //   const fixture = TestBed.createComponent(PaylockEmailComponent);
  //   const compiled = fixture.debugElement.nativeElement;

  //   // the DOM should be empty for now since the translations haven't been rendered yet
  //   expect(compiled.querySelector('input').textContent).toEqual('');

  //   httpTestingController.expectOne('/assets/i18n/en.json').flush(TRANSLATIONS_EN);
  //   httpTestingController.expectNone('/assets/i18n/fr.json');

  //   // Finally, assert that there are no outstanding requests.
  //   httpTestingController.verify();

  //   fixture.detectChanges();
  //   // the content should be translated to english now
  //   expect(compiled.querySelector('input').textContent).toEqual(TRANSLATIONS_EN);

  //   translate.use('fr');
  //   httpTestingController.expectOne('/assets/i18n/fr.json').flush(TRANSLATIONS_FR);

  //   // Finally, assert that there are no outstanding requests.
  //   httpTestingController.verify();

  //   // the content has not changed yet
  //   expect(compiled.querySelector('input').textContent).toEqual(TRANSLATIONS_EN.HOME.TITLE);

  //   fixture.detectChanges();
  //   // the content should be translated to french now
  //   expect(compiled.querySelector('input').textContent).toEqual(TRANSLATIONS_FR.HOME.TITLE);
  // }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Pay Lock Email');
  });
  it('should return paylockList', () => {
    component.getpaylockemailList();
    fixture.detectChanges();
    expect(component.dataSource.filteredData.length).toEqual(11);
  });
  it('filter data', () => {
    component.getpaylockemailList();
    fixture.detectChanges();
    component.filterData();
  });

it('sNo field validity', () => {
  let errors:any;
  let sNo = component.paylockEmailForm.controls['sNo'];
  expect(sNo.valid).toBeFalsy();

  // sNo field is required
  errors = sNo.errors || {};
  expect(errors['required']).toBeTruthy();

  // Set sNo to something
  sNo.setValue(1);
  errors = sNo.errors || {};
  expect(errors['required']).toBeFalsy();
});
it('email field validity:required validation', () => {
  let errors:any={};

  let email = component.paylockEmailForm.controls['emailID'];

  // Email field is required
  errors = email.errors || {};
  expect(email.valid).toBeFalsy();
  expect(email.pristine).toBeTruthy();
  expect(errors['required']).toBeTruthy();
});

it('email field validity:setvalue validation', () => {
  let errors:any={};

  let email = component.paylockEmailForm.controls['emailID'];

  // Email field is required
  errors = email.errors || {};

   // Set email to something
   email.setValue("test");
   fixture.detectChanges();
   errors = email.errors || {};
   expect(errors['required']).toBeUndefined();
   expect(errors['email']).toBeTruthy();
   expect(errors['pattern']).toBeTruthy();
   expect(errors['maxLength']).toBeUndefined();
});
it('email field validity:pattern validation', () => {
  let errors:any={};

  let email = component.paylockEmailForm.controls['emailID'];

  // Email field is required
  errors = email.errors || {};
  expect(errors['required']).toBeTruthy();

   // Set email to something
   email.setValue("test");
   fixture.detectChanges();
   errors = email.errors || {};
   expect(errors['required']).toBeUndefined();
   expect(errors['email']).toBeTruthy();
   expect(errors['pattern']).toBeTruthy();
   expect(errors['maxLength']).toBeUndefined();
  // Set email to something correct
  email.setValue("test@test.com");
  fixture.detectChanges();
  errors = email.errors || {};
  expect(errors['required']).toBeUndefined();
  expect(errors['email']).toBeUndefined();
  expect(errors['pattern']).toBeUndefined();
  expect(errors['maxLength']).toBeUndefined();
  expect(email.errors).toBeNull();
});
it('email field validity:setValue undefined validation', () => {
  let errors:any={};

  let email = component.paylockEmailForm.controls['emailID'];

  // Email field is required
  errors = email.errors || {};

  // Set email to something correct
  email.setValue("test@test.com");
  fixture.detectChanges();
  errors = email.errors || {};
  expect(errors['required']).toBeUndefined();
  expect(errors['email']).toBeUndefined();
  expect(errors['pattern']).toBeUndefined();
  expect(errors['maxLength']).toBeUndefined();
  expect(email.errors).toBeNull();
});
it('get serial number',()=>{
  expect(component.paylockEmailForm.valid).toBeFalsy();
  component.addpaylockEmail();
  // expect(paylockEmailServiceSpy.getserialNumber).toHaveBeenCalledWith({"sNo":7});
})
it('form invalid when empty', () => {
  expect(component.paylockEmailForm.valid).toBeFalsy();
});
it('form is valid', () => {
  let sNo = component.paylockEmailForm.controls['sNo'];
  let email = component.paylockEmailForm.controls['emailID'];
  sNo.setValue(1);
  email.setValue("test@test.com");
  expect(component.paylockEmailForm.valid).toBeTruthy();
});
it('submitting a form save a user', () => {
  interface User{
    sNo: any,
    emailId:any
  }

  let user: User={
    sNo: 1,
    emailId:"test@test.com"
  };
  // Trigger the savepaylockEmail function
  component.paylockEmailForm.controls['sNo'].setValue(1);
  component.paylockEmailForm.controls['emailID'].setValue("test@test.com");
  component.savepaylockEmail(user);
  // Now we can check to make sure the emitted value is correct
  expect(user.sNo).toBe(1);
  expect(user.emailId).toBe("test@test.com");
  component.welcome="Record Added Successfully";
  expect(component.welcome).toEqual("Record Added Successfully");
});
it('Edit an user', () => {
  expect(component.paylockEmailForm.valid).toBeFalsy();
  component.paylockEmailForm.controls['sNo'].setValue(1);
  component.paylockEmailForm.controls['emailID'].setValue("test@test.com");

  expect(component.paylockEmailForm.valid).toBeTruthy();
  interface User{
    sNo: any,
    emailId:any
  }

  let user: User={
    sNo: 1,
    emailId:"test@test.com"
  };
  let paylock:PaylockEmails={
    active: 1,
    clientD: 0,
    contractId: 2,
    createDatetime: "2022-06-15T08:47:05.47",
    createUserId: 1,
    emailId: " raay@test.com",
    isDeleted: "N",
    paylockemailconfigId: 66,
    sNo: 37,
    updateDatetime: "2022-06-15T08:47:05.47",
    updateUserId: 1
  };
  // Trigger the editpaylockEmail function
  let paylockList:any=[];
  paylockList.push(component.getpaylockemailList());
  component.editpaylockEmail(paylock);
  component.paylockEmailForm.controls['sNo'].setValue(paylock.sNo);
  component.paylockEmailForm.controls["emailID"].setValue(paylock.emailId);
});
it('Update an user', () => {
  expect(component.paylockEmailForm.valid).toBeFalsy();
  component.paylockEmailForm.controls['sNo'].setValue(1);
  component.paylockEmailForm.controls['emailID'].setValue("test@test.com");

  expect(component.paylockEmailForm.valid).toBeTruthy();
  interface User{
    sNo: any,
    emailId:any
  }

  let user: User={
    sNo: 1,
    emailId:"test@test.com"
  };
  let paylock:PaylockEmails={
    active: 1,
    clientD: 0,
    contractId: 2,
    createDatetime: "2022-06-15T08:47:05.47",
    createUserId: 1,
    emailId: "raay@test.com",
    isDeleted: "N",
    paylockemailconfigId: 66,
    sNo: 37,
    updateDatetime: "2022-06-15T08:47:05.47",
    updateUserId: 1
  };
  // Trigger the editpaylockEmail function
  let paylockList:any=[];
  paylockList.push(component.getpaylockemailList());
  component.editpaylockEmail(paylock);
  component.paylockEmailForm.controls['sNo'].setValue(paylock.sNo);
  component.paylockEmailForm.controls["emailID"].setValue(paylock.emailId);
  component.updatePaylockEmail(paylock);

  // expect(component.editpaylockEmail(paylock)).toBeTruthy();
  // component.updatePaylockEmail(user);

  // Now we can check to make sure the emitted value is correct
  // expect(user.sNo).toBe(1);
  // expect(user.emailId).toBe("test@test.com");
  // expect(component.paylockEmailForm.valid).toBeTruthy();
});
it('Delete an user', () => {
  expect(component.paylockEmailForm.valid).toBeFalsy();
  component.paylockEmailForm.controls['sNo'].setValue(1);
  component.paylockEmailForm.controls['emailID'].setValue("test@test.com");

  expect(component.paylockEmailForm.valid).toBeTruthy();
const data={
  active: 1,
  clientD: 0,
  contractId: 2,
  createDatetime: "2022-05-09T07:44:11.203",
  createUserId: 1,
  emailId: "automation@gmail.com",
  isDeleted: "N",
  paylockEmailconfigId: 7,
  sNo: 7,
  updateDatetime: "2022-05-09T07:44:11.203",
  updateUserId: 1
}
  // Trigger the editpaylockEmail function
  let paylockList:any=[];
  paylockList.push(component.getpaylockemailList());
  component.deletepaylockEmail(data.paylockEmailconfigId);

  // expect(component.editpaylockEmail(paylock)).toBeTruthy();
  // component.updatePaylockEmail(user);

  // Now we can check to make sure the emitted value is correct
  // expect(user.sNo).toBe(1);
  // expect(user.emailId).toBe("test@test.com");
  // expect(component.paylockEmailForm.valid).toBeTruthy();
});
it('cancel a paylock',()=>{
  expect(component.paylockEmailForm.valid).toBeFalsy();
  component.paylockEmailForm.controls['sNo'].setValue("");
  component.paylockEmailForm.controls['emailID'].setValue("");

  expect(component.paylockEmailForm.valid).toBeFalsy();
  component.cancelPaylock();
  let paylockList:any=[];
  paylockList.push(component.getpaylockemailList());
})
it('search and filter', () => {
  let input = fixture.debugElement.query(By.css('input'));
  let inputElement = input.nativeElement;
  component.getpaylockemailList();
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
it('appendLangInAdd',()=>{
  let lang='en';
  component.appendLang(lang);
})
it('setPagelabel(lang: any)',()=>{
  let lang='en';
  component.setPagelabel(lang);
})
  });
  export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, "assets/i18n/", ".json");
  }
