import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { constants } from 'buffer';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { CourtList, CourtModel } from 'src/app/Models/court.interface';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-court',
  templateUrl: './court.component.html',
  styleUrls: ['./court.component.scss']
})
export class CourtDetailsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'code', 'room', 'leadDays', 'streetLine1', 'jurisdictions', 'Action'];
  public data: any;

  dataSource = new MatTableDataSource<CourtList>();
  CourtForm!: FormGroup;

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
  stateResp: any = [];
  juridictionResp: any;
  courtList!: CourtList[];

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
    this.CourtForm = new FormGroup({
      'name': new FormControl("", [Validators.required]),
      'code': new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      'room': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(99)]),
      'jurisdictionsID': new FormControl(null, [Validators.required]),
      'streetLine1': new FormControl(""),
      'streetLine2': new FormControl(""),
      'city': new FormControl(""),
      'stateProvincesID': new FormControl(null, [Validators.required]),
      'zipCode': new FormControl(null, Validators.pattern("^([0-9]{5}|[0-9]{9})$")),
      'phone': new FormControl(null, Validators.minLength(11)),
      'leadDays': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(99)]),
    });

    this.apiService.get('StateProvinces/getAllStateProvinces', true).subscribe(res => {
      this.stateResp = res;
    });


    //To get Jurisdictions Dropdown Values
    this.apiService.get('Jurisdictions/getAllJurisdictions', true).subscribe(res => {
      this.juridictionResp = res;
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





  getData() {
    this.apiService.get('Courts/getAllCourts', true).subscribe(res => {
      if (res) {
        this.courtList = res.map((element: any) => {
          return new CourtList(element)
        });
        this.dataSource = new MatTableDataSource<CourtList>(
          this.courtList.reverse()
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
  // filterData() {
  //   this.dataSource.filterPredicate = function (data, filter: string): boolean {
  //     return data?.code?.toLowerCase().includes(filter)
  //       || data?.name?.toLocaleLowerCase().includes(filter)
  //       || data?.room?.toLowerCase().includes(filter)
  //       || data?.jurisdictions?.toLocaleLowerCase().includes(filter)
  //       || data?.streetLine1?.toLocaleLowerCase().includes(filter)
  //       || data?.streetLine2?.toLocaleLowerCase().includes(filter)
  //       || data?.leadDays?.toString().includes(filter);
  //   };
  // }

  filterData() {
    this.dataSource.filterPredicate = this.predicateFilter
  }
  predicateFilter(rowData: any, filterValue: string): boolean {
    return Object.keys(rowData).some(s => (rowData[s]?.toString().toLowerCase().includes(filterValue)))
  }

  showAddFormPage() {
    this.showAddForm = true;
    this.addBtn = true;
    this.showEditForm = false;

  }
  cancelAdd_Save() {
    this.showAddForm = false;
    this.CourtForm.reset();
    this.searchString.nativeElement.value = "";
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.getData();
    this.notificationService.info(this.translate.instant('Process Cancelled'));

  }


  addRecord(data: any) {
    this.paginator.pageIndex = 0;
    this.searchString.nativeElement.value = ""
    this.sort.sort(
      { id: '', start: 'asc', disableClear: false }
    )
    if (this.CourtForm.valid) {
      const obj = {
        createUserID: 0,
        updateUserID: 0,
        createDatetime: "2022-06-15T06:49:35.577Z",
        updateDatetime: "2022-06-15T06:49:35.577Z",
        isDeleted: "N",
        courtsID: 0,
        contractID: 0,
        active: true,
        county: null,
        name: data.name,
        code: data.code,
        room: data.room,
        jurisdictionsID: data.jurisdictionsID,
        streetLine1: data.streetLine1,
        streetLine2: data.streetLine2,
        city: data.city,
        stateProvincesID: data.stateProvincesID,
        zipCode: data.zipCode,
        phone: data.phone,
        leadDays: data.leadDays,
      };
      const payload = {
        courtsModel: obj
      }
      this.apiService.post('Courts/addCourts', payload, true).subscribe(
        (res) => {
          if (res.status == 'Success') {
            const msg = '';
            const code = res.details[0].code;
            this.successMsg = this.translate.instant('Record Added Successfully', {
              msg: msg,
            });
            this.notificationService.success(this.successMsg);
            this.CourtForm.reset();
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

  editCourt(ID: any) {
    this.apiService.get(`Courts/getCourtsById?courtsID=${ID}`, true).subscribe(res => {
      this.editData = res;
      this.showAddForm = true;
      this.showEditForm = true;
      this.addBtn = false;
      this.CourtForm.controls['name'].setValue(this.editData?.name);
      this.CourtForm.controls['code'].setValue(this.editData?.code);
      this.CourtForm.controls['room'].setValue(this.editData?.room);
      this.CourtForm.controls['streetLine1'].setValue(this.editData?.streetLine1);
      this.CourtForm.controls['streetLine2'].setValue(this.editData?.streetLine2);
      this.CourtForm.controls['city'].setValue(this.editData?.city);
      this.CourtForm.controls['zipCode'].setValue(this.editData?.zipCode);
      this.CourtForm.controls['phone'].setValue(this.editData?.phone);
      this.CourtForm.controls['leadDays'].setValue(this.editData?.leadDays);

      this.CourtForm.controls['stateProvincesID'].setValue(this.editData?.stateProvincesID.toString());
      this.CourtForm.controls['jurisdictionsID'].setValue(this.editData?.jurisdictionsID.toString());
    })

  }


  updateRecord(data: any) {
    this.searchString.nativeElement.value = ""
    if (this.CourtForm.valid) {
      const obj = {
        createUserID: 0,
        updateUserID: 0,
        createDatetime: "2022-06-15T06:49:35.577Z",
        updateDatetime: "2022-06-15T06:49:35.577Z",
        isDeleted: "N",
        courtsID: this.editData.courtsID,
        contractID: 0,
        active: this.editData.active,
        county: this.editData.county,
        name: data.name,
        code: data.code,
        room: data.room,
        jurisdictionsID: _.toNumber(data.jurisdictionsID),
        streetLine1: data.streetLine1,
        streetLine2: data.streetLine2,
        city: data.city,
        stateProvincesID: _.toNumber(data.stateProvincesID),
        zipCode: data.zipCode,
        phone: data.phone,
        leadDays: data.leadDays,
      }
      const payload = {
        courtsModel: obj
      }
      this.apiService.put(`Courts/updateCourts`, payload, true).subscribe(res => {
        if (res.status === 'Success') {
          this.showAddForm = false;
          this.CourtForm.reset();
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

  toggleCourt(data: any, status: boolean) {
    const msgs = "";
    if (status) {
      if (confirm(this.translate.instant(`Are you sure you want to Enable the Court?`, { msg: msgs }))) {

        this.apiService.put(`Courts/toggleCourts?courtsID=${data}`, data, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Court Enabled Successfully", { msg: msgs }));
            this.getData();
          }
        })

      }
    } else {
      if (confirm(this.translate.instant(`Are you sure you want to Disable the Court?`, { msg: msgs }))) {

        this.apiService.put(`Courts/toggleCourts?courtsID=${data}`, data, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Court Disabled Successfully", { msg: msgs }));
            this.getData();
          }
        })

      }
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
        this.CourtForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
        this.CourtForm.get("code")?.setErrors({ invalid: "Court Code Duplicate" });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
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
