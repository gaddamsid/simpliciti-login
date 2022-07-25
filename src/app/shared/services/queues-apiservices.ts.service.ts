import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueuesApiservices {
  toggleState(id: number) {
    throw new Error('Method not implemented.');
}

public apiUrl = environment.BASE_eTIMS_URL;
public apiCW5Url = environment.BASE_CW5_QUEUE_URL;
public apiV = environment.API_V;
public adminV = environment.ADMIN_V;

constructor(private http: HttpClient) { }

public get(url: string, CW5type?: boolean): Observable<any> {
    const hostUrl = (CW5type ? this.apiCW5Url : this.apiUrl);
    const hostV = (CW5type ? this.apiV : this.adminV);
    return this.http.get(hostUrl + hostV + url).pipe(map(res => res));
}

public post(url: string, data: any, CW5type?: boolean): Observable<any> {
    const hostUrl = (CW5type ? this.apiCW5Url : this.apiUrl);
    const hostV = (CW5type ? this.apiV : this.adminV);
    return this.http.post(hostUrl + hostV + url, data).pipe(map(res => res));
}

public put(url: string, data: any, CW5type?: boolean): Observable<any> {
    const hostUrl = (CW5type ? this.apiCW5Url : this.apiUrl);
    const hostV = (CW5type ? this.apiV : this.adminV);


    return this.http.put(hostUrl + hostV + url, data).pipe(map(res => res));
}

public delete(url: string, id: any, CW5type?: boolean): Observable<any> {
    const hostUrl = (CW5type ? this.apiCW5Url : this.apiUrl);
    const hostV = (CW5type ? this.apiV : this.adminV);
    return this.http.delete(hostUrl + hostV + url).pipe(map(res => res));
}

public deletepl(url: string, data: any, id: any, CW5type?: boolean): Observable<any> {
    const hostUrl = (CW5type ? this.apiCW5Url : this.apiUrl);
    const hostV = (CW5type ? this.apiV : this.adminV);
    return this.http.delete(hostUrl + hostV + url, data).pipe(map(res => res));
}

public arDelete(url: string, id: any, CW5type?: boolean): Observable<any> {
    const hostUrl = (CW5type ? this.apiCW5Url : this.apiUrl);
    const hostV = (CW5type ? this.apiV : this.adminV);
    return this.http.delete(hostUrl + hostV + url + id).pipe(map(res => res));
}
}
