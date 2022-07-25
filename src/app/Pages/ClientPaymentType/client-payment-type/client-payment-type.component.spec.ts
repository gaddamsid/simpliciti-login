import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientPaymentTypeComponent } from './client-payment-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { ClientPaymentTypeServiceStub } from 'src/app/shared/testCasesHelperClasses/clientPaymentTypeServiceStub';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { ClientPaymentTypeService } from 'src/app/Services/ClientPaymentType/client-payment-type.service';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { ValidationServiceStub } from 'src/app/shared/testCasesHelperClasses/ValidationServiceStub';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { By } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('ClientPaymentTypeComponent', () => {
  let component: ClientPaymentTypeComponent;
  let fixture: ComponentFixture<ClientPaymentTypeComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientPaymentTypeComponent],
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
        { provide: ClientPaymentTypeService, useClass: ClientPaymentTypeServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPaymentTypeComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Client Payment Type');
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

  it('paymentSourceShortName', () => {
    component.paymentSourceShortName;
    expect(component.clientPaytypeForm.controls['paymentSourceShortName'].value).toBeDefined();
  })

  it('paymentSourceLongName', () => {
    component.paymentSourceLongName;
    expect(component.clientPaytypeForm.controls['paymentSourceLongName'].value).toBeDefined();
  })

  it('acctNumberInt', () => {
    component.acctNumberInt;
    expect(component.clientPaytypeForm.controls['acctNumberInt'].value).toBeDefined();
  })

  it('addClientpay', () => {
    component.addClientpay();
    expect(component.showAddForm).toBeTruthy();
    expect(component.addclientPaytypeFormbtn).toBeTruthy();
  })

  it('cancelClientpay', () => {
    component.cancelClientpay();
    expect(component.showAddForm).toBeFalsy();
  })

  it('addClientPayType', () => {
    component.clientPaytypeForm.controls['paymentSourceShortName'].setValue('test');
    component.clientPaytypeForm.controls['paymentSourceLongName'].setValue('test');
    component.clientPaytypeForm.controls['acctNumberInt'].setValue(20);
    component.addClientPayType(component.clientPaytypeForm.value);
    expect(component.successMsg).toEqual('Record Added Successfully');
  })

  it('clientPaymentSelected', () => {
    let event = {
      value: 'test'
    }
    component.addClientpay();
    component.clientPaymentSelected(event);
    expect(component.clientPaytypeForm.controls['paymentSourceLongName'].value).toEqual('test');
  })

  it('editClientpay', () => {
    component.clientPaytypeForm.controls['paymentSourceShortName'].setValue('test');
    component.clientPaytypeForm.controls['paymentSourceLongName'].setValue('test');
    component.clientPaytypeForm.controls['acctNumberInt'].setValue(20);
    component.editClientpay(component.clientPaytypeForm.value);
    expect(component.showAddForm).toBeTruthy();
    expect(component.showEditForm).toBeTruthy();
  })

  it('updateclientPay', () => {
    component.clientPaytypeForm.controls['paymentSourceShortName'].setValue('test');
    component.clientPaytypeForm.controls['paymentSourceLongName'].setValue('test');
    component.clientPaytypeForm.controls['acctNumberInt'].setValue(20);
    component.editClientpay(component.clientPaytypeForm.value)
    component.updateclientPay(component.clientPaytypeForm.value);
    expect(component.showAddForm).toBeFalsy();
    expect(component.welcome).toEqual('Record Updated Successfully');
  })

  it('deleteClientpay', () => {
    let data = {
      paymentSourceId: 1
    }
    component.deleteClientpay(data);
    expect(component.showAddForm).toBeFalsy();
    expect(component.successMsg).toEqual('Record Deleted Successfully')
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
          "fieldName": 'paymentSourceShortName',
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
