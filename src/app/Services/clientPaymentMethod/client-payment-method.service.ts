import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientPaymentMethodService {

  constructor(private http: HttpClient) { }
  public apiUrl= environment.BASE_eTIMS_URL;
  getPaymentDetails():Observable<any> {
    return this.http.get(this.apiUrl+"/admin/v1/paymentDetails");
  }

  getPaymentMehtod()
  {
    return this.http.get(this.apiUrl+"/admin/v1/paymentModeMaster");      
  }

  createPayment(data:any):Observable<any>{
    return this.http.post(this.apiUrl + '/admin/v1/paymentDetails',data);  
   }
   updatePayment(data:any):Observable<any>{
    return this.http.put<any>(this.apiUrl + '/admin/v1/paymentDetails',data);
  }
  deletePayment(data:any):Observable<any>{
    return this.http.delete<any>(this.apiUrl + '/admin/v1/paymentDetails?paymentModeId='+data);
  }

}
