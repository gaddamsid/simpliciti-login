import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IssuingAgencyServiceStub } from 'src/app/shared/testCasesHelperClasses/issuing-agency/IssuingAgencyServiceStub';
import { environment } from 'src/environments/environment';

import { IssuingAgencyService } from './issuing-agency.service';

describe('IssuingAgencyService', () => {
  let issuingAgencyService: IssuingAgencyService;
  let controller : HttpTestingController;
  let baseUrl = environment.BASE_eTIMS_URL;
  let serviceStub = new IssuingAgencyServiceStub();
  let reqObj: any;
  let updateReqObj: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    issuingAgencyService = TestBed.inject(IssuingAgencyService);
    controller = TestBed.inject(HttpTestingController);
    reqObj = {
      active: 0,
      agencyCode: 20,
      agencyDistrict: 33,
      agencyLongName: "Kriti",
      agencyMoveTktsPerBk: 7,
      agencyParkTktsPerBk: 6,
      agencyShortName: "Roy",
      agencyStreetEnforceInd: "A",
      agencyViolTableGroup: "B"
    }

    updateReqObj = {
      active: 1,
      agencyCode: 13,
      agencyDistrict: 23,
      agencyLongName: "Hyderabad",
      agencyMoveTktsPerBk: 21,
      agencyParkTktsPerBk: 22,
      agencyShortName: "India",
      agencyStreetEnforceInd: "A",
      agencyViolTableGroup: "B",
      contractId: 3,
      createDateTime: "2022-05-11T10:24:17.823",
      createUserId: 2,
      isDeleted: "N",
      issuingAgencyId: 2,
      updateDateTime: "2022-05-11T10:24:17.823",
      updateUserId: 2
    }
  });

  it('should be created', () => {
    expect(issuingAgencyService).toBeTruthy();
  });

  it('getIssuingAgency should return a list', () => {
    let mockData: any;
    let response: any;
    serviceStub.getIssuingAgency().subscribe((res1) => {
      mockData = res1;
    })
    issuingAgencyService.getIssuingAgency().subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl+'admin/v1/issuingAgency');
    request.flush(reqObj);
    controller.verify();
    expect(mockData).toEqual(response);
  });

  it('addIssuingAgencylist should add a record', () => {
    let response: any;
    issuingAgencyService.addIssuingAgencylist(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl+'admin/v1/issuingAgency');
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });

  it('updateIssuingAgency should update an existing record', () => {
    let response: any;
    let id = '2';
    issuingAgencyService.updateIssuingAgency(id, updateReqObj).subscribe((res) => {
      response = res;
      expect(response.issuingAgencyId).toEqual(2);
    });
    const request = controller.expectOne(baseUrl+'admin/v1/issuingAgency?issuingAgencyId='+id);
    request.flush(updateReqObj);
    expect(updateReqObj).toEqual(response);
  })

  it('deleteIssuingAgency should delete an existing record', () => {
    let response: any;

    let rowData={issuingAgencyId: 47};

    issuingAgencyService.deleteIssuingAgency(rowData.issuingAgencyId).subscribe((res) => {

      response = res;

    });

    const request = controller.expectOne(baseUrl + 'admin/v1/issuingAgency?issuingAgencyId='+rowData.issuingAgencyId);

    request.flush('Success');

    expect(response).toEqual('Success');

  })
});
