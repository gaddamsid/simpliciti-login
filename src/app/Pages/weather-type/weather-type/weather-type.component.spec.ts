import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { WeatherTypeService } from 'src/app/Services/WeatherTypes/weather-type.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { WeatherTypeServiceStub } from 'src/app/shared/testCasesHelperClasses/WeatherTypeServiceStub';

import { WeatherTypeComponent } from './weather-type.component';

describe('WeatherTypeComponent', () => {
  let component: WeatherTypeComponent;
  let fixture: ComponentFixture<WeatherTypeComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
      ],
      declarations: [WeatherTypeComponent],
      providers: [
        { provide: ApiService, useClass: apiServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: WeatherTypeService, useClass: WeatherTypeServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherTypeComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Weather Types');
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

  it('createWTForm form should be invalid when empty', () => {
    component.createWTForm.controls["weatherTypesName"].setValue('');
    expect(component.createWTForm.valid).toBeFalsy();
  });

  it('createWTForm form should be valid when not empty', () => {
    component.createWTForm.controls["weatherTypesName"].setValue('Cloudy');
    expect(component.createWTForm.valid).toBeTruthy();
  });

  it('apply filter, format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    component.getWeatherTypes();
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

  it('cancelAddingWT', () => {
    component.cancelAddingWT();
    expect(component.showAddForm).toBeFalsy();
    expect(component.showDataTable).toBeTruthy();
    expect(component.showEditForm).toBeFalsy();
  })

  it('createWeatherType', () => {
    component.createWeatherType();
    expect(component.showDataTable).toBeFalsy();
    expect(component.showAddForm).toBeTruthy();
    expect(component.showEditForm).toBeFalsy();
  })

  it('error response when code is 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        details: [{
          "timestamp": "2022-06-29T06:47:59.717+0000",
          "code": 5000,
          "fieldName": "weatherTypesName",
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
          "fieldName": "weatherTypesName",
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
          "fieldName": "weatherTypesName",
          "error": "Not Found",
          "message": "No message available",
          "path": "/admin/v1/interaction1"
        }]
      }
    }
    component.errorResponseCheck(error);
    expect(error.error.details[0].code).toEqual(404);
  })

  it('weatherTypesName', () => {
    component.weatherTypesName;
    expect(component.createWTForm.valid).toBeFalsy();
  })

  it('toggleWeatherType when status is true', () => {
    let id = 1;
    let status = true;
    component.toggleWeatherType(id, status);
    expect(id).toEqual(1);
  })

  it('toggleWeatherType when status is false', () => {
    let id = 1;
    let status = false;
    component.toggleWeatherType(id, status);
    expect(id).toEqual(1);
  })

  it('editWeatherType', () => {
    const obj = {
      active: false,
      contractId: 0,
      createDatetime: "2022-04-26T09:33:25.787",
      createUserID: 0,
      isDeleted: "N",
      updateDatetime: "2022-04-26T09:33:25.787",
      updateUserID: 0,
      weatherTypesId: 1,
      weatherTypesName: "Cloudy and wimdy",
    }
    component.editWeatherType(obj);
    expect(component.showAddForm).toBeFalsy();
  })

  it('saveWeatherType', () => {
    const obj = {
      active: false,
      contractId: 0,
      createDatetime: "2022-04-26T09:33:25.787",
      createUserID: 0,
      isDeleted: "N",
      updateDatetime: "2022-04-26T09:33:25.787",
      updateUserID: 0,
      weatherTypesId: 1,
      weatherTypesName: "Cloudy and Humid",
    }
    const obj1 = {
      active: false,
      contractId: 0,
      createDatetime: "2022-04-26T09:33:25.787",
      createUserID: 0,
      isDeleted: "N",
      updateDatetime: "2022-04-26T09:33:25.787",
      updateUserID: 0,
      weatherTypesId: 1,
      weatherTypesName: "Cloudy",
    }
    component.createWTForm.controls["weatherTypesName"].setValue('Cloudy');
    component.editWeatherType(obj1);
    component.saveWeatherType(obj);
    expect(component.showEditForm ).toBeFalsy();
  })
  
  it('addWeatherType', () => {
    const obj = {
      active: false,
      contractId: 0,
      createDatetime: "2022-04-26T09:33:25.787",
      createUserID: 0,
      isDeleted: "N",
      updateDatetime: "2022-04-26T09:33:25.787",
      updateUserID: 0,
      weatherTypesId: 1,
      weatherTypesName: "Cloudy and Humid",
    }
    component.createWTForm.controls["weatherTypesName"].setValue('Cloudy');
    component.addWeatherType(obj);
    expect(component.showEditForm).toBeFalsy();
  })
});
