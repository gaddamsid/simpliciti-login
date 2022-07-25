import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { clientModel } from 'src/app/Models/client-management.Model';


@Injectable({
  providedIn: 'root'
})
export class ClientManagementService {


  public apiUrl = environment.BASE_CW5_URL;

  constructor(private http: HttpClient) { }

  getClientList(): Observable<clientModel[]> {
    return this.http.get<clientModel[]>(this.apiUrl + 'api/v1/Client/getAllClients');
  }

  addClientList(data: any): Observable<any> {
    return this.http.post(this.apiUrl + 'api/v1/Client/addClient', data);
  }

  getTimeZone(): Observable<any> {
    return this.http.get(this.apiUrl + 'api/v1/TimeZone/getAllTimeZones');
  }

  getStateProvinces(): Observable<any> {
    return this.http.get(this.apiUrl + 'api/v1/StateProvinces/getAllStateProvinces');
  }


  UpdateClient(id: any, data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'api/v1/Client/updateClient', data);
  }

  deleteClient(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + 'api/v1/Client/deleteClient' + id);
  }

  toggleClient(data:any):Observable<any>{
    return this.http.put(this.apiUrl + 'api/v1/Client/changeStatus', data);  
   }
}
