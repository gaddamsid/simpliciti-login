import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PaymentFeeServiceStub } from 'src/app/shared/testCasesHelperClasses/paymentFeeServiceStub';
import { environment } from 'src/environments/environment';

import { PaymentFeeService } from './payment-fee.service';

describe('PaymentFeeService', () => {
  let paymentFeeService: PaymentFeeService;
  let controller : HttpTestingController;
  let baseUrl = environment.BASE_eTIMS_URL;
  let serviceStub = new PaymentFeeServiceStub();
  let reqObj: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    paymentFeeService = TestBed.inject(PaymentFeeService);
    controller = TestBed.inject(HttpTestingController);

    reqObj = {
      "chargeCode": 1,
      "chargeTypeLong": 'Boot fee',
      "chargeTypeShort": 'Boot',
      "chargeAmount": 76,
      "cashieringind": '\u0000',
      "contractId": 2,
      "createUserId": 1,
      "updateUserId": 1,
      "violationaccountchargesId": 1,
      "createDatetime": "2022-05-09T07:44:11.203",
      "updateDatetime": "2022-05-09T07:44:11.203",
      "active": 1,
      "isDeleted": "N"
  };
  });

  it('should be created', () => {
    expect(paymentFeeService).toBeTruthy();
  });

  it('getPaymentFee should return a list', () => {
    let mockData: any;
    let response: any;
    serviceStub.getPaymentFee().subscribe((res1) => {
      mockData = res1;
    })
    paymentFeeService.getPaymentFee().subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl+'admin/v1/paymentfee');
    request.flush(reqObj);
    controller.verify();
    expect(mockData[0]).toEqual(response);
  });

  it('addPaymentFee should add a record', () => {
    let response: any;
    paymentFeeService.addPaymentFee(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl+'admin/v1/paymentfee');
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });

  it('updatePaymentFee should update an existing record', () => {
    let response: any;
    let chargeCode = 1;
    paymentFeeService.updatePaymentFee(chargeCode, reqObj).subscribe((res) => {
      response = res;
      expect(response.chargeCode).toEqual(1);
    });
    const request = controller.expectOne(baseUrl+'admin/v1/paymentfee/'+chargeCode);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })

  it('deletePaymentFee should delete an existing record', () => {
    let response: any;
    let chargeCode = 1;
    paymentFeeService.deletePaymentFee(chargeCode).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl+'admin/v1/paymentfee/'+chargeCode);
    request.flush({status:'Success'});
    expect(response.status).toEqual('Success');
  })
});
