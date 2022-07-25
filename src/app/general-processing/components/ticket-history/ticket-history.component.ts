import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { GlobalFormats } from '../../enums/global.formats';
import { PaginationControls } from '../../models/pagination-controls.model';
import { TicketHistoryModel } from '../../models/ticketHistory.model';
import { GPStateService } from '../../services/g-p-state.service';
import { GPService } from '../../services/g-p.service';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.scss']
})
export class TicketHistoryComponent implements OnInit {

  paginationDetails!: PaginationControls;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  displayedColumns = ['citationDate', 'transactionType', 'details', 'imageUrl', 'processDate', 'userName'];
  selection = new SelectionModel<any>(true, []);
  dataSource = new MatTableDataSource<TicketHistoryModel>();
  
  ticketHistoryList!: TicketHistoryModel[];
  alertMsg: any;
  public globalFormats = GlobalFormats;
  citation!: string;
  imgSrc:any;
  constructor(public translate: TranslateService,
    private router: Router,
    private datePipe: DatePipe,
    private language: LanguageService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private gpStateService: GPStateService,
    private gPService: GPService,
  ) { }
  
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.citation = params['citationNumber'];
      this. getTicketHistory(this.citation);
    });
    
    this.language.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }
  openDialogWithTemplateRef(templateRef: TemplateRef<any>, url: string) {
  //   this.gPService.get('Assets/getAssetsImagesbyId?CitationId=88585'+'&type=IO').subscribe(res=>{
  //     if(res) {
  //       this.imgSrc = res.url;
  //     }
  // })
    this.imgSrc = url;
    this.dialog.open(templateRef);
  }
  dialogClose() {
    this.dialog.closeAll();
  }
  
  getTicketHistory(citation:string): void {
    // const str = 'Voilation : NO PARKING ZONE      TRC7.2.55 ,Location : 000-None,Officer : 009154,Date : May  1 2022 12:00AM'
    // console.log(str.split(',').join("\n"))
    this.gPService.get(`getCitationHistory/${citation}`,false).subscribe((res:any) => {
      this.ticketHistoryList = res;
      this.dataSource = new MatTableDataSource<TicketHistoryModel>(res);
      this.dataSource.sort = this.sort;
      this.sort.disableClear = true;
      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
        return data[sortHeaderId];
      };
      this.dataSource.paginator = this.paginator;
    });
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  appendLang(lang: string) {
    this.translate.use(lang);
    this.setPagelabel(lang);
  }
  setPagelabel(lang:any) {
    const msg ="";
    this.translate.use(lang).toPromise();
    this.translate
         .use(lang)
         .subscribe(res => 
         {
           this.dataSource.paginator = this.paginator;
           this.alertMsg = this.translate.instant("Items per page", { msg: msg });
           this.dataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;
         });
  }

  onClickEventId(entityData: any) {
    this.router.navigateByUrl(`gp/search/event-details/${entityData.eventId}`)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue ? filterValue.trim().toLowerCase() : '';
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

}