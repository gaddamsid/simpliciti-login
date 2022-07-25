import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable()
export class TokenStorageServiceStub{
    public getToken () {
		return of([{}])
	}
}