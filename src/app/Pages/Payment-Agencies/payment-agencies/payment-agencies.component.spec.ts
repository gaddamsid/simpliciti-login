import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { PaymentAgenciesService } from 'src/app/Services/payment-agencies.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { PaymentAgenciesServiceStub } from 'src/app/shared/testCasesHelperClasses/PaymentAgenciesServiceStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { ValidationServiceStub } from 'src/app/shared/testCasesHelperClasses/ValidationServiceStub';
import { ValidationService } from 'src/app/shared/validation/validation.service';

import { PaymentAgenciesComponent } from './payment-agencies.component';

describe('PaymentAgenciesComponent', () => {
  let component: PaymentAgenciesComponent;
  let fixture: ComponentFixture<PaymentAgenciesComponent>;
  let inputElement: HTMLInputElement;
  let formData: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentAgenciesComponent],
      imports: [
        HttpClientTestingModule,
        TranslateStubsModule,
        TranslateModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        RouterTestingModule,
        MatSortModule,
        AngularmaterialModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ValidationService, useClass: ValidationServiceStub },
        { provide: PaymentAgenciesService, useClass: PaymentAgenciesServiceStub },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(window, "confirm").and.returnValue(true);
    formData = {
      city: "London",
      comments: "testing",
      enable: false,
      imageError: "error",
      line1: "Black plain",
      line2: "test",
      logoLink: "https://tsgedetimsmodasa01.blob.core.windows.net/default/logos/PNG_transparency_demonstration_1.png",
      logoName: "",
      logoUpload: "",
      name: "Edit Name",
      payByWeb: "121",
      payLink: "www.testedit.com",
      payVendor: 3,
      phone: "9876543211",
      state: 48,
      videoError: "error",
      workflow: 35,
      zip: "767651"
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Agencies');
  })

  it('agenciesForm form should be invalid when empty', () => {
    component.agenciesForm.controls["name"].setValue('');
    component.agenciesForm.controls["payVendor"].setValue('');
    component.agenciesForm.controls["workflow"].setValue('');
    component.agenciesForm.controls["payLink"].setValue('');
    component.agenciesForm.controls["payByWeb"].setValue('');
    component.agenciesForm.controls["line1"].setValue('');
    component.agenciesForm.controls["line2"].setValue('');
    component.agenciesForm.controls["city"].setValue('');
    component.agenciesForm.controls["state"].setValue('');
    component.agenciesForm.controls["zip"].setValue('');
    component.agenciesForm.controls["phone"].setValue('');
    component.agenciesForm.controls["imageError"].setValue('');
    component.agenciesForm.controls["enable"].setValue('');
    component.agenciesForm.controls["logoUpload"].setValue('');
    component.agenciesForm.controls["logoName"].setValue('');
    component.agenciesForm.controls["videoError"].setValue('');
    component.agenciesForm.controls["logoLink"].setValue('');
    component.agenciesForm.controls["comments"].setValue('');
    expect(component.agenciesForm.valid).toBeFalsy();
  });

  it('agenciesForm form should be valid when not empty', () => {
    component.agenciesForm.controls["name"].setValue('test');
    component.agenciesForm.controls["payVendor"].setValue('test');
    component.agenciesForm.controls["workflow"].setValue('test');
    component.agenciesForm.controls["payLink"].setValue('test');
    component.agenciesForm.controls["payByWeb"].setValue('test');
    component.agenciesForm.controls["line1"].setValue('test');
    component.agenciesForm.controls["line2"].setValue('test');
    component.agenciesForm.controls["city"].setValue('test');
    component.agenciesForm.controls["state"].setValue('test');
    component.agenciesForm.controls["zip"].setValue('23324');
    component.agenciesForm.controls["phone"].setValue('9932456782');
    component.agenciesForm.controls["imageError"].setValue('error');
    component.agenciesForm.controls["enable"].setValue(false);
    component.agenciesForm.controls["logoUpload"].setValue('test');
    component.agenciesForm.controls["logoName"].setValue('test');
    component.agenciesForm.controls["videoError"].setValue('test');
    component.agenciesForm.controls["logoLink"].setValue('test');
    component.agenciesForm.controls["comments"].setValue('test');
    expect(component.agenciesForm.valid).toBeTruthy();
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

  it('workflowStateSelect', () => {
    let event = {
      value: 1
    }
    component.workflowStateSelect(event);
    expect(component.agenciesForm.controls['workflow'].status).toEqual('VALID');
  })

  it('stateSelect', () => {
    let event = {
      value: 48
    }
    component.stateSelect(event);
    expect(component.agenciesForm.controls['state'].status).toEqual('VALID');
  })

  it('payVendorSelect', () => {
    let event = {
      value: 2
    }
    component.payVendorSelect(event);
    expect(component.agenciesForm.controls['payVendor'].status).toEqual('VALID');
  })

  it('apply filter, format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    component.getAgencies();
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
    expect(component.dataSource.filter).toBe('abc');
  });

  it('addAgencyRecord', () => {
    component.agenciesForm.controls["name"].setValue('test');
    component.agenciesForm.controls["payVendor"].setValue('test');
    component.agenciesForm.controls["workflow"].setValue('test');
    component.agenciesForm.controls["payLink"].setValue('test');
    component.agenciesForm.controls["payByWeb"].setValue('test');
    component.agenciesForm.controls["line1"].setValue('test');
    component.agenciesForm.controls["line2"].setValue('test');
    component.agenciesForm.controls["city"].setValue('test');
    component.agenciesForm.controls["state"].setValue('test');
    component.agenciesForm.controls["zip"].setValue('23324');
    component.agenciesForm.controls["phone"].setValue('9932456782');
    component.agenciesForm.controls["imageError"].setValue('error');
    component.agenciesForm.controls["enable"].setValue(false);
    component.agenciesForm.controls["logoUpload"].setValue('test');
    component.agenciesForm.controls["logoName"].setValue('test');
    component.agenciesForm.controls["videoError"].setValue('test');
    component.agenciesForm.controls["logoLink"].setValue('test');
    component.agenciesForm.controls["comments"].setValue('test');
    component.addAgencyRecord(formData);
  })

  xit('handleFileInput when file type is jpeg', () => {
    let event = {
      files: [
        {
          lastModified: 1657086218260,
          lastModifiedDate: '06/07/2022',
          name: "download.jpg",
          size: 3877,
          type: "image/jpeg",
          webkitRelativePath: ""
        }
      ]
    }
    component.handleFileInput(event);
    expect(component.logoFileName).toEqual(event.files[0].name);
  })

  it('handleFileInput when file type is jpeg and file size is greater than 2000000', () => {
    let event = {
      files: [
        {
          lastModified: 1657086218260,
          lastModifiedDate: '06/07/2022',
          name: "download.jpg",
          size: 2000001,
          type: "image/jpeg",
          webkitRelativePath: ""
        }
      ]
    }
    component.handleFileInput(event);
    expect(component.logoFileName).toEqual(event.files[0].name);
  })

  it('handleFileInput when file type is jpg', () => {
    let event = {
      files: [
        {
          lastModified: 1657086218260,
          lastModifiedDate: '06/07/2022',
          name: "download.jpg",
          size: 3877,
          type: "image/jpg",
          webkitRelativePath: ""
        }
      ]
    }
    component.handleFileInput(event);
    expect(component.logoFileName).toEqual(event.files[0].name);
  })
  
  it('editIconClicked', () => {
    let rowData = {
      paymentAgenciesID: 1
    }
    component.editIconClicked(rowData);
    expect(component.showEditForm).toBeTruthy();
  })

  it('updateAgencyRecord', () => {
    component.agenciesForm.controls["name"].setValue('test');
    component.agenciesForm.controls["payVendor"].setValue('test');
    component.agenciesForm.controls["workflow"].setValue('test');
    component.agenciesForm.controls["payLink"].setValue('test');
    component.agenciesForm.controls["payByWeb"].setValue('test');
    component.agenciesForm.controls["line1"].setValue('test');
    component.agenciesForm.controls["line2"].setValue('test');
    component.agenciesForm.controls["city"].setValue('test');
    component.agenciesForm.controls["state"].setValue('test');
    component.agenciesForm.controls["zip"].setValue('23324');
    component.agenciesForm.controls["phone"].setValue('9932456782');
    component.agenciesForm.controls["imageError"].setValue('error');
    component.agenciesForm.controls["enable"].setValue(false);
    component.agenciesForm.controls["logoUpload"].setValue('test');
    component.agenciesForm.controls["logoName"].setValue('test');
    component.agenciesForm.controls["videoError"].setValue('test');
    component.agenciesForm.controls["logoLink"].setValue('test');
    component.agenciesForm.controls["comments"].setValue('test');
    component.editIconClicked(formData);
    component.updateAgencyRecord(formData);
    expect(component.showAddForm).toBeFalsy();
    expect(component.showEditForm).toBeFalsy();
  })

  it('toggleAgency if status true', () => {
    let id = 1;
    component.toggleAgency(id, true);
    expect(component.successMsg).toEqual("Agency Enabled Successfully");
  })

  it('toggleAgency if status false', () => {
    let id = 1;
    component.toggleAgency(id, false);
    expect(component.successMsg).toEqual("Agency Disabled Successfully");
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
});
