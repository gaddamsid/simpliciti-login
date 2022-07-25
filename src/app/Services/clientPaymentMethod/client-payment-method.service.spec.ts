import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { ClientPaymentMethodServiceStub } from 'src/app/shared/testCasesHelperClasses/clientPaymentMethodServiceStub';
import { ClientPaymentMethodService } from './client-payment-method.service';


describe('ClientPaymentMethodService', () => {
  let service: ClientPaymentMethodService;
  let serviceStub = new ClientPaymentMethodServiceStub();
  let controller : HttpTestingController;
  let baseUrl = environment.BASE_eTIMS_URL;
  let reqObj : any;
  reqObj =  
    {
      "paymentModeId": 10,
        "paymentModeMasterId": 161,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-16T16:56:23.34",
        "updateDatetime": "2022-06-16T16:56:23.34",
        "paymentModeDesc": "CASH - BOND",
        "paymentModeCD": "CB",
        "paymentModeNCR": 2,
        "paymentOpenDrawer": "Y",
        "active": 1,
        "isDeleted": "N"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
    service = TestBed.inject(ClientPaymentMethodService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('getPaymentDetails should return payment details list', () => {
    let response : any;
    let mockData : any;
    
    service.getPaymentDetails().subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + '/admin/v1/paymentDetails');
    request.flush(reqObj);
    controller.verify();
    expect(reqObj).toEqual(response);
  });

  it('getPaymentMehtod should return a list', () => {
    let response : any;
    let mockData : any;
    
    service.getPaymentMehtod().subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + '/admin/v1/paymentModeMaster');
    request.flush(reqObj);
    controller.verify();
    expect(reqObj).toEqual(response);
  });

  it('createPayment should add one payment', () => {
    let response: any;
    service.createPayment(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + '/admin/v1/paymentDetails',reqObj);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });

  it('updatePayment should update a payment', ()=> {
    let response: any;
    service.updatePayment(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + '/admin/v1/paymentDetails',reqObj);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });

  it('deletePayment should delete a ticket', () => {
    let response: any;
    let id = 1;
    service.deletePayment(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + '/admin/v1/paymentDetails?paymentModeId='+reqObj);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });
});
