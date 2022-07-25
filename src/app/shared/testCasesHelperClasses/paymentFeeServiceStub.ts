import { Observable } from 'rxjs';
import { of } from 'rxjs';
export class PaymentFeeServiceStub {
    public getPaymentFee(): Observable<any[]> {
        return of(
            [
                {
                    "chargeCode": 1,
                    "chargeTypeLong": 'Boot fee',
                    "chargeTypeShort": 'Boot',
                    "chargeAmount": 76,
                    "cashieringind": '\u0000',
                    "contractId": 2,
                    "createUserId": 1,
                    "updateUserId": 1,
                    "violationaccountchargesId": 1,
                    "createDatetime": "2022-05-09T07:44:11.203",
                    "updateDatetime": "2022-05-09T07:44:11.203",
                    "active": 1,
                    "isDeleted": "N"
                },
                {
                    "chargeCode": 1,
                    "chargeTypeLong": 'Boot fee',
                    "chargeTypeShort": 'Boot',
                    "chargeAmount": 75,
                    "cashieringind": '\u0000',
                    "contractId": 2,
                    "createUserId": 1,
                    "updateUserId": 1,
                    "violationaccountchargesId": 1,
                    "createDatetime": "2022-05-09T07:44:11.203",
                    "updateDatetime": "2022-05-09T07:44:11.203",
                    "active": 1,
                    "isDeleted": "N"
                }
            ]
        );
    }
    public addPaymentFee(data: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    public updatePaymentFee(id: any, data: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    public deletePaymentFee(id: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }

}