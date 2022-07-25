import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { constant } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { AdminSectionsModel } from 'src/app/Models/AdminSection.interface';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-admin-sections',
  templateUrl: './admin-sections.component.html',
  styleUrls: ['./admin-sections.component.scss']
})


export class AdminSectionsComponent implements OnInit {
  displayedColumns: string[] = ['sectionsName', 'lastChangeDate', 'lastChangeUser', 'action'];
  public data: any;
  dataSource = new MatTableDataSource<AdminSectionsModel>();
  AdminSecForm!: FormGroup;

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
  sectionTypes: any;
  secondarycameraTypes: any;


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
    this.AdminSecForm = new FormGroup({
      sectionsName: new FormControl(null, [Validators.required]),
      sectionTypesName: new FormControl(null, [Validators.required]),
      lastChangeDate: new FormControl(),
      lastChangeUser: new FormControl(),
      sectionsDescription: new FormControl(),
      sectionsPrimaryAct: new FormControl(),
      sectionsPrimarySection: new FormControl(),
      sectionsPrimarySubSection: new FormControl(),
      sectionsSecondaryAct: new FormControl(),
      sectionsSecondaryCameraType: new FormControl(),
      sectionsSecondaryParagraph: new FormControl(),
      sectionsSecondarySection: new FormControl(),
      sectionsSecondarySubSection: new FormControl(),
    });
    this.apiService.get('Section/getAllSectionTypes', true).subscribe(res => {
      this.sectionTypes = res;
    });

    this.apiService.get('CameraType/getAllCameraType', true).subscribe(res => {
      this.secondarycameraTypes = res;
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

    this.apiService.get('Section/getAllSection', true).subscribe(res => {
      if (res) {
        this.dataSource = new MatTableDataSource<AdminSectionsModel>(
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
      let date = new Date(data.lastChangeDate);
      let loginDate = monthNames[date.getMonth()].substring(0, 3) + " " + date.getDate() + ", " + date.getFullYear() +
        ", " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      /*End Filter by date */
      return loginDate.toLowerCase().includes(filter) || data.sectionsName.toLowerCase().includes(filter) || data.lastChangeUser.toLowerCase().includes(filter);

    };
  }

  isShown: boolean = false; // hidden by default
  toggleShow() {
    this.isShown = !this.isShown;

  }




  sectionTypeslist(event: any) {

    const result = this.sectionTypes.filter((element: { sectionTypesID: any; }) => {
      return element.sectionTypesID === event.value;
    });
    // To set the value
    this.AdminSecForm.controls['sectionTypesName'].setValue(result[0].sectionTypesID);
  }
  SecondaryCameralist(event: any) {

    const result = this.secondarycameraTypes.filter((element: { cameraTypesName: any; }) => {
      return element.cameraTypesName === event.value;
    });
    // To set the value
    this.AdminSecForm.controls['sectionsSecondaryCameraType'].setValue(result[0].cameraTypesName);
  }


  addData(data: any) {
    // this.paginator.pageIndex = 0;
    this.searchString.nativeElement.value = ""
    this.sort.sort(
      { id: '', start: 'asc', disableClear: false }
    )
    if (this.AdminSecForm.valid) {
      const obj = {

        "sectionModel": {
          "createUserID": 3,
          "updateUserID": 3,
          "isDeleted": "N",
          "sectionsID": 0,
          "contractID": 0,
          "sectionsName": data.sectionsName,
          "active": true,
          "sectionTypesID": data.sectionTypesName,
          "sectionsDescription": data.sectionTypesName,
          "sectionsPrimaryAct": data.sectionsPrimaryAct,
          "sectionsPrimarySection": data.sectionsPrimarySection,
          "sectionsPrimarySubSection": data.sectionsPrimarySection,
          "sectionsSecondaryAct": data.sectionsSecondaryAct,
          "sectionsSecondaryCameraType": data.sectionsSecondaryCameraType,
          "sectionsSecondaryParagraph": data.sectionsSecondaryParagraph,
          "sectionsSecondarySection": data.sectionsSecondarySection,
          "sectionsSecondarySubSection": data.sectionsSecondarySubSection
        }

      };

      this.apiService.post('Section/addSection', obj, true).subscribe(
        (res) => {
          if (res.status == 'Success') {
            const msg = '';
            const code = res.details.code;
            this.successMsg = this.translate.instant('Record Added Successfully', {
              msg: msg,
            });
            this.notificationService.success(this.successMsg);
            this.AdminSecForm.reset();
            if (this.dataSource.paginator) {
              this.dataSource.paginator.firstPage();
            }
            this.getData();
            this.showAddForm = false;
            this.showEditForm = false;
            this.isShown = false;

          }
        },
        error => {
          this.errorResponseCheck(error);
        })
    }

  }

  editIconClicked(data: any) {
    this.editData = data;
    this.sectionTypes.sectionTypesID;
    this.showAddForm = true;
    this.showEditForm = true;
    this.addBtn = false;
    this.isShown = false;
    this.apiService.get(`Section/getSectionById?SectionsId=${data}`, true).subscribe((resp) => {

      this.AdminSecForm.controls['sectionsName'].setValue(resp.sectionsName);

      // To set the section Types value
      const sectionTypesName = this.sectionTypes.filter((element: { sectionTypesID: any; }) => {
        return element.sectionTypesID === resp.sectionTypesID;
      });
      this.AdminSecForm.controls['sectionTypesName'].setValue(resp.sectionTypesID);


      const secCamera = this.secondarycameraTypes.filter((element: { cameraTypesName: any; }) => {
        return element.cameraTypesName === resp.sectionsSecondaryCameraType;
      });
      this.AdminSecForm.controls['sectionsSecondaryCameraType'].setValue(resp.sectionsSecondaryCameraType);


      this.AdminSecForm.controls['sectionsPrimaryAct'].setValue(resp.sectionsPrimaryAct);
      this.AdminSecForm.controls['sectionsPrimaryAct'].setValue(resp.sectionsPrimaryAct);
      this.AdminSecForm.controls['sectionsPrimarySection'].setValue(resp.sectionsPrimarySection);
      this.AdminSecForm.controls['sectionsPrimarySubSection'].setValue(resp.sectionsPrimarySubSection);
      this.AdminSecForm.controls['sectionsSecondaryAct'].setValue(resp.sectionsSecondaryAct);
      this.AdminSecForm.controls['sectionsSecondaryParagraph'].setValue(resp.sectionsSecondaryParagraph);
      this.AdminSecForm.controls['sectionsSecondarySection'].setValue(resp.sectionsSecondarySection);
      this.AdminSecForm.controls['sectionsSecondarySubSection'].setValue(resp.sectionsSecondarySubSection);

    })

  }

  updateRecord(data: any) {
    this.searchString.nativeElement.value = ""
    if (this.AdminSecForm.valid) {
      const obj = {
        sectionModel: {
          createUserID: 3,
          updateUserID: 3,
          isDeleted: "N",
          sectionsID: this.editData,
          contractID: 0,
          sectionsName: data.sectionsName,
          active: true,
          sectionTypesID: data.sectionTypesName,
          sectionsDescription: data.sectionTypesName,
          sectionsPrimaryAct: data.sectionsPrimaryAct,
          sectionsPrimarySection: data.sectionsPrimarySection,
          sectionsPrimarySubSection: data.sectionsPrimarySubSection,
          sectionsSecondaryAct: data.sectionsSecondaryAct,
          sectionsSecondaryCameraType: data.sectionsSecondaryCameraType,
          sectionsSecondaryParagraph: data.sectionsSecondaryParagraph,
          sectionsSecondarySection: data.sectionsSecondarySection,
          sectionsSecondarySubSection: data.sectionsSecondarySubSection
        }

      }
      this.apiService.put('Section/UpdateSection', obj, true).subscribe(res => {
        if (res.status === 'Success') {
          this.showAddForm = false;

          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
          this.AdminSecForm.reset();
          this.getData();
          this.isShown = false;

          const msg = '';
          this.welcome = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.welcome);
        }
      }, error => {
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

    this.searchString.nativeElement.value = "";
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.AdminSecForm.reset();
    this.isShown = false;

    this.getData();
    this.notificationService.info(this.translate.instant('Process Cancelled'));

  }


  toggleType(id: number, status: boolean) {
    const msgs = "";
    const obj = {
      sectionsId: id,
    };
    if (status) {
      if (confirm(this.translate.instant(`Are you sure you want to Enable the Admin Sections`, { msg: msgs }))) {

        this.apiService.put('Section/changeStatusSection', obj, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Admin Sections Enabled Successfully", { msg: msgs }));
            this.getData();
          }
        })

      }
    } else {
      if (confirm(this.translate.instant(`Are you sure you want to Disable the Admin Sections`, { msg: msgs }))) {

        this.apiService.put('Section/changeStatusSection', obj, true).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Admin Sections Disabled Successfully", { msg: msgs }));
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
        this.AdminSecForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.AdminSecForm.get("jurisdictionCode")?.setErrors({ invalid: "Duplicate jurisdictionCode" });
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }

}




