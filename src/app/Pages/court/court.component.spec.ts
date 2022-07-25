import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { ValidationServiceStub } from 'src/app/shared/testCasesHelperClasses/ValidationServiceStub';
import { ValidationService } from 'src/app/shared/validation/validation.service';

import { CourtDetailsComponent } from './court.component';

describe('CourtComponent', () => {
  let component: CourtDetailsComponent;
  let fixture: ComponentFixture<CourtDetailsComponent>;
  let inputElement: HTMLInputElement;

  let reqBody = {
    active: true,
    code: "Ab01",
    courtsID: 1,
    jurisdictions: "ddwed",
    leadDays: 1,
    name: "test name",
    room: 1,
    streetLine1: "addresses1 for test 99",
    streetLine2: "addresses2 for test99"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourtDetailsComponent ],
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
        MatIconModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: ApiService, useClass: apiServiceStub },
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ValidationService, useClass: ValidationServiceStub },
        { provide: MatPaginator, useValue: ({}) }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtDetailsComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Court');
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

  it('apply filter, format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    component.getData();
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

  it('showAddFormPage', () => {
    component.showAddFormPage();
    expect(component.showAddForm).toBeTruthy();
    expect(component.addBtn).toBeTruthy();
    expect(component.showEditForm).toBeFalsy();
  })

  it('cancelAdd_Save', () => {
    component.cancelAdd_Save();
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

  it('CourtForm should be invalid when empty', () => {
    component.CourtForm.controls["name"].setValue('');
    component.CourtForm.controls["code"].setValue('');
    component.CourtForm.controls["room"].setValue('');
    component.CourtForm.controls["jurisdictionsID"].setValue('');
    component.CourtForm.controls["streetLine1"].setValue('');
    component.CourtForm.controls["streetLine2"].setValue('');
    component.CourtForm.controls["city"].setValue('');
    component.CourtForm.controls["stateProvincesID"].setValue('');
    component.CourtForm.controls["zipCode"].setValue('');
    component.CourtForm.controls["phone"].setValue('');
    component.CourtForm.controls["leadDays"].setValue('');
    expect(component.CourtForm.valid).toBeFalsy();
  });

  it('CourtForm should be valid when empty', () => {
    component.CourtForm.controls["name"].setValue('test');
    component.CourtForm.controls["code"].setValue('Ab01');
    component.CourtForm.controls["room"].setValue(1);
    component.CourtForm.controls["jurisdictionsID"].setValue('ddwed');
    component.CourtForm.controls["streetLine1"].setValue('addresses1 for test 99');
    component.CourtForm.controls["streetLine2"].setValue('addresses2 for test 99');
    component.CourtForm.controls["city"].setValue('Mumbai');
    component.CourtForm.controls["stateProvincesID"].setValue('2');
    component.CourtForm.controls["zipCode"].setValue('72032');
    component.CourtForm.controls["phone"].setValue('72712314561');
    component.CourtForm.controls["leadDays"].setValue(2);
    expect(component.CourtForm.valid).toBeTruthy();
  });

  it('addRecord', () => {
    component.CourtForm.controls["name"].setValue('test');
    component.CourtForm.controls["code"].setValue('Ab01');
    component.CourtForm.controls["room"].setValue(1);
    component.CourtForm.controls["jurisdictionsID"].setValue('ddwed');
    component.CourtForm.controls["streetLine1"].setValue('addresses1 for test 99');
    component.CourtForm.controls["streetLine2"].setValue('addresses2 for test 99');
    component.CourtForm.controls["city"].setValue('Mumbai');
    component.CourtForm.controls["stateProvincesID"].setValue('2');
    component.CourtForm.controls["zipCode"].setValue('72032');
    component.CourtForm.controls["phone"].setValue('72712314561');
    component.CourtForm.controls["leadDays"].setValue(2);
    component.addRecord(reqBody);
    expect(component.showAddForm).toBeFalsy();
    expect(component.showEditForm ).toBeFalsy();
  })

  it('editCourt', () => {
    let ID = 8;
    component.editCourt(ID);
    expect(component.showAddForm).toBeTruthy();
    expect(component.showEditForm ).toBeTruthy();
  })

  it('updateRecord', () => {
    component.CourtForm.controls["name"].setValue('test');
    component.CourtForm.controls["code"].setValue('Ab01');
    component.CourtForm.controls["room"].setValue(1);
    component.CourtForm.controls["jurisdictionsID"].setValue('ddwed');
    component.CourtForm.controls["streetLine1"].setValue('addresses1 for test 99');
    component.CourtForm.controls["streetLine2"].setValue('addresses2 for test 99');
    component.CourtForm.controls["city"].setValue('Mumbai');
    component.CourtForm.controls["stateProvincesID"].setValue('2');
    component.CourtForm.controls["zipCode"].setValue('72032');
    component.CourtForm.controls["phone"].setValue('72712314561');
    component.CourtForm.controls["leadDays"].setValue(2);
    let ID = 8;
    component.editCourt(ID);
    component.updateRecord(reqBody);
    expect(component.showAddForm).toBeFalsy();
  })

  it('toggleCourt, when status is true', () => {
    let status = true;
    component.toggleCourt(reqBody, status);
    expect(status).toBeTruthy();
  })

  it('toggleCourt, when status is false', () => {
    let status = false;
    component.toggleCourt(reqBody, status);
    expect(status).toBeFalsy();
  })
});
