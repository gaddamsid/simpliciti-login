import { Observable } from 'rxjs';
import { of } from 'rxjs';
export class messageServiceStub{
    // sendLang = of({});
	public getMessage(): Observable<any> {
		return of([{}]);
	}
    public getAllEventEntityData(): Observable<any> {
		return of([{}]);
	}
	public sendMessage(message: any):Observable<any> {
        return of({});
    }

    clearMessages() {
        return of({});
    }
}