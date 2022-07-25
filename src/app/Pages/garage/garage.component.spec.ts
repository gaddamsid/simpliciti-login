import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { update } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';

import { GarageComponent } from './garage.component';

describe('GarageComponent', () => {
  let component: GarageComponent;
  let fixture: ComponentFixture<GarageComponent>;
  let inputElement: HTMLInputElement;
  let toastrService: jasmine.SpyObj<ToastrService>
  let apiService: ApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success', 'info']);
    await TestBed.configureTestingModule({
      declarations: [GarageComponent],
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
        TranslateModule.forRoot(),
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: ApiService, useClass: apiServiceStub },
        // { provide: TranslateService, useClass:TranslateServiceStub},
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ToastrService, useValue: toastrService }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(GarageComponent);
        component = fixture.componentInstance;
        apiService = TestBed.inject(ApiService);
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarageComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Garage');
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
  it('should get garage list', () => {
    component.getData();
    fixture.detectChanges();
    expect(component.garageList.length).toBeGreaterThanOrEqual(1);
  });

  it('should getStateTypes', () => {
    component.getStateTypes();
    fixture.detectChanges();
    expect(component.stateTypes.length).toBeGreaterThanOrEqual(1);
  });

  it('Garage form should be invalid when empty', () => {
    component.GarageForm.controls["bootTowGarageId"].setValue('');
    component.GarageForm.controls["garageCode"].setValue('');
    component.GarageForm.controls["garageName"].setValue('');
    component.GarageForm.controls["garageAddress1"].setValue('');
    component.GarageForm.controls["garageCity"].setValue('');
    component.GarageForm.controls["garageStateId"].setValue('');
    component.GarageForm.controls["garageZip"].setValue('');
    component.GarageForm.controls["garagephoneNumber"].setValue('');
    component.GarageForm.controls["garageEmail"].setValue('');
    expect(component.GarageForm.valid).toBeFalsy();
  });

  it('garageName field validity', () => {
    let errors: any;
    let garageName = component.GarageForm.controls['garageName'];
    expect(garageName.valid).toBeFalsy();

    // garageName field is required
    errors = garageName.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set garageName to something
    garageName.setValue('AZD');
    errors = garageName.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('garageCode field validity', () => {
    let errors: any;
    let garageCode = component.GarageForm.controls['garageCode'];
    expect(garageCode.valid).toBeFalsy();

    // garageCode field is required
    errors = garageCode.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set garageCode to something
    garageCode.setValue('AZ102');
    errors = garageCode.errors || {};
    expect(errors['required']).toBeFalsy();
  });
  

  it('GarageForm should be valid when not empty', () => {
    component.GarageForm.controls["bootTowGarageId"].setValue('1');
    component.GarageForm.controls["garageCode"].setValue('AZ102');
    component.GarageForm.controls["garageName"].setValue('AZDept');
    component.GarageForm.controls["garageAddress1"].setValue('line 1');
    component.GarageForm.controls["garageCity"].setValue('AZ');
    component.GarageForm.controls["garageStateId"].setValue('12');
    component.GarageForm.controls["garageZip"].setValue('15484');
    component.GarageForm.controls["garagephoneNumber"].setValue('1234567890');
    component.GarageForm.controls["garageEmail"].setValue('test@gmail.com');
    expect(component.GarageForm.valid).toBeTruthy();
  });

  

  it('showAddFormPage', () => {
    expect(component).toBeTruthy();
    component.showAddFormPage();
    expect(component.showEditForm).toBe(false);
    expect(component.showAddForm).toBe(true);
    expect(component.addBtn).toBe(true);
  });
  it('addRecord method should execute', fakeAsync(() => {
    let data: any = {
      "garageCode": "AZ10",
      "garageName": "AZONE",
      "garageAddress1": "Arizona",
      "garageAddress2": "Arizona west bank",
      "garageCity": "AZ",
      "garageStateId": 43,
      "garageZip": "13325",
      "garagephoneNumber": "12346685245",
      "garageEmail": "az@gmail.com"
  }
    component.updateRecord(data);
    expect(component.showAddForm).toBeFalsy();
    flush();
  }))
  it('editIconClicked method should execute', () => {
    let data: any = {
      "garageCode": "AZ10",
      "garageName": "AZONE",
      "garageAddress1": "Arizona",
      "garageAddress2": "Arizona west bank",
      "garageCity": "AZ",
      "garageStateId": 43,
      "garageZip": "13325",
      "garagephoneNumber": "12346685245",
      "garageEmail": "az@gmail.com"
  }
    component.editIconClicked(data);
    expect(component.editData).toEqual(data);
    expect(component.showEditForm).toBeTruthy();
    expect(component.showAddForm).toBeTruthy();
    expect(component.addBtn).toBeFalsy();
    component.GarageForm.controls['bootTowGarageId'].setValue(data.bootTowGarageId);
    component.GarageForm.controls['garageAddress1'].setValue(data.garageAddress1);
    component.GarageForm.controls['garageAddress2'].setValue(data.garageAddress2);
    component.GarageForm.controls['garageCity'].setValue(data.garageCity);
    component.GarageForm.controls['garageCode'].setValue(data.garageCode);
    component.GarageForm.controls['garageEmail'].setValue(data.garageEmail);
    component.GarageForm.controls['garageName'].setValue(data.garageName);
    component.GarageForm.controls['garageStateId'].setValue(data.garageStateId);
    component.GarageForm.controls['garageZip'].setValue(data.garageZip);
    component.GarageForm.controls['garagephoneNumber'].setValue(data.garagePhoneNumber);
  })

  it('updateRecord method should execute', () => {
    let data: any = {
      "garageCode": "AZ10",
      "garageName": "AZONE",
      "garageAddress1": "Arizona",
      "garageAddress2": "Arizona west bank",
      "garageCity": "AZ",
      "garageStateId": 43,
      "garageZip": "13325",
      "garagephoneNumber": "12346685245",
      "garageEmail": "az@gmail.com"
  }
    expect(component.searchString.nativeElement.value).toEqual('');
    component.updateRecord(data);
    expect(component.showAddForm).toBeFalsy();
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
  })

  it('announceSortChange', () => {
    let sortState: Sort = {
      direction: 'asc',
      active:'true'
    }
    component.announceSortChange(sortState);
  })

  it('announceSortChange if direction is missing', () => {
    let sortState: Sort = {
      direction: '',
      active:'true'
    }
    component.announceSortChange(sortState);
  })
  it('cancelAdd_Save', () => {
    component.cancelAdd_Save();
    expect(component.showAddForm).toBeFalsy();
    expect(component.paginator.pageIndex).toEqual(0);
    expect(component.searchString.nativeElement.value).toEqual('');
  });
  it('error response when code is 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "categoriesID",
            "code": "5000",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.GarageForm.valid).toBeFalse();
  })

  it('error response when message is DuplicateKey and code 5000', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "categoriesID",
            "code": "5000",
            "message": "DuplicateKey"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.GarageForm.valid).toBeFalse();
  })

  it('error response when code is not 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "categoriesID",
            "code": "400",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.GarageForm.valid).toBeFalse();
  })
});
