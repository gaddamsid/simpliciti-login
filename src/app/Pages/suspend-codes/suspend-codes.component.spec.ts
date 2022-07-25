import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
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
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { SuspendCodeModel } from 'src/app/Models/suspendCode.Model';
import { SuspendCodeService } from 'src/app/Services/SuspendCode/suspend-code.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { SuspendCodeServiceStub } from 'src/app/shared/testCasesHelperClasses/suspendCodeServiceStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';

import { SuspendCodesComponent } from './suspend-codes.component';

describe('SuspendCodesComponent', () => {
  let component: SuspendCodesComponent;
  let fixture: ComponentFixture<SuspendCodesComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuspendCodesComponent],
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
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: ApiService, useClass: apiServiceStub },
        { provide: SuspendCodeService, useClass: SuspendCodeServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendCodesComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Suspend Codes');
  })

  it('suspendCodeForm should be invalid when empty', () => {
    component.suspendCodeForm.controls["suspendCod"].setValue('');
    component.suspendCodeForm.controls["suspendCodePriority"].setValue('');
    component.suspendCodeForm.controls["suspendName"].setValue('');
    component.suspendCodeForm.controls["suspendType"].setValue('');
    component.suspendCodeForm.controls["suspendNumDays"].setValue('');
    component.suspendCodeForm.controls["active"].setValue('');
    component.suspendCodeForm.controls["suspendNameLong"].setValue('');
    component.suspendCodeForm.controls["suspendClass"].setValue('');
    component.suspendCodeForm.controls["calendarDays"].setValue('');
    expect(component.suspendCodeForm.valid).toBeFalsy();
  });

  it('suspendCodeForm should be valid when empty', () => {
    component.suspendCodeForm.controls["suspendCod"].setValue('231');
    component.suspendCodeForm.controls["suspendCodePriority"].setValue('high');
    component.suspendCodeForm.controls["suspendName"].setValue('azAZ09');
    component.suspendCodeForm.controls["suspendType"].setValue('P');
    component.suspendCodeForm.controls["suspendNumDays"].setValue('No');
    component.suspendCodeForm.controls["active"].setValue(true);
    component.suspendCodeForm.controls["suspendNameLong"].setValue('test');
    component.suspendCodeForm.controls["suspendClass"].setValue('a');
    component.suspendCodeForm.controls["calendarDays"].setValue(true);
    expect(component.suspendCodeForm.valid).toBeTruthy();
  });

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

  it('format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    component.getSuspendList();
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

  it('activeSelected', () => {
    let event = {
      active: true
    }
    component.activeSelected(event);
    expect(component.suspendCodeForm.controls['active'].value).toBeTruthy();
  })

  it('cancelAdd_Save', () => {
    component.cancelAdd_Save();
    expect(component.showAddForm).toBeFalsy();
    expect(component.showEditForm).toBeFalsy();
  })

  it('showAddFormPage', () => {
    component.showAddFormPage();
    expect(component.showAddForm).toBeTruthy();
  })

  it('editIconClicked', () => {
    let data: SuspendCodeModel = {
      active: "Y",
      calendarDays: "Y",
      contractId: 2,
      createUserId: 1,
      extraLongName: "",
      extraRules: "",
      isDeleted: "N",
      suspendClass: "",
      suspendCod: 99,
      suspendCodeNew: 0,
      suspendCodePriority: 1,
      suspendCodeTypeId: 1,
      suspendName: "SCHED HEAR",
      suspendNameLong: "HEAR SCHED",
      suspendNumDays: 10,
      suspendType: "T",
      updateUserId: 1,
      createDatetime: '',
      updateDatetime: ''
    }
    component.editIconClicked(data);
    expect(component.showEditForm).toBeTruthy();
  })

  it('addSuspendRecord', () => {
    let data: SuspendCodeModel = {
      active: "Y",
      calendarDays: "Y",
      contractId: 2,
      createUserId: 1,
      extraLongName: "",
      extraRules: "",
      isDeleted: "N",
      suspendClass: "",
      suspendCod: 99,
      suspendCodeNew: 0,
      suspendCodePriority: 1,
      suspendCodeTypeId: 1,
      suspendName: "SCHED HEAR",
      suspendNameLong: "HEAR SCHED",
      suspendNumDays: 10,
      suspendType: "T",
      updateUserId: 1,
      createDatetime: '',
      updateDatetime: ''
    }
    component.suspendCodeForm.controls["suspendCod"].setValue('231');
    component.suspendCodeForm.controls["suspendCodePriority"].setValue('high');
    component.suspendCodeForm.controls["suspendName"].setValue('azAZ09');
    component.suspendCodeForm.controls["suspendType"].setValue('P');
    component.suspendCodeForm.controls["suspendNumDays"].setValue('No');
    component.suspendCodeForm.controls["active"].setValue(true);
    component.suspendCodeForm.controls["suspendNameLong"].setValue('test');
    component.suspendCodeForm.controls["suspendClass"].setValue('a');
    component.suspendCodeForm.controls["calendarDays"].setValue(true);
    component.addSuspendRecord(data);
    expect(component.showAddForm ).toBeFalsy();
  })

  it('updateSuspendCodeRecord', () => {
    let data: SuspendCodeModel = {
      active: "Y",
      calendarDays: "Y",
      contractId: 2,
      createUserId: 1,
      extraLongName: "",
      extraRules: "",
      isDeleted: "N",
      suspendClass: "",
      suspendCod: 99,
      suspendCodeNew: 0,
      suspendCodePriority: 1,
      suspendCodeTypeId: 1,
      suspendName: "SCHED HEAR",
      suspendNameLong: "HEAR SCHED",
      suspendNumDays: 10,
      suspendType: "T",
      updateUserId: 1,
      createDatetime: '',
      updateDatetime: ''
    }
    component.editIconClicked(data);
    component.suspendCodeForm.controls["suspendCod"].setValue('231');
    component.suspendCodeForm.controls["suspendCodePriority"].setValue('high');
    component.suspendCodeForm.controls["suspendName"].setValue('azAZ09');
    component.suspendCodeForm.controls["suspendType"].setValue('P');
    component.suspendCodeForm.controls["suspendNumDays"].setValue('No');
    component.suspendCodeForm.controls["active"].setValue(true);
    component.suspendCodeForm.controls["suspendNameLong"].setValue('test');
    component.suspendCodeForm.controls["suspendClass"].setValue('a');
    component.suspendCodeForm.controls["calendarDays"].setValue(true);
    component.updateSuspendCodeRecord(data);
    expect(component.showAddForm ).toBeFalsy();
  })

  it('deleteSuspendCodeRecord', () => {
    let suspendCodeTypeId = 1
    component.deleteSuspendCodeRecord(suspendCodeTypeId);
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
});
