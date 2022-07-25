import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IssuingAgencyModel } from 'src/app/Models/IssuingAgency/issuingAgency.Model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class IssuingAgencyService {

  public apiUrl= environment.BASE_eTIMS_URL;

  constructor(private httpClient:HttpClient) { }

  getIssuingAgency():Observable<any>{
    return this.httpClient.get(this.apiUrl+'admin/v1/issuingAgency');
  }

  addIssuingAgencylist(data:any):Observable<any>{
    return this.httpClient.post<any>(this.apiUrl+'admin/v1/issuingAgency',data);
  }
  
  updateIssuingAgency(id:any,data:any):Observable<any>{
    return this.httpClient.put<any>(this.apiUrl+'admin/v1/issuingAgency?issuingAgencyId='+id,data);
  }

  deleteIssuingAgency(data:any):Observable<any>{
    return this.httpClient.delete<any>(this.apiUrl+'admin/v1/issuingAgency?issuingAgencyId='+data);
  }
  

}
