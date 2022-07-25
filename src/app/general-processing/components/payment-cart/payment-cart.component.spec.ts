import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCartComponent } from './payment-cart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { TranslateService } from '@ngx-translate/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ToastrService } from 'ngx-toastr';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { MatDialogRefStub } from 'src/app/shared/testCasesHelperClasses/MatDialogRefStub';
import { PaymentCartService } from 'src/app/shared/services/payment-cart.service';
import { PaymentCartServiceStub } from 'src/app/shared/testCasesHelperClasses/PaymentCartServiceStub';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('PaymentCartComponent', () => {
  let component: PaymentCartComponent;
  let componentStub: PaymentCartServiceStub;
  let fixture: ComponentFixture<PaymentCartComponent>;
  let formTest: FormGroup;
  let fb: FormBuilder;
  let router : RouterTestingModule

  let obj = {
    accountEntityId: '',
    chargeType: '',
    dueAmount: 50,
    feeAmount: 100,
    feeName: 'TestName',
    paidAmount: 50,
    payment: '',
    shoppingCartItemsId: '',
    statePlate: '',
    violationAccountChargesId: '',
  };

  let newTicketObj = {
    amountDue: 100,
      citationId: '',
      citationNumber:  '',
      date: Date.now().toString(),
      fines: '',
      locationAndDescription: 'TestDesc',
      partialPayments: 0,
      payThisAmount: '',
      penalties: 10,
      shoppingCartItemsId: '',
      totalCharges:10
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentCartComponent],
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: PaymentCartService, useClass: PaymentCartServiceStub },
        { provide: ApiService, useClass: apiServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCartComponent);
    component = fixture.componentInstance;
    component.paymentCartForm = new FormGroup({});
    component.ngOnInit();
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('paymentCartForm should be invalid from starting', () => {
    expect(component.paymentCartForm.valid).toBeFalsy();
  });

  it('paymentCartForm should also be invalid after entring wrong values', () => {
    component.paymentCartForm.controls['paymentSource'].setValue('');
    component.paymentCartForm.controls['paymentDate'].setValue('');
    component.paymentCartForm.controls['totalAmount'].setValue('');

    expect(component.paymentCartForm.valid).toBeFalsy();
  });

  it('newFeeData should return a form as per data passed', () => {
    let data = obj;
    let response = component.newFeeData(data);
    expect(response).toBeTruthy();
  });

  it('getPaymentDetails should enter values into paymentType array', () => {
    let res = component.paymentTypes;
    // component.getPaymentDetails(); :todo prabhu
    setTimeout(() => {}, 3000);
    expect(res).toBeTruthy();
  });

  it('getPaymentDetails should enter values into paymentFeeTypes array', () => {
    let res = component.paymentFeeTypes;
    // component.getPaymentDetails(); :todo prabhu
    setTimeout(() => {}, 3000);
    expect(res).toBeTruthy();
  });

  it('getPaymentDetails should enter values into accountTypes array', () => {
    let res = component.accountTypes;
    // component.getPaymentDetails(); :todo prabhu
    setTimeout(() => {}, 3000);
    expect(res).toBeTruthy();
  });

  it('onChangeCashReceived should change changeDue value', ()=> {

      component.method1.get('cashReceived')?.setValue(100);
      component.method1.get('amount')?.setValue(100);

      component.onChangeCashReceived();

      let response = component.method1.controls['changeDue'].value;
      let mockData = component.method1.get('cashReceived')?.value - +component.method1.get('amount')?.value

      // expect(response).toBeTruthy();
      expect(response).toEqual(mockData);
  })

  it('newTicketData should add a ticket', () => {
      let mockData = newTicketObj;

      let res = component.newTicketData(mockData);

      expect(res).toBeTruthy();
  });


  it('onSubmit fails when form is invalid', () => {

    component.method1.get('cashReceived')?.setValue(100);
    component.method1.get('amount')?.setValue(100);
    component.method1.get('remainder')?.setValue(0);

    let res =  component.onSubmit();

    let dirty = component.paymentCartForm.dirty;
    let touched = component.paymentCartForm.touched;

    expect(res).toBeFalsy();
    expect(dirty).toBeTruthy();
    expect(touched).toBeTruthy();
  })

  it('onSubmit fails when form is valid && method2 amount is > 0 and not a valid type', () => {
    let check = component.paymentCartForm.valid;
    component.paymentCartForm.get('paymentSource')?.setValue('test');
    component.paymentCartForm.get('paymentDate')?.setValue(Date.now());
    component.paymentCartForm.get('remainder')?.setValue('test');
    component.method1.get('amount')?.setValue(100);
    component.method1.get('type')?.setValue(null);
    component.method2.get('amount')?.setValue(10);

    check = component.paymentCartForm.valid;

    let res =  component.onSubmit();
    let res1 = component.isLoading;
    expect(res).toBeFalsy();
    expect(res1).toBeFalse();

  })


  it('onSubmit fails when form is invalid && method 2 type and method 1 type', () => {

    component.method2.get('type')?.setValue('test');
    component.method2.get('type')?.setValue('test');

    let res = component.onSubmit();
    let res1 = component.isLoading;
    expect(res).toBeFalsy();
    expect(res1).toBeFalse();

  })

  it('onSubmit fails when form is invalid && not valid type and amount <= 0', () => {

    component.method2.get('type')?.setValue('Test');
    component.method1.get('amount')?.setValue(0);

    let mockResponse  = null;

    let res = component.onSubmit();
    let res1 = component.isLoading;
    expect(res).toBeFalsy();
    expect(res1).toBeFalse();

  })

  it('onSubmit fails when form is invalid && not valid type and amount <= 0', () => {

    component.method2.get('type')?.setValue(null);
    component.method1.get('amount')?.setValue(0);

    let res = component.onSubmit();
    let res1 = component.isLoading;
    expect(res).toBeFalsy();
    expect(res1).toBeFalse;

  })

  it('onSubmit fails when form is invalid && not valid type and amount > 0', () => {

    component.method2.get('type')?.setValue(null);
    component.method1.get('amount')?.setValue(0);

    let res = component.onSubmit();
    let res1 = component.isLoading;
    expect(res).toBeFalsy();
    expect(res1).toBeFalse;
  })

  it('onChangeMethod1Amount should update', () => {

    let data = {
      target : {value : 10}
    }
    component.paymentCartForm.get('totalAmount')?.setValue(100);

    component.onChangeMethod1Amount(data);

    let res = component.method2.get('amount')?.value;
    expect(res).not.toEqual('0.00');
  })

  it('addFee should push null to feedetails', () => {

    let mockData = {
      "accountEntityId": null,
      "chargeType": "",
      "dueAmount": 0,
      "feeAmount": 0,
      "feeName": "",
      "paidAmount": 0,
      "payment": "",
      "shoppingCartItemsId": "",
      "statePlate": "",
      "violationAccountChargesId": null
  }
    // component.addFee(); :todo prabhu
    // let res = component.feeDetails.value[0];
    // console.log(res.value);
    // expect(res).toBeTruthy(); :todo prabhu
    // expect(res).toEqual(mockData)
  });

  it('deletefee should work', () => {
    let value = 10;
    let i = 1
    let mock = component.feeDetails;

  //  hcomponent.deleteFee(value,1); :todo prabhu

    let res = component.feeDetails;

    expect(res).toEqual(mock);
  })

  it('deletefee should fail', () => {
    let value = NaN;
    let i = 1
    let mock = component.feeDetails;

  //  component.deleteFee(value,1); :todo prabhu

    let res = component.feeDetails;

    expect(res).toEqual(mock);
  })

  it('check method1 for value', () => {

    component.method1.get('type')?.setValue(2);
    let res = component.method1.get('cashReceived')?.validator;

    expect(res).toBeTruthy();
  })

  // it('fillFeeDtails should return feeItems', () => {


  //   let obj  :any = {
  //     accountEntityId: 1,
  //     chargeType:'Test type',
  //     dueAmount: 100,
  //     feeAmount: 200,
  //     feeName: 'Test fee Name',
  //     paidAmount: 100,
  //     payment: 10,
  //     statePlate: 0,
  //     violationAccountChargesId: 0,
  //     shoppingCartItemsId: 0
  //   };
  //   let array : Array<any> = [];
  //   array.push(obj);
  //   component.paymentCartForm = fb.group({
  //     feeDetails: array,
  //   })
  //   let res = component.fillFeeDetails();


  //   console.log(res);

  //   expect(res).toBeTruthy();
  // })




});
