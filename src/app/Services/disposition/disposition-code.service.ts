import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DispositionCodeModel, DispRuleMasterModel } from 'src/app/Models/disposition-code.model';

@Injectable({
  providedIn: 'root'
})
export class DispositionCodeService {
  public apiUrl = 'http://20.96.145.113:8011/';
  constructor(private http: HttpClient) { }

  getDispositionCode(): Observable<DispositionCodeModel[]> {
    return this.http.get<DispositionCodeModel[]>(this.apiUrl + 'admin/v1/dispositionCode');
  }

  addDispCode(data: any):Observable<any>{
    return this.http.post(this.apiUrl + `admin/v1/dispositionCode`,data);  
  }
  
  updateDispCode(dispCode: number, data: any):Observable<any> {
    return this.http.put<any>(this.apiUrl + `admin/v1/dispositionCode?dispositionId=`+dispCode, data);
  }

  deleteDispCode(id: number):Observable<any> {
    return this.http.delete<any>(this.apiUrl + `admin/v1/dispositionCode/?dispositionId=`+id);
  }

  getDispRuleMasterList(): Observable<DispRuleMasterModel[]> {
    return this.http.get<DispRuleMasterModel[]>(this.apiUrl + `admin/v1/dispositionRulesMaster`);
  }
}
