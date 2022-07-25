import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
    public subjectLogin = new BehaviorSubject([]);
    setLoginUserDeta(user: any) {
        this.subjectLogin.next(user);
    }
    getLoginUserDeta(): Observable<any> {
        return this.subjectLogin.asObservable();
    }
}