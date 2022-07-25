import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { ContractService } from 'src/app/Services/Contract/contract.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ContractServiceStub } from 'src/app/shared/testCasesHelperClasses/contractServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';

import { ContractComponent } from './contract.component';

describe('ContractComponent', () => {
  let component: ContractComponent;
  let fixture: ComponentFixture<ContractComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AngularmaterialModule,
        TranslateStubsModule,
        HttpClientTestingModule,
        BrowserDynamicTestingModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: ContractService, useClass: ContractServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag when showSettingForm will be false', () => {
    const title = fixture.debugElement.nativeElement;
    component.showSettingForm = false;
    expect(title.querySelector('h3').textContent).toContain('Contract');
  })

  it('Add Contract form should be invalid when empty', () => {
    component.addContractForm.controls["clientsID"].setValue('');
    component.addContractForm.controls["name"].setValue('');
    component.addContractForm.controls["identifier"].setValue('');
    component.addContractForm.controls["code"].setValue('');
    component.addContractForm.controls["contractType"].setValue('');
    component.addContractForm.controls["stateProvincesID"].setValue('');
    component.addContractForm.controls["timeZonesID"].setValue('');
    component.addContractForm.controls["programManagerUserID"].setValue('');
    component.addContractForm.controls["payByWebCode"].setValue('');
    expect(component.addContractForm.valid).toBeFalsy();
  });

  it('Add Contract form should be valid when not empty', () => {
    component.addContractForm.controls["clientsID"].setValue('test');
    component.addContractForm.controls["name"].setValue('John');
    component.addContractForm.controls["identifier"].setValue('test');
    component.addContractForm.controls["code"].setValue('033');
    component.addContractForm.controls["contractType"].setValue('test');
    component.addContractForm.controls["stateProvincesID"].setValue('test');
    component.addContractForm.controls["timeZonesID"].setValue('test');
    component.addContractForm.controls["programManagerUserID"].setValue('test');
    component.addContractForm.controls["payByWebCode"].setValue('test');
    expect(component.addContractForm.valid).toBeTruthy();
  });

  it('Contract Setting form should be invalid when empty', () => {
    component.contractSettingForm.controls["eventSequenceNumber"].setValue('');
    component.contractSettingForm.controls["citationNumberFormat"].setValue('');
    component.contractSettingForm.controls["citationSequenceNumber"].setValue('');
    component.contractSettingForm.controls["convenienceFee"].setValue('');
    component.contractSettingForm.controls["percentageConvenienceFee"].setValue('');
    component.contractSettingForm.controls["thresholdAmountConvenienceFee"].setValue('');
    component.contractSettingForm.controls["maximumBatchSize"].setValue('');
    component.contractSettingForm.controls["offlineBatchLimit"].setValue('');
    component.contractSettingForm.controls["batchSequenceNumber"].setValue('');
    component.contractSettingForm.controls["batchEncryptionPassword"].setValue('');
    component.contractSettingForm.controls["neighborThreshold"].setValue('');
    component.contractSettingForm.controls["pointOfContactName"].setValue('');
    component.contractSettingForm.controls["maxoutAdvanceSearchResults"].setValue('');
    component.contractSettingForm.controls["maxoutPrintingArchiveResults"].setValue('');
    component.contractSettingForm.controls["courtEventsCutOffDays"].setValue('');
    component.contractSettingForm.controls["appTimeout"].setValue('');
    expect(component.contractSettingForm.valid).toBeFalsy();
  });

  it('Contract Setting form should be invalid when not empty', () => {
    component.contractSettingForm.controls["eventSequenceNumber"].setValue('12345');
    component.contractSettingForm.controls["citationNumberFormat"].setValue('12345');
    component.contractSettingForm.controls["citationSequenceNumber"].setValue('12345');
    component.contractSettingForm.controls["convenienceFee"].setValue('25');
    component.contractSettingForm.controls["percentageConvenienceFee"].setValue('20');
    component.contractSettingForm.controls["thresholdAmountConvenienceFee"].setValue('10');
    component.contractSettingForm.controls["maximumBatchSize"].setValue('10');
    component.contractSettingForm.controls["offlineBatchLimit"].setValue('10');
    component.contractSettingForm.controls["batchSequenceNumber"].setValue('123');
    component.contractSettingForm.controls["batchEncryptionPassword"].setValue('12345678');
    component.contractSettingForm.controls["neighborThreshold"].setValue('test');
    component.contractSettingForm.controls["pointOfContactName"].setValue('test');
    component.contractSettingForm.controls["maxoutAdvanceSearchResults"].setValue('test');
    component.contractSettingForm.controls["maxoutPrintingArchiveResults"].setValue('test');
    component.contractSettingForm.controls["courtEventsCutOffDays"].setValue('10');
    component.contractSettingForm.controls["appTimeout"].setValue('231342');
    expect(component.contractSettingForm.valid).toBeTruthy();
  });

  it('apply filter, format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    component.getContractList();
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

  it('isNumberKey function return true when keyCode is 46', () => {
    let evt = {
      keyCode: 46,
      which: false
    }
    let txt = { value: 'test' };
    component.isNumberKey(txt, evt);
    expect(evt.keyCode).toEqual(46);
    expect(txt.value.indexOf('.')).toBe(-1)
    expect(component.isNumberKey(txt, evt)).toBeTruthy();
  })

  it('isNumberKey function return false when keyCode is 46', () => {
    let evt = {
      keyCode: 46,
      which: false
    }
    let txt = { value: 'test.2' };
    expect(evt.keyCode).toEqual(46);
    component.isNumberKey(txt, evt);
    expect(txt.value.indexOf('.')).toBeGreaterThan(0)
    expect(component.isNumberKey(txt, evt)).toBeFalsy();
  })

  it('isNumberKey function return false when keyCode is 37', () => {
    let evt = {
      keyCode: 37,
      which: false
    }
    let txt = { value: 'test.2' };
    expect(evt.keyCode).toBeGreaterThan(31);
    expect(evt.keyCode).toBeLessThan(48);
    component.isNumberKey(txt, evt);
    expect(component.isNumberKey(txt, evt)).toBeFalsy();
  })

  it('Edit Contract function', () => {
    let data: any = [
      {
        "active": true,
        "cbiDashboardLink": null,
        "clientsID": 2,
        "codeName": null,
        "contractName": "Default",
        "contractTypeId": 2,
        "contractTypeName": null,
        "contractsID": 1,
        "createDatetime": "0001-01-01T00:00:00",
        "createUserID": 0,
        "identifierName": "default",
        "isDeleted": "N",
        "mavroCode": null,
        "name": "Suffolk",
        "partialPaymentDueValidation": true,
        "partialPaymentValidation": true,
        "passwordExpirationLength": 90,
        "payByWebCode": 0,
        "programManagerId": 3,
        "programManagerName": "Jack Mack",
        "stateProvinceName": "Virginia",
        "stateProvincesID": 1,
        "timeZone": null,
        "timeZonesID": 1,
        "twoFactorEnabled": true,
        "updateDatetime": "0001-01-01T00:00:00",
        "updateUserID": 0
      }
    ];
    component.editContract(data);
    expect(component.showAddForm).toBeTruthy();
    expect(component.hideTable).toBeTruthy();
  })

  it('Update Contract function', () => {
    let data: any = [
      {
        "name": "Suffolk",
        "identifierName": "default",
        "codeName": null,
        "payByWebCode": 0,
        "programManagerId": 3,
        "stateProvinceName": "Hawaii",
        "timeZone": null,
        "cbiDashboardLink": null,
        "passwordExpirationLength": 90,
        "mavroCode": null,
        "twoFactorEnabled": true,
        "partialPaymentValidation": true,
        "contractTypeName": null,
        "contractName": "Default",
        "programManagerName": "Jack Mack",
        "clientsID": 2,
        "contractsID": 1,
        "stateProvincesID": 1,
        "timeZonesID": 1,
        "contractTypeId": 2,
        "partialPaymentDueValidation": true,
        "active": true,
        "createUserID": 0,
        "updateUserID": 0,
        "createDatetime": "0001-01-01T00:00:00",
        "updateDatetime": "0001-01-01T00:00:00",
        "isDeleted": "N"
      }
    ];
    let editReqBody: any = [
      {
        "active": true,
        "cbiDashboardLink": null,
        "clientsID": 2,
        "codeName": null,
        "contractName": "Default",
        "contractTypeId": 2,
        "contractTypeName": null,
        "contractsID": 1,
        "createDatetime": "0001-01-01T00:00:00",
        "createUserID": 0,
        "identifierName": "default",
        "isDeleted": "N",
        "mavroCode": null,
        "name": "Suffolk",
        "partialPaymentDueValidation": true,
        "partialPaymentValidation": true,
        "passwordExpirationLength": 90,
        "payByWebCode": 0,
        "programManagerId": 3,
        "programManagerName": "Jack Mack",
        "stateProvinceName": "Virginia",
        "stateProvincesID": 1,
        "timeZone": null,
        "timeZonesID": 1,
        "twoFactorEnabled": true,
        "updateDatetime": "0001-01-01T00:00:00",
        "updateUserID": 0
      }
    ];
    component.editContract(editReqBody);
    component.addContractForm.controls["clientsID"].setValue('test');
    component.addContractForm.controls["name"].setValue('John');
    component.addContractForm.controls["identifier"].setValue('test');
    component.addContractForm.controls["code"].setValue('033');
    component.addContractForm.controls["contractType"].setValue('test');
    component.addContractForm.controls["stateProvincesID"].setValue('test');
    component.addContractForm.controls["timeZonesID"].setValue('test');
    component.addContractForm.controls["programManagerUserID"].setValue('test');
    component.addContractForm.controls["payByWebCode"].setValue('test');
    component.saveEditContract(data);
    expect(component.showAddForm).toBeFalsy();
  })

  it('openSettingForm', () => {
    let data: any = [
      {
        "name": "Suffolk",
        "identifierName": "default",
        "codeName": null,
        "payByWebCode": 0,
        "programManagerId": 3,
        "stateProvinceName": "Hawaii",
        "timeZone": null,
        "cbiDashboardLink": null,
        "passwordExpirationLength": 90,
        "mavroCode": null,
        "twoFactorEnabled": true,
        "partialPaymentValidation": true,
        "contractTypeName": null,
        "contractName": "Default",
        "programManagerName": "Jack Mack",
        "clientsID": 2,
        "contractsID": 1,
        "stateProvincesID": 1,
        "timeZonesID": 1,
        "contractTypeId": 2,
        "partialPaymentDueValidation": true,
        "active": true,
        "createUserID": 0,
        "updateUserID": 0,
        "createDatetime": "0001-01-01T00:00:00",
        "updateDatetime": "0001-01-01T00:00:00",
        "isDeleted": "N"
      }
    ];
    component.openSettingForm(data);
    expect(component.saveSettings).toBeFalsy();
    expect(component.showEditForm).toBeTruthy();
  })

  it('Cancel Contract', () => {
    component.cancelContract();
    expect(component.showAddForm).toBeFalsy();
    expect(component.showconfigForm).toBeFalsy();
    expect(component.hideTable).toBeFalsy();
  })

  it('Cancel Edit Contract', () => {
    component.cancelEditContract();
    expect(component.showAddForm).toBeFalsy();
    expect(component.showconfigForm).toBeFalsy();
    expect(component.hideTable).toBeFalsy();
  })

  it('createNewContract', () => {
    let data: any = {
      "name": "Suffolk",
      "identifierName": "default",
      "codeName": null,
      "payByWebCode": 0,
      "programManagerId": 3,
      "stateProvinceName": "Hawaii",
      "timeZone": null,
      "cbiDashboardLink": null,
      "passwordExpirationLength": 90,
      "mavroCode": null,
      "twoFactorEnabled": true,
      "partialPaymentValidation": true,
      "contractTypeName": null,
      "contractName": "Default",
      "programManagerName": "Jack Mack",
      "clientsID": 2,
      "contractsID": 1,
      "stateProvincesID": 1,
      "timeZonesID": 1,
      "contractTypeId": 2,
      "partialPaymentDueValidation": true,
      "active": true,
      "createUserID": 0,
      "updateUserID": 0,
      "createDatetime": "0001-01-01T00:00:00",
      "updateDatetime": "0001-01-01T00:00:00",
      "isDeleted": "N"
    }
    component.createNewContract(data);
    expect(component.showAddForm).toBeTruthy();
    expect(component.showEditForm).toBeFalsy();
  })

  it('Add Contract', () => {
    component.addContractForm.controls["clientsID"].setValue('test');
    component.addContractForm.controls["name"].setValue('John');
    component.addContractForm.controls["identifier"].setValue('test');
    component.addContractForm.controls["code"].setValue('033');
    component.addContractForm.controls["contractType"].setValue('test');
    component.addContractForm.controls["stateProvincesID"].setValue('test');
    component.addContractForm.controls["timeZonesID"].setValue('test');
    component.addContractForm.controls["programManagerUserID"].setValue('test');
    component.addContractForm.controls["payByWebCode"].setValue('test');
    let contractData: any = {
        "createUserID": 0,
        "updateUserID": 0,
        "isDeleted": "N",
        "createDatetime": "2022-04-07T14:34:29.532Z",
        "updateDatetime": "2022-04-07T14:34:29.532Z",
        "contractsID": 0,
        "clientsID": component.addContractForm.value.clientsID,
        "name": component.addContractForm.value.name,
        "stateProvincesID": component.addContractForm.value.stateProvincesID,
        "timeZonesID": component.addContractForm.value.timeZonesID,
        "identifier": component.addContractForm.value.identifier,
        "programManagerUserID": component.addContractForm.value.programManagerUserID,
        "contractTypeId": component.addContractForm.value.contractType,
        "code": component.addContractForm.value.code,
        "partialPaymentDueValidation": component.addContractForm.value.partialPaymentDueValidation == ("" || null) ? false : component.addContractForm.value.partialPaymentDueValidation,
        "active": true,
        "passwordExpirationLength": component.addContractForm.value.passwordExpirationLength,
        "cbiDashboardLink": component.addContractForm.value.cbiDashboardLink,
        "payByWebCode": component.addContractForm.value.payByWebCode,
        "mavroCode": component.addContractForm.value.mavroCode,
        "partialPaymentValidation": component.addContractForm.value.partialPaymentValidation == ("" || null) ? false : component.addContractForm.value.partialPaymentValidation,
        "twoFactorEnabled": component.addContractForm.value.twoFactorEnabled == ("" || null) ? false : component.addContractForm.value.twoFactorEnabled,
        "initials": "AA",
        "shortName": "string",
        "officeCode": 0,
        "officeName": "string",
        "pcrDate": "2022-04-07T14:34:29.532Z",
        "dataBaseName": "string",
        "response": 0
    }
    component.addContract(contractData);
    expect(component.showAddForm).toBeFalsy();
    expect(component.hideTable).toBeFalsy();
    expect(component.showconfigForm).toBeFalsy();
  })

  it('Add Contract Setting', () => {
    let data: any = {
      "active": true,
      "cbiDashboardLink": null,
      "clientsID": 2,
      "codeName": null,
      "contractName": "Default",
      "contractTypeId": 2,
      "contractTypeName": null,
      "contractsID": 2,
      "createDatetime": "0001-01-01T00:00:00",
      "createUserID": 0,
      "identifierName": "default",
      "isDeleted": "N",
      "mavroCode": null,
      "name": "Suffolk",
      "partialPaymentDueValidation": true,
      "partialPaymentValidation": true,
      "passwordExpirationLength": 90,
      "payByWebCode": 0,
      "programManagerId": 3,
      "programManagerName": "Jack Mack",
      "stateProvinceName": "Virginia",
      "stateProvincesID": 1,
      "timeZone": null,
      "timeZonesID": 1,
      "twoFactorEnabled": true,
      "updateDatetime": "0001-01-01T00:00:00",
      "updateUserID": 0
    }
    component.editContract(data);
    component.contractSettingForm.controls["eventSequenceNumber"].setValue('12345');
    component.contractSettingForm.controls["citationNumberFormat"].setValue('12345');
    component.contractSettingForm.controls["citationSequenceNumber"].setValue('12345');
    component.contractSettingForm.controls["convenienceFee"].setValue('25');
    component.contractSettingForm.controls["percentageConvenienceFee"].setValue('20');
    component.contractSettingForm.controls["thresholdAmountConvenienceFee"].setValue('10');
    component.contractSettingForm.controls["maximumBatchSize"].setValue('10');
    component.contractSettingForm.controls["offlineBatchLimit"].setValue('10');
    component.contractSettingForm.controls["batchSequenceNumber"].setValue('123');
    component.contractSettingForm.controls["batchEncryptionPassword"].setValue('12345678');
    component.contractSettingForm.controls["neighborThreshold"].setValue('test');
    component.contractSettingForm.controls["pointOfContactName"].setValue('test');
    component.contractSettingForm.controls["maxoutAdvanceSearchResults"].setValue('test');
    component.contractSettingForm.controls["maxoutPrintingArchiveResults"].setValue('test');
    component.contractSettingForm.controls["courtEventsCutOffDays"].setValue('10');
    component.contractSettingForm.controls["appTimeout"].setValue('231342');
    let contractSettingData: any = {
      "contractSettingsID": 2,
      "contractID": 2,
      "citationNumberFormat": "7",
      "citationSequenceNumber": 7,
      "eventSequenceNumber": 1,
      "batchSequenceNumber": 7,
      "maximumBatchSize": 7,
      "storageLocation": "y",
      "active": true,
      "pointOfContactEmail": "xyz@gmail.com",
      "pointOfContactName": "xyz",
      "neighborThreshold": 7,
      "clearPlate": false,
      "batchEncryptionPassword": "7",
      "overtimeCutoffTime": "10:30 pm",
      "showDLBasic": false,
      "showDobGender": false,
      "showDriverDescriptors": false,
      "plateExamplesFileName": "y",
      "enablePlateExample": false,
      "showCoOwner": false,
      "warningCitationNumberFormat": "7",
      "warningCitationSequenceNumber": 0,
      "tolCitationNumberFormat": "7",
      "tolCitationSequenceNumber": 7,
      "convenienceFee": 7.00,
      "convenienceFeePerCitation": true,
      "convenienceFeePerPlate": true,
      "enableOmniChannel": false,
      "percentageBasedConvenienceFee": true,
      "percentageConvenienceFee": 7.00,
      "thresholdAmountConvenienceFee": 7.00,
      "offlineBatchLimit": 7,
      "prevYearCitationSequenceNumber": 0,
      "enableOfflinePrintingContract": false,
      "defaultCitationSequenceNumber": 0,
      "enableCustomerServiceTracking": false,
      "secondCitationNumberFormat": "7",
      "secondCitationSequenceNumber": 7,
      "enableDistribution": false,
      "appTimeout": 160,
      "maxoutAdvanceSearchResults": 7,
      "courtEventsCutOffDays": 7,
      "maxoutPrintingArchiveResults": 7,
      "partialPayment": true,
      "enableDistributionDisplay": false,
      "bootFee": 0,
      "towFee": 0,
      "firstSDayFee": 0,
      "multSDayFee": 0,
      "bootEscapeType": 0,
      "renewalRppFee": 0,
      "bootTickCnt": 0,
      "holdTickCnt": 0,
      "databaseName": 0,
      "bootTowAmt": 0,
      "skeletonPayInd": "y",
      "scheduleInd": "y",
      "skeletonDispInd": "y",
      "skeletonSuspInd": "y",
      "rejectFiller": "y",
      "bootDelayDays": 0,
      "ticksPerRec": 0,
      "stdDevInd": "y",
      "payGracePD": 0,
      "suspHearingDays": 0,
      "loadSW": 0,
      "createUserID": 1,
      "updateUserID": 1,
      "createDatetime": "2022-04-28T14:25:50.633",
      "updateDatetime": "2022-04-28T14:25:50.633",
      "isDeleted": "N"
    }
    component.addContractSetiing(contractSettingData);
    expect(component.showAddForm).toBeTruthy();
    expect(component.showconfigForm).toBeTruthy();
  })

  it('Add Contract Setting when contractsId = 3', () => {
    let data: any = {
      "active": true,
      "cbiDashboardLink": null,
      "clientsID": 2,
      "codeName": null,
      "contractName": "Default",
      "contractTypeId": 2,
      "contractTypeName": null,
      "contractsID": 1,
      "createDatetime": "0001-01-01T00:00:00",
      "createUserID": 0,
      "identifierName": "default",
      "isDeleted": "N",
      "mavroCode": null,
      "name": "Suffolk",
      "partialPaymentDueValidation": true,
      "partialPaymentValidation": true,
      "passwordExpirationLength": 90,
      "payByWebCode": 0,
      "programManagerId": 3,
      "programManagerName": "Jack Mack",
      "stateProvinceName": "Virginia",
      "stateProvincesID": 1,
      "timeZone": null,
      "timeZonesID": 1,
      "twoFactorEnabled": true,
      "updateDatetime": "0001-01-01T00:00:00",
      "updateUserID": 0
    }
    component.editContract(data);
    component.contractSettingForm.controls["eventSequenceNumber"].setValue('12345');
    component.contractSettingForm.controls["citationNumberFormat"].setValue('12345');
    component.contractSettingForm.controls["citationSequenceNumber"].setValue('12345');
    component.contractSettingForm.controls["convenienceFee"].setValue('25');
    component.contractSettingForm.controls["percentageConvenienceFee"].setValue('20');
    component.contractSettingForm.controls["thresholdAmountConvenienceFee"].setValue('10');
    component.contractSettingForm.controls["maximumBatchSize"].setValue('10');
    component.contractSettingForm.controls["offlineBatchLimit"].setValue('10');
    component.contractSettingForm.controls["batchSequenceNumber"].setValue('123');
    component.contractSettingForm.controls["batchEncryptionPassword"].setValue('12345678');
    component.contractSettingForm.controls["neighborThreshold"].setValue('test');
    component.contractSettingForm.controls["pointOfContactName"].setValue('test');
    component.contractSettingForm.controls["maxoutAdvanceSearchResults"].setValue('test');
    component.contractSettingForm.controls["maxoutPrintingArchiveResults"].setValue('test');
    component.contractSettingForm.controls["courtEventsCutOffDays"].setValue('10');
    component.contractSettingForm.controls["appTimeout"].setValue('231342');
    let contractSettingData: any = {
      "contractSettingsID": 2,
      "contractID": 3,
      "citationNumberFormat": "7",
      "citationSequenceNumber": 7,
      "eventSequenceNumber": 1,
      "batchSequenceNumber": 7,
      "maximumBatchSize": 7,
      "storageLocation": "y",
      "active": true,
      "pointOfContactEmail": "xyz@gmail.com",
      "pointOfContactName": "xyz",
      "neighborThreshold": 7,
      "clearPlate": false,
      "batchEncryptionPassword": "7",
      "overtimeCutoffTime": "10:30 pm",
      "showDLBasic": false,
      "showDobGender": false,
      "showDriverDescriptors": false,
      "plateExamplesFileName": "y",
      "enablePlateExample": false,
      "showCoOwner": false,
      "warningCitationNumberFormat": "7",
      "warningCitationSequenceNumber": 0,
      "tolCitationNumberFormat": "7",
      "tolCitationSequenceNumber": 7,
      "convenienceFee": 7.00,
      "convenienceFeePerCitation": true,
      "convenienceFeePerPlate": true,
      "enableOmniChannel": false,
      "percentageBasedConvenienceFee": true,
      "percentageConvenienceFee": 7.00,
      "thresholdAmountConvenienceFee": 7.00,
      "offlineBatchLimit": 7,
      "prevYearCitationSequenceNumber": 0,
      "enableOfflinePrintingContract": false,
      "defaultCitationSequenceNumber": 0,
      "enableCustomerServiceTracking": false,
      "secondCitationNumberFormat": "7",
      "secondCitationSequenceNumber": 7,
      "enableDistribution": false,
      "appTimeout": 160,
      "maxoutAdvanceSearchResults": 7,
      "courtEventsCutOffDays": 7,
      "maxoutPrintingArchiveResults": 7,
      "partialPayment": true,
      "enableDistributionDisplay": false,
      "bootFee": 0,
      "towFee": 0,
      "firstSDayFee": 0,
      "multSDayFee": 0,
      "bootEscapeType": 0,
      "renewalRppFee": 0,
      "bootTickCnt": 0,
      "holdTickCnt": 0,
      "databaseName": 0,
      "bootTowAmt": 0,
      "skeletonPayInd": "y",
      "scheduleInd": "y",
      "skeletonDispInd": "y",
      "skeletonSuspInd": "y",
      "rejectFiller": "y",
      "bootDelayDays": 0,
      "ticksPerRec": 0,
      "stdDevInd": "y",
      "payGracePD": 0,
      "suspHearingDays": 0,
      "loadSW": 0,
      "createUserID": 1,
      "updateUserID": 1,
      "createDatetime": "2022-04-28T14:25:50.633",
      "updateDatetime": "2022-04-28T14:25:50.633",
      "isDeleted": "N"
    }
    component.addContractSetiing(contractSettingData);
    expect(component.showAddForm).toBeFalsy();
    expect(component.hideTable).toBeFalsy();
    expect(component.showconfigForm).toBeFalsy();
  })

  it('Cancel Setting Form', () => {
    component.cancelSettingForm();
    expect(component.showAddForm).toBeFalsy();
    expect(component.showconfigForm).toBeFalsy();
    expect(component.hideTable).toBeFalsy();
    expect(component.showSettingForm).toBeFalsy();
    component.contractSettingForm.reset();
  })

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

  it('UpdateSettings', () => {
    let data = {
      "contractSettingsID": 2,
      "contractID": 3,
      "citationNumberFormat": "7",
      "citationSequenceNumber": 7,
      "eventSequenceNumber": 1,
      "batchSequenceNumber": 7,
      "maximumBatchSize": 7,
      "storageLocation": "y",
      "active": true,
      "pointOfContactEmail": "xyz@gmail.com",
      "pointOfContactName": "xyz",
      "neighborThreshold": 7,
      "clearPlate": false,
      "batchEncryptionPassword": "7",
      "overtimeCutoffTime": "10:30 pm",
      "showDLBasic": false,
      "showDobGender": false,
      "showDriverDescriptors": false,
      "plateExamplesFileName": "y",
      "enablePlateExample": false,
      "showCoOwner": false,
      "warningCitationNumberFormat": "7",
      "warningCitationSequenceNumber": 0,
      "tolCitationNumberFormat": "7",
      "tolCitationSequenceNumber": 7,
      "convenienceFee": 7.00,
      "convenienceFeePerCitation": true,
      "convenienceFeePerPlate": true,
      "enableOmniChannel": false,
      "percentageBasedConvenienceFee": true,
      "percentageConvenienceFee": 7.00,
      "thresholdAmountConvenienceFee": 7.00,
      "offlineBatchLimit": 7,
      "prevYearCitationSequenceNumber": 0,
      "enableOfflinePrintingContract": false,
      "defaultCitationSequenceNumber": 0,
      "enableCustomerServiceTracking": false,
      "secondCitationNumberFormat": "7",
      "secondCitationSequenceNumber": 7,
      "enableDistribution": false,
      "appTimeout": 160,
      "maxoutAdvanceSearchResults": 7,
      "courtEventsCutOffDays": 7,
      "maxoutPrintingArchiveResults": 7,
      "partialPayment": true,
      "enableDistributionDisplay": false,
      "bootFee": 0,
      "towFee": 0,
      "firstSDayFee": 0,
      "multSDayFee": 0,
      "bootEscapeType": 0,
      "renewalRppFee": 0,
      "bootTickCnt": 0,
      "holdTickCnt": 0,
      "databaseName": 0,
      "bootTowAmt": 0,
      "skeletonPayInd": "y",
      "scheduleInd": "y",
      "skeletonDispInd": "y",
      "skeletonSuspInd": "y",
      "rejectFiller": "y",
      "bootDelayDays": 0,
      "ticksPerRec": 0,
      "stdDevInd": "y",
      "payGracePD": 0,
      "suspHearingDays": 0,
      "loadSW": 0,
      "createUserID": 1,
      "updateUserID": 1,
      "createDatetime": "2022-04-28T14:25:50.633",
      "updateDatetime": "2022-04-28T14:25:50.633",
      "isDeleted": "N"
    }
    let data2: any = {
      "name": "Suffolk",
      "identifierName": "default",
      "codeName": null,
      "payByWebCode": 0,
      "programManagerId": 3,
      "stateProvinceName": "Hawaii",
      "timeZone": null,
      "cbiDashboardLink": null,
      "passwordExpirationLength": 90,
      "mavroCode": null,
      "twoFactorEnabled": true,
      "partialPaymentValidation": true,
      "contractTypeName": null,
      "contractName": "Default",
      "programManagerName": "Jack Mack",
      "clientsID": 2,
      "contractsID": 1,
      "stateProvincesID": 1,
      "timeZonesID": 1,
      "contractTypeId": 2,
      "partialPaymentDueValidation": true,
      "active": true,
      "createUserID": 0,
      "updateUserID": 0,
      "createDatetime": "0001-01-01T00:00:00",
      "updateDatetime": "0001-01-01T00:00:00",
      "isDeleted": "N"
    }
    component.openSettingForm(data2);
    component.UpdateSettings(data);
    expect(component.showAddForm).toBeFalsy();
  })

  it('UpdateSettings', () => {
    let data = {
      "contractSettingsID": 2,
      "contractID": 1,
      "citationNumberFormat": "7",
      "citationSequenceNumber": 7,
      "eventSequenceNumber": 1,
      "batchSequenceNumber": 7,
      "maximumBatchSize": 7,
      "storageLocation": "y",
      "active": true,
      "pointOfContactEmail": "xyz@gmail.com",
      "pointOfContactName": "xyz",
      "neighborThreshold": 7,
      "clearPlate": false,
      "batchEncryptionPassword": "7",
      "overtimeCutoffTime": "10:30 pm",
      "showDLBasic": false,
      "showDobGender": false,
      "showDriverDescriptors": false,
      "plateExamplesFileName": "y",
      "enablePlateExample": false,
      "showCoOwner": false,
      "warningCitationNumberFormat": "7",
      "warningCitationSequenceNumber": 0,
      "tolCitationNumberFormat": "7",
      "tolCitationSequenceNumber": 7,
      "convenienceFee": 7.00,
      "convenienceFeePerCitation": true,
      "convenienceFeePerPlate": true,
      "enableOmniChannel": false,
      "percentageBasedConvenienceFee": true,
      "percentageConvenienceFee": 7.00,
      "thresholdAmountConvenienceFee": 7.00,
      "offlineBatchLimit": 7,
      "prevYearCitationSequenceNumber": 0,
      "enableOfflinePrintingContract": false,
      "defaultCitationSequenceNumber": 0,
      "enableCustomerServiceTracking": false,
      "secondCitationNumberFormat": "7",
      "secondCitationSequenceNumber": 7,
      "enableDistribution": false,
      "appTimeout": 160,
      "maxoutAdvanceSearchResults": 7,
      "courtEventsCutOffDays": 7,
      "maxoutPrintingArchiveResults": 7,
      "partialPayment": true,
      "enableDistributionDisplay": false,
      "bootFee": 0,
      "towFee": 0,
      "firstSDayFee": 0,
      "multSDayFee": 0,
      "bootEscapeType": 0,
      "renewalRppFee": 0,
      "bootTickCnt": 0,
      "holdTickCnt": 0,
      "databaseName": 0,
      "bootTowAmt": 0,
      "skeletonPayInd": "y",
      "scheduleInd": "y",
      "skeletonDispInd": "y",
      "skeletonSuspInd": "y",
      "rejectFiller": "y",
      "bootDelayDays": 0,
      "ticksPerRec": 0,
      "stdDevInd": "y",
      "payGracePD": 0,
      "suspHearingDays": 0,
      "loadSW": 0,
      "createUserID": 1,
      "updateUserID": 1,
      "createDatetime": "2022-04-28T14:25:50.633",
      "updateDatetime": "2022-04-28T14:25:50.633",
      "isDeleted": "N"
    }
    let data2: any = {
      "name": "Suffolk",
      "identifierName": "default",
      "codeName": null,
      "payByWebCode": 0,
      "programManagerId": 3,
      "stateProvinceName": "Hawaii",
      "timeZone": null,
      "cbiDashboardLink": null,
      "passwordExpirationLength": 90,
      "mavroCode": null,
      "twoFactorEnabled": true,
      "partialPaymentValidation": true,
      "contractTypeName": null,
      "contractName": "Default",
      "programManagerName": "Jack Mack",
      "clientsID": 2,
      "contractsID": 1,
      "stateProvincesID": 1,
      "timeZonesID": 1,
      "contractTypeId": 2,
      "partialPaymentDueValidation": true,
      "active": true,
      "createUserID": 0,
      "updateUserID": 0,
      "createDatetime": "0001-01-01T00:00:00",
      "updateDatetime": "0001-01-01T00:00:00",
      "isDeleted": "N"
    }
    component.openSettingForm(data2);
    component.UpdateSettings(data);
    expect(component.showAddForm).toBeFalsy();
  })

  it('onClientChange success case', () => {
    let event = {
      value: 2
    }
    component.onClientChange(event);
    expect(component.addContractForm.controls['stateProvincesID'].value).toEqual(1);
  })

  it('onClientChange fail case', () => {
    let event = {
      value: 1
    }
    component.onClientChange(event);
    expect(component.addContractForm.controls['stateProvincesID'].value).toEqual(1);
  })

  it('toggleContract if status is true', () => {
    let data = {
      contractsID : 2
    }
    let status = true;
    component.toggleContract(data, status);
    expect(data.contractsID).toEqual(2);
  })

  it('toggleContract if status is false', () => {
    let data = {
      contractsID : 2
    }
    let status = false;
    component.toggleContract(data, status);
    expect(data.contractsID).toEqual(2);
  })

});
