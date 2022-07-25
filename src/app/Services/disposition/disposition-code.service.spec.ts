import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DispositionCodeServiceStub } from 'src/app/shared/testCasesHelperClasses/dispositionCodeServiceStub';
import { DispositionCodeService } from './disposition-code.service';

describe('DispositionCodeService', () => {
  let dispositionCodeService: DispositionCodeService;
  let controller: HttpTestingController;
  let baseUrl = 'http://20.96.145.113:8011/';
  let serviceStub = new DispositionCodeServiceStub();
  let reqObj: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    dispositionCodeService = TestBed.inject(DispositionCodeService);
    controller = TestBed.inject(HttpTestingController);
    reqObj = {
      createDatetime: "2022-04-12T07:16:32.897",
      createUserId: 1,
      dispDescription: "ADJUST FINE AND/OR PENALTY(S)",
      dispRule: "A",
      dispositionRulesMasterId: 1,
      updateDatetime: "2022-04-12T07:16:32.897",
      updateUserId: 1
    }
  });

  it('should be created', () => {
    expect(dispositionCodeService).toBeTruthy();
  });

  it('getDispositionCode should return a list', () => {
    let mockData: any;
    let response: any;
    serviceStub.getDispositionCode().subscribe((res1) => {
      mockData = res1;
    })
    dispositionCodeService.getDispositionCode().subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/dispositionCode');
    request.flush([]);
    controller.verify();
    expect(mockData.length).toBeGreaterThan(0);
  });

  it('addDispCode should add a record', () => {
    let response: any;
    dispositionCodeService.addDispCode(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/dispositionCode');
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });

  it('updateDispCode should update an existing record', () => {
    let response: any;
    let dispCode = 1
    dispositionCodeService.updateDispCode(dispCode, reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/dispositionCode?dispositionId=' + dispCode);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })

  it('deleteDispCode should delete an existing record', () => {
    let response: any;
    let id = 7;
    dispositionCodeService.deleteDispCode(id).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/dispositionCode/?dispositionId=' + id);
    request.flush(id);
    expect(response).toEqual(7);
  })

  it('getDispRuleMasterList should return a list', () => {
    let mockData: any;
    let response: any;
    serviceStub.getDispRuleMasterList().subscribe((res1) => {
      mockData = res1;
    })
    dispositionCodeService.getDispRuleMasterList().subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/dispositionRulesMaster');
    request.flush(reqObj);
    controller.verify();
    expect(mockData[0]).toEqual(response);
  });
});
