import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GPService {

    public apiEtimsUrl = environment.BASE_eTIMS_SEARCH_URL;
    public apiCw5Url = environment.BASE_CW5_SEARCH_URL;
    public eTimsV = environment.SEARCH_V;
    public cw5V = environment.API_V;

    constructor(private http: HttpClient) { }

    public get(uri: string, isCw5 = false): Observable<any> {
        const url = isCw5 ? this.apiCw5Url : this.apiEtimsUrl;
        const endPoint = isCw5 ? this.cw5V : this.eTimsV;
        return this.http.get(url + endPoint + uri).pipe(map(res => res));
    }

    public post(uri: string, data: any, isCw5 = false): Observable<any> {
        const url = isCw5 ? this.apiCw5Url : this.apiEtimsUrl;
        const endPoint = isCw5 ? this.cw5V : this.eTimsV;
        return this.http.post(url + endPoint + uri, data).pipe(map(res => res));
    }

    public put(uri: string, data: any, isCw5 = false): Observable<any> {
        const url = isCw5 ? this.apiCw5Url : this.apiEtimsUrl;
        const endPoint = isCw5 ? this.cw5V : this.eTimsV;
        return this.http.put(url + endPoint + uri, data).pipe(map(res => res));
    }

    public delete(uri: string, isCw5 = false): Observable<any> {
        const url = isCw5 ? this.apiCw5Url : this.apiEtimsUrl;
        const endPoint = isCw5 ? this.cw5V : this.eTimsV;
        return this.http.delete(url + endPoint + uri).pipe(map(res => res));
    }
}