import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SuspendCodeServiceStub } from 'src/app/shared/testCasesHelperClasses/suspendCodeServiceStub';
import { environment } from 'src/environments/environment';

import { SuspendCodeService } from './suspend-code.service';

describe('SuspendCodeService', () => {
  let suspendCodeService: SuspendCodeService;
  let controller: HttpTestingController;
  let baseUrl = environment.BASE_eTIMS_URL;
  let serviceStub = new SuspendCodeServiceStub();
  let reqObj: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    suspendCodeService = TestBed.inject(SuspendCodeService);
    controller = TestBed.inject(HttpTestingController);
    reqObj = {
      active: "Y",
      calendarDays: "Y",
      contractId: 2,
      createDateTime: "2022-06-16T13:00:19.797",
      createUserId: 1,
      extraLongName: "",
      extraRules: "",
      isDeleted: "N",
      suspendClass: "",
      suspendCod: 99,
      suspendCodeNew: 0,
      suspendCodePriority: 1,
      suspendCodeTypeId: 1,
      suspendName: "SCHED HEAR",
      suspendNameLong: "HEAR SCHED",
      suspendNumDays: 10,
      suspendType: "T",
      updateDateTime: "2022-06-16T13:00:19.797",
      updateUserId: 1,
    }
  });

  it('should be created', () => {
    expect(suspendCodeService).toBeTruthy();
  });

  it('getSuspendCode should return a list', () => {
    let mockData: any;
    let response: any;
    serviceStub.getSuspendCode().subscribe((res1) => {
      mockData = res1;
    })
    suspendCodeService.getSuspendCode().subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/suspendCodeType');
    request.flush(reqObj);
    controller.verify();
    expect(mockData[0]).toEqual(response);
  });

  it('addSuspendCode should add a record', () => {
    let response: any;
    suspendCodeService.addSuspendCode(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/suspendCodeType');
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });

  it('updateSuspendCode should update an existing record', () => {
    let response: any;
    let suspendCodeTypeId = 1;
    suspendCodeService.updateSuspendCode(reqObj, suspendCodeTypeId).subscribe((res) => {
      response = res;
      expect(response.suspendCodeTypeId).toEqual(1);
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/suspendCodeType/' + suspendCodeTypeId);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })

  it('deleteSuspendCode should delete an existing record', () => {
    let response: any;
    let suspendCodeTypeId = 1;
    suspendCodeService.deleteSuspendCode(suspendCodeTypeId).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/suspendCodeType/' + suspendCodeTypeId);
    request.flush({ status: 'Success' });
    expect(response.status).toEqual('Success');
  })
});
