import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { courtHolidayModel } from 'src/app/Models/Models/courtHoliday.Model';
import { CourtHolidayService } from 'src/app/Services/CourtHoliday/court-holiday.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { CourtHolidayServiceStub } from 'src/app/shared/testCasesHelperClasses/courtHolidayServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';

import { CourtHolidayComponent } from './court-holiday.component';

describe('CourtHolidayComponent', () => {
  let component: CourtHolidayComponent;
  let fixture: ComponentFixture<CourtHolidayComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourtHolidayComponent],
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
        { provide: ApiService, useClass: apiServiceStub },
        // { provide: TranslateService, useClass:TranslateServiceStub},
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: CourtHolidayService, useClass: CourtHolidayServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtHolidayComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Court Holiday');
  })

  it('holidayForm form should be invalid when empty', () => {
    component.holidayForm.controls["holidayDate"].setValue('');
    component.holidayForm.controls["holidayDescription"].setValue('');
    component.holidayForm.controls["holidayRecordNumber"].setValue('');
    expect(component.holidayForm.valid).toBeFalsy();
  });

  it('holidayForm form should be valid when not empty', () => {
    component.holidayForm.controls["holidayDate"].setValue('1');
    component.holidayForm.controls["holidayDescription"].setValue('test');
    component.holidayForm.controls["holidayRecordNumber"].setValue('1');
    expect(component.holidayForm.valid).toBeTruthy();
  });

  it('addHoliday', () => {
    component.addHoliday();
    expect(component.showAddForm).toBeTruthy();
  })

  it('get holidayDate should return a value', () => {
    component.holidayDate;
    component.holidayForm.controls["holidayDate"].setValue('2022-06-23T08:42:02.637');
    expect(component.holidayDate).toBeTruthy();
  });

  it('get desc holidayDescription return a value', () => {
    component.holidayDescription;
    component.holidayForm.controls["holidayDescription"].setValue('test');
    expect(component.holidayDescription).toBeTruthy();
  });

  it('get desc holidayRecordNumber return a value', () => {
    component.holidayRecordNumber;
    component.holidayForm.controls["holidayRecordNumber"].setValue(0);
    expect(component.holidayRecordNumber).toBeTruthy();
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

  it('apply filter, format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    component.getCourtHoliday();
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

  it('cancelCourtlHoliday', () => {
    component.cancelCourtlHoliday();
    expect(component.showAddForm).toBeFalsy();
    expect(component.showDataTable).toBeTruthy();
    expect(component.showEditForm).toBeFalsy();
  })

  it('updateHolidayRecord', () => {
    let data: courtHolidayModel = {
      active: false,
      contractID: 0,
      createDatetime: "2022-05-18T11:59:35.007",
      createUserID: 0,
      holidayDate: "2022-05-10T00:00:00",
      holidayDescription: "Janta",
      holidayId: 1,
      holidayRecordNumber: 897,
      isDelete: "N",
      updateDatetime: "2022-05-18T11:59:35.007",
      updateUserID: 0
    }
    component.updateHolidayRecord(data);
    expect(component.showEditForm).toBeTruthy();
    expect(component.showDataTable).toBeFalsy();
  })

  it('saveHolidayChanges if holidayDate is empty', () => {
    let data: courtHolidayModel = {
      active: false,
      contractID: 0,
      createDatetime: "2022-05-18T11:59:35.007",
      createUserID: 0,
      holidayDate: "",
      holidayDescription: "Janta",
      holidayId: 1,
      holidayRecordNumber: 897,
      isDelete: "N",
      updateDatetime: "2022-05-18T11:59:35.007",
      updateUserID: 0
    }
    component.saveHolidayChanges(data);
    expect(component.showEditForm).toBeFalsy();
    expect(component.showDataTable).toBeTruthy();
  })

  it('updateHolidayRecord', () => {
    let data: courtHolidayModel = {
      active: false,
      contractID: 0,
      createDatetime: "2022-05-18T11:59:35.007",
      createUserID: 0,
      holidayDate: "2022-05-10T00:00:00",
      holidayDescription: "Janta",
      holidayId: 1,
      holidayRecordNumber: 897,
      isDelete: "N",
      updateDatetime: "2022-05-18T11:59:35.007",
      updateUserID: 0
    }
    component.updateHolidayRecord(data);
    expect(component.showEditForm).toBeTruthy();
    expect(component.showDataTable).toBeFalsy();
  })

  it('saveHolidayChanges', () => {
    let data: courtHolidayModel = {
      active: false,
      contractID: 0,
      createDatetime: "2022-05-18T11:59:35.007",
      createUserID: 0,
      holidayDate: "2022-05-10T00:00:00",
      holidayDescription: "Janta",
      holidayId: 1,
      holidayRecordNumber: 897,
      isDelete: "N",
      updateDatetime: "2022-05-18T11:59:35.007",
      updateUserID: 0
    }
    component.holidayForm.controls["holidayDate"].setValue('2022-05-10T00:00:00');
    component.holidayForm.controls["holidayDescription"].setValue('Janta');
    component.holidayForm.controls["holidayRecordNumber"].setValue(897);
    component.updateHolidayRecord(data);
    component.saveHolidayChanges(data);
    expect(component.showEditForm).toBeFalsy();
    expect(component.showDataTable).toBeTruthy();
  })

  it('toggleAgency if status is true', () => {
    let id = 117;
    let status = true;
    component.toggleCourtHoliday(id, status);
    expect(id).toEqual(117);
  })

  it('toggleAgency if status is false', () => {
    let id = 117;
    let status = false;
    component.toggleCourtHoliday(id, status);
    expect(id).toEqual(117);
  })

  it('createCHoliday', () => {
    let data = {
      active: false,
      holidayDate: "2022-05-10T00:00:00",
      holidayDescription: "Janta",
      holidayId: 1,
      holidayRecordNumber: 897,
      updateUserID: 0
    }
    component.holidayForm.controls["holidayDate"].setValue('1');
    component.holidayForm.controls["holidayDescription"].setValue('test');
    component.holidayForm.controls["holidayRecordNumber"].setValue('1');
    component.createCHoliday(data);
  })

});