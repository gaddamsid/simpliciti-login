
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CitationTicketTypeServiceStub } from 'src/app/shared/testCasesHelperClasses/CitationTicketTypeStub/citationTicketTypeServiceStub';
import { environment } from 'src/environments/environment';
import { CitationTicketTypeService } from './citation-ticket-type.service';

describe('CitationTicketTypeService', () => {
  let service: CitationTicketTypeService;
  let serviceStub = new CitationTicketTypeServiceStub();
  let controller : HttpTestingController;
  let baseUrl = environment.BASE_eTIMS_URL;
  let reqObj : any;
  reqObj =  
    {
      "ticketTypeID": 1,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-05-26T13:08:43.637",
        "updateDatetime": "2022-05-26T13:08:43.637",
        "ticketTypeCode": "P",
        "ticketDescText": "Parking",
        "active": 1,
        "isDeleted": "N"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
    service = TestBed.inject(CitationTicketTypeService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTickettypeList should return list of address', () => {
    let response : any;
    let mockData : any;

    serviceStub.getTickettypeList().subscribe(accounts => {
      mockData = accounts;
    });
    
    service.getTickettypeList().subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/ticketType');
    request.flush(reqObj);
    controller.verify();
    expect(mockData[0]).toEqual(response);
  })

  it('addTickettypeList should add one ticket', () => {
    let response: any;
    service.addTickettypeList(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/ticketType',reqObj);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })

  it('UpdateTickettype should update a ticket', ()=> {
    let response: any;
    service.UpdateTickettype(reqObj.ticketTypeID,reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/ticketType/'+reqObj.ticketTypeID, reqObj);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })

  it('deleteTickettype should delete a ticket', () => {
    let response: any;
    let id = 1;
    service.deleteTickettype(id).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/ticketType/'+id);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })
});
