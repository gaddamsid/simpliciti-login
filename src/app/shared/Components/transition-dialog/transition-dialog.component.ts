import {  Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Clauses, QualityControlModel, transitionsModel } from 'src/app/Models/transitions.Model';
import { ApiService } from '../../services/api.service';
import { LanguageService } from '../header/languages.service';

@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-transition-dialog',
  templateUrl: './transition-dialog.component.html',
  styleUrls: ['./transition-dialog.component.scss'],
})
export class TransitionDialogComponent implements OnInit {
  timedTransitionType: boolean = true;
  conditionalTransitionType: boolean = false;
  transitionTypeList: any;
  destinationList: any;
  transitionForm!: FormGroup
  relativeDateTypeList: any;
  dayTypeList: any;
  fieldDropdownList: any;
  operatorsDropdownList: any;
  joinOperatorsDropdownList: any;
  categoriesList: any;
  isChecked = true;
  successMsg: any;
  valueFieldEnabled:boolean =  false;
  valueColumnEnabled:boolean =  false;
  destinationName!: string;
  valuesDropDownList: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    timedTransitionType: boolean,
    transitionsType: string,
    queuesID: number,
    editTransition: boolean;
    currentQueueName: string;
    workflowStateID: number,
    QData: any;
  }, private apiService: ApiService, private fb: FormBuilder, public translate: TranslateService, private language: LanguageService, private notificationService: ToastrService,
    private transitionDialogRef: MatDialogRef<TransitionDialogComponent>) {
      this.transitionForm = this.fb.group({
        transitionTypesID: [null, [Validators.required]],
        destinationWorkflowStatesID: [null, [Validators.required]],
        duration: [null, [Validators.required]],
        percentage: [null, [Validators.required]],
        relativeDateTypesID: [null, [Validators.required]],
        relativeDateDayTypesID: [null],
        categoriesID: [null, [Validators.required]],
        enableQualityControl: [false],
        clause: this.fb.array([this.createClauseFormGroup()])
      });
    
  }

  ngOnInit(): void {
    this.language.sendLang.subscribe(lang => {
      if (lang != "") {
        this.appendLang(lang);
      }
    });
    
    this.getTransitionDropdowns();

    //this.clause = this.fb.array([]);
  }
  appendLang(lang: string) {
    this.translate.use(lang);
  }
  createClauseFormGroup() {
    return this.fb.group({
      fieldsID: null,
      operatorsID: null,
      actionID:'',
      joinOperatorsID: null
    });
  }
  get clause() {
    return this.transitionForm.controls['clause'] as FormArray;
  }
  addItem(): void {
    this.clause.push(this.createClauseFormGroup());
  }
  qualityControlChecked(e: any) {
    if (e.checked) {
      this.transitionForm.controls['percentage'].enable();
    } else this.transitionForm.controls['percentage'].disable();
  }
  transitionTypeChange(e: string) {
    this.clause.clear();
    this.addItem();
    switch (e) {
      case "2":
        this.timedTransitionType = true;
        this.transitionForm.removeControl('enableQualityControl');
        this.transitionForm.removeControl('percentage');
        this.transitionForm.addControl('duration', this.fb.control(null));
        this.transitionForm.addControl('relativeDateTypesID', this.fb.control(null));
        this.transitionForm.addControl('relativeDateDayTypesID', this.fb.control(null));
        this.transitionForm.addControl('categoriesID', this.fb.control(null));
        break;
      case "1":
        this.timedTransitionType = false;
        this.conditionalTransitionType = true;
        this.transitionForm.removeControl('duration');
        this.transitionForm.removeControl('relativeDateTypesID');
        this.transitionForm.removeControl('relativeDateDayTypesID');
        this.transitionForm.removeControl('categoriesID');
        this.transitionForm.addControl('enableQualityControl', this.fb.control(false));
        this.transitionForm.addControl('percentage', this.fb.control(null));
        this.transitionForm.controls['percentage'].disable();
        break;
      default:
        break;
    }
  }
  JoinOperatorChange(event: string, index:number ) {
    this.joinOperatorsDropdownList.forEach((element: any) => {
      if (element.operatorsID == parseInt(event)) {
        if (element.operatorsName == "AND" || element.operatorsName == "OR") {
          this.clause.push(this.createClauseFormGroup());
        }else if(this.clause.length>= index) {
          const removeIndex = this.clause.length-index-1
          while(this.clause.length-1 > index) {
            this.clause.removeAt(-1);
          }
          //this.clause.removeAt(-removeIndex);
        }
      }
    });
  }
  getTransitionDropdowns() {
    this.apiService.get('Transitions/getAllTransitionTypes', true).subscribe(res => {
      if (res) {
        this.transitionTypeList = res;
      }
    });
    this.apiService.get('ActionCategories/getActionCategories', true).subscribe(res => {
      if (res) {
        this.categoriesList = res;
      }
    });
    this.apiService.get(`WorkflowStates/getWorkflowStatesById?ContractID=${2}`, true).subscribe(res => {
      if (res) {
        this.destinationList = res;
      }
    });

    this.apiService.get('Transitions/getAllRelativeDateTypes', true).subscribe(res => {
      if (res) {
        this.relativeDateTypeList = res;
      }
    });

    this.apiService.get('Transitions/getAllRelativeDateDayTypes', true).subscribe(res => {
      if (res) {
        this.dayTypeList = res;
      }
    });
    // ------------FIELD -------------------------------
    this.apiService.get('XMLExportFile/getAllXmlField', true).subscribe(res => {
      if (res) {
        this.fieldDropdownList = res;
      }
    });
    // ------------OPERATOR -------------------------------
    this.apiService.get('Transitions/getAllOperators', true).subscribe(res => {
      if (res) {
        this.operatorsDropdownList = res.operators;
      }
    });
    // ------------JOIN OPERATOR -------------------------------
    this.apiService.get('Transitions/getAllJoinOperatorsQuery', true).subscribe(res => {
      if (res) {
        this.joinOperatorsDropdownList = res.operators;
      }
    });
  }
  getDestinationWorkflowstatesName(id: number) {
    this.destinationName = this.destinationList.filter((item: any) => item.workflowStatesID == id)[0].workflowStatesName
  }
  fieldActionSelected(e:any,index: number) {
    const newAction = this.fieldDropdownList.filter((item:any) => item.fieldsID == e)
    if(newAction[0].fieldsName === "Action") {
      this.apiService.get(`Queues/GetAllActionCategoriesByQueue?QueuesId=${this.data.queuesID}`,true).subscribe((res:any) =>{
        this.valuesDropDownList = res;
      })
      this.valueFieldEnabled = true;
      this.valueColumnEnabled = true;
    } else {
      this.clause.at(index).get('actionID')?.disable();
      
    }
  }
  editTransitions(rowData: any) {
    switch (this.data.transitionsType) {
      case "Timed":

        this.transitionForm.controls['transitionTypesID'].setValue(rowData.transitionTypeID.toString());
        this.transitionForm.get('transitionTypesID')?.disable();
        this.transitionForm.controls['destinationWorkflowStatesID'].setValue(rowData.destinationWorkflowStatesID.toString());
        this.transitionForm.controls['duration'].setValue(rowData.automaticTransitionsModel.duration);
        this.transitionForm.controls['relativeDateTypesID'].setValue(rowData.automaticTransitionsModel.relativeDateTypesID.toString());
        this.transitionForm.controls['categoriesID'].setValue(rowData.automaticTransitionsModel.categoriesID.toString());
        this.transitionForm.controls['relativeDateDayTypesID'].setValue(rowData.automaticTransitionsModel.relativeDateDayTypesID.toString());
        rowData.clauses.map((item: Clauses) => {
          this.clause.push(this.fb.group({
            fieldsID: item?.fieldsID.toString(),
            operatorsID: item?.operatorsID.toString(),
            joinOperatorsID: item?.joinOperatorsID.toString()
          }))
        });
        this.clause.removeAt(0)
        this.transitionForm.removeControl('enableQualityControl');
        this.transitionForm.removeControl('percentage');
        this.timedTransitionType = true;
        break;
      case "Conditional":
        this.timedTransitionType = false;
        this.transitionForm.controls['transitionTypesID'].setValue(rowData.transitionTypeID.toString());
        this.transitionForm.get('transitionTypesID')?.disable();
        this.transitionForm.controls['destinationWorkflowStatesID'].setValue(rowData.destinationWorkflowStatesID.toString());
        this.transitionForm.addControl('enableQualityControl', new FormControl(false));
        this.transitionForm.addControl('percentage', this.fb.control(0));
        if (rowData.enableQualityControl) {
          this.transitionForm.controls['enableQualityControl'].setValue(rowData.enableQualityControl);
          this.transitionForm.controls['percentage'].setValue(rowData.qualityControlModel?.percentage);
        } else {
          this.transitionForm.controls['enableQualityControl'].setValue(rowData.enableQualityControl);
          this.transitionForm.get('percentage')?.disable();
        }
        rowData.clauses.map((item: Clauses) => {
          if(item.clauseValue !== "") {
            this.clause.push(this.fb.group({
              fieldsID: item?.fieldsID.toString(),
              operatorsID: item?.operatorsID.toString(),
              actionID: item?.clauseValue.toString(),
              joinOperatorsID: item?.joinOperatorsID.toString()
            }))
          } else {
            this.clause.push(this.fb.group({
              fieldsID: item?.fieldsID.toString(),
              operatorsID: item?.operatorsID.toString(),
              joinOperatorsID: item?.joinOperatorsID.toString()
            }))
          }
        });
        this.clause.removeAt(0)
        this.transitionForm.removeControl('categoriesID');
        this.transitionForm.removeControl('duration');
        this.transitionForm.removeControl('relativeDateTypesID');
        this.transitionForm.removeControl('relativeDateDayTypesID');
        break;
      default:
        break;
    }
  }
  addNewTransition(formData:any, formDirective:FormGroupDirective) {
    if (this.transitionForm.valid) {
      if (this.timedTransitionType) {
        const TimedTransition = new transitionsModel(formData);
        TimedTransition.contractID = 2;
        TimedTransition.transitionTypeName = "Timed";
        TimedTransition.sourceWorkflowStatesID = 0;
        const clause = formData.clause.map((item: any, index: number) => new Clauses(item, index, 0, 0));
        TimedTransition.clauses = clause;
        this.getDestinationWorkflowstatesName(parseInt(formData.destinationWorkflowStatesID));
        TimedTransition.transitionsName = `Timed -${this.destinationName}`
        TimedTransition.sourceWorkflowStatesID = this.data.workflowStateID;
        TimedTransition.qualityControlModel = null;
        const automaticTransitionsModel = {
          "createUserID": 0,
          "updateUserID": 0,
          "createDatetime": "2022-06-08T05:07:55.591Z",
          "updateDatetime": "2022-06-08T05:07:55.591Z",
          "isDeleted": "N",
          "automaticTransitionsID": 0,
          "categoriesID": parseInt(formData.categoriesID),
          "contractID": 2,
          "duration": formData.duration,
          "transitionsID": 0,
          "relativeDateTypesID": parseInt(formData.relativeDateTypesID),
          "active": true,
          "deferTransition": false,
          "relativeDateDayTypesID": parseInt(formData.relativeDateDayTypesID),
          "defaultTransition": true,
          "isEventExpire": false
        }
        TimedTransition.automaticTransitionsModel = automaticTransitionsModel
        this.apiService.post(`Transitions/addTransitions`, { transitionsModel: TimedTransition }, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            this.successMsg = this.translate.instant("Record Added Successfully", { msg: msg });
            this.notificationService.success(this.successMsg);
            this.transitionForm.reset();
            //formDirective.resetForm();
            this.transitionDialogRef.close();
          }
        })
      } else if (this.conditionalTransitionType) {
        const TimedTransition = new transitionsModel(formData);
        TimedTransition.contractID = 2;
        TimedTransition.transitionTypeName = 'Conditional';
        TimedTransition.sourceWorkflowStatesID = 0;
        TimedTransition.transitionsName = '';
        const clause = formData.clause.map((item: any, index: number) => new Clauses(item, index, 0, 0))
        TimedTransition.clauses = clause;
        if (TimedTransition.enableQualityControl) {
          TimedTransition.qualityControlModel = new QualityControlModel(formData, 0);
          TimedTransition.qualityControlModel.qualityControlsID = 0;
          TimedTransition.qualityControlModel.qualityControlsName = `${this.data.currentQueueName} To ${formData.destinationWorkflowStatesID}`;
        } else TimedTransition.qualityControlModel = null;
        this.getDestinationWorkflowstatesName(parseInt(formData.destinationWorkflowStatesID))
        TimedTransition.transitionsName = `Conditional -${this.destinationName}`
        TimedTransition.sourceWorkflowStatesID = this.data.workflowStateID;
        TimedTransition.automaticTransitionsModel = null;
        this.apiService.post(`Transitions/addTransitions`, { transitionsModel: TimedTransition }, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            this.successMsg = this.translate.instant("Record Added Successfully", { msg: msg });
            this.notificationService.success(this.successMsg);
            this.transitionForm.reset();
            //formDirective.resetForm();
            this.transitionDialogRef.close();
          }
        })
      }
    }
  }

  updateTransition(formData: any) {
    if (this.transitionForm.valid) {
      if (this.data.transitionsType == "Timed") {
        const TimedTransition = new transitionsModel(formData);
        TimedTransition.contractID = 2;
        TimedTransition.transitionsID = this.data.QData.transitionsID
        TimedTransition.transitionTypeName = "Timed";
        TimedTransition.transitionTypeID = this.data.QData.transitionTypeID;
        TimedTransition.sourceWorkflowStatesID = this.data.QData.sourceWorkflowStatesID;
        const clause = formData.clause.map((item: any, index: number) => new Clauses(item, index, this.data.QData.clauses[index]?.clausesID, this.data.QData.transitionsID));
        TimedTransition.clauses = clause;
        if(this.data.QData.clauses.length > TimedTransition.clauses.length){     //To delete extra clauses from transition
          for(let i = TimedTransition.clauses.length +1 ; i <= this.data.QData.clauses.length; i++) {
              this.data.QData.clauses[i-1].isDeleted ="Y";
              TimedTransition.clauses.push(this.data.QData.clauses[i-1]);
          }
        }
        this.getDestinationWorkflowstatesName(parseInt(formData.destinationWorkflowStatesID));
        TimedTransition.transitionsName = `Timed -${this.destinationName}`
        TimedTransition.qualityControlModel = null;
        const automaticTransitionsModel = {
          "createUserID": 0,
          "updateUserID": 0,
          "createDatetime": "2022-06-08T05:07:55.591Z",
          "updateDatetime": "2022-06-08T05:07:55.591Z",
          "isDeleted": "N",
          "automaticTransitionsID": this.data.QData.automaticTransitionsModel.automaticTransitionsID,
          "categoriesID": parseInt(formData.categoriesID),
          "contractID": 2,
          "duration": formData.duration,
          "transitionsID": this.data.QData.transitionsID,
          "relativeDateTypesID": parseInt(formData.relativeDateTypesID),
          "active": true,
          "deferTransition": false,
          "relativeDateDayTypesID": parseInt(formData.relativeDateDayTypesID),
          "defaultTransition": true,
          "isEventExpire": false
        }
        TimedTransition.automaticTransitionsModel = automaticTransitionsModel
        this.apiService.put(`Transitions/updateTransitions`, { transitionsModel: TimedTransition }, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            this.successMsg = this.translate.instant("Record Updated Successfully", { msg: msg });
            this.notificationService.success(this.successMsg);
            this.transitionForm.reset();
            //formDirective.resetForm();
            this.transitionDialogRef.close();
          }
        })
      } else if (this.data.transitionsType == "Conditional") {
        const TimedTransition = new transitionsModel(formData);
        TimedTransition.contractID = 2;
        TimedTransition.transitionsID = this.data.QData.transitionsID;
        TimedTransition.transitionTypeID = this.data.QData.transitionTypeID;
        TimedTransition.transitionTypeName = 'Conditional';
        TimedTransition.sourceWorkflowStatesID = this.data.QData.sourceWorkflowStatesID;
        TimedTransition.transitionsName = this.data.QData.transitionsName;
        const clause = formData.clause.map((item: any, index: number) => new Clauses(item, index, this.data.QData.clauses[index]?.clausesID, this.data.QData.transitionsID))
        TimedTransition.clauses = clause;
        if(this.data.QData.clauses.length > TimedTransition.clauses.length){     //To delete extra clauses from transition
          for(let i = TimedTransition.clauses.length +1 ; i <= this.data.QData.clauses.length; i++) {
              this.data.QData.clauses[i-1].isDeleted ="Y";
              TimedTransition.clauses.push(this.data.QData.clauses[i-1]);
          }
        }
        TimedTransition.qualityControlModel = new QualityControlModel(formData, this.data.QData.transitionsID);
        if (TimedTransition.enableQualityControl) {
          TimedTransition.qualityControlModel.qualityControlsName = `${this.data.currentQueueName} To ${formData.destinationWorkflowStatesID}`;
          if (this.data.QData.qualityControlModel) {
            TimedTransition.qualityControlModel.qualityControlsID = this.data.QData.qualityControlModel?.qualityControlsID;
          } else {
            TimedTransition.qualityControlModel.qualityControlsID = 0;
          }
        } else TimedTransition.qualityControlModel.isDeleted = "Y";
        this.getDestinationWorkflowstatesName(parseInt(formData.destinationWorkflowStatesID))
        TimedTransition.transitionsName = `Conditional -${this.destinationName}`
        TimedTransition.automaticTransitionsModel = null;
        this.apiService.put(`Transitions/updateTransitions`, { transitionsModel: TimedTransition }, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            this.successMsg = this.translate.instant("Record Updated Successfully", { msg: msg });
            this.notificationService.success(this.successMsg);
            this.transitionForm.reset();
            //formDirective.resetForm();
            this.transitionDialogRef.close();
          }
        })
      }
    }
  }

  addClause() {
    this.clause.push(this.createClauseFormGroup());
  }
  public close(value: any) {
    this.transitionDialogRef.close(value);
  }
  public confirm() {
    this.close(true);
  }
  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }
}
