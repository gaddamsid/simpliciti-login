import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { get } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { AddBadgeModel, BadgeNumberModel, UpdateBadgeModel } from 'src/app/Models/badgeNumber.Model';
import { BadgeNumberService } from 'src/app/Services/BadgeNumber/badge-number.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-badge-number',
  templateUrl: './badge-number.component.html',
  styleUrls: ['./badge-number.component.scss']
})

export class BadgeNumberComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!:ElementRef;
  displayedColumns: string[] = ['badgeNumber', 'badgeOfficerName', 'badgeAgency','badgeDivision', 'Action'];
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  dataSource = new MatTableDataSource<BadgeNumberModel>();
  alertMsg!: string;
  successMsg!: string;
  badgeNumberForm!: FormGroup;
  badgeNumberList!: BadgeNumberModel[];
  updatingBadgeRecord!: BadgeNumberModel;
  welcome: any;
  fileData:any =[];
  fileArray:any =[];
  uploaded: string ="N";
  pdfSrc:any;
  showCross:boolean =false;
  urlData: any;
  uploadfile:any;
  file:any ="";

  constructor(public translate: TranslateService,
    private headerSection: LanguageService,
    private bn_service: BadgeNumberService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService : ToastrService,private apiService: ApiService,private dialog: MatDialog) { }
    
  

  ngOnInit(): void {
    this.getBadgeNumber();
    this.headerSection.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    // FORM CONTROLS
    this.badgeNumberForm = new FormGroup({
      'badgeNumber': new FormControl("", [Validators.required, Validators.maxLength(6)]),
      'badgeOfficerName': new FormControl("", [Validators.required, Validators.maxLength(50)]),
      'badgeAgency': new FormControl(0, [Validators.pattern('^[0-9]\\d*$'), Validators.minLength(1),Validators.maxLength(2)]),
      'badgeDivision': new FormControl(0, [Validators.pattern('^[0-9]\\d*$'), Validators.minLength(1),Validators.maxLength(2)]),
      'signatureUpload':new FormControl(""),
    });
  }
  
  //<<-----------------------------------SORTING------------------------------------------>
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
  cancelAdd_Save() {
    this.badgeNumberForm.reset();
    this.showAddForm = false;
    this.showEditForm = false;
    this.showCross= false;
    this.file ="";
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }
  editIconClicked(rowData: BadgeNumberModel) {
    this.file = "";
    this.showEditForm = true;
    this.updatingBadgeRecord = rowData;
    this.apiService.get('getIOImage?id='+rowData.badgenumberId+'&type=IO').subscribe(res=>{
      if(res) {
        this.uploadfile = res;
        this.file = res.fileName;
        this.showCross = true;
      }
  })
    this.badgeNumberForm.patchValue({
      badgeNumber:  get(this.updatingBadgeRecord, 'badgeNumber'),
      badgeOfficerName: get(this.updatingBadgeRecord, 'badgeOfficerName'),
      badgeAgency: get(this.updatingBadgeRecord, 'badgeAgency'),
      badgeDivision: get(this.updatingBadgeRecord, 'badgeDivision'),
    })
  }
  showAddFormPage() {
    this.showAddForm = true;
  }
  filterData(): void {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.badgeNumber?.toLocaleLowerCase().includes(filter) || data.badgeAgency?.toString() === filter || data.badgeDivision?.toString() === filter || data.badgeOfficerName?.toLocaleLowerCase().includes(filter);
    };
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // -------------------------------------- --------- API OPERATIONS ----------------------------->
  getBadgeNumber() {
    this.bn_service.getBadgeNumber().subscribe(res => {
      this.badgeNumberList = res.map(element => {
        return new BadgeNumberModel(element)
      });
      this.dataSource = new MatTableDataSource<BadgeNumberModel>(this.badgeNumberList.reverse());
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
    });
  }

  addBadgeRecord(formData: any) {
    this.sort.sort({id:'',start:'asc',disableClear : false}) //To Disable the applied sorting so that the inserted record will appear at top
    if(this.badgeNumberForm.valid) {
      if(this.fileData.length) {
        this.fileArray = [];
        const obj = {
          "fileName": this.fileData[0].name,"docTypeId": "001","docGroup": "IO","description": "Issuing Officer","eventLevel": "",
        }
        this.fileArray.push(obj);
        this.uploaded = "Y";
      }else {
        this.uploaded = "N";
      }
    
      const dataObj = {
        "active": 1,
        "badgeAgency": formData.badgeAgency,
        "badgeDivision": formData.badgeDivision,
        "badgeNumber": formData.badgeNumber,
        "badgeOfficerName":formData.badgeOfficerName,
        "contract": "2",
        "isUploaded": this.uploaded,
        "fileList" : this.fileArray
      }
      const finaldata = new FormData();
      finaldata.append('files',this.fileData[0]);
      finaldata.append('badgeNumberRequest', JSON.stringify(dataObj));
      this.bn_service.addBadgeNumber(finaldata).subscribe(res => {
        if(res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant(res.details[0].code, { msg: msg });
          this.notificationService.success(this.successMsg);
          this.badgeNumberForm.reset();
          this.paginator.pageIndex = 0;
          this.getBadgeNumber();
          this.showAddForm = false;
          this.searchString.nativeElement.value = ""
          this.fileData = [];
          this.showCross = false;
          this.file ="";
       }
      }, error => {
        this.errorResponseCheck(error);
        this.showCross = false;
        this.file ="";
      })
    }
  }
  updateBadgeRecord(formData: any) {
    if(this.badgeNumberForm.valid) {
      if(this.fileData.length) {
        this.fileArray = [];
        const obj = {
          "fileName": this.fileData[0].name,"docTypeId": "001","docGroup": "IO","description": "Issuing Officer","eventLevel": "", "languageID":"",
          "languageDescription":""
        }
        this.fileArray.push(obj);
        this.uploaded = "Y";
      }else {
        this.uploaded = "N";
      }
      const dataObj = {
        "active": 1,
        "badgeAgency": formData.badgeAgency,
        "badgeDivision": formData.badgeDivision,
        "badgeNumber": formData.badgeNumber,
        "badgeOfficerName":formData.badgeOfficerName,
        "contract": "2",
        "isUploaded": this.file == null?'N':'Y',
        "fileList" : this.fileArray
        
      }
      const finaldata = new FormData();
      finaldata.append('files',this.fileData[0]);
      finaldata.append('badgeNumberRequest', JSON.stringify(dataObj));
    {
      this.bn_service.updateBadgeNumber(finaldata,this.updatingBadgeRecord.badgenumberId).subscribe( res => {
        if(res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.badgeNumberForm.reset();
          this.getBadgeNumber();
          this.showAddForm = false;
          this.showEditForm = false;
          this.searchString.nativeElement.value = ""
          this.showCross = false;
          this.file="";
       }
      }, error => {
        this.errorResponseCheck(error);
        this.showCross = false;
        this.file ="";
      })
    }
  }

}

  
  deleteBadgeRecord(id:number) {
    const msgs = "";
    if(confirm(this.translate.instant("Are you sure to delete", { msg: msgs }))) {
      this.bn_service.deleteBadgeNumber(id).subscribe(res => {
        if(res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.getBadgeNumber();
          this.showAddForm = false;
       }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }


  UploadFile(file:any) {
    if(file.target.files[0].type == "image/png" || file.target.files[0].type == "image/jpeg") {
      if (file.target.files[0].size < 2000000) {
        this.fileData =[];
        this.fileData.push(file.target.files[0]);
        this.file = this.fileData[0].name;
        this.showCross = true;
      }
      else {
        const msg = "";
        this.successMsg = this.translate.instant("File size should not greater than 2MB", { msg: msg });
        this.notificationService.error(this.successMsg);
        this.badgeNumberForm.controls['signatureUpload'].setValue(null); 
      }
  } else {
    const msg = "";
    this.successMsg = this.translate.instant("Please Upload file only JPEG/PNG format", { msg: msg });
    this.notificationService.error(this.successMsg);
    this.badgeNumberForm.controls['signatureUpload'].setValue(null); 
  }
}


openDialogWithTemplateRef(templateRef: TemplateRef<any>,element:any) {
    this.apiService.get('getIOImage?id='+element.badgenumberId+'&type=IO').subscribe(res=>{
        if(res) {
          this.pdfSrc = res.url;
        }
    })
   this.dialog.open(templateRef);
  }

  
  resetUpload() {
    this.badgeNumberForm.controls['signatureUpload'].setValue(null);
    this.file ="";
    this.showCross = false;
    this.fileData = [];
  }







// ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//
  errorResponseCheck(error: any) {
    for (var i = 0; i < error.error.details.length; i++) {
      if( error.error.details[i].code =="5000" && error.error.details[i].message != "DuplicateKey")
      {
        const msg = "";
        let translateCode=error.error.details[i].code +"_"+ error.error.details[i].fieldName;
        this.welcome = this.translate.instant( translateCode, { msg: msg });
        this.badgeNumberForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if(error.error.details[i].message == "DuplicateKey" && error.error.details[i].code =="5000")
      {
        const msg = "";
         this.notificationService.error(this.translate.instant( error.error.details[i].fieldName+"_"+error.error.details[i].message, { msg: msg }) )
         let translateCode=error.error.details[i].code +"_"+ error.error.details[i].message;
         this.welcome = this.translate.instant( translateCode, { msg: msg });
         if(error.error.details[i].fieldName === 'badgenumber') {
          this.badgeNumberForm.get('badgeNumber')?.setErrors({ invalid: this.welcome });
         }
         
      }
      else
      {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }

}
