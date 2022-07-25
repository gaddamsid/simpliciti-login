import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityDetailsComponent } from './entity-details.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from '@angular/common/http';
import { PaymentCartService } from 'src/app/shared/services/payment-cart.service';
import { ToastrService } from 'ngx-toastr';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { MatMenuModule } from '@angular/material/menu';
import { gpServiceStub } from 'src/app/shared/testCasesHelperClasses/gpServiceStub';
import { GPService } from 'src/app/general-processing/services/g-p.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { PaymentCartServiceStub } from 'src/app/shared/testCasesHelperClasses/PaymentCartServiceStub';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, TemplateRef } from '@angular/core';
import { MatDialogRefStub } from 'src/app/shared/testCasesHelperClasses/MatDialogRefStub';
import { MatFormFieldModule } from '@angular/material/form-field';
describe('EntityDetailsComponent', () => {
  let component: EntityDetailsComponent;
  let fixture: ComponentFixture<EntityDetailsComponent>;
  let templateRef = TemplateRef

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityDetailsComponent],
      imports: [
        TranslateStubsModule,
        RouterTestingModule,
        HttpClientModule,
        MatMenuModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        AngularmaterialModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: GPService, useClass: gpServiceStub },
        { provide: MatDialog, useClass: MatDialogRefStub },
        { provide: PaymentCartService, useClass: PaymentCartServiceStub },
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityDetailsComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on Select Event when value 3', () => {
    let val = 3;
    component.onSelectEvent(val);
    expect(component.isLoading).toBeFalsy();
  })

  it('on Select Event when value 19', () => {
    let val = 19;
    component.onSelectEvent(val);
    expect(component.isAmtTotalDue).toBeFalsy();
  })

  it('on Select Event when value 8', () => {
    let val = 8;
    component.onSelectEvent(val);
    expect(component.hearingRequestTable).toBeTruthy();
  })

  it('on Select Event when value 9', () => {
    let val = 9;
    component.onSelectEvent(val);
    expect(component.isLoading).toBeFalsy();
  })

  it('on Select Event when value 18', () => {
    let val = 18;
    component.onSelectEvent(val);
    expect(component.hearingShow).toBeTruthy();
  })

  it('on Select Event when value 11', () => {
    let val = 11;
    component.onSelectEvent(val);
    expect(component.paymentDetails).toBeFalsy();
  })

  it('on Select Event when value 16', () => {
    let val = 16;
    component.onSelectEvent(val);
    expect(component.hearingRequestTable).toBeFalsy();
  })

  it('on Select Event when value 1', () => {
    let val = 1;
    component.onSelectEvent(val);
    expect(component.hearingRequestTable).toBeFalsy();
  })

  it('on Select Event when value 14', () => {
    let val = 14;
    component.onSelectEvent(val);
    expect(component.hearingRequestTable).toBeFalsy();
  })

  it('Ticket History', () => {
    component.masterToggle();
    component.getTicketHistory();
    component.citationsIDArray.length = 1;
    expect(component.citationsIDArray.length).toBeGreaterThan(0);
  })

  // it('PDF donwload', () => {
  //   component.downloadAsPDF();
  // })

  it('plate histroy View', () => {
    component.platehistroyView(true);
  })

  it('get Citation Number', () => {
    component.getCitationNumber(component.plateNoDlNo);
  })

  it('onClickCart', () => {
    component.onClickCart();
    expect(component.isLoading).toBeFalsy();
  })

  it('redirect Should Happen', () => {
    component.masterToggle();
    component.redirectShouldHappen();
    component.citationsIDArray.length = 1;
    expect(component.citationsIDArray.length).toBeGreaterThan(0);
  })

  it('masterToggle', () => {
    component.selection.select({
      "plateNumber": "MD7EB3592",
      "vinNumber": " ",
      "plateExpireDate": "2020-03-05",
      "entityNumber": 35665578,
      "source": "Registry",
      "sourceDate": "2010-01-05",
      "accountEntityId": 102187
    })
    component.dataSource.data = [{
      "plateNumber": "MD7EB3592",
      "vinNumber": " ",
      "plateExpireDate": "2020-03-05",
      "entityNumber": 35665578,
      "source": "Registry",
      "sourceDate": "2010-01-05",
      "accountEntityId": 102187
    }];
    component.masterToggle();
    expect(component.citationsIDArray).toEqual([]);
  })

  it('removePlatehistroy when event is true', () => {
    component.removePlatehistroy(true);
    expect(component.isplateHistoryView).toBeFalsy();
  })

  it('removePlatehistroy when event is false', () => {
    component.removePlatehistroy(false);
    expect(component.isplateHistoryView).toBeTruthy();
  })

  it('onCheck', () => {
    let rowData = {
      citationId: 0,
      citationNo: 878788
    };
    component.onCheck(rowData);
    expect(component.isplateHistoryView).toBeFalsy();
  })

  it('isSomeSelected', () => {
    component.isSomeSelected();
    component.selection.selected.length = 1;
    expect(component.selection.selected.length).toBeGreaterThan(0);
  })

  it('findByPlateNumber', () => {
    component.findByPlateNumber('MD7EB3592');
    expect(component.isLoading).toBeFalsy();
  })

  it('dialogClose', () => {
    component.dialogClose();
    expect(component).toBeTruthy();
  })

  it('findByTicketNumber', () => {
    component.findByTicketNumber('D031687918');
    expect(component.currentTicketNumber).toEqual('D031687918');
  })

  it('addTicketNote', () => {
    component.findByPlateNumber('MD7EB3592');
    component.citationsIDArray = [{
      "citationId": 106094,
			"citationNo": "D031687918"
    }]
    component.addTicketNote();
    expect(component.queryArray.length).toBeGreaterThan(0);
  })

  it('addTicketNote when queryArray is empty', () => {
    component.findByPlateNumber('MD7EB3592');
    component.queryArray = [];
    component.addTicketNote();
    expect(component.queryArray.length).toEqual(0);
  })
});
