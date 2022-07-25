import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { WeatherTypeModel } from 'src/app/Models/weatherType.Model';
import { WeatherTypeService } from 'src/app/Services/WeatherTypes/weather-type.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'admin-weather-type',
  templateUrl: './weather-type.component.html',
  styleUrls: ['./weather-type.component.scss']
})
export class WeatherTypeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!: ElementRef;
  createWTForm!: FormGroup;
  weatherTypeNew!: WeatherTypeModel;
  alertMsg!: string;
  createWT: boolean = false;
  showAddForm: boolean = false;
  dataNotExist: boolean = false;
  weatherTypes: any;
  titleAlert: string = 'Please enter weather type';
  dataSource = new MatTableDataSource<WeatherTypeModel>();
  displayedColumns: string[] = ['weatherTypesName', 'Action'];
  successMsg!: string;
  updatingData!: WeatherTypeModel;
  showEditForm: boolean = false;
  showDataTable: boolean = true;
  toggle: boolean = false;
  welcome: any;

  constructor(public translate: TranslateService,
    private headerSection: LanguageService,
    private wtService: WeatherTypeService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService,

  ) { }

  ngOnInit(): void {
    this.getWeatherTypes();
    this.headerSection.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    this.createWTForm = new FormGroup({
      'weatherTypesName': new FormControl("", [Validators.required, Validators.maxLength(20), Validators.minLength(4)])
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
  get weatherTypesName() {
    return this.createWTForm.get('weatherTypesName') as FormControl
  }
  getWeatherTypes(): void {
    this.wtService.getWeatherTypes().subscribe(res => {
      this.weatherTypes = res;
      this.dataSource = new MatTableDataSource<WeatherTypeModel>(this.weatherTypes.reverse());
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterData(): void {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.weatherTypesName?.toLowerCase().includes(filter);
    };
  }
  cancelAddingWT() {
    this.showAddForm = false;
    this.showDataTable = true;
    this.showEditForm = false;
    this.alertMsg = "";
    this.successMsg = "";
    this.notificationService.info(this.translate.instant("Process Cancelled"));
    this.createWTForm.reset();
    this.createWTForm.setErrors(null);
    //this.getWeatherTypes();
  }

  createWeatherType() {
    this.createWTForm.reset();
    this.createWTForm.setErrors(null);
    this.showAddForm = true;
    this.showEditForm = false;
    this.showDataTable = false;
    this.alertMsg = "";
    this.successMsg = "";
  }
  toggleWeatherType(id: number, status: boolean) {
    const msgs = "";
    if (status) {
      if (confirm(this.translate.instant(`Are you sure you want to Enable the Weather Type?`, { msg: msgs }))) {
        const obj = {
          "weatherTypesId": id
        }
        this.wtService.toggleWeatherState(obj).subscribe(res => {
          if (res.status == "Success") {
            //const msg = "";
            //  const errcodes=res.details[0].code;
            //  this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Weather Type Enabled Successfully", { msg: msgs }));
            this.getWeatherTypes();
          }
        })

      }
    } else {
      if (confirm(this.translate.instant(`Are you sure you want to Disable the Weather Type?`, { msg: msgs }))) {
        const obj = {
          "weatherTypesId": id
        }
        this.wtService.toggleWeatherState(obj).subscribe(res => {
          if (res.status == "Success") {
            //const msg = "";
            //  const errcodes=res.details[0].code;
            //  this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Weather Type Disabled Successfully", { msg: msgs }));
            this.getWeatherTypes();
          }
        })

      }
    }
  }
  editWeatherType(data: WeatherTypeModel) {
    this.updatingData = data;
    this.createWTForm.controls['weatherTypesName'].setValue(this.updatingData.weatherTypesName);
    this.showAddForm = false;
    this.showEditForm = true;
    this.showDataTable = false;
  }
  saveWeatherType(wt: any) {
    //debugger
    if (this.createWTForm.valid && wt.weatherTypesName !== this.updatingData.weatherTypesName) {
      this.weatherTypeNew = new WeatherTypeModel({
        "createUserID": 0,
        "updateUserID": 0,
        "createDatetime": "2022-03-31T09:06:28.198Z",
        "updateDatetime": "2022-03-31T09:06:28.198Z",
        "weatherTypesId": this.updatingData.weatherTypesId,
        "contractId": 0,
        "isDeleted": 'N',
        "active": true,
        "weatherTypesName": wt.weatherTypesName
      });
      this.wtService.updateWeatherType({ weatherTypeModel: this.weatherTypeNew }).subscribe(
        res => {
          if (res.status === "Success") {
            const msgs = "";
            this.notificationService.success(this.translate.instant("Weather type updated successfully", { msg: msgs }));
            this.getWeatherTypes();
            this.showDataTable = true;
            this.showEditForm = false;
            this.createWTForm.reset();
            this.searchString.nativeElement.value = ""
          }
        }, error => this.errorResponseCheck(error))
    } else {
      this.notificationService.info("No data change found");
    }

  }

  addWeatherType(name: any) {
    this.sort.sort(               //To Disable the applied sorting so that the inserted record will appear at top
      { id: '', start: 'asc', disableClear: false }
    )
    if (this.createWTForm.valid) {
      this.weatherTypeNew = new WeatherTypeModel({
        "createUserID": 0,
        "updateUserID": 0,
        "createDatetime": "2022-03-31T09:06:28.198Z",
        "updateDatetime": "2022-03-31T09:06:28.198Z",
        "weatherTypesId": 0,
        "contractId": 0,
        "isDeleted": 'N',
        "active": true,
        "weatherTypesName": ""
      });
      this.weatherTypeNew.weatherTypesName = name.weatherTypesName.trim();
      if (this.createWTForm.valid) {
        this.wtService.createWeatherType({ WeatherTypeModel: this.weatherTypeNew }).subscribe((res: any) => {
          if (res.status === "Success") {
            const msg = "";
            this.successMsg = this.translate.instant(res.details[0].code, { msg: msg });
            this.notificationService.success(this.successMsg);
            this.paginator.pageIndex = 0;
            this.getWeatherTypes();
            this.createWTForm.reset();
            this.showAddForm = false;
            this.showDataTable = true;
            this.searchString.nativeElement.value = ""
          }
        }, error => this.errorResponseCheck(error))
      }
    }
  }

  // ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//
  errorResponseCheck(error: any) {
    for (var i = 0; i < error.error.details.length; i++) {
      if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
        const msg = "";
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.createWTForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.createWTForm.get('weatherTypesName')?.setErrors({ invalid: "Duplicate Record Found" });
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }
}