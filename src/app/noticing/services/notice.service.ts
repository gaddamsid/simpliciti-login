import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  private baseUrl = 'http://20.75.115.164:8116/';
  private stateUrl = 'http://20.190.248.121:8112/api/v1/StateProvinces/getAllStateProvinces';
  private citationUrl = 'http://20.80.203.237:8113/'
 
  constructor(private http: HttpClient) { }

  searchNotice(data : any) : any
  { 
      let url = "api/v1/Notice/getAllNotice";
      return this.http.post(this.baseUrl + url,data);
  } 

  getNoticeTypeList()
  {
    let url = 'api/v1/Notice/getNoticeType';
    return this.http.get(this.baseUrl + url).pipe(map(res => res));
  }

  getStateList()
  {
    return this.http.get(this.stateUrl).pipe(map(res => res));
  }

  getNoticeDetails(id : number)
  {
      let url = 'api/v1/NoticeDetails/getNoticeDetailsById';
      return this.http.get(this.baseUrl + url + `?NoticeId=${id}`);
  }

  getCitationDetails(id: string): Observable<any> {
    let url = 'api/v1/NoticeCitationDetails/getNoticeCitationById';
    return this.http.get(this.citationUrl + url + `?CitationId=${id}`);
  }

}


