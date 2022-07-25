import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { AssignAgencyList } from './AssignAgencyMockList';

export class AssignAgencyServiceStub {

    public get(url: string, CW5type?: boolean): any {
            return of(AssignAgencyList);
    }

    public post(url: string, data: any, CW5type?: boolean): Observable<any> {
        return of({ status: 'Success', details: [{ code: '0000' }] });
    }

    public put(url: string, data: any, CW5type?: boolean): Observable<any> {
        return of({ status: 'Success', details: [{ code: '0000' }] });
    }

    public delete(id: any): Observable<any> {
        return of({status: 'Success', details : [{code: '0000'}]});
    }

}