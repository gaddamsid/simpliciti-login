import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { AddressSourceService } from './address-source.service';
import { AddressSourceServiceStub } from '../../shared/testCasesHelperClasses/addresssSourceServiceStub';

describe('AddressSourceService', () => {
  let service: AddressSourceService;
  let serviceStub = new AddressSourceServiceStub();
  let controller : HttpTestingController;
  let baseUrl = environment.BASE_eTIMS_URL;
  let reqObj : any;
  reqObj = {
    "addressSourceId": 116,
    "contractId": 2,
    "createUserId": 1,
    "updateUserId": 1,
    "createDatetime": "2022-06-01T17:12:55.36",
    "updateDatetime": "2022-06-01T17:12:55.36",
    "addressSourceCod": "M",
    "addressSourceDescription": "Manual",
    "active": 0
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
    service = TestBed.inject(AddressSourceService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAddressList should return list of address', () => {
    let response : any;
    let mockData : any;

    serviceStub.getAddressSourceList().subscribe(res1 => {
      mockData = res1;
    });
    
    service.getAddressList().subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/addressSourceCode');
    request.flush(reqObj);
    controller.verify();
    expect(reqObj).toEqual(response);
  })

  it('addAddressList should add one address to the list', () => {
    let response: any;
    service.addAddressList(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/addressSourceCode',reqObj);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })

  it('UpdateAddress should update a address in the list', ()=> {
    let response: any;
    service.UpdateAddress(reqObj.addressSourceId, reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/addressSourceCode/'+ reqObj.addressSourceId, reqObj);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })

  it('deleteAddress should delete a address from the list', () => {
    let response: any;
    let id = 1;
    service.deleteAddress(id).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + `admin/v1/addressSourceCode/`+ id);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })
});
