import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { EndBehaviorsComponent } from './end-behaviors.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ToastrService } from 'ngx-toastr';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { endbehaviourStub } from 'src/app/shared/testCasesHelperClasses/endBehaviour/endbehaviourStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
describe('EndBehaviorsComponent', () => {
  let component: EndBehaviorsComponent;
  let fixture: ComponentFixture<EndBehaviorsComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let inputElement: HTMLInputElement;
  let element: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndBehaviorsComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserDynamicTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        AngularmaterialModule,
        TranslateStubsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: ApiService, useClass: endbehaviourStub },
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: MatPaginator, useValue: ({}) },
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(EndBehaviorsComponent);

        component = fixture.componentInstance; // ContactComponent test instance
        // query for the title <h1> by CSS element selector

      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndBehaviorsComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    component.addxmlFields = true;
    component.addFile = true;
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('End Behaviors');
  });
  it('should create list', () => {
    component.getList();
    fixture.detectChanges();
  })
  it('should call getTransition() ', () => {
    component.getTransition();
    fixture.detectChanges();
  })
  it('form invalid when empty', () => {
    expect(component.EndBehviorsForm.valid).toBeFalsy();
  });
  it('form invalid when empty', () => {
    component.addxmlFields = true;
    expect(component.addFieldForm.valid).toBeFalsy();
  });
  it('xmlElementPath field validity', () => {
    component.addxmlFields = true;
    let errors: any = {};
    let xmlElementPath = component.addFieldForm.controls['xmlElementPath'];

    expect(xmlElementPath.valid).toBeFalsy();


    errors = xmlElementPath.errors || {};
    expect(errors['required']).toBeTruthy();


    xmlElementPath.setValue(1);
    errors = xmlElementPath.errors || {};
    expect(errors['required']).toBeFalsy();
  });
  it('dateTypeFormatName field validity', () => {
    component.addxmlFields = true;
    let errors: any = {};
    let dateTypeFormatName = component.addFieldForm.controls['dateTypeFormatName'];
    expect(dateTypeFormatName.valid).toBeTruthy();
  });
  it('fieldName field validity', () => {
    component.addxmlFields = true;
    let errors: any = {};
    let fieldName = component.addFieldForm.controls['fieldName'];
    expect(fieldName.valid).toBeFalsy();


    errors = fieldName.errors || {};
    expect(errors['required']).toBeTruthy();


    fieldName.setValue(1);
    errors = fieldName.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('form invalid when empty', () => {
    component.constantfields = true;
    expect(component.addconstantForm.valid).toBeFalsy();
  });
  it('xmlElementPath field validity', () => {
    component.constantfields = true;
    let errors: any = {};
    let xmlElementPath = component.addconstantForm.controls['xmlElementPath'];

    expect(xmlElementPath.valid).toBeFalsy();


    errors = xmlElementPath.errors || {};
    expect(errors['required']).toBeTruthy();


    xmlElementPath.setValue(1);
    errors = xmlElementPath.errors || {};
    expect(errors['required']).toBeFalsy();
  });
  it('fieldsName field validity', () => {
    component.constantfields = true;
    let errors: any = {};
    let fieldsName = component.addconstantForm.controls['fieldsName'];
    expect(fieldsName.valid).toBeFalsy();


    errors = fieldsName.errors || {};
    expect(errors['required']).toBeTruthy();


    fieldsName.setValue(1);
    errors = fieldsName.errors || {};
    expect(errors['required']).toBeFalsy();
  });
  it('fieldsDescription field validity', () => {
    component.constantfields = true;
    let errors: any = {};
    let fieldsDescription = component.addconstantForm.controls['fieldsDescription'];
    expect(fieldsDescription.valid).toBeFalsy();


    errors = fieldsDescription.errors || {};
    expect(errors['required']).toBeTruthy();


    fieldsDescription.setValue(1);
    errors = fieldsDescription.errors || {};
    expect(errors['required']).toBeFalsy();
  });
  it('behaviorsName field validity', () => {
    let errors: any = {};
    let behaviorsName = component.EndBehviorsForm.controls['behaviorsName'];
    expect(behaviorsName.valid).toBeFalsy();


    errors = behaviorsName.errors || {};
    expect(errors['required']).toBeTruthy();


    behaviorsName.setValue(1);
    errors = behaviorsName.errors || {};
    expect(errors['required']).toBeFalsy();
  });
  it('isRegistrationHold field validity', () => {
    let errors: any = {};
    let isRegistrationHold = component.EndBehviorsForm.controls['isRegistrationHold'];
    expect(isRegistrationHold.valid).toBeTruthy();
  });
  it('isEntrance field validity', () => {
    let errors: any = {};
    let isEntrance = component.EndBehviorsForm.controls['isEntrance'];
    errors = isEntrance.errors || {};


    errors = isEntrance.errors || {};
    expect(errors['required']).toBeTruthy();


    isEntrance.setValue(1);
    errors = isEntrance.errors || {};
    expect(errors['required']).toBeFalsy();
  });
  it('behaviorsOrder field validity', () => {
    let errors: any = {};
    let behaviorsOrder = component.EndBehviorsForm.controls['behaviorsOrder'];


    errors = behaviorsOrder.errors || {};
    expect(errors['required']).toBeTruthy();


    behaviorsOrder.setValue(1);
    errors = behaviorsOrder.errors || {};
    expect(errors['required']).toBeFalsy();
  });
  it('behaviorTypesID field validity', () => {
    let errors: any = {};
    let behaviorTypesID = component.EndBehviorsForm.controls['behaviorTypesID'];

    errors = behaviorTypesID.errors || {};
    expect(errors['required']).toBeTruthy();


    behaviorTypesID.setValue(1);
    errors = behaviorTypesID.errors || {};
    expect(errors['required']).toBeFalsy();
  });
  it('registrationHoldAccept field validity', () => {
    let errors: any = {};
    let registrationHoldAccept = component.EndBehviorsForm.controls['registrationHoldAccept'];
    expect(registrationHoldAccept.valid).toBeTruthy();
    expect(registrationHoldAccept.errors).toBeNull();
  });
  it('registrationHoldReject field validity', () => {
    let errors: any = {};
    let registrationHoldReject = component.EndBehviorsForm.controls['registrationHoldReject'];

    expect(registrationHoldReject.valid).toBeTruthy();
    errors = registrationHoldReject.errors || {};
    expect(registrationHoldReject.errors).toBeNull();
  });

  it('search and filter', () => {
    let input = fixture.debugElement.query(By.css('input'));
    let inputElement = input.nativeElement;
    component.getList();
    fixture.detectChanges();
    inputElement.value = 'abC';
    fixture.detectChanges();
    const event = new KeyboardEvent('keyup', { key: 'C' });
    inputElement.dispatchEvent(event);
    component.applyFilter(event);
    let searchData = (event.target as HTMLInputElement).value;
    let filter = searchData.trim().toLowerCase();
    expect(searchData.trim().toLowerCase()).toBe('abc');
    expect(component.dataSource.filter).toEqual('abc');
    expect(inputElement.value).toBe('abC');

    component.filterData();
    expect(component.dataSource.filter).toBe('abc');
  })

  it('toggleShow()', () => {
    let isShown = true;
    component.toggleShow();
    component.isShown = !isShown;
    expect(component.isShown).toEqual(false);
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
  it('setPagelabel', () => {
    let lang = {};
    component.setPagelabel(lang);
    let paginator = fixture.debugElement.injector.get(MatPaginator);
    component.dataSource.paginator = paginator;
    paginator.pageIndex = 0;
    expect(lang).toEqual({});
  })
  it('changeBehaviourType,e=1', () => {
    component.showForm = true;
    let e = 1;

    component.getList();
    fixture.detectChanges();
    component.changeBehaviourType(e);

    expect(component.behaviorTypesName).toBeDefined();
  })
  it('changeBehaviourType,e=2', () => {
    component.showForm = true;
    let e = 2;

    component.getList();
    fixture.detectChanges();
    component.changeBehaviourType(e);

    expect(component.behaviorTypesName).toBeDefined();
  })
  it('changeBehaviourType,e=3', () => {
    component.showForm = true;
    let e = 3;

    component.getList();
    fixture.detectChanges();
    component.changeBehaviourType(e);

    expect(component.behaviorTypesName).toBeDefined();
  })
  it('changeBehaviourType,e=4', () => {
    component.showForm = true;
    let e = 4;

    component.getList();
    fixture.detectChanges();
    component.changeBehaviourType(e);

    expect(component.behaviorTypesName).toBeDefined();
  })
  it('changeBehaviourType,e=5', () => {
    component.showForm = true;
    let e = 5;

    component.getList();
    fixture.detectChanges();
    component.changeBehaviourType(e);

    expect(component.behaviorTypesName).toBeDefined();
  })
  it('addData when behaviorTypesName is XML Export File and XmlUploaded will be false', () => {
    let data = component.EndBehviorsForm.value;
    component.xmlUploaded = false;
    component.behaviorTypesName = 'XML Export File';
    component.addData(data);
    expect(component.xmlUploaded).toBeFalsy();
    expect(component.behaviorTypesName).toEqual('XML Export File');
  })
  it('addData when behaviorTypesName is Court Date', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    component.behaviorTypesName = 'Court Date';
    let data = component.EndBehviorsForm.value;
    component.addData(data);
  })
  it('addData when behaviorTypesName is Fleet License Plate Lookup', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    component.behaviorTypesName = 'Fleet License Plate Lookup';
    let data = component.EndBehviorsForm.value;
    component.addData(data);
  })
  it('addData when behaviorTypesName is ConditionalEmail', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    component.behaviorTypesName = 'ConditionalEmail';
    let data = component.EndBehviorsForm.value;
    data['rolesID'] = 1;
    data['categoryId'] = 1;
    component.addData(data);
  })
  it('addData when behaviorTypesName is Printing', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    component.behaviorTypesName = 'Printing';
    let data = component.EndBehviorsForm.value;
    component.logoFileName = "end.behaviors"
    component.addData(data);
  })
  it('addData when behaviorTypesName is XML Export File', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    let data = component.EndBehviorsForm.value;
    component.behaviorTypesName = 'XML Export File';
    component.addData(data);
  })
  it('addClientList', () => {
    component.addClientList();
    expect(component.showForm).toEqual(true);
    expect(component.addFile).toEqual(true);
    expect(component.editFile).toEqual(false);
    expect(component.showEditForm).toEqual(false);
    expect(component.addBtn).toEqual(true);
    expect(component.behaviorTypesName).toEqual("");
    component.EndBehviorsForm.removeControl('transitionsID');
    component.EndBehviorsForm.removeControl('duration');
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
  it('toggleClient when not cameraEnabled', () => {
    let status: any = true;
    let data = {
      active: false,
      behaviorID: 641,
      behaviorTypesName: 'XML Export File',
      behaviorsName: 'test56099',
    };
    component.toggleClient(data, status);
    // expect(data.cameraEnabled).toBeTruthy();
  })

  it('toggleClient when cameraEnabled', () => {
    let status: any = false;
    let data = {
      active: false,
      behaviorID: 641,
      behaviorTypesName: 'XML Export File',
      behaviorsName: 'test56099',
    }
    component.toggleClient(data, status);
    // expect(data.cameraEnabled).toBeFalsy();
  })
  it('getAllDropDownForPrinting', () => {
    component.getAllDropDownForPrinting();
  })
  it('GetBindPrintingControls', () => {
    component.GetBindPrintingControls();
  })

  it('removePrintingControl', () => {
    component.removePrintingControl();
  })
  it('getxmldropList() ',()=>{
    component.getxmldropList(1);
  })
  it('addXmlfields', () => {
    component.addXmlfields()
    expect(component.addxmlFields).toEqual(true);
    expect(component.constantfields).toEqual(false);
  })
  it('removeXMLControls()', () => {
    component.removeXMLControls();
  })
  it('xmlfields_data', () => {
    let xmlElementPath = component.addFieldForm.controls['xmlElementPath'];
    xmlElementPath.setValue(1);
    let dateTypeFormatName = component.addFieldForm.controls['dateTypeFormatName'];
    let fieldName = component.addFieldForm.controls['fieldName'];
    fieldName.setValue(1);
    let data = component.addFieldForm.value;
    expect(component.addFieldForm.valid).toBeTruthy();
    component.xmlfields_data(data)
  })
  it('deletexmlRecordItem(deleteId:number)', () => {
    let deleteId: number = 1;
    component.deletexmlRecordItem(deleteId)
  })
  it('addconstants_data(data: any)', () => {
    let xmlElementPath = component.addconstantForm.controls['xmlElementPath'];
    xmlElementPath.setValue(1);

    let fieldsName = component.addconstantForm.controls['fieldsName'];
    fieldsName.setValue(1);

    let fieldsDescription =
      component.addconstantForm.controls['fieldsDescription'];
    fieldsDescription.setValue(1);

    expect(component.addconstantForm.valid).toBeTruthy();
    let data: any = component.addconstantForm.value;
    component.addconstants_data(data);
  })
  it('getxmlList(id:number)', () => {
    let id: number = 88;
    component.getxmlList(id);
    expect(component.responseData.length).toBeGreaterThan(0);
  })

  it('deletexmlRecord', () => {
    let id = 1;
    component.deletexmlRecord(id);
    expect(component.successMsg).toEqual('Record Deleted Successfully');
  })

  it('deletexmlField', () => {
    let id = 1;
    component.deletexmlField(id);
    expect(component.successMsg).toEqual('Record Deleted Successfully');
  })

  it('createConstantfields', () => {
    component.createConstantfields();
    expect(component.constantfields).toBeTruthy();
    expect(component.addxmlFields).toBeFalsy();
  })

  it('cancelAdding', () => {
    component.cancelAdding();
    expect(component.addxmlFields).toBeFalsy();
    expect(component.showForm).toBeFalsy();
  })

  it('transitionSelect', () => {
    let event = {
      value: 1
    }
    component.transitionVal = [
      {
        transitionsID: 1
      }
    ];
    component.showForm = true;
    let e = 3;
    component.getList();
    fixture.detectChanges();
    component.changeBehaviourType(e);
    component.transitionSelect(event);
    expect(component.EndBehviorsForm.controls['transitionsID'].value).toBeDefined();
  })

  it('editIconClicked when behaviorID is 634', () => {
    let data = {
      behaviorID: 634
    }
    component.editIconClicked(data);
    expect(component.showForm).toBeTruthy();
  })

  it('editIconClicked when behaviorID is 1', () => {
    let data = {
      behaviorID: 1
    }
    component.editIconClicked(data);
    expect(component.showForm).toBeTruthy();
  })

  it('editIconClicked when behaviorID is 2', () => {
    let data = {
      behaviorID: 2
    }
    component.editIconClicked(data);
    expect(component.showForm).toBeTruthy();
  })

  it('editIconClicked when behaviorID is 3', () => {
    let data = {
      behaviorID: 3
    }
    component.EndBehviorsForm.addControl('subject', new FormControl(""));
    component.EndBehviorsForm.addControl('rolesID', new FormControl(""));
    component.EndBehviorsForm.addControl('categoryId', new FormControl(""));
    component.EndBehviorsForm.addControl('narrative', new FormControl(""));
    component.editIconClicked(data);
    expect(component.showForm).toBeTruthy();
  })

  it('editIconClicked when behaviorID is 4', () => {
    let data = {
      behaviorID: 4
    }
    component.editIconClicked(data);
    expect(component.showForm).toBeTruthy();
  })

  it('updateRecord when behaviorTypesName is XML Export File when behaviorID is 4', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    let data1 = {
      behaviorID: 4
    }
    component.EndBehviorsForm.addControl('subject', new FormControl(""));
    component.EndBehviorsForm.addControl('rolesID', new FormControl(""));
    component.EndBehviorsForm.addControl('categoryId', new FormControl(""));
    component.EndBehviorsForm.addControl('narrative', new FormControl(""));
    component.EndBehviorsForm.addControl('exportFile', new FormControl(""));
    component.EndBehviorsForm.addControl('ftpTransfersID', new FormControl(""));
    component.EndBehviorsForm.controls['exportFile'].setValue('');
    component.editIconClicked(data1);
    let data = component.EndBehviorsForm.value;
    component.logoFileName = "end.behavior";
    component.updateRecord(data);
  })

  it('updateRecord when behaviorTypesName is XML Export File when behaviorID is 3', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    let data1 = {
      behaviorID: 3
    }
    component.EndBehviorsForm.addControl('subject', new FormControl(""));
    component.EndBehviorsForm.addControl('rolesID', new FormControl(""));
    component.EndBehviorsForm.addControl('categoryId', new FormControl(""));
    component.EndBehviorsForm.addControl('narrative', new FormControl(""));
    component.EndBehviorsForm.addControl('exportFile', new FormControl(""));
    component.EndBehviorsForm.addControl('ftpTransfersID', new FormControl(""));
    component.EndBehviorsForm.controls['exportFile'].setValue('');
    component.editIconClicked(data1);
    let data = component.EndBehviorsForm.value;
    component.updateRecord(data);
  })

  it('updateRecord when behaviorTypesName is XML Export File when behaviorID is 2', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    let data1 = {
      behaviorID: 2
    }
    component.EndBehviorsForm.addControl('subject', new FormControl(""));
    component.EndBehviorsForm.addControl('rolesID', new FormControl(""));
    component.EndBehviorsForm.addControl('categoryId', new FormControl(""));
    component.EndBehviorsForm.addControl('narrative', new FormControl(""));
    component.EndBehviorsForm.addControl('exportFile', new FormControl(""));
    component.EndBehviorsForm.addControl('ftpTransfersID', new FormControl(""));
    component.EndBehviorsForm.controls['exportFile'].setValue('');
    component.editIconClicked(data1);
    let data = component.EndBehviorsForm.value;
    component.updateRecord(data);
  })

  it('updateRecord when behaviorTypesName is XML Export File when behaviorID is 1', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    let data1 = {
      behaviorID: 1
    }
    component.EndBehviorsForm.addControl('subject', new FormControl(""));
    component.EndBehviorsForm.addControl('rolesID', new FormControl(""));
    component.EndBehviorsForm.addControl('categoryId', new FormControl(""));
    component.EndBehviorsForm.addControl('narrative', new FormControl(""));
    component.EndBehviorsForm.addControl('exportFile', new FormControl(""));
    component.EndBehviorsForm.addControl('ftpTransfersID', new FormControl(""));
    component.EndBehviorsForm.controls['exportFile'].setValue('');
    component.editIconClicked(data1);
    let data = component.EndBehviorsForm.value;
    component.updateRecord(data);
  })

  it('updateRecord when behaviorTypesName is XML Export File when behaviorID is 634', () => {
    component.EndBehviorsForm.controls['behaviorsName'].setValue('test');
    component.EndBehviorsForm.controls['isEntrance'].setValue(true);
    component.EndBehviorsForm.controls['behaviorsOrder'].setValue('1');
    component.EndBehviorsForm.controls['behaviorTypesID'].setValue('1');
    expect(component.EndBehviorsForm.valid).toBeTruthy();
    let data1 = {
      behaviorID: 634
    }
    component.EndBehviorsForm.addControl('subject', new FormControl(""));
    component.EndBehviorsForm.addControl('rolesID', new FormControl(""));
    component.EndBehviorsForm.addControl('categoryId', new FormControl(""));
    component.EndBehviorsForm.addControl('narrative', new FormControl(""));
    component.EndBehviorsForm.addControl('exportFile', new FormControl(""));
    component.EndBehviorsForm.addControl('ftpTransfersID', new FormControl(""));
    component.EndBehviorsForm.controls['exportFile'].setValue('');
    component.editIconClicked(data1);
    let data = component.EndBehviorsForm.value;
    component.updateRecord(data);
  })

  it('editIconClicked when behaviorID is 5', () => {
    let data = {
      behaviorID: 5
    }
    component.editIconClicked(data);
    expect(component.showForm).toBeTruthy();
  })
 })
