import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { debug } from 'console';

import { ContractServiceStub } from 'src/app/shared/testCasesHelperClasses/contractServiceStub';
import { environment } from 'src/environments/environment';
import { ContractService } from './contract.service';

describe('ContractService', () => {
  let service: ContractService;
  let serviceStub = new ContractServiceStub();
  let controller : HttpTestingController;
  let baseUrl = environment.BASE_CW5_URL;
  let reqObj : any;

  reqObj =  
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
  let newContractSetting:any = {
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
      "overtimeCutoffTime": "10:30:00",
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
  let contractType: any = 
    [
      {
          "contractTypesId": 1,
          "contractTypesName": "Red Light"
      },
      {
          "contractTypesId": 2,
          "contractTypesName": "Speed"
      },
      {
          "contractTypesId": 3,
          "contractTypesName": "Parking"
      }
  ]

  let newContractTypeForTZP = {
    "clientsId": 2,
    "clientsName": "Suffolk",
    "timeZonesID": 1,
    "clientsNumber": "SU",
    "clientsShortName": "YC",
    "stateProvincesID": 1,
    "stateProvincesName": "Missouri",
    "timeZonesName": "Atlantic Time Zone",
    "isDeleted": "N"
}
const editContractData = {
  "contractsModel":
  {
    "createUserID": 0,
    "updateUserID": 1,
    "createDatetime": new Date("2022-03-23").toISOString(),
    "updateDatetime": new Date("2022-03-23").toISOString(),
    "isDeleted": "N",
    "contractsID": "this.editdata.contractsID",
    "clientsID": "this.editdata.clientsID",
    "name": "data.name",
    "stateProvincesID": "data.stateProvincesID",
    "timeZonesID": "data.timeZonesID",
    "identifier": "data.identifier",
    "programManagerUserID": "data.programManagerUserID",
    "contractTypeId": "data.contractType",
    "code": "data.code",
    "twoFactorEnabled": "data.twoFactorEnabled",
    "active": true,
    "passwordExpirationLength": "data.passwordExpirationLength",
    "cbiDashboardLink": "data.cbiDashboardLink",
    "payByWebCode": "data.payByWebCode",
    "partialPaymentDueValidation": "data.partialPaymentDueValidation",
    "mavroCode": "data.mavroCode",
    "partialPaymentValidation": "data.partialPaymentValidation",
    "initials": "ab",
    "shortName": "test",
    "officeCode": 0,
    "officeName": "test",
    "pcrDate": "2022-04-26T14:59:30.219Z",
    "dataBaseName": "test",
    "response": 0
  }
}
  
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
    service = TestBed.inject(ContractService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getContract should return payment details list', () => {
    let response : any;
    let mockData : any;
    
    service.getContract().subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/ClientContracts/getAllContracts');
    request.flush(reqObj);
    controller.verify();
    expect(reqObj).toEqual(response);
  })

  it('createPayment should create one contract', () => {
    let response: any;
    service.createContract(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/ClientContracts/addClientContracts',reqObj);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })

  it('updateContract should update a contract', ()=> {
    let response: any;
    let data : any = editContractData;
    service.updateContract(data).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/ClientContracts/updateClientContract',data);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })

  it('getProgramManager should return program managers list', () => {
    let response : any;
    let mockData : any;
    
    service.getProgramManager().subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/User/getAllUsers');
    request.flush(reqObj);
    controller.verify();
    expect(reqObj).toEqual(response);
  })

  it('editContract should update a edit contract', ()=> {
    let response: any;
    let clientsID = reqObj.clientsID;
    let contractsID = reqObj.contractsID;
    service.editContract(clientsID, contractsID).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl 
      + `api/v1/ClientContracts/getContractDetail?ClientsID=${clientsID}&ContractsID=${contractsID}`);
    
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })

  it('addContractSetting should add one contract setting', () => {
    let response :any;
    let data = JSON.stringify(newContractSetting);
    service.addContractSetting(data).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/ContractSettings/addContractSettings',data);
    request.flush(newContractSetting);
    expect(newContractSetting).toEqual(response);
  })

  it('getContarctSettingList should return contract setting list', () => {
    let response : any;
    let mockData : any;
    let id = 2;
    service.getContarctSettingList(id).subscribe(res => {
      response = res;
    });

    const request = controller.expectOne(baseUrl + `api/v1/ContractSettings/getContractSettingsById?ContractID=`+id);
    request.flush(reqObj);
    controller.verify();
    expect(reqObj).toEqual(response);
  })

  it('UpdateContarctSettingList should update a contract setting list', ()=> {
    let response: any;
    let data = newContractSetting;
    let resObj = {};
    service.UpdateContarctSettingList(data).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/ContractSettings/updateContractSettings',data);
    request.flush(resObj);
    // debugger
    console.log("----------------->",resObj,response);
    expect(resObj).toEqual(response);
  })

  it('getClientMaster should return contract setting list', () => {
    let response : any;
    let mockData : any;
    service.getClientMaster().subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/Client/getAllClients');
    request.flush(newContractSetting);
    controller.verify();
    expect(newContractSetting).toEqual(response);
  })

  it('getClientMaster should return list of contract type', () => {
    let response : any;
    service.getContractMaster().subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/ContractTypes/getAllContractTypes');
    request.flush(contractType);
    controller.verify();
    expect(contractType).toEqual(response);
  })

  it('getTimeZoneMaster should return list of time zone', () => {
    let response : any;
    let data:any;
    service.getTimeZoneMaster().subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/TimeZone/getAllTimeZones');
    request.flush(reqObj);
    controller.verify();
    expect(reqObj).toEqual(response);
  })

  it('getStateProvincesMaster should return all State Provices', () => {
    let response : any;
    let data:any;
    service.getStateProvincesMaster().subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/StateProvinces/getAllStateProvinces');
    request.flush(reqObj);

    controller.verify();
    
    expect(reqObj).toEqual(response);
  })

  it('getTimeZoneProvincesDetailsByClientId should return all State Provices', () => {
    let response : any;
    let id = 2;
    let data: any;
    service.getTimeZoneProvincesDetailsByClientId(id).subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/ClientContracts/getTimeZoneProvincesDetailsByClientId?ClientId='+id);
    request.flush(reqObj);
    controller.verify();
    
    expect(reqObj).toEqual(response);
  })

  it('toggleContract should toggle contract', () => {
    let response : any;
    let id = 2;
    let data: any = newContractTypeForTZP;
    service.toggleContract(data).subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/ClientContracts/updateContractStatus?ContractID='+data.contractsID, data);
    request.flush(data);
    controller.verify();

    expect(data).toEqual(response);
  })





});
