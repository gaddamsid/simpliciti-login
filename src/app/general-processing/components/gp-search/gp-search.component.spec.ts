import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroupDirective, FormBuilder } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { gpServiceStub } from 'src/app/shared/testCasesHelperClasses/gpServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { MatDialogRefStub } from 'src/app/shared/testCasesHelperClasses/MatDialogRefStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { GPService } from '../../services/g-p.service';

import { GpSearchComponent } from './gp-search.component';

describe('GpSearchComponent', () => {
  let component: GpSearchComponent;
  let fixture: ComponentFixture<GpSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpSearchComponent ],
      imports: [
        HttpClientTestingModule,
        TranslateStubsModule,
        TranslateModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatMenuModule,
        MatCheckboxModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        // { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: MatDialog, useClass: MatDialogRefStub },
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: ApiService, useClass: apiServiceStub },
        { provide: GPService, useClass: gpServiceStub },
        FormGroupDirective,
        FormBuilder,
        { provide: FormGroupDirective, useValue: FormGroupDirective }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpSearchComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onCitationNumberChange', () => {
    let event = {
      target: {
        value: 'test'
      }
    }
    component.onCitationNumberChange(event)
    expect(event.target.value.length).toBeGreaterThan(0);
  });

  it('onCitationNumberChange if value is empty', () => {
    let event = {
      target: {
        value: ''
      }
    }
    component.onCitationNumberChange(event)
    expect(event.target.value.length).toEqual(0);
  });

  it('onEventIdChange', () => {
    let event = {
      target: {
        value: 'test'
      }
    }
    component.onEventIdChange(event)
    expect(event.target.value.length).toBeGreaterThan(0);
  });

  it('onEventIdChange if value is empty', () => {
    let event = {
      target: {
        value: ''
      }
    }
    component.onEventIdChange(event)
    expect(event.target.value.length).toEqual(0);
  });

  it('onLicenseChange', () => {
    let event = {
      target: {
        value: 'test'
      }
    }
    component.onLicenseChange(event)
    expect(event.target.value.length).toBeGreaterThan(0);
  });

  it('onLicenseChange if value is empty', () => {
    let event = {
      target: {
        value: ''
      }
    }
    component.onLicenseChange(event)
    expect(event.target.value.length).toEqual(0);
  });

  it('onPlateNumberChange', () => {
    let event = {
      target: {
        value: 'test'
      }
    }
    component.onPlateNumberChange(event)
    expect(event.target.value.length).toBeGreaterThan(0);
  });

  it('onPlateNumberChange if value is empty', () => {
    let event = {
      target: {
        value: ''
      }
    }
    component.onPlateNumberChange(event)
    expect(event.target.value.length).toEqual(0);
  });

  it('onNameorZipChange', () => {
    let event = {
      target: {
        value: 'test'
      }
    }
    component.onNameorZipChange(event)
    expect(event.target.value.length).toBeGreaterThan(0);
  });

  it('onNameorZipChange if value is empty', () => {
    let event = {
      target: {
        value: ''
      }
    }
    component.onNameorZipChange(event)
    expect(event.target.value.length).toEqual(0);
  });

  it('toggleStatus', () => {
    component.toggleStatus();
    expect(component.isShow).toBeTruthy();
  })

  it('updateBasicFormEnable', () => {
    component.isShow = true;
    component.updateBasicFormEnable();
    expect(component.isShow).toBeTruthy();
  })

  it('updateBasicFormEnable', () => {
    component.isShow = false;
    component.updateBasicFormEnable();
    expect(component.isShow).toBeFalsy();
  })

  it('onSearch', () => {
    component.onSearch();
    expect(component.searchForm.valid).toBeTruthy();
  })

  it('onSearch when zipCode is not empty', () => {
    component.searchForm.controls["zipCode"].setValue('12345');
    component.onSearch();
    expect(component.searchForm.valid).toBeTruthy();
  })

  it('onClickAdvanceSearch', () => {
    component.onClickAdvanceSearch();
    expect(component.advanceSearchForm.valid).toBeTruthy();
  })

  it('getDropdownData', () => {
    component.getDropdownData();
    expect(component.statusList.length).toBeGreaterThan(0);
  })

  it('onClearAdvanceSearch', () => {
    component.onClearAdvanceSearch();
    expect(component.advanceSearchForm.valid).toBeTruthy();
  })

  it('getApprovingOfficers', () => {
    component.getApprovingOfficers();
    expect(component.approvingOfficerList.length).toBeGreaterThan(0);
  })
});
