import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BadgeNumberModel, UpdateBadgeModel } from 'src/app/Models/badgeNumber.Model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BadgeNumberService {
  public apiUrl = environment.BASE_eTIMS_URL;

  constructor(private http: HttpClient) { }
  
  getBadgeNumber(): Observable<BadgeNumberModel[]> {
    return this.http.get<BadgeNumberModel[]>(this.apiUrl+'admin/v1/badgeNumber')
  }
  addBadgeNumber(data:any):Observable<any>{
    return this.http.post(this.apiUrl + `admin/v1/badgeNumber`,data);  
   }
  updateBadgeNumber(data: any,id:number):Observable<any> {
    return this.http.put<any>(this.apiUrl + `admin/v1/badgeNumber/`+id, data);
  }
  deleteBadgeNumber(id: number):Observable<any> {
    return this.http.delete<any>(this.apiUrl + `admin/v1/badgeNumber/${id}`);
  }
}
