import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { messageServiceStub } from 'src/app/shared/testCasesHelperClasses/messageServiceStub';
import { ValidationServiceStub } from 'src/app/shared/testCasesHelperClasses/ValidationServiceStub';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { Sort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ClientPaymentMethodComponent } from './client-payment-method.component';
import { ClientPaymentMethodServiceStub } from 'src/app/shared/testCasesHelperClasses/PaymentsStub/ClientPaymentMethodServiceStub';
import { ClientPaymentMethodService } from 'src/app/Services/clientPaymentMethod/client-payment-method.service';

describe('ClientPaymentMethodComponent', () => {
  let component: ClientPaymentMethodComponent;
  let fixture: ComponentFixture<ClientPaymentMethodComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let error: any = {};
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPaymentMethodComponent ],
      imports: [
        HttpClientTestingModule,
        TranslateStubsModule,
        TranslateModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule
      ],
      providers: [
        { provide: ToastrService, useClass: ToasterServiceStub},
        { provide: ClientPaymentMethodService, useClass: ClientPaymentMethodServiceStub},
        // { provide: TranslateService, useClass:TranslateServiceStub},
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        {provide: ValidationService, useValue: ValidationServiceStub},
        {provide: MessageService, useClass: messageServiceStub},
        { provide: LanguageService, useClass: languageServiceStub },
      ]
    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Client Payment Method');
  });

  it('announceSortChange', () => {
    let sortState: Sort = {
      active:'true',
      direction: 'asc'
    }
    component.announceSortChange(sortState);
    expect(sortState.direction).toEqual('asc');
  });

  it('announceSortChange if direction is missing', () => {
    let sortState: Sort = {
      direction: '',
      active:'true'
    }
    component.announceSortChange(sortState);
    expect(sortState.direction).toEqual('');
  });

  it('Form should be invalid',()=>{
    expect(component.paymentForm.valid).toBeFalsy();
  });

  it('format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    component.getClientPaymentDetails();
    fixture.detectChanges();
    inputElement.value = 'abC'; 
    fixture.detectChanges();
    const event = new KeyboardEvent('keyup', { key: 'C' });
    inputElement.dispatchEvent(event);
    component.applyFilter(event);
    let searchData= (event.target as HTMLInputElement).value;
    expect(searchData.trim().toLowerCase()).toBe('abc');
    expect(component.datasource.filter).toEqual('abc');
    expect(inputElement.value).toBe('abC');
    component.filterData();
    expect(component.datasource.filter).toBe('abc');
  });

  it('Check required validations for PAYMENTMODECD', () => {
    let PAYMENTMODECD = component.paymentForm.controls['PAYMENTMODECD'];
    expect(PAYMENTMODECD.valid).toBeFalsy();     // when no value is entered
    error = PAYMENTMODECD.errors || {};
    expect(error['required']).toBeTruthy();
    PAYMENTMODECD.setValue("F12345");                 // after setting the value
    fixture.detectChanges();
    expect(PAYMENTMODECD.valid).toBeTruthy();
  });

  it('Check required validations for paymentModeDesc', () => {
    let paymentModeDesc = component.paymentForm.controls['paymentModeDesc'];
    expect(paymentModeDesc.valid).toBeFalsy();     // when no value is entered
    error = paymentModeDesc.errors || {};
    expect(error['required']).toBeTruthy();
    paymentModeDesc.setValue("F12345");                 // after setting the value
    fixture.detectChanges();
    expect(paymentModeDesc.valid).toBeTruthy();
  });

  it('Check required validations for paymentModeDesc', () => {
    let paymentOpenDrawer = component.paymentForm.controls['paymentOpenDrawer'];
    expect(paymentOpenDrawer.valid).toBeFalsy();     // when no value is entered
    error = paymentOpenDrawer.errors || {};
    expect(error['required']).toBeTruthy();
    paymentOpenDrawer.setValue("F12345");                 // after setting the value
    fixture.detectChanges();
    expect(paymentOpenDrawer.valid).toBeTruthy();
  });

  it('addPayment', () => {
    expect(component).toBeTruthy();
    component.addPayment();
    expect(component.showAddForm).toBe(true);
  });

  it('should execute paymentMethodSelected method', () => {
    fixture.detectChanges();
    let payMethod = { value: 161 }
    component.paymentMethods = [{ paymentModeMasterId: 161, paymentModeCD: "CB" }];
    component.paymentMethodSelected(payMethod);
    expect(component.paymentMethods[0].paymentModeMasterId).toEqual(payMethod.value);
  });

  it('should execute submitForm method', () => {
    let PAYMENTMODECD = component.paymentForm.controls['PAYMENTMODECD'];
    PAYMENTMODECD.setValue(161); 
    let paymentModeDesc = component.paymentForm.controls['paymentModeDesc'];
    paymentModeDesc.setValue("CASH - BOND");  
    let paymentOpenDrawer = component.paymentForm.controls['paymentOpenDrawer'];
    paymentOpenDrawer.setValue("Y");
    expect(component.paymentForm.valid).toBeTruthy();
    let payMethod = { value: 161 }
    component.paymentMethods = [{ paymentModeMasterId: 161, paymentModeCD: "CB" }];
    expect(component.paymentMethods[0].paymentModeMasterId).toEqual(payMethod.value);
    component.submitForm();
  });

  it('cancelAdding', () => {
    component.cancelAdding();
    expect(component.showAddForm).toBeFalsy();
    expect(component.showEditForm).toBeFalsy();
  });

  let editData = {
    active: 1,
    contractId: 2,
    createDatetime: "2022-06-29T12:17:29.06",
    createUserId: 1,
    isDeleted: "N",
    paymentModeCD: "TC",
    paymentModeDesc: "TRAVELERS CHECK",
    paymentModeId: 15,
    paymentModeMasterId: 172,
    paymentModeNCR: 2,
    paymentOpenDrawer: "N",
    updateDatetime: "2022-06-29T12:17:29.06",
    updateUserId: 1
  }

  it('editPayment', () => {
    component.editPayment(editData);
    expect(component.showEditForm).toBeTrue();
    expect(component.showAddForm).toBeTrue();
  });

  it('should execute savePayment method', () => {
    component.editPayment(editData);
    let PAYMENTMODECD = component.paymentForm.controls['PAYMENTMODECD'];
    PAYMENTMODECD.setValue(161); 
    let paymentModeDesc = component.paymentForm.controls['paymentModeDesc'];
    paymentModeDesc.setValue("CASH - BOND");  
    let paymentOpenDrawer = component.paymentForm.controls['paymentOpenDrawer'];
    paymentOpenDrawer.setValue("Y");
    expect(component.paymentForm.valid).toBeTruthy();
    let payMethod = { value: 161 }
    component.paymentMethods = [{ paymentModeMasterId: 161, paymentModeCD: "CB" }];
    expect(component.paymentMethods[0].paymentModeMasterId).toEqual(payMethod.value);
    component.savePayment();
  });

  it('should execute deletePayment method', () => {
    spyOn(window,"confirm").and.returnValue(true);
    component.deletePayment(editData);
    expect(component.showEditForm).toBeFalse();
    expect(component.showAddForm).toBeFalse();
  });

});
