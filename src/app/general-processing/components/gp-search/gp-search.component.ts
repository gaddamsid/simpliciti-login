import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { Entity } from '../../models/entity.model';
import { EventData } from '../../models/event.model';
import { PaginationControls } from '../../models/pagination-controls.model';
import { GPStateService } from '../../services/g-p-state.service';
import { GPService } from '../../services/g-p.service';

@Component({
  selector: 'app-gp-search',
  templateUrl: './gp-search.component.html',
  styleUrls: ['./gp-search.component.scss']
})

export class GpSearchComponent implements OnInit {

  @Input() paginationDetails!: PaginationControls;
  isShow = false;
  searchForm!: FormGroup;
  advanceSearchForm!: FormGroup;
  searchResults!: { events: EventData[], entity: Entity[] };
  statusList: Array<any> = [];
  categoryList: Array<any> = [];
  locationList: Array<any> = [];
  juridictionList: Array<any> = [];
  queueList: Array<any> = [];
  userList: Array<any> = [];
  stateList: Array<any> = [];
  courtList: Array<any> = [];
  approvingOfficerList: Array<any> = [];
  isLoading = false;
  violationMinDate!: Date;
  violationMaxDate!: Date;

  constructor(private router: Router, private fb: FormBuilder,
    private notificationService: ToastrService,
    public translate: TranslateService,
    private language: LanguageService,
    private apiService: ApiService,
    private gpStateService: GPStateService,
    private gpService: GPService) { }

  ngOnInit(): void {
    this.gpStateService.clearSearchResults();
    this.searchForm = this.fb.group({
      citationNumber: [''],
      eventId: [null],
      licenseNumber: [''],
      name: [''],
      plateNumber: [''],
      zipCode: ['', [Validators.minLength(5)]],
      driverType: [''],
    });
    this.loadAdvanceSearchForm();
    this.language.sendLang.subscribe(lang => {
      if (lang != '') {
        this.translate.use(lang);
      }
    });
    this.getDropdownData();
    this.getApprovingOfficers();
    this.gpStateService.isFormEnable$.subscribe(s => {
      this.updateBasicFormEnable();
    });
    this.gpStateService.isLoading$.subscribe(s => {
      this.isLoading = s;
    });
    this.gpStateService.isShow$.subscribe(s => {
      this.isShow = s;
    });
  }

  loadAdvanceSearchForm() {
    this.advanceSearchForm = this.fb.group({
      court: [{ value: '', disabled: true }],
      scheduleTime: [{ value: '', disabled: true }],
      defaultJudgement: [{ value: '', disabled: true }],
      noticeDate: [{ value: '', disabled: true }],

      workFlowQueuesId: [''],
      workflowStateId: [''],
      categoriesId: [''],
      locationsId: [''],
      deploymentId: [''],
      address: [''],
      city: [''],
      stateProvincesId: [''],
      approvingOfficerId: [''],
      lane: [''],
      jurisdictionId: [''],
      batchId: [''],
      workFlowUserId: [''],
      paymentPlanId: [''],
      amberRangeFrom: [''],
      amberRangeTo: [''],
      redRangeFrom: [''],
      redRangeTo: [''],
      speedRangeFrom: [''],
      speedRangeTo: [''],
      searchTicketLevel: [''],

      violationDateRangeFrom: [''],
      violationDateRangeTo: [''],
    });
    this.violationMinDate = new Date("1900-01-01");
    this.violationMaxDate = new Date("2099-01-01");
  }

  //#region disabling the fields based on the user entry

  onCitationNumberChange(s: any) {
    if (s.target.value?.length > 0) {
      this.searchForm.get('eventId')?.disable();
      this.searchForm.get('licenseNumber')?.disable();
      this.searchForm.get('name')?.disable();
      this.searchForm.get('plateNumber')?.disable();
      this.searchForm.get('zipCode')?.disable();
      this.searchForm.get('driverType')?.disable();
    } else {
      this.searchForm.get('eventId')?.enable();
      this.searchForm.get('licenseNumber')?.enable();
      this.searchForm.get('name')?.enable();
      this.searchForm.get('plateNumber')?.enable();
      this.searchForm.get('zipCode')?.enable();
      this.searchForm.get('driverType')?.enable();
    }
  }
  onEventIdChange(s: any) {
    if (s.target.value?.length > 0) {
      this.searchForm.get('citationNumber')?.disable();
      this.searchForm.get('licenseNumber')?.disable();
      this.searchForm.get('name')?.disable();
      this.searchForm.get('plateNumber')?.disable();
      this.searchForm.get('zipCode')?.disable();
      this.searchForm.get('driverType')?.disable();
    } else {
      this.searchForm.get('citationNumber')?.enable();
      this.searchForm.get('licenseNumber')?.enable();
      this.searchForm.get('name')?.enable();
      this.searchForm.get('plateNumber')?.enable();
      this.searchForm.get('zipCode')?.enable();
      this.searchForm.get('driverType')?.enable();
    }
  }
  onLicenseChange(s: any) {
    if (s.target.value?.length > 0) {
      this.searchForm.get('citationNumber')?.disable();
      this.searchForm.get('eventId')?.disable();
      this.searchForm.get('name')?.disable();
      this.searchForm.get('plateNumber')?.disable();
      this.searchForm.get('zipCode')?.disable();
      this.searchForm.get('driverType')?.disable();
    } else {
      this.searchForm.get('citationNumber')?.enable();
      this.searchForm.get('eventId')?.enable();
      this.searchForm.get('name')?.enable();
      this.searchForm.get('plateNumber')?.enable();
      this.searchForm.get('zipCode')?.enable();
      this.searchForm.get('driverType')?.enable();
    }
  }
  onPlateNumberChange(s: any) {
    if (s.target.value?.length > 0) {
      this.searchForm.get('citationNumber')?.disable();
      this.searchForm.get('licenseNumber')?.disable();
      this.searchForm.get('eventId')?.disable();
      this.searchForm.get('name')?.disable();
      this.searchForm.get('zipCode')?.disable();
      this.searchForm.get('driverType')?.disable();
    } else {
      this.searchForm.get('citationNumber')?.enable();
      this.searchForm.get('licenseNumber')?.enable();
      this.searchForm.get('eventId')?.enable();
      this.searchForm.get('name')?.enable();
      this.searchForm.get('zipCode')?.enable();
      this.searchForm.get('driverType')?.enable();
    }
  }
  onNameorZipChange(s: any) {
    if (s.target.value?.length > 0) {
      this.searchForm.get('citationNumber')?.disable();
      this.searchForm.get('licenseNumber')?.disable();
      this.searchForm.get('eventId')?.disable();
      this.searchForm.get('plateNumber')?.disable();
    } else if (!this.searchForm.get('name')?.value && !this.searchForm.get('zipCode')?.value) {
      this.searchForm.get('citationNumber')?.enable();
      this.searchForm.get('licenseNumber')?.enable();
      this.searchForm.get('eventId')?.enable();
      this.searchForm.get('plateNumber')?.enable();
    }
  }
  //#endregion

  toggleStatus() {
    this.isShow = !this.isShow;
    this.updateBasicFormEnable();
  }
  updateBasicFormEnable() {
    if (this.isShow) {
      this.searchForm.get('citationNumber')?.disable();
      this.searchForm.get('licenseNumber')?.disable();
      this.searchForm.get('eventId')?.disable();
      this.searchForm.get('name')?.disable();
      this.searchForm.get('zipCode')?.disable();
      this.searchForm.get('driverType')?.disable();
      this.searchForm.get('plateNumber')?.disable();
    } else {
      this.searchForm.get('citationNumber')?.enable();
      this.searchForm.get('licenseNumber')?.enable();
      this.searchForm.get('eventId')?.enable();
      this.searchForm.get('name')?.enable();
      this.searchForm.get('zipCode')?.enable();
      this.searchForm.get('driverType')?.enable();
      this.searchForm.get('plateNumber')?.enable();
    }
  }

  get formValue() { return this.searchForm.value; }

  onSearch(): void {
    if (!(this.formValue?.citationNumber ||
      this.formValue?.eventId ||
      this.formValue?.licenseNumber ||
      this.formValue?.name ||
      this.formValue?.plateNumber ||
      this.formValue?.zipCode)
    ) {
      this.notificationService.error(this.translate.instant('Please enter atleast one parameter for search result',
        { msg: 'Please enter atleast one parameter for search result' }))
      return;
    }
    if (this.formValue?.zipCode) {
      if (!this.formValue?.name) {
        this.notificationService.error(this.translate.instant('Please enter Name', { msg: 'Please enter Name' }));
        return;
      }
    }
    this.searchResults = { events: [], entity: [] };
    if (this.searchForm.valid) {
      this.gpStateService.changePagination({ totalRecords: 0, pageSize: 10, currentPage: 0 });
      this.gpStateService.onSearch(this.formValue);
    } else {
      this.searchForm.markAsDirty();
      this.searchForm.markAllAsTouched();
    }

  }
  get advanceSearchFormValue() {
    return this.advanceSearchForm.value;
  }

  onClickAdvanceSearch() {
    if (!(this.advanceSearchFormValue.workFlowQueuesId ||
      this.advanceSearchFormValue.workflowStateId ||
      this.advanceSearchFormValue.categoriesId ||
      this.advanceSearchFormValue.locationsId ||
      this.advanceSearchFormValue.deploymentId ||
      this.advanceSearchFormValue.address ||
      this.advanceSearchFormValue.city ||
      this.advanceSearchFormValue.stateProvincesId ||
      this.advanceSearchFormValue.approvingOfficerId ||
      this.advanceSearchFormValue.lane ||
      this.advanceSearchFormValue.jurisdictionId ||
      this.advanceSearchFormValue.batchId ||
      this.advanceSearchFormValue.workFlowUserId ||
      this.advanceSearchFormValue.paymentPlanId ||
      this.advanceSearchFormValue.amberRangeFrom ||
      this.advanceSearchFormValue.amberRangeTo ||
      this.advanceSearchFormValue.redRangeFrom ||
      this.advanceSearchFormValue.redRangeTo ||
      this.advanceSearchFormValue.speedRangeFrom ||
      this.advanceSearchFormValue.speedRangeTo ||
      this.advanceSearchFormValue.violationDateRangeFrom ||
      this.advanceSearchFormValue.violationDateRangeTo)
    ) {
      this.notificationService.error(this.translate.instant('Please enter atleast one parameter for search result',
        { msg: 'Please enter atleast one parameter for search result' }))
      return;
    }
    this.searchResults = { events: [], entity: [] };
    if (this.advanceSearchForm.valid) {
      this.gpStateService.changePagination({ totalRecords: 0, pageSize: 10, currentPage: 0 });
      this.gpStateService.onAdvanceSearch(this.advanceSearchFormValue);
    }
  }

  getDropdownData() {
    this.apiService.get('WorkflowStates/getAllWorkflowStates', true).subscribe(res => {
      this.statusList = res;
      this.statusList?.sort(function (a, b) {
        if (!a.workflowStatesName) {
          return 1;
        } else if (!b.workflowStatesName) {
          return -1;
        } else {
          var nameA = a?.workflowStatesName?.replace(/ /g, '').toString()?.toUpperCase();
          var nameB = b?.workflowStatesName?.replace(/ /g, '').toString()?.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }
      });
    });
    this.apiService.get('Categories/getCategoriesById/?ContractID=2', true).subscribe(res => {
      this.categoryList = res;
      this.categoryList?.sort(function (a, b) {
        if (!a.categoriesName) {
          return 1;
        } else if (!b.categoriesName) {
          return -1;
        } else {
          var nameA = a?.categoriesName?.replace(/ /g, '').toString()?.toUpperCase();
          var nameB = b?.categoriesName?.replace(/ /g, '').toString()?.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }
      });
    });
    this.apiService.get('StateProvinces/getAllStateProvinces', true).subscribe(res => {
      this.stateList = res;
      this.stateList?.sort(function (a, b) {
        if (!a.stateProvincesName) {
          return 1;
        } else if (!b.stateProvincesName) {
          return -1;
        } else {
          var nameA = a?.stateProvincesName?.replace(/ /g, '').toString()?.toUpperCase();
          var nameB = b?.stateProvincesName?.replace(/ /g, '').toString()?.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }
      });
    });
    this.apiService.get('Locations/getAllLocationsMaster', true).subscribe(res => {
      this.locationList = res;
      this.locationList?.sort(function (a, b) {
        if (!a.locationsName) {
          return 1;
        } else if (!b.locationsName) {
          return -1;
        } else {
          var nameA = a?.locationsName?.replace(/ /g, '').toString()?.toUpperCase();
          var nameB = b?.locationsName?.replace(/ /g, '').toString()?.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }
      });
    });
    this.apiService.get('Jurisdictions/getAllJurisdictions', true).subscribe(res => {
      this.juridictionList = res;
      this.juridictionList?.sort(function (a, b) {
        if (!a.jurisdictionsName) {
          return 1;
        } else if (!b.jurisdictionsName) {
          return -1;
        } else {
          var nameA = a?.jurisdictionsName?.replace(/ /g, '').toString()?.toUpperCase();
          var nameB = b?.jurisdictionsName?.replace(/ /g, '').toString()?.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }
      });
    });
    this.apiService.get('Queues/getAllQueues/?ContractID=2', true).subscribe(res => {
      this.queueList = res;
      this.queueList?.sort(function (a, b) {
        if (!a.queuesName) {
          return 1;
        } else if (!b.queuesName) {
          return -1;
        } else {
          var nameA = a?.queuesName?.replace(/ /g, '').toString()?.toUpperCase();
          var nameB = b?.queuesName?.replace(/ /g, '').toString()?.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }
      });
    });
    this.apiService.get('User/getAllUsers', true).subscribe(res => {
      this.userList = res;
      this.userList?.sort(function (a, b) {
        if (!a.userName) {
          return 1;
        } else if (!b.userName) {
          return -1;
        } else {
          var nameA = a?.userName?.replace(/ /g, '').toString()?.toUpperCase();
          var nameB = b?.userName?.replace(/ /g, '').toString()?.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }
      });
    });
  }

  getApprovingOfficers() {
    this.gpService.get('AdvanceSearch/getApprovingOfficers', true).subscribe(results => {
      this.approvingOfficerList = results;
      this.approvingOfficerList?.sort(function (a, b) {
        if (!a.badgeOfficerName) {
          return 1;
        } else if (!b.badgeOfficerName) {
          return -1;
        } else {
          var nameA = a?.badgeOfficerName?.replace(/ /g, '').toString()?.toUpperCase();
          var nameB = b?.badgeOfficerName?.replace(/ /g, '').toString()?.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }
      });
    },
      error => console.error
    );
  }
  get isAdvanceSearch() {
    return !this.formValue?.citationNumber &&
      !this.formValue?.eventId &&
      !this.formValue?.licenseNumber &&
      !this.formValue?.name &&
      !this.formValue?.plateNumber &&
      !this.formValue?.zipCode;
  }
  onClearAdvanceSearch() {
    this.loadAdvanceSearchForm();
  }
}
