import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable()
export class EntityServiceStub{
    public test () {
		return of([{}])
	}
}