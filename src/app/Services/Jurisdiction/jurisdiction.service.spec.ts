import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { JurisdictionServiceStub } from 'src/app/shared/testCasesHelperClasses/JurisdictionServiceStub';
import { environment } from 'src/environments/environment';

import { JurisdictionService } from './jurisdiction.service';

describe('JurisdictionService', () => {
  let jurisdictionService: JurisdictionService;
  let controller : HttpTestingController;
  let baseUrl = environment.BASE_CW5_URL;
  let serviceStub = new JurisdictionServiceStub();
  let reqObj: any;
  let updateReqObj: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    jurisdictionService = TestBed.inject(JurisdictionService);
    controller = TestBed.inject(HttpTestingController);
    reqObj = {
      "jurisdictionsID": 128, 
      "contractID": 1, 
      "active": true, 
      "jurisdictionsName": "Bronx", 
      "jurisdictionCode": "1000", 
      "jurisdictionsDmvCode": "11", 
      "createUserID": 0, 
      "updateUserID": 0, 
      "createDatetime": "2022-05-20T12:03:46.29", 
      "updateDatetime": "2022-05-20T12:03:46.29", 
      "isDeleted": "N"
    };
    updateReqObj = {
      "jurisdictionsID": 129, 
      "contractID": 2, 
      "active": true, 
      "jurisdictionsName": "Bronx", 
      "jurisdictionCode": "1000", 
      "jurisdictionsDmvCode": "12", 
      "createUserID": 1, 
      "updateUserID": 1, 
      "createDatetime": "2022-05-20T12:03:46.29", 
      "updateDatetime": "2022-05-20T12:03:46.29", 
      "isDeleted": "N"
    }
  });

  it('should be created', () => {
    expect(jurisdictionService).toBeTruthy();
    console.log(baseUrl)
  });

  it('getAllJurisdictions should return a list', () => {
    let mockData: any;
    let response: any;
    serviceStub.getAllJurisdictions().subscribe((res1) => {
      mockData = res1;
    })
    jurisdictionService.getAllJurisdictions().subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl+'api/v1/Jurisdictions/getAllJurisdictions');
    request.flush(reqObj);
    controller.verify();
    expect(mockData[0]).toEqual(response);
  });

  it('addJurisdictions should add a record', () => {
    let response: any;
    jurisdictionService.addJurisdictions(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl+'api/v1/Jurisdictions/addJurisdictions');
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });

  it('updateJurisdictions should update an existing Holiday', () => {
    let response: any;
    jurisdictionService.updateJurisdictions(updateReqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl+'api/v1/Jurisdictions/updateJurisdiction');
    request.flush(updateReqObj);
    expect(updateReqObj).toEqual(response);
  })

  it('toggleJuriState should update an existing Global Holiday', () => {
    let response: any;
    let id = 129;
    jurisdictionService.toggleJuriState(id).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl+'api/v1/Jurisdictions/updateJurisdictionsStatus?JuridictionsId='+id);
    request.flush(updateReqObj);
    expect(updateReqObj).toEqual(response);
  })
});
