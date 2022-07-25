import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ValidationService } from 'src/app/shared/validation/validation.service';

@Component({
  selector: 'app-master-payment-method',
  templateUrl: './master-payment-method.component.html',
  styleUrls: ['./master-payment-method.component.scss']
})
export class MasterPaymentMethodComponent implements OnInit , OnDestroy{

  dataSource!: MatTableDataSource<any>;
  showAddForm = false;

  displayedColumns: string[] = ['paymentModeCD', 'paymentModeDesc', 'posCode', 'action'];
  editData: any;
  searchData: any;
  tableDisplayedColumns: any[] = [
    {
      'columnName': 'paymentModeCD',
      'translateName': 'paymentModeCD',
      'elementValue': 'paymentModeCD',
      'textAlign': 'text-left',
      'actionButtons': false,
      'editButton': false,
      'deleteButton': false,
      'enableButton': false
    },
    {
      'columnName': 'paymentModeDesc',
      'translateName': 'paymentModeDesc',
      'elementValue': 'paymentModeDesc',
      'textAlign': 'text-left',
      'actionButtons': false,
      'editButton': false,
      'deleteButton': false,
      'enableButton': false
    },
    {
      'columnName': 'posCode',
      'translateName': 'posCode',
      'elementValue': 'posCode',
      'textAlign': 'text-right',
      'actionButtons': false,
      'editButton': false,
      'deleteButton': false,
      'enableButton': false
    },
    {
      'columnName': 'action',
      'translateName': 'action',
      'elementValue': 'action',
      'textAlign': 'text-center',
      'actionButtons': true,
      'editButton': true,
      'deleteButton': true,
      'deleteInfo': { 'uniqueId': 'paymentModeMasterId',
       'url': 'paymentModeMaster?paymentModeMasterId', 'CW5type': false },
      'enableButton': false
    }
  ];
  pageConfigObj: any;
  subscription: any;


  constructor(private apiService: ApiService, public translate: TranslateService,
    private language: LanguageService, private notificationService: ToastrService,
    private validationService: ValidationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.subscription = this.messageService.getMessage().subscribe(item => {
      if (item.editItem) {
        this.showAddForm = true;
      }
    });
    fetch('./assets/config/config.json').then(res => res.json())
      .then(jsonData => {
        if (jsonData) {
          this.pageConfigObj = jsonData.filter((item: any) => item.pageId === "payment-mode-master-controller")[0];
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
    this.apiService.get('paymentModeMaster').subscribe(res => {
      if (res) {
        this.dataSource = new MatTableDataSource<any>(res.reverse());
        this.filterData();
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  filterData() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.paymentModeCD?.toLowerCase().includes(filter) ||
        data.paymentModeDesc?.toLowerCase().includes(filter) ||
        data.posCode?.toString().includes(filter);
    };
  }
  addPaymentType() {
    this.showAddForm = true;
  }
  editRowOutput($event: any) {
    if($event){
      this.searchData = '';
      this.showAddForm = true;
    }
  }
  deleteRowOutput($event: any) {
    if ($event) {
      this.getList();
    }
  }
  saveFormOutput($event: any) {
    if ($event.form === "saved") {
      this.showAddForm = false;
      this.searchData = '';
      this.getList();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
  editFormOutput($event: any) {
  }
  cancelOutput($event: any) {
    if ($event.cancel === "reset"){
      this.searchData = '';
      this.showAddForm = false;
      this.getList();
    }
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  enableRowOutput(item : any){
  };
}
