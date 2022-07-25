import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { ClientManagementService } from './client-management.service';

describe('ClientManagementService', () => {
  let service: ClientManagementService;
  // let serviceStub = new ClientPaymentMethodServiceStub();
  let controller: HttpTestingController;
  let baseUrl = environment.BASE_CW5_URL;
  let reqObj: any;
  reqObj = {
    "clientsId": 10,
    "clientsName": 'Suffolk',
    "timeZonesID": 1,
    "TimeZoneName": 'Atlantic Time Zone',
    "clientsNumber": 'SU',
    "clientsShortName": 'YC',
    "stateProvincesID": 1,
    "stateProvincesName": 'Wisconsin',
    "active": 'Y',
    "createUserID": 1,
    "updateUserID": 1,
    "createDatetime": '2022-04-28T12:05:03.04',
    "updateDatetime": '2022-04-28T12:05:03.04',
    "isDeleted": 'N',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
    service = TestBed.inject(ClientManagementService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('service created', () => {
    expect(service).toBeDefined();
  });

  it('getClientList should return payment details list', () => {
    let response : any;
    let mockData : any;
    
    service.getClientList().subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/Client/getAllClients');
    request.flush(reqObj);
    controller.verify();
    expect(reqObj).toEqual(response);
  });

  it('addClientList should add one payment', () => {
    let response: any;
    service.addClientList(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/Client/addClient',reqObj);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });

  it('getTimeZone should return payment details list', () => {
    let response : any;
    let mockData : any;
    
    service.getTimeZone().subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/TimeZone/getAllTimeZones');
    request.flush(reqObj);
    controller.verify();
    expect(reqObj).toEqual(response);
  });

  it('getStateProvinces should return payment details list', () => {
    let response : any;
    let mockData : any;
    
    service.getStateProvinces().subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/StateProvinces/getAllStateProvinces');
    request.flush(reqObj);
    controller.verify();
    expect(reqObj).toEqual(response);
  });

  it('UpdateClient should add one payment', () => {
    let response: any;
    let id =reqObj.clientsId;
    service.UpdateClient(id,reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/Client/updateClient',reqObj);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });

  it('deleteClient should add one payment', () => {
    let response: any;
    let id = reqObj.clientsId;
    service.deleteClient(id).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/Client/deleteClient' + id);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });
  
  it('toggleClient should add one payment', () => {
    let response: any;
    let id = reqObj.clientsId;
    service.toggleClient(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/Client/changeStatus', reqObj);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });

});
