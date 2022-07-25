import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {JuridictionModel} from 'src/app/Models/jurisdictioninterface'

@Injectable({
  providedIn: 'root'
})
export class JurisdictionService {
 
  public apiUrl = environment.BASE_CW5_URL;

  constructor(private http: HttpClient) { }

 getAllJurisdictions():Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/v1/Jurisdictions/getAllJurisdictions');
  }
  addJurisdictions(body:any) {
    return this.http.post(this.apiUrl + 'api/v1/Jurisdictions/addJurisdictions', body);
  }
  updateJurisdictions(body:any):Observable<any> {
    return this.http.put<any>(this.apiUrl + 'api/v1/Jurisdictions/updateJurisdiction', body);
  }
  toggleJuriState(Id: number):Observable<any> {
    let params = new HttpParams();
    params.set("JuridictionsId", Id);
    return this.http.put(this.apiUrl + `api/v1/Jurisdictions/updateJurisdictionsStatus?JuridictionsId=${Id}`, {});
  }
}

