import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { PaymentFeeService } from 'src/app/Services/PaymentFee/payment-fee.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { PaymentFeeServiceStub } from 'src/app/shared/testCasesHelperClasses/paymentFeeServiceStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { ValidationServiceStub } from 'src/app/shared/testCasesHelperClasses/ValidationServiceStub';
import { ValidationService } from 'src/app/shared/validation/validation.service';

import { PaymentFeeComponent } from './payment-fee.component';

describe('PaymentFeeComponent', () => {
  let component: PaymentFeeComponent;
  let fixture: ComponentFixture<PaymentFeeComponent>;
  let inputElement: HTMLInputElement;
  let formData: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentFeeComponent],
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
        MatFormFieldModule
      ],
      providers: [
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ValidationService, useClass: ValidationServiceStub },
        { provide: PaymentFeeService, useClass: PaymentFeeServiceStub },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFeeComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
    formData = {
      "chargeCode": 1,
      "chargeTypeLong": 'Boot fee',
      "chargeTypeShort": 'Boot',
      "chargeAmount": 76,
      "cashieringind": 'u',
      "contractId": 2,
      "violationaccountchargesId": 1,
      "active": 1,
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Payment Fee');
  })

  it('PaymentFeeForm form should be invalid when empty', () => {
    component.PaymentFeeForm.controls["chargeCode"].setValue('');
    component.PaymentFeeForm.controls["chargeTypeLong"].setValue('');
    component.PaymentFeeForm.controls["chargeTypeShort"].setValue('');
    component.PaymentFeeForm.controls["chargeAmount"].setValue('');
    component.PaymentFeeForm.controls["cashieringind"].setValue('');
    expect(component.PaymentFeeForm.valid).toBeFalsy();
  });

  it('PaymentFeeForm form should be valid when not empty', () => {
    component.PaymentFeeForm.controls["chargeCode"].setValue(1);
    component.PaymentFeeForm.controls["chargeTypeLong"].setValue('Boot fee');
    component.PaymentFeeForm.controls["chargeTypeShort"].setValue('Boot');
    component.PaymentFeeForm.controls["chargeAmount"].setValue(76);
    component.PaymentFeeForm.controls["cashieringind"].setValue('u');
    expect(component.PaymentFeeForm.valid).toBeTruthy();
  });

  it('transformTotal if value is empty', () => {
    let input = 'chargeCode';
    component.transformTotal(input);
    expect(component.PaymentFeeForm.controls["chargeCode"].value).toEqual("");
  })

  it('transformTotal if value is not empty', () => {
    let input = 'chargeCode';
    component.PaymentFeeForm.controls["chargeCode"].setValue(1);
    component.transformTotal(input);
    expect(component.PaymentFeeForm.controls["chargeCode"].value).toEqual("1.00");
  })

  it('announceSortChange', () => {
    let sortState: Sort = {
      direction: 'asc',
      active: 'true'
    }
    component.announceSortChange(sortState);
    expect(sortState.direction).toEqual('asc');
  })

  it('announceSortChange if direction is missing', () => {
    let sortState: Sort = {
      direction: '',
      active: 'true'
    }
    component.announceSortChange(sortState);
    expect(sortState.direction).toEqual('');
  })

  it('chargeCode', () => {
    component.chargeCode;
    expect(component.PaymentFeeForm.controls["chargeCode"].value).toEqual(null)
  })

  it('chargeTypeLong', () => {
    component.chargeTypeLong;
    expect(component.PaymentFeeForm.controls["chargeTypeLong"].value).toEqual('')
  })

  it('chargeTypeShort', () => {
    component.chargeTypeShort;
    expect(component.PaymentFeeForm.controls["chargeTypeShort"].value).toEqual('')
  })

  it('chargeAmount', () => {
    component.chargeAmount;
    expect(component.PaymentFeeForm.controls["chargeAmount"].value).toEqual('')
  })

  it('cashieringind', () => {
    component.cashieringind;
    expect(component.PaymentFeeForm.controls["cashieringind"].value).toEqual('')
  })

  it('apply filter, format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    component.getList();
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
  });

  it('Addpayment', () => {
    component.Addpayment();
    expect(component.showAddForm).toBeTruthy();
    expect(component.addBtn).toBeTruthy();
    expect(component.showEditForm).toBeFalsy();
  })

  it('cancelPayment', () => {
    component.cancelPayment();
    expect(component.showAddForm).toBeFalsy();
  })

  it('addPaymentFee', () => {
    component.PaymentFeeForm.controls["chargeCode"].setValue(1);
    component.PaymentFeeForm.controls["chargeTypeLong"].setValue('Boot fee');
    component.PaymentFeeForm.controls["chargeTypeShort"].setValue('Boot');
    component.PaymentFeeForm.controls["chargeAmount"].setValue(76);
    component.PaymentFeeForm.controls["cashieringind"].setValue('u');
    component.addPaymentFee(formData);
    expect(component.showAddForm).toBeFalsy();
  })

  it('editIconClicked', () => {
    component.editIconClicked(formData);
    expect(component.showAddForm).toBeTruthy();
    expect(component.showEditForm).toBeTruthy();
  })

  it('updatePaymentFeeRecord', () => {
    component.PaymentFeeForm.controls["chargeCode"].setValue(1);
    component.PaymentFeeForm.controls["chargeTypeLong"].setValue('Boot fee');
    component.PaymentFeeForm.controls["chargeTypeShort"].setValue('Boot');
    component.PaymentFeeForm.controls["chargeAmount"].setValue(76);
    component.PaymentFeeForm.controls["cashieringind"].setValue('u');
    component.editIconClicked(formData);
    component.updatePaymentFeeRecord(formData);
    expect(component.showAddForm).toBeFalsy();
  })

  it('deleteRecord', () => {
    component.deleteRecord(formData);
    expect(component.showAddForm).toBeFalsy();
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
});
