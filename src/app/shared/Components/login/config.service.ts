import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

// Http Options

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  public getUserInfo(user: any, token: any): Observable<any> {
    const url = window.location.origin + '/idp/oauth2/userinfo';
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+ token
      })
    }
    return this.http.post<any>(url, user, httpOptions).pipe(retry(2),catchError(this.handleError))
  }  
}