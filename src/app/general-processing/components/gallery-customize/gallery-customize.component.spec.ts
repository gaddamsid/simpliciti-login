import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GalleryCustomizeComponent } from './gallery-customize.component';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { TranslateService } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { ToastrService } from "ngx-toastr";
import { GPService } from "../../services/g-p.service";
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { GPStateServiceStub } from 'src/app/shared/testCasesHelperClasses/GPStateServiceStub';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { MatDialogRefStub } from 'src/app/shared/testCasesHelperClasses/MatDialogRefStub';
import { ResizedEvent } from 'angular-resize-event';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';


describe('GalleryCustomizeComponent', () => {
  let component: GalleryCustomizeComponent;
  let fixture: ComponentFixture<GalleryCustomizeComponent>;
  let reqBody: any;
  let event: ResizedEvent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryCustomizeComponent],
      imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        RouterTestingModule,
        ReactiveFormsModule,
        AngularmaterialModule,
        TranslateStubsModule,
        HttpClientTestingModule,
        BrowserDynamicTestingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: GPService, useClass: GPStateServiceStub },
        { provide: ApiService, useClass: apiServiceStub },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryCustomizeComponent);
    component = fixture.componentInstance;
    spyOn(window, 'confirm').and.returnValue(true);
    fixture.detectChanges();
    reqBody = {
      citation: 'Y',
      citationHeight: 100,
      contractId: 2,
      functional: '1',
      image: 'Y',
      imageHeight: 100,
      layoutType: '1',
      nameAddress: 'Y',
      nameAddressHeight: 100,
      payementHeight: 100,
      payments: 'Y',
      processing: 'Y',
      processingHeight: 100,
      userId: 1,
      violation: 'Y',
      violationHeight: 100,
    }
    event = {
      isFirst: true,
      newRect: {
        bottom: 100,
        height: 100,
        left: 0,
        right: 292.078125,
        top: 0,
        width: 292.078125,
        x: 0,
        y: 0,
        toJSON() { }
      },
      oldRect: undefined
    }
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should render title in h3 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Customize Your layout');
  })

  it('layoutForm should be valid even if all fields are empty', () => {
    component.layoutForm.controls["citation"].setValue('');
    component.layoutForm.controls["itationHeight"].setValue('');
    component.layoutForm.controls["contractId"].setValue('');
    component.layoutForm.controls["functional"].setValue('');
    component.layoutForm.controls["image"].setValue('');
    component.layoutForm.controls["imageHeight"].setValue('');
    component.layoutForm.controls["layoutPrefrenceId"].setValue('');
    component.layoutForm.controls["layoutType"].setValue('');
    component.layoutForm.controls["nameAddress"].setValue('');
    component.layoutForm.controls["nameAddressHeight"].setValue('');
    component.layoutForm.controls["payementHeight"].setValue('');
    component.layoutForm.controls["payments"].setValue('');
    component.layoutForm.controls["processing"].setValue('');
    component.layoutForm.controls["processingHeight"].setValue('');
    component.layoutForm.controls["userId"].setValue('');
    component.layoutForm.controls["violation"].setValue('');
    component.layoutForm.controls["violationHeight"].setValue('');
    expect(component.layoutForm.valid).toBeTruthy();
  })

  it('layoutForm should be valid when empty', () => {
    component.layoutForm.controls["citation"].setValue('Y');
    component.layoutForm.controls["itationHeight"].setValue(100);
    component.layoutForm.controls["contractId"].setValue(2);
    component.layoutForm.controls["functional"].setValue('1');
    component.layoutForm.controls["image"].setValue('Y');
    component.layoutForm.controls["imageHeight"].setValue(100);
    component.layoutForm.controls["layoutPrefrenceId"].setValue('1');
    component.layoutForm.controls["layoutType"].setValue('1');
    component.layoutForm.controls["nameAddress"].setValue('Y');
    component.layoutForm.controls["nameAddressHeight"].setValue(100);
    component.layoutForm.controls["payementHeight"].setValue(100);
    component.layoutForm.controls["payments"].setValue('Y');
    component.layoutForm.controls["processing"].setValue('Y');
    component.layoutForm.controls["processingHeight"].setValue(100);
    component.layoutForm.controls["userId"].setValue('1');
    component.layoutForm.controls["violation"].setValue('Y');
    component.layoutForm.controls["violationHeight"].setValue(100);
    expect(component.layoutForm.valid).toBeTruthy();
  })

  it('ViolationResized', () => {
    component.ViolationResized(event);
    expect(component.customLayout.violationHeight).toEqual(100);
  })

  it('AddressResized', () => {
    component.AddressResized(event);
    expect(component.customLayout.nameAddressHeight).toEqual(100);
  })

  it('CitationResized', () => {
    component.CitationResized(event);
    expect(component.customLayout.citationHeight).toEqual(100);
  })

  it('PaymentsResized', () => {
    component.PaymentsResized(event);
    expect(component.customLayout.processingHeight).toEqual(100);
  })

  it('ProcessingResized', () => {
    component.ProcessingResized(event);
    expect(component.customLayout.processingHeight).toEqual(100);
  })

  it('toggleField', () => {
    let val = '1';
    component.toggleField(val);
    expect(component.customLayout.layoutType).toEqual('1');
  })

  it('if isChecked is true', () => {
    let event = {
      checked: true
    };
    component.isChecked(event, 'citation');
    expect(component.customLayout.citation).toEqual('Y');
  })

  it('if isChecked is false', () => {
    let event = {
      checked: false
    };
    component.isChecked(event, 'citation');
    expect(component.customLayout.citation).toEqual('N');
  })

  it('getcustomlayout', () => {
    component.getcustomlayout();
    expect(component.isUpdate).toBeTruthy();
  })

  it('SaveLayout', () => {
    component.SaveLayout();
    expect(component.isUpdate).toBeTruthy();
  })
});