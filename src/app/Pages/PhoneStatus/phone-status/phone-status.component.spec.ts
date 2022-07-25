import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneStatusComponent } from './phone-status.component';

import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

describe('PhoneStatusComponent', () => {
  let component: PhoneStatusComponent;
  let fixture: ComponentFixture<PhoneStatusComponent>;
  let inputElement: HTMLInputElement;

  let data = {
            active: 1,
            contractId: 2,
            createDatetime: "2022-06-30T06:06:47.25",
            createUserId: 1,
            isDeleted: "N",
            phoneStatusCode: "a2b",
            phoneStatusDesc: "demo5",
            phoneStatusId: 25,
            updateDatetime: "2022-06-30",
            updateUserId: 1
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneStatusComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports:[TranslateStubsModule,
        FormsModule,
        MatSortModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatIconModule],
      providers:[
        { provide: ApiService, useClass: apiServiceStub },
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: MatPaginator, useValue: ({})},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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

  it('showAddFormPage', () => {
    let paginator = fixture.debugElement.injector.get(MatPaginator);
    paginator.pageIndex = 0;
    expect(component).toBeTruthy();
    component.PhoneStatusForm.controls["phoneStatusCode"].setValue('q838473');
    component.PhoneStatusForm.controls["phoneStatusDesc"].setValue('23e2832');
    component.addPhoneStatus(data);
    component.showAddFormPage();
    expect(component.showAddForm).toBe(true);
  });

  it('PhoneStatusCode valid',() => {
    component.phoneStatusCode;
    expect(component.PhoneStatusForm.controls['phoneStatusCode'].value).toEqual("");
  })

  it('phoneStatusDesc Valid',() => {
    component.phoneStatusDesc;
    expect(component.PhoneStatusForm.controls['phoneStatusDesc'].value).toEqual("");
  })

  it('apply filter', () => {
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
    expect(component.dataSource.filter).toEqual('abC');
    expect(inputElement.value).toBe('abC');
    component.filterData();
    expect(component.dataSource.filter).toBe('abC');
  });

  it('editIconClicked', () => {
    component.editIconClicked(data);
    expect(component.showAddForm).toBeTruthy();
    expect(component.showEditForm).toBeTruthy();
    expect(component.addBtn).toBeFalsy();
    let phoneStatusCode = component.PhoneStatusForm.controls['phoneStatusCode'];
    phoneStatusCode.setValue(data.phoneStatusCode);
    let phoneStatusDesc = component.PhoneStatusForm.controls['phoneStatusDesc'];
    phoneStatusDesc.setValue(data.phoneStatusDesc);
  });

  it('updateRecord', () => {
    component.editIconClicked(data);
    let phoneStatusCode = component.PhoneStatusForm.controls['phoneStatusCode'];
    phoneStatusCode.setValue("Phone Status Code"); 
    let phoneStatusDesc = component.PhoneStatusForm.controls['phoneStatusDesc'];
    phoneStatusDesc.setValue("Description"); 
    expect(component.PhoneStatusForm.valid).toEqual(true);
    component.showAddForm = true;
    component.updateRecord(data);
    expect(component.showAddForm).toBeFalsy();
  });

  it('deleteRecord', () => {
    spyOn(window,"confirm").and.returnValue(true);
    component.deleteRecord(data);
    expect(component.showAddForm).toBeFalsy();
  });

  it('cancel and save', () => {
    expect(component.showAddForm).toBeFalsy();
    component.PhoneStatusForm.reset();
    expect(component.searchString.nativeElement.value).toBe('');
    expect(component.dataSource.paginator).toBeDefined;
    component.getData();
    component.cancelAdd_Save();
  });

  it('error response when code is 5000 and message is not Duplicate Key', () => {
    let error = {
      error: {
        details: [{
          code: "5000",
          fieldName: "phonestatuscode",
           message: "No Record Found"
        }]
      }
    }
    component.errorResponseCheck(error);
    expect(error.error.details[0].code).toEqual("5000");
  })

  it('error response when message is Duplicate Key and code 5000', () => {
    let error = {
      error: {
        details: [{
          code: "5000",
          fieldName: "phonestatuscode",
           message: "DuplicateKey"
        }]
      }
    }
    component.errorResponseCheck(error);
    expect(error.error.details[0].code).toEqual("5000");
  })

  it('error response when code is not 5000 and message is not Duplicate Key', () => {
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
