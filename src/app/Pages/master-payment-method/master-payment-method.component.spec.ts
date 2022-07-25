import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/shared/services/api.service';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ToastrService } from 'ngx-toastr';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { apiServiceStub} from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { MessageService } from 'src/app/shared/services/message.service';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { MasterPaymentMethodComponent } from './master-payment-method.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { messageServiceStub } from 'src/app/shared/testCasesHelperClasses/messageServiceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { TranslateTestingModule } from 'ngx-translate-testing';

// const ENGLISH_LANGUAGE = 'en';
// const SPANISH_LANGUAGE = 'es';
// const FRENCH_LANGUAGE = 'fr';
// const ARABIC_LANGUAGE = 'ar';
// const TRANSLATIONS_EN = require('../assets/i18n/en.json');
// const TRANSLATIONS_FR = require('../assets/i18n/fr.json');
// const TRANSLATIONS_SP = require('../assets/i18n/sp.json');
// const TRANSLATIONS_AR = require('../assets/i18n/ar.json');
// const TRANSLATIONS = {
//   [ENGLISH_LANGUAGE]: TRANSLATIONS_EN,
//   [SPANISH_LANGUAGE]: TRANSLATIONS_SP,
//   [FRENCH_LANGUAGE]:TRANSLATIONS_FR,
//   [ARABIC_LANGUAGE]:TRANSLATIONS_AR
// };
describe('MasterPaymentMethodComponent', () => {
  let component: MasterPaymentMethodComponent;
  let fixture: ComponentFixture<MasterPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterPaymentMethodComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        AngularmaterialModule,
        ReactiveFormsModule,
        TranslateStubsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule
  //       TranslateTestingModule.withTranslations(TRANSLATIONS),
  //       TranslateTestingModule.withTranslations(ENGLISH_LANGUAGE, TRANSLATIONS_EN)
  // .withTranslations(SPANISH_LANGUAGE, TRANSLATIONS_SP).withTranslations(FRENCH_LANGUAGE, TRANSLATIONS_FR).withTranslations(ARABIC_LANGUAGE, TRANSLATIONS_AR)
  // .withTranslations(ENGLISH_LANGUAGE, require('../../assets/i18n/en.json')).withTranslations(SPANISH_LANGUAGE, require('../../assets/i18n/sp.json')).withTranslations(FRENCH_LANGUAGE, require('../../assets/i18n/fr.json')).withTranslations(ARABIC_LANGUAGE, require('../../assets/i18n/ar.json')),
      ],
      providers: [
        { provide: ApiService, useClass: apiServiceStub},
        { provide: TranslateService, useClass:TranslateServiceStub},
        { provide: LanguageService, useClass:languageServiceStub},
        { provide: LiveAnnouncer, useValue: {}},
        { provide: ToastrService, useValue: {}},
        {provide: ValidationService, useValue: {}},
        {provide: MessageService, useClass: messageServiceStub}
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPaymentMethodComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('master-payment-method');
  });
  it('should check getList', () => {
    component.getList();
    fixture.detectChanges();
  });
  it('search and filter', () => {
    let input = fixture.debugElement.query(By.css('input'));
    let inputElement = input.nativeElement;
    component.getList();
    fixture.detectChanges();
    inputElement.value = 'abC';
    fixture.detectChanges();
    const event = new KeyboardEvent('keyup', { key: 'C' });
    inputElement.dispatchEvent(event);
    component.applyFilter(event);
    let searchData= (event.target as HTMLInputElement).value;
    let filter=searchData.trim().toLowerCase();
    expect(searchData.trim().toLowerCase()).toBe('abc');
    expect(component.dataSource.filter).toEqual('abc');
    expect(inputElement.value).toBe('abC');


    component.filterData();
    expect(component.dataSource.filter).toBe('abc');
    // expect(component.dataSource.filter).toBeUndefined();
  });
  it('should check addPaymentType() ',()=>{
    component.addPaymentType();
    expect(component.showAddForm).toEqual(true)
  })
  it('should check editRowOutput',()=>{
    const event = new KeyboardEvent('keyup', { key: 'C' });
    component.editRowOutput(event);
    expect(component.searchData).toEqual('');
    expect(component.showAddForm).toEqual(true);
  })
  it('deleteRowOutput',()=>{
    const $event = new KeyboardEvent('keyup', { key: 'C' });
    component.deleteRowOutput($event);
    component.getList();
  })
  it('saveFormOutput',()=>{
    const $event = {
      form:"saved"
    }
    component.saveFormOutput($event);
    expect(component.showAddForm).toEqual(false);
    component.getList();
  })
  it('cancelOutput',()=>{
    const $event = {
      cancel:"reset"
    }
    component.cancelOutput($event);
    component.getList();
    expect(component.showAddForm).toEqual(false);
  })
  it('  editFormOutput($event: any)',()=>{
    const $event = {
      form:"edit"
    }
    component.editFormOutput($event)
  })
  it('enableRowOutput',()=>{
      let item="edit"

    component.enableRowOutput(item)
  })
});
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "assets/i18n/", ".json");
}
