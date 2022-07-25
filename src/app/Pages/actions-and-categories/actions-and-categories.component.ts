import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { actionModel } from 'src/app/Models/action.Model';
import { fileTransferModel } from 'src/app/Models/fileTransfer.Model';
import { FileTransferService } from 'src/app/Services/fileTransfer/file-transfer.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
@Component({
  selector: 'app-actions-and-categories',
  templateUrl: './actions-and-categories.component.html',
  styleUrls: ['./actions-and-categories.component.scss']
})
export class ActionsAndCategoriesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!: ElementRef;
  actionList!: actionModel[];
  displayedColumns: string[] = ['actionsName', 'actionQueueNames', "Action"];

  showAddForm: boolean = false;
  showEditForm: boolean = false;
  dataSource = new MatTableDataSource<actionModel>();
  alertMsg!: string;
  successMsg!: string;
  actionForm!: FormGroup;
  updatingRecord!: any;
  welcome: any;
  fileTransferProtocols !: any;
  contractID: string = "2";
  showCatForm:boolean = true;
  constructor(public translate: TranslateService,
    private headerSection: LanguageService,

    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getListData();
    this.headerSection.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });

    this.actionForm = new FormGroup({
      "actionsName": new FormControl("", [Validators.required, Validators.maxLength(150)]),
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
  setPagelabel(lang: any) {
    const msg = "";
    this.translate.use(lang).toPromise();
    this.translate
      .use(lang)
      .subscribe(res => {
        this.dataSource.paginator = this.paginator;
        this.alertMsg = this.translate.instant("Items per page", { msg: msg });
        this.dataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;
      });
  }
  cancelAdd_Save() {
    this.actionForm.reset();
    this.showAddForm = false;
    this.showEditForm = false;
    this.showCatForm = true;
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }
  editIconClicked(rowData: any) {
    this.showEditForm = true;
    this.updatingRecord = [];
    this.updatingRecord = rowData;
    this.apiService.get('Actions/getActionsById?Id=' + rowData.actionsID, true).subscribe((res) => {
      this.actionForm.controls['actionsName'].setValue(res.actionsName);
    });
    this.showCatForm = false;
  }
  showAddFormPage() {
    this.showAddForm = true;
    this.actionForm.reset();

  }
  filterData(): void {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.actionsName.toLocaleLowerCase().includes(filter) || (Number(filter) == data.actionQueueNames.length);
    };
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // -------------------------------------- --------- API OPERATIONS ----------------------------->
  getListData() {
    this.actionList = [];
    this.apiService.get('Actions/getAllActions?ContractID=' + this.contractID, true).subscribe(res => {
      if (res) {
        this.actionList = res;
        this.actionList = res
        this.dataSource = new MatTableDataSource<actionModel>(
          res.reverse()
        );
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.sort.disableClear = true;
        this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
          if (typeof data[sortHeaderId] === 'string') {
            return data[sortHeaderId].toLocaleLowerCase();
          }
          if(sortHeaderId =="actionQueueNames")
          {
            return data[sortHeaderId].length;
          }
          return data[sortHeaderId];
        };
        this.dataSource.paginator = this.paginator;
        this.filterData();
      }
    });

  }


  addRecord(formData: any) {
    this.sort.sort({ id: '', start: 'asc', disableClear: false }) //To Disable the applied sorting so that the inserted record will appear at top

    if (this.actionForm.valid) {
      var inputData = {
        "actionsModel": {
          "createUserID": 0,
          "updateUserID": 0,
          "createDatetime": "2022-04-27T10:00:20.245Z",
          "updateDatetime": "2022-04-27T10:00:20.245Z",
          "isDeleted": "N",
          "actionsID": 0,
          "contractID": this.contractID,
          "active": true,
          "actionsName": this.actionForm.value.actionsName,
          "actionQueueNames": [
            "string"
          ]
        }
      }

      this.apiService.post("Actions/addActions", inputData, true).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant(res.details[0].code, { msg: msg });
          this.notificationService.success(this.successMsg);
          this.actionForm.reset();
          this.getListData();
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
    if (this.actionForm.valid) {
      var inputData = {
        "actionsModel": {
          "createUserID": 0,
          "updateUserID": 0,
          "createDatetime": "2022-04-27T10:29:43.953Z",
          "updateDatetime": "2022-04-27T10:29:43.953Z",
          "isDeleted": "N",
          "actionsID": this.updatingRecord.actionsID,
          "contractID": this.updatingRecord.contractID,
          "active": this.updatingRecord.active,
          "actionsName": this.actionForm.value.actionsName,
          "actionQueueNames": [
            "string"
          ]
        }
      }

      this.apiService.put("Actions/updateActions", inputData, true).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.actionForm.reset();
          this.getListData();
          this.showAddForm = false;
          this.showEditForm = false;
          this.showCatForm = true;
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
      if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
        const msg = "";
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.actionForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }
  hide: boolean = true;

  myFunction() {
    this.hide = !this.hide;
  }
  parseJson(str: any): any {
    if (str.length != 0) {
      var stringV = "";
      var data = JSON.stringify(str);
      stringV = JSON.parse(data, (key, value) => {
        // console.log(key); // log the current property name, the last is "".
        return value;     // return the unchanged property value.
      })
      return stringV.toString();
    }
    else
      return " ";
  }

  actionQueueNamesCount(str: any) {
    return str.length;
  }

  toggleType(id: number, status: boolean) {
    const msgs = "";

    if (status) {
      if (confirm(this.translate.instant(`Are_want_to_Enable_Action`, { msg: msgs }))) {
        var obj = {
          "actionsId": id
        }
        this.apiService.put("Actions/toggleActions", obj, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Action Enabled Successfully", { msg: msgs }));
            this.getListData();
          }
        })

      }
    } else {
      if (confirm(this.translate.instant(`Are_want_to_Disable_Action`, { msg: msgs }))) {
        var obj = {
          "actionsId": id
        }
        this.apiService.put("Actions/toggleActions", obj, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Action Disabled Successfully", { msg: msgs }));
            this.getListData();
          }
        })

      }
    }
  }
  isCategoriADDEdit: boolean = false;
  onCategoriADDEdit(date: any): void {
    this.isCategoriADDEdit = date;
  }

  isActionListPage: boolean = true;
  onAcionList(event:any)
  {
    this.isActionListPage = event;
  }
}
