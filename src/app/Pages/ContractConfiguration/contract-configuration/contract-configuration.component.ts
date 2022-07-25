import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';

@Component({
  selector: 'app-contract-configuration',
  templateUrl: './contract-configuration.component.html',
  styleUrls: ['./contract-configuration.component.scss']
})
export class ContractConfigurationComponent implements OnInit {

  constructor(public translate: TranslateService, private language:LanguageService) { }

  ngOnInit(): void {
     this.language.sendLang.subscribe(lang =>{
      this.appendLang(lang);
    });
 
  }
    appendLang(lang:string){
    this.translate.use(lang);
  }
}
