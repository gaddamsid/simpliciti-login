import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CourtHolidayServiceStub } from 'src/app/shared/testCasesHelperClasses/courtHolidayServiceStub';
import { environment } from 'src/environments/environment';
import { CourtHolidayService } from './court-holiday.service';

describe('CourtHolidayService', () => {
  let courtHolidayService: CourtHolidayService;
  let controller: HttpTestingController;
  let baseUrl = environment.BASE_CW5_URL;
  let serviceStub = new CourtHolidayServiceStub();
  let reqObj: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    courtHolidayService = TestBed.inject(CourtHolidayService);
    controller = TestBed.inject(HttpTestingController);
    reqObj = {
      active: false,
      contractID: 0,
      createDatetime: "2022-05-18T11:59:35.007",
      createUserID: 0,
      holidayDate: "2022-05-10T00:00:00",
      holidayDescription: "Janta",
      holidayId: 1,
      holidayRecordNumber: 897,
      isDeleted: "N",
      updateDatetime: "2022-05-18T11:59:35.007",
      updateUserID: 0
    }
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(courtHolidayService).toBeTruthy();
  });

  it('getCourtHoliday should return a list', () => {
    let mockData: any;
    let response: any;
    serviceStub.getCourtHoliday().subscribe((res1) => {
      mockData = res1;
    })
    courtHolidayService.getCourtHoliday().subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/CourtHoliday/getCourtHolidayList');
    request.flush(reqObj);
    controller.verify();
    expect(mockData[0]).toEqual(response);
  });

  it('getCourtHoliday should return fail with 500 error', () => {
    let emsg = 'status 500 error';
    courtHolidayService.getCourtHoliday().subscribe(() => fail('should have failed with the 500 error.'), (error: HttpErrorResponse) => {
      expect(error.status).withContext('status').toEqual(500);
      expect(error.error).withContext('message').toEqual(emsg)
    });
    const request = controller.expectOne(baseUrl + 'api/v1/CourtHoliday/getCourtHolidayList');
    expect(request.request.method).toEqual('GET');
    request.flush(emsg, { status: 500, statusText: 'Server Error' });
  });

  it('throws 404 error', () => {
    courtHolidayService.getCourtHoliday().subscribe(
      () => fail('Should have failed with 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.error).toContain('404 error');
      }
    );
    const req = controller.expectOne(baseUrl + 'api/v1/CourtHoliday/getCourtHolidayList');
    // Respond with mock error
    req.flush('404 error', { status: 404, statusText: 'Not Found' });
  });

  it('addCourtHoliday should add a record', () => {
    let response: any;
    courtHolidayService.addCourtHoliday(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/CourtHoliday/addCourtHoliday');
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });

  it('updateCourtHoliday should update an existing record', () => {
    let response: any;
    courtHolidayService.updateCourtHoliday(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/CourtHoliday/updateCourtHoliday');
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })

  it('toggleCourtHoliday should update an existing record', () => {
    let response: any;
    courtHolidayService.toggleCourtHoliday(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/CourtHoliday/updateCourtHolidayToggle');
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })
});
