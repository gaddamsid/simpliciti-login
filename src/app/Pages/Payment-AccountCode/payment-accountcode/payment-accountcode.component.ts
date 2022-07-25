import { Component, ElementRef, OnInit ,ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import {AccountCodeService} from '../../../Services/AccountCode/account-code.service';
import {AccountCode} from '../../../Models/account-code';
import { MatSort } from '@angular/material/sort';
import {Sort} from '@angular/material/sort';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-payment-accountcode',
  templateUrl: './payment-accountcode.component.html',
  styleUrls: ['./payment-accountcode.component.scss']
})
export class PaymentAccountcodeComponent implements OnInit {
  displayedColumns: string[] = ['intAccountNumber', 'extAccountNumber', 'accountFullName','accountShortName', 'action'];
  dataSource = new MatTableDataSource<AccountCode>();
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!:ElementRef;
  alertMsg: any;
  showaccountCode:boolean = false;
  addCodeButton:boolean = true;
  accountCodeForm!:FormGroup;
  welcome: any;
  editData: any;
  successMsg: any;

   constructor(public translate: TranslateService, private language:LanguageService,private accountcodeservice :AccountCodeService, private notificationService : ToastrService,) { }

  ngOnInit() {
    this.language.sendLang.subscribe(lang =>{
      if(lang != ""){
       this.appendLang(lang);
      }
     });

     this.accountCodeForm = new FormGroup({
      'intaccountnumber':new FormControl("",[Validators.required,Validators.maxLength(2)]),
      'extaccountnumber':new FormControl("",[Validators.required,Validators.maxLength(5)]),
      'accountFullName':new FormControl("", [Validators.required,Validators.maxLength(20)]),
      'accountShortName':new FormControl("", [Validators.required,Validators.maxLength(5)]),
    });
     this.getAccountcodeList();
  }

  appendLang(lang:string){
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  filterData() {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.intAccountNumber.toString() === filter  || data.extAccountNumber.toString() === filter  ||data.accountFullName.toLocaleLowerCase().includes(filter)||data.accountShortName.toLocaleLowerCase().includes(filter) ;
    };
  }

  getAccountcodeList() {
    this.accountcodeservice.getaccountCodelist().subscribe(res => {
      this.dataSource = new MatTableDataSource<AccountCode>(res.reverse());
      this.dataSource.sort = this.sort;
      this.sort.disableClear = true;
      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
        return data[sortHeaderId];
      };
     
      this.dataSource.paginator = this.paginator;
      this.filterData();
    })
  }

  addaccountCode() {
    this.showaccountCode = true;
    this.addCodeButton = true;
    this.accountcodeservice.getintAccounNumber().subscribe(res => {
      this.accountCodeForm.controls["intaccountnumber"].setValue(res);
    })
  }


  cancelAccount() {
    this.showaccountCode = false;
    this.accountCodeForm.reset();
    this.getAccountcodeList();
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }

  addAccountCodetype(data:any) {
    this.sort.sort(               //To Disable the applied sorting so that the inserted record will appear at top
      {id:'',start:'asc',disableClear : false}
    )
    if(this.accountCodeForm.valid) {
    const obj =  {
        "accountFullName": data.accountFullName,
        "accountShortName": data.accountShortName,
        "extAccountNumber": data.extaccountnumber,
        "intAccountNumber": data.intaccountnumber
      }

      this.accountcodeservice.addaccountCode(obj).subscribe(res=>{
        if(res.status == "Success") {
          const msg = "";
          this.welcome = this.translate.instant("Record Added Successfully", { msg: msg });
          this.notificationService.success(this.welcome);
          this.accountCodeForm.reset();
          this.searchString.nativeElement.value = "";
          this.paginator.pageIndex = 0;
          this.getAccountcodeList();
          this.showaccountCode = false;
          }
      }, error => {
        this.errorResponseCheck(error);
      })
      
    }
  }

  editCode(rowData:any) {
    console.log(rowData);
    this.editData = rowData;
    this.addCodeButton = false;
    this.showaccountCode = true;
    this.accountCodeForm.controls["intaccountnumber"].setValue(rowData.intAccountNumber);
    this.accountCodeForm.controls["extaccountnumber"].setValue(rowData.extAccountNumber);
    this.accountCodeForm.controls["accountFullName"].setValue(rowData.accountFullName);
    this.accountCodeForm.controls["accountShortName"].setValue(rowData.accountShortName);
  }

  deleteCode(data:any) {
    const msgs = "";
    if(confirm(this.translate.instant("Are you sure to delete", { msg: msgs }))) {
       this.accountcodeservice.deleteaccountCode(data.accountTypesId).subscribe(res =>{
         if(res.status == "Success") {
           const msg = "";
           const errcodes=res.details[0].code;
           this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
           this.notificationService.success(this.successMsg);
           
           this.getAccountcodeList();
            this.showaccountCode = false;
           this.accountCodeForm.reset();
        }
      },error => {
        this.errorResponseCheck(error);
      })
  }
}


 updateAccountCodetype(data:any) {
   console.log(data)
  if(this.accountCodeForm.valid) {
    const obj =  {
      "accountFullName": data.accountFullName,
      "accountShortName": data.accountShortName,
      "accountTypesID": this.editData.accountTypesId,
      "extAccountNumber": data.extaccountnumber,
      "intAccountNumber": data.intaccountnumber
    }
    this.accountcodeservice.UpdateaccountCode(obj).subscribe(res=>{
      if(res.status == "Success") {
        const msg = "";
        this.welcome = this.translate.instant("Record Updated Successfully", { msg: msg });
        this.notificationService.success(this.welcome);
        this.accountCodeForm.reset();
        this.searchString.nativeElement.value = ""
        this.getAccountcodeList();
        this.showaccountCode = false;
        }
    }, error => {
      this.errorResponseCheck(error);
    })
    
  }

  }

  // ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//
  errorResponseCheck(error: any) {
    for (var i = 0; i < error.error.details.length; i++) {
      if( error.error.details[i].code =="5000" && error.error.details[i].message != "DuplicateKey")
      {
        const msg = "";
        this.notificationService.error(this.translate.instant( "Duplicate Record Found.", { msg: msg }) )
      }
      else if(error.error.details[i].message == "DuplicateKey" && error.error.details[i].code =="5000")
        {
          const msg = "";
          this.notificationService.error("Duplicate Record Found");
          this.welcome = this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg });
          this.accountCodeForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
        }
      else
      {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }

 }









