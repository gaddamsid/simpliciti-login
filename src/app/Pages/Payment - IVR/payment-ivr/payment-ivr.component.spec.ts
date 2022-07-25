import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';

import { PaymentIvrComponent } from './payment-ivr.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ToastrService } from 'ngx-toastr';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('PaymentIvrComponent', () => {
  let component: PaymentIvrComponent;
  let fixture: ComponentFixture<PaymentIvrComponent>;
  let apiService:ApiService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentIvrComponent],
      imports: [
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
      providers: [
        { provide: ApiService, useClass: apiServiceStub },
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ToastrService, useClass: ToasterServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentIvrComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });
  beforeEach(inject(
    [ApiService],
    (apiService: ApiService) => {
      apiService = apiService;
    }
  ));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('IVR/PBW');
  });
  it('appendLang', () => {
    let lang = 'en';
    component.appendLang(lang);
    component.translate.use(lang);
    expect(lang).toEqual('en');
  });
  it('cancelChanges', () => {
    component.cancelChanges();
  });
  it('error response when code is 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        details: [
          {
            timestamp: '2022-06-29T06:47:59.717+0000',
            code: 5000,
            error: 'Not Found',
            message: 'No message available',
            path: '/admin/v1/interaction1',
          },
        ],
      },
    };
    component.errorResponseCheck(error);
    expect(error.error.details[0].code).toEqual(5000);
  });

  it('error response when message is DuplicateKey and code 5000', () => {
    let error = {
      error: {
        details: [
          {
            timestamp: '2022-06-29T06:47:59.717+0000',
            code: 5000,
            error: 'Not Found',
            message: 'DuplicateKey',
            path: '/admin/v1/interaction1',
          },
        ],
      },
    };
    component.errorResponseCheck(error);
    expect(error.error.details[0].code).toEqual(5000);
  });

  it('error response when code is not 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        details: [
          {
            timestamp: '2022-06-29T06:47:59.717+0000',
            code: 404,
            error: 'Not Found',
            message: 'No message available',
            path: '/admin/v1/interaction1',
          },
        ],
      },
    };
    component.errorResponseCheck(error);
    expect(error.error.details[0].code).toEqual(404);
  });
  it('Form should be invalid', () => {
    expect(component.paymentIvrForm.valid).toBeTruthy();
  });
  it('cardsAmex:check required Validation', () => {
    let errors: any = {};
    let cardsAmex = component.paymentIvrForm.controls['cardsAmex'];
    expect(cardsAmex.valid).toBeTruthy();
    errors = cardsAmex.errors || {};
    expect(cardsAmex.errors).toBeNull();
  });
  it('cardsDiscover:check required Validation', () => {
    let errors: any = {};
    let cardsDiscover = component.paymentIvrForm.controls['cardsDiscover'];
    expect(cardsDiscover.valid).toBeTruthy();
    errors = cardsDiscover.errors || {};
    expect(cardsDiscover.errors).toBeNull();
  });
  it('cardsVisaMasterCard:check required Validation', () => {
    let errors: any = {};
    let cardsVisaMasterCard =
      component.paymentIvrForm.controls['cardsVisaMasterCard'];
    expect(cardsVisaMasterCard.valid).toBeTruthy();
    errors = cardsVisaMasterCard.errors || {};
    expect(cardsVisaMasterCard.errors).toBeNull();
  });
  it('clientNumber:check required Validation', () => {
    let errors: any = {};
    let clientNumber = component.paymentIvrForm.controls['clientNumber'];
    expect(clientNumber.valid).toBeTruthy();
    errors = clientNumber.errors || {};
    expect(clientNumber.errors).toBeNull();
  });
  it('contractId:check required Validation', () => {
    let errors: any = {};
    let contractId = component.paymentIvrForm.controls['contractId'];
    expect(contractId.valid).toBeTruthy();
    errors = contractId.errors || {};
    expect(contractId.errors).toBeNull();
  });
  it('createDateTime:check required Validation', () => {
    let errors: any = {};
    let createDateTime = component.paymentIvrForm.controls['createDateTime'];
    expect(createDateTime.valid).toBeTruthy();
    errors = createDateTime.errors || {};
    expect(createDateTime.errors).toBeNull();
  });
  it('createUserId:check required Validation', () => {
    let errors: any = {};
    let createUserId = component.paymentIvrForm.controls['createUserId'];
    expect(createUserId.valid).toBeTruthy();
    errors = createUserId.errors || {};
    expect(createUserId.errors).toBeNull();
  });
  it('creditClCheckDigit:check required Validation', () => {
    let errors: any = {};
    let creditClCheckDigit = component.paymentIvrForm.controls['createUserId'];
    expect(creditClCheckDigit.valid).toBeTruthy();
    errors = creditClCheckDigit.errors || {};
    expect(creditClCheckDigit.errors).toBeNull();
  });
  it('creditClCompressFlag:check required Validation', () => {
    let errors: any = {};
    let creditClCompressFlag =
      component.paymentIvrForm.controls['creditClCompressFlag'];
    expect(creditClCompressFlag.valid).toBeTruthy();
    errors = creditClCompressFlag.errors || {};
    expect(creditClCompressFlag.errors).toBeNull();
  });
  it('creditClNoticeFlag:check required Validation', () => {
    let errors: any = {};
    let creditClNoticeFlag =
      component.paymentIvrForm.controls['creditClNoticeFlag'];
    expect(creditClNoticeFlag.valid).toBeTruthy();
    errors = creditClNoticeFlag.errors || {};
    expect(creditClNoticeFlag.errors).toBeNull();
  });
  it('creditClNumber:check required Validation', () => {
    let errors: any = {};
    let creditClNumber = component.paymentIvrForm.controls['creditClNumber'];
    expect(creditClNumber.valid).toBeTruthy();
    errors = creditClNumber.errors || {};
    expect(creditClNumber.errors).toBeNull();
  });
  it('creditClPhoneFee:check required Validation', () => {
    let errors: any = {};
    let creditClPhoneFee =
      component.paymentIvrForm.controls['creditClPhoneFee'];
    expect(creditClPhoneFee.valid).toBeTruthy();

    errors = creditClPhoneFee.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxLength(8)']).toBeFalsy();
    expect(errors['max(99999.99)']).toBeFalsy();

    creditClPhoneFee.setValue(0.0);
    fixture.detectChanges();
    errors = creditClPhoneFee.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxLength(8)']).toBeFalsy();
    expect(errors['max(99999.99)']).toBeFalsy();
  });
  it('creditClPhoneSurcharge:check required Validation', () => {
    let errors: any = {};
    let creditClPhoneSurcharge =
      component.paymentIvrForm.controls['creditClPhoneSurcharge'];
    expect(creditClPhoneSurcharge.valid).toBeTruthy();

    errors = creditClPhoneSurcharge.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxLength(8)']).toBeFalsy();
    expect(errors['max(99999.99)']).toBeFalsy();

    creditClPhoneSurcharge.setValue(0.0);
    fixture.detectChanges();
    errors = creditClPhoneSurcharge.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxLength(8)']).toBeFalsy();
    expect(errors['max(99999.99)']).toBeFalsy();
  });
  it('creditClWebFee:check required Validation', () => {
    let errors: any = {};
    let creditClWebFee = component.paymentIvrForm.controls['creditClWebFee'];
    expect(creditClWebFee.valid).toBeTruthy();

    errors = creditClWebFee.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxLength(8)']).toBeFalsy();
    expect(errors['max(99999.99)']).toBeFalsy();

    creditClWebFee.setValue(0.0);
    fixture.detectChanges();
    errors = creditClWebFee.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxLength(8)']).toBeFalsy();
    expect(errors['max(99999.99)']).toBeFalsy();
  });
  it('creditClWebSurcharge:check required Validation', () => {
    let errors: any = {};
    let creditClWebSurcharge =
      component.paymentIvrForm.controls['creditClWebSurcharge'];
    expect(creditClWebSurcharge.valid).toBeTruthy();

    errors = creditClWebSurcharge.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxLength(8)']).toBeFalsy();
    expect(errors['max(99999.99)']).toBeFalsy();

    creditClWebSurcharge.setValue(0.0);
    fixture.detectChanges();
    errors = creditClWebSurcharge.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxLength(8)']).toBeFalsy();
    expect(errors['max(99999.99)']).toBeFalsy();
  });
  it('inquiryCollate:check required Validation', () => {
    let errors: any = {};
    let inquiryCollate = component.paymentIvrForm.controls['inquiryCollate'];
    expect(inquiryCollate.valid).toBeTruthy();
    errors = inquiryCollate.errors || {};
    expect(inquiryCollate.errors).toBeNull();
  });
  it('inquiryFee:check required Validation', () => {
    let errors: any = {};
    let inquiryFee = component.paymentIvrForm.controls['inquiryFee'];
    expect(inquiryFee.valid).toBeTruthy();
    errors = inquiryFee.errors || {};
    expect(inquiryFee.errors).toBeNull();
  });
  it('inquiryFleet:check required Validation', () => {
    let errors: any = {};
    let inquiryFleet = component.paymentIvrForm.controls['inquiryFleet'];
    expect(inquiryFleet.valid).toBeTruthy();
    errors = inquiryFleet.errors || {};
    expect(inquiryFleet.errors).toBeNull();
  });
  it('inquiryIPP:check required Validation', () => {
    let errors: any = {};
    let inquiryIPP = component.paymentIvrForm.controls['inquiryIPP'];
    expect(inquiryIPP.valid).toBeTruthy();
    errors = inquiryIPP.errors || {};
    expect(inquiryIPP.errors).toBeNull();
  });
  it('inquiryLicense:check required Validation', () => {
    let errors: any = {};
    let inquiryLicense = component.paymentIvrForm.controls['inquiryLicense'];
    expect(inquiryLicense.valid).toBeTruthy();
    errors = inquiryLicense.errors || {};
    expect(inquiryLicense.errors).toBeNull();
  });
  it('inquiryNotice:check required Validation', () => {
    let errors: any = {};
    let inquiryNotice = component.paymentIvrForm.controls['inquiryNotice'];
    expect(inquiryNotice.valid).toBeTruthy();
    errors = inquiryNotice.errors || {};
    expect(inquiryNotice.errors).toBeNull();
  });
  it('inquiryPlate:check required Validation', () => {
    let errors: any = {};
    let inquiryPlate = component.paymentIvrForm.controls['inquiryPlate'];
    expect(inquiryPlate.valid).toBeTruthy();
    errors = inquiryPlate.errors || {};
    expect(inquiryPlate.errors).toBeNull();
  });
  it('inquiryRedlight:check required Validation', () => {
    let errors: any = {};
    let inquiryRedlight = component.paymentIvrForm.controls['inquiryRedlight'];
    expect(inquiryRedlight.valid).toBeTruthy();
    errors = inquiryRedlight.errors || {};
    expect(inquiryRedlight.errors).toBeNull();
  });
  it('inquiryTicket:check required Validation', () => {
    let errors: any = {};
    let inquiryTicket = component.paymentIvrForm.controls['inquiryTicket'];
    expect(inquiryTicket.valid).toBeTruthy();
    errors = inquiryTicket.errors || {};
    expect(inquiryTicket.errors).toBeNull();
  });
  it('ivrID:check required Validation', () => {
    let errors: any = {};
    let ivrID = component.paymentIvrForm.controls['ivrID'];
    expect(ivrID.valid).toBeTruthy();
    errors = ivrID.errors || {};
    expect(ivrID.errors).toBeNull();
  });
  it('paymentAll:check required Validation', () => {
    let errors: any = {};
    let paymentAll = component.paymentIvrForm.controls['paymentAll'];
    expect(paymentAll.valid).toBeTruthy();
    errors = paymentAll.errors || {};
    expect(paymentAll.errors).toBeNull();
  });
  it('paymentAny:check required Validation', () => {
    let errors: any = {};
    let paymentAny = component.paymentIvrForm.controls['paymentAny'];
    expect(paymentAny.valid).toBeTruthy();
    errors = paymentAny.errors || {};
    expect(paymentAny.errors).toBeNull();
  });
  it('paymentItem:check required Validation', () => {
    let errors: any = {};
    let paymentItem = component.paymentIvrForm.controls['paymentItem'];
    expect(paymentItem.valid).toBeTruthy();
    errors = paymentItem.errors || {};
    expect(paymentItem.errors).toBeNull();
  });
  it('paymentList:check required Validation', () => {
    let errors: any = {};
    let paymentList = component.paymentIvrForm.controls['paymentList'];
    expect(paymentList.valid).toBeTruthy();
    errors = paymentList.errors || {};
    expect(paymentList.errors).toBeNull();
  });
  it('paymentListAny:check required Validation', () => {
    let errors: any = {};
    let paymentListAny = component.paymentIvrForm.controls['paymentListAny'];
    expect(paymentListAny.valid).toBeTruthy();
    errors = paymentListAny.errors || {};
    expect(paymentListAny.errors).toBeNull();
  });
  it('paymentListSpecial:check required Validation', () => {
    let errors: any = {};
    let paymentListSpecial =
      component.paymentIvrForm.controls['paymentListSpecial'];
    expect(paymentListSpecial.valid).toBeTruthy();
    errors = paymentListSpecial.errors || {};
    expect(paymentListSpecial.errors).toBeNull();
  });
  it('paymentRestore:check required Validation', () => {
    let errors: any = {};
    let paymentRestore = component.paymentIvrForm.controls['paymentRestore'];
    expect(paymentRestore.valid).toBeTruthy();
    errors = paymentRestore.errors || {};
    expect(paymentRestore.errors).toBeNull();
  });
  it('updateDateTime:check required Validation', () => {
    let errors: any = {};
    let updateDateTime = component.paymentIvrForm.controls['updateDateTime'];
    expect(updateDateTime.valid).toBeTruthy();
    errors = updateDateTime.errors || {};
    expect(updateDateTime.errors).toBeNull();
  });
  it('updateUserId:check required Validation', () => {
    let errors: any = {};
    let updateUserId = component.paymentIvrForm.controls['updateUserId'];
    expect(updateUserId.valid).toBeTruthy();
    errors = updateUserId.errors || {};
    expect(updateUserId.errors).toBeNull();
  });
  it('Form should be valid if getIvrList API is not called', () => {
    component.paymentIvrForm.controls['cardsVisaMasterCard'].setValue('N');
    component.paymentIvrForm.controls['cardsDiscover'].setValue('N');
    component.paymentIvrForm.controls['cardsAmex'].setValue('N');
    component.paymentIvrForm.controls['creditClPhoneFee'].setValue('0.00');
    component.paymentIvrForm.controls['creditClPhoneSurcharge'].setValue(
      '0.0000'
    );
    component.paymentIvrForm.controls['inquiryCollate'].setValue('N');
    component.paymentIvrForm.controls['inquiryFee'].setValue('N');
    component.paymentIvrForm.controls['inquiryFleet'].setValue('N');
    component.paymentIvrForm.controls['inquiryIPP'].setValue('N');
    component.paymentIvrForm.controls['inquiryLicense'].setValue('N');
    component.paymentIvrForm.controls['inquiryNotice'].setValue('N');
    component.paymentIvrForm.controls['inquiryPlate'].setValue('N');
    component.paymentIvrForm.controls['inquiryTicket'].setValue('N');
    component.paymentIvrForm.controls['inquiryRedlight'].setValue('N');
    component.paymentIvrForm.controls['creditClNoticeFlag'].setValue('N');
    component.paymentIvrForm.controls['creditClCheckDigit'].setValue('N');
    component.paymentIvrForm.controls['paymentItem'].setValue('N');
    component.paymentIvrForm.controls['paymentAll'].setValue('N');
    component.paymentIvrForm.controls['paymentRestore'].setValue('N');
    component.paymentIvrForm.controls['paymentListAny'].setValue('N');
    component.paymentIvrForm.controls['paymentList'].setValue('N');
    component.paymentIvrForm.controls['paymentAny'].setValue('N');
    component.paymentIvrForm.controls['paymentListSpecial'].setValue('N');
    component.paymentIvrForm.controls['creditClCompressFlag'].setValue('N');
    component.paymentIvrForm.controls['creditClWebFee'].setValue('0.00');
    component.paymentIvrForm.controls['creditClWebSurcharge'].setValue(
      '0.0000'
    );
    expect(component.paymentIvrForm.valid).toBeTruthy();
  });
  it('getIvrList', () => {
    expect(component.responseData.length).toBeGreaterThan(0);
    component.getIvrList();
  });
  it('When getIvrList API is called but response is empty', () => {
    component.responseData.length=0;
    expect(component.responseData.length).toEqual(0);
    component.setDefaultValue();
  });
  12 / 7 / 2022;
  it('updatepaymentIvr', () => {
    component.paymentIvrForm.controls['cardsAmex'].setValue('Y');
    component.paymentIvrForm.controls['cardsDiscover'].setValue('Y');
    component.paymentIvrForm.controls['cardsVisaMasterCard'].setValue('Y');
    component.paymentIvrForm.controls['clientNumber'].setValue('c1');
    component.paymentIvrForm.controls['contractId'].setValue(2);
    component.paymentIvrForm.controls['createDateTime'].setValue('2022-05-11T05:22:26.11');
    component.paymentIvrForm.controls['createUserId'].setValue(2);
    component.paymentIvrForm.controls['creditClCheckDigit'].setValue('Y');
    component.paymentIvrForm.controls['creditClCompressFlag'].setValue('Y');
    component.paymentIvrForm.controls['creditClNoticeFlag'].setValue('Y');
    component.paymentIvrForm.controls['creditClNumber'].setValue('A1');
    component.paymentIvrForm.controls['creditClPhoneFee'].setValue(4444.33);
    component.paymentIvrForm.controls['creditClPhoneSurcharge'].setValue(444.2355);
    component.paymentIvrForm.controls['creditClWebFee'].setValue(444.55);
    component.paymentIvrForm.controls['creditClWebSurcharge'].setValue(444.1234);
    component.paymentIvrForm.controls['inquiryCollate'].setValue('Y');
    component.paymentIvrForm.controls['inquiryFee'].setValue('Y');
    component.paymentIvrForm.controls['inquiryFleet'].setValue('Y');
    component.paymentIvrForm.controls['inquiryIPP'].setValue('Y');
    component.paymentIvrForm.controls['inquiryLicense'].setValue('Y');
    component.paymentIvrForm.controls['inquiryNotice'].setValue('Y');
    component.paymentIvrForm.controls['inquiryPlate'].setValue('Y');
    component.paymentIvrForm.controls['inquiryRedlight'].setValue('Y');
    component.paymentIvrForm.controls['inquiryTicket'].setValue('Y');
    component.paymentIvrForm.controls['ivrID'].setValue(1);
    component.paymentIvrForm.controls['paymentAll'].setValue('Y');
    component.paymentIvrForm.controls['paymentAny'].setValue('Y');
    component.paymentIvrForm.controls['paymentItem'].setValue('Y');
    component.paymentIvrForm.controls['paymentList'].setValue('Y');
    component.paymentIvrForm.controls['paymentListAny'].setValue('Y');
    component.paymentIvrForm.controls['paymentListSpecial'].setValue('Y');
    component.paymentIvrForm.controls['paymentRestore'].setValue('Y');
    component.paymentIvrForm.controls['updateDateTime'].setValue('2022-07-12T15:38:19.607');
    component.paymentIvrForm.controls['updateUserId'].setValue(2);

    expect(component.paymentIvrForm.valid).toBeTruthy();
    let data = {
      cardsAmex: 'Y',
      cardsDiscover: 'Y',
      cardsVisaMasterCard: 'N',
      clientNumber: 'c1',
      contractId: 2,
      creditClCheckDigit: 'Y',
      creditClCompressFlag: 'Y',
      creditClNoticeFlag: 'Y',
      creditClNumber: 'A1',
      creditClPhoneFee: 4444.33,
      creditClPhoneSurcharge: 444.2355,
      creditClWebFee: 444.55,
      creditClWebSurcharge: 444.1234,
      inquiryCollate: 'Y',
      inquiryFee: 'Y',
      inquiryFleet: 'Y',
      inquiryIPP: 'Y',
      inquiryLicense: 'Y',
      inquiryNotice: 'Y',
      inquiryPlate: 'Y',
      inquiryRedlight: 'Y',
      inquiryTicket: 'Y',
      ivrId: 1,
      paymentAll: 'Y',
      paymentAny: 'Y',
      paymentItem: 'Y',
      paymentList: 'Y',
      paymentListAny: 'Y',
      paymentListSpecial: 'Y',
      paymentRestore: 'Y',
    };
    component.updatepaymentIvr(data);
  });
  it('transformTotal value is empty', () => {
    let input = 'creditClPhoneSurcharge';
    component.transformTotal(input);
  });
  it('transformTotal value is not empty', () => {
    let input = 'creditClPhoneSurcharge';
    component.paymentIvrForm.controls[input].setValue(null);
    component.transformTotal(input);
  });
  it('transformTotalFee value is empty', () => {
    let input = 'creditClPhoneFee';
    component.transformTotalFee(input);
  });
  it('transformTotalFee value is not empty', () => {
    let input = 'creditClPhoneFee';
    component.paymentIvrForm.controls[input].setValue(null);
    component.transformTotalFee(input);
  });
});
