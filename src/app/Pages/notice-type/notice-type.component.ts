import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalFormats } from 'src/app/general-processing/enums/global.formats';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ValidationService } from 'src/app/shared/validation/validation.service';
@Component({
  selector: 'app-notice-type',
  templateUrl: './notice-type.component.html',
  styleUrls: ['./notice-type.component.scss']
})
export class NoticeTypeComponent implements OnInit, OnDestroy {
  dataSource!: MatTableDataSource<any>;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  showAddForm = false;
  displayedColumns: string[] = ['code','shortName', 'batchSize', 'encrypted','ticketMax',
   'ticketMin','dateType','cuttOffYearDay','rule','ftpSize','action'];
  //  displa= ['noticeType','noticeTypeShortName', 'batchSize', 'encrypted','noticeMAXTicketCount',
  //  'noticeMINTicketCount','noticeConditionDateType','noticeCutOffIssueDate','noticeRule','ftpSize','action'];
  editData: any;
  searchData: any;
  tableDisplayedColumns: any[] = [
    {
      'columnName': 'code',
      'translateName': 'code',
      'elementValue': 'code',
      'textAlign':'text-right',
      'actionButtons': false,
      'editButton': false,
      'deleteButton': false,
      'enableButton': false 
    }, {
      'columnName': 'shortName',
      'translateName': 'shortName',
      'elementValue': 'shortName',
      'textAlign':'text-left',
      'actionButtons': false,
      'editButton': false,
      'deleteButton': false,
      'enableButton': false 
    },
    {
      'columnName': 'batchSize',
      'translateName': 'batchSize',
      'elementValue': 'batchSize',
      'textAlign':'text-right',
      'actionButtons': false,
      'editButton': false,
      'deleteButton': false,
      'enableButton': false 
    },
    {
      'columnName': 'encrypted',
      'translateName': 'encrypted',
      'elementValue': 'encrypted',
      'textAlign':'text-left',
      'actionButtons': false,
      'editButton': false,
      'deleteButton': false,
      'enableButton': false 
    },
    {
      'columnName': 'ticketMax',
      'translateName': 'ticketMax',
      'elementValue': 'ticketMax',
      'textAlign':'text-right',
      'actionButtons': false,
      'editButton': false,
      'deleteButton': false,
      'enableButton': false 
    },    
    {
      'columnName': 'ticketMin',
      'translateName': 'ticketMin',
      'elementValue': 'ticketMin',
      'textAlign':'text-right',
      'actionButtons': false,
      'editButton': false,
      'deleteButton': false,
      'enableButton': false 
    },
    {
      'columnName': 'dateType',
      'translateName': 'dateType',
      'elementValue': 'dateType',
      'textAlign':'text-right',
      'actionButtons': false,
      'editButton': false,
      'deleteButton': false,
      'enableButton': false
    },
    {
      'columnName': 'cuttOffYearDay',
      'translateName': 'cuttOffYearDay',
      'elementValue': 'cuttOffYearDay',
      'textAlign':'text-center',
      'actionButtons': false,
      'editButton': false,
      'deleteButton': false,
      'enableButton': false, 
      'pipe': 'date' 
    },
    {
      'columnName': 'rule',
      'translateName': 'rule',
      'elementValue': 'rule',
      'textAlign':'text-left',
      'actionButtons': false,
      'editButton': false,
      'deleteButton': false,
      'enableButton': false 
    },
    
    {
      'columnName': 'ftpSize',
      'translateName': 'ftpSize',
      'elementValue': 'ftpSize',
      'textAlign':'text-left',
      'actionButtons': false,
      'editButton': false,
      'deleteButton': false,
      'enableButton': false 
    },
    {
      'columnName': 'action',
      'translateName': 'action',
      'elementValue': 'action',
      'textAlign':'text-center',
      'actionButtons': true,
      'editButton': true,
      'deleteButton': false,
      'deleteInfo': { 'uniqueId': 'noticeTypeID',
       'url': '/NoticeType/updateChangeStatusNotice', 
       'CW5type': true },
      'enableButton': true 
    }
  ];
  pageConfigObj: any;
  subscription: any;
  cancelResetForm: boolean = false;
  messageServiceStub: any;
  successMsg: any;
  public globalFormats = GlobalFormats;

  constructor(private apiService: ApiService, public translate: TranslateService,
    private language: LanguageService, private notificationService: ToastrService,
    private datePipe: DatePipe, private validationService: ValidationService, 
    private messageService: MessageService,) { }

  ngOnInit(): void {
    this.subscription = this.messageService.getMessage().subscribe(item => {
      if (item.editItem) {
        this.showAddForm = true;
      }
    });
    fetch('./assets/config/config.json').then(res => res.json())
    .then(jsonData => {
      if (jsonData) {
        this.pageConfigObj = jsonData.filter((item: any) => item.pageId === "noticeType")[0];
        console.log("jsonData", this.pageConfigObj);
      }
    });
    this.getList();
    this.language.sendLang.subscribe(lang => {
      if (lang != "") {
        this.appendLang(lang);
      }
    });
  }
  
  appendLang(lang: string) {
    this.translate.use(lang);
  }

  getList() {
    this.apiService.get('NoticeType/getNoticeTypeList', true).subscribe(res => {
      if (res) {
        for(let i = 0; i < res.length; i++){
          res[i].noticeType = res[i]['code'];
          res[i].noticeTypeShortName = res[i]['shortName'];
          res[i].noticeMAXTicketCount = res[i]['ticketMax'];
          res[i].noticeMINTicketCount = res[i]['ticketMin'];
          res[i].noticeConditionDateType = res[i]['dateType'];
          res[i].noticeCutOffIssueDate = this.datePipe.transform(res[i]['cuttOffYearDay'], 'yyyy-MM-dd');
          res[i].noticeRule = res[i]['rule'];
          res[i].noticeTypeID = res[i]['noticeTypeId'];
          res[i].noticeTypeLongName = res[i]['fullName'];
          res[i].noticeEncrypted = res[i]['encrypted'];
          res[i].ftpSite = res[i]['ftpSize'];
        }
        this.dataSource = new MatTableDataSource<any>(res.reverse());
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
        // this.sort.disableClear = true;
        this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
          if (typeof data[sortHeaderId] === 'string') {
            return data[sortHeaderId].toLocaleLowerCase();
          }
          return data[sortHeaderId];
        };
        console.log(res);
        this.filterData();
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  filterData() {
    let tempScope= this;
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      let cuttOffYearDay=  tempScope.datePipe.transform(data.cuttOffYearDay, tempScope.globalFormats.dateOnly);
        return data.code?.toString().includes(filter) ||
        data.shortName?.toLowerCase().includes(filter) ||
        data.batchSize?.toString().includes(filter) ||
        data.encrypted?.toLowerCase().includes(filter) ||
        data.ticketMax?.toString().includes(filter) ||
        data.ticketMin?.toString().includes(filter) ||
        data.dateType?.toString().includes(filter) ||
        cuttOffYearDay?.toLowerCase().includes(filter) ||
        data.rule?.toLowerCase().includes(filter) ||
        data.ftpSize?.toLowerCase().includes(filter); 
    };
  }
  addPaymentType() {
    this.showAddForm = true;
    this.searchData = '';
  }
  editRowOutput($event: any) {
    if($event)
    this.showAddForm = true;
    this.searchData = '';
  }
  deleteRowOutput($event: any) {
    if($event){
      this.getList();
    }
  }
  saveFormOutput($event: any) {
    if ($event.form === "saved") {
      this.showAddForm = false;
      this.searchData = '';
      this.getList();
      this.messageService.sendMessage({'clearSort': true});
      // this.dataSource.paginator = this.paginator;       
      // this.sort.disableClear = true;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
  editFormOutput($event: any) {
  }
  cancelOutput($event: any){
    if($event.cancel==='reset'){
      this.showAddForm = false;
      this.searchData = '';
      this.getList();
    }

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  enableRowOutput(item : any){
    this.toggleClient(item);
  };

  
  toggleClient(data: any) {
    const msgs = "";
    if (!data.active) {
      if (confirm(this.translate.instant(`Are you sure you want to Notice Type`, { msg: msgs }))) {
        const obj = {
          "noticeTypeID": data.noticeTypeId
        }

        this.apiService.put(`NoticeType/updateChangeStatusNotice`, obj, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Notice Type Enabled Successfully", { msg: msgs }));
            this.getList();
          }
        });
      }
    } else {
      if (confirm(this.translate.instant(`Are you sure you want to Disable Notice Type`, { msg: msgs }))) {
        const obj = {
          "noticeTypeID": data.noticeTypeId
        }
        this.apiService.put(`NoticeType/updateChangeStatusNotice`, obj, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Notice Type Disable Successfully", { msg: msgs }));
            this.getList();
          }
        })

      }
    }
  }

  
}
