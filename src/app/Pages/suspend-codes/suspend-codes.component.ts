import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { get } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { AddSuspendCode, SuspendCodeModel, UpdateSuspendCode } from 'src/app/Models/suspendCode.Model';
import { SuspendCodeService } from 'src/app/Services/SuspendCode/suspend-code.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';

@Component({
  selector: 'app-suspend-codes',
  templateUrl: './suspend-codes.component.html',
  styleUrls: ['./suspend-codes.component.scss']
})
export class SuspendCodesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!: ElementRef;
  displayedColumns: string[] = ['suspendCod', 'suspendClass', 'suspendNameLong', 'suspendName', 'suspendCodePriority', 'suspendType', 'suspendNumDays', 'active', 'Action'];
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  dataSource = new MatTableDataSource<SuspendCodeModel>();
  alertMsg!: string;
  successMsg!: string;
  suspendCodeForm!: FormGroup;
  badgeNumberList!: SuspendCodeModel[];
  updatingSuspendRecord!: SuspendCodeModel;
  welcome: any;
  pattern = "^[a-zA-Z]+$";

  constructor(public translate: TranslateService, private fb: FormBuilder,
    private headerSection: LanguageService,
    private suspend_service: SuspendCodeService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService,) { }

  ngOnInit(): void {
    const collection = document.getElementsByTagName("mat-error");
    this.getSuspendList();
    this.headerSection.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    // FORM CONTROLS
    this.suspendCodeForm = this.fb.group({
      suspendCod: [null, [Validators.required]],
      suspendCodePriority: [null, [Validators.required, Validators.maxLength(15)]],
      suspendName: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[a-zA-Z0-9\\s]*$')]],
      suspendType: ['', [Validators.required, Validators.maxLength(1), Validators.pattern('^[PTpt]*$')]],
      suspendNumDays: [null, [Validators.required, Validators.maxLength(3)]],
      active: [''],
      suspendNameLong: ['', [Validators.required, Validators.maxLength(20)]],
      suspendClass: ['', [Validators.maxLength(1), Validators.pattern("^[a-zA-Z]*$")]],
      calendarDays:[true]
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

  activeSelected(event: any) {
    this.suspendCodeForm.controls['active'].setValue(event.active);
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
    this.suspendCodeForm.reset();
    this.showAddForm = false;
    this.showEditForm = false;
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }
  editIconClicked(rowData: SuspendCodeModel) {
    this.showEditForm = true;
    this.updatingSuspendRecord = rowData;
    this.suspendCodeForm.patchValue({
      suspendCod: get(this.updatingSuspendRecord, 'suspendCod'),
      suspendCodePriority: get(this.updatingSuspendRecord, 'suspendCodePriority'),
      suspendName: get(this.updatingSuspendRecord, 'suspendName'),
      suspendType: get(this.updatingSuspendRecord, 'suspendType'),
      suspendNumDays: get(this.updatingSuspendRecord, 'suspendNumDays'),
      active: get(this.updatingSuspendRecord, 'active'),
      suspendNameLong: get(this.updatingSuspendRecord, 'suspendNameLong'),
      suspendClass: get(this.updatingSuspendRecord, 'suspendClass'),
      calendarDays: get(this.updatingSuspendRecord, 'calendarDays') === "N"? false: true
    })
  }
  showAddFormPage() {
    this.showAddForm = true;
    this.suspendCodeForm.controls['calendarDays'].setValue(true);
  }
  filterData(): void {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.suspendCod?.toString().includes(filter)
        || data.suspendClass?.toLocaleLowerCase().includes(filter)
        || data.suspendNameLong?.toLocaleLowerCase().includes(filter)
        || data.suspendName?.toLocaleLowerCase().includes(filter)
        || data.suspendCodePriority?.toString().includes(filter)
        || data.suspendType?.toLocaleLowerCase().includes(filter)
        || data.suspendNumDays?.toString().includes(filter)
        || data.active?.toLocaleLowerCase().includes(filter)
    };
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // -------------------------------------- --------- API OPERATIONS ----------------------------->
  getSuspendList() {
    this.suspend_service.getSuspendCode().subscribe(res => {
      this.badgeNumberList = res.map(element => {
        return new SuspendCodeModel(element)
      });
      this.dataSource = new MatTableDataSource<SuspendCodeModel>(this.badgeNumberList.reverse());
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

  addSuspendRecord(formData: any) {
    this.sort.sort(
      { id: '', start: 'asc', disableClear: false }
    )
    if (this.suspendCodeForm.valid) {
      this.suspend_service.addSuspendCode(new AddSuspendCode(formData)).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant(res.details[0].code, { msg: msg });
          this.notificationService.success(this.successMsg);
          this.suspendCodeForm.reset();
          this.paginator.pageIndex = 0;
          this.getSuspendList();
          this.showAddForm = false;
          this.searchString.nativeElement.value = ""
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }
  updateSuspendCodeRecord(formData: any) {
    if (this.suspendCodeForm.valid) {
      this.suspend_service.updateSuspendCode(new AddSuspendCode(formData), this.updatingSuspendRecord.suspendCodeTypeId).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.suspendCodeForm.reset();
          this.getSuspendList();
          this.showAddForm = false;
          this.showEditForm = false;
          this.searchString.nativeElement.value = ""
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    } else {
      this.suspendCodeForm.setErrors
    }
  }

  deleteSuspendCodeRecord(id: number) {
    const msgs = "";
    if (confirm(this.translate.instant("Are you sure to delete", { msg: msgs }))) {
      this.suspend_service.deleteSuspendCode(id).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.getSuspendList();
          this.showAddForm = false;
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }

  // ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//
  errorResponseCheck(error: any) {
    for (var i = 0; i < error.error.details.length; i++) {
      if (error.error.details[i].code == "5000" && error.error.details[i].message !== "DuplicateKey") {
        const msg = "";
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.suspendCodeForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        if(error.error.details[i].fieldName === 'suspendcodetype'){
          this.suspendCodeForm.get("suspendCod")?.setErrors({ invalid: "Duplicate Record Found" });
        }
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }

}
