import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { MessageService } from '../../services/message.service';
import { ActionServiceStub } from '../../testCasesHelperClasses/Action-and-CategoriesStub/ActionServiceStub';
import { languageServiceStub } from '../../testCasesHelperClasses/languageServiceStub';
import { messageServiceStub } from '../../testCasesHelperClasses/messageServiceStub';
import { ToasterServiceStub } from '../../testCasesHelperClasses/ToasterServiceStub';
import { TranslateStubsModule } from '../../testCasesHelperClasses/TranslateStubsModule.module';
import { ValidationServiceStub } from '../../testCasesHelperClasses/ValidationServiceStub';
import { ValidationService } from '../../validation/validation.service';
import { LanguageService } from '../header/languages.service';

import { IncomingData, QueuesActionCategoryComponent } from './queues-action-category.component';
export class MatDialogMock {
  open() {
      return {
          close: () => of({})
      };
  }
}

describe('QueuesActionCategoryComponent', () => {
  let component: QueuesActionCategoryComponent;
  let fixture: ComponentFixture<QueuesActionCategoryComponent>;
  let error: any = {};
  let actionFormData: any;
  const formGroupDirective = new FormGroupDirective([], []);
  let dialog: MatDialogRef<QueuesActionCategoryComponent>;
  let inputElement: HTMLInputElement;
  let queueData:IncomingData = {actionForm: true,
    categoryForm: false,
    bahaviorQueuesID: 132,
    QData: {}}
  let editData = {
    "actionsModel": {
      "createUserID": 0,
      "updateUserID": 0,
      "createDatetime": "2022-04-27T10:00:20.245Z",
      "updateDatetime": "2022-04-27T10:00:20.245Z",
      "isDeleted": "N",
      "actionsID": '2',
      "contractID": "2",
      "active": true,
      "actionsName": "Test jazz",
      "actionQueueNames": [
        "string"
      ]
    }
  }
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ QueuesActionCategoryComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        TranslateStubsModule,
        TranslateModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: queueData  },
        { provide: MatDialog, useValue: { close: () => {} } },
        { provide: ToastrService, useClass: ToasterServiceStub},
        { provide: NgForm, useValue: new NgForm([], [])},
        { provide: FormGroupDirective, useValue: formGroupDirective},
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: LanguageService, useClass:languageServiceStub},
        { provide: ValidationService, useValue: ValidationServiceStub},
        { provide: MessageService, useClass: messageServiceStub},
        { provide: ApiService, useClass: ActionServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuesActionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialog = TestBed.inject(MatDialogRef);
    spyOn(window, "confirm").and.returnValue(true);
    const fb = new FormBuilder()
    actionFormData = {
      actionsName:'Accept'
    }

    const formGroupDirective = new FormGroupDirective([], []);
    formGroupDirective.form = fb.group({
      test: fb.control(null)
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title Actions', () => {
    const title = fixture.debugElement.nativeElement;
    let queueData:IncomingData = {actionForm: true,
      categoryForm: false,
      bahaviorQueuesID: 132,
      QData: {}}
    expect(queueData.actionForm).toBe(true);
    expect(title.querySelector('h3').textContent).toContain('Actions');
  });
  it('should have title Categories', () => {
    const title = fixture.debugElement.nativeElement;
    let queueData:IncomingData = {actionForm: false,
      categoryForm: true,
      bahaviorQueuesID: 132,
      QData: {}}
    expect(queueData.categoryForm).toBe(true);
    expect(title.querySelector('h3').textContent).toContain('Actions');
  });
  it('cancelAdd_Save', () => {
      spyOn(dialog, 'close');
      component.cancelAdd_Save();
      expect(component.showEditForm).toBe(false);
      expect(dialog.close).toHaveBeenCalled();
      
    });
  it('getAllDropDown', () => {
    spyOn(dialog, 'close');
    component.getAllDropDown();
  });
  it('Check required validations for actionsName', () => {
    expect(queueData.actionForm).toBe(true);
    let actionsName = component.actionForm.controls['actionsName'];
    expect(actionsName.valid).toBeFalsy();     // when no value is entered
    error = actionsName.errors || {};
    expect(error['required']).toBeTruthy();
    actionsName.setValue("Actions Name");                 // after setting the value
    fixture.detectChanges();
    expect(actionsName.valid).toBeTruthy();
  });

  it('addNewAction', () => {
    let actionsName = component.actionForm.controls['actionsName'];
    actionsName.setValue('Accept'); 
    expect(component.actionForm.valid).toBeTruthy();
    const spy = spyOn(formGroupDirective, 'resetForm').and.callThrough();
    component.addNewAction(actionFormData, formGroupDirective);
    expect(spy).toHaveBeenCalled()
    fixture.detectChanges();
  });
  it('Check required validations for phasesID', () => {
    // let error: any = {};
    let phasesID = component.PageForm.controls['phasesID'];
    expect(phasesID.valid).toBeFalsy();     // when no value is entered
    error = phasesID.errors || {};
    expect(error['required']).toBeTruthy();
    phasesID.setValue("Phases ID");                 // after setting the value
    fixture.detectChanges();
    expect(phasesID.valid).toBeTruthy();
  });
  it('Check required validations for categoryTypesID', () => {
    // let error: any = {};
    let categoryTypesID = component.PageForm.controls['categoryTypesID'];
    expect(categoryTypesID.valid).toBeFalsy();     // when no value is entered
    error = categoryTypesID.errors || {};
    expect(error['required']).toBeTruthy();
    categoryTypesID.setValue("CategoryTypesID");                 // after setting the value
    fixture.detectChanges();
    expect(categoryTypesID.valid).toBeTruthy();
  });

  it('Check required validations for actionsID', () => {
    // let error: any = {};
    let actionsID = component.PageForm.controls['actionsID'];
    expect(actionsID.valid).toBeFalsy();     // when no value is entered
    error = actionsID.errors || {};
    expect(error['required']).toBeTruthy();
    actionsID.setValue("Actions ID");                 // after setting the value
    fixture.detectChanges();
    expect(actionsID.valid).toBeTruthy();
  });
  it('addRecord', () => {
    const data = {
      "actionCategoriesPostModel": {
        "isDeleted": "N",
        "categoriesID": 0,
        "categoriesName": "cat1",
        "actionsID": 4,
        "actionName": "string",
        "categoryTypesID": 2,
        "phasesID": 2,
        "phasesName": "string",
        "contractID": "2",
        "active": true,
        "queuesID": [
          6
        ]
      }
    }
    let categoriesName = component.PageForm.controls['categoryName'];
    categoriesName.setValue("categoriesName"); 
    let actionsID = component.PageForm.controls['actionsID'];
    actionsID.setValue(data.actionCategoriesPostModel.actionsID); 
    let categoryTypesID = component.PageForm.controls['categoryTypesID'];
    categoryTypesID.setValue(data.actionCategoriesPostModel.categoryTypesID); 
    let phasesID = component.PageForm.controls['phasesID'];
    phasesID.setValue(data.actionCategoriesPostModel.phasesID); 
    expect(component.PageForm.valid).toBeTruthy();
    fixture.autoDetectChanges();
    const spy = spyOn(formGroupDirective, 'resetForm').and.callThrough();
    component.addRecord(data, formGroupDirective);
    expect(spy).toHaveBeenCalled();
  });
  it('error response when code is 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "categoriesID",
            "code": "5000",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.PageForm.valid).toBeFalse();
  })

  it('error response when message is DuplicateKey and code 5000', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "categoriesID",
            "code": "5000",
            "message": "DuplicateKey"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.PageForm.valid).toBeFalse();
  })

  it('error response when code is not 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "categoriesID",
            "code": "400",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.PageForm.valid).toBeFalse();
  })


});
