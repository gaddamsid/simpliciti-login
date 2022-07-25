import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetMappingModel } from 'src/app/Models/assetMapping.Model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetMappingsService {
  public apiUrl = environment.BASE_CW5_URL;

  constructor(private http: HttpClient) { }

  getAssetTypes(): Observable<AssetMappingModel[]> {
    let params = new HttpParams();
    params = params.append("ContractId", 2);
    return this.http.get<AssetMappingModel[]>(this.apiUrl + 'api/v1/ContractAdmin/GetAssetTypesForMappings', {params: params})
  }

  updateAssetTypes(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + `api/v1/ContractAdmin/AddUpdateAssetMappings`, data);
  }
}