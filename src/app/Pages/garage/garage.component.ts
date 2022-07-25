import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { GarageModel } from 'src/app/Models/Garage.Model';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.scss']
})
export class GarageComponent implements OnInit {
  displayedColumns: string[] = ['garageCode', 'garageName', 'garageAddress1', 'garageCity', 'garageStateId', 'garageZip', 'action'];
  public data: any;

  dataSource = new MatTableDataSource<GarageModel>();
  GarageForm!: FormGroup;

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
  garageState: any;
  stateProvincesId: any;
  stateTypes: any;
  garageList: any;


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
    this.GarageForm = new FormGroup({
      'bootTowGarageId': new FormControl(""),
      'garageCode': new FormControl("", [Validators.required]),
      'garageName': new FormControl("", [Validators.required]),
      'garageAddress1': new FormControl(""),
      'garageAddress2': new FormControl(""),
      'garageCity': new FormControl(""),
      "garageStateId": new FormControl(""),
      'garageZip': new FormControl("", Validators.pattern("^([0-9]{5}|[0-9]{9})$")),
      'garagephoneNumber': new FormControl(""),
      'garageEmail': new FormControl("", Validators.email),
    });

    this.getStateTypes();
  }
  getStateTypes() {
    this.apiService.get('getAllStateNamesAndId').subscribe(res => {
      this.stateTypes = res;
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

  stateSelect(event: any) {
    const result = this.stateTypes.filter((element: { stateProvincesId: any; }) => {
      return element.stateProvincesId === event.value;
    });
    // To set the value
    this.GarageForm.controls['garageStateId'].setValue(result[0].stateProvincesId);
  }


  getData() {
    this.apiService.get('bootAndTowGarage').subscribe(res => {
      this.garageList = res;
      if (res) {
        this.dataSource = new MatTableDataSource<GarageModel>(
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
      return data.garageCode.toLowerCase().includes(filter) || data.garageName.toLowerCase().includes(filter) || data.garageAddress1?.toString().includes(filter) || data.garageAddress2?.toString().includes(filter) || data.garageCity?.toString().includes(filter) || data.garageZip?.toString().includes(filter) || data.abbreviation?.toLowerCase().includes(filter);
    };
  }

  showAddFormPage() {
    this.showAddForm = true;
    this.addBtn = true;
    this.showEditForm = false;

  }
  cancelAdd_Save() {
    this.showAddForm = false;
    this.GarageForm.reset();
    this.searchString.nativeElement.value = "";
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.getData();

    this.notificationService.info(this.translate.instant('Process Cancelled'));

  }


  addRecord(data: any) {
    console.log(data);
    this.paginator.pageIndex = 0;
    this.searchString.nativeElement.value = ""
    this.sort.sort(
      { id: '', start: 'asc', disableClear: false }
    )
    if (this.GarageForm.valid) {
      const obj = {
        garageCode: data.garageCode,
        garageName: data.garageName,
        garageAddress1: data.garageAddress1,
        garageAddress2: data.garageAddress2,
        garageCity: data.garageCity,
        abbreviation: data.abbreviation,
        garageStateId: data.garageStateId,
        garageZip: data.garageZip,
        garagephoneNumber: data.garagephoneNumber,
        garageEmail: data.garageEmail
      };
      this.apiService.post('bootAndTowGarage', obj).subscribe(
        (res) => {
          if (res.status == 'Success') {
            const msg = '';
            const code = res.details[0].code;
            this.successMsg = this.translate.instant('Record Added Successfully', {
              msg: msg,
            });
            this.notificationService.success(this.successMsg);
            this.GarageForm.reset();
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
    this.GarageForm.controls['bootTowGarageId'].setValue(data.bootTowGarageId);
    this.GarageForm.controls['garageAddress1'].setValue(data.garageAddress1);
    this.GarageForm.controls['garageAddress2'].setValue(data.garageAddress2);
    this.GarageForm.controls['garageCity'].setValue(data.garageCity);
    this.GarageForm.controls['garageCode'].setValue(data.garageCode);
    this.GarageForm.controls['garageEmail'].setValue(data.garageEmail);
    this.GarageForm.controls['garageName'].setValue(data.garageName);
    this.GarageForm.controls['garageStateId'].setValue(data.garageStateId);
    this.GarageForm.controls['garageZip'].setValue(data.garageZip);
    this.GarageForm.controls['garagephoneNumber'].setValue(data.garagePhoneNumber);
  }

  updateRecord(data: any) {
    this.searchString.nativeElement.value = ""
    if (this.GarageForm.valid) {
      const obj = {
        bootTowGarageId: this.editData.bootTowGarageId,
        garageAddress1: data.garageAddress1,
        garageAddress2: data.garageAddress2,
        garageCity: data.garageCity,
        garageCode: data.garageCode,
        garageEmail: data.garageEmail,
        garageName: data.garageName,
        garageState: data.garageState,
        garageStateId: data.garageStateId,
        garageZip: data.garageZip,
        garagephoneNumber: data.garagephoneNumber
      }
      this.apiService.put(`bootAndTowGarage/${data.bootTowGarageId}`, obj, false).subscribe(res => {
        if (res.status === 'Success') {
          this.showAddForm = false;
          this.GarageForm.reset();
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
      this.apiService.delete(`bootAndTowGarage/${data.bootTowGarageId}`, false).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          const errcodes = res.details[0].code;
          this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.getData();
          this.showAddForm = false;
          this.GarageForm.reset();
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
        this.GarageForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.GarageForm.get("garageCode")?.setErrors({ invalid: "Garage Code Duplicate" });
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }


}
