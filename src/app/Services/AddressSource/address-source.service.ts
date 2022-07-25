import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressSourceModel } from 'src/app/Models/Address Source/address-source-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressSourceService {

  public apiUrl= environment.BASE_eTIMS_URL;

  constructor(private http:HttpClient) { }

  getAddressList():Observable<AddressSourceModel[]>{
      return this.http.get<AddressSourceModel[]>(this.apiUrl + 'admin/v1/addressSourceCode');
    }

    addAddressList(data:any):Observable<any>{
      return this.http.post(this.apiUrl + 'admin/v1/addressSourceCode',data);
    }

    UpdateAddress(id:any,data:any):Observable<any>{
      return this.http.put(this.apiUrl + 'admin/v1/addressSourceCode/'+id,data);
    }

    deleteAddress(id:any):Observable<any>{
      return this.http.delete(this.apiUrl + 'admin/v1/addressSourceCode/'+id);
    }


 
}


