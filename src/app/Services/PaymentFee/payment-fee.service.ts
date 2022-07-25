import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentFeeModel } from 'src/app/Models/payment-fee.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentFeeService {
  reset() {
    throw new Error('Method not implemented.');
  }
  public apiUrl = environment.BASE_eTIMS_URL;
  constructor(private http: HttpClient) {}

   getPaymentFee(): Observable<PaymentFeeModel[]> {
    return this.http.get<PaymentFeeModel[]>(this.apiUrl + 'admin/v1/paymentfee');
  }

  addPaymentFee(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + 'admin/v1/paymentfee', data);
    }

  updatePaymentFee(id:any,data: any): Observable<any> {
        return this.http.put<any>(this.apiUrl + 'admin/v1/paymentfee/'+id, data);
    }

    deletePaymentFee(id: any): Observable<any> {
            return this.http.delete<any>(this.apiUrl + 'admin/v1/paymentfee/'+id);
    }
}
