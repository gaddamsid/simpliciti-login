import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentAgenciesModel } from 'src/app/Models/Payments/agencies.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentAgenciesService {
  public apiUrl = 'http://20.190.248.121:8112/';

  constructor(private http: HttpClient) { }

  getAgency(): Observable<PaymentAgenciesModel[]> {
    return this.http.get<PaymentAgenciesModel[]>(this.apiUrl + 'api/v1/PaymentAgency/getAllPaymentAgency');
  }

  getPaymentVendor(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/v1/PaymentAgency/getAllPaymentVendor');
  }

  getWorkflowStates(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/v1/WorkflowStates/getWorkflowStatesById?ContractID=' + id);
  }

  getStates(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/v1/StateProvinces/getAllStateProvinces');
  }

  getPaymentAgencyById(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/v1/PaymentAgency/getPaymentAgencyById?PaymentAgenciesID=' + id);
  }

  addAgency(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/v1/PaymentAgency/addPaymentAgency', data);
  }

  updateAgency(data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'api/v1/PaymentAgency/UpdatePaymentAgency', data);
  }

  toggleAgency(data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'api/v1/PaymentAgency/changeStatusPaymentAgency', data);
  }
}
