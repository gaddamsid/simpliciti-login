import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
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
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { AssignAgencyComponent } from './assign-agency.component';
import { AssignAgencyServiceStub } from 'src/app/shared/testCasesHelperClasses/AssignAgencyStub/AssignAgencyServiceStub';

describe('AssignAgencyComponent', () => {
  let component: AssignAgencyComponent;
  let fixture: ComponentFixture<AssignAgencyComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let error: any = {};
  let inputElement: HTMLInputElement;
  let formData = {
    assignAgencyCode: "1234",
    assignAgencyName: "TestUT",
    assignAgencyNo: 28
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignAgencyComponent ],
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
        { provide: ApiService, useClass: AssignAgencyServiceStub},
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
    fixture = TestBed.createComponent(AssignAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Assign Agency');
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
    expect(component.assignAgencyForm.valid).toBeFalsy();
  });

  it('Check required validations for assignAgencyCode', () => {
    // let error: any = {};
    let assignAgencyCode = component.assignAgencyForm.controls['assignAgencyCode'];
    expect(assignAgencyCode.valid).toBeFalsy();     // when no value is entered
    error = assignAgencyCode.errors || {};
    expect(error['required']).toBeTruthy();
    assignAgencyCode.setValue("F12345");                 // after setting the value
    fixture.detectChanges();
    expect(assignAgencyCode.valid).toBeTruthy();
  });

  it('Check required validations for assignAgencyName', () => {
    // let error: any = {};
    let assignAgencyName = component.assignAgencyForm.controls['assignAgencyName'];
    expect(assignAgencyName.valid).toBeFalsy();     // when no value is entered
    error = assignAgencyName.errors || {};
    expect(error['required']).toBeTruthy();
    assignAgencyName.setValue("Y");                 // after setting the value
    fixture.detectChanges();
    expect(assignAgencyName.valid).toBeTruthy();
  });

  it('format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    component.getassignAgency();
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

  it('should return list', () => {
    component.getassignAgency();
    fixture.detectChanges();
    // expect(component.dataSource.data).toEqual(AssignAgencyList);
    expect(component.dataSource.data.length).toBe(19);
    expect(component.sort.disableClear).toBeTruthy();
  });

  it('showAddFormPage', () => {
    expect(component).toBeTruthy();
    component.showAddFormPage();
    expect(component.showAddForm).toBe(true);
  });

  it('should execute addAssignAgency method', () => {
    expect(component.searchString.nativeElement.value).toBe("");
    let assignAgencyNo = component.assignAgencyForm.controls['assignAgencyNo'];
    assignAgencyNo.setValue(formData.assignAgencyNo); 
    let assignAgencyCode = component.assignAgencyForm.controls['assignAgencyCode'];
    assignAgencyCode.setValue(formData.assignAgencyCode);  
    let assignAgencyName = component.assignAgencyForm.controls['assignAgencyName'];
    assignAgencyName.setValue(formData.assignAgencyName);
    expect(component.assignAgencyForm.valid).toBeTruthy();
    component.addAssignAgency(formData);
  });

  it('cancelAdd_Save', () => {
    component.cancelAdd_Save();
    expect(component.showAddForm).toBeFalsy();
    expect(component.showEditForm).toBeFalsy();
  });

  let editData = {
    assignAgencyCode: "1234",
    assignAgencyId: 131,
    assignAgencyName: "TestUT",
    assignAgencyNo: 28,
    contractId: 2,
    createDateTime: "2022-07-06T09:25:19.927",
    createUserId: 1,
    isDeleted: "N",
    updateUserId: 1,
    updatedDateTime: "2022-07-06T09:25:19.927",
  }

  it('editIconClicked', () => {
    component.editIconClicked(editData);
    expect(component.showEditForm).toBeTrue();
  });

  it('updateRecord', () => {
    component.editIconClicked(editData);
    expect(component.searchString.nativeElement.value).toBe("");
    let assignAgencyNo = component.assignAgencyForm.controls['assignAgencyNo'];
    assignAgencyNo.setValue(formData.assignAgencyNo); 
    let assignAgencyCode = component.assignAgencyForm.controls['assignAgencyCode'];
    assignAgencyCode.setValue(formData.assignAgencyCode);  
    let assignAgencyName = component.assignAgencyForm.controls['assignAgencyName'];
    assignAgencyName.setValue(formData.assignAgencyName);
    expect(component.assignAgencyForm.valid).toBeTruthy();
    component.updateAssignAgency(formData);
  });

  it('deleteRecord', () => {
    let id = 131
    spyOn(window,"confirm").and.returnValue(true);
    component.deleteAssignAgency(id);
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
            "fieldName": "assignAgency",
            "code": "5000",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.assignAgencyForm.valid).toBeFalse();
  })

  it('error response when message is DuplicateKey and code 5000', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "assignAgency",
            "code": "5000",
            "message": "DuplicateKey"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.assignAgencyForm.valid).toBeFalse();
  })

  it('error response when code is not 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "assignAgency",
            "code": "400",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.assignAgencyForm.valid).toBeFalse();
  })

});
