import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { JuridictionModel } from 'src/app/Models/jurisdictioninterface';
import { JurisdictionService } from 'src/app/Services/Jurisdiction/jurisdiction.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';

@Component({
  selector: 'app-jurisdiction',
  templateUrl: './jurisdiction.component.html',
  styleUrls: ['./jurisdiction.component.scss']
})

export class JurisdictionComponent implements OnInit {
  displayedColumns: string[] = ['jurisdictionsName', 'jurisdictionCode', 'jurisdictionsDmvCode', 'action'];
  @ViewChild('search') searchString!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  jurisdictionsForm!: FormGroup
  dataSource = new MatTableDataSource<JuridictionModel>();
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  alertMsg!: string;
  successMsg!: string;
  welcome: any;
  juriTypes: any;
  showDataTable: boolean = true;
  JurisdictionNew!: JuridictionModel;
  editData!: JuridictionModel;
  addBtn: boolean = true;
  JuridictionModel!: JuridictionModel;
  constructor(public translate: TranslateService,
    private headerSection: LanguageService,
    private fb: FormBuilder,
    private JurisdictionService: JurisdictionService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService) { }

  ngOnInit(): void {
    this.getAllJurisdictions();
    this.headerSection.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    this.jurisdictionsForm = new FormGroup({
      'jurisdictionsName': new FormControl("", [Validators.required, Validators.maxLength(50)]),
      'jurisdictionCode': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'jurisdictionsDmvCode': new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9_ ]*$"), Validators.maxLength(150)]),
    });
  }
  //<<---------------------------------------------Sorting-------------------------------->>
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  //<<---------------------------------------------Sorting Ends-------------------------------->>
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterData(): void {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.jurisdictionsName?.toLowerCase().includes(filter) || data.jurisdictionCode?.toString() === filter || data.jurisdictionsDmvCode?.toLowerCase().includes(filter);
    };
  }

  get jurisdictionsName() {
    return this.jurisdictionsForm.get('jurisdictionsName') as FormControl;
  }
  get jurisdictionCode() {
    return this.jurisdictionsForm.get('jurisdictionCode') as FormControl;
  }
  get jurisdictionsDmvCode() {
    return this.jurisdictionsForm.get('jurisdictionsDmvCode') as FormControl;
  }


  getAllJurisdictions(): void {
    this.JurisdictionService.getAllJurisdictions().subscribe(res => {
      this.juriTypes = res;
      this.dataSource = new MatTableDataSource<JuridictionModel>(this.juriTypes.reverse());
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
    })
  }

  addjurisdictions(data: any) {
    this.paginator.pageIndex = 0;
    this.searchString.nativeElement.value = ""
    this.sort.sort(
      { id: '', start: 'asc', disableClear: false }
    )
    if (this.jurisdictionsForm.valid) {
      this.JurisdictionNew = new JuridictionModel({
        "jurisdictionsID": 0,
        "contractID": 1,
        "active": true,
        "jurisdictionsName": data.jurisdictionsName.trim(),
        "jurisdictionCode": data.jurisdictionCode,
        "jurisdictionsDmvCode": data.jurisdictionsDmvCode
      });
      this.JurisdictionService.addJurisdictions({ JuridictionModel: this.JurisdictionNew }).subscribe((res: any) => {
        if (res.status === "Success") {
          const msg = "";
          this.successMsg = this.translate.instant(res.details[0].code, { msg: msg });
          this.notificationService.success(this.successMsg);
          this.getAllJurisdictions();
          this.jurisdictionsForm.reset();
          this.showAddForm = false;
          this.showDataTable = true;
          this.searchString.nativeElement.value = ""
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }

  editJuri(data: any) {
    console.log(data);
    this.editData = data;
    this.showAddForm = true;
    this.showEditForm = true;
    this.addBtn = false;
    this.jurisdictionsForm.controls['jurisdictionsName'].setValue(data.jurisdictionsName);
    this.jurisdictionsForm.controls['jurisdictionCode'].setValue(data.jurisdictionCode);
    this.jurisdictionsForm.controls['jurisdictionsDmvCode'].setValue(data.jurisdictionsDmvCode);

  }

  updateJuri(data: any) {
    console.log(data);
    if (this.jurisdictionsForm.valid) {
      const obj = {
        "juridictionModel": {
          "jurisdictionsID": this.editData.jurisdictionsID,
          "contractID": this.editData.contractID,
          "active": this.editData.active,
          "jurisdictionsName": data.jurisdictionsName,
          "jurisdictionCode": data.jurisdictionCode,
          "jurisdictionsDmvCode": data.jurisdictionsDmvCode,
        }
      }
      this.JurisdictionService.updateJurisdictions(obj).subscribe(res => {
        console.log(res);
        if (res.status == 'Success') {
          this.showAddForm = false;
          this.jurisdictionsForm.reset();
          this.searchString.nativeElement.value = ""
          this.getAllJurisdictions();
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
    this.jurisdictionsForm.reset();
    this.searchString.nativeElement.value = ""
    this.getAllJurisdictions();
    this.notificationService.info(this.translate.instant('Process Cancelled'));
  }



  toggleType(id: number, status: boolean) {
    const msgs = "";
    if (status) {
      if (confirm(this.translate.instant(`Are you sure you want to Enable the Jurisdictions`, { msg: msgs }))) {

        this.JurisdictionService.toggleJuriState(id).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Jurisdictions Enabled Successfully", { msg: msgs }));
            this.getAllJurisdictions();
          }
        })

      }
    } else {
      if (confirm(this.translate.instant(`Are you sure you want to Disable the Jurisdictions`, { msg: msgs }))) {

        this.JurisdictionService.toggleJuriState(id).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Jurisdictions Disabled Successfully", { msg: msgs }));
            this.getAllJurisdictions();
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
        this.jurisdictionsForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.jurisdictionsForm.get("jurisdictionCode")?.setErrors({ invalid: "Jurisdiction Code Duplicate" });
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }

}
