import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { PaymentDetailsList, PaymentModeMasterList } from './PaymentsMockList';

export class ClientPaymentMethodServiceStub {
    
    public getPaymentDetails(): Observable<any[]> {
        return of(PaymentDetailsList);
        // return this.http.get(this.apiUrl + "/admin/v1/paymentDetails");
    }

    public getPaymentMehtod(): Observable<any[]> {
        return of(PaymentModeMasterList);
    }

    public createPayment(data: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '0000' }] });
    }

    public updatePayment(data: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '0000' }] });
    }

    public deletePayment(data: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '0000' }] });
    }
}