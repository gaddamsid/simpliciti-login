import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forChild({
      extend : true,
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [TranslateModule],
  providers:[TranslateStore],
})
export class I18nModule {
  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'ar', 'sp', 'fr']);
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ar|sp|fr/) ? browserLang : 'en');
  }
}

export function translateLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}