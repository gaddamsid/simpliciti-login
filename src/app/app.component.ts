import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { TokenStorageService } from './shared/Components/login/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'etims-cw5';
  checkLoggedIn = false;

  constructor(private translate: TranslateService, public router: Router,private tokenStorageService: TokenStorageService) {
    this.translate.addLangs(["en", "ar", "sp", "fr"]);
    translate.setDefaultLang('en');
    // translate.use('en');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|it/) ? browserLang : 'en');
  }
  ngOnInit(): void {
    this.checkLoggedIn = !!this.tokenStorageService.getToken();
    if (!this.checkLoggedIn) {
      this.router.navigate(['/login']);
    }
  }
}
