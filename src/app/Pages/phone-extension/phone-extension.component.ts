import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PhoneExtensionModel } from 'src/app/Models/PhoneExtension.interface';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-phone-extension',
  templateUrl: './phone-extension.component.html',
  styleUrls: ['./phone-extension.component.scss']
})

export class PhoneExtensionComponent implements OnInit {
  displayedColumns: string[] = ['phoneExt', 'seqNo', 'isActive', 'modifiedBy', 'modifiedOn', 'action'];
  public data: any;
  dataSource = new MatTableDataSource<PhoneExtensionModel>();
  PhoneExtForm!: FormGroup;
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
    this.PhoneExtForm = new FormGroup({
      'isActive': new FormControl(null, [Validators.required]),
      'phoneExt': new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      'seqNo': new FormControl(null, [Validators.maxLength(2)]),
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
  get phoneExt() {
    return this.PhoneExtForm.get('phoneExt') as FormControl;
  }
  get seqNo() {
    return this.PhoneExtForm.get('seqNo') as FormControl;
  }
  get isActive() {
    return this.PhoneExtForm.get('isActive') as FormControl;
  }
  get modifiedBy() {
    return this.PhoneExtForm.get('modifiedBy') as FormControl;
  }
  get modifiedOn() {
    return this.PhoneExtForm.get('modifiedOn') as FormControl;
  }

  getData() {
    this.apiService.get('phoneExtension').subscribe(res => {
      if (res) {
        this.dataSource = new MatTableDataSource<PhoneExtensionModel>(
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
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }


  filterData() {
    /*Filter by date */
    let monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      let date = new Date(data.modifiedOn);
      let loginDate = monthNames[date.getMonth()].substring(0, 3) + " " + date.getDate() + ", " + date.getFullYear() +
        ", " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      /*End Filter by date */
      return loginDate.toLowerCase().includes(filter) || data.phoneExt.toLowerCase().includes(filter) || data.seqNo.toString().includes(filter) || data.isActive.toLowerCase().includes(filter) || data.modifiedBy?.toLowerCase().includes(filter);

    };
  }
  addData(data: any) {
    // this.paginator.pageIndex = 0;
    this.searchString.nativeElement.value = ""
    this.sort.sort(
      { id: '', start: 'asc', disableClear: false }
    )
    if (this.PhoneExtForm.valid) {
      const obj = {
        isActive: data.isActive,
        phoneExt: data.phoneExt,
        seqNo: data.seqNo = "" ? 0 : data.seqNo,
      };
      this.apiService.post('phoneExtension', obj).subscribe(
        (res) => {
          if (res.status == 'Success') {
            const msg = '';
            const code = res.details[0].code;
            this.successMsg = this.translate.instant('Record Added Successfully', {
              msg: msg,
            });
            this.notificationService.success(this.successMsg);
            this.PhoneExtForm.reset();
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
  showAddFormPage() {
    this.showAddForm = true;
    this.addBtn = true;
    this.showEditForm = false;
  }
  cancelAdd_Save() {
    this.showAddForm = false;
    this.PhoneExtForm.reset();
    this.searchString.nativeElement.value = "";
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.getData();

    this.notificationService.info(this.translate.instant('Process Cancelled'));

  }

  editIconClicked(data: any) {
    this.editData = data;
    this.showAddForm = true;
    this.showEditForm = true;
    this.addBtn = false;
    this.PhoneExtForm.controls['isActive'].setValue(data.isActive);
    this.PhoneExtForm.controls['phoneExt'].setValue(data.phoneExt);
    this.PhoneExtForm.controls['seqNo'].setValue(data.seqNo);

  }

  updateRecord(data: any) {
    this.searchString.nativeElement.value = ""
    if (this.PhoneExtForm.valid) {
      const obj = {
        "phoneExt": data.phoneExt,
        "seqNo": data.seqNo,
        "isActive": data.isActive,
        "phoneExtensionId": this.editData.phoneExtensionId

      }
      this.apiService.put(`phoneExtension?phoneExtensionId=${obj.phoneExtensionId}`, obj, false).subscribe(res => {
        if (res.status === 'Success') {
          this.showAddForm = false;
          this.PhoneExtForm.reset();
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
      this.apiService.delete(`phoneExtension?phoneExtensionId=${data.phoneExtensionId}`, false).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          const errcodes = res.details[0].code;
          this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.getData();
          this.showAddForm = false;
          this.PhoneExtForm.reset();
        }
      }, (error) => {
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
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.PhoneExtForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.PhoneExtForm.get("phoneExt")?.setErrors({ invalid: "Phone Extensions Duplicate" });
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }

}




