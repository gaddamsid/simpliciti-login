import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { NoticeServiceStub } from 'src/app/shared/testCasesHelperClasses/NoticeServiceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { NoticeService } from '../../services/notice.service';

import { CitationDetailsComponent } from './citation-details.component';

describe('CitationDetailsComponent', () => {
  let component: CitationDetailsComponent;
  let fixture: ComponentFixture<CitationDetailsComponent>;
  let reqBody: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitationDetailsComponent ],
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: NoticeService, useClass: NoticeServiceStub },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitationDetailsComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    reqBody = {
      "sequenceNumber": 1,
      "pageNumber": 3,
      "numberOfPages": 2,
      "noticeTypeShortName": "ch.high",
      "noticeTypeDescription": "0 Ch. high violation",
      "mailDate": "2022-07-09T00:00:00",
      "citationNumber": "D031687918",
      "locationDesc": "37TH ST S/B @ WHITEHAVEN PKWY NW",
      "vinNumber": "MD7EB3592",
      "violName": "NO PRK ZN",
      "issueDateTime": "2022-05-06T00:00:00",
      "meter": " ",
      "badgeNumber": "900",
      "agencyCode": "XCaliber",
      "lastMailType": 101,
      "lastMailDate": "2022-05-11T00:00:00",
      "registryMake": "MAZD",
      "color": "1",
      "bodyStyle": "0",
      "vehicleYearMonth": 0,
      "plateExpireDate": "2020-03-05T00:00:00",
      "settlementDate": "2022-02-21T00:00:00",
      "settlementId": "5",
      "microFilmNo": 50,
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should formatInformation tab is financial', () => {
    let info = {
      "financialInformation": [
        {
          "reductionAmount": 0,
          "maxPenalty": 50,
          "penalty": 150,
          "totalDue": 160,
          "paidToDate": 20
        },
        {
          "reductionAmount": 0,
          "maxPenalty": 50,
          "penalty": 10,
          "totalDue": 160,
          "paidToDate": 20
        }
      ]
    }
    component.formatInformation(info, 'financial');
    expect(info.financialInformation.length).toBeGreaterThan(0);
  });

  it('should formatInformation when tab is notice', () => {
    component.formatInformation(reqBody, 'notice');
    expect(reqBody.citationNumber).toEqual('D031687918');
  });

  it('should formatInformation when tab is ticket', () => {
    component.formatInformation(reqBody, 'ticket');
    expect(reqBody.citationNumber).toEqual('D031687918');
  });

  it('should formatInformation when tab is issuance', () => {
    component.formatInformation(reqBody, 'issuance');
    expect(reqBody.citationNumber).toEqual('D031687918');
  });

  it('should click back', () => {
    component.back();
    expect(component).toBeTruthy();
  });

  it('should onlyDateFormat', () => {
    let date = '2020-03-05T00:00:00'
    component.onlyDateFormat(date);
    expect(component).toBeTruthy();
  });

  it('should onlyDateAndTimeFormat', () => {
    let date = '2020-03-05T10:00:00'
    component.onlyDateAndTimeFormat(date);
    expect(component).toBeTruthy();
  });

  it('should onlyTime', () => {
    let date = '2020-03-05T09:10:00'
    component.onlyTime(date);
    expect(component).toBeTruthy();
  });
});
