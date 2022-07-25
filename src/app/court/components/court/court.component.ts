import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';

@Component({
  selector: 'app-court',
  templateUrl: './court.component.html',
  styleUrls: ['./court.component.scss']
})
export class CourtComponent implements OnInit {

  constructor(private router : Router, 
    private translate: TranslateService, private language: LanguageService) { }

  ngOnInit(): void {
    this.language.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
  }
  
  createSchedule()
  {
      this.router.navigateByUrl('court/schedule/createSchedule');

  }
  appendLang(lang: string) {
    this.translate.use(lang);
    this.setPagelabel(lang);
  }
  setPagelabel(lang: any) {
    this.translate.use(lang).subscribe((res: any) => {
      // this.dataSource.paginator = this.paginator;
      const alertMsg = this.translate.instant("Items per page", { msg: '' });
      // this.dataSource.paginator._intl.itemsPerPageLabel = alertMsg;
    });
  }

}
