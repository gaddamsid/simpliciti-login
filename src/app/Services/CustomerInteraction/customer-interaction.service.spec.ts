import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CustomerInteractionServiceStub } from 'src/app/shared/testCasesHelperClasses/customerInteractionServiceStub';
import { environment } from 'src/environments/environment';

import { CustomerInteractionService } from './customer-interaction.service';

describe('CustomerInteractionService', () => {
  let customerInteractionService: CustomerInteractionService;
  let controller: HttpTestingController;
  let baseUrl = environment.BASE_eTIMS_URL;
  let serviceStub = new CustomerInteractionServiceStub();
  let reqObj: any;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    customerInteractionService = TestBed.inject(CustomerInteractionService);
    controller = TestBed.inject(HttpTestingController);
    reqObj = {
      "customerInteractionId":1,
      "contractId":1,
      "createUserId":2,
      "updateUserId":2,
      "createDateTime":"2022-06-08T08:18:30.6",
      "updatedDateTime":"2022-06-08T08:18:30.6",
      "customerInteractionCode":"I",
      "customerInteractionText":"Internet",
      "active":1,
      "isDeleted":"N"
   }
  });

  it('should be created', () => {
    expect(customerInteractionService).toBeTruthy();
  });

  it('getCustomerintractionlist should return a list', () => {
    let mockData: any;
    let response: any;
    serviceStub.getCustomerintractionlist().subscribe((res1) => {
      mockData = res1;
    })
    customerInteractionService.getCustomerintractionlist().subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/interaction');
    request.flush(reqObj);
    controller.verify();
    expect(mockData[0]).toEqual(response);
  });

  it('addCustomerintractionlist should add a record', () => {
    let response: any;
    customerInteractionService.addCustomerintractionlist(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/interaction');
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });

  it('updateCustomerintractionlist should update an existing record', () => {
    let response: any;
    let customerInteractionId = 1;
    customerInteractionService.updateCustomerintractionlist(customerInteractionId, reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/interaction/'+customerInteractionId);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })

  it('deleteCustomerintractionlist should delete an existing record', () => {
    let response: any;
    let customerInteractionId = 1;
    customerInteractionService.deleteCustomerintractionlist(customerInteractionId).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/interaction/' + customerInteractionId);
    request.flush('Success');
    expect(response).toEqual('Success');
  })
});
