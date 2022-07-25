import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { GPStateService } from '../../services/g-p-state.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  isEventTabShow = true;
  isSearchResultShow = false;
  isAddTicketButtonShow = false;
  constructor(public translate: TranslateService,
    private gpStateService: GPStateService,
    private language: LanguageService,
    public router: Router,
    public apiService: ApiService) { }

  ngOnInit(): void {
    this.language.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    
    this.gpStateService.searchResults$.subscribe(s => {
      if (s?.events?.length > 0 || s?.entity?.length > 0) {
        this.isSearchResultShow = true;
      } else {
        this.isSearchResultShow = false;
        if (this.gpStateService?.formaData?.citationNumber) {
          this.isAddTicketButtonShow = true;
        }
      }
    });
  }

  appendLang(lang: string) {
    this.translate.use(lang);
  }

  toNavigate(param: boolean) {
    this.isEventTabShow = param;
  }

  goToAddTicketPage() {
    if (this.isAddTicketButtonShow) {
      this.apiService.getViolation('getDummyPlateNumber', true).subscribe(res => {
        if (res) {
          const dummyPlateNum = res.dummyPlateNumber;
          const citationNumber = this.gpStateService?.formaData?.citationNumber ?? undefined;
          this.router.navigateByUrl(`gp/search/entity-details/entity/${dummyPlateNum}/add-ticket/${citationNumber}`);
        }
      })
    }
  }
}
