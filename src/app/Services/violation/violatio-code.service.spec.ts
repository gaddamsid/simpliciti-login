import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ViolatioCodeServiceStub } from 'src/app/shared/testCasesHelperClasses/violatioCodeServiceStub';
import { environment } from 'src/environments/environment';

import { ViolatioCodeService } from './violatio-code.service';

describe('ViolatioCodeService', () => {
  let violatioCodeService: ViolatioCodeService;
  let controller: HttpTestingController;
  let baseUrl = environment.BASE_eTIMS_URL;
  let serviceStub = new ViolatioCodeServiceStub();
  let reqObj: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    violatioCodeService = TestBed.inject(ViolatioCodeService);
    controller = TestBed.inject(HttpTestingController);

    reqObj = {
      "violationCodesId": 585,
      "contractId": 2,
      "createUserId": 1,
      "createDateTime": "2022-05-02T11:00:20.797",
      "updateUserId": 1,
      "updateDateTime": "2022-05-02T11:00:20.797",
      "violClassTbl": "A",
      "violCodeAltExt": "ViolCodeAltExt_Java",
      "violCodeInt": 458,
      "violCodeExt": "TRC7.2.55",
      "violPriority": 2,
      "violClass": "Q",
      "violType": "P",
      "violName": "NO PRK ZN",
      "violLongName": "NO PARKING ZONE     ",
      "violProcessDesc": " ",
      "violProcessDate1": "1905-06-15T00:00:00",
      "violAgencyGroup": "VAgeGrp_D",
      "violProcessDate2": "1905-06-15T00:00:00",
      "violProcessData2": "VPData2_D",
      "codeText": "",
      "clientNumber": "51",
      "active": 1,
      "isDeleted": "N",
      "violationCodeCharges": [
        {
          "violationCodeChargesId": 67,
          "contractId": 2,
          "createUserId": 5,
          "createDateTime": "1905-06-15T00:00:00",
          "updateUserId": 5,
          "updateDateTime": "1905-06-15T00:00:00",
          "fine": 100.75,
          "effDate": "2021-06-15T00:00:00",
          "pen1": 101.0,
          "pen2": 102.0,
          "pen3": 103.0,
          "pen4": 104.0,
          "pen5": 105.0
        },
      ]
    }
  });

  it('should be created', () => {
    expect(violatioCodeService).toBeTruthy();
  });

  it('getViolationCode should return a list', () => {
    let mockData: any;
    let response: any;
    serviceStub.getViolationCode().subscribe((res1) => {
      mockData = res1;
    })
    violatioCodeService.getViolationCode().subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/violationCode');
    request.flush(reqObj);
    controller.verify();
    expect(mockData[0]).toEqual(response);
  });

  it('incrementviolation should return a list', () => {
    let mockData: any;
    let response: any;
    serviceStub.incrementviolation().subscribe((res1) => {
      mockData = res1;
    })
    violatioCodeService.incrementviolation().subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/getMaxViolCodeIntId');
    request.flush(509);
    controller.verify();
    expect(mockData[0]).toEqual(response);
  });

  it('addViolationCode should add a record', () => {
    let response: any;
    violatioCodeService.addViolationCode(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/violationCode');
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });

  it('updateViolationCode should update an existing record', () => {
    let response: any;
    let violationCodesId = 585;
    violatioCodeService.updateViolationCode(reqObj, violationCodesId).subscribe((res) => {
      response = res;
      expect(response.violationCodesId).toEqual(585);
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/violationCode/' + violationCodesId);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })

  it('deleteViolationCode should delete an existing record', () => {
    let response: any;
    let violationCodesId = 585;
    violatioCodeService.deleteViolationCode(violationCodesId).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/violationCode/' + violationCodesId);
    request.flush(violationCodesId);
    expect(response).toEqual(585);
  })
});
