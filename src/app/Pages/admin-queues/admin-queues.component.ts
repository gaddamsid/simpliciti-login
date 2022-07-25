import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective  } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ActionCategoriesModel, QueuesList, queuesModel } from 'src/app/Models/Admin-Queues.model';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EndBehaviorsComponent } from '../EndBehaviors/end-behaviors/end-behaviors.component';
import { QueueBehaviourComponent } from 'src/app/shared/Components/queue-behaviour/queue-behaviour.component';
import { QueuesActionCategoryComponent } from 'src/app/shared/Components/queues-action-category/queues-action-category.component';
import { CategoriesComponent } from '../action-and-categories/categories/categories.component';
import * as _ from 'lodash';
import { TransitionDialogComponent } from 'src/app/shared/Components/transition-dialog/transition-dialog.component';
export interface ActionsAndCategoriesModel {
  actionID: number;
  actionName: string;
  active: boolean;
  categoriesID: number
  categoryName: string;
  categoryPhaseType: string;
  categoryType: string;
  categoryTypeID: number;
  contractId: number;
  phasesID: number;
  queueName: string;
  queuesId: number ;
  actionCategoriesId: number;
  isEditing?: boolean;
}

@Component({
  selector: 'app-admin-queues',
  templateUrl: './admin-queues.component.html',
  styleUrls: ['./admin-queues.component.scss']
})
export class AdminQueuesComponent implements OnInit {
  @ViewChild('matRef') matRef!: MatSelect;
  @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!: ElementRef;
  dialogRef!: MatDialogRef<QueueBehaviourComponent>;
  ACdialogRef!: MatDialogRef<QueuesActionCategoryComponent>;
  transitionDialogRef!: MatDialogRef<TransitionDialogComponent>;
  displayedColumns: string[] = ['queuesName', 'queueTypesName', 'ageThreshold', 'statusEntranceThreshold','countThreshold', 'enabled', 'Action'];
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  queuesList!: QueuesList[];
  dataSource = new MatTableDataSource<QueuesList>();
  editData: any;
  searchData: any;
  QueuesForm!: FormGroup;
  QActionCategoryForm!: FormGroup;
  pageConfigObj: any;
  subscription: any;
  contractID:number = 2;
  queueTypesID!: number;
  queuesTypesName!: string;
  alertMsg: any;
  enableBehaviorsTab: boolean = false;
  successMsg: any;
  queueTypeNameList!:any;
  cloningQueues: any = [];
  disableCloning: boolean = false;
  currentQueueID!: number;
  listOfBahaviorsPerQ: any;
  catagoriesList:any;
  transitionTypeList: any;
  destinationList:any;
  relativeDateTypeList:any;
  dayTypeList:any;
  disableQueueID: any;
  actionsList: any;
  newActionFlag: boolean = false;
  workflowStateID: number = 0;
  updatingQueueRecord!: QueuesList;
  welcome: any;
  currentQueueName: any;
  selectClone: boolean = false;
  showButton: boolean = false;
  constructor(private apiService: ApiService,
    public translate: TranslateService,
    private matDialog: MatDialog,
    private language: LanguageService, private notificationService: ToastrService,private _liveAnnouncer: LiveAnnouncer,
    private validationService: ValidationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getQueues();
    this.language.sendLang.subscribe(lang => {
      if (lang != "") {
        this.appendLang(lang);
      }
    });
    this.QActionCategoryForm = new FormGroup({
      'actionsID': new FormControl('', [Validators.required]),
      'categoriesID': new FormControl('',[Validators.required]),
    })
    this.QueuesForm = new FormGroup({
      'queuesName': new FormControl('', [Validators.required]),
      'queueTypesName': new FormControl('',[Validators.required]),
      'ageThreshold': new FormControl(0),
      'statusEntranceThreshold': new FormControl(0),
      'countThreshold': new FormControl(0),
      'enabled': new FormControl(''),
      'cloneQueue': new FormControl(''),

      'registeredOwnerInformationEnabled': new FormControl(false),
      'coreImageDeleteEnabled': new FormControl(false),
      'editRegisteredOwnerInformationEnabled': new FormControl(false),
      'videoFrameCaptureEnabled': new FormControl(false),
      'doubleBlindEnabled': new FormControl(false),
      'coreImageRevertEnabled': new FormControl(false),
      'editVehicleInformationEnabled': new FormControl(false),
      'coreImageEditEnabled': new FormControl(false),
      'dmvReturnEnabled': new FormControl(false),
      'vehicleInformationEnabled': new FormControl(false),
      'licensePlateEditEnabled': new FormControl(false),
      'isVrLookup': new FormControl(false),
      'carryOverPreviousCategory': new FormControl(false),
      'skipEnabled': new FormControl(false),
      'previousDecisionEnabled': new FormControl(false),
      'plateExamplesEnabled': new FormControl(false),
      'drcEnabled': new FormControl(false),
      'dmvHistoryEnabled': new FormControl(false),
      'neighborListingEnabled': new FormControl(false)
      // 'front2': new FormControl(false),
      // 'front2': new FormControl(false),

    });
    this.apiService.get('Queues/getQueueTypes', true).subscribe(res => {
      this.queueTypeNameList = res;
    })
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  filterData() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.queuesName?.toLowerCase().includes(filter) ||
        data.queueTypesName?.toLowerCase().includes(filter) ||
        data.ageThreshold?.toString().includes(filter) || data.countThreshold?.toString().includes(filter) ||
        data.statusEntranceThreshold?.toString().includes(filter) || data.enabled?.toLowerCase().includes(filter)
    };
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
    this.QueuesForm.reset();
    this.QActionCategoryForm.reset();
    this.QueuesForm.get('queuesName')?.enable();
    this.showAddForm = false;
    this.newActionFlag = false;
    this.enableBehaviorsTab = false;
    this.disableCloning = false;
    this.selectClone = false;
    this.showEditForm = false;
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }
  showAddFormPage() {
    this.showAddForm = true;
    this.showButton = false;
    this.QueuesForm.get('queuesName')?.enable();
    
    //this.enableBehaviorsTab = false;
  }
  // getQueuesName(list) {
  //   list.map(element => {
  //     this.cloningQueues.push({name:element.queueTypesName, })
  //   })
  // }
  cloneQueue(event: any) {
    if(event.checked) {
      this.disableCloning  = true
      this.selectClone = true;
    } else {
      this.disableCloning = false
      this.selectClone = false;
      this.QueuesForm.controls['cloneQueue'].setValue('');
    }
  }
  
  getQueuesTypeID(e:any) {
    this.queueTypesID = e
    this.queuesTypesName = this.queueTypeNameList[e-1].queueTypesName
  }
  hideSaveOrUpdateButton(event:any) {
    if(event.index == 1) {
      this.showButton = true;
    } else this.showButton = false;
  }
  onQueueSelection(e:any, edit:boolean) {
    this.apiService.get(`Queues/getQueuesById?QueuesId=${e}`, true).subscribe(res => {
      if(res) {
        if(edit){
          this.QueuesForm.controls['queuesName'].setValue(res.queuesName);
          this.QueuesForm.get('queuesName')?.disable();
        }
        this.QueuesForm.get('queueTypesName')?.setValue(res.queueTypesID.toString());
        this.queueTypesID = res.queueTypesID;
        this.queuesTypesName = res.queueTypesName;
        this.QueuesForm.get('ageThreshold')?.setValue(res.ageThreshold);
        this.QueuesForm.get('statusEntranceThreshold')?.setValue(res.statusEntranceThreshold);
        this.QueuesForm.get('countThreshold')?.setValue(res.countThreshold);
        this.QueuesForm.get('enabled')?.setValue(res.enabled);
        this.QueuesForm.get('registeredOwnerInformationEnabled')?.setValue(res.registeredOwnerInformationEnabled);
        this.QueuesForm.get('coreImageDeleteEnabled')?.setValue(res.coreImageDeleteEnabled);
        this.QueuesForm.get('editRegisteredOwnerInformationEnabled')?.setValue(res.editRegisteredOwnerInformationEnabled);
        this.QueuesForm.get('videoFrameCaptureEnabled')?.setValue(res.videoFrameCaptureEnabled);
        this.QueuesForm.get('doubleBlindEnabled')?.setValue(res.doubleBlindEnabled);
        this.QueuesForm.get('coreImageRevertEnabled')?.setValue(res.coreImageRevertEnabled);
        this.QueuesForm.get('editVehicleInformationEnabled')?.setValue(res.editVehicleInformationEnabled);
        this.QueuesForm.get('coreImageEditEnabled')?.setValue(res.coreImageEditEnabled);
        this.QueuesForm.get('dmvReturnEnabled')?.setValue(res.dmvReturnEnabled);
        this.QueuesForm.get('vehicleInformationEnabled')?.setValue(res.vehicleInformationEnabled);
        this.QueuesForm.get('licensePlateEditEnabled')?.setValue(res.licensePlateEditEnabled);
        this.QueuesForm.get('isVrLookup')?.setValue(res.isVrLookup);
        this.QueuesForm.get('carryOverPreviousCategory')?.setValue(res.carryOverPreviousCategory);
        this.QueuesForm.get('skipEnabled')?.setValue(res.skipEnabled);
        this.QueuesForm.get('previousDecisionEnabled')?.setValue(res.previousDecisionEnabled);
        this.QueuesForm.get('plateExamplesEnabled')?.setValue(res.plateExamplesEnabled);
        this.QueuesForm.get('drcEnabled')?.setValue(res.drcEnabled);
        this.QueuesForm.get('dmvHistoryEnabled')?.setValue(res.dmvHistoryEnabled);
        this.QueuesForm.get('neighborListingEnabled')?.setValue(res.neighborListingEnabled);
      } else this.QueuesForm.reset();
    })
  }
  isAllSelected() {
    return this.QueuesForm.get('registeredOwnerInformationEnabled')?.value &&
    this.QueuesForm.get('coreImageDeleteEnabled')?.value &&
    this.QueuesForm.get('editRegisteredOwnerInformationEnabled')?.value &&
    this.QueuesForm.get('videoFrameCaptureEnabled')?.value &&
    this.QueuesForm.get('doubleBlindEnabled')?.value &&
    this.QueuesForm.get('coreImageRevertEnabled')?.value &&
    this.QueuesForm.get('editVehicleInformationEnabled')?.value &&
    this.QueuesForm.get('coreImageEditEnabled')?.value &&
    this.QueuesForm.get('dmvReturnEnabled')?.value &&
    this.QueuesForm.get('vehicleInformationEnabled')?.value &&
    this.QueuesForm.get('licensePlateEditEnabled')?.value &&
    this.QueuesForm.get('isVrLookup')?.value &&
    this.QueuesForm.get('carryOverPreviousCategory')?.value &&
    this.QueuesForm.get('skipEnabled')?.value &&
    this.QueuesForm.get('previousDecisionEnabled')?.value &&
    this.QueuesForm.get('plateExamplesEnabled')?.value &&
    this.QueuesForm.get('drcEnabled')?.value &&
    this.QueuesForm.get('dmvHistoryEnabled')?.value &&
    this.QueuesForm.get('neighborListingEnabled')?.value 
  }
  isIndeterminateSelected() {
    return !this.isAllSelected() && ( this.QueuesForm.get('registeredOwnerInformationEnabled')?.value ||
    this.QueuesForm.get('coreImageDeleteEnabled')?.value ||
    this.QueuesForm.get('editRegisteredOwnerInformationEnabled')?.value ||
    this.QueuesForm.get('videoFrameCaptureEnabled')?.value ||
    this.QueuesForm.get('doubleBlindEnabled')?.value ||
    this.QueuesForm.get('coreImageRevertEnabled')?.value ||
    this.QueuesForm.get('editVehicleInformationEnabled')?.value ||
    this.QueuesForm.get('coreImageEditEnabled')?.value ||
    this.QueuesForm.get('dmvReturnEnabled')?.value ||
    this.QueuesForm.get('vehicleInformationEnabled')?.value ||
    this.QueuesForm.get('licensePlateEditEnabled')?.value ||
    this.QueuesForm.get('isVrLookup')?.value ||
    this.QueuesForm.get('carryOverPreviousCategory')?.value ||
    this.QueuesForm.get('skipEnabled')?.value ||
    this.QueuesForm.get('previousDecisionEnabled')?.value ||
    this.QueuesForm.get('plateExamplesEnabled')?.value ||
    this.QueuesForm.get('drcEnabled')?.value ||
    this.QueuesForm.get('dmvHistoryEnabled')?.value ||
    this.QueuesForm.get('neighborListingEnabled')?.value )
  }
  selectAll(e:any) {
    if(e.checked) {
      this.QueuesForm.get('registeredOwnerInformationEnabled')?.setValue(true);
      this.QueuesForm.get('coreImageDeleteEnabled')?.setValue(true);
      this.QueuesForm.get('editRegisteredOwnerInformationEnabled')?.setValue(true);
      this.QueuesForm.get('videoFrameCaptureEnabled')?.setValue(true);
      this.QueuesForm.get('doubleBlindEnabled')?.setValue(true);
      this.QueuesForm.get('coreImageRevertEnabled')?.setValue(true);
      this.QueuesForm.get('editVehicleInformationEnabled')?.setValue(true);
      this.QueuesForm.get('coreImageEditEnabled')?.setValue(true);
      this.QueuesForm.get('dmvReturnEnabled')?.setValue(true);
      this.QueuesForm.get('vehicleInformationEnabled')?.setValue(true);
      this.QueuesForm.get('licensePlateEditEnabled')?.setValue(true);
      this.QueuesForm.get('isVrLookup')?.setValue(true);
      this.QueuesForm.get('carryOverPreviousCategory')?.setValue(true);
      this.QueuesForm.get('skipEnabled')?.setValue(true);
      this.QueuesForm.get('previousDecisionEnabled')?.setValue(true);
      this.QueuesForm.get('plateExamplesEnabled')?.setValue(true);
      this.QueuesForm.get('drcEnabled')?.setValue(true);
      this.QueuesForm.get('dmvHistoryEnabled')?.setValue(true);
      this.QueuesForm.get('neighborListingEnabled')?.setValue(true);
    } else {
      this.QueuesForm.get('registeredOwnerInformationEnabled')?.setValue(false);
      this.QueuesForm.get('coreImageDeleteEnabled')?.setValue(false);
      this.QueuesForm.get('editRegisteredOwnerInformationEnabled')?.setValue(false);
      this.QueuesForm.get('videoFrameCaptureEnabled')?.setValue(false);
      this.QueuesForm.get('doubleBlindEnabled')?.setValue(false);
      this.QueuesForm.get('coreImageRevertEnabled')?.setValue(false);
      this.QueuesForm.get('editVehicleInformationEnabled')?.setValue(false);
      this.QueuesForm.get('coreImageEditEnabled')?.setValue(false);
      this.QueuesForm.get('dmvReturnEnabled')?.setValue(false);
      this.QueuesForm.get('vehicleInformationEnabled')?.setValue(false);
      this.QueuesForm.get('licensePlateEditEnabled')?.setValue(false);
      this.QueuesForm.get('isVrLookup')?.setValue(false);
      this.QueuesForm.get('carryOverPreviousCategory')?.setValue(false);
      this.QueuesForm.get('skipEnabled')?.setValue(false);
      this.QueuesForm.get('previousDecisionEnabled')?.setValue(false);
      this.QueuesForm.get('plateExamplesEnabled')?.setValue(false);
      this.QueuesForm.get('drcEnabled')?.setValue(false);
      this.QueuesForm.get('dmvHistoryEnabled')?.setValue(false);
      this.QueuesForm.get('neighborListingEnabled')?.setValue(false);
    }
  }
  getQueues() {
    this.apiService.get(`Queues/getAllQueues?ContractID=${this.contractID}`, true).subscribe(res => {
      this.queuesList = res.map((element: any) => {
        return new QueuesList(element)
      });
      this.dataSource = new MatTableDataSource<any>(this.queuesList.reverse());
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
     // this.getQueuesName(this.queuesList)
    })

    this.apiService.get('Transitions/getAllTransitionTypes', true).subscribe(res => {
      if (res) {
        this.transitionTypeList = res;
      }
    });

    this.apiService.get(`WorkflowStates/getWorkflowStatesById?ContractID=${this.contractID}`, true).subscribe(res => {
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
  }
  addNewQueues(formData: any,formDirective:FormGroupDirective) {
    this.listOfBahaviorsPerQ = [];
    this.transitionsListPerQueue=[];
    this.actionCategoryList = [];
    this.disableQueueID = 0;
    this.sort.sort(
      { id: '', start: 'asc', disableClear: false }
    )
    if (this.QueuesForm.valid) {
      const newQueue = new queuesModel(formData)
      newQueue.queueTypesID = this.queueTypesID;
      newQueue.queueTypesName = this.queuesTypesName
      this.apiService.post('Queues/addQueues',  {queuesModel:newQueue}, true).subscribe((res:any) => {
        if (res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant(res.details[0].code, { msg: msg });
          this.notificationService.success(this.successMsg);
          this.disableCloning = false;
          this.paginator.pageIndex = 0;
          this.enableBehaviorsTab = true;
          this.selectClone = false;
          this.searchString.nativeElement.value = "";
          this.getQueues();
          this.currentQueueID = res.data.queuesID;
          this.workflowStateID = res.data.workflowStatesID
          this.disableQueueID = res.data.queuesID;
          this.actionCategoryList = [];
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }
  getACDropdownValues() {
    this.apiService.get(`ActionCategories/getActionCategories`, true).subscribe(res => {
      this.catagoriesList = res.sort((a:any, b:any) => a.categoryName.localeCompare(b.categoryName));
    })
    this.apiService.get(`Actions/getAllActions?ContractID=${this.contractID}`, true).subscribe(res => {
      this.actionsList = res.sort((a:any, b:any) => a.actionsName.localeCompare(b.actionsName));
    })
  }
  AddActions() {
    this.QActionCategoryForm.reset();
    this.getACDropdownValues();
    this.newActionFlag = !this.newActionFlag;
  }
  openModal() {
    debugger
    this.dialogRef = this.matDialog.open(QueueBehaviourComponent, {
      "width": '5000px',
      "maxHeight": '90vh',
      "data": {behaviorNew: true, behaviorEdit: true, bahaviorQueuesID: this.currentQueueID, workflowStateID:this.workflowStateID, QData:{}},
      "autoFocus": false
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.listOfBahaviorsPerQ = result.reverse();
    })
  }
  EditBehavior(item:any) {
    this.dialogRef = this.matDialog.open(QueueBehaviourComponent, {
      "width": '2000px',
      "maxHeight": '90vh',
      "data": {behaviorNew: true,  bahaviorQueuesID: this.currentQueueID, workflowStateID:this.workflowStateID, QData:{}},
      "autoFocus": false
    });
    this.dialogRef.componentInstance.getAllBehaviorTypes();
    //this.dialogRef.componentInstance.behaviorTypesName = item.behaviorTypesName;
    this.dialogRef.componentInstance.editIconClicked(item.behaviorsID);
    this.dialogRef.afterClosed().subscribe(result => {
      this.getAllBehaviorsPerQueues(this.currentQueueID);
    })
  }
  getAllBehaviorsPerQueues(id:number) {
    this.apiService.get(`Queues/GetAllBehaviorsByQueue?QueuesId=${id}`,true).subscribe(res => {
      this.listOfBahaviorsPerQ = res.reverse();
    })
  }
  DeleteBehavior(item:any) {
    const msgs = "";
    if (confirm(this.translate.instant("Are you sure to delete", { msg: msgs }))) {
      this.apiService.delete(`EndBehaviors/deleteEndBehaviors?BehaviorsID=${item.behaviorsID}`,null, true).subscribe(res => {
        if (res.status == "Success") {
          this.getAllBehaviorsPerQueues(this.currentQueueID);
          const msg = "";
          this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }

  disableQueue() {
    this.apiService.put(`Queues/toggleQueues?QueuesId=${this.disableQueueID}`,null, true).subscribe(res => {
      if(res.status == "Success"){
        const msg = "";
        this.disableQueueID = 0;
        this.showEditForm = false;
        this.successMsg = this.translate.instant("Record Disabled Successfully", { msg: msg });
        this.notificationService.success(this.successMsg);

      }
    })
  }
  editIconClicked(rowData: QueuesList) {
    this.showButton = false;
    this.currentQueueName = rowData.queuesName;
    this.listOfBahaviorsPerQ = [];
    this.actionCategoryList = [];
    this.onQueueSelection(rowData.queuesID, true);
    this.showEditForm = true;
    this.enableBehaviorsTab = true;
    this.workflowStateID = rowData.workflowStatesID;
    this.updatingQueueRecord = rowData;
    this.currentQueueID = rowData.queuesID;
    this.disableQueueID = rowData.queuesID;
    this.getActionsColumnList(rowData.queuesID);
    this.getTransitionsList(rowData.queuesID);
  }
  getActionsColumnList(id:number) {
    this.apiService.get(`Queues/GetAllBehaviorsByQueue?QueuesId=${id}`,true).subscribe(res => {
      this.listOfBahaviorsPerQ = res;
    })
    this.apiService.get(`Queues/GetAllActionCategoriesByQueue?QueuesId=${id}`,true).subscribe(res => {
      this.actionCategoryList = res;
      this.actionCategoryList.forEach(item => {
        item.isEditing = false;
      })
    })
  }
  updateQueues(formData: any) {
    if (this.QueuesForm.valid) {
      const newQueue = new queuesModel(formData)
      newQueue.queueTypesID = _.toNumber(this.updatingQueueRecord.queueTypesID);
      newQueue.queueTypesName = this.updatingQueueRecord.queueTypesName;
      newQueue.queuesID = this.updatingQueueRecord.queuesID;
      newQueue.workflowStatesID = this.updatingQueueRecord.workflowStatesID;
      newQueue.queueOrder = this.updatingQueueRecord.queueOrder;
      newQueue.queuesName = this.currentQueueName;
      this.apiService.put(`Queues/updateQueues`, {queuesModel:newQueue},true).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.QueuesForm.reset();
          this.getQueues();
          this.showAddForm = false;
          this.showEditForm = false;
          this.selectClone = false;
          this.searchString.nativeElement.value = ""
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    } else {
      this.QueuesForm.setErrors
    }
  }
  deleteQueue(id: number) {
    const msgs = "";
    if (confirm(this.translate.instant("Are you sure to delete", { msg: msgs }))) {
      this.apiService.delete(`Queues/deleteQueues?QueuesId=${id}`, id, true).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.getQueues();
          this.showAddForm = false;
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }
  // <--------------------------------ACTION AND CATEGORY-------------------------------------------------------->
  actionCategoryList:ActionsAndCategoriesModel[] = [];
  newActionsID!:number;
  updatingActionCategoriesId!: number;
  getAllActionsCategoriesPerQueue() {
    this.apiService.get(`Queues/GetAllActionCategoriesByQueue?QueuesId=${this.contractID}`, true).subscribe(res =>{
      this.actionCategoryList = res;
    })
  }
  changeAction(event:any){
    if(event == 'Add Action') {
      this.ACdialogRef = this.matDialog.open(QueuesActionCategoryComponent, {
        "width": '5000px',
        "maxHeight": '90vh',
        "data": {actionForm: true,
          categoryForm: false,
          bahaviorQueuesID: this.currentQueueID,
          QData: {}},
        "autoFocus": false
      });
      this.ACdialogRef.afterClosed().subscribe(result => {
        this.getACDropdownValues();
        this.QActionCategoryForm.reset();
        this.newActionFlag = !this.newActionFlag;
        this.newActionsID = result.data.actionsID;
        this.QActionCategoryForm.get('actionsID')?.setValue(this.newActionsID.toString());
      })
    }
  }
  changeCategory(event:any){
    if(event == 'Add Category') {
      this.ACdialogRef = this.matDialog.open(QueuesActionCategoryComponent, {
        "width": '5000px',
        "maxHeight": '90vh',
        "data": {actionForm: false,
          categoryForm: true,
          bahaviorQueuesID: this.currentQueueID,
          QData: {}},
        "autoFocus": false
      });
      this.ACdialogRef.afterClosed().subscribe(result => {
        this.getACDropdownValues();
        this.newActionFlag = !this.newActionFlag;
      })
    }
  }
  addActionCategoryForQueue(ACFormData: any, formDirective:FormGroupDirective) {
    if(this.QActionCategoryForm.valid) {
      const ACData = new ActionCategoriesModel(ACFormData);
      ACData.queuesID = this.currentQueueID;
      ACData.contractID= this.contractID;
      ACData.actionCategoriesId = 0;
      this.currentQueueName = ACFormData.queuesName;
      this.apiService.post(`ActionCategories/addActionCategoryForQueues`, {actionCategoriesModel: ACData}, true).subscribe(res => {
        const QActionName = this.actionsList.filter((item:any) => item.actionsID == res.data.actionsID)[0].actionsName;
        const QCategoryName= this.catagoriesList.filter((item:any) => item.categoriesID == res.data.categoriesID)[0].categoryName;
        if(QActionName && QCategoryName) {
        const obj: ActionsAndCategoriesModel ={
            actionID: res.data.actionsID,
            actionName: QActionName,
            active: true,
            categoriesID: res.data.categoriesID,
            categoryName: QCategoryName,
            categoryPhaseType: '',
            categoryType: '',
            categoryTypeID: 0,
            contractId: res.data.contractID,
            phasesID: 0,
            queueName: '',
            actionCategoriesId:res.data.actionCategoriesID,
            queuesId: res.data.queuesID,
        };
        this.actionCategoryList.push(obj);
        }
        this.QActionCategoryForm.reset();
        formDirective.resetForm();
      })
    }

  }
  deleteQueueActionCategory(item: any) {
    const msgs = "";
    if(confirm(this.translate.instant("Are You Sure You Want To Delete?", { msg: msgs }))) {
      this.apiService.delete(`ActionCategories/deleteActionCategoryForQueues?ActionCategoriesId=${item.actionCategoriesId}`,null, true).subscribe(res => {
        if(res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.getActionsColumnList(item.queuesId);
       }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }
  EditActionCategory(item: any) {
    this.getACDropdownValues();
    item.isEditing = true;
    this.updatingActionCategoriesId = item.actionCategoriesId
    this.QActionCategoryForm.controls['actionsID'].setValue(item.actionID.toString());
    this.QActionCategoryForm.controls['categoriesID'].setValue(item.categoriesID.toString());
  }
  cancelEditingActionCategory() {
    this.QActionCategoryForm.reset();
    this.actionCategoryList.forEach(item => {
      item.isEditing = false;
    })
  }
  updateActionCategoryForQueue(ACFormData: any, formDirective:FormGroupDirective) {
    if(this.QActionCategoryForm.valid) {
      const ACData = new ActionCategoriesModel(ACFormData);
      ACData.queuesID = this.currentQueueID;
      ACData.contractID= this.contractID;
      ACData.actionCategoriesId = this.updatingActionCategoriesId;
      this.apiService.put(`ActionCategories/updateActionCategoryForQueues`, {actionCategoriesModel: ACData}, true).subscribe(res => {
        this.QActionCategoryForm.reset();
        formDirective.resetForm();
        this.getActionsColumnList(res.data.queuesID);
      })
    }

  }
  // <--------------------------------TRANSITION BLOCK-------------------------------------------------------->
  transitionsListPerQueue:any;
  getTransitionsList(queuesID: number) {
    this.apiService.get(`Queues/GetAllTransitionsByQueue?QueuesId=${queuesID}`, true).subscribe(res => {
      this.transitionsListPerQueue = res.reverse();
    })
  }
  openTransitionDialog() {
    this.transitionDialogRef = this.matDialog.open(TransitionDialogComponent, {
      "width": '5000px',
      "maxWidth": '90vw',
      "maxHeight": '90vh',
      "data": {timedTransitionType: true,
               transitionsType: '',
               queuesID: this.currentQueueID,
               editTransition:false,
               currentQueueName:this.currentQueueName,
               workflowStateID:this.workflowStateID,
               QData:{}},
      "autoFocus": false
    });
    this.transitionDialogRef.afterClosed().subscribe(result => {
      this.getTransitionsList(this.currentQueueID);
    })
    
  }
  delteTransition(id:number) {
    const msgs = "";
    if(confirm(this.translate.instant("Are You Sure You Want To Delete?", { msg: msgs }))) {
      this.apiService.delete(`Transitions/deleteTransitions?TransitionsID=${id}`,null, true).subscribe(res => {
        if(res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.getTransitionsList(this.currentQueueID);
       }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }
  EditTransition(id:number) {
    this.apiService.get(`Transitions/getTransitionsById?transitionsId=${id}`, true).subscribe(res => {
        switch (res.transitionTypeID) {
          case 2:
            this.transitionDialogRef = this.matDialog.open(TransitionDialogComponent, {
              "width": '5000px',
              "maxWidth": '90vw',
              "maxHeight": '90vh',
              "data": {timedTransitionType: true, transitionsType: "Timed", editTransition:true, queuesID: this.currentQueueID, workflowStateID:this.workflowStateID, QData:res},
              "autoFocus": false
            });
            this.transitionDialogRef.componentInstance.getTransitionDropdowns();
            this.transitionDialogRef.componentInstance.editTransitions(res);
            this.transitionDialogRef.afterClosed().subscribe(result => {
              this.getTransitionsList(this.currentQueueID);
            })
            break;
          case 1:
            this.transitionDialogRef = this.matDialog.open(TransitionDialogComponent, {
              "width": '5000px',
              "maxWidth": '90vw',
              "maxHeight": '90vh',
              "data": {timedTransitionType: true, transitionsType: "Conditional", editTransition:true, queuesID: this.currentQueueID, workflowStateID:this.workflowStateID, QData:res},
              "autoFocus": false
            });
            this.transitionDialogRef.componentInstance.getTransitionDropdowns();
            this.transitionDialogRef.componentInstance.editTransitions(res);
            this.transitionDialogRef.afterClosed().subscribe(result => {
              this.getTransitionsList(this.currentQueueID);
            })
            break;
          default:
              break;
      }
    })
  }
   // ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//
   errorResponseCheck(error: any) {
    for (var i = 0; i < error.error.details.length; i++) {
      if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
        const msg = "";
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.QueuesForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.notificationService.error(this.welcome)
        if(translateCode == '5000_queueName') {
          this.QueuesForm.controls['queuesName'].setErrors({'invalid': this.welcome})
        }
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    
  }

}
}