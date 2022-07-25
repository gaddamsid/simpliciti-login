import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { identity } from 'lodash';
import { Observable } from 'rxjs';
import { ClientPaymentType } from 'src/app/Models/client-payment-type.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientPaymentTypeService {
  constructor(private http: HttpClient) { }
  public apiUrl= environment.BASE_eTIMS_URL;
  
      getclientPayment():Observable<any> {
        return this.http.get(this.apiUrl+"/admin/v1/clientPayment");
      }

      getclientPaymentMaster():Observable<any>{
          return this.http.get<any>(this.apiUrl + 'admin/v1/clientPaymentMaster');
      }


      addClientPaymentType(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + 'admin/v1/clientPayment', data);
      }

      updateClientPaymentType(id:any,data: any): Observable<any> {
          return this.http.put<any>(this.apiUrl +`admin/v1/clientPayment?paymentSourceId=${id}`, data);
        }

      deleteClientPaymentType(id: any): Observable<any> {
            return this.http.delete<any>(
              this.apiUrl + 'admin/v1/clientPayment?paymentSourceId='+id
            );
      }

   
}
