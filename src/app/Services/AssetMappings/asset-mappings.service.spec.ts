import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';


import { AssetMappingsService } from './asset-mappings.service';
import { AssetMappingsServiceStub } from 'src/app/shared/testCasesHelperClasses/asset-mappingServiceStub';

describe('AssetMappingsService', () => {
  let service: AssetMappingsService;
  let serviceStub = new AssetMappingsServiceStub();
  let controller : HttpTestingController;
  let baseUrl = environment.BASE_CW5_URL;
  let reqObj : any;

  reqObj = {
    "contractId": 2,
    "assetTypesID": 9,
    "assetTypesName": "Rear 1",
    "isSelected": true,
    "isDeleted": "N",
    "ordinalPosition": 1
  }

 beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
    service = TestBed.inject(AssetMappingsService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAssetTypes should return list of assets', () => {
    let response : any;
    let mockData : any;

    serviceStub.getAddressSourceList().subscribe(accounts => {
      mockData = accounts;
    });
    
    service.getAssetTypes().subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/ContractAdmin/GetAssetTypesForMappings?ContractId=2');
    request.flush(reqObj);
    controller.verify();
    expect(mockData[0]).toEqual(response);
  })

  it('updateAssetTypes should update asset', () => {
    let response: any;
    service.updateAssetTypes(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/ContractAdmin/AddUpdateAssetMappings',reqObj);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })
});
