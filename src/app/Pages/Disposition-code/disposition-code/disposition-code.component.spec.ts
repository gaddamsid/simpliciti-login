import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { DispositionCodeService } from 'src/app/Services/disposition/disposition-code.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { DispositionCodeServiceStub } from 'src/app/shared/testCasesHelperClasses/dispositionCodeServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { ValidationServiceStub } from 'src/app/shared/testCasesHelperClasses/ValidationServiceStub';
import { ValidationService } from 'src/app/shared/validation/validation.service';

import { DispositionCodeComponent } from './disposition-code.component';

describe('DispositionCodeComponent', () => {
  let component: DispositionCodeComponent;
  let fixture: ComponentFixture<DispositionCodeComponent>;
  let inputElement: HTMLInputElement;
  let reqData: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DispositionCodeComponent],
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
        MatPaginatorModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: ApiService, useClass: apiServiceStub },
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ValidationService, useClass: ValidationServiceStub },
        { provide: DispositionCodeService, useClass: DispositionCodeServiceStub },
        { provide: MatPaginator, useValue: ({}) }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositionCodeComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();

    reqData = {
      active: "Y",
      contractId: 2,
      createDateTime: "2022-06-22T13:43:28.047",
      createUserId: '1',
      dispClass: "AS",
      dispCode: 1,
      dispDescription: "ZERO OUT REDUCTION",
      dispName: "disp",
      dispNameLong: "Disposition",
      dispNotInUse: "N",
      dispPriority: 1,
      dispRule: "A",
      dispositionId: 1,
      extraDate1: "2022-06-22T13:43:27.913",
      extraDate2: "2022-06-22T13:43:27.913",
      extraLongName: "",
      extraRules: "",
      isDeleted: "N",
      updateDateTime: "2022-06-22T13:43:28.047",
      updateUserId: 1,
      dispCodeNew: 1
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Disposition Code');
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

  it('dispositionCodeForm form should be invalid when empty', () => {
    component.showAddForm = true;
    component.dispositionCodeForm.controls["dispCode"].setValue('');
    component.dispositionCodeForm.controls["dispositionId"].setValue('');
    component.dispositionCodeForm.controls["dispClass"].setValue('');
    component.dispositionCodeForm.controls["dispNameLong"].setValue('');
    component.dispositionCodeForm.controls["dispName"].setValue('');
    component.dispositionCodeForm.controls["dispPriority"].setValue('');
    component.dispositionCodeForm.controls["dispRule"].setValue('');
    component.dispositionCodeForm.controls["active"].setValue('');
    expect(component.dispositionCodeForm.valid).toBeFalsy();
  });

  it('dispositionCodeForm form should be valid when not empty', () => {
    component.showAddForm = true;
    component.dispositionCodeForm.controls["dispCode"].setValue(1234);
    component.dispositionCodeForm.controls["dispositionId"].setValue('test');
    component.dispositionCodeForm.controls["dispClass"].setValue('tes');
    component.dispositionCodeForm.controls["dispNameLong"].setValue('test');
    component.dispositionCodeForm.controls["dispName"].setValue('test');
    component.dispositionCodeForm.controls["dispPriority"].setValue(2);
    component.dispositionCodeForm.controls["dispRule"].setValue('test');
    component.dispositionCodeForm.controls["active"].setValue(1);
    expect(component.dispositionCodeForm.valid).toBeTruthy();
  });

  it('editIconClicked', () => {
    component.editIconClicked(reqData);
    expect(component.showEditForm).toBeTruthy();
  })

  it('cancelAdd_Save', () => {
    component.cancelAdd_Save();
    expect(component.showAddForm ).toBeFalsy();
    expect(component.showEditForm).toBeFalsy();
  })

  it('ruleDescSelect', () => {
    let event = {
      value: "A"
    }
    component.ruleDescSelect(event);
    expect(component.dispositionCodeForm.controls['dispRule'].value).toEqual(event.value);
  })

  it('apply filter, format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    component.getDispositionCode();
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

  it('addDespCodeRecord', () => {
    component.dispositionCodeForm.controls["dispCode"].setValue(1234);
    component.dispositionCodeForm.controls["dispositionId"].setValue('test');
    component.dispositionCodeForm.controls["dispClass"].setValue('tes');
    component.dispositionCodeForm.controls["dispNameLong"].setValue('test');
    component.dispositionCodeForm.controls["dispName"].setValue('test');
    component.dispositionCodeForm.controls["dispPriority"].setValue(2);
    component.dispositionCodeForm.controls["dispRule"].setValue('test');
    component.dispositionCodeForm.controls["active"].setValue(1);
    component.addDespCodeRecord(reqData);
    expect(component.showAddForm).toBeFalsy();
  })

  it('updateDespCodeRecord', () => {
    component.dispositionCodeForm.controls["dispCode"].setValue(1);
    component.dispositionCodeForm.controls["dispositionId"].setValue('test');
    component.dispositionCodeForm.controls["dispClass"].setValue('tes');
    component.dispositionCodeForm.controls["dispNameLong"].setValue('test');
    component.dispositionCodeForm.controls["dispName"].setValue('test');
    component.dispositionCodeForm.controls["dispPriority"].setValue(2);
    component.dispositionCodeForm.controls["dispRule"].setValue('test');
    component.dispositionCodeForm.controls["active"].setValue(1);
    component.updateDespCodeRecord(reqData);
    expect(component.showAddForm).toBeFalsy();
    expect(component.showEditForm).toBeFalsy();
  })

  it('deleteDespCodeRecord', () => {
    component.deleteDespCodeRecord(1);
    expect(component.showAddForm).toBeFalsy();
  })

  it('showAddFormPage', () => {
    component.showAddFormPage();
    expect(component.showAddForm).toBeTruthy();
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
