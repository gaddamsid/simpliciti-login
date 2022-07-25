import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { AccountCodeService } from 'src/app/Services/AccountCode/account-code.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { AccountCodeServiceStub } from 'src/app/shared/testCasesHelperClasses/accountCodeServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { PaymentAccountcodeComponent } from './payment-accountcode.component';

describe('PaymentAccountcodeComponent', () => {
  let component: PaymentAccountcodeComponent;
  let fixture: ComponentFixture<PaymentAccountcodeComponent>;
  let inputElement: HTMLInputElement;
  let reqData: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentAccountcodeComponent],
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
        { provide: AccountCodeService, useClass: AccountCodeServiceStub },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAccountcodeComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
    reqData = {
      "accountTypesID": 1,
      "contractID": 2,
      "intAccountNumber": 11,
      "extAccountNumber": 10,
      "accountFullName": "abc",
      "accountShortName": "abc2",
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Account Code');
  })

  it('accountCodeForm should be invalid when empty', () => {
    component.accountCodeForm.controls["intaccountnumber"].setValue('');
    component.accountCodeForm.controls["extaccountnumber"].setValue('');
    component.accountCodeForm.controls["accountFullName"].setValue('');
    component.accountCodeForm.controls["accountShortName"].setValue('');
    expect(component.accountCodeForm.valid).toBeFalsy();
  });

  it('accountCodeForm should be valid when not empty', () => {
    component.accountCodeForm.controls["intaccountnumber"].setValue('2');
    component.accountCodeForm.controls["extaccountnumber"].setValue('2134');
    component.accountCodeForm.controls["accountFullName"].setValue('test');
    component.accountCodeForm.controls["accountShortName"].setValue('test');
    expect(component.accountCodeForm.valid).toBeTruthy();
  });

  it('apply filter, format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    component.getAccountcodeList();
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

  it('addaccountCode', () => {
    component.addaccountCode();
    expect(component.showaccountCode).toBeTruthy();
    expect(component.addCodeButton).toBeTruthy();
  })

  it('cancelAccount', () => {
    component.cancelAccount();
    expect(component.showaccountCode).toBeFalsy();
  })

  it('addAccountCodetype', () => {
    component.accountCodeForm.controls["intaccountnumber"].setValue('2');
    component.accountCodeForm.controls["extaccountnumber"].setValue('2134');
    component.accountCodeForm.controls["accountFullName"].setValue('test');
    component.accountCodeForm.controls["accountShortName"].setValue('test');
    component.addAccountCodetype(reqData);
    expect(component.showaccountCode).toBeFalsy();
  })

  it('editCode', () => {
   component.editCode(reqData);
   expect(component.addCodeButton).toBeFalsy();
   expect(component.showaccountCode).toBeTruthy();
  })

  it('deleteCode', () => {
    component.deleteCode(reqData);
    expect(component.showaccountCode).toBeFalsy();
  })

  it('updateAccountCodetype', () => {
    component.accountCodeForm.controls["intaccountnumber"].setValue('2');
    component.accountCodeForm.controls["extaccountnumber"].setValue('2134');
    component.accountCodeForm.controls["accountFullName"].setValue('test');
    component.accountCodeForm.controls["accountShortName"].setValue('test');
    component.editCode(reqData);
    component.updateAccountCodetype(reqData);
    expect(component.showaccountCode).toBeFalsy();
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
