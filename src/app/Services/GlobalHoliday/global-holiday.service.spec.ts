import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { globalHolidayServiceStub } from 'src/app/shared/testCasesHelperClasses/globalHolidayServiceStub';
import { environment } from 'src/environments/environment';
import { GlobalHolidayService } from './global-holiday.service';

describe('GlobalHolidayService', () => {
  let globalHolidayService: GlobalHolidayService;
  let controller : HttpTestingController;
  let baseUrl = environment.BASE_CW5_URL;
  let serviceStub = new globalHolidayServiceStub();
  let reqObj: any;
  let updateReqObj: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    globalHolidayService = TestBed.inject(GlobalHolidayService);
    controller = TestBed.inject(HttpTestingController);
    reqObj = {
      "createUserID": 0,
      "updateUserID": 0,
      "createDatetime": "2022-04-22T07:49:03.042Z",
      "updateDatetime": "2022-04-22T07:49:03.042Z",
      "isDeleted": "N",
      "holidayID": 0,
      "contractID": 0,
      "active": true,
      "holidayDate": "2022-04-22T07:49:03.042Z",
      "holidayDescription": "vacation",
      "holidayRecordNumber": 1
    };
    updateReqObj = {
      "createUserID": 2,
      "updateUserID": 3,
      "createDatetime": "2022-04-22T07:49:03.042Z",
      "updateDatetime": "2022-04-22T07:49:03.042Z",
      "isDeleted": "N",
      "holidayID": 1,
      "contractID": 1,
      "active": true,
      "holidayDate": "2022-04-22T07:49:03.042Z",
      "holidayDescription": "vacation",
      "holidayRecordNumber": 1
    };
  });

  it('Global History Service should be created', () => {
    expect(globalHolidayService).toBeTruthy();
  });

  it('getHolidayList should return a list', () => {
    let mockData: any;
    let response: any;
    serviceStub.getHolidayList().subscribe((res1) => {
      mockData = res1;
    })
    globalHolidayService.getHolidayList().subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl+'api/v1/GlobalHoliday/getAllGlobalHoliday');
    request.flush(reqObj);
    controller.verify();
    expect(mockData[0]).toEqual(response);
  });

  it('addHolidayList should add a record', () => {
    let response: any;
    globalHolidayService.addHolidayList(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl+'api/v1/GlobalHoliday/addGlobalHoliday');
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });

  it('UpdateHoliday should update an existing Holiday', () => {
    let response: any;
    globalHolidayService.UpdateHoliday(updateReqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl+'api/v1/GlobalHoliday/updateGlobalHoliday');
    request.flush(updateReqObj);
    expect(updateReqObj).toEqual(response);
  })

  it('toggleGlobalHoliday should update an existing Global Holiday', () => {
    let response: any;
    globalHolidayService.toggleGlobalHoliday(updateReqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl+'api/v1/GlobalHoliday/toggleGlobalHoliday');
    request.flush(updateReqObj);
    expect(updateReqObj).toEqual(response);
  })
});
