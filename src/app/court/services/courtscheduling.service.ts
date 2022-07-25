import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'lodash';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CourtScheduleModel } from '../models/createSchedule/CourtScheduleModel'
@Injectable({
  providedIn: 'root'
})
export class CourtschedulingService {

  constructor(private http: HttpClient) { }
  private list!: any[];
  private baseUrl = 'http://20.62.52.26:8115/';
  private locationUrl = 'http://20.80.203.237:8113/api/v1/AdvanceSearch/getCourts';
  private courtScheduleListUrl = 'api/v1/CourtSchedule/getCourtScheduleList';

  private courtRoomTypeUrl = 'http://20.62.52.26:8115/api/v1/CourtSchedule/getCourtRoomTypes';
  private categoryUrl = 'http://20.62.52.26:8115/api/v1/CourtSchedule/getCourtRoomCategory';
  private PlateDetailsUrl = 'http://20.96.148.37:8089/violation/v1/getPlateDetails/';
  private getEventUrl = 'http://20.62.52.26:8115/api/v1/ScheduleHearing/getScheduleHearing';
  private getEventweekUrl = 'http://20.62.52.26:8115/api/v1/ScheduleHearing/getScheduleHearingByDay';
  private getCourt = 'http://20.190.248.121:8112/api/v1/Courts/getAllCourts';
  private addCourtHearingUrl = 'http://20.62.52.26:8115/api/v1/ScheduleHearing/addCourtHearing'

  public getSchedulingList(): Observable<any[]> {

    let obs = of(['This is test', 'This is another test']);
    return obs;
  }

  public createNewSchedule(data: any): Observable<any> {
    let reqUrl = this.baseUrl + 'api/v1/CourtSchedule/CreateCourtSchedule';
    // let response!
    let obs = this.http.post<any>(reqUrl, data);
    return obs;
  }

  public updateASchedule(data: any) {
    let obs = of('Data Updated');
    return obs;
  }

  public deleteASchedule(data: any) {
    let obs = of('Data deleted');
    return obs;
  }
  public getLocationlist(): Observable<any> {
    return this.http.get<any>(this.locationUrl);
  }
  public getCourtlist(): Observable<any> {
    return this.http.get<any>(this.getCourt);
  }

  public getCourtRoomTypes(): Observable<any> {
    return this.http.get<any>(this.courtRoomTypeUrl);
  }
  public getCourtRoomCategory(): Observable<any> {
    return this.http.get<any>(this.categoryUrl);
  }

  public getPlateInfo(platenumber: string): Observable<any> {
    return this.http.get<any>(this.PlateDetailsUrl + platenumber);
  }

  public getEventMonth(params: any): Observable<any> {
    return this.http.get<any>(this.getEventUrl, { params: params });
  }


  public getEventWeek(params: any): Observable<any> {
    return this.http.get<any>(this.getEventweekUrl, { params: params });
  }

  public getCourtScheduleList() : Observable<any> {
    return this.http.get<any>(this.baseUrl + this.courtScheduleListUrl);
  }


  public addEvent(obj: any): Observable<any> {
    return this.http.post<any>(this.addCourtHearingUrl, obj);
  }

}
