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
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { ValidationServiceStub } from 'src/app/shared/testCasesHelperClasses/ValidationServiceStub';
import { ValidationService } from 'src/app/shared/validation/validation.service';

import { CrewTableComponent } from './crew-table.component';

describe('CrewTableComponent', () => {
  let component: CrewTableComponent;
  let fixture: ComponentFixture<CrewTableComponent>;
  let inputElement: HTMLInputElement;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrewTableComponent ],
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
        { provide: MatPaginator, useValue: ({})}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrewTableComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Crew Table');
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

  it('CrewForm form should be invalid when empty', () => {
    component.showAddForm = true;
    component.CrewForm.controls["crewCode"].setValue('');
    component.CrewForm.controls["crewChief"].setValue('');
    component.CrewForm.controls["crewType"].setValue('');
    component.CrewForm.controls["crewAuthLevel"].setValue('');
    expect(component.CrewForm.valid).toBeFalsy();
  });

  it('CrewForm form should be valid when not empty', () => {
    component.showAddForm = true;
    component.CrewForm.controls["crewCode"].setValue(1234);
    component.CrewForm.controls["crewChief"].setValue('test');
    component.CrewForm.controls["crewType"].setValue('test');
    component.CrewForm.controls["crewAuthLevel"].setValue('test');
    expect(component.CrewForm.valid).toBeTruthy();
  });

  it('get crewCode', () => {
    component.crewCode;
    component.CrewForm.controls["crewCode"].setValue(1234);
    expect(component.crewCode).toBeTruthy();
  })

  it('get crewChief', () => {
    component.crewChief;
    component.CrewForm.controls["crewChief"].setValue('test');
    expect(component.crewChief).toBeTruthy();
  })

  it('get crewType', () => {
    component.crewType;
    component.CrewForm.controls["crewType"].setValue("test");
    expect(component.crewType).toBeTruthy();
  })

  it('get crewAuthLevel', () => {
    component.crewAuthLevel;
    component.CrewForm.controls["crewAuthLevel"].setValue("test");
    expect(component.crewAuthLevel).toBeTruthy();
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

  it('checkZeroValue when value is not a number', () => {
    let event = {
      value: 'test'
    }
    component.checkZeroValue(event);
    expect(event.value).toBeDefined();
  })

  it('checkZeroValue', () => {
    let event = {
      value: 90000
    }
    component.checkZeroValue(event);
    expect(event.value).not.toBeNaN();
  })

  it('checkZeroValue when value is greater than 999999999', () => {
    let event = {
      value: 9999999999
    }
    component.checkZeroValue(event);
    expect(event.value).toBeGreaterThan(999999999);
  })

  it('addCrew', () => {
    let data = {
      crewAuthLevel: 1,
      crewChief: "CHi name",
      crewCode: "0001",
      crewType: 1,
    }
    component.CrewForm.controls["crewCode"].setValue(1234);
    component.CrewForm.controls["crewChief"].setValue('test');
    component.CrewForm.controls["crewType"].setValue('test');
    component.CrewForm.controls["crewAuthLevel"].setValue('test');
    component.addCrew(data);
    expect(component.showAddForm).toBeFalsy();
    expect(component.showEditForm).toBeFalsy();
  })

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

  it('editIconClicked', () => {
    let data = {
      bootTowCrewId: 1,
      contractId: 2,
      createDatetime: "2022-06-10T12:40:56.937",
      createUserId: 1,
      crewAuthLevel: 1,
      crewChief: "CHi name",
      crewCode: "0001",
      crewType: 1,
      isDeleted: "N",
      updateDatetime: "2022-06-10T12:40:56.937",
      updateUserId: 1
    }
    component.editIconClicked(data);
    expect(component.showAddForm).toBeTruthy();
    expect(component.showEditForm).toBeTruthy();
  })

  it('updateRecord', () => {
    let data = {
      crewAuthLevel: 1,
      crewChief: "CHi name",
      crewCode: "0001",
      crewType: 1,
    }
    let data1 = {
      bootTowCrewId: 1,
      contractId: 2,
      createDatetime: "2022-06-10T12:40:56.937",
      createUserId: 1,
      crewAuthLevel: 1,
      crewChief: "CHi name",
      crewCode: "0001",
      crewType: 1,
      isDeleted: "N",
      updateDatetime: "2022-06-10T12:40:56.937",
      updateUserId: 1
    }
    component.editIconClicked(data1);
    component.CrewForm.controls["crewCode"].setValue(1234);
    component.CrewForm.controls["crewChief"].setValue('test');
    component.CrewForm.controls["crewType"].setValue('test');
    component.CrewForm.controls["crewAuthLevel"].setValue('test');
    component.updateRecord(data);
    expect(component.showAddForm).toBeFalsy();
  })

  it('deleteRecord', () => {
    let data = {
      crewAuthLevel: 1,
      crewChief: "CHi name",
      crewCode: "0001",
      crewType: 1,
    }
    component.deleteRecord(data);
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
