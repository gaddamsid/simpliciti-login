import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
import { Sort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { AdminSectionsComponent } from './admin-sections.component';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { AdminSectionServiceStub } from 'src/app/shared/testCasesHelperClasses/AdminSectionStub/AdminSectionServiceStub';

describe('AdminSectionsComponent', () => {
  let component: AdminSectionsComponent;
  let fixture: ComponentFixture<AdminSectionsComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let error: any = {};
  let inputElement: HTMLInputElement;
  let formData = {
    lastChangeDate: null,
    lastChangeUser: null,
    sectionTypesName: 1,
    sectionsDescription: null,
    sectionsName: "TestUT",
    sectionsPrimaryAct: null,
    sectionsPrimarySection: null,
    sectionsPrimarySubSection: null,
    sectionsSecondaryAct: null,
    sectionsSecondaryCameraType: null,
    sectionsSecondaryParagraph: null,
    sectionsSecondarySection: null,
    sectionsSecondarySubSection: null,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSectionsComponent ],
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
        // { provide: TranslateService, useClass:TranslateServiceStub},
        { provide: LanguageService, useClass:languageServiceStub},
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ValidationService, useValue: ValidationServiceStub},
        { provide: MessageService, useClass: messageServiceStub},
        { provide: ApiService, useClass: AdminSectionServiceStub}
      ]
    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Admin Sections');
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
    expect(component.AdminSecForm.valid).toBeFalsy();
  });

  it('Check required validations for sectionsName', () => {
    // let error: any = {};
    let actionsName = component.AdminSecForm.controls['sectionsName'];
    expect(actionsName.valid).toBeFalsy();     // when no value is entered
    error = actionsName.errors || {};
    expect(error['required']).toBeTruthy();
    actionsName.setValue("Sections Name");                 // after setting the value
    fixture.detectChanges();
    expect(actionsName.valid).toBeTruthy();
  });

  it('Check required validations for sectionTypesName', () => {
    // let error: any = {};
    let actionsName = component.AdminSecForm.controls['sectionTypesName'];
    expect(actionsName.valid).toBeFalsy();     // when no value is entered
    error = actionsName.errors || {};
    expect(error['required']).toBeTruthy();
    actionsName.setValue("Section Types Name");                 // after setting the value
    fixture.detectChanges();
    expect(actionsName.valid).toBeTruthy();
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

  it('should return list', () => {
    component.getData();
    fixture.detectChanges();
    // expect(component.dataSource.data).toEqual(AssignAgencyList);
    expect(component.dataSource.data.length).toBe(56);
    expect(component.sort.disableClear).toBeTruthy();
  });

  it('showAddFormPage', () => {
    expect(component).toBeTruthy();
    component.showAddFormPage();
    expect(component.showAddForm).toBe(true);
    expect(component.addBtn).toBe(true);
    expect(component.showEditForm).toBe(false);
  });

  it('sectionTypeslist', () => {
    fixture.detectChanges();
    let event = { value: 1 }
    component.sectionTypeslist(event);
    component.sectionTypes = [{ sectionTypesID: 1 }];
    expect(component.sectionTypes[0].sectionTypesID).toEqual(event.value);
  });

  it('SecondaryCameralist', () => {
    fixture.detectChanges();
    let event = { value: 'Vitronic' }
    component.SecondaryCameralist(event);
    component.secondarycameraTypes = [{ cameraTypesName: 'Vitronic' }];
    expect(component.secondarycameraTypes[0].cameraTypesName).toEqual(event.value);
  })

  it('should execute addData method', () => {
    expect(component.searchString.nativeElement.value).toBe("");
    let sectionsName = component.AdminSecForm.controls['sectionsName'];
    sectionsName.setValue(formData.sectionsName); 
    let sectionTypesName = component.AdminSecForm.controls['sectionTypesName'];
    sectionTypesName.setValue(formData.sectionTypesName);
    expect(component.AdminSecForm.valid).toBeTruthy();
    component.addData(formData);
  });

  it('cancelAdd_Save', () => {
    component.cancelAdd_Save();
    expect(component.showAddForm).toBe(false);
    expect(component.searchString.nativeElement.value).toBe('');
    expect(component.isShown).toBe(false);
    component.getData();
  });

  let editData = 62;

  it('editIconClicked', () => {
    component.editIconClicked(editData);
    expect(component.showEditForm).toBeTrue();
    expect(component.showAddForm).toBeTrue();
    expect(component.addBtn).toBeFalse();
    expect(component.isShown).toBeFalse();
  });

  it('should execute updateRecord method', () => {
    component.editIconClicked(editData);
    expect(component.searchString.nativeElement.value).toBe("");
    let sectionsName = component.AdminSecForm.controls['sectionsName'];
    sectionsName.setValue(formData.sectionsName); 
    let sectionTypesName = component.AdminSecForm.controls['sectionTypesName'];
    sectionTypesName.setValue(formData.sectionTypesName);
    expect(component.AdminSecForm.valid).toBeTruthy();
    component.updateRecord(formData);
  });

  it('toggleShow',()=>{
    component.isShown = true;
    component.toggleShow();
    expect(component.isShown).toBeFalsy();
  });

  it('toggleType if status is true', () => {
    let id = 62;
    let status = true;
    spyOn(window,"confirm").and.returnValue(true);
    component.toggleType(id, status);
    expect(id).toEqual(62);
  })

  it('toggleType if status is false', () => {
    let id = 62;
    let status = false;
    spyOn(window,"confirm").and.returnValue(true);
    component.toggleType(id, status);
    expect(id).toEqual(62);
  })

  it('error response when code is 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "sectionType",
            "code": "5000",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.AdminSecForm.valid).toBeFalse();
  })

  it('error response when message is DuplicateKey and code 5000', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "sectionType",
            "code": "5000",
            "message": "DuplicateKey"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.AdminSecForm.valid).toBeFalse();
  })

  it('error response when code is not 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "sectionType",
            "code": "400",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.AdminSecForm.valid).toBeFalse();
  })

});
