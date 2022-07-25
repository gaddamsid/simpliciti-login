/* eslint-disable @angular-eslint/no-output-on-prefix */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { actionModel, CategoriesModel } from 'src/app/Models/action.Model';
import { fileTransferModel } from 'src/app/Models/fileTransfer.Model';
import { FileTransferService } from 'src/app/Services/fileTransfer/file-transfer.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!: ElementRef;
  @Output() onCategoriADDEdit = new EventEmitter<any>();

  showActionForm:boolean = false;
  @Output() onAcionListForm = new EventEmitter<any>();

  actionList!: actionModel[];
  displayedColumns: string[] = ['categoryName', 'categoryType', 'categoryPhaseType', 'categoriesQueueNames', "Action"];

  showAddForm: boolean = false;
  showEditForm: boolean = false;
  dataSource = new MatTableDataSource<CategoriesModel>();
  alertMsg!: string;
  successMsg!: string;
  PageForm!: FormGroup;

  updatingRecord!: any;
  welcome: any;
  fileTransferProtocols !: any;
  contractID: string = "2";
  selected = [];
  @Input() showCatForm:any;
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

    this.PageForm = new FormGroup({
      "categoryName": new FormControl("", [Validators.required, Validators.maxLength(150)]),
      "phasesID": new FormControl("", [Validators.required, Validators.maxLength(150)]),
      "categoryTypesID": new FormControl("", [Validators.required, Validators.maxLength(150)]),
      "actionsID": new FormControl("", [Validators.required, Validators.maxLength(150)]),
      "queuesID": new FormControl("",),
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
        if(this.dataSource.paginator && this.dataSource.paginator._intl){
          this.dataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;
        }
      });
  }
  cancelAdd_Save() {
    this.PageForm.reset();
    this.showAddForm = false;

    this.showEditForm = false;
    this.notificationService.info(this.translate.instant("Process Cancelled"));
    this.onCategoriADDEdit.emit(this.showAddForm);
    this.showActionForm = true;
    this.onAcionListForm.emit(this.showActionForm);
  }
  editIconClicked(rowData: any) {
    this.showEditForm = true;
    this.updatingRecord = [];
    this.updatingRecord = rowData;
    this.queueTypesMater = [];
    this.PhasesMater = [];
    this.ActionsMater = [];
    this.categoryTypeMater = [];
    forkJoin(
      this.apiService.get('ActionCategories/getQueues', true),
      this.apiService.get('ActionCategories/getPhaseTypes', true),
      this.apiService.get('Actions/getAllActions?ContractID=' + this.contractID, true),
      this.apiService.get('ActionCategories/getCategoryTypes', true)
    ).subscribe(
      results => {
        this.queueTypesMater = results[0];
        this.PhasesMater = results[1];
        this.ActionsMater = results[2];
        this.categoryTypeMater = results[3];

        this.PageForm.controls['categoryName'].setValue(rowData.categoryName);
        this.PageForm.controls['phasesID'].setValue(rowData.phasesID);
        this.PageForm.controls['categoryTypesID'].setValue(rowData.categoryTypeID);
        this.PageForm.controls['actionsID'].setValue(rowData.actionID);
        this.PageForm.controls['queuesID'].setValue(rowData.categoriesQueuesIds);

      },
      error => console.error
    );

    this.onCategoriADDEdit.emit(this.showAddForm);
    this.showActionForm = false;
    this.onAcionListForm.emit(this.showActionForm);
  }
  queueTypesMater!: any[];
  PhasesMater!: any[];
  ActionsMater!: any[];
  categoryTypeMater!: any[];
  showAddFormPage() {
    this.showAddForm = true;

    this.PageForm.reset();
    this.getAllDropDown();
    this.onCategoriADDEdit.emit(this.showAddForm);

  }
  getAllDropDown() {
    this.queueTypesMater = [];
    this.PhasesMater = [];
    this.ActionsMater = [];
    this.categoryTypeMater = [];
    forkJoin(
      this.apiService.get('ActionCategories/getQueues', true),
      this.apiService.get('ActionCategories/getPhaseTypes', true),
      this.apiService.get('Actions/getAllActions?ContractID=' + this.contractID, true),
      this.apiService.get('ActionCategories/getCategoryTypes', true)
    ).subscribe(
      results => {
        this.queueTypesMater = results[0];
        this.PhasesMater = results[1];
        this.ActionsMater = results[2];
        this.categoryTypeMater = results[3];
      },
      error => console.error
    );
  }
  filterData(): void {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.categoryName.toLocaleLowerCase().includes(filter) || data?.categoryType.toLocaleLowerCase().includes(filter)
        || data.categoryPhaseType.toLocaleLowerCase().includes(filter) || (Number(filter) == data?.categoriesQueueNames.length);
    };
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // -------------------------------------- --------- API OPERATIONS ----------------------------->
  getListData() {
    this.actionList = [];
    this.apiService.get('ActionCategories/getActionCategories', true).subscribe(res => {
      if (res) {
        this.actionList = res;
        this.actionList = res
        this.dataSource = new MatTableDataSource<CategoriesModel>(
          res.reverse()
        );
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.sort.disableClear = true;
        this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
          if (typeof data[sortHeaderId] === 'string') {
            return data[sortHeaderId].toLocaleLowerCase();
          }
          if(sortHeaderId =="categoriesQueueNames")
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

    if (this.PageForm.valid) {
      var inputData = {
        "actionCategoriesPostModel": {

          "isDeleted": "N",
          "actionCategoriesID": this.PageForm.value.actionCategoriesID,
          "categoriesID": 0,
          "categoriesName": this.PageForm.value.categoryName,
          "actionsID": this.PageForm.value.actionsID,
          "actionName": "string",
          "categoryTypesID": this.PageForm.value.categoryTypesID,
          "phasesID": this.PageForm.value.phasesID,
          "phasesName": "string",
          "contractID": this.contractID,
          "active": true,
          "queuesID": this.PageForm.value.queuesID ==null ? [] : this.PageForm.value.queuesID
        }
      }
      console.log(JSON.stringify(inputData))
      this.apiService.post("ActionCategories/addActionCategory", inputData, true).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant(res.details[0].code, { msg: msg });
          this.notificationService.success(this.successMsg);
          this.PageForm.reset();
          this.getListData();
          if(this.paginator && this.paginator.pageIndex){
            this.paginator.pageIndex = 0;
          }
          this.showAddForm = false;
          if(this.searchString)
          this.searchString.nativeElement.value = ""
          this.onCategoriADDEdit.emit(this.showAddForm);
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }
  updateBadgeRecord(formData: any) {

    if (this.PageForm.valid) {
      var inputData =
      {
        "actionCategoriesPostModel": {
           "isDeleted": "N",
          "actionCategoriesID": 0,
          "categoriesID": this.updatingRecord.categoriesID,
          "categoriesName": this.PageForm.value.categoryName,
          "actionsID": this.PageForm.value.actionsID,
          "actionName": "string",
          "categoryTypesID": this.PageForm.value.categoryTypesID,
          "phasesID": this.PageForm.value.phasesID,
          "phasesName": "string",
          "contractID": this.contractID,
          "active": this.updatingRecord.active,
          "queuesID": this.PageForm.value.queuesID


        }
      }
      console.log(JSON.stringify(inputData));
      this.apiService.put("ActionCategories/updateActionCategory", inputData, true).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.PageForm.reset();
          this.getListData();
          this.showAddForm = false;

          this.showEditForm = false;
          if(this.searchString)
          this.searchString.nativeElement.value = ""
          this.onCategoriADDEdit.emit(this.showAddForm);
          this.showActionForm = true;
          this.onAcionListForm.emit(this.showActionForm);
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
        this.PageForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
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
    if (str != undefined) {
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
    else
      return " ";
  }

  actionQueueNamesCount(str: any) {
    return str.length;
  }

  toggleType(id: number, status: boolean) {
    const msgs = "";

    if (status) {
      if (confirm(this.translate.instant(`Are_want_to_Enable_Category`, { msg: msgs }))) {
        var obj = {
          "categoriesId": id
        }
        this.apiService.put("ActionCategories/changeStatusCategory", obj, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Category Enabled Successfully", { msg: msgs }));
            this.getListData();
          }
        })

      }
    } else {
      if (confirm(this.translate.instant(`Are_want_to_Disable_Category`, { msg: msgs }))) {
        var obj = {
          "categoriesId": id
        }
        this.apiService.put("ActionCategories/changeStatusCategory", obj, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Category Disabled Successfully", { msg: msgs }));
            this.getListData();
          }
        })

      }
    }
  }
  changeLeagueOwner(value: any) {

  }


}
