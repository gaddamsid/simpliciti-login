import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { PhoneExtensionComponent } from './phone-extension.component';
import { ApiService } from 'src/app/shared/services/api.service';
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
import { MatIconModule } from '@angular/material/icon'
import { PhoneExtensionList } from 'src/app/shared/testCasesHelperClasses/PhoneExtensionStub/PhoneExtensionMockList';
import { PhoneExtServiceStub } from 'src/app/shared/testCasesHelperClasses/PhoneExtensionStub/PhoneExtServiceStub';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('PhoneExtensionComponent', () => {
  let component: PhoneExtensionComponent;
  let fixture: ComponentFixture<PhoneExtensionComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let error: any = {};
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneExtensionComponent ],
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
        { provide: ApiService, useClass: PhoneExtServiceStub},
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
    fixture = TestBed.createComponent(PhoneExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Phone Extensions');
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

  it('get phoneExt should return a value', () => {
    component.phoneExt;
    component.PhoneExtForm.controls["phoneExt"].setValue('121');
    expect(component.phoneExt).toBeTruthy();
  });

  it('get seqNo should return a value', () => {
    component.seqNo;
    component.PhoneExtForm.controls["seqNo"].setValue('12');
    expect(component.seqNo).toBeTruthy();
  });

  it('get isActive should return a value', () => {
    component.isActive;
    component.PhoneExtForm.controls["isActive"].setValue('Y');
    expect(component.isActive).toBeTruthy();
  });

  xit('get modifiedBy should return a value', () => {
    component.modifiedBy
    component.modifiedBy.setValue('Test');
    // component.PhoneExtForm.controls["modifiedBy"].setValue('Test');
    expect(component.modifiedBy).toBeTruthy();
  });

  xit('get modifiedOn should return a value', () => {
    component.modifiedOn;
    component.PhoneExtForm.controls["modifiedOn"].setValue('2 May, 2022');
    expect(component.modifiedOn).toBeTruthy();
  });

  it('should return list', () => {
    component.getData();
    fixture.detectChanges();
    expect(component.dataSource.data).toBe(PhoneExtensionList);
    expect(component.dataSource.data.length).toBe(12);
    expect(component.sort.disableClear).toBeTruthy();
  });

  it('Form should be invalid',()=>{
    expect(component.PhoneExtForm.valid).toBeFalsy();
  });

  it('Check required validations for isActive', () => {
    // let error: any = {};
    let isActive = component.PhoneExtForm.controls['isActive'];
    expect(isActive.valid).toBeFalsy();     // when no value is entered
    error = isActive.errors || {};
    expect(error['required']).toBeTruthy();
    isActive.setValue("Y");                 // after setting the value
    fixture.detectChanges();
    expect(isActive.valid).toBeTruthy();
  });

  it('Check required validations for phoneExt', () => {
    let phoneExt = component.PhoneExtForm.controls['phoneExt'];
    expect(phoneExt.valid).toBeFalsy();     // when no value is entered
    error = phoneExt.errors || {};
    expect(error['required']).toBeTruthy();
    phoneExt.setValue("1234");              // after setting the value
    fixture.detectChanges();
    expect(phoneExt.valid).toBeTruthy();
  });

  it('format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    component.getData();
    fixture.detectChanges();
    inputElement.value = 'abC'; 
    fixture.detectChanges();
    const event = new KeyboardEvent('keyup', { key: 'C' });
    inputElement.dispatchEvent(event);
    component.applyFilter(event);
    let searchData= (event.target as HTMLInputElement).value;
    expect(searchData.trim().toLowerCase()).toBe('abc');
    expect(component.dataSource.filter).toEqual('abc');
    expect(inputElement.value).toBe('abC');
    component.filterData();
    expect(component.dataSource.filter).toBe('abc');
  });

  it('showAddFormPage', () => {
    expect(component).toBeTruthy();
    component.showAddFormPage();
    expect(component.showAddForm).toBe(true);
    expect(component.addBtn).toBe(true);
    expect(component.showEditForm).toBe(false);
  });

  it('cancelAdd_Save', () => {
    component.cancelAdd_Save();
    expect(component.showAddForm).toBeFalsy();
  })

  it('addData', () => {
    let addData = {
      isActive: "Y",
      phoneExt: "1111",
      seqNo: "2"
    }
    expect(component.searchString.nativeElement.value).toBe("");
    let isActive = component.PhoneExtForm.controls['isActive'];
    isActive.setValue(addData.isActive); 
    let phoneExt = component.PhoneExtForm.controls['phoneExt'];
    phoneExt.setValue(addData.phoneExt);  
    let seqNo = component.PhoneExtForm.controls['seqNo'];
    seqNo.setValue(addData.seqNo);
    expect(component.PhoneExtForm.valid).toBeTruthy();
    component.addData(addData);
  });

  let editData = {
    contractId: 2,
    createDatetime: "2022-05-25T13:36:16.807",
    createUserId: 1,
    isActive: "Y",
    isDeleted: "N",
    modifiedBy: "USERNAME",
    modifiedOn: "2022-05-25T13:36:16.803",
    phoneExt: "4444",
    phoneExtensionId: 13,
    seqNo: 44,
    updateDatetime: "2022-05-25T13:36:16.807",
    updateUserId: 1
  }

  it('editIconClicked', () => {
    component.editIconClicked(editData);
    expect(component.addBtn).toBeFalsy();
    expect(component.showEditForm).toBeTruthy();
    let isActive = component.PhoneExtForm.controls['isActive'];
    isActive.setValue(editData.isActive); 
    let phoneExt = component.PhoneExtForm.controls['phoneExt'];
    phoneExt.setValue(editData.phoneExt);  
    let seqNo = component.PhoneExtForm.controls['seqNo'];
    seqNo.setValue(editData.seqNo);
  });

  it('updateRecord', () => {
    let updateData = {
      isActive: "Y",
      phoneExt: "1111",
      seqNo: "2",
      phoneExtensionId: 12
    }
    component.editIconClicked(editData);
    expect(component.searchString.nativeElement.value).toBe("");
    let isActive = component.PhoneExtForm.controls['isActive'];
    isActive.setValue(updateData.isActive); 
    let phoneExt = component.PhoneExtForm.controls['phoneExt'];
    phoneExt.setValue(updateData.phoneExt);  
    let seqNo = component.PhoneExtForm.controls['seqNo'];
    seqNo.setValue(updateData.seqNo);
    expect(component.PhoneExtForm.valid).toBeTruthy();
    component.updateRecord(updateData);
  });

  it('deleteRecord', () => {
    let data = {
      isActive: "Y",
      phoneExt: "1111",
      seqNo: "2",
      phoneExtensionId: 12
    }
    spyOn(window,"confirm").and.returnValue(true);
    component.deleteRecord(data);
    expect(component.showAddForm).toBeFalsy();
  });

  it('error response when code is 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "phoneExtension",
            "code": "5000",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.PhoneExtForm.valid).toBeFalse();
  })

  it('error response when message is DuplicateKey and code 5000', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "phoneExtension",
            "code": "5000",
            "message": "DuplicateKey"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.PhoneExtForm.valid).toBeFalse();
  })

  it('error response when code is not 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "phoneExtension",
            "code": "400",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.PhoneExtForm.valid).toBeFalse();
  })

});
