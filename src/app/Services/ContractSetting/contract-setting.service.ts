import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContractSetting } from 'src/app/Models/Contracts/contractSetting.Model';


@Injectable({
  providedIn: 'root'
})
export class ContractSettingService {
  apiUrl = 'http://20.85.39.176:8112/api/v1/ContractSettings/getContractSettingsById?ContractSettingsID=1';

  constructor(private httpClient:HttpClient) { }

  public getContractSetting():Observable<ContractSetting[]>{
    return this.httpClient.get<ContractSetting[]>(this.apiUrl);
  }

  postContractSetting(data:any){
    return this.httpClient.get<ContractSetting[]>(this.apiUrl,data);
  }
  postSettingsDetails(data: ContractSetting): Observable<ContractSetting>{
    return this.httpClient.post<ContractSetting>(this.apiUrl, data)
    //return of(person)
  }
}
