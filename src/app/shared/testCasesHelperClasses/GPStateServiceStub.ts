import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { GPStateService } from "src/app/general-processing/services/g-p-state.service";

@Injectable()
export class GPStateServiceStub{
        data : any[] = [{
                "dateOfBirth" : '',
                "effectiveDate" :  '',
                "addressInfo" : '',
                "vehicleInfo" : ''
        }] 
        searchResults = new BehaviorSubject<{ events: any[], entity: any[] }>({ events: [], entity: [this.data] });
        // private searchResults = new BehaviorSubject<{ events: any[], entity: any[] }>({ events: [], entity: [] });
        searchResults$ = this.searchResults.asObservable();

        changePagination()
        {
                
        };
        getSearchList() 
        {
                return this.data;
        }
        onClickNextPage = jasmine.createSpy();
        onSearch = jasmine.createSpy();
        onAdvanceSearch = jasmine.createSpy();
        
        public put(url: string, data: any, CW5type?: boolean): Observable<any> {
		return of({ status: 'Success', details: [{ code: '200' }] });
	}
}