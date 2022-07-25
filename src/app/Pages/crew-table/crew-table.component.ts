import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CrewTableModel } from 'src/app/Models/crew-table.interface';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-crew-table',
  templateUrl: './crew-table.component.html',
  styleUrls: ['./crew-table.component.scss']
})
export class CrewTableComponent implements OnInit {
  displayedColumns: string[] = ['crewCode', 'crewChief', 'crewType', 'crewAuthLevel', 'action'];
  public data: any;

  dataSource = new MatTableDataSource<CrewTableModel>();
  CrewForm!: FormGroup;

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
    this.CrewForm = new FormGroup({
      'crewCode': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      'crewChief': new FormControl(null, [Validators.required]),
      'crewType': new FormControl(""),
      'crewAuthLevel': new FormControl(""),
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


  get crewCode() {
    return this.CrewForm.get('crewCode') as FormControl;
  }
  get crewChief() {
    return this.CrewForm.get('crewChief') as FormControl;
  }

  get crewType() {
    return this.CrewForm.get('crewType') as FormControl;
  }
  get crewAuthLevel() {
    return this.CrewForm.get('crewAuthLevel') as FormControl;
  }

  getData() {
    this.apiService.get('bootAndTowCrew').subscribe(res => {
      if (res) {
        this.dataSource = new MatTableDataSource<CrewTableModel>(
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
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.crewCode.toLowerCase().includes(filter) || data.crewChief.toLowerCase().includes(filter) || data.crewType.toString().includes(filter) || data.crewAuthLevel.toString().includes(filter);

    };
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
        this.CrewForm.get("errorCode")?.setErrors({ invalidcode: "Error Code Incorrect" });
        return false;
      }
    }
    else {
      if (parseInt(val) <= 999999999 && parseInt(val) > 0) {
        console.log("correct");
        return true;
      } else {
        console.log("incorrect");
        this.CrewForm.get("crewCode")?.setErrors({ invalidcode: "Error Code Incorrect" });
        return false;
      }
    }
  }


  addCrew(data: any) {
    this.paginator.pageIndex = 0;
    this.searchString.nativeElement.value = ""
    this.sort.sort(
      { id: '', start: 'asc', disableClear: false }
    )
    if (this.CrewForm.valid) {
      const obj = {
        crewCode: data.crewCode,
        crewChief: data.crewChief,
        crewType: data.crewType,
        crewAuthLevel: data.crewAuthLevel,
      };
      this.apiService.post('bootAndTowCrew', obj).subscribe(
        (res) => {
          if (res.status == 'Success') {
            const msg = '';
            const code = res.details[0].code;
            this.successMsg = this.translate.instant('Record Added Successfully', {
              msg: msg,
            });
            this.notificationService.success(this.successMsg);
            this.CrewForm.reset();
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
    this.CrewForm.reset();
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
    this.CrewForm.controls['crewCode'].setValue(data.crewCode);
    this.CrewForm.controls['crewChief'].setValue(data.crewChief);
    this.CrewForm.controls['crewType'].setValue(data.crewType);
    this.CrewForm.controls['crewAuthLevel'].setValue(data.crewAuthLevel);
  }


  updateRecord(data: any) {
    this.searchString.nativeElement.value = ""
    if (this.CrewForm.valid) {
      const obj = {
        crewCode: data.crewCode,
        crewChief: data.crewChief,
        crewType: data.crewType,
        crewAuthLevel: data.crewAuthLevel,
        bootTowCrewId: this.editData.bootTowCrewId
      }
      // let params = new HttpParams();
      // params = params.append("phoneStatusId", this.phoneStatusId);
      this.apiService.put(`bootAndTowCrew?bootTowCrewId=${obj.bootTowCrewId}`, obj, false).subscribe(res => {
        if (res.status === 'Success') {
          this.showAddForm = false;
          this.CrewForm.reset();
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
      this.apiService.delete(`bootAndTowCrew?bootTowCrewId=${data.bootTowCrewId}`, false).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          const errcodes = res.details[0].code;
          this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.getData();
          this.showAddForm = false;
          this.CrewForm.reset();
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
        this.CrewForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.CrewForm.get("crewCode")?.setErrors({ invalid: "Crew Code Duplicate" });
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }
}


