import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ToastrService } from 'ngx-toastr';
import { GlobalFormats } from 'src/app/general-processing/enums/global.formats';
import { ApiService } from '../../services/api.service';
import { MessageService } from '../../services/message.service';
import { ValidationService } from '../../validation/validation.service';
import { LanguageService } from '../header/languages.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Output() editRowOutput = new EventEmitter<string>();
  @Output() enableRowOutput = new EventEmitter<string>();
  @Output() deleteRowOutput = new EventEmitter<string>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // @Input()
  // dataSource!: MatTableDataSource<any>;

  _dataSource!: MatTableDataSource<any>;
  @Input() set dataSource(value: MatTableDataSource<any>) {
    if (value) {
      this._dataSource = value;
      this._dataSource.sort = this.sort;
      this._dataSource.paginator = this.paginator;
    }
  }
  get dataSource(): MatTableDataSource<any> {
    return this._dataSource;
  }
  public globalFormats = GlobalFormats;

  @Input()
  confiData!: any[];

  @Input()
  displayedColumns!: string[];

  constructor(public translate: TranslateService, private apiService: ApiService, private _liveAnnouncer : LiveAnnouncer,
    private language: LanguageService, private notificationService: ToastrService,
    private messageService: MessageService, private validationService: ValidationService) { }

  ngOnInit(): void {

    // this.filterData();
    this.language.sendLang.subscribe(lang => {
      if (lang != "") {
        this.appendLang(lang);
      }
    });

    this.messageService.getMessage().subscribe(res=>{
      if(res.clearSort){
        this.sort.sort(
          { id: '', start: 'asc', disableClear: false }
        )
      }
    })
  }

  appendLang(lang: string) {
    this.translate.use(lang);
    this.setPagelabel(lang);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  setPagelabel(lang: any) {
    const msg = "";
    this.translate.use(lang).toPromise();
    this.translate
      .use(lang)
      .subscribe(res => {
        if(this._dataSource){
          this._dataSource.paginator = this.paginator;
           const alertMsg = this.translate.instant("Items per page", { msg: msg });
           this._dataSource.paginator._intl.itemsPerPageLabel = alertMsg;
        }
      });
  }
  editRow(item: any) {
    this.editRowOutput.emit(item);
    const obj = { 'row': item, 'editItem': true };
    this.messageService.sendMessage(obj);
  }
  deleteRow(item: any) {
    // this.deleteRowOutput.emit(item);
    const uniqueIdObj = this.confiData.filter(item => item.deleteButton)[0];
    const msgs = "";
    const url = ((uniqueIdObj.deleteInfo['url'].toString().indexOf("?") !== -1) ? uniqueIdObj.deleteInfo['url'] + "=" : uniqueIdObj.deleteInfo['url'] + '/')
    const idName: string = uniqueIdObj.deleteInfo['uniqueId'];
    if (confirm(this.translate.instant("Are you sure to delete", { msg: msgs }))) {
      this.apiService.arDelete(url, item[idName],
        uniqueIdObj.deleteInfo['CW5type']).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            const successMsg = this.translate.instant("DELETE_RECORD", { msg: msg });
            this.notificationService.success(successMsg);
            this.deleteRowOutput.emit(item);
          }
        }, error => {
          console.log(error);
          this.errorResponseCheck(error);
        })
    }
  }
  rowCheck(item: any) {
    return (item === 'Edit' ? true : false);
  }
  enableItem(item: any) {
    this.enableRowOutput.emit(item);
  }

  errorResponseCheck(error: any) {
    for (var i = 0; i < error.error.details.length; i++) {
      if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }

}
