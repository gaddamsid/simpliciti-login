import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourtHoliday, courtHolidayModel } from 'src/app/Models/Models/courtHoliday.Model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourtHolidayService {
  public apiUrl = environment.BASE_CW5_URL;

  constructor(private http: HttpClient) { }
  getCourtHoliday(): Observable<CourtHoliday[]> {
    return this.http.get<CourtHoliday[]>(this.apiUrl+'api/v1/CourtHoliday/getCourtHolidayList');
  }
  addCourtHoliday(data:any):Observable<any>{
    return this.http.post(this.apiUrl + 'api/v1/CourtHoliday/addCourtHoliday',data);  
   }
  updateCourtHoliday(data: any):Observable<any> {
    return this.http.put<any>(this.apiUrl + 'api/v1/CourtHoliday/updateCourtHoliday', data);
  }
  toggleCourtHoliday(data: any):Observable<any> {
    return this.http.put<any>(this.apiUrl + 'api/v1/CourtHoliday/updateCourtHolidayToggle', data);
  }
}