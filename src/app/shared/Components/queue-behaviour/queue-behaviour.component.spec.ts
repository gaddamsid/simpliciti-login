import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { FormBuilder, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { IncomingData, QueueBehaviourComponent } from './queue-behaviour.component';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { MatSelectModule } from '@angular/material/select';
import { QueueBehaviourServiceStub } from '../../testCasesHelperClasses/QueueBehaviourStub/QueueBehaviourServiceStub';
export class MatDialogMock {
  open() {
      return {
          close: () => of({})
      };
  }
}

describe('QueueBehaviourComponent', () => {
  let component: QueueBehaviourComponent;
  let fixture: ComponentFixture<QueueBehaviourComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let error: any = {};
  let inputElement: HTMLInputElement;
  const formGroupDirective = new FormGroupDirective([], []);
  const fb = new FormBuilder()
  let dialog: MatDialogRef<QueueBehaviourComponent>;
  let queueData: IncomingData = {
    behaviorNew: true,
    bahaviorQueuesID: 132,
    workflowStateID: 323,
    QData: {}
  }
  let data = {
    "xmlExportFieldModel": {
      "createUserID": 0,
      "updateUserID": 0,
      "createDatetime": "2022-05-18T15:38:44.951Z",
      "updateDatetime": "2022-05-18T15:38:44.951Z",
      "isDeleted": "N",
      "xmlExportFieldsID": 0,
      "contractID": 2,
      "active": true,
      "xmlExportFileBehaviorsID": 1,
      "xmlElementPath": "C:/users/test.xml",
      "fieldsID": 2,
      "default": "defauls",
      "dateTypeFormatId": 1,
      "dateTypeFormatName": ".xlsx",
      "fieldName": "courtDate"
    }
  }

  let queueList = [
    {behaviorTypesName: "Court Date"},
    {behaviorTypesName: "Fleet License Plate Lookup"},
    {behaviorTypesName: "ConditionalEmail"},
    {behaviorTypesName: "XML Export File"},
    {behaviorTypesName: "Printing"},
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueueBehaviourComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
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
        MatIconModule,
        MatDialogModule,
        MatSelectModule
      ],
      providers: [
        { provide: ToastrService, useClass: ToasterServiceStub},
        { provide: MAT_DIALOG_DATA, useValue: queueData  },
        { provide: MatDialog, useValue: { close: () => {} } },
        { provide: MatDialogRef, useValue: { close: () => {} } },
        // { provide: TranslateService, useClass:TranslateServiceStub},
        { provide: LanguageService, useClass:languageServiceStub},
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ValidationService, useValue: ValidationServiceStub},
        { provide: MessageService, useClass: messageServiceStub},
        { provide: ApiService, useClass: QueueBehaviourServiceStub},
        { provide: FormGroupDirective, useValue: formGroupDirective },
        FormGroupDirective,
      ]
    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    formGroupDirective.form = fb.group({
      actionsID: fb.control(''),
      categoriesID: fb.control('')
    });
    fixture = TestBed.createComponent(QueueBehaviourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('End Behaviors');
  });

  it('should execute changeBehaviourType method', () => {
    let e = 1; 
    component.queueList = [
      {behaviorTypesName: "Court Date"},
      {behaviorTypesName: "Fleet License Plate Lookup"},
      {behaviorTypesName: "ConditionalEmail"},
      {behaviorTypesName: "XML Export File"},
      {behaviorTypesName: "Printing"},
    ];
    component.behaviorTypesName = component.queueList[e-1].behaviorTypesName;
    component.changeBehaviourType(e);
    e = 2;
    component.behaviorTypesName = component.queueList[e-1].behaviorTypesName;
    component.changeBehaviourType(e);
    e = 3;
    component.behaviorTypesName = component.queueList[e-1].behaviorTypesName;
    component.changeBehaviourType(e);
    e = 4;
    component.behaviorTypesName = component.queueList[e-1].behaviorTypesName;
    component.changeBehaviourType(e);
    e = 5;
    component.behaviorTypesName = component.queueList[e-1].behaviorTypesName;
    component.changeBehaviourType(e);
    expect(component.xmlExportEnable).toBeTrue();
  });

  xit('should execute exportxmlFile method', () => {
    let file = {
      target: {
        files: [{
          lastModified: 1651050333395,
          lastModifiedDate: "Wed Apr 27 2022 14:35:33 GMT+0530",
          name: "PNG_transparency_demonstration_1.png",
          size: 174780,
          type: "image/png",
          webkitRelativePath: ""
        }]
      }
    }
    component.exportxmlFile(file);
  });

  it('handleFileInput method should execute', () => {
    let file = {
      target: {
        files: [{
          lastModified: 1651050333395,
          lastModifiedDate: "Wed Apr 27 2022 14:35:33 GMT+0530",
          name: "PNG_transparency_demonstration_1.png",
          size: 174780,
          type: "image/png",
          webkitRelativePath: ""
        }]
      }
    }
    component.handleFileInput(file.target);
    // expect(component.showCross).toBeTrue();
    file.target.files[0].size = 2100000;
    component.handleFileInput(file.target);
    // let signatureUpload = component.badgeNumberForm.controls['signatureUpload'];
    // signatureUpload.setValue(null);
    file.target.files[0].type = "image/mp3";
    component.handleFileInput(file.target);
    expect(component.logoFileName).toBe('');
  });

  it('should execute addXmlfields method', () => {
    component.addXmlfields();
    expect(component.addxmlFields).toBe(true);
    expect(component.constantfields).toBe(false);
  });

  it('should execute xmlfields_data method', () => {
    // let badgeNumber = component.badgeNumberForm.controls['badgeNumber'];
    // badgeNumber.setValue('009171');
    // let badgeOfficerName = component.badgeNumberForm.controls['badgeOfficerName'];
    // badgeOfficerName.setValue('D.K1');
    // expect(component.badgeNumberForm.valid).toBeTruthy();
    component.xmlfields_data(data);
    expect(component.addxmlFields).toBe(false);
    // expect(component.constantfields).toBe(false);
  });

  it('should execute addconstants_data method', () => {
    component.addconstants_data(data);
    expect(component.constantfields).toBe(false);
  });

  it('should execute deletexmlRecord method', () => {
    let id = 221;
    component.deletexmlRecord(id);
    expect(id).toBe(221);
  });

  it('should execute createConstantfields method', () => {
    component.createConstantfields();
    expect(component.constantfields).toBe(true);
    expect(component.addxmlFields).toBe(false);
  });

  it('should execute restrictWhiteSpace method', () => {
    let event = {
      keyCode: 32,
      target: {
        selectionStart: 0
      },
      preventDefault: function() {
        return null
      }
    }
    component.restrictWhiteSpace(event);
    expect(event.keyCode).toBe(32);
    
  });

  it('should execute addClientList method', () => {
    component.addClientList();
    expect(component.showForm).toBe(true);
    expect(component.showEditForm).toBe(false);
  });

  it('should execute cancelAdding method', () => {
    component.cancelAdding();
    expect(component.enablexmlTable).toBe(false);
    expect(component.xmlExportEnable).toBe(false);
  });

  xit('should execute addData method', () => {
    // component.addData(); 
    expect(component.enablexmlTable).toBe(false);
    expect(component.xmlExportEnable).toBe(false);
  });

  // let form: FormGroupDirective = component.EndBehviorsForm.value;
  xit('should execute addData method when behaviorTypesName is XML Export File and XmlUploaded will be false', () => {
    let data = component.EndBehviorsForm.value;
    // component.xmlUploaded = false;
    component.behaviorTypesName = 'XML Export File';
    // component.addData(data, form);
    // expect(component.xmlUploaded).toBeFalsy();
    expect(component.behaviorTypesName).toEqual('XML Export File');
  })
  it('should execute addData method when behaviorTypesName is Court Date', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    component.behaviorTypesName = 'Court Date';
    let data = component.EndBehviorsForm.value;
    component.addData(data,formGroupDirective);
  })
  it('should execute addData method when behaviorTypesName is Fleet License Plate Lookup', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    component.behaviorTypesName = 'Fleet License Plate Lookup';
    let data = component.EndBehviorsForm.value;
    component.addData(data,formGroupDirective);
  })
  it('should execute addData method when behaviorTypesName is ConditionalEmail', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    component.behaviorTypesName = 'ConditionalEmail';
    let data = component.EndBehviorsForm.value;
    data['rolesID'] = 1;
    data['categoryId'] = 1;
    component.addData(data,formGroupDirective);
  })
  it('should execute addData method when behaviorTypesName is Printing', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    component.behaviorTypesName = 'Printing';
    let data = component.EndBehviorsForm.value;
    component.logoFileName = "end.behaviors"
    component.addData(data,formGroupDirective);
  })
  it('should execute addData method when behaviorTypesName is XML Export File', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    let data = component.EndBehviorsForm.value;
    component.behaviorTypesName = 'XML Export File';
    component.addData(data,formGroupDirective);
  })

  let editData = {
    "contractID": 2,
    "active": true,
    "behaviorsID": 1,
    "default": "defauls",
    "behaviorTypesName": "Court Date"
  }

  it('should execute editIconClicked method for Court Date', () => { 
    // data.xmlExportFieldModel.fieldName = "Court Date";
    component.queueList = queueList;
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.editIconClicked(editData.behaviorsID);
    expect(component.showEditForm).toBe(true);
  });

  it('should execute editIconClicked method for Fleet License Plate Lookup', () => { 
    editData.behaviorsID = 2
    component.queueList = queueList;
    let e = 4;
    // component.changeBehaviourType(e);
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
   component.editIconClicked(editData.behaviorsID);
   expect(component.showEditForm).toBe(true);
  });

  it('should execute editIconClicked method for ConditionalEmail', () => { 
    editData.behaviorsID = 3
    component.queueList = queueList;
    let e = 3;
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
   component.editIconClicked(editData.behaviorsID);
   expect(component.showEditForm).toBe(true);
  });

  it('should execute editIconClicked method for XML Export File', () => { 
    editData.behaviorsID = 4
    component.queueList = queueList;
    let e = 4;
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.editIconClicked(editData.behaviorsID);
    // component.changeBehaviourType(e);
   expect(component.showEditForm).toBe(true);
  });

  it('should execute editIconClicked method for Printing', () => {
    component.queueList = queueList;
    editData.behaviorsID = 5
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.editIconClicked(editData.behaviorsID);
    expect(component.showEditForm).toBe(true);
  });

  it('should execute updateRecord method when behaviorTypesName is Court Date', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    let data = component.EndBehviorsForm.value;
    component.queueList = queueList;
    editData.behaviorsID = 1
    component.editIconClicked(editData.behaviorsID);
    component.editData.behaviorTypesName = 'Court Date';
    component.updateRecord(data);
  })
  it('should execute updateRecord method when behaviorTypesName is Fleet License Plate Lookup', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    let data = component.EndBehviorsForm.value;
    component.queueList = queueList;
    editData.behaviorsID = 2
    component.editIconClicked(editData.behaviorsID);
    component.editData.behaviorTypesName = 'Fleet License Plate Lookup';
    component.updateRecord(data);
  })
  it('should execute updateRecord method when behaviorTypesName is ConditionalEmail', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    let data = component.EndBehviorsForm.value;
    data['rolesID'] = 1;
    data['categoryId'] = 1;
    component.queueList = queueList;
    editData.behaviorsID = 3
    component.editIconClicked(editData.behaviorsID);
    component.editData.behaviorTypesName = 'ConditionalEmail';
    component.updateRecord(data);
  })
  it('should execute updateRecord method when behaviorTypesName is Printing', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    let data = component.EndBehviorsForm.value;
    component.logoFileName = "end.behaviors"
    component.queueList = queueList;
    editData.behaviorsID = 5
    component.editIconClicked(editData.behaviorsID);
    component.editData.behaviorTypesName = 'Printing';
    component.logoFileName = "fileExtension1.xls";
    component.updateRecord(data);
  })
  it('should execute updateRecord method when behaviorTypesName is XML Export File', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    let data = component.EndBehviorsForm.value;
    editData.behaviorsID = 4
    component.queueList = queueList;
    component.editIconClicked(editData.behaviorsID);
    component.editData.behaviorTypesName = 'XML Export File';
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.updateRecord(data);
  })

  xit('should execute transitionSelect method', () => {
    fixture.detectChanges();
    let event = { value: 12 }
    component.transitionVal = [{ transitionsID: 12 }];
    let transitionsID = component.EndBehviorsForm.controls['transitionsID'];
    transitionsID.setValue(12);
    component.transitionSelect(event);
    expect(component.transitionVal[0].transitionsID).toEqual(event.value);
  });

  it('format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    // component.get();
    fixture.detectChanges();
    inputElement.value = 'abC'; 
    fixture.detectChanges();
    const event = new KeyboardEvent('keyup', { key: 'C' });
    inputElement.dispatchEvent(event);
    let searchData= (event.target as HTMLInputElement).value;
    expect(searchData.trim().toLowerCase()).toBe('abc');
    expect(component.dataSource.filter).toEqual('');
    expect(inputElement.value).toBe('abC');
    component.filterData();
    expect(component.dataSource.filter).toBe('');
  });

  it('should execute toggleShow method', () => {
    component.isShown = true;
    component.toggleShow();
    expect(component.isShown).toBe(false);
  });

  // this.EndBehviorsForm = new FormGroup({
  //   'behaviorsName': new FormControl('', [Validators.required]),
  //   'isRegistrationHold': new FormControl(false),
  //   'isEntrance': new FormControl('', [Validators.required]),
  //   'behaviorsOrder': new FormControl('', [Validators.required]),
  //   'behaviorTypesID': new FormControl('', [Validators.required]),
  //   'registrationHoldAccept': new FormControl(''),
  //   'registrationHoldReject': new FormControl('')
  // });

  it('should execute addData method', () => { 
    editData.behaviorsID = 5
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
   component.editIconClicked(editData.behaviorsID);
   expect(component.showEditForm).toBe(true);
  });

  it('toggleType if status is true', () => {
    let id = 106;
    let status = true;
    spyOn(window,"confirm").and.returnValue(true);
    component.toggleClient(id, status);
    expect(id).toEqual(106);
  })

  it('toggleType if status is false', () => {
    let id = 106;
    let status = false;
    spyOn(window,"confirm").and.returnValue(true);
    component.toggleClient(id, status);
    expect(id).toEqual(106);
  });

  it('error response when code is 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "actionsName",
            "code": "5000",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.EndBehviorsForm.valid).toBeFalse();
  })

  it('error response when message is DuplicateKey and code 5000', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "actionsName",
            "code": "5000",
            "message": "DuplicateKey"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.EndBehviorsForm.valid).toBeFalse();
  })

  it('error response when code is not 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "actionsName",
            "code": "400",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.EndBehviorsForm.valid).toBeFalse();
  });




});
function formDirective(data: any, formDirective: any) {
  throw new Error('Function not implemented.');
}

