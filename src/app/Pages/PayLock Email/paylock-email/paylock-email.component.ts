import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { MatSort } from '@angular/material/sort';
import {Sort} from '@angular/material/sort';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {PaylockEmail} from '../../../Models/paylock-email';
import {PaylockEmailService} from '../../../Services/PayLockEmail/paylock-email.service';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-paylock-email',
  templateUrl: './paylock-email.component.html',
  styleUrls: ['./paylock-email.component.scss']
})
export class PaylockEmailComponent implements OnInit {
  // addPaylock(user: User) {
  //   throw new Error('Method not implemented.');
  // }
  alertMsg: any;
  showpaylockForm:boolean = false;
  paylockEmailForm!:FormGroup;
  welcome: any;
  editData: any;
  addPaylockButton:boolean = true;
  successMsg: any;

  constructor(public translate: TranslateService,
    private language:LanguageService, private notificationService : ToastrService
    ,private paylockemailService:PaylockEmailService) { }

  displayedColumns: string[] = ['sNo', 'emailId','Action'];
  dataSource = new MatTableDataSource<PaylockEmail>();
  @ViewChild('searchField') searchString!:ElementRef;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.language.sendLang.subscribe(lang =>{
      if(lang != ""){
       this.appendLang(lang);
      }
     });
     this.paylockEmailForm = new FormGroup({
      'sNo':new FormControl("",[Validators.required]),
      'emailID':new FormControl("",
      [Validators.required,
      Validators.email,
      Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
      Validators.maxLength(56)]),

    });

     this.getpaylockemailList();
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
          // debugger
           this.dataSource.paginator = this.paginator;
           this.alertMsg = this.translate.instant("Items per page", { msg: msg });
           if(this.dataSource.paginator!=undefined)
           {this.dataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;}
         });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }


  getpaylockemailList() {
      this.paylockemailService.getpaylockList().subscribe(res => {
        this.dataSource = new MatTableDataSource<PaylockEmail>(res.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filterData();
      })
  }

  addpaylockEmail() {
    this.showpaylockForm = true;
    this.addPaylockButton = true;
    this.paylockemailService.getserialNumber().subscribe(res =>{
      console.log(res);
      this.paylockEmailForm.controls["sNo"].setValue(res);
    })
  }

  cancelPaylock() {
    this.showpaylockForm = false;
    this.paylockEmailForm.reset();
    this.searchString.nativeElement.value = "";
    this.getpaylockemailList();
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }

  savepaylockEmail(data:any) {
    if(this.paylockEmailForm.valid) {
        const obj = {
          "sNo": data.sNo,
          "emailId": data.emailID
        }

        this.paylockemailService.addPaylock(obj).subscribe(res => {
          if(res.status == "Success") {
            const msg = "";
            console.log(res.details[0].code)
            this.welcome = this.translate.instant("Record Added Successfully", { msg: msg });
            this.notificationService.success(this.welcome);
            this.paylockEmailForm.reset();
            this.searchString.nativeElement.value = "";
            if(this.paginator){
              this.paginator.pageIndex = 0;
            }
            this.getpaylockemailList();
            this.showpaylockForm = false;
            }
        }, error => {
          console.log(error);
          this.errorResponseCheck(error)
        })
    }
  }

  filterData() {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.sNo.toString() === filter || data.emailId.toLocaleLowerCase().includes(filter);
    };
  }


  editpaylockEmail(data:any) {
    this.editData=data;
    console.log(data);
    this.addPaylockButton =false;
    this.showpaylockForm = true;
    this.paylockEmailForm.controls["sNo"].setValue(data.sNo);
    this.paylockEmailForm.controls["emailID"].setValue(data.emailId);
  }

  deletepaylockEmail(data:any) {
        const msgs = "";
        if(confirm(this.translate.instant("Are you sure to delete", { msg: msgs }))) {
          this.paylockemailService.deletePaylockEmail(data.paylockEmailconfigId).subscribe(res =>{
             if(res.status == "Success") {
               const msg = "";
               const errcodes=res.details[0].code;
               this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
               this.notificationService.success(this.successMsg);
               this.getpaylockemailList();
            }
          },error => {
            console.log(error);
            this.errorResponseCheck(error)
          })
        }
  }

  updatePaylockEmail(data:any) {
    if(this.paylockEmailForm.valid) {
      const obj = {
        "sNo": data.sNo,
        "emailId": data.emailID
      }
      this.paylockemailService.updatePaylockEmail(this.editData.paylockEmailconfigId,obj).subscribe(res =>{
        if(res.status == "Success") {
          const msg = "";
          console.log(res.details[0].code)
          this.welcome = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.welcome);
          this.paylockEmailForm.reset();
          this.getpaylockemailList();
          this.showpaylockForm = false;
          }
      }, error => {
        console.log(error);
       this.errorResponseCheck(error)
      })
    }
  }
  errorResponseCheck(error: any) {
    for (var i = 0; i < error.error.details.length; i++) {
      if( error.error.details[i].code =="5000" && error.error.details[i].message != "DuplicateKey")
      {
        const msg = "";
        this.notificationService.error("Duplicate Record Found");
      }
      else if(error.error.details[i].message == "DuplicateKey" && error.error.details[i].code =="5000")
      {
        const msg = "";
         this.notificationService.error(this.translate.instant( error.error.details[i].fieldName+"_"+error.error.details[i].message, { msg: msg }) )
      }
      else
      {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }
}
