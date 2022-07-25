import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { BadgeNumberServiceStub } from 'src/app/shared/testCasesHelperClasses/badgeNumberServiceStub';
import { BadgeNumberService } from './badge-number.service';


describe('BadgeNumberService', () => {
  let service: BadgeNumberService;
  let serviceStub = new BadgeNumberServiceStub();
  let controller : HttpTestingController;
  let baseUrl = environment.BASE_eTIMS_URL;
  let reqObj : any;
  reqObj = 
    {
      "badgeNumberId": 377,
      "contractId": 2,
      "createUserId": 1,
      "updateUserId": 1,
      "createDatetime": "2022-05-20T12:06:20.54",
      "updateDatetime": "2022-05-20T12:06:20.54",
      "badgeAgency": 10,
      "badgeDivision": 1,
      "badgeOfficerName": "D.K.",
      "active": 1,
      "isDeleted": "N",
      "isUploaded": "Y",
      "badgeNumber": "009170"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
    service = TestBed.inject(BadgeNumberService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });
    
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getBadgeNumber should return list of address', () => {
    let response : any;
    let mockData : any;

    serviceStub.getBadgeNumberList().subscribe(accounts => {
      mockData = accounts;
    });
    
    service.getBadgeNumber().subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/badgeNumber');
    request.flush(reqObj);
    controller.verify();
    expect(mockData[0]).toEqual(response);
  })

  it('addBadgeNumber should add one address to the list', () => {
    let response: any;
    service.addBadgeNumber(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/badgeNumber',reqObj);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })

  it('updateBadgeNumber should update a address in the list', ()=> {
    let response: any;
    service.updateBadgeNumber(reqObj,reqObj.badgeNumberId).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/badgeNumber/'+reqObj.badgeNumberId, reqObj);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })

  it('deleteBadgeNumber should delete a address from the list', () => {
    let response: any;
    let id = 377;
    service.deleteBadgeNumber(id).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + `admin/v1/badgeNumber/${id}`);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })
});
