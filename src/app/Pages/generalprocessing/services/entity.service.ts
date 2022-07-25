import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(private http: HttpClient){}

   test(): Observable<any>{
          return  this.http.get('http://localhost:3000/users');
        }
}
