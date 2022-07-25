import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { ContractService } from 'src/app/Services/Contract/contract.service';
import { ContractModel } from 'src/app/Models/Contracts/contract.Model';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!: ElementRef;

  displayedColumns: string[] = ['name', 'contractName', 'identifierName', 'stateProvinceName', 'programManagerName', 'action'];
  // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<ContractModel>();
  addContractForm!: FormGroup;
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  showconfigForm: boolean = false;
  hideTable: boolean = false;
  showSettingForm: boolean = false;
  data: any = [];
  resultdata: any;
  obj: any = {};
  newContractModel!: ContractModel[];

  public editdata: any;
  contractSettingForm!: FormGroup;
  welcome: any;
  saveSettings: boolean = true;
  settingsData: any;
  managerList: any;
  successMsg!: string;
  alertMsg!: string;
  time: any;
  showClientName: any;

  ClientMaster: any;
  ContractMaster: any;
  TimeZoneMaster: any;
  StateProvincesMaster: any;
  disableSelect = new FormControl(false);

  constructor(public translate: TranslateService,
    private language: LanguageService,
    private _liveAnnouncer: LiveAnnouncer,
    private fb: FormBuilder,
    private contractService: ContractService,
    private notificationService: ToastrService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getContractList();

    this.language.sendLang.subscribe(lang => {
      if (lang != "") {
        this.appendLang(lang);
      }

    });

    this.addContractForm = new FormGroup({
      'clientsID': new FormControl('', Validators.required),
      'name': new FormControl('', [Validators.required, Validators.maxLength(150)]),
      'identifier': new FormControl('', [Validators.required, Validators.maxLength(150)]),
      'code': new FormControl('', [Validators.required, Validators.maxLength(3)]),
      'payByWebPinCode': new FormControl('',),
      'contractType': new FormControl('', [Validators.required, Validators.maxLength(11)]),
      'programManagerName': new FormControl(''),
      'stateProvincesID': new FormControl('', [Validators.required, Validators.maxLength(11)]),
      'timeZonesID': new FormControl('', [Validators.required, Validators.maxLength(11)]),
      'cbiDashboardLink': new FormControl('', [Validators.maxLength(50)]),
      'passwordExpirationLength': new FormControl('', [Validators.maxLength(11)]),
      'mavroCode': new FormControl('', [Validators.maxLength(150)]),
      'twoFactorEnabled': new FormControl(''),
      'partialPaymentDueValidation': new FormControl(''),
      'partialPaymentValidation': new FormControl(''),
      'programManagerUserID': new FormControl('', [Validators.required, Validators.maxLength(11)]),
      //'contractTypeId':new FormControl(''),
      'payByWebCode': new FormControl('', [Validators.required, Validators.maxLength(11)])
    });

    this.contractSettingForm = new FormGroup({
      'eventSequenceNumber': new FormControl(0, [Validators.required, Validators.maxLength(10), Validators.max(2147483648)]),
      'citationNumberFormat': new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      'citationSequenceNumber': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.max(2147483648)]),
      'secondCitationNumberFormat': new FormControl(null, [Validators.maxLength(10)]),
      'secondCitationSequenceNumber': new FormControl(null, [Validators.maxLength(10), Validators.max(2147483648)]),
      'warningCitationNumberFormat': new FormControl(null, [Validators.maxLength(10)]),
      'warningCitationSequenceNumber': new FormControl(0, [Validators.maxLength(10), Validators.max(2147483648)]),
      'tolCitationNumberFormat': new FormControl(null, [Validators.maxLength(10)]),
      'tolCitationSequenceNumber': new FormControl(null, [Validators.maxLength(10), Validators.max(2147483648)]),
      'convenienceFee': new FormControl(null, [Validators.required]),
      'percentageConvenienceFee': new FormControl(null, [Validators.required, Validators.maxLength(3)]),
      'thresholdAmountConvenienceFee': new FormControl(null, [Validators.required, Validators.maxLength(3)]),
      'maximumBatchSize': new FormControl(null, [Validators.required, Validators.maxLength(5)]),
      'offlineBatchLimit': new FormControl(null, [Validators.required, Validators.maxLength(5)]),
      'batchSequenceNumber': new FormControl(null, [Validators.required, Validators.maxLength(3)]),
      'batchEncryptionPassword': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      'overtimeCutoffTime': new FormControl(null),
      'neighborThreshold': new FormControl(null, [Validators.required, Validators.maxLength(5)]),
      'pointOfContactName': new FormControl(null, [Validators.required, Validators.required]),
      'pointOfContactEmail': new FormControl(null, [Validators.email]),
      'maxoutAdvanceSearchResults': new FormControl(null, [Validators.required, Validators.maxLength(5)]),
      'maxoutPrintingArchiveResults': new FormControl(null, [Validators.required, Validators.maxLength(5)]),
      'courtEventsCutOffDays': new FormControl(null, [Validators.required, Validators.maxLength(3)]),
      'appTimeout': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.max(2147483648)]),
      'partialPayment': new FormControl(false),
      'percentageBasedConvenienceFee': new FormControl(false),
      'convenienceFeePerCitation': new FormControl(false),
      'clearPlate': new FormControl(false),
      'showDLBasic': new FormControl(false),
      'showDOBGender': new FormControl(false),
      'showheightweight': new FormControl(false),
      'showCoOwner': new FormControl(false),
      'enableCustomerServiceTracking': new FormControl(false),
      'enableOmniChannel': new FormControl(false),
      'enablePlateExample': new FormControl(false),
      'enableOfflinePrintingContract': new FormControl(false),
      'enableDistribution': new FormControl(false),
      'enableDistributionDisplay': new FormControl(false),


    })


  }

  //<<-----------Sorting-------------------------------->>
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  //<<-----------Sorting Ends-------------------------------->>
  //<<-----------Language-------------------------------->>
  appendLang(lang: string) {
    this.translate.use(lang);
    this.setPagelabel(lang);
  }
  //<<-----------Language-------------------------------->>
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setPagelabel(lang: any) {
    const msg = "";
    this.translate.use(lang).toPromise();
    this.translate
      .use(lang)
      .subscribe(res => {
        this.dataSource.paginator = this.paginator;
        this.alertMsg = this.translate.instant("Items per page", { msg: msg });
        this.dataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;
      });
  }

  isNumberKey(txt: any, evt: any) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 46) {
      //Check if the text already contains the . character
      if (txt.value.indexOf('.') === -1) {
        return true;
      } else {
        return false;
      }
    } else {
      if (charCode > 31 &&
        (charCode < 48 || charCode > 57))
        return false;
    }
    return true;
  }



  editContract(data: any) {
    this.editdata = data;
    this.ClientMaster = [];
    this.ContractMaster = [];
    this.TimeZoneMaster = [];
    this.StateProvincesMaster = [];

    forkJoin(
      this.contractService.getClientMaster(),
      this.contractService.getContractMaster(),
      this.contractService.getTimeZoneMaster(),
      this.contractService.getStateProvincesMaster(),
      this.contractService.getProgramManager()
    ).subscribe(
      results => {
        this.ClientMaster = results[0];
        this.ContractMaster = results[1];
        this.TimeZoneMaster = results[2];
        this.StateProvincesMaster = results[3];
        this.managerList = results[4];
      },
      error => console.error
    );
    this.showconfigForm = true;
    this.showAddForm = true;
    this.hideTable = true;
    this.showEditForm = true;
    console.log(this.addContractForm.value);
    this.contractService.editContract(data.clientsID, data.contractsID).subscribe(res => {
      this.addContractForm.controls['clientsID'].setValue(res.clientsID); //
      this.addContractForm.controls['name'].setValue(res.contractName);
      this.addContractForm.controls['identifier'].setValue(res.identifierName);
      this.addContractForm.controls['code'].setValue(res.codeName);
      this.addContractForm.controls['payByWebPinCode'].setValue(res.payByWebCode);
      this.addContractForm.controls['contractType'].setValue(res.contractTypeId);//res.contractTypeId
      this.addContractForm.controls['programManagerUserID'].setValue(res.programManagerId);
      this.addContractForm.controls['mavroCode'].setValue(res.mavroCode);
      this.addContractForm.controls['stateProvincesID'].setValue(res.stateProvincesID);//res.stateProvincesID
      this.addContractForm.controls['timeZonesID'].setValue(res.timeZonesID); //res.timeZonesID
      this.addContractForm.controls['cbiDashboardLink'].setValue(res.cbiDashboardLink);
      this.addContractForm.controls['passwordExpirationLength'].setValue(res.passwordExpirationLength);
      this.addContractForm.controls['twoFactorEnabled'].setValue(res.twoFactorEnabled);
      this.addContractForm.controls['partialPaymentDueValidation'].setValue(res.partialPaymentDueValidation);
      this.addContractForm.controls['partialPaymentValidation'].setValue(res.partialPaymentValidation);
      this.addContractForm.controls['payByWebCode'].setValue(res.payByWebCode);

    })

  }

  saveEditContract(data: any) {

    console.log(data);
    if (this.addContractForm.valid) {
      const editContractData = {
        "contractsModel":
        {
          "createUserID": 0,
          "updateUserID": 1,
          "createDatetime": new Date("2022-03-23").toISOString(),
          "updateDatetime": new Date("2022-03-23").toISOString(),
          "isDeleted": "N",
          "contractsID": this.editdata.contractsID,
          "clientsID": this.editdata.clientsID,
          "name": data.name,
          "stateProvincesID": data.stateProvincesID,
          "timeZonesID": data.timeZonesID,
          "identifier": data.identifier,
          "programManagerUserID": data.programManagerUserID,
          "contractTypeId": data.contractType,
          "code": data.code,
          "twoFactorEnabled": data.twoFactorEnabled,
          "active": true,
          "passwordExpirationLength": data.passwordExpirationLength,
          "cbiDashboardLink": data.cbiDashboardLink,
          "payByWebCode": data.payByWebCode,
          "partialPaymentDueValidation": data.partialPaymentDueValidation,
          "mavroCode": data.mavroCode,
          "partialPaymentValidation": data.partialPaymentValidation,
          "initials": "ab",
          "shortName": "test",
          "officeCode": 0,
          "officeName": "test",
          "pcrDate": "2022-04-26T14:59:30.219Z",
          "dataBaseName": "test",
          "response": 0
        }
      }
      this.contractService.updateContract(editContractData).subscribe(res => {
        if (res.status == "Success") {
          const msg = '';
          const code = res.details[0].code;
          this.successMsg = this.translate.instant('Record Updated Successfully', {
            msg: msg,
          });
          this.notificationService.success(this.successMsg);
          this.getContractList();
          this.showAddForm = false;
          this.hideTable = false;
          this.showconfigForm = false;

          this.addContractForm.reset();
        }
      },
        error => {
          for (var i = 0; i < error.error.details.length; i++) {
            if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
              const msg = "";
              let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
              this.welcome = this.translate.instant(translateCode, { msg: msg });
              this.addContractForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
            }
            else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
              const msg = "";
              this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
            }
            else {
              const msg = "";
              this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
            }
          }
        })
    }
  }

  cancelContract() {
    this.showAddForm = false;
    this.showconfigForm = false;
    this.hideTable = false;
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }

  cancelEditContract() {
    this.showAddForm = false;
    this.hideTable = false;
    this.showconfigForm = false;
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }

  openSettingForm(data: any) {
    this.showEditForm = true;
    this.showClientName = data.contractName;
    this.contractService.getContarctSettingList(data.contractsID).subscribe(res => {
      if (res) {
        this.saveSettings = false;
        this.settingsData = res;
        const timeString = res.overtimeCutoffTime;
        const datetime = new Date('1970-01-01T' + timeString + 'Z').toLocaleTimeString('en-US',
          { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
        );
        // this.time = this.formatAMPM(datetime);
        this.contractSettingForm.controls['eventSequenceNumber'].setValue(res.eventSequenceNumber);
        this.contractSettingForm.controls['citationNumberFormat'].setValue(res.citationNumberFormat);
        this.contractSettingForm.controls['citationSequenceNumber'].setValue(res.citationSequenceNumber);
        this.contractSettingForm.controls['secondCitationNumberFormat'].setValue(res.secondCitationNumberFormat);
        this.contractSettingForm.controls['secondCitationSequenceNumber'].setValue(res.secondCitationSequenceNumber);
        this.contractSettingForm.controls['warningCitationNumberFormat'].setValue(res.warningCitationNumberFormat);
        this.contractSettingForm.controls['warningCitationSequenceNumber'].setValue(res.warningCitationSequenceNumber);
        this.contractSettingForm.controls['tolCitationNumberFormat'].setValue(res.tolCitationNumberFormat);
        this.contractSettingForm.controls['tolCitationSequenceNumber'].setValue(res.tolCitationSequenceNumber);
        this.contractSettingForm.controls['convenienceFee'].setValue(res.convenienceFee);
        this.contractSettingForm.controls['percentageConvenienceFee'].setValue(res.percentageConvenienceFee);
        this.contractSettingForm.controls['thresholdAmountConvenienceFee'].setValue(res.thresholdAmountConvenienceFee);
        this.contractSettingForm.controls['maximumBatchSize'].setValue(res.maximumBatchSize);
        this.contractSettingForm.controls['offlineBatchLimit'].setValue(res.offlineBatchLimit);
        this.contractSettingForm.controls['batchSequenceNumber'].setValue(res.batchSequenceNumber);
        this.contractSettingForm.controls['batchEncryptionPassword'].setValue(res.batchEncryptionPassword);
        this.contractSettingForm.controls['overtimeCutoffTime'].setValue(datetime);
        this.contractSettingForm.controls['neighborThreshold'].setValue(res.neighborThreshold);
        this.contractSettingForm.controls['pointOfContactName'].setValue(res.pointOfContactName);
        this.contractSettingForm.controls['pointOfContactEmail'].setValue(res.pointOfContactEmail);
        this.contractSettingForm.controls['maxoutAdvanceSearchResults'].setValue(res.maxoutAdvanceSearchResults);
        this.contractSettingForm.controls['maxoutPrintingArchiveResults'].setValue(res.maxoutPrintingArchiveResults);
        this.contractSettingForm.controls['courtEventsCutOffDays'].setValue(res.courtEventsCutOffDays);
        this.contractSettingForm.controls['partialPayment'].setValue(res.partialPayment);
        this.contractSettingForm.controls['percentageBasedConvenienceFee'].setValue(res.percentageBasedConvenienceFee);
        this.contractSettingForm.controls['convenienceFeePerCitation'].setValue(res.convenienceFeePerCitation);
        this.contractSettingForm.controls['clearPlate'].setValue(res.clearPlate);
        this.contractSettingForm.controls['showDLBasic'].setValue(res.showDLBasic);
        this.contractSettingForm.controls['showheightweight'].setValue(res.showDriverDescriptors);
        this.contractSettingForm.controls['appTimeout'].setValue(res.appTimeout);
        this.contractSettingForm.controls['showDOBGender'].setValue(res.showDobGender);
        this.contractSettingForm.controls['enableCustomerServiceTracking'].setValue(res.enableCustomerServiceTracking);
        this.contractSettingForm.controls['showCoOwner'].setValue(res.showCoOwner);
        this.contractSettingForm.controls['enableOmniChannel'].setValue(res.enableOmniChannel);
        this.contractSettingForm.controls['enablePlateExample'].setValue(res.enablePlateExample);
        this.contractSettingForm.controls['enableOfflinePrintingContract'].setValue(res.enableOfflinePrintingContract);
        this.contractSettingForm.controls['enableDistribution'].setValue(res.enableDistribution);
        this.contractSettingForm.controls['enableDistributionDisplay'].setValue(res.enableDistributionDisplay);

      }
      else {
        this.saveSettings = true;
        this.contractSettingForm.controls['warningCitationSequenceNumber'].setValue(0);
      }
    })
    this.editdata = data;
    this.showSettingForm = true;
    this.showAddForm = false;
    this.hideTable = true;

  }

  cancelSettingForm() {
    this.showAddForm = false;
    this.hideTable = false;
    this.showconfigForm = false;
    this.showSettingForm = false;
    this.contractSettingForm.reset();
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }

  getContractList() {
    this.contractService.getContract().subscribe(result => {
      this.dataSource = new MatTableDataSource<ContractModel>(result.reverse());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.sort.disableClear = true;
      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
        return data[sortHeaderId];
      };
      this.dataSource.paginator = this.paginator;

      this.filterData();

    })
  }

  filterData(): void {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter) ||
        data.contractName.toLowerCase().includes(filter) ||
        data.identifierName.toLowerCase().includes(filter) ||
        data.stateProvinceName.toLowerCase().includes(filter) ||
        data.programManagerName.toLowerCase().includes(filter);
    };
  }

  createNewContract(data: any) {
    this.hideTable = true;
    this.addContractForm.reset()
    this.ClientMaster = [];
    this.ContractMaster = [];
    this.TimeZoneMaster = [];
    this.StateProvincesMaster = [];

    forkJoin(
      this.contractService.getClientMaster(),
      this.contractService.getContractMaster(),
      this.contractService.getTimeZoneMaster(),
      this.contractService.getStateProvincesMaster(),
      this.contractService.getProgramManager()
    ).subscribe(
      results => {
        this.ClientMaster = results[0];
        this.ContractMaster = results[1];
        this.TimeZoneMaster = results[2];
        this.StateProvincesMaster = results[3];
        this.managerList = results[4];
      },
      error => console.error
    );
    console.log();

    this.showAddForm = true;
    this.showEditForm = false;
  }


  addContract(data: any) {
    // this.paginator.pageIndex = 0;
    this.showAddForm = true;
    this.showconfigForm = false;
    if (this.addContractForm.valid) {
      const contractData =
      {
        "contractsModel": {
          "createUserID": 0,
          "updateUserID": 0,
          "isDeleted": "N",
          "createDatetime": "2022-04-07T14:34:29.532Z",
          "updateDatetime": "2022-04-07T14:34:29.532Z",
          "contractsID": 0,
          "clientsID": this.addContractForm.value.clientsID,
          "name": this.addContractForm.value.name,
          "stateProvincesID": this.addContractForm.value.stateProvincesID,
          "timeZonesID": this.addContractForm.value.timeZonesID,
          "identifier": this.addContractForm.value.identifier,
          "programManagerUserID": this.addContractForm.value.programManagerUserID,
          "contractTypeId": this.addContractForm.value.contractType,
          "code": this.addContractForm.value.code,
          "partialPaymentDueValidation": this.addContractForm.value.partialPaymentDueValidation == ("" || null) ? false : this.addContractForm.value.partialPaymentDueValidation,
          "active": true,
          "passwordExpirationLength": this.addContractForm.value.passwordExpirationLength,
          "cbiDashboardLink": this.addContractForm.value.cbiDashboardLink,
          "payByWebCode": this.addContractForm.value.payByWebCode,
          "mavroCode": this.addContractForm.value.mavroCode,
          "partialPaymentValidation": this.addContractForm.value.partialPaymentValidation == ("" || null) ? false : this.addContractForm.value.partialPaymentValidation,
          "twoFactorEnabled": this.addContractForm.value.twoFactorEnabled == ("" || null) ? false : this.addContractForm.value.twoFactorEnabled,
          "initials": "AA",
          "shortName": "string",
          "officeCode": 0,
          "officeName": "string",
          "pcrDate": "2022-04-07T14:34:29.532Z",
          "dataBaseName": "string",
          "response": 0
        }
      }

      this.contractService.createContract(contractData).subscribe(res => {
        if (res.status == "Success") {
          this.getContractList();
          this.showAddForm = false;
          this.hideTable = false;
          this.showconfigForm = false;
          this.showSettingForm = false;
          const msg = '';
          const code = res.details[0].code;
          this.successMsg = this.translate.instant('Record Added Successfully', {
            msg: msg,
          });
          this.notificationService.success(this.successMsg);
          this.addContractForm.reset();
          this.getContractList();
          console.log(this.getContractList);
        }
      },
        error => {
          for (var i = 0; i < error.error.details.length; i++) {
            if (error.error.details[i].code == "5000" && error.error.details[i].message != "Duplicate Record") {
              const msg = "";
              let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
              this.welcome = this.translate.instant(translateCode, { msg: msg });
              this.addContractForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
            }
            else if (error.error.details[i].message == "Duplicate Record" && error.error.details[i].code == "5000") {
              const msg = "";
              this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
            }
            else {
              const msg = "";
              this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
            }
          }
        })

    }
  }



  addContractSetiing(data: any) {
    if (this.contractSettingForm.valid) {
      const t = data.overtimeCutoffTime;
      const matches = t.toLowerCase().match(/(\d{1,2}):(\d{2}) ([ap]m)/);
      const output = (parseInt(matches[1]) + (matches[3] == 'pm' ? 12 : 0)) + ':' + matches[2] + ':00';
      const obj =
      {
        "contractSettingsModel": {
          "createUserID": 1,
          "updateUserID": 1,
          "contractSettingsID": 0,
          "isDeleted": "N",
          "contractID": this.editdata.contractsID,
          "citationNumberFormat": data.citationNumberFormat,
          "citationSequenceNumber": data.citationSequenceNumber,
          "eventSequenceNumber": data.eventSequenceNumber,
          "batchSequenceNumber": data.batchSequenceNumber,
          "maximumBatchSize": data.maximumBatchSize,
          "storageLocation": "y",
          "active": true,
          "appTimeout": data.appTimeout,
          "pointOfContactEmail": data.pointOfContactEmail,
          "pointOfContactName": data.pointOfContactName,
          "neighborThreshold": data.neighborThreshold,
          "clearPlate": data.clearPlate == ("" || null) ? false : data.clearPlate,
          "batchEncryptionPassword": data.batchEncryptionPassword,
          "overtimeCutoffTime": output == "24:00:00" ? "00:00:00":output,
          "showDLBasic": data.showDLBasic == ("" || null) ? false : data.showDLBasic,
          "showDOBGender": data.showDOBGender == ("" || null) ? false : data.showDOBGender,
          "showDriverDescriptors": data.showheightweight == ("" || null) ? false : data.showheightweight,
          "plateExamplesFileName": "y",
          "enablePlateExample": data.enablePlateExample == ("" || null) ? false : data.enablePlateExample,
          "showCoOwner": data.showCoOwner == ("" || null) ? false : data.showCoOwner,
          "warningCitationNumberFormat": data.warningCitationNumberFormat,
          "warningCitationSequenceNumber": data.warningCitationSequenceNumber,
          "tolCitationNumberFormat": data.tolCitationNumberFormat,
          "tolCitationSequenceNumber": data.tolCitationSequenceNumber,
          "convenienceFee": data.convenienceFee,
          "convenienceFeePerCitation": data.convenienceFeePerCitation == ("" || null) ? false : data.convenienceFeePerCitation,
          "convenienceFeePerPlate": true,
          "enableOmniChannel": data.enableOmniChannel == ("" || null) ? false : data.enableOmniChannel,
          "percentageBasedConvenienceFee": data.percentageBasedConvenienceFee == ("" || null) ? false : data.percentageBasedConvenienceFee,
          "percentageConvenienceFee": data.percentageConvenienceFee,
          "thresholdAmountConvenienceFee": data.thresholdAmountConvenienceFee,
          "offlineBatchLimit": data.offlineBatchLimit,
          "prevYearCitationSequenceNumber": 0,
          "enableOfflinePrintingContract": data.enableOfflinePrintingContract == ("" || null) ? false : data.enableOfflinePrintingContract,
          "defaultCitationSequenceNumber": 0,
          "enableCustomerServiceTracking": data.enableCustomerServiceTracking == ("" || null) ? false : data.enableCustomerServiceTracking,
          "secondCitationNumberFormat": data.secondCitationNumberFormat,
          "secondCitationSequenceNumber": data.secondCitationSequenceNumber,
          "enableDistribution": data.enableDistribution == ("" || null) ? false : data.enableDistribution,
          "maxoutAdvanceSearchResults": data.maxoutAdvanceSearchResults,
          "courtEventsCutOffDays": data.courtEventsCutOffDays,
          "maxoutPrintingArchiveResults": data.maxoutPrintingArchiveResults,
          "partialPayment": data.partialPayment == ("" || null) ? false : data.partialPayment,
          "enableDistributionDisplay": data.enableDistributionDisplay == ("" || null) ? false : data.enableDistributionDisplay,
          "bootFee": 0,
          "towFee": 0,
          "firstSDayFee": 0,
          "multSDayFee": 0,
          "bootEscapeType": 0,
          "renewalRPPFee": 0,
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
        }
      }
      this.contractService.addContractSetting(obj).subscribe(res => {
        if (res.status == 'Success') {
          const msg = "";
          this.showAddForm = false;
          this.hideTable = false;
          this.showconfigForm = false;
          this.showSettingForm = false;
          this.contractSettingForm.reset();
          this.welcome = this.translate.instant("Record Added Successfully", { msg: msg });
          this.notificationService.success(this.welcome);
        }
        else if (res.status == 'ERROR') {
          for (var i = 0; i < res.details.length; i++) {
            const msg = "";
            this.welcome = this.translate.instant(res.details[i].code, { msg: msg });
            this.notificationService.error(this.welcome);
            this.contractSettingForm.get(res.details[i].fieldName)?.setErrors({ invalid: this.welcome });
          }
        }
      }, error => {
        for (var i = 0; i < error.error.details.length; i++) {
          if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
            const msg = "";
            let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
            this.welcome = this.translate.instant(translateCode, { msg: msg });
            this.addContractForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
          }
          else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
            const msg = "";
            this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
          }
          else {
            const msg = "";
            this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
          }
        }
      });
    }

  }

  UpdateSettings(data: any) {
    const t = data.overtimeCutoffTime;
    const matches = t.toLowerCase().match(/(\d{1,2}):(\d{2}) ([ap]m)/);
    const output = (parseInt(matches[1]) + (matches[3] == 'pm' ? 12 : 0)) + ':' + matches[2] + ':00';
    const obj =
    {
      "contractSettingsModel": {
        "createUserID": 1,
        "updateUserID": 1,
        "contractSettingsID": this.settingsData.contractSettingsID,
        "contractID": this.editdata.contractsID,
        "citationNumberFormat": data.citationNumberFormat,
        "citationSequenceNumber": data.citationSequenceNumber,
        "eventSequenceNumber": data.eventSequenceNumber,
        "batchSequenceNumber": data.batchSequenceNumber,
        "maximumBatchSize": data.maximumBatchSize,
        "storageLocation": "y",
        "active": true,
        "pointOfContactEmail": data.pointOfContactEmail,
        "pointOfContactName": data.pointOfContactName,
        "neighborThreshold": data.neighborThreshold,
        "clearPlate": data.clearPlate,
        "batchEncryptionPassword": data.batchEncryptionPassword,
        "overtimeCutoffTime":output == "24:00:00" ? "00:00:00":output,
        "showDLBasic": data.showDLBasic,
        "showDOBGender": data.showDOBGender,
        "showDriverDescriptors": data.showheightweight == ("" || null) ? false : data.showheightweight,
        "plateExamplesFileName": "y",
        "enablePlateExample": data.enablePlateExample,
        "showCoOwner": data.showCoOwner,
        "warningCitationNumberFormat": data.warningCitationNumberFormat,
        "warningCitationSequenceNumber": data.warningCitationSequenceNumber,
        "tolCitationNumberFormat": data.tolCitationNumberFormat,
        "tolCitationSequenceNumber": data.tolCitationSequenceNumber,
        "convenienceFee": data.convenienceFee,
        "convenienceFeePerCitation": data.convenienceFeePerCitation,
        "convenienceFeePerPlate": true,
        "enableOmniChannel": data.enableOmniChannel,
        "percentageBasedConvenienceFee": data.percentageBasedConvenienceFee,
        "percentageConvenienceFee": data.percentageConvenienceFee,
        "thresholdAmountConvenienceFee": data.thresholdAmountConvenienceFee,
        "offlineBatchLimit": data.offlineBatchLimit,
        "prevYearCitationSequenceNumber": 0,
        "enableOfflinePrintingContract": data.enableOfflinePrintingContract,
        "defaultCitationSequenceNumber": 0,
        "enableCustomerServiceTracking": data.enableCustomerServiceTracking,
        "secondCitationNumberFormat": data.secondCitationNumberFormat,
        "secondCitationSequenceNumber": data.secondCitationSequenceNumber,
        "enableDistribution": data.enableDistribution,
        "appTimeout": data.appTimeout,
        "maxoutAdvanceSearchResults": data.maxoutAdvanceSearchResults,
        "courtEventsCutOffDays": data.courtEventsCutOffDays,
        "maxoutPrintingArchiveResults": data.maxoutPrintingArchiveResults,
        "partialPayment": data.partialPayment,
        "enableDistributionDisplay": data.enableDistributionDisplay,
        'showheightweight': data.showheightweight == ("" || null) ? false : data.showheightweight,
        "bootFee": 0,
        "towFee": 0,
        "firstSDayFee": 0,
        "multSDayFee": 0,
        "bootEscapeType": 0,
        "renewalRPPFee": 0,
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
        "isDeleted": "N"
      }
    }

    this.contractService.UpdateContarctSettingList(obj).subscribe(res => {
      if (res.status = 'Success') {
        this.showAddForm = false;
        this.hideTable = false;
        this.showconfigForm = false;
        this.showSettingForm = false;
        this.contractSettingForm.reset();
        const msg = "";
        this.welcome = this.translate.instant("Record Updated Successfully", { msg: msg });
        this.notificationService.success(this.welcome);
      } else if (res.status == 'ERROR') {
        for (var i = 0; i < res.details.length; i++) {
          const msg = "";
          this.welcome = this.translate.instant(res.details[i].code, { msg: msg });
          this.notificationService.error(this.welcome);
          this.contractSettingForm.get(res.deatils[i].fieldName)?.setErrors({ invalid: this.welcome });
        }
      }
    }, error => {
      for (var i = 0; i < error.error.details.length; i++) {
        if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
          const msg = "";
          let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
          this.welcome = this.translate.instant(translateCode, { msg: msg });
          this.addContractForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
        }
        else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
          const msg = "";
          this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        }
        else {
          const msg = "";
          this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
        }
      }
    });
  }

  onClientChange(event: any) {
    this.contractService.getTimeZoneProvincesDetailsByClientId(event.value).subscribe(result => {
      if (result.status = "Success") {
        this.addContractForm.controls['stateProvincesID'].setValue(result.stateProvincesID);//res[0].stateProvincesID
        this.addContractForm.controls['timeZonesID'].setValue(result.timeZonesID);
      }
      else {
        this.notificationService.error(result.details[0].message);
      }
    }, error => {
      this.addContractForm.controls['stateProvincesID'].setValue(null);//res[0].stateProvincesID
      this.addContractForm.controls['timeZonesID'].setValue(null);
      if (error.error == null) {
        this.notificationService.error("Oops... something went wrong please try again.   " + error.message)
      }
      else if (error.error.details != undefined) {
        for (var i = 0; i < error.error.details.length; i++) {
          const msg = "";
          if (error.error.details[i].code == null) {
            this.notificationService.error("Oops... something went wrong please try again.   " + error.message);
            return;
          }
          const errcode = error.error.details[i].code;
          this.alertMsg = this.translate.instant(error.error.details[i].code, { msg: msg });
          this.addContractForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: errcode });
          this.notificationService.error(error.error.details[i].fieldName + " " + error.error.details[i].message)
        }
      }
      else {
        this.notificationService.error("Oops... something went wrong please try again.   " + error.message)
      }
    }
    );


  }

  toggleContract(data: any, status: boolean) {
    const msgs = "";
    const obj = {
      "contractsID": data.contractsID
    }
    if (status) {
      if (confirm(this.translate.instant(`Are you sure you want to Enable Contract`, { msg: msgs }))) {

        this.contractService.toggleContract(obj).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Contract Enabled Successfully", { msg: msgs }));
            this.getContractList();
          }
        })

      }
    } else {
      if (confirm(this.translate.instant(`Are you sure you want to Disable Contract`, { msg: msgs }))) {

        this.contractService.toggleContract(obj).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Contract Disabled Successfully", { msg: msgs }));
            this.getContractList();
          }
        })

      }
    }
  }
}

