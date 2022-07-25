import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ContractSettingService } from 'src/app/Services/ContractSetting/contract-setting.service';

export interface IssuingAgency {
 
  clientName: string;
  contractName: string;
  identifier: string;
  stateProvidence: string;
  programManager: string;
}

const ELEMENT_DATA: IssuingAgency[] = [
  { clientName: 'default', contractName: 'QA Contract', identifier: 'Hydrogen', stateProvidence: 'aa',programManager:'john'},
  { clientName: 'default', contractName: 'QA Contract', identifier: 'Helium', stateProvidence: 'aa', programManager:'john'},
  { clientName: 'default', contractName: 'QA Contract', identifier: 'Lithium', stateProvidence: 'aa', programManager:'john'},
  { clientName: 'default', contractName: 'QA Contract', identifier: 'Beryllium', stateProvidence: 'aa', programManager:'john'},
  { clientName: 'default', contractName: 'QA Contract', identifier: 'Boron', stateProvidence: 'aa', programManager:'john'},
  { clientName: 'default', contractName: 'QA Contract', identifier: 'Carbon', stateProvidence: 'aa', programManager:'john'},
  { clientName: 'default', contractName: 'QA Contract', identifier: 'Nitrogen', stateProvidence:'aa', programManager:'john'},
  { clientName: 'default', contractName: 'QA Contract', identifier: 'Oxygen', stateProvidence: 'aa', programManager:'john'},
  { clientName: 'default', contractName: 'QA Contract', identifier: 'Fluorine', stateProvidence: 'aa', programManager:'john'},
  { clientName: 'default', contractName: 'QA Contract', identifier: 'Neon', stateProvidence: 'aa', programManager:'john'},
];

@Component({
  selector: 'admin-contract-setting',
  templateUrl: './contract-setting.component.html',
  styleUrls: ['./contract-setting.component.scss']
})
export class ContractSettingComponent implements OnInit {
  contractSettingForm!: FormGroup;
  displayedColumns: string[] = ['clientName','contractName', 'identifier', 'stateProvidence', 'programManager', 'action'];
  dataSource = ELEMENT_DATA;

  constructor(public translate: TranslateService, private language: LanguageService, private fb: FormBuilder, private settingsApi:ContractSettingService) { }

  ngOnInit() {

    this.language.sendLang.subscribe(lang => {
      this.appendLang(lang);
    });
    this.contractSettingForm = this.fb.group({
      // databaseName: [""],
      // contractID: [""],
      eventSequenceNumber: [""],
      citationNumberFormat: [""],
      citationSequenceNumber: [""],
      secondCitationNumberFormat: [""],
      secondCitationSequenceNumber: [""],
      warningCitationNumberFormat: [""],
      warningCitationSequenceNumber: [""],
      tolCitationNumberFormat: [""],
      tolCitationSequenceNumber: [""],
      convenienceFee: [""],
      percentageConvenienceFee: [""],
      thresholdAmountConvenienceFee: [""],
      maximumBatchSize: [""],
      offlineBatchLimit: [""],
      batchSequenceNumber: [""],
      batchEncryptionPassword: [""],
      OvertimeCutoffTime: [""],
      neighborThreshold: [""],
      pointOfContactName: [""],
      pointOfContactEmail: [""],
      maxoutAdvanceSearchResults: [""],
      maxoutPrintingArchiveResults: [""],
      courtEventsCutOffDays: [""],
      partialPayment: [""],
      percentageBasedConvenienceFee: [""],
      convenienceFeePerCitation: [""],
      clearPlate: [""],
      showDLBasic: [""],
      showDOBGender: [""],
      showDriverDescriptors: [""],
      plateExamplesFileName: [""],
      showCoOwner: [""],
      enableCustomerServiceTracking: [""],
      enableOmniChannel: [""],
      enablePlateExample: [""],
      enableOfflinePrintingContract: [""],
      enableDistribution:[""],
      enableDistributionDisplay: [""],     
      storageLocation: [""],  

    });
  }

  appendLang(lang: string) {
    this.translate.use(lang);
  }

  addSetting(){
    // console.log(this.contractSettingForm.value);
    if(this.contractSettingForm.valid){
      this.settingsApi.postContractSetting(this.contractSettingForm.value)
      .subscribe({
        next:(res)=>{
          alert("Settings Added");
        },
        error:() =>{
          alert("Error");
        }
      })
    }
  }

}

