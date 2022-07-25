import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContractModel } from 'src/app/Models/Contracts/contract.Model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractService {


  apiUrl = environment.BASE_CW5_URL;


  constructor(private httpClient:HttpClient) { }

   getContract():Observable<ContractModel[]>{
    return this.httpClient.get<ContractModel[]>(this.apiUrl + 'api/v1/ClientContracts/getAllContracts');
  }

  createContract(data:any):Observable<any>{

    return this.httpClient.post(this.apiUrl + 'api/v1/ClientContracts/addClientContracts',data);  
    
  }

   updateContract(data:any):Observable<any>{
    return this.httpClient.put<any>(this.apiUrl + 'api/v1/ClientContracts/updateClientContract',data);
  }

   getProgramManager():Observable<any>{
    return this.httpClient.get<any>(this.apiUrl + 'api/v1/User/getAllUsers');
  }

  editContract(clientid:any,contractid:any):Observable<any>{
    return this.httpClient.get<any>(this.apiUrl + 'api/v1/ClientContracts/getContractDetail?ClientsID='+ clientid + '&ContractsID='+ contractid);
  }

  addContractSetting(data:any):Observable<any>{
    return this.httpClient.post(this.apiUrl + 'api/v1/ContractSettings/addContractSettings',data);
  }

  getContarctSettingList(id:any):Observable<any>{
    return this.httpClient.get(this.apiUrl + 'api/v1/ContractSettings/getContractSettingsById?ContractID='+ id);
  }

  UpdateContarctSettingList(data:any):Observable<any>{
    return this.httpClient.put(this.apiUrl + 'api/v1/ContractSettings/updateContractSettings',data);
  }

  
  getClientMaster():Observable<any>{
    return this.httpClient.get(this.apiUrl + 'api/v1/Client/getAllClients');
  }
 
  getContractMaster():Observable<any>{
    return this.httpClient.get(this.apiUrl + 'api/v1/ContractTypes/getAllContractTypes');
  }
  getTimeZoneMaster():Observable<any>{
    return this.httpClient.get(this.apiUrl + 'api/v1/TimeZone/getAllTimeZones');
  }
  getStateProvincesMaster():Observable<any>{
    return this.httpClient.get(this.apiUrl + 'api/v1/StateProvinces/getAllStateProvinces');
  }

  getTimeZoneProvincesDetailsByClientId(clientId :any):Observable<any>{
    return this.httpClient.get(this.apiUrl + 'api/v1/ClientContracts/getTimeZoneProvincesDetailsByClientId?ClientId='+clientId);
  }
  
  toggleContract(data:any):Observable<any>{
    return this.httpClient.put(this.apiUrl + 'api/v1/ClientContracts/updateContractStatus?ContractID='+data.contractsID, data);  
   }
}
