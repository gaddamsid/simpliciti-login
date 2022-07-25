import { Observable, of } from 'rxjs';
import { CitationList } from './CitationMockList';

export class CitationTicketTypeServiceStub {

    public getTickettypeList(): Observable<any[]> {
        return of(CitationList);
    }
    public addTickettypeList(data: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '0000' }]});
    }
    public UpdateTickettype(id: number, data: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '0000' }]});
    }
    public deleteTickettype(id: any): Observable<any> {
        return of({status: 'Success', details : [{code: '0000'}]});
    }

}