import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControlDirective, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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

import { CreateCameraComponent } from './create-camera.component';

describe('CreateCameraComponent', () => {
  let component: CreateCameraComponent;
  let fixture: ComponentFixture<CreateCameraComponent>;
  let inputElement: HTMLInputElement;
  const fb = new FormBuilder()
  const formGroupDirective = new FormGroupDirective([], []);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCameraComponent ],
      schemas: [NO_ERRORS_SCHEMA],
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
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ValidationService, useClass: ValidationServiceStub },
        { provide: MatPaginator, useValue: ({})},
        FormGroupDirective,
        FormBuilder,
        {provide: FormGroupDirective, useValue: formGroupDirective}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    formGroupDirective.form = fb.group({
      test: fb.control(null)
    });
    fixture = TestBed.createComponent(CreateCameraComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Camera Details List');
  })

  it('CameraForm form should be invalid when empty', () => {
    component.CameraForm.controls["cameraID"].setValue('');
    component.CameraForm.controls["cameraTypesName"].setValue('');
    component.CameraForm.controls["locationsName"].setValue('');
    component.CameraForm.controls["asset"].setValue('');
    component.CameraForm.controls["firmwareVersionsID"].setValue('');
    component.CameraForm.controls["fileTransfersID"].setValue('');
    component.CameraForm.controls["retentionDays"].setValue('');
    component.CameraForm.controls["latitude"].setValue('');
    component.CameraForm.controls["longitude"].setValue('');
    component.CameraForm.controls["inAlarm"].setValue('');
    component.CameraForm.controls["isEnforcement"].setValue('');
    component.CameraForm.controls["isEncrypted"].setValue('');
    component.CameraForm.controls["cameraEnabled"].setValue('');
    component.CameraForm.controls["encryprtionFile"].setValue('');
    component.CameraForm.controls["approach"].setValue('');
    component.CameraForm.controls["cameraDescription"].setValue('');
    expect(component.CameraForm.valid).toBeFalsy();
  });

  it('CameraForm form should be valid when not empty', () => {
    component.CameraForm.controls["cameraID"].setValue('0');
    component.CameraForm.controls["cameraTypesName"].setValue('test');
    component.CameraForm.controls["locationsName"].setValue('test');
    component.CameraForm.controls["asset"].setValue('test');
    component.CameraForm.controls["firmwareVersionsID"].setValue('test');
    component.CameraForm.controls["fileTransfersID"].setValue('test');
    component.CameraForm.controls["retentionDays"].setValue(20);
    component.CameraForm.controls["latitude"].setValue('27.2046');
    component.CameraForm.controls["longitude"].setValue('77.4977');
    component.CameraForm.controls["inAlarm"].setValue('');
    component.CameraForm.controls["isEnforcement"].setValue('');
    component.CameraForm.controls["isEncrypted"].setValue('');
    component.CameraForm.controls["cameraEnabled"].setValue('');
    component.CameraForm.controls["encryprtionFile"].setValue('test');
    component.CameraForm.controls["approach"].setValue('test');
    component.CameraForm.controls["cameraDescription"].setValue('test');
    expect(component.CameraForm.valid).toBeTruthy();
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

  it('apply filter, format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement;
    component.getList();
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

  it('setPagelabel', () => {
    let lang = {};
    component.setPagelabel(lang);
    let paginator = fixture.debugElement.injector.get(MatPaginator);
    component.dataSource.paginator = paginator;
    paginator.pageIndex = 0;
    expect(lang).toEqual({});
  })

  it('enabledEncryption if checked', () => {
    let val: any = {
      checked: true 
    }
    component.enabledEncryption(val)
    expect(component.enableFile).toEqual(val.checked);
  })

  it('enabledEncryption if checked false', () => {
    let val: any = {
      checked: false 
    }
    component.enabledEncryption(val)
    expect(component.enableFile).toEqual(val.checked);
  })

  it('addCameraType', () => {
    component.addCameraType();
    expect(component.showAddForm).toBeTruthy();
    expect(component.showEditForm).toBeFalsy();
  })

  it('cancelAdd_Save', () => {
    component.cancelAdd_Save(formGroupDirective);
    expect(component.showAddForm).toBeFalsy();
  })

  it('addData', () => {
    let data = {
      active: true,
      amberTime: 0,
      contractID: 2,
      contractTypeId: 1,
      contractTypesName: "Red Light",
      createDatetime: "2022-06-08T12:59:37.33",
      createUserID: 0,
      isDeleted: "N",
      jurisdictionsName: "3233444ff@aB  --",
      latitude: 0,
      locationsCode: "001",
      locationsDescription: "Desc Norway",
      locationsEnabled: false,
      locationsID: 350,
      locationsName: "Noarway",
      longitude: 0,
      updateDatetime: "2022-06-08T12:59:37.33",
      updateUserID: 0
    }
    component.CameraForm.controls["cameraID"].setValue('0');
    component.CameraForm.controls["cameraTypesName"].setValue('test');
    component.CameraForm.controls["locationsName"].setValue('test');
    component.CameraForm.controls["asset"].setValue('test');
    component.CameraForm.controls["firmwareVersionsID"].setValue('test');
    component.CameraForm.controls["fileTransfersID"].setValue('test');
    component.CameraForm.controls["retentionDays"].setValue(20);
    component.CameraForm.controls["latitude"].setValue('27.2046');
    component.CameraForm.controls["longitude"].setValue('77.4977');
    component.CameraForm.controls["inAlarm"].setValue('');
    component.CameraForm.controls["isEnforcement"].setValue('');
    component.CameraForm.controls["isEncrypted"].setValue('');
    component.CameraForm.controls["cameraEnabled"].setValue('');
    component.CameraForm.controls["encryprtionFile"].setValue('test');
    component.CameraForm.controls["approach"].setValue('test');
    component.CameraForm.controls["cameraDescription"].setValue('test');
    component.addData(data, formGroupDirective);
    expect(component.showAddForm).toBeFalsy();
  })

  it('editRowOutput', () => {
    let data = {
      active: true,
      cameraEnabled: true,
      cameraID: 69,
      cameraTypesName: "Mesa",
      firmwareVersion: "V1.0.0.0",
      latitude: 0,
      locationsName: "Location 01",
      longitude: 0,
      rententionDays: 5
    }

    component.editRowOutput(data);
    expect(component.showAddForm).toBeTruthy();
    expect(component.showEditForm ).toBeTruthy();
  })

  it('updateRecord', () => {
    let data = {
      active: true,
      cameraEnabled: true,
      cameraID: 69,
      cameraTypesName: "Mesa",
      firmwareVersion: "V1.0.0.0",
      latitude: 0,
      locationsName: "Location 01",
      longitude: 0,
      rententionDays: 5
    }
    component.editRowOutput(data);
    component.CameraForm.controls["cameraID"].setValue('0');
    component.CameraForm.controls["cameraTypesName"].setValue('test');
    component.CameraForm.controls["locationsName"].setValue('test');
    component.CameraForm.controls["asset"].setValue('test');
    component.CameraForm.controls["firmwareVersionsID"].setValue('test');
    component.CameraForm.controls["fileTransfersID"].setValue('test');
    component.CameraForm.controls["retentionDays"].setValue(20);
    component.CameraForm.controls["latitude"].setValue('27.2046');
    component.CameraForm.controls["longitude"].setValue('77.4977');
    component.CameraForm.controls["inAlarm"].setValue('');
    component.CameraForm.controls["isEnforcement"].setValue('');
    component.CameraForm.controls["isEncrypted"].setValue('');
    component.CameraForm.controls["cameraEnabled"].setValue('');
    component.CameraForm.controls["encryprtionFile"].setValue('test');
    component.CameraForm.controls["approach"].setValue('test');
    component.CameraForm.controls["cameraDescription"].setValue('test');
    component.updateRecord(data);
    expect(component.showAddForm).toBeFalsy();
    expect(component.searchData ).toEqual("");
  })

  it('toggleClient when not cameraEnabled', () => {
    let data = {
      active: true,
      cameraEnabled: true,
      cameraID: 69,
      cameraTypesName: "Mesa",
      firmwareVersion: "V1.0.0.0",
      latitude: 0,
      locationsName: "Location 01",
      longitude: 0,
      rententionDays: 5
    }
    component.toggleClient(data);
    expect(data.cameraEnabled).toBeTruthy();
  })

  it('toggleClient when cameraEnabled', () => {
    let data = {
      active: true,
      cameraEnabled: false,
      cameraID: 69,
      cameraTypesName: "Mesa",
      firmwareVersion: "V1.0.0.0",
      latitude: 0,
      locationsName: "Location 01",
      longitude: 0,
      rententionDays: 5
    }
    component.toggleClient(data);
    expect(data.cameraEnabled).toBeFalsy();
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
