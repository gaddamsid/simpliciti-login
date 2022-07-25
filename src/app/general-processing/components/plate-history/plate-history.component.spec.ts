import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateHistoryComponent } from './plate-history.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GPService } from 'src/app/general-processing/services/g-p.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { plateHistoryServicesStub } from 'src/app/shared/testCasesHelperClasses/platehistoryserviceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('PlateHistoryComponent', () => {
  let component: PlateHistoryComponent;
  let fixture: ComponentFixture<PlateHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlateHistoryComponent ],
      imports: [
        TranslateStubsModule,
        TranslateModule.forRoot(),
        BrowserModule,
        FormsModule,
        RouterModule,
        RouterTestingModule,
        ReactiveFormsModule,
        AngularmaterialModule,
        HttpClientTestingModule,
        BrowserDynamicTestingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule
      ],
      providers: [
         { provide: GPService, useClass:plateHistoryServicesStub},
        { provide: LanguageService, useClass:languageServiceStub},
        { provide: ActivatedRoute, useValue:{}},
        { provide: Router, useValue:{}},
    ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateHistoryComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return list', () => {
    let id=1;
    component.getPlateHistory(id);
    fixture.detectChanges();
    expect(component.isLoading).toBeFalsy();
  });
});
