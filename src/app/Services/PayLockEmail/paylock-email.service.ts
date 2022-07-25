import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';
import {PaylockEmail} from '../../Models/paylock-email';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaylockEmailService {

  public apiUrl= environment.BASE_eTIMS_URL;

  constructor(private http:HttpClient) { }

  getpaylockList():Observable<PaylockEmail[]>{
    return this.http.get<PaylockEmail[]>(this.apiUrl + 'admin/v1/paylockEmailConfig');
  }

  getserialNumber():Observable<any[]>{
    return this.http.get<any>(this.apiUrl + 'admin/v1/getMaxSerialNumber');
  }

  addPaylock(data:any):Observable<any>{
    return this.http.post(this.apiUrl + 'admin/v1/paylockEmailConfig',data);
  }

  updatePaylockEmail(id:any,data:any):Observable<any>{
    return this.http.put(this.apiUrl + 'admin/v1/paylockEmailConfig/'+id,data);
  }

  deletePaylockEmail(id:any):Observable<any>{
    return this.http.delete(this.apiUrl + 'admin/v1/paylockEmailConfig/'+id);
  }

}
