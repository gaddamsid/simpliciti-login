import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { CustomerInteraction } from 'src/app/Models/fileTransfer.Model';

const obj = {
    "customerInteractionId": 1,
    "contractId": 1,
    "createUserId": 2,
    "updateUserId": 2,
    "createDateTime": "2022-06-08T08:18:30.6",
    "updatedDateTime": "2022-06-08T08:18:30.6",
    "customerInteractionCode": "I",
    "customerInteractionText": "Internet",
    "active": 1,
    "isDeleted": "N"
}

export class CustomerInteractionServiceStub {
    public getCustomerintractionlist(): Observable<any[]> {
        return of(
            [
                {
                    "customerInteractionId": 1,
                    "contractId": 1,
                    "createUserId": 2,
                    "updateUserId": 2,
                    "createDateTime": "2022-06-08T08:18:30.6",
                    "updatedDateTime": "2022-06-08T08:18:30.6",
                    "customerInteractionCode": "I",
                    "customerInteractionText": "Internet",
                    "active": 1,
                    "isDeleted": "N"
                },
                {
                    "customerInteractionId": 1,
                    "contractId": 1,
                    "createUserId": 2,
                    "updateUserId": 2,
                    "createDateTime": "2022-06-08T08:18:30.6",
                    "updatedDateTime": "2022-06-08T08:18:30.6",
                    "customerInteractionCode": "I",
                    "customerInteractionText": "Internet",
                    "active": 1,
                    "isDeleted": "N"
                }
            ]
        );
    }
    public addCustomerintractionlist(data: any): Observable<any> {
        return of({status: 'Success', details : [{code: '1'}]});
    }
    public updateCustomerintractionlist(id: any, data: any): Observable<any> {
        return of({status: 'Success'});
    }
    public deleteCustomerintractionlist(id: any): Observable<any> {
        return of({status: 'Success', details : [{code: '1'}]});
    }

}