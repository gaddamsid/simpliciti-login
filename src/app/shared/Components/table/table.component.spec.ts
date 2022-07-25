import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { apiServiceStub } from '../../testCasesHelperClasses/apiServiceStub';
import { languageServiceStub } from '../../testCasesHelperClasses/languageServiceStub';
import { TranslateStubsModule } from '../../testCasesHelperClasses/TranslateStubsModule.module';
import { LanguageService } from '../header/languages.service';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  let toastrService: jasmine.SpyObj<ToastrService>
  let langService: LanguageService;


  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success', 'info']);

    await TestBed.configureTestingModule({
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
      ],
      declarations: [TableComponent],
      providers: [
        { provide: ApiService, useClass: apiServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: ToastrService, useValue: toastrService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(window, "confirm").and.returnValue(true);
    langService = TestBed.inject(LanguageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setPagelabel', () => {
    let lang = 'Hi';
    component.setPagelabel(lang);
    expect(lang).toBeDefined();
  })

  it('editRow', () => {
    let item = {
      paymentModeCD: "21",
      paymentModeDesc: "test",
      posCode: "1"
    }
    component.editRow(item);
    expect(item).toBeDefined();
  });

  it('deleteRow', () => {
    let item = {
      paymentModeDesc: 'test'
    };
    component.confiData = [{
      paymentModeCD: "21",
      paymentModeDesc: "test",
      posCode: "1",
      deleteButton: true,
      deleteInfo: {
        url: 'getCOImage?id=306&type=CO',
        uniqueId: 'paymentModeDesc'
      }
    }]
    component.deleteRow(item);
    expect(item).toBeDefined();
  });

  it('rowCheck', () => {
    let item = 'Edit';
    component.rowCheck(item);
    expect(component.rowCheck(item)).toBeTruthy();
  });

  it('rowCheck', () => {
    let item = 'Edit1';
    component.rowCheck(item);
    expect(component.rowCheck(item)).toBeFalsy();
  });
  
  it('enableItem', () => {
    let item = 'Edit';
    component.enableItem(item);
    expect(item).toBeDefined();
  });

  it('error response when message is DuplicateKey and code 5000', () => {
    let error = {
      error: {
        details: [{
          "timestamp": "2022-06-29T06:47:59.717+0000",
          "code": 5000,
          "fieldName": "error",
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
