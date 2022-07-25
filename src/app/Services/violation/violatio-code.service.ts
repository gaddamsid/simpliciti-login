import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViolationCode } from 'src/app/Models/violation-code';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ViolatioCodeService {
  public apiUrl = 'http://20.96.145.113:8011/';
  constructor(private http: HttpClient) { }

  getViolationCode(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'admin/v1/violationCode');
  }

  addViolationCode(data: any): Observable<any> {
    return this.http.post(this.apiUrl + 'admin/v1/violationCode', data);
  }

  incrementviolation(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'admin/v1/getMaxViolCodeIntId');
  }

  updateViolationCode(data: any, violationCodesId: any): Observable<any> {
    return this.http.put<any>(
      this.apiUrl + 'admin/v1/violationCode/' + violationCodesId,
      data
    );
  }
  deleteViolationCode(id: any): Observable<any> {
    return this.http.delete<any>(
      this.apiUrl + 'admin/v1/violationCode/' + id
    );
  }
}
