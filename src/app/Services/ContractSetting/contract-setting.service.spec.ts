import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';


import { ContractSettingService } from './contract-setting.service';

describe('ContractSettingService', () => {
  let service: ContractSettingService;
  // let serviceStub = new ContractServiceStub();
  let controller : HttpTestingController;
  let baseUrl = environment.BASE_CW5_URL;
  let reqObj = {
    "id": ""
  };
  let apiUrl = 'http://20.85.39.176:8112/api/v1/ContractSettings/getContractSettingsById?ContractSettingsID=1';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
    service = TestBed.inject(ContractSettingService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getContractSetting should return payment details list', () => {
    let response : any;
    let mockData : any;
    
    service.getContractSetting().subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(apiUrl);
    request.flush(reqObj);
    controller.verify();
    expect(reqObj).toEqual(response);
  })

  it('postSettingsDetails should post Contract setting details', () => {
    let response : any;
    let data : any;
    
    service.postSettingsDetails(data).subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(apiUrl);
    request.flush(reqObj);
    controller.verify();
    expect(reqObj).toEqual(response);
  })

  it('postContractSetting should post Contract setting', () => {
    let response : any;
    let data : any;
    
    service.postContractSetting(data).subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(apiUrl);
    request.flush(reqObj);
    controller.verify();
    expect(reqObj).toEqual(response);
  })

  
});
