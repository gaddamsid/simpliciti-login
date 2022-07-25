import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { ViolationCode } from 'src/app/Models/violation-code';
import { ViolatioCodeService } from 'src/app/Services/violation/violatio-code.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import {TranslatePipeStub} from 'src/app/shared/testCasesHelperClasses/TranslatePipeStub ';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { ViolatioCodeServiceStub } from 'src/app/shared/testCasesHelperClasses/violatioCodeServiceStub';

import { ViolationCodeComponent } from './violation-code.component';

describe('ViolationCodeComponent', () => {
  let component: ViolationCodeComponent;
  let fixture: ComponentFixture<ViolationCodeComponent>;

  let toastrService: jasmine.SpyObj<ToastrService>

  let inputElement: HTMLInputElement;
  let violatioCodeService: ViolatioCodeService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let currencyPipe: CurrencyPipe;
  let fb: FormBuilder;
  let dataSource: MatTableDataSource<ViolationCode>;

  const obj = {
    "violationCodesId": 585,
    "contractId": 2,
    "createUserId": 1,
    "createDateTime": "2022-05-02T11:00:20.797",
    "updateUserId": 1,
    "updateDateTime": "2022-05-02T11:00:20.797",
    "violClassTbl": "A",
    "violCodeAltExt": "ViolCodeAltExt_Java",
    "violCodeInt": 458,
    "violCodeExt": "TRC7.2.55",
    "violPriority": 2,
    "violClass": "Q",
    "violType": "P",
    "violName": "NO PRK ZN",
    "violLongName": "NO PARKING ZONE     ",
    "violProcessDesc": " ",
    "violProcessDate1": "1905-06-15T00:00:00",
    "violAgencyGroup": "VAgeGrp_D",
    "violProcessDate2": "1905-06-15T00:00:00",
    "violProcessData2": "VPData2_D",
    "codeText": "",
    "clientNumber": "51",
    "active": 1,
    "isDeleted": "N",
    "violationCodeCharges": [
      {
        "violationCodeChargesId": 67,
        "contractId": 2,
        "createUserId": 5,
        "createDateTime": "1905-06-15T00:00:00",
        "updateUserId": 5,
        "updateDateTime": "1905-06-15T00:00:00",
        "fine": 100.75,
        "effDate": "2021-06-15T00:00:00",
        "pen1": 101,
        "pen2": 102,
        "pen3": 103,
        "pen4": 104,
        "pen5": 105
      },
      {
        "violationCodeChargesId": 68,
        "contractId": 2,
        "createUserId": 5,
        "createDateTime": "1905-06-15T00:00:00",
        "updateUserId": 5,
        "updateDateTime": "1905-06-15T00:00:00",
        "fine": 200.75,
        "effDate": "2020-06-15T00:00:00",
        "pen1": 201,
        "pen2": 202,
        "pen3": 203,
        "pen4": 204,
        "pen5": 205
      },
      {
        "violationCodeChargesId": 69,
        "contractId": 2,
        "createUserId": 5,
        "createDateTime": "1905-06-15T00:00:00",
        "updateUserId": 5,
        "updateDateTime": "1905-06-15T00:00:00",
        "fine": 300.75,
        "effDate": "2019-06-15T00:00:00",
        "pen1": 301,
        "pen2": 302,
        "pen3": 303,
        "pen4": 304,
        "pen5": 305
      }
    ]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViolationCodeComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserDynamicTestingModule,
        HttpClientTestingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AngularmaterialModule,
        TranslateStubsModule,
        MatTableModule,
        MatIconModule,
        MatSortModule,
        MatSelectModule,
        TranslateModule.forRoot(),
        MatFormFieldModule
      ],
      providers: [
        // { provide: ApiService, useClass: apiServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: CurrencyPipe, useValue: {} },
        { provide: TranslatePipe, useClass: TranslatePipeStub },
        { provide: ViolatioCodeService, useClass: ViolatioCodeServiceStub },
        { provide: MatPaginator, useValue: ({}) },
        FormBuilder
      ]
    })
      .compileComponents();
  });
  toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success', 'info']);
  beforeEach(() => {
    fixture = TestBed.createComponent(ViolationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    violatioCodeService = TestBed.inject(ViolatioCodeService);
    httpClient = TestBed.inject(HttpClient);
    spyOn(window, "confirm").and.returnValue(true);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Violation Code');
  });

  // it('should get incrementval on ngOnInit', () => {
  //   component.ngOnInit;
  //   const obj:number = 509;
  //   expect(component.incrementval).toEqual(obj);
  // });

  it('should call transformTotal and do parsing', () => {
    const input = 'fine1';
    component.addviolation();
    let val = component.violatonForm.get(input)?.value;
    let decimalValue = parseFloat(val).toFixed(2);
    component.transformTotal(input);
    expect(component.violatonForm.controls[input].value).toEqual(decimalValue);
  });

  it('should call transformTotal for empty value', () => {
    const input = 'fine2';
    let decimalValue = '0.00';
    component.transformTotal(input);
    fixture.detectChanges;
    expect(component.violatonForm.controls[input].value).toEqual(decimalValue);
  });

  it('should call transformTotal for null value', () => {
    const input = 'fine1';
    let decimalValue = '0.00';
    component.violatonForm.controls[input].setValue('');
    component.transformTotal(input);
    fixture.detectChanges;
    expect(component.violatonForm.controls[input].value).toEqual(decimalValue);
  });

  it('should call getlist', () => {
    component.getlist;
    fixture.detectChanges;
    spyOn(component, 'filterData').and.callThrough;
    expect(component.filterData).toHaveBeenCalled;
    expect(component.voilationList.length).toBeGreaterThanOrEqual(1);
    // expect(component.sort.disableClear).toEqual(true);
    expect(component.dataSource.sort).toBeDefined;
    expect(component.dataSource.paginator).toBeDefined;
  });

  it('should call setPagelabel', () => {
    let lang = {};
    component.setPagelabel(lang);
    expect(lang).toEqual({});
    expect(component.dataSource).toBeTruthy;
  });

  it('should call errorHandling with effDate1 empty', () => {
    let errors: any = {};
    let effDate1 = component.violatonForm.controls["effDate1"];
    component.errorHandling({ effDate1: '' });
    fixture.detectChanges;
    errors = effDate1.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should call errorHandling with violCodeExt empty', () => {
    let errors: any = {};
    let violCodeExt = component.violatonForm.controls["violCodeExt"];
    component.errorHandling({ violCodeExt: '' });
    fixture.detectChanges;
    errors = violCodeExt.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should call errorHandling with violPriority empty', () => {
    let errors: any = {};
    let violPriority = component.violatonForm.controls["violPriority"];
    component.errorHandling({ violPriority: '' });
    fixture.detectChanges;
    errors = violPriority.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should call errorHandling with violClass  empty', () => {
    let errors: any = {};
    let violClass = component.violatonForm.controls["violClass"];
    component.errorHandling({ violClass: '' });
    fixture.detectChanges;
    errors = violClass.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should call errorHandling with violType empty', () => {
    let errors: any = {};
    let violType = component.violatonForm.controls["violType"];
    component.errorHandling({ violType: '' });
    fixture.detectChanges;
    errors = violType.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('should call errorHandling with violName empty', () => {
    let errors: any = {};
    let violName = component.violatonForm.controls["violName"];
    component.errorHandling({ violName: '' });
    fixture.detectChanges;
    errors = violName.errors || {};
    expect(errors['required']).toBeTruthy();
  });


  it('should call errorHandling with violLongName empty', () => {
    let errors: any = {};
    let violLongName = component.violatonForm.controls["violLongName"];
    component.errorHandling({ violLongName: '' });
    fixture.detectChanges;
    errors = violLongName.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('apply filter, format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
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

  it('should call addViolationForm method', () => {
    let data = {
      clientNumber: null,
      codeText: null,
      contractId: null,
      createDatetime: null,
      createUserID: null,
      effDate1: "1900-01-01",
      effDate2: "1900-01-01",
      effDate3: "1900-01-01",
      fine1: "0.00",
      fine2: "0.00",
      fine3: "0.00",
      pen1: "0.00",
      pen2: "0.00",
      pen3: "0.00",
      pen4: "0.00",
      pen5: "0.00",
      pen6: "0.00",
      pen7: "0.00",
      pen8: "0.00",
      pen9: "0.00",
      pen10: "0.00",
      pen11: "0.00",
      pen12: "0.00",
      pen13: "0.00",
      pen14: "0.00",
      pen15: "0.00",
      updateDateTime: null,
      updateUserId: null,
      violAgencyGroup: null,
      violClass: "1",
      violClassTbl: null,
      violCodeAltExt: null,
      violCodeExt: "21",
      violCodeInt: 530,
      violLongName: "test",
      violName: "test",
      violPriority: 1,
      violProcessData2: null,
      violProcessDate1: null,
      violProcessDate2: null,
      violProcessDesc: "test",
      violType: "1",
      violationCodeCharges: null,
      violationCodeChargesId: null
    }
    component.addViolationForm(data);
    expect(component.successMsg).toEqual("Record Added Successfully");
  });

  //addviolation - input => violatonForm.value
  it('should call addviolation method', () => {
    component.addviolation();
    fixture.detectChanges;
    expect(component.showAddForm).toEqual(true);
    expect(component.showEditForm).toEqual(false);
    expect(component.addviolationButton).toEqual(true);
    expect(component.violatonForm.valid).toEqual(true);
    spyOn(component.violatonForm, 'reset').and.callThrough;
    expect(component.violatonForm.reset).toHaveBeenCalled;
  });

  it('should call editViolation method', () => {
    spyOn(component, 'errorHandling').and.callThrough;
    component.editViolation(obj);
    fixture.detectChanges;
    expect(component.errorHandling).toHaveBeenCalled;
    expect(component.showAddForm).toEqual(true);
    expect(component.showEditForm).toEqual(true);
    expect(component.addviolationButton).toEqual(false);
    spyOn(component.violatonForm, 'reset').and.callThrough;
    expect(component.violatonForm.reset).toHaveBeenCalled;

  });

  it('saveViolation', () => {
    let data = {
      clientNumber: null,
      codeText: null,
      contractId: null,
      createDatetime: null,
      createUserID: null,
      effDate1: "1900-01-01",
      effDate2: "1900-01-01",
      effDate3: "1900-01-01",
      fine1: "0.00",
      fine2: "0.00",
      fine3: "0.00",
      pen1: "0.00",
      pen2: "0.00",
      pen3: "0.00",
      pen4: "0.00",
      pen5: "0.00",
      pen6: "0.00",
      pen7: "0.00",
      pen8: "0.00",
      pen9: "0.00",
      pen10: "0.00",
      pen11: "0.00",
      pen12: "0.00",
      pen13: "0.00",
      pen14: "0.00",
      pen15: "0.00",
      updateDateTime: null,
      updateUserId: null,
      violAgencyGroup: null,
      violClass: "1",
      violClassTbl: null,
      violCodeAltExt: null,
      violCodeExt: "21",
      violCodeInt: 530,
      violLongName: "test",
      violName: "test",
      violPriority: 1,
      violProcessData2: null,
      violProcessDate1: null,
      violProcessDate2: null,
      violProcessDesc: "test",
      violType: "1",
      violationCodeCharges: null,
      violationCodeChargesId: null
    }
    component.editViolation(obj);
    component.saveViolation(data);
    expect(component.successMsg).toEqual("Record Updated Successfully");
  });

  //deleteViolation
  it('deleteViolation', () => {
    let data = {
      violationCodesId: 585
    }
    component.deleteViolation(data);
    expect(component.successMsg).toEqual("Record Deleted Successfully");
  });

  //cancelvoilation
  it('should call cancelvoilation method', () => {
    component.cancelvoilation();
    expect(component.violatonForm.valid).toBeFalsy;
    expect(component.showAddForm).toEqual(false);
    expect(component.searchString.nativeElement.value).toBe("");
    spyOn(component.violatonForm, 'reset').and.callThrough;
    expect(component.violatonForm.reset).toHaveBeenCalled;
    spyOn(component, 'getlist').and.callThrough;
    expect(component.violatonForm.reset).toHaveBeenCalled;
  });

  it('error response when code is 5000 and message is not Duplicate Record', () => {
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

  it('error response when code is 5000 and message is not Duplicate Record', () => {
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

  it('error response when code is not 5000 and message is not Duplicate Record', () => {
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
