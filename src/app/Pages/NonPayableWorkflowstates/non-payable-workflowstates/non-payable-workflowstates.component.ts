import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WorkflowstatesModel } from 'src/app/Models/non-payable-workflowstates.Model';
import { ApiService } from 'src/app/shared/services/api.service';
import { zip } from 'lodash';

@Component({
  selector: 'app-non-payable-workflowstates',
  templateUrl: './non-payable-workflowstates.component.html',
  styleUrls: ['./non-payable-workflowstates.component.scss']
})
export class NonPayableWorkflowstatesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!: ElementRef;
  displayedColumns: string[] = ['errorCode', 'workFlowStateName', 'action'];
  dataSource = new MatTableDataSource<WorkflowstatesModel>();
  WorkflowstatesForm !: FormGroup;
  showForm: boolean = false;
  data: any;
  successMsg!: string;
  alertMsg!: string;
  welcome: any;
  addBtn: boolean = true;
  editData: any;
  showEditForm: boolean = false;
  queueList: any;
  contractID: any = 2;
  listRecords = [];
  workFlowRecords = [];

  constructor(public translate: TranslateService,
    private language: LanguageService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService,
    private apiService: ApiService,
  ) { }


  ngOnInit(): void {

    this.dataSource.paginator = this.paginator;
    this.getList();
    //Language Code
    this.language.sendLang.subscribe(lang => {
      if (lang != "") {
        this.appendLang(lang);
      }
    });
    //Language Code
    this.WorkflowstatesForm = new FormGroup({
      'errorCode': new FormControl('', [Validators.required, Validators.maxLength(10)]),
      'workflowStateID': new FormControl('', [Validators.required]),
      'violationDateCheck': new FormControl(''),
      'nonPayableWorkflowStatesID': new FormControl('')
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  //<<-----------Sorting-------------------------------->>
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  //<<-----------Sorting Ends-------------------------------->>
  //<<-----------Language-------------------------------->>
  appendLang(lang: string) {
    this.translate.use(lang);
  }
  //<<-----------Language-------------------------------->>
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  checkZeroValue(event: any) {

    let val = event.value;

    if (isNaN(parseInt(val))) {

      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

      if (!format.test(val)) {

        console.log("correct");

        return true;

      } else {

        console.log("incorrect");

        this.WorkflowstatesForm.get("errorCode")?.setErrors({ invalid: "Error Code Incorrect" });

        return false;

      }

    }

    else {

      if (parseInt(val) <= 999999999 && parseInt(val) > 0) {

        console.log("correct");

        return true;

      } else {

        console.log("incorrect");

        this.WorkflowstatesForm.get("errorCode")?.setErrors({ invalid: "Error Code Incorrect" });

        return false;

      }

    }

  }

  addClientList() {
    this.showForm = true;
    this.showEditForm = false;
    this.addBtn = true;
  }

  cancelAdding() {
    this.showForm = false;
    this.alertMsg = "";
    this.successMsg = "";
    this.notificationService.info(this.translate.instant("Process Cancelled"));
    this.WorkflowstatesForm.reset();
    this.addBtn = true;
    this.getList();
  }


  cancelAdd_Save() {
    this.showForm = false;
    this.WorkflowstatesForm.reset();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.getList();
    this.notificationService.info(this.translate.instant('Process Cancelled'));

  }

  getList() {
    this.apiService.get('NonPayableWorkflowStates/getNonPayableWorkflowStatesByContractId?ContractId=' + this.contractID, true).subscribe(res => {
      if (res) {
        this.listRecords = res;
        this.dataSource = new MatTableDataSource<WorkflowstatesModel>(
          res.reverse()
        );
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
      }
    });
    this.apiService.get('WorkflowStates/getWorkflowStatesById?ContractID=' + this.contractID, true).subscribe(res => {
      if (res) {
        this.queueList = res;
      }
    });
  }


  filterData(): void {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.errorCode.toLowerCase().includes(filter) ||
        data.workFlowStateName.toLowerCase().includes(filter);
    };
  }


  addData(data: any) {
    console.log(data);
    if (this.WorkflowstatesForm.valid) {
      const obj = {
        "nonPayableWorkFlowStateModel": {
          "createUserID": 0,
          "updateUserID": 0,
          "createDatetime": "2022-05-05T16:37:30.060Z",
          "updateDatetime": "2022-05-05T16:37:30.060Z",
          "isDeleted": "N",
          "nonPayableWorkflowStatesID": 0,
          "contractID": 2,
          "active": true,
          "workflowStateID": this.WorkflowstatesForm.value.workflowStateID,
          "nonPayable": true,
          "errorCode": this.WorkflowstatesForm.value.errorCode,
          "violationDateCheck": this.WorkflowstatesForm.value.violationDateCheck ? this.WorkflowstatesForm.value.violationDateCheck : false
        }
      };
      this.apiService.post('NonPayableWorkflowStates/addNonPayableWorkflowStates', obj, true).subscribe(
        (res) => {
          if (res.status == 'Success') {
            const msg = '';
            const code = res.details[0].code;
            this.successMsg = this.translate.instant('Record Added Successfully', {
              msg: msg,
            });
            this.notificationService.success(this.successMsg);
            this.WorkflowstatesForm.reset();
            if (this.dataSource.paginator) {
              this.dataSource.paginator.firstPage();
            }
            this.getList();
            this.addBtn = true;
            this.showForm = false;
            this.showEditForm = false;

          }
        }, error => {
          this.errorResponseCheck(error);
        })
    }

  }

  editIconClicked(data: any) {
    this.editData = data;
    this.showForm = true;
    this.showEditForm = true;
    this.addBtn = false;
    this.WorkflowstatesForm.controls['errorCode'].setValue(data.errorCode);
    this.WorkflowstatesForm.controls['workflowStateID'].setValue(data.workflowStateID.toString());
    this.WorkflowstatesForm.controls['violationDateCheck'].setValue(data.violationDateCheck);
    this.WorkflowstatesForm.controls['nonPayableWorkflowStatesID'].setValue(data.nonPayableWorkflowStatesID);
  }

  updateRecord(data: any) {
    if (this.WorkflowstatesForm.valid) {
      const obj = {
        "nonPayableWorkFlowStateModel": {
          "createUserID": 0,
          "updateUserID": 0,
          "createDatetime": "2022-05-05T16:37:30.060Z",
          "updateDatetime": "2022-05-05T16:37:30.060Z",
          "isDeleted": "N",
          "nonPayableWorkflowStatesID": data.nonPayableWorkflowStatesID,
          "contractID": 2,
          "active": true,
          "workflowStateID": +data.workflowStateID,
          "nonPayable": true,
          "errorCode": data.errorCode,
          "violationDateCheck": data.violationDateCheck
        }
      }
      this.apiService.put(`NonPayableWorkflowStates/updateNonPayableWorkFlowStates`, obj, true).subscribe(res => {
        if (res.status === 'Success') {
          this.showForm = false;
          this.WorkflowstatesForm.reset();
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
          this.getList();
          const msg = '';
          this.welcome = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.welcome);
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    }

  }

  toggleClient(data: any, status: boolean) {
    const msgs = "";
    if (status) {
      if (confirm(this.translate.instant(`Are you sure you want to Enable the NonPayableWorkflowState?`, { msg: msgs }))) {

        this.apiService.put(`NonPayableWorkflowStates/updateNonPayableWorkFlowStatesStatus?NonPayableWorkflowStatesID=${data.nonPayableWorkflowStatesID}`, data, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Non Payable WorkflowState Enabled Successfully", { msg: msgs }));
            this.getList();
          }
        })

      }
    } else {
      if (confirm(this.translate.instant(`Are you sure you want to Disable the NonPayableWorkflowState?`, { msg: msgs }))) {

        this.apiService.put(`NonPayableWorkflowStates/updateNonPayableWorkFlowStatesStatus?NonPayableWorkflowStatesID=${data.nonPayableWorkflowStatesID}`, data, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Non Payable WorkflowState Disabled Successfully", { msg: msgs }));
            this.getList();
          }
        })

      }
    }
  }

  // ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//
  errorResponseCheck(error: any) {
    for (var i = 0; i < error.error.details.length; i++) {
      if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
        this.WorkflowstatesForm.controls['workflowStateID'].setErrors({ 'duplicateKey': true });
        const msg = "";
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        this.welcome = this.translate.instant(translateCode, { msg: msg });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.WorkflowstatesForm.get("phoneExt")?.setErrors({ invalid: "Phone Extensions Duplicate" });
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }
}
