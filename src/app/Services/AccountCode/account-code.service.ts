import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';
import {AccountCode} from '../../Models/account-code';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountCodeService {

  public apiUrl= environment.BASE_eTIMS_URL;

  constructor(private http:HttpClient) { }

  getaccountCodelist():Observable<AccountCode[]>{
    return this.http.get<AccountCode[]>(this.apiUrl + 'admin/v1/accountTypes');
  }

  getintAccounNumber():Observable<AccountCode[]>{
    return this.http.get<AccountCode[]>(this.apiUrl + 'admin/v1/getMaxIntAccNumber');
  }

  addaccountCode(data:any):Observable<any>{
    return this.http.post(this.apiUrl + 'admin/v1/accountTypes',data);
  }

  UpdateaccountCode(data:any):Observable<any>{
    return this.http.put(this.apiUrl + 'admin/v1/accountTypes',data);
  }

  deleteaccountCode(id:any):Observable<any>{
    return this.http.delete(this.apiUrl + 'admin/v1/accountTypes?accountTypesId='+id);
  }

}
