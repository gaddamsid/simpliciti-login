import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddSuspendCode, SuspendCodeModel, UpdateSuspendCode } from 'src/app/Models/suspendCode.Model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuspendCodeService {
  public apiUrl = environment.BASE_eTIMS_URL;

  constructor(private http: HttpClient) { }
  
  getSuspendCode(): Observable<SuspendCodeModel[]> {
    return this.http.get<SuspendCodeModel[]>(this.apiUrl+'admin/v1/suspendCodeType')
  }
  addSuspendCode(data:AddSuspendCode):Observable<any>{
    return this.http.post(this.apiUrl + `admin/v1/suspendCodeType`,data);  
   }
  updateSuspendCode(data: any, id:number):Observable<any> {
    return this.http.put<any>(this.apiUrl + `admin/v1/suspendCodeType/${id}`, data);
  }
  deleteSuspendCode(id: number):Observable<any> {
    return this.http.delete<any>(this.apiUrl + `admin/v1/suspendCodeType/${id}`);
  }
}
