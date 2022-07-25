import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { CitationTicketTypeService } from 'src/app/Services/citationTicketType/citation-ticket-type.service';
import {CitationTicketType} from '../../../Models/citation-ticket-type';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {Sort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormBuilder, FormGroup, FormControl, Validators,AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-citation-ticket-type',
  templateUrl: './citation-ticket-type.component.html',
  styleUrls: ['./citation-ticket-type.component.scss']
})
export class CitationTicketTypeComponent implements OnInit {
 displayedColumns: string[] = ['ticketTypeCode', 'ticketDescText','Action'];

  dataSource = new MatTableDataSource<CitationTicketType>();
  data: any;

@ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
@ViewChild('searchField') searchString!:ElementRef;
  showAddForm :boolean = false;
  ticketForm! : FormGroup;
  successMsg! : string;
  alertMsg: any;
  welcome: any;
  addTicketButton : boolean = true;
  editData: any;
  showEditForm : boolean = false;
  descriptionError: string="";
  
  

  //paginator!: MatPaginator;
  constructor(public translate: TranslateService, private language:LanguageService,private citationTicketTypeService:CitationTicketTypeService,private _liveAnnouncer: LiveAnnouncer,
    private notificationService : ToastrService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    
     this.language.sendLang.subscribe(lang =>{
       if(lang != '') {
        this.appendLang(lang);
       }
    });
    this.dataSource.paginator = this.paginator;
    this.getList();
    this.ticketForm = new FormGroup({
      'ticketType':new FormControl(null,[Validators.required,
        Validators.maxLength(1)]),
      'description':new FormControl(null,[Validators.required,Validators.maxLength(20)]),
    });
    
  }



  // get ticketType() {
  //   return this.ticketForm.get('ticketType');
  // } 

  get ticketType() {
    return this.ticketForm.get('ticketType') as FormControl
  }

  get description() {
    return this.ticketForm.get('description') as FormControl
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
    appendLang(lang:string) {
    this.translate.use(lang);
    this.setPagelabel(lang);
  }


  addNewTicketType(){
    this.showAddForm = true;
    this.addTicketButton = true;
    this.showEditForm = false;
  }

  CancelTickettype() {
    this.showAddForm = false;
    this.ticketForm.reset();
    this.getList();
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }

  getList() {
      this.citationTicketTypeService.getTickettypeList().subscribe(res =>{
          this.data = res;
          //this.dataSource.data = res;
          this.dataSource = new MatTableDataSource<CitationTicketType>(res.reverse());
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.filterData();
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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


  addTicket(data:any) {
        if(this.ticketForm.valid) {
          const obj = {
            "contractID":2,
            "createUserID":7500,
            "updateUserID":5000,
            "createDatetime":"2022-02-24T09:15:00",
            "updateDatetime":"2021-03-22T11:25:00",
            "ticketDescText":data.description.trim(),
            "ticketTypeCode":data.ticketType
          }
          this.citationTicketTypeService.addTickettypeList(obj).subscribe(res =>{
            console.log(res);
              if(res.status == "Success") {
                const msg = "";
                console.log(res.details[0].code)
                this.welcome = this.translate.instant("Record Added Successfully", { msg: msg });
                this.notificationService.success(this.welcome);
                this.ticketForm.reset();
                this.getList();
                this.showAddForm = false;
                }
            }, error => {
              for (var i = 0; i < error.error.details.length; i++) {
                if( error.error.details[i].code =="5000" && error.error.details[i].message != "DuplicateKey")
                {
                  const msg = "";
                  this.notificationService.error("Duplicate Record Found");
                }
                else if(error.error.details[i].message == "DuplicateKey" && error.error.details[i].code =="5000")
                {
                  const msg = "";
                  this.notificationService.error("Duplicate Record Found");
                  this.welcome = this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg });
                  this.ticketForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
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

  filterData():void {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.ticketTypeCode.toLocaleLowerCase().includes(filter) || data.ticketDescText.toLocaleLowerCase().includes(filter);
    }
  }

  editTicketType(data:any) {
      console.log(data);
      this.editData = data;
      this.showAddForm = true;
      this.addTicketButton = false;
      this.showEditForm = true;
      this.ticketForm.controls["ticketType"].setValue(data.ticketTypeCode);
      this.ticketForm.controls["description"].setValue(data.ticketDescText);
  }

  deleteTicketType(rowData:any) {
    const msgs = "";
    if(confirm(this.translate.instant("Are you sure to delete", { msg: msgs }))) {
       this.citationTicketTypeService.deleteTickettype(rowData.ticketTypeID).subscribe(res =>{
         if(res.status == "Success") {
           const msg = "";
           const errcodes=res.details[0].code;
           this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
           this.notificationService.success(this.successMsg);
           this.getList();
            this.showAddForm = false;
           this.ticketForm.reset();
        }
      },error => {
        console.log(error);
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
      })
         
      }
  }
  

  updateTicketType(ticketData:any) { 
    console.log(ticketData);
    if(this.ticketForm.valid) {
      const obj = {
        "ticketTypeID" : this.editData.ticketTypeID,
        "ticketDescText":ticketData.description.trim(),
        "ticketTypeCode":ticketData.ticketType
      }
      this.citationTicketTypeService.UpdateTickettype(this.editData.ticketTypeID,obj).subscribe(res => {
            console.log(res);
            if(res.status == 'Success') {
              this.showAddForm = false;
              this.ticketForm.reset();
              this.getList();
              const msg ='';
              this.welcome = this.translate.instant("Record Updated Successfully", { msg: msg });
              this.notificationService.success(this.welcome);
            }
      }, error => {
        console.log(error);
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
      })
    }
  }





 

}
