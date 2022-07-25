import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { JurisdictionService } from 'src/app/Services/Jurisdiction/jurisdiction.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { JurisdictionServiceStub } from 'src/app/shared/testCasesHelperClasses/JurisdictionServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';

import { JurisdictionComponent } from './jurisdiction.component';

describe('JurisdictionComponent', () => {
  let component: JurisdictionComponent;
  let fixture: ComponentFixture<JurisdictionComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let jurisdictionService:JurisdictionService;
  let translate: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JurisdictionComponent ],
      imports:[
        HttpClientTestingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AngularmaterialModule,
        TranslateStubsModule,
        ReactiveFormsModule,
        BrowserDynamicTestingModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule
      ],
      providers:[
    { provide: TranslateService, useClass:TranslateServiceStub},
    { provide: LanguageService, useClass:languageServiceStub},
    { provide: LiveAnnouncer, useClass: LiveAnnouncerStub},
    { provide: ToastrService, useClass: ToasterServiceStub},
    {provide: JurisdictionService, useClass: JurisdictionServiceStub}
      ]
    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    jurisdictionService = TestBed.inject(JurisdictionService);
    translate = TestBed.inject(TranslateService);
  });
 afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(JurisdictionComponent);
    component = fixture.componentInstance;
    spyOn(window,"confirm").and.returnValue(false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Jurisdiction');
  });
  it('should check getAllJurisdictions', () => {
    component.getAllJurisdictions();
    component.dataSource.sortingDataAccessor = jasmine.createSpy().and.callFake( (data: any, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }

      return data[sortHeaderId];
    });
  });
  it('search and filter', () => {
    let input = fixture.debugElement.query(By.css('input'));
    let inputElement = input.nativeElement;
    component.getAllJurisdictions();
    fixture.detectChanges();
    inputElement.value = 'abC';
    fixture.detectChanges();
    const event = new KeyboardEvent('keyup', { key: 'C' });
    inputElement.dispatchEvent(event);
    component.applyFilter(event);
    let searchData= (event.target as HTMLInputElement).value;
    let filter=searchData.trim().toLowerCase();
    expect(searchData.trim().toLowerCase()).toBe('abc');
    expect(component.dataSource.filter).toEqual('abc');
    expect(inputElement.value).toBe('abC');


    component.filterData();
    expect(component.dataSource.filter).toBe('abc');
    // expect(component.dataSource.filter).toBeUndefined();
  });
  it('form invalid when empty', () => {
    expect(component.jurisdictionsForm.valid).toBeFalsy();
  });
  it('check jurisdictionsName validity',()=>{
    let errors:any={};
    let jurisdictionsName = component.jurisdictionsForm.controls['jurisdictionsName'];
    expect(jurisdictionsName.valid).toBeFalsy();
    errors = jurisdictionsName.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(errors['maxLength(50)']).toBeFalsy();

    jurisdictionsName.setValue('Noarway');
    fixture.detectChanges();
    errors = jurisdictionsName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxLength(50)']).toBeFalsy();
  })
  it('check jurisdictionCode validity',()=>{
    let jurisdictionCode = component.jurisdictionsForm.controls['jurisdictionCode'];
  })
  it('check jurisdictionsDmvCode validity',()=>{
    let jurisdictionsDmvCode = component.jurisdictionsForm.controls['jurisdictionsDmvCode'];
  })
  it('form is valid', () => {
    // let jurisdictionsID = component.jurisdictionsForm.controls['jurisdictionsID'];
    // let contractID = component.jurisdictionsForm.controls['contractID'];
    // let active = component.jurisdictionsForm.controls['active'];
    let jurisdictionsName = component.jurisdictionsForm.controls['jurisdictionsName'];
    let jurisdictionCode = component.jurisdictionsForm.controls['jurisdictionCode'];
    let jurisdictionsDmvCode = component.jurisdictionsForm.controls['jurisdictionsDmvCode'];

    // jurisdictionsID.setValue(1);
    // contractID.setValue("test@test.com");
    // active.setValue(1);
    jurisdictionsName.setValue("Noarway");
    jurisdictionCode.setValue(1);
    jurisdictionsDmvCode.setValue(123);

    expect(component.jurisdictionsForm.valid).toBeTruthy();
  });
  it('addjurisdictions(data: any)',()=>{
    let jurisdictionsName = component.jurisdictionsForm.controls['jurisdictionsName'];
    let jurisdictionCode = component.jurisdictionsForm.controls['jurisdictionCode'];
    let jurisdictionsDmvCode = component.jurisdictionsForm.controls['jurisdictionsDmvCode'];

    jurisdictionsName.setValue("Kritika");
    jurisdictionCode.setValue(34);
    jurisdictionsDmvCode.setValue("5567");
    expect(component.jurisdictionsForm.valid).toBeTrue;
    let juridictionModel={
      jurisdictionCode: 34,
      jurisdictionsDmvCode: "5567",
      jurisdictionsName: "Kritika"
    }
    component.addjurisdictions(juridictionModel);
  })
  it('editJuri',()=>{
    let juridictionModel={
      active: true,
      contractID: 1,
      createDatetime: "2022-07-15T16:37:19.93",
      createUserID: 0,
      isDeleted: "N",
      jurisdictionCode: "6",
      jurisdictionsDmvCode: "5666",
      jurisdictionsID: 155,
      jurisdictionsName: "Juris",
      updateDatetime: "2022-07-15T16:37:19.93",
      updateUserID: 0
    }
    component.editJuri(juridictionModel);
  })
  it(' updateJuri(data: any)',()=>{
    let jurisdictionsName = component.jurisdictionsForm.controls['jurisdictionsName'];
    let jurisdictionCode = component.jurisdictionsForm.controls['jurisdictionCode'];
    let jurisdictionsDmvCode = component.jurisdictionsForm.controls['jurisdictionsDmvCode'];

    jurisdictionsName.setValue("Jurisdiction");
    jurisdictionCode.setValue(9);
    jurisdictionsDmvCode.setValue("5666");
    expect(component.jurisdictionsForm.valid).toBeTrue;
    let juridictionModel={
      jurisdictionCode: 9,
      jurisdictionsDmvCode: "5666",
      jurisdictionsName: "Jurisdiction"
    }
    let data = {
      jurisdictionsID: 1,
      contractID: 1,
      active: false
    }
    component.editJuri(data);
    component.updateJuri(juridictionModel);
    
  })
  it('showAddFormPage()',()=>{
    component.showAddFormPage();
    expect(component.showAddForm).toEqual(true);
    expect(component.addBtn).toEqual(true);
    expect(component.showEditForm).toEqual(false);
  })
  it('cancelAdd_Save() ',()=>{
    component.cancelAdd_Save();
    expect(component.showAddForm).toEqual(false);
    component.jurisdictionsForm.reset();
    expect(component.searchString.nativeElement.value).toEqual("")
    component.getAllJurisdictions();
  })
  it(' toggleType(id: number, status: boolean)',()=>{
    let id=1;
   let status=true;
    component.toggleType(id,status);
  })
  it(' toggleType(id: number, status: boolean)',()=>{
    let id=1;
   let status=false;
    component.toggleType(id,status);
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
  it('appendLang',()=>{
    let lang='en';
    component.appendLang(lang);
  })
  it('should check setPagelabel',()=>{
    let lang='fr'
    component.setPagelabel(lang);
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
  it('error response when message is DuplicateKey and code 5000', () => {
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
  it('jurisdictionsName',()=>{
    component.jurisdictionsName;
  })
  it('jurisdictionCode',()=>{
    component.jurisdictionCode;
  })
  it('jurisdictionsDmvCode',()=>{
    component.jurisdictionsDmvCode;
  })
});
