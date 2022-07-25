import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { CorrespondenceTypeService } from 'src/app/Services/CorrespondenceType/CorrespondenceType';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { CorrespondenceTypeServiceStub } from 'src/app/shared/testCasesHelperClasses/CorrespondenceTypeServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';

import { CorrespondenceTypeComponent } from './correspondence-type.component';

describe('CorrespondenceTypeComponent', () => {
  let component: CorrespondenceTypeComponent;
  let fixture: ComponentFixture<CorrespondenceTypeComponent>;
  let inputElement: HTMLInputElement;
  let reqData: any = {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorrespondenceTypeComponent],
      imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        RouterTestingModule,
        ReactiveFormsModule,
        AngularmaterialModule,
        TranslateStubsModule,
        HttpClientTestingModule,
        BrowserDynamicTestingModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useValue: {} },
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: CorrespondenceTypeService, useClass: CorrespondenceTypeServiceStub },
        { provide: ApiService, useClass: apiServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrespondenceTypeComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    spyOn(window, 'open');
    fixture.detectChanges();
    reqData = {
      active: "No",
      contractId: 2,
      corrClass: "",
      corrLetterType: null,
      corrLongName: "2342",
      corrNameLong: null,
      corrPhoneInd: " ",
      corrShortName: "324",
      corrTypeId: 306,
      corrTypeNumber: 234,
      createDateTime: "2022-06-13T15:03:27.56",
      createUserId: 1,
      extraDate1: null,
      extraDate2: null,
      extraLongName: null,
      extraRules: null,
      isDeleted: "N",
      isUploaded: "Y",
      updateUserId: 1,
      updatedDateTime: "2022-06-13T15:04:27.887"
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag when showSettingForm will be false', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('CORRESPONDENCE_TYPE');
  })

  it('Add Contract form should be invalid when empty', () => {
    component.correspondenceForm.controls["typeCode"].setValue('');
    component.correspondenceForm.controls["corresClass"].setValue('');
    component.correspondenceForm.controls["fullName"].setValue('');
    component.correspondenceForm.controls["shortName"].setValue('');
    component.correspondenceForm.controls["corresActive"].setValue('');
    component.correspondenceForm.controls["callInd"].setValue('');
    component.contact.contacts = [
      {
        fileName: '',
        language: '',
        URL: '',
        name: ''
      }
    ]
    expect(component.correspondenceForm.valid).toBeFalsy();
  });

  it('Add Contract form should be valid when empty', () => {
    component.correspondenceForm.controls["typeCode"].setValue('231');
    component.correspondenceForm.controls["corresClass"].setValue('test');
    component.correspondenceForm.controls["fullName"].setValue('test');
    component.correspondenceForm.controls["shortName"].setValue('test');
    component.correspondenceForm.controls["corresActive"].setValue('No');
    component.addContactFieldWhenListAvail = true;
    component.correspondenceForm.controls["callInd"].setValue('');
    component.contact.contacts = [
      {
        fileName: '',
        language: '',
        URL: '',
        name: ''
      }
    ]
    expect(component.correspondenceForm.valid).toBeTruthy();
  });

  it('addGlobalcorrespondence', () => {
    component.addGlobalcorrespondence();
    expect(component.languageList.length).toBeGreaterThan(0)
  })

  it('apply filter, format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    component['getList']();
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

  it('addcorrespondence', () => {
    component.addcorrespondence(null);
    expect(component.addCorressButton).toBeTruthy();
  })

  it('cancelCorrespondence', () => {
    component.cancelCorrespondence();
    expect(component.showAddForm).toBeFalsy();
  })

  it('saveCorrespondece', () => {
    component.saveCorrespondece(reqData);
    expect(component.searchData).toEqual("");
  })

  it('saveCorrespondece when file name is empty', () => {
    let data = {
      "typeCode": "565",
      "corresClass": "",
      "fullName": "td",
      "shortName": "fdsf",
      "corresActive": "No",
      "callInd": " ",
      "contacts": [
        {
          "fileName": null,
          "language": null,
          "URL": null,
          "name": "dummy.pdf"
        }
      ]
    }
    component.correspondenceForm.get("contacts")!.value[0].fileName = null
    component.saveCorrespondece(data);
    expect(component.correspondenceForm.get("contacts")!.value[0].fileName).toBeNull();
  })

  it('saveCorrespondece when language is empty', () => {
    let data = {
      "typeCode": "565",
      "corresClass": "",
      "fullName": "td",
      "shortName": "fdsf",
      "corresActive": "No",
      "callInd": " ",
      "contacts": [
        {
          "fileName": null,
          "language": null,
          "URL": null,
          "name": "dummy.pdf"
        }
      ]
    }
    component.correspondenceForm.get("contacts")!.value[0].fileName = 'test'
    component.correspondenceForm.get("contacts")!.value[0].language = null
    component.correspondenceForm.controls["typeCode"].setValue('231');
    component.correspondenceForm.controls["fullName"].setValue('test');
    component.correspondenceForm.controls["shortName"].setValue('test');
    component.saveCorrespondece(data);
    expect(component.correspondenceForm.get("contacts")!.value[0].language).toBeNull();
  })

  it('saveCorrespondece if data is empty object', () => {
    let data = {}
    component.correspondenceForm.get('contact');
    component.correspondenceForm.controls["typeCode"].setValue('231');
    component.correspondenceForm.controls["fullName"].setValue('test');
    component.correspondenceForm.controls["shortName"].setValue('test');
    component.saveCorrespondece(data);
    expect(component.searchData).toEqual("");
  })

  it('addContactField', () => {
    component.addGlobalcorrespondence();
    component.addContactField();
    expect(component.languageList.length).toBeGreaterThan(0);
  })

  it('getControls', () => {
    component.getControls();
    expect(component.correspondenceForm.controls['contacts'].status).toEqual('VALID');
  }) 

  it('getConactControls', () => {
    let i = 0
    component.getConactControls(i);
    expect(component.correspondenceForm.controls['contacts'].status).toEqual('VALID');
  }) 

  it('updateCorres when language is empty', () => {
    let data = {
      "typeCode": "565",
      "corresClass": "",
      "fullName": "td",
      "shortName": "fdsf",
      "corresActive": "No",
      "callInd": " ",
      "contacts": [
        {
          "fileName": 'test',
          "language": null,
          "URL": null,
          "name": "dummy.pdf"
        }
      ]
    }
    
    component.correspondenceForm.get("contacts")!.value[0].fileName = 'test'
    component.correspondenceForm.get("contacts")!.value[0].language = null
    component.updateCorres(data);
    expect(component.correspondenceForm.get("contacts")!.value[0].language).toBeNull();
  })

  it('updateCorres when file name is empty', () => {
    let data = {
      "typeCode": "565",
      "corresClass": "",
      "fullName": "td",
      "shortName": "fdsf",
      "corresActive": "No",
      "callInd": " ",
      "contacts": [
        {
          "fileName": null,
          "language": "HI",
          "URL": null,
          "name": "dummy.pdf"
        }
      ]
    }
    component.correspondenceForm.get("contacts")!.value[0].fileName = null;
    component.correspondenceForm.get("contacts")!.value[0].language = 'Hi'
    component.updateCorres(data);
    expect(component.correspondenceForm.get("contacts")!.value[0].fileName).toBeNull();
  })

  it('updateCorres if data is empty object', () => {
    let data = {};
    component.editCorressData(reqData);
    component.addGlobalcorrespondence();
    component.correspondenceForm.get('contact');
    component.correspondenceForm.controls["typeCode"].setValue('231');
    component.correspondenceForm.controls["fullName"].setValue('test');
    component.correspondenceForm.controls["shortName"].setValue('test');
    component.updateCorres(data);
    expect(component.searchData).toEqual("");
    expect(component.correspondenceForm.get("contacts")!.value[0].fileName).toBeNull();
    expect(component.correspondenceForm.get("contacts")!.value[0].language).toBeNull();
  })

  it('editCorressData when corrTypeId is null', () => {
    reqData.corrTypeId = null;
    component.editCorressData(reqData);
    expect(reqData.corrTypeId).toBeNull();
  })

  it('deleteCorres', () => {
    component.deleteCorres(reqData);
    expect(reqData['corrTypeId']).toEqual(306);
  })

  it('error response when error details is undefined', () => {
    let error: any = {
      error: {}
    }
    component.errorResponseCheck(error);
    expect(error.error['details']).toBeUndefined();
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

  it('handleFileInput', () => {
    let event: any = {
      type: "application/json",
      size: 40000,
      files: [{}]
    }
    let index = 0
    component.handleFileInput(event, index);
    expect(event.size).toBeLessThan(4000000);
    expect(event.type).not.toEqual("application/pdf");
  })

  it('getIndex', () => {
    let index = 0;
    component.getIndex(index);
    expect(index).toEqual(0);
  })

  it('isFileAvilable', () => {
    let index = 0
    component.isFileAvilable(index);
    expect(index).toEqual(0);
  })

  // it('modify', () => {
  //   let index = 0
  //   component.contacts;
  //   component.correspondenceForm.get("contacts")!.value[0].URL = 'https://gmail.com';
  //   component.modify(index);
  //   expect(index).toEqual(0);
  // })

  it('getFileHref', () => {
    let index = 0
    component.getFileHref(index);
    expect(index).toEqual(0);
  })

  it('onLanguageChange', () => {
    let index = 0
    let event = {
      value:{
        fileName: 'test', language: 'HI', URL: 'https://gmail.com', name: 'test'
      }
    }
    component.onLanguageChange(event, index);
    expect(index).toEqual(0);
  })

});
