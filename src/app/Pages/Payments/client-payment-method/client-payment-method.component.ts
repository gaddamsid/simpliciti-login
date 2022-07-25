import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ClientPaymentMethodService } from 'src/app/Services/clientPaymentMethod/client-payment-method.service';
import {Sort} from '@angular/material/sort';
import { ClientPaymentModel } from 'src/app/Models/Payments/clientPaymentMethod.Model';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'admin-client-payment-method',
  templateUrl: './client-payment-method.component.html',
  styleUrls: ['./client-payment-method.component.scss']
})
export class ClientPaymentMethodComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  paymentDetails!:any;
  paymentMethods!:any;
  data:any;
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  datasource!: MatTableDataSource<ClientPaymentModel>;
  successMsg!: string;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['paymentModeCD', 'paymentModeDesc','paymentOpenDrawer', 'action'];
  alertMsg: string="";
  welcome: any;

  constructor(public translate: TranslateService,
    private language:LanguageService,
    private paymentService: ClientPaymentMethodService,
    private _liveAnnouncer: LiveAnnouncer,
    private formBuilder: FormBuilder,
    private notificationService : ToastrService
   ) {
  }
  paymentForm: FormGroup = this.formBuilder.group({
    PAYMENTMODECD: [, { validators: [Validators.required] }],
    paymentModeDesc: [, { validators: [Validators.required] }],
    paymentOpenDrawer: [, { validators: [Validators.required] }],
   
  });

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  ngOnInit(){
   
    this.getClientPaymentDetails();
    this.language.sendLang.subscribe(lang =>{
     if(lang != ""){
      this.appendLang(lang);
     }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  filterData() {
    this.datasource.filterPredicate = function (data, filter: string): boolean {
      return data.paymentModeCD.toLowerCase().includes(filter) || data.paymentModeDesc.toLowerCase().includes(filter) || data.paymentOpenDrawer.toLowerCase().includes(filter);

    };

  }

  addPayment() {
    this.paymentForm.reset();
    this.showEditForm =false;
   this.paymentService.getPaymentMehtod().subscribe((res) => {
    this.paymentMethods = res; 

  })
   this.paymentForm.controls['paymentOpenDrawer'].setValue('Y');
    this.showAddForm = true;
  }
  cancelAdding() {
    this.showAddForm = false;
    this.showEditForm = false;
    this.alertMsg = "";
    this.successMsg = "";
    this.notificationService.info(this.translate.instant("Process Cancelled"));
    this.paymentForm.reset();
    this.getClientPaymentDetails();
  }
  getClientPaymentDetails() {
    this.paymentService.getPaymentDetails().subscribe((res) => {
      this.paymentDetails = res;
      this.datasource = new MatTableDataSource<ClientPaymentModel>(this.paymentDetails.reverse());
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
      this.filterData();


    })
  }

  appendLang(lang:string){
    this.translate.use(lang);
    this.setPagelabel(lang);
  }

  setPagelabel(lang: any) {
    this.translate.use(lang).subscribe((res: any) => {
      this.datasource.paginator = this.paginator;
      const alertMsg = this.translate.instant("Items per page", { msg: '' });
      this.datasource.paginator._intl.itemsPerPageLabel = alertMsg;
    });
  }
  submitForm() {
     if(this.paymentForm.valid)
     {
      const paymentModeCD = this.paymentMethods.filter((element: { paymentModeMasterId: any; }) => {
        return element.paymentModeMasterId === this.paymentForm.value.PAYMENTMODECD;
      });
      const inputData=
        {
           "paymentModeMasterID":this.paymentForm.value.PAYMENTMODECD,   // call as a paymentModeMasterId
           "paymentModeDesc":this.paymentForm.value.paymentModeDesc,   
           "paymentModeCD":paymentModeCD[0].paymentModeCD,   
           "paymentModeNCR":2,   
           "paymentOpenDrawer":this.paymentForm.value.paymentOpenDrawer,   
           "active":1   
       }
       

        this.paymentService.createPayment(inputData).subscribe(res =>{
          if(res.status == "Success") {
            const msg = '';
            const code = res.details[0].code;
            this.successMsg = this.translate.instant('Record Added Successfully', {
              msg: msg,
            });
            this.notificationService.success(this.successMsg);
            this.getClientPaymentDetails();
             this.showAddForm = false;
             this.showEditForm =false;
            this.paymentForm.reset();
         }
       },
       error => {
         console.log(error);
         for (var i = 0; i < error.error.details.length; i++) {
           if( error.error.details[i].code =="5000" && error.error.details[i].message != "DuplicateKey")
           {
             const msg = "";
             let translateCode=error.error.details[i].code +"_"+ error.error.details[i].fieldName;
             this.welcome = this.translate.instant( translateCode, { msg: msg });
             this.paymentForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
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
       })
          
    }
    
  }

  paymentMethodSelected(event: any) {
    console.log(event.value) // Shows proper selection!
    
      const result = this.paymentMethods.filter((element: { paymentModeMasterId: any; }) => {
      return element.paymentModeMasterId === event.value;
    });
    
    // This is how I am trying to set the value
   this.paymentForm.controls['paymentModeDesc'].setValue(result[0].paymentModeDesc);
  }
  editdata:any;
  
  editPayment(data:any){
    this.editdata=[];
   this.editdata =data;
    this.paymentForm.reset();  
    this.paymentService.getPaymentMehtod().subscribe((res) => {
     this.paymentMethods = res; 
     this.showEditForm = true;
     this.showAddForm = true
        this.paymentForm.controls['PAYMENTMODECD'].setValue(data.paymentModeMasterId);
        this.paymentForm.controls['paymentModeDesc'].setValue(data.paymentModeDesc);
        this.paymentForm.controls['paymentOpenDrawer'].setValue(data.paymentOpenDrawer);
       
   })
  
  }
  savePayment()
  {
  
    if(this.paymentForm.valid)
    {
     const paymentModeCD = this.paymentMethods.filter((element: { paymentModeMasterId: any; }) => {
       return element.paymentModeMasterId === this.paymentForm.value.PAYMENTMODECD;
     });
     const inputData=      
      {
        "paymentModeID":this.editdata?.paymentModeId,  
        "paymentModeMasterID":this.editdata?.paymentModeMasterId  ,
        "paymentModeDesc":this.editdata?.paymentModeDesc  ,
        "paymentModeCD":this.editdata?.paymentModeCD,
        "paymentOpenDrawer":this.paymentForm.value.paymentOpenDrawer,
        "active":1
     }

       this.paymentService.updatePayment(inputData).subscribe(res =>{
         if(res.status == "Success") {
          const msg = '';
          this.welcome = this.translate.instant("Record Updated Successfully", {
            msg: msg,
          });
          this.notificationService.success(this.welcome);

           this.getClientPaymentDetails();
            this.showAddForm = false;
            this.showEditForm =false;
           this.paymentForm.reset();
        }
      },
        error => {
          if(error.error.details != null) {
            console.log(error);
        for (var i = 0; i < error.error.details.length; i++) {
          if( error.error.details[i].code =="5000" && error.error.details[i].message != "DuplicateKey")
          {
            const msg = "";
            let translateCode=error.error.details[i].code +"_"+ error.error.details[i].fieldName;
            this.welcome = this.translate.instant( translateCode, { msg: msg });
            this.paymentForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
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
          }else {
             const msg = "";
            this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
          }
        
      })
         
   }
  }
  deletePayment(data:any)
  {
    const msgs = "";
    if(confirm(this.translate.instant("Are you sure to delete", { msg: msgs }))) {
     const paymentModeId=data.paymentModeId; 
       this.paymentService.deletePayment(paymentModeId).subscribe(res =>{
         if(res.status == "Success") {
          const msg = '';
          const errcodes = res.details[0].code;
          this.successMsg = this.translate.instant('Record Deleted Successfully', { msg: msg });
          this.notificationService.success(this.successMsg);

           this.getClientPaymentDetails();
            this.showAddForm = false;
            this.showEditForm =false;
           this.paymentForm.reset();
        }
      },
        error => {
        console.log(error);
        for (var i = 0; i < error.error.details.length; i++) {
          if( error.error.details[i].code =="5000" && error.error.details[i].message != "DuplicateKey")
          {
            const msg = "";
          let translateCode=error.error.details[i].code +"_"+ error.error.details[i].fieldName;
            this.welcome = this.translate.instant( translateCode, { msg: msg });
            this.paymentForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
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
      })
         
      }
  }
}
