import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountCode } from '../../Models/account-code';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenceTypeService {

  public apiUrl = environment.BASE_eTIMS_URL;

  constructor(private http: HttpClient) { }

  getCorrespondenceList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/admin/v1/correspondenceType');
  }

  addCorrespondenceList(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/admin/v1/correspondenceType', data);
  }

  updateCorrespondence(id: any, data: any): Observable<any> {
    return this.http.put(this.apiUrl + '/admin/v1/correspondenceType/' + id, data);
  }

  deleteCorrespondence(id:any):Observable<any>{
    return this.http.delete(this.apiUrl + 'admin/v1/correspondenceType/'+id);
  }
}
