import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ClientPaymentTypeServiceStub } from 'src/app/shared/testCasesHelperClasses/clientPaymentTypeServiceStub';
import { environment } from 'src/environments/environment';

import { ClientPaymentTypeService } from './client-payment-type.service';

describe('ClientPaymentTypeService', () => {
  let service: ClientPaymentTypeService;
  let serviceStub = new ClientPaymentTypeServiceStub();
  let controller : HttpTestingController;
  let baseUrl = environment.BASE_eTIMS_URL;
  let reqObj : any;
  reqObj =  
    {
      "paymentSourceMasterId": 14,
      "createUserId": 1, 
      "updateUserId": 1, 
      "createDatetime": "2022-04-11T13:50:41.397",
      "updateDatetime": "2022-04-11T13:50:41.397",
      "paymentSourceMasterLongName": "Error correction",
      "paymentSourceMasterShortName": "CE" ,
      "acctNumberMasterInt": "2",
      "active": "1"
  }
  let addObj = {
    paymentSourceShortName: "",
        paymentSourceLongName: "",
        acctNumberInt: 1
  }
  let addObj1 = {
    paymentSourceShortName: "",
        paymentSourceLongName: "",
        acctNumberInt: 2
  }
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
    service = TestBed.inject(ClientPaymentTypeService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getclientPayment should return payment details list', () => {
    let response : any;
    let mockData : any;
    
    service.getclientPayment().subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + '/admin/v1/clientPayment');
    request.flush(reqObj);
    controller.verify();
    expect(reqObj).toEqual(response);
  });

  it('getclientPaymentMaster should return payment details list', () => {
    let response : any;
    let mockData : any;
    
    service.getclientPaymentMaster().subscribe(res => {
      response = res;
    });

    const request = controller.expectOne(baseUrl + 'admin/v1/clientPaymentMaster');
    request.flush(reqObj);
    controller.verify();
    expect(response).toEqual(reqObj);
  });

  it('addClientPaymentType should add one payment', () => {
    let response: any;
    let data:any = addObj1;
    let resController : any = {};
    service.addClientPaymentType(addObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/clientPayment', data);
    request.flush(resController);
    expect(resController).toEqual(response);
  });

  it('updateClientPaymentType should add one payment', () => {
    let response: any;
    let id = reqObj.paymentSourceMasterId;
    let data = reqObj;
    // debugger;
    service.updateClientPaymentType(id,reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + `admin/v1/clientPayment?paymentSourceId=${id}`, data);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });

  it('deleteClientPaymentType should add one payment', () => {
    let response: any;
    let id = reqObj.paymentSourceMasterId;
    // debugger
    service.deleteClientPaymentType(id).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/clientPayment?paymentSourceId='+id);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });

});
