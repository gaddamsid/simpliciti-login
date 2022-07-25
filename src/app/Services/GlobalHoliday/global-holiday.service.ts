import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import {GlobalHoliday} from '../../Models/global-holiday';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GlobalHolidayService {

  constructor(private http:HttpClient) { }

  public apiUrl = environment.BASE_CW5_URL;;

   getHolidayList():Observable<GlobalHoliday[]>{
    return this.http.get<GlobalHoliday[]>(this.apiUrl + 'api/v1/GlobalHoliday/getAllGlobalHoliday');  
   }

   addHolidayList(data:any):Observable<any>{
    return this.http.post(this.apiUrl + 'api/v1/GlobalHoliday/addGlobalHoliday',data);  
   }

   UpdateHoliday(data:any):Observable<any>{
    return this.http.put(this.apiUrl + 'api/v1/GlobalHoliday/updateGlobalHoliday',data);
   }

   toggleGlobalHoliday(data:any):Observable<any>{
    return this.http.put(this.apiUrl + 'api/v1/GlobalHoliday/toggleGlobalHoliday', data);  
   }



   
}
