import { Observable } from 'rxjs';

import { of } from 'rxjs';

import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { EventEmitter } from 'eventemitter3';
import { Injectable } from '@angular/core';
// // export class TranslateServiceStub{
// // 	public onLangChange: any= new EventEmitter();
// // 	public onTranslationChange: any = new EventEmitter();
// // 	public onDefaultLangChange:any = new EventEmitter();
// // 	public get(key: any): any {
// // 		return of(key);
// // 	}

// // }
const translateService = jasmine.createSpyObj<TranslateService>('translateService', ['instant', 'get']);
// export class TranslateServiceStub{
//     currentLang:any= 'en';
//     onLangChange= new EventEmitter();
//     us= translateService.get;
//     get=translateService.get.and.returnValue(of(''));
//     onTranslationChange=new EventEmitter();
//     onDefaultLangChange=new EventEmitter();
//   };
//   const mockTranslationService =  jasmine.createSpyObj<TranslateService>('translateService', ['instant', 'get']);

// mockTranslationService.instant.and.callFake(k => k);
// mockTranslationService.get.and.callFake(k => of(k));

// mockTranslationService.onTranslationChange = new EventEmitter();
// mockTranslationService.onLangChange = new EventEmitter();
// mockTranslationService.onDefaultLangChange = new EventEmitter();
@Injectable()
export class TranslateServiceStub {
  public onLangChange = new EventEmitter<LangChangeEvent>()
  public onTranslationChange = new EventEmitter<any>()
  public onDefaultLangChange = new EventEmitter<any>()
  public addLangs(langs: string[]) { return }
  public sendLang() { return ["en-us"] }
  public getBrowserLang() { return "" }
  public getBrowserCultureLang() { return "" }
  public setDefaultLang() { return "en" }
  // public use(lang: string)  {return of([{}])}
  public use(lang: string) {return of({})};
  public toPromise(){return of({})}
  // tslint:disable-next-line:no-reserved-keywords
  public get(key: any): any { return of(key) }
  instant(key: string, interpolateParams?: Object): string {
    return key;
  }
}



