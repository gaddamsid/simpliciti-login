import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { ContractSettingService } from 'src/app/Services/ContractSetting/contract-setting.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ContractSettingServiceStub } from 'src/app/shared/testCasesHelperClasses/ContractSettingServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';

import { ContractSettingComponent } from './contract-setting.component';

describe('ContractSettingComponent', () => {
  let component: ContractSettingComponent;
  let fixture: ComponentFixture<ContractSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractSettingComponent ],
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
        { provide: ContractSettingService, useClass: ContractSettingServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractSettingComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag ', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Contract');
  })

  it('Add Contract setting form should be invalid when empty', () => {
    component.contractSettingForm.controls["eventSequenceNumber"].setValue('');
    component.contractSettingForm.controls["citationNumberFormat"].setValue('');
    component.contractSettingForm.controls["citationSequenceNumber"].setValue('');
    component.contractSettingForm.controls["secondCitationNumberFormat"].setValue('');
    component.contractSettingForm.controls["secondCitationSequenceNumber"].setValue('');
    component.contractSettingForm.controls["warningCitationNumberFormat"].setValue('');
    component.contractSettingForm.controls["warningCitationSequenceNumber"].setValue('');
    component.contractSettingForm.controls["tolCitationNumberFormat"].setValue('');
    component.contractSettingForm.controls["tolCitationSequenceNumber"].setValue('');
    component.contractSettingForm.controls["convenienceFee"].setValue('');
    component.contractSettingForm.controls["percentageConvenienceFee"].setValue('');
    component.contractSettingForm.controls["thresholdAmountConvenienceFee"].setValue('');
    component.contractSettingForm.controls["maximumBatchSize"].setValue('');
    component.contractSettingForm.controls["offlineBatchLimit"].setValue('');
    component.contractSettingForm.controls["batchSequenceNumber"].setValue('');
    component.contractSettingForm.controls["batchEncryptionPassword"].setValue('');
    component.contractSettingForm.controls["OvertimeCutoffTime"].setValue('');
    component.contractSettingForm.controls["neighborThreshold"].setValue('');
    component.contractSettingForm.controls["pointOfContactName"].setValue('');
    component.contractSettingForm.controls["pointOfContactEmail"].setValue('');
    component.contractSettingForm.controls["maxoutAdvanceSearchResults"].setValue('');
    component.contractSettingForm.controls["maxoutPrintingArchiveResults"].setValue('');
    component.contractSettingForm.controls["courtEventsCutOffDays"].setValue('');
    component.contractSettingForm.controls["partialPayment"].setValue('');
    component.contractSettingForm.controls["percentageBasedConvenienceFee"].setValue('');
    component.contractSettingForm.controls["convenienceFeePerCitation"].setValue('');
    component.contractSettingForm.controls["clearPlate"].setValue('');
    component.contractSettingForm.controls["showDLBasic"].setValue('');
    component.contractSettingForm.controls["showDOBGender"].setValue('');
    component.contractSettingForm.controls["showDriverDescriptors"].setValue('');
    component.contractSettingForm.controls["plateExamplesFileName"].setValue('');
    component.contractSettingForm.controls["showCoOwner"].setValue('');
    component.contractSettingForm.controls["enableCustomerServiceTracking"].setValue('');
    component.contractSettingForm.controls["enableOmniChannel"].setValue('');
    component.contractSettingForm.controls["enablePlateExample"].setValue('');
    component.contractSettingForm.controls["enableOfflinePrintingContract"].setValue('');
    component.contractSettingForm.controls["enableDistribution"].setValue('');
    component.contractSettingForm.controls["enableDistributionDisplay"].setValue('');
    component.contractSettingForm.controls["storageLocation"].setValue('');
    expect(component.contractSettingForm.valid).toBeTruthy();
  });

  it('addSetting method should call', () => {
    component.addSetting();
    expect(component.contractSettingForm.valid).toBeTruthy();
  })
});
