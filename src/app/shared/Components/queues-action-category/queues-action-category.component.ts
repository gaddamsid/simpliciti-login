import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { actionModel } from 'src/app/Models/action.Model';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
export interface IncomingData{
  actionForm: boolean;
  categoryForm: boolean;
  bahaviorQueuesID: number;
  QData: any
  }
@Component({
  selector: 'app-queues-action-category',
  templateUrl: './queues-action-category.component.html',
  styleUrls: ['./queues-action-category.component.scss']
})
export class QueuesActionCategoryComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!: ElementRef;
  @Output() onCategoriADDEdit = new EventEmitter<any>();
  actionList!: actionModel[];
  showEditForm: boolean = false;
  alertMsg!: string;
  successMsg!: string;
  PageForm!: FormGroup;
  actionForm!: FormGroup;
  updatingActionCategory: boolean = false;
  updatingRecord!: any;
  welcome: any;
  fileTransferProtocols !: any;
  contractID: string = "2";
  selected = [];

  constructor(public translate: TranslateService,
    private headerSection: LanguageService,
    @Inject(MAT_DIALOG_DATA) public queueData: IncomingData,
    private dialogRef: MatDialogRef<QueuesActionCategoryComponent>,
    private formGroupDirective: FormGroupDirective,
    private notificationService: ToastrService, private apiService: ApiService) { }

    ngOnInit(): void {
      this.getAllDropDown();
      this.headerSection.sendLang.subscribe(lang => {
        if (lang != '') {
          this.appendLang(lang);
        }
      });
      this.actionForm = new FormGroup({
        "actionsName": new FormControl("", [Validators.required, Validators.maxLength(150)]),
      });
  
      this.PageForm = new FormGroup({
        "categoryName": new FormControl("", [Validators.required, Validators.maxLength(150)]),
        "phasesID": new FormControl("", [Validators.required, Validators.maxLength(150)]),
        "categoryTypesID": new FormControl("", [Validators.required, Validators.maxLength(150)]),
        "actionsID": new FormControl("", [Validators.required, Validators.maxLength(150)]),
      });
    }
    cancelAdd_Save() {
      this.PageForm.reset();
      this.dialogRef.close();
      this.showEditForm = false;
      this.notificationService.info(this.translate.instant("Process Cancelled"));
      //this.onCategoriADDEdit.emit(this.showAddForm);
    }
    appendLang(lang: string) {
      this.translate.use(lang);
    }
    queueTypesMater!: any[];
    PhasesMater!: any[];
    ActionsMater!: any[];
    categoryTypeMater!: any[];
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
    // -------------------------------------- --------- API OPERATIONS ----------------------------->
    addRecord(formData: any, formDirective:FormGroupDirective) {
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
            "queuesID": [this.queueData.bahaviorQueuesID]
          }
        }
        this.apiService.post("ActionCategories/addActionCategory", inputData, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            this.successMsg = this.translate.instant(res.details[0].code, { msg: msg });
            this.notificationService.success(this.successMsg);
            formDirective.resetForm();
            this.dialogRef.close(res);
            this.queueData.QData = res;
            //this.onCategoriADDEdit.emit(this.showAddForm);
          }
        }, error => {
          this.errorResponseCheck(error);
        })
      }
    }
    addNewAction(formData: any ,formDirective:FormGroupDirective){
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
            formDirective.resetForm();
            this.dialogRef.close(res);
            this.queueData.QData = res;
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
  }
  