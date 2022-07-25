import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { ActionList } from 'src/app/shared/testCasesHelperClasses/Action-and-CategoriesStub/ActionMockList';

export class ActionServiceStub {

    public get(url: string, CW5type?: boolean): any {
            return of(ActionList);
    }

    public post(url: string, data: any, CW5type?: boolean): Observable<any> {
        return of({ status: 'Success', details: [{ code: '0000' }] });
    }

    public put(url: string, data: any, CW5type?: boolean): Observable<any> {
		return of({status: 'Success', details: [{code: '200'}]});
	}

}