import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private langValue = new BehaviorSubject<string>('');
  sendLang =  this.langValue.asObservable();
  constructor() { }

   langSelection(data:string){
    this.langValue.next(data);
   }
}
