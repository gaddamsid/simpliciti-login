import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { Component, OnInit, LOCALE_ID, Inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs';
import { GlobalFormats } from 'src/app/general-processing/enums/global.formats';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { NoticeDetails } from '../../models/noticeDetails.interface';
import { NoticeService } from '../../services/notice.service';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash';
@Component({
  selector: 'app-notice-details',
  templateUrl: './notice-details.component.html',
  styleUrls: ['./notice-details.component.scss'],
})
export class NoticeDetailsComponent implements OnInit {
  public shouldShow = true;
  dataSource = new MatTableDataSource<any>();
  noticeDetails!: any;
  displayedColumns: any;
  selection = new SelectionModel<NoticeDetails>(true, []);
  loader: boolean = false;
  noticeId: any;
  hideNotice = false;
  public globalFormats = GlobalFormats;
  status: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  clickEvent() {
    this.status = !this.status;
  }
_ = _
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: NoticeService,
    private translate: TranslateService,
    private language: LanguageService,
    @Inject(LOCALE_ID) private locale: string
  ) {}
  ngOnInit(): void {
    // hide this page if notice citation details clicked
    let activatedRoute = this.route.snapshot;
    while (activatedRoute?.firstChild) {
      activatedRoute = activatedRoute?.firstChild;
    }
    if (activatedRoute?.data['hideNotice']) {
      this.hideNotice = activatedRoute?.data['hideNotice'];
    }
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route.snapshot),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .subscribe((route: ActivatedRouteSnapshot) => {
        this.hideNotice = route.data && route.data['hideNotice'];
      });

    this.noticeId = this.route.snapshot.params['noticeId'];
    this.displayedColumns = [
      'select',
      'ticketNo',
      'issuedDate',
      'issuedTime',
      'Make',
      'Violation',
      'Location',
      'amountDue',
    ];
    this.getList();
  }

  getList(){
    this.loader = true;
    this.service.getNoticeDetails(this.noticeId).subscribe((res: any) => {
      this.noticeDetails = res;
      this.dataSource.data = res.noticeTicketList;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      this.loader = false;
    }, (err : any) => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loader = false;
    });
  }

  nextPage(){
    this.noticeId = parseInt(this.noticeId) + 1;
    this.router.navigate([`/notice/search/details/${this.noticeId}`]);
    this.getList();
  }

  previousPage(){
    this.noticeId = parseInt(this.noticeId) - 1;
    this.router.navigate([`/notice/search/details/${this.noticeId}`]);
    this.getList();
  }

  navigateToCitation(citationId: string, citationNumber: string) {
    this.router.navigate(
      [`notice/details/${this.noticeId}/citation-details/${citationId}`],
      { state: { citationNumber: citationNumber } }
    );
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  appendLang(lang: string) {
    this.translate.use(lang);
    this.setPagelabel(lang);
  }
  setPagelabel(lang: any) {
    this.translate.use(lang).subscribe((res: any) => {
      this.dataSource.paginator = this.paginator;
      const alertMsg = this.translate.instant('Items per page');
      this.dataSource.paginator._intl.itemsPerPageLabel = alertMsg;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue
      ? filterValue.trim().toLowerCase()
      : '';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  back() {
    this.router.navigate([`/notice/search`]);
  }

  onlyDateFormat(date: any) {
    return formatDate(date, 'MMM d, y', this.locale);
  }

  onlyTime(date: any) {
    return formatDate(date, 'h:mm a', this.locale);
  }
}
