import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherTypeService {
  public apiUrl = environment.BASE_CW5_URL;

  constructor(private http: HttpClient) { }
  getWeatherTypes() {
    return this.http.get(this.apiUrl + 'api/v1/WeatherType/getWeatherTypeList');
  }
  createWeatherType(body:any) {
    return this.http.post(this.apiUrl + 'api/v1/WeatherType/addWeatherType', body);
  }
  updateWeatherType(body:any):Observable<any> {
    return this.http.put<any>(this.apiUrl + 'api/v1/WeatherType/updateWeatherType', body);
  }
  toggleWeatherState(body:any):Observable<any> {
    return this.http.put<any>(this.apiUrl + 'api/v1/WeatherType/toggleWeatherType', body);
  }
}
