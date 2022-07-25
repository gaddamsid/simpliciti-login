import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { Breadcrumb } from '../../models/breadcrumb.model';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})

export class BreadCrumbComponent implements OnInit {

  breadcrumbs!: Breadcrumb[];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private language: LanguageService,
    public translate: TranslateService,) {
    breadcrumbService.breadcrumbChanged.subscribe((crumbs: Breadcrumb[]) => {
      this.onBreadcrumbChange(crumbs);
    });
  }

  ngOnInit(): void {
    this.language.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
  }

  appendLang(lang: string) {
    this.translate.use(lang);
  }

  onBreadcrumbChange(crumbs: Breadcrumb[]) {
    this.breadcrumbs = crumbs;
  }

}
