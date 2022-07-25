import { Component, OnInit, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GPService } from 'src/app/general-processing/services/g-p.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-plate-history',
  templateUrl: './plate-history.component.html',
  styleUrls: ['./plate-history.component.scss'],
})
export class PlateHistoryComponent implements OnInit {
  @Input() customerInformation: any;
  @Input() registryInformation: any;

  @Output() hidePlatehistory = new EventEmitter<any>();
  isLoading: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private gpService: GPService, public translate: TranslateService, private language: LanguageService) { }

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
  translateLang(lang: string) {
    this.translate.use(lang);
  }

  getPlateHistory(id: any) {
    this.gpService.get('getPlateHistory/' + id).subscribe(res => {
      this.isLoading = false;
      this.customerInformation = res.customerInformation;
      this.registryInformation = res.registryInformation;
    }, err => { this.isLoading = false; },
      () => { this.isLoading = false; })
  }

  cancelplateHistory() {
    this.hidePlatehistory.emit(true);
  }

}
