import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { get } from 'lodash';
import { ToastrService } from 'ngx-toastr'; 
import { AddBadgeModel, BadgeNumberModel, UpdateBadgeModel } from 'src/app/Models/badgeNumber.Model';
import {  fileTransferModel } from 'src/app/Models/fileTransfer.Model';
import { FileTransferService } from 'src/app/Services/fileTransfer/file-transfer.service';

import { LanguageService } from 'src/app/shared/Components/header/languages.service';


@Component({
  selector: 'app-file-transfer',
  templateUrl: './file-transfer.component.html',
  styleUrls: ['./file-transfer.component.scss']
})
export class FileTransferComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!:ElementRef;
  fileTransferList!: fileTransferModel[];
  displayedColumns: string[] = ['name', 'fileTransferProtocol', 'ip','port','userName', 'Action'];
 
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  dataSource = new MatTableDataSource<fileTransferModel>();
  alertMsg!: string;
  successMsg!: string;
  fileTransferForm!: FormGroup;
  
  updatingRecord!: any;
  welcome: any;
  fileTransferProtocols !:any;
  constructor(public translate: TranslateService,
    private headerSection: LanguageService,
    private bn_service: FileTransferService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService : ToastrService,) { }

  ngOnInit(): void {
    this.getFileTransfer();
    this.headerSection.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    // FORM CONTROLS
    const ipPattern = 
    "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
    this.fileTransferForm = new FormGroup({
      
      // 'fileTransferProtocolsID': new FormControl("", [Validators.required, Validators.maxLength(6)]),
      // 'name': new FormControl("", [Validators.required, Validators.maxLength(50)]),
      // 'fileTransferProtocol': new FormControl(0, [Validators.pattern('^[0-9]\\d*$'), Validators.minLength(1)]),
      // 'ip': new FormControl(0, [Validators.pattern('^[0-9]\\d*$'), Validators.minLength(1)]),
      // 'port': new FormControl(0, [Validators.pattern('^[0-9]\\d*$'), Validators.minLength(1)]),
      // 'userName': new FormControl(0, [Validators.pattern('^[0-9]\\d*$'), Validators.minLength(1)]),

     
      "fileTransferProtocolsID": new FormControl("", [Validators.required, Validators.maxLength(6)]),
      "transferOptionEnabled": new FormControl(""),
      "home": new FormControl("", [Validators.required, Validators.maxLength(150)]),
      "ip": new FormControl("", [Validators.required,Validators.pattern(ipPattern), Validators.maxLength(150)]),
      "fileTransfersKey": new FormControl("", [ Validators.maxLength(150)]),
      "fileTransfersName": new FormControl("", [Validators.required, Validators.maxLength(150)]),
      "password": new FormControl("", [Validators.required, Validators.maxLength(150)]),
      "port": new FormControl("", [Validators.required, Validators.maxLength(21)]),
      "userName": new FormControl("", [ Validators.maxLength(150)]),
      
     
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
    this.fileTransferForm.reset();
    this.showAddForm = false;
    this.showEditForm = false;
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }
  editIconClicked(rowData: any) {
    this.bn_service.getFileTransferProtocol().subscribe((res) => {
      this.fileTransferProtocols = res; 
  
    })
    this.showEditForm = true;
    this.updatingRecord =[];
    this.updatingRecord = rowData;
    this.bn_service.getFileTransferById(rowData.fileTransfersID).subscribe((res) => {
    this.fileTransferForm.controls['fileTransferProtocolsID'].setValue(res.fileTransferProtocolsID);
    this.fileTransferForm.controls['transferOptionEnabled'].setValue(res.transferOptionEnabled);
    this.fileTransferForm.controls['home'].setValue(res.home);
    this.fileTransferForm.controls['ip'].setValue(res.ip);
    this.fileTransferForm.controls['fileTransfersKey'].setValue(res.fileTransfersKey);
    this.fileTransferForm.controls['fileTransfersName'].setValue(res.fileTransfersName);
    this.fileTransferForm.controls['password'].setValue(res.password);
    this.fileTransferForm.controls['port'].setValue(res.port);
    this.fileTransferForm.controls['userName'].setValue(res.userName);
    });
  }
  showAddFormPage() {
    this.showAddForm = true;
    this.fileTransferForm.reset();
    this.bn_service.getFileTransferProtocol().subscribe((res) => {
      this.fileTransferProtocols = res; 
  
    })
  }
  filterData(): void {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.name.toLocaleLowerCase().includes(filter) || data.fileTransferProtocol.toString() === filter || data.ip.toLocaleLowerCase().includes(filter) || data.port.toString().includes(filter) ||data?.userName?.toLocaleLowerCase().includes(filter);
    };
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // -------------------------------------- --------- API OPERATIONS ----------------------------->
  getFileTransfer() {
    this.fileTransferList=[];
    this.bn_service.getFileTransfer().subscribe(
      (res) => {
        this.fileTransferList =res
        this.dataSource = new MatTableDataSource<fileTransferModel>(
          res.reverse()?.map((x: any) => ({
            ...x,
            normalize: x.ip
              .split(".")
              .map((y: string[]) => ("000" + y).slice(-3))
              .join(".")
          })) 
        );
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;       
        this.sort.disableClear = true;
        this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
          if (typeof data[sortHeaderId] === 'string') {
            return data[sortHeaderId].toLocaleLowerCase();
          }
          return data[sortHeaderId];
        };
        this.dataSource.paginator = this.paginator;
        this.filterData();
      }
    );
  }
  

  addRecord(formData: any) {
    this.sort.sort({id:'',start:'asc',disableClear : false}) //To Disable the applied sorting so that the inserted record will appear at top
    if (formData.transferOptionEnabled == null || formData.transferOptionEnabled == "") {

      this.fileTransferForm.get('transferOptionEnabled')?.setErrors(null);
    }
    if(this.fileTransferForm.valid) {
      var inputData ={
        "fileTransferModel": {          
          "isDeleted": "N",
          "fileTransfersID": 0,
          "fileTransferProtocolsID": this.fileTransferForm.value.fileTransferProtocolsID,
          "protocol": "",
          "home": this.fileTransferForm.value.home,
          "ip": this.fileTransferForm.value.ip,
          "fileTransfersKey": this.fileTransferForm.value.fileTransfersKey,
          "fileTransfersName": this.fileTransferForm.value.fileTransfersName,
          "password": this.fileTransferForm.value.password,
          "port": this.fileTransferForm.value.port,
          "userName": this.fileTransferForm.value.userName,
          "active": true,
          "contractID": 0,
          "transferOptionEnabled": this.fileTransferForm.value.transferOptionEnabled ==(""||null)? false : this.fileTransferForm.value.transferOptionEnabled
        }
      }
      this.bn_service.addFileTransfer(inputData).subscribe(res => {
        if(res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant(res.details[0].code, { msg: msg });
          this.notificationService.success(this.successMsg);
          this.fileTransferForm.reset();
          this.getFileTransfer();
          this.paginator.pageIndex = 0;
          this.showAddForm = false;
          this.searchString.nativeElement.value = ""
       }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }
  updateBadgeRecord(formData: any) {
    if(this.fileTransferForm.valid) 
    {
      var inputData ={
        "fileTransferModel": {          
          "isDeleted": "N",
          "fileTransfersID": this.updatingRecord.fileTransfersID,
          "fileTransferProtocolsID": this.fileTransferForm.value.fileTransferProtocolsID,
          "protocol": "",
          "home": this.fileTransferForm.value.home,
          "ip": this.fileTransferForm.value.ip,
          "fileTransfersKey": this.fileTransferForm.value.fileTransfersKey,
          "fileTransfersName": this.fileTransferForm.value.fileTransfersName,
          "password": this.fileTransferForm.value.password,
          "port": this.fileTransferForm.value.port,
          "userName":  this.fileTransferForm.value.userName ==(""||null)? "" : this.fileTransferForm.value.userName,
          "active": true,
          "contractID": 0,
          "transferOptionEnabled": this.fileTransferForm.value.transferOptionEnabled ==(""||null)? false :this.fileTransferForm.value.transferOptionEnabled 
        }
      }
      this.bn_service.updateFileTransfer(inputData).subscribe( res => {
        if(res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.fileTransferForm.reset();
          this.getFileTransfer();
          this.showAddForm = false;
          this.showEditForm = false;
          this.searchString.nativeElement.value = ""
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
        let translateCode=error.error.details[i].code +"_"+ error.error.details[i].fieldName;
        this.welcome = this.translate.instant( translateCode, { msg: msg });
        this.fileTransferForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
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
  hide: boolean = true;

  myFunction() {
    this.hide = !this.hide;
  }

}


