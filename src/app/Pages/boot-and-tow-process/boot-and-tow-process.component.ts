import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { get } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { BootAndTowProcess, UpdateBTProcess } from 'src/app/Models/Boot&TowProcess.Model';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-boot-and-tow-process',
  templateUrl: './boot-and-tow-process.component.html',
  styleUrls: ['./boot-and-tow-process.component.scss']
})
export class BootAndTowProcessComponent implements OnInit {

  BTProcessList!:BootAndTowProcess[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!: ElementRef;
  displayedColumns: string[] = ['processCode', 'processType', 'processLongName', 'processShortName', 'rules', 'status', 'Action'];
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  dataSource = new MatTableDataSource<BootAndTowProcess>();
  alertMsg!: string;
  successMsg!: string;
  BTProcessForm!: FormGroup;
  updatingBTRecord!: BootAndTowProcess;
  welcome: any;
  processCodeList = ['BAU', 'BCO', 'BRA', 'BRR', 'BRC', 'TAR', 'TAU', 'TCO', 'TRA', 'TRR', 'TRC','TR']
  pattern = "^[a-zA-Z]+$";
  isDuplicate: boolean = false;

  constructor(public translate: TranslateService, private fb: FormBuilder,
    private headerSection: LanguageService,
    private _liveAnnouncer: LiveAnnouncer,
    private apiService: ApiService,
    private notificationService: ToastrService,) { }

  ngOnInit(): void {
    const collection = document.getElementsByTagName("mat-error");
    this.getBTProcessList();
    this.headerSection.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    // FORM CONTROLS
    this.BTProcessForm = this.fb.group({
      processCode: [null, [Validators.required]],
      processType: [null, [Validators.required, Validators.maxLength(3),Validators.pattern('^[a-zA-Z0-9\\s]*$')]],
      processLongName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9\\s]*$')]],
      processShortName: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[a-zA-Z0-9\\s]*$')]],
      rules: [null, [Validators.maxLength(20)]],
      status: ['']
    });
  }
  get processCode() {
    return this.BTProcessForm.get('processCode') as FormControl;
  }

  get processType() {
    return this.BTProcessForm.get('processType') as FormControl;
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
    this.BTProcessForm.controls['status'].setValue(event.status);
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
    this.BTProcessForm.reset();
    this.showAddForm = false;
    this.showEditForm = false;
    this.isDuplicate = false;
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }
  editIconClicked(rowData: BootAndTowProcess) {
    this.showEditForm = true;
    this.updatingBTRecord = rowData;
    this.BTProcessForm.patchValue({
      processCode: get(this.updatingBTRecord, 'processCode'),
      processType: get(this.updatingBTRecord, 'processType'),
      processLongName: get(this.updatingBTRecord, 'processLongName'),
      processShortName: get(this.updatingBTRecord, 'processShortName'),
      rules: get(this.updatingBTRecord, 'rules'),
      status: get(this.updatingBTRecord, 'status'),
    })
  }
  onFildChange(e:any) {
    if(this.isDuplicate){
      this.BTProcessForm.get('processCode')?.setErrors(null);
      this.BTProcessForm.get('processType')?.setErrors(null);
    }
    this.isDuplicate = false
  }
  showAddFormPage() {
    this.showAddForm = true;
  }
  filterData(): void {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.processCode?.toLocaleLowerCase().includes(filter)
        || data.processType?.toLocaleLowerCase().includes(filter)
        || data.processLongName?.toLocaleLowerCase().includes(filter)
        || data.processShortName?.toLocaleLowerCase().includes(filter)
        || data.rules?.toLocaleLowerCase().includes(filter)
        || data.status?.toLocaleLowerCase().includes(filter)
    };
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // -------------------------------------- --------- API OPERATIONS ----------------------------->
  getBTProcessList() {
    this.apiService.get('bootAndTowProcess').subscribe(res => {
      this.BTProcessList = res.map((element: any) => {
        return new BootAndTowProcess(element)
      });
      this.dataSource = new MatTableDataSource<BootAndTowProcess>(this.BTProcessList.reverse());
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

  addBTProcess(formData: any) {
    this.sort.sort(
      { id: '', start: 'asc', disableClear: false }
    )
    if (this.BTProcessForm.valid) {
      this.apiService.post('bootAndTowProcess', new UpdateBTProcess(formData)).subscribe((res:any) => {
        if (res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant(res.details[0].code, { msg: msg });
          this.notificationService.success(this.successMsg);
          this.BTProcessForm.reset();
          this.paginator.pageIndex = 0;
          this.getBTProcessList();
          this.showAddForm = false;
          this.isDuplicate = false;
          this.searchString.nativeElement.value = ""
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }
  updateBTProcess(formData: any) {
    if (this.BTProcessForm.valid) {
      this.apiService.put(`bootAndTowProcess/${this.updatingBTRecord.bootTowProcessId}`, new UpdateBTProcess(formData)).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.BTProcessForm.reset();
          this.getBTProcessList();
          this.showAddForm = false;
          this.showEditForm = false;
          this.isDuplicate = false;
          this.searchString.nativeElement.value = ""
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    } else {
      this.BTProcessForm.setErrors
    }
  }

  deleteBTProcess(id: number) {
    const msgs = "";
    if (confirm(this.translate.instant("Are you sure to delete", { msg: msgs }))) {
      this.apiService.delete(`bootAndTowProcess/${id}`, id).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.getBTProcessList();
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
      if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
        const msg = "";
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.BTProcessForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        if(error.error.details[i].fieldName + "_" + error.error.details[i].message === 'boottowprocess_DuplicateKey') {
          this.isDuplicate = true;
          this.BTProcessForm.get('processCode')?.setErrors({ invalid: 'Duplicate Record Found' });
          this.BTProcessForm.get('processType')?.setErrors({ invalid: 'Duplicate Record Found' });
        }
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }

}

