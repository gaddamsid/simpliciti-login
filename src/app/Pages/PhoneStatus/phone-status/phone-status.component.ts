import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PhoneStatusModel } from 'src/app/Models/phone-status.interface';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-phone-status',
  templateUrl: './phone-status.component.html',
  styleUrls: ['./phone-status.component.scss']
})
export class PhoneStatusComponent implements OnInit {
  displayedColumns: string[] = ['phoneStatusCode', 'phoneStatusDesc', 'action'];
  public data: any;

  dataSource = new MatTableDataSource<PhoneStatusModel>();
  PhoneStatusForm!: FormGroup;

  @ViewChild('search') searchString!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  alertMsg: any;
  showAddForm: boolean = false;
  addBtn: boolean = true;
  showEditForm: boolean = false;
  successMsg: any;
  welcome: any;
  editData: any;
  phoneStatusId: any;


  constructor(
    public translate: TranslateService,
    private language: LanguageService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService) { }

  ngOnInit(): void {
    this.getData();
    this.language.sendLang.subscribe(lang => {
      if (lang != "") {
        this.appendLang(lang);
      }
    });
    this.PhoneStatusForm = new FormGroup({

      'phoneStatusCode': new FormControl("", [Validators.required]),
      'phoneStatusDesc': new FormControl("", [Validators.required]),

    });
  }
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

  get phoneStatusCode() {
    return this.PhoneStatusForm.get('phoneStatusCode') as FormControl;
  }
  get phoneStatusDesc() {
    return this.PhoneStatusForm.get('phoneStatusDesc') as FormControl;
  }

  getData() {

    this.apiService.get('phoneStatus').subscribe(res => {
      if (res) {
        this.dataSource = new MatTableDataSource<PhoneStatusModel>(
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
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toString();

  }
  filterData() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.phoneStatusCode.toString().includes(filter) || data.phoneStatusDesc.toString().includes(filter);

    };
  }

  addPhoneStatus(data: any) {

    this.paginator.pageIndex = 0;
    this.searchString.nativeElement.value = ""
    this.sort.sort(
      { id: '', start: 'asc', disableClear: false }
    )
    if (this.PhoneStatusForm.valid) {
      const obj = {
        active: 0,
        isDeleted: data.isDeleted,
        phoneStatusCode: data.phoneStatusCode,
        phoneStatusDesc: data.phoneStatusDesc,
        phoneStatusId: 0

      };
      this.apiService.post('phoneStatus', obj).subscribe(
        (res) => {
          if (res.status == 'Success') {
            const msg = '';
            const code = res.details[0].code;
            this.successMsg = this.translate.instant('Record Added Successfully', {
              msg: msg,
            });
            this.notificationService.success(this.successMsg);
            this.PhoneStatusForm.reset();
            if (this.dataSource.paginator) {
              this.dataSource.paginator.firstPage();
            }
            this.getData();
            this.showAddForm = false;
            this.showEditForm = false;

          }
        },
        error => {
          this.errorResponseCheck(error);
        })
    }

  }

  editIconClicked(data: any) {
    this.editData = data;
    this.showAddForm = true;
    this.showEditForm = true;
    this.addBtn = false;
    this.PhoneStatusForm.controls['phoneStatusCode'].setValue(data.phoneStatusCode);
    this.PhoneStatusForm.controls['phoneStatusDesc'].setValue(data.phoneStatusDesc);

  }

  updateRecord(data: any) {
    this.searchString.nativeElement.value = ""
    if (this.PhoneStatusForm.valid) {
      const obj = {
        "active": 0,
        "isDeleted": "N",
        "phoneStatusCode": data.phoneStatusCode,
        "phoneStatusDesc": data.phoneStatusDesc,
        "phoneStatusId": this.editData.phoneStatusId
      }
      // let params = new HttpParams();
      // params = params.append("phoneStatusId", this.phoneStatusId);
      this.apiService.put(`phoneStatus?phoneStatusId=${obj.phoneStatusId}`, obj, false).subscribe(res => {
        if (res.status === 'Success') {
          this.showAddForm = false;
          this.PhoneStatusForm.reset();
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
          this.getData();
          const msg = '';
          this.welcome = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.welcome);
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }

  deleteRecord(data: any) {
    const msgs = "";
    if (confirm(this.translate.instant("Are you sure to delete", { msg: msgs }))) {
      this.apiService.delete(`phoneStatus?phoneStatusId=${data.phoneStatusId}`, false).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          const errcodes = res.details[0].code;
          this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.getData();
          this.showAddForm = false;
          this.PhoneStatusForm.reset();
        }
      }, (error) => {
        this.errorResponseCheck(error);
      })

    }
  }

  showAddFormPage() {
    this.showAddForm = true;
    this.addBtn = true;
    this.showEditForm = false;
  }
  cancelAdd_Save() {
    this.showAddForm = false;
    this.PhoneStatusForm.reset();
    this.searchString.nativeElement.value = "";
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.getData();
    this.notificationService.info(this.translate.instant('Process Cancelled'));

  }

  // ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//
  errorResponseCheck(error: any) {

    for (var i = 0; i < error.error.details.length; i++) {
      if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
        const msg = "";
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.PhoneStatusForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.PhoneStatusForm.get("phoneStatusCode")?.setErrors({ invalid: "Phone Status Code Duplicate" });
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }

}
