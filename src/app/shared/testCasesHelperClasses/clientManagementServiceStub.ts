import { Observable } from 'rxjs';
import { of } from 'rxjs';

const obj = {
  "clientModel": {
    "createUserID": 0,
    "updateUserID": 0,
    "createDatetime": "2022-04-22T08:46:42.064Z",
    "updateDatetime": "2022-04-22T08:46:42.064Z",
    "isDeleted": "N",
    "active": "N",
    "clientsId": 1,
    "clientsNumber": 1,
    "clientsShortName": "Texas Test",
    "clientsName": "Texas",
    "stateProvincesID": "22",
    "timeZonesID": "2"
  }
}
export class ClientManagementServiceStub {
  getClientList(): Observable<any> {
    return of([{
      "clientModel": {
        "createUserID": 0,
        "updateUserID": 0,
        "createDatetime": "2022-04-22T08:46:42.064Z",
        "updateDatetime": "2022-04-22T08:46:42.064Z",
        "isDeleted": "N",
        "active": "N",
        "clientsId": 1,
        "clientsNumber": 1,
        "clientsShortName": "Texas Test",
        "clientsName": "Texas",
        "stateProvincesID": "22",
        "timeZonesID": "2"
      }
    }]);
  }

  public addClientList(data: any): Observable<any> {
    return of({ status: 'Success', details: [{ code: '0000' }] });
  }

  public UpdateClient(id: any, data: any): Observable<any> {
    return of({ status: 'Success', details: [{ code: '0000' }] });
  }



  public toggleClient(data: any, status: any): Observable<any> {
    return of({ status: 'Success', details: [{ code: '0000' }] });
  }

  public getTimeZone(): Observable<any[]> {
    return of([{ "timeZonesID": 2 }])
  }

  public getStateProvinces(): Observable<any[]> {
    return of([{ "stateProvincesID": 2 }])
  }

  public reverse(): Observable<any> {
    return of(obj)
  }

}