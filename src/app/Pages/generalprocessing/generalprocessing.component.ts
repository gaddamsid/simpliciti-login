import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';

@Component({
  selector: 'app-generalprocessing',
  templateUrl: './generalprocessing.component.html',
  styleUrls: ['./generalprocessing.component.scss']
})
export class GeneralprocessingComponent {

  constructor(public translate: TranslateService, private language:LanguageService) { }

  ngOnInit(){
    // console.log(this.translate);
    this.language.sendLang.subscribe(lang =>{
     if(lang != ""){
      this.appendLang(lang);
     }
    });
  }

  appendLang(lang:string){
    this.translate.use(lang);
  }
}
