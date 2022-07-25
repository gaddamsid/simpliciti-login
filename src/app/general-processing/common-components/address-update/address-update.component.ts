import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataService } from 'src/app/shared/services/data.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-address-update',
  templateUrl: './address-update.component.html',
  styleUrls: ['./address-update.component.scss']
})
export class AddressUpdateComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  // showAddForm = false;

  // displayedColumns: string[] = ['paymentModeCD', 'paymentModeDesc', 'posCode', 'action'];
  editData: any;
  searchData: any;
  pageConfigObj: any;
  subscription: any;
  defaultDropdwonValue: any = [];
  ticketNumber: any;
  plateNoDlNo: any;
  ticketDetailsFlag: any = null;
  displayAddressFlag: boolean = false;
  plateNumber: any;


  constructor(private apiService: ApiService, public translate: TranslateService, private router: Router,
    private language: LanguageService, private notificationService: ToastrService, private route: ActivatedRoute,
    private validationService: ValidationService, private messageService: MessageService, private dataService: DataService) { }

  ngOnInit(): void {
    // this.messageService.sendMessage(obj);
    // const ticketNumber = "F144483718";
    // console.log("--->",this.dataService.sharedArray.ticketList);
    // this.subscription = this.messageService.getMessage().subscribe(item => {
    //   console.log("--->",item);
    //   if (item.ticketList) {
    //     // this.editMode = true;
    //     // this.setFormValues(item.column);
    //   }
    // });
    if (this.dataService.sharedArray && this.dataService.sharedArray.ticketList) {
      this.ticketDetailsFlag = false;
      this.plateNoDlNo = this.dataService.sharedArray.plateNoDlNo;
      const ticketList = this.dataService.sharedArray.ticketList.map((ele: any) => ele.citationNo);
      this.defaultDropdwonValue['ticketList'] = ticketList;
      this.dataService.sharedArray = [];
    } else {
      //ToDo:  have to work on it
      this.ticketDetailsFlag = true;
    }
    // This needs to intgrate with APIs
    this.defaultDropdwonValue['rentalIndicatior'] = [{ rentalIndicatior: 1 }];
    // { rentalIndicatior: [{rentalIndicatior : 1}] }];
    this.route.params.subscribe(params => {
      this.ticketNumber = params['citationNumber'];
      this.plateNumber = params['plateNumber'];
      if (this.ticketNumber) {
        this.getAddressInfo();
        if (this.ticketDetailsFlag)
          this.defaultDropdwonValue['ticketList'] = [this.ticketNumber];
      }
    });
    // this.subscription = this.messageService.getMessage().subscribe(item => {
    //   if (item.editItem) {
    //     this.showAddForm = true;
    //   }
    // });
    fetch('./assets/config/config.json').then(res => res.json())
      .then(jsonData => {
        if (jsonData) {
          this.pageConfigObj = jsonData.filter((item: any) => item.pageId === "ticketAddressInformRes")[0];
          console.log("jsonData", this.pageConfigObj);
        }
      });
    // this.getList();
    this.language.sendLang.subscribe(lang => {
      if (lang != "") {
        this.appendLang(lang);
      }
    });
  }

  private getAddressInfo() {
    this.apiService.getViolation("addressInformation/" + this.ticketNumber, true).subscribe(item => {
      console.log("item=====>", item);
      this.displayAddressFlag = true;
      let mergedObject;
      if (item.customerAccountInformRes && item.ticketAddressInformRes) {
        Object.keys(item.customerAccountInformRes.addresInformationResposne).forEach(function (key) {
          var newkey = "customerAcc" + key;
          item.customerAccountInformRes.addresInformationResposne[newkey] = item.customerAccountInformRes.addresInformationResposne[key];
          delete item.customerAccountInformRes.addresInformationResposne[key];
        });
        mergedObject = {
          ...item.customerAccountInformRes.addresInformationResposne,
          ...item.customerAccountInformRes, ...item.ticketAddressInformRes,
          ...item.ticketAddressInformRes.addresInformationResposne,
          ...{ ticketList: this.defaultDropdwonValue['ticketList'] }
        };
      } else if (item.customerAccountInformRes && _.isNull(item.ticketAddressInformRes)) {
        Object.keys(item.customerAccountInformRes.addresInformationResposne).forEach(function (key) {
          var newkey = "customerAcc" + key;
          item.customerAccountInformRes.addresInformationResposne[newkey] = item.customerAccountInformRes.addresInformationResposne[key];
          delete item.customerAccountInformRes.addresInformationResposne[key];
        });
        mergedObject = {
          ...item.customerAccountInformRes.addresInformationResposne,
          ...item.customerAccountInformRes,
          ...{ ticketList: this.defaultDropdwonValue['ticketList'] }
        };
      } else if (_.isNull(item.customerAccountInformRes) && item.ticketAddressInformRes) {
        mergedObject = {
          ...item.ticketAddressInformRes,
          ...item.ticketAddressInformRes.addresInformationResposne,
          ...{ ticketList: this.defaultDropdwonValue['ticketList'] }
        }
      } else {
        mergedObject = {
          ...{ ticketList: this.defaultDropdwonValue['ticketList'] }
        };
      }
      const obj = { 'column': mergedObject, 'editItem': true };
      this.messageService.sendMessage(obj);
      this.dataService.sharedObject = obj;
    });
  }

  appendLang(lang: string) {
    this.translate.use(lang);
  }

  // getList() {
  //   this.apiService.get('paymentModeMaster').subscribe(res => {
  //     if (res) {
  //       this.dataSource = new MatTableDataSource<any>(res.reverse());
  //       this.filterData();
  //     }
  //   });
  // }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  // filterData() {
  //   this.dataSource.filterPredicate = function (data, filter: string): boolean {
  //     return data.paymentModeCD?.toLowerCase().includes(filter) ||
  //       data.paymentModeDesc?.toLowerCase().includes(filter) ||
  //       data.posCode?.toString().includes(filter);
  //   };
  // }
  // addPaymentType() {
  //   this.showAddForm = true;
  // }
  // editRowOutput($event: any) {
  //   if($event){
  //     this.searchData = '';
  //     this.showAddForm = true;
  //   }
  // }
  // deleteRowOutput($event: any) {
  //   if ($event) {
  //     this.getList();
  //   }
  // }
  saveFormOutput($event: any) {
    if ($event.form === "saved") {
      this.redirectBack();
    }
  }
  private redirectBack() {
    let url;
    if (this.plateNoDlNo) {
      url = 'gp/search/entity-details/entity/' + this.plateNoDlNo;
    } else {
      url = 'gp/search/entity-details/entity/' + this.plateNoDlNo + '/citation/' + this.ticketNumber + '/ticket-details';
    }
    this.router.navigate([url]);
  }

  editFormOutput($event: any) {
  }
  cancelOutput($event: any) {
    if ($event.cancel === 'reset') {
      // this.searchData = '';
      // this.showAddForm = false;
      // this.getList();
      // this.router.navigate
      // const url = 'gp/search/ticket-details/'+this.ticketNumber;
      // this.router.navigate([url]);
      this.redirectBack();
    }
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  enableRowOutput(item: any) {
  };
}
