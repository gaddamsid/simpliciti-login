import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PayLockEmailServiceStub } from 'src/app/shared/testCasesHelperClasses/PayLockEmailServiceStub';
import { environment } from 'src/environments/environment';

import { PaylockEmailService } from './paylock-email.service';

describe('PaylockEmailService', () => {
  let paylockEmailService: PaylockEmailService;
  let controller : HttpTestingController;
  let baseUrl = environment.BASE_eTIMS_URL;
  let serviceStub = new PayLockEmailServiceStub();
  let reqObj: any;
  let updateReqObj: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    paylockEmailService = TestBed.inject(PaylockEmailService);
    controller = TestBed.inject(HttpTestingController);
    reqObj = {
      "paylockEmailconfigId":7,
      "contractId":2,
      "sNo":7,
      "emailId":"automation@gmail.com",
      "createUserId":1,
      "updateUserId":1,
      "createDatetime":"2022-05-09T07:44:11.203",
      "updateDatetime":"2022-05-09T07:44:11.203",
      "clientD":0,
      "active":1,
      "isDeleted":"N"
    }

    updateReqObj = {
      "paylockEmailconfigId":7,
      "contractId":2,
      "sNo":7,
      "emailId":"automation@gmail.com",
      "createUserId":2,
      "updateUserId":2,
      "createDatetime":"2022-05-09T07:44:11.203",
      "updateDatetime":"2022-05-09T07:44:11.203",
      "clientD":0,
      "active":1,
      "isDeleted":"N"
    }
  });

  it('should be created', () => {
    expect(paylockEmailService).toBeTruthy();
  });

  it('getpaylockList should return a list', () => {
    let mockData: any;
    let response: any;
    serviceStub.getpaylockList().subscribe((res1) => {
      mockData = res1;
    })
    paylockEmailService.getpaylockList().subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl+'admin/v1/paylockEmailConfig');
    request.flush(reqObj);
    controller.verify();
    expect(mockData[0].emailId).toEqual(response.emailId);
  });

  it('getserialNumber should return a list', () => {
    let mockData: any;
    let response: any;
    serviceStub.getserialNumber().subscribe((res1) => {
      mockData = res1;
    })
    paylockEmailService.getserialNumber().subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl+'admin/v1/getMaxSerialNumber');
    request.flush({"sNo":7});
    controller.verify();
    expect(mockData[0]).toEqual(response);
  });

  it('addPaylock should add a record', () => {
    let response: any;
    paylockEmailService.addPaylock(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl+'admin/v1/paylockEmailConfig');
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });

  it('updatePaylockEmail should update an existing record', () => {
    let response: any;
    let id = 7;
    paylockEmailService.updatePaylockEmail(id, updateReqObj).subscribe((res) => {
      response = res;
      expect(response.paylockEmailconfigId).toEqual(7);
    });
    const request = controller.expectOne(baseUrl+'admin/v1/paylockEmailConfig/'+id);
    request.flush(updateReqObj);
    expect(updateReqObj).toEqual(response);
  })

  it('deletePaylockEmail should delete an existing record', () => {
    let response: any;
    let id = 7;
    paylockEmailService.deletePaylockEmail(id).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl+'admin/v1/paylockEmailConfig/'+id);
    request.flush(id);
    expect(response).toEqual(7);
  })
});
