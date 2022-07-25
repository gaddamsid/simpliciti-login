import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GlobalFormats } from '../enums/global.formats';

@Injectable({
    providedIn: 'root'
})
export class GlobalFormattingService {

    getGlobalFormats(): Observable<any> {
        return of(GlobalFormats);
    }

}