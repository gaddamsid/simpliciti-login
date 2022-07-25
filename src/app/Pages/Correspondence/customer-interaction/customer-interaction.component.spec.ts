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
import { CustomerInteractionService } from 'src/app/Services/CustomerInteraction/customer-interaction.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { CustomerInteractionServiceStub } from 'src/app/shared/testCasesHelperClasses/customerInteractionServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { ValidationServiceStub } from 'src/app/shared/testCasesHelperClasses/ValidationServiceStub';
import { ValidationService } from 'src/app/shared/validation/validation.service';

import { CustomerInteractionComponent } from './customer-interaction.component';


describe('CustomerInteractionComponent', () => {
  let component: CustomerInteractionComponent;
  let fixture: ComponentFixture<CustomerInteractionComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerInteractionComponent],
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
        { provide: CustomerInteractionService, useClass: CustomerInteractionServiceStub },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInteractionComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag when showSettingForm will be false', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Customer Interaction');
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

  it('profileGroup form should be invalid when empty', () => {
    component.profileGroup.controls["code"].setValue('');
    component.profileGroup.controls["desc"].setValue('');
    expect(component.profileGroup.valid).toBeFalsy();
  });

  it('profileGroup form should be valid when not empty', () => {
    component.profileGroup.controls["code"].setValue('1');
    component.profileGroup.controls["desc"].setValue('name');
    expect(component.profileGroup.valid).toBeTruthy();
  });

  it('get code should return a value', () => {
    component.code;
    component.profileGroup.controls["code"].setValue('1');
    expect(component.code).toBeTruthy();
  });

  it('get desc should return a value', () => {
    component.desc;
    component.profileGroup.controls["desc"].setValue('name');
    expect(component.desc).toBeTruthy();
  });

  it('addCustomerInteraction method should execute', () => {
    let data: any = {
      "customerInteractionId": 1,
      "contractId": 1,
      "createUserId": 2,
      "updateUserId": 2,
      "createDateTime": "2022-06-08T08:18:30.6",
      "updatedDateTime": "2022-06-08T08:18:30.6",
      "customerInteractionCode": "I",
      "customerInteractionText": "Internet",
      "active": 1,
      "isDeleted": "N"
    }
    component.addCustomerInteraction(data)
    expect(component.showAddForm).toBeFalsy();
  })

  it('addcustomerintractiontable', () => {
    component.addcustomerintractiontable();
    expect(component.showAddForm).toBeTruthy();
    expect(component.showEditForm).toBeFalsy();
  })

  it('cancelCustomerInteraction', () => {
    component.cancelCustomerInteraction();
    expect(component.showAddForm).toBeFalsy();
  })

  it('editCustomer method should execute', () => {
    let data: any = {
      "customerInteractionId": 1,
      "contractId": 1,
      "createUserId": 2,
      "updateUserId": 2,
      "createDateTime": "2022-06-08T08:18:30.6",
      "updatedDateTime": "2022-06-08T08:18:30.6",
      "customerInteractionCode": "I",
      "customerInteractionText": "Internet",
      "active": 1,
      "isDeleted": "N"
    }
    component.editCustomer(data);
    expect(component.showAddForm).toBeTruthy();
    expect(component.showEditForm).toBeTruthy();
  })

  it('updateCustomer method should execute', () => {
    let data: any = {
      "customerInteractionId": 1,
      "contractId": 1,
      "createUserId": 2,
      "updateUserId": 2,
      "createDateTime": "2022-06-08T08:18:30.6",
      "updatedDateTime": "2022-06-08T08:18:30.6",
      "customerInteractionCode": "I",
      "customerInteractionText": "Internet",
      "active": 1,
      "isDeleted": "N"
    }
    component.profileGroup.controls["code"].setValue('1');
    component.profileGroup.controls["desc"].setValue('name');
    component.editData = data;
    component.updateCustomer(data);
    expect(component.showAddForm).toBeFalsy();
  })

  it('deleteCustomer method should execute', () => {
    let data: any = {
      "customerInteractionId": 1,
      "contractId": 1,
      "createUserId": 2,
      "updateUserId": 2,
      "createDateTime": "2022-06-08T08:18:30.6",
      "updatedDateTime": "2022-06-08T08:18:30.6",
      "customerInteractionCode": "I",
      "customerInteractionText": "Internet",
      "active": 1,
      "isDeleted": "N"
    }
    component.deleteCustomer(data);
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

});
