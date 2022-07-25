import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { clientModel } from 'src/app/Models/client-management.Model';
import { ClientManagementService } from 'src/app/Services/ClientManagement/client-management.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.scss']
})
export class ClientManagementComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!: ElementRef;
  displayedColumns: string[] = ['clientsName', 'clientsShortName', 'stateProvincesID', 'timeZonesID', 'action'];
  dataSource = new MatTableDataSource<clientModel>();
  clientManagementForm !: FormGroup;
  showForm: boolean = false;
  data: any;
  successMsg!: string;
  titleAlert: string = 'This field is required';
  alertMsg!: string;
  welcome: any;
  addClientButton: boolean = true;
  editData: any;
  showEditForm: boolean = false;
  TimeZoneMaster: any;
  StateProvincesMaster: any;

  constructor(public translate: TranslateService,
    private language: LanguageService,
    private _liveAnnouncer: LiveAnnouncer,
    private clientManagementService: ClientManagementService,
    private notificationService: ToastrService
  ) { }

  ngOnInit(): void {

    this.getList();
    this.dataSource.paginator = this.paginator;
    //Language Code
    this.language.sendLang.subscribe((lang) => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    //Language Code

    this.clientManagementForm = new FormGroup({
      'clientsNumber': new FormControl('', Validators.required),
      'clientsShortName': new FormControl('', Validators.required),
      'clientsName': new FormControl('', Validators.required),
      'stateProvincesID': new FormControl('', Validators.required),
      'timeZonesID': new FormControl('', Validators.required)
    });
  }

  //<<-----------Sorting-------------------------------->>
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  //<<-----------Sorting Ends-------------------------------->>
  //<<-----------Language-------------------------------->>
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
        if (this.dataSource?.paginator) {
          this.dataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;
        }

      });
  }
  //<<-----------Language-------------------------------->>
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterData() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.clientsName.toLowerCase().includes(filter) ||
        data.clientsShortName.toLowerCase().includes(filter) ||
        data.stateProvincesName.toLowerCase().includes(filter) ||
        data.TimeZoneName.toLowerCase().includes(filter);
    };
  }

  cancelAdding() {
    this.showForm = false;
    this.alertMsg = "";
    this.successMsg = "";
    this.notificationService.info(this.translate.instant("Process Cancelled"));
    this.clientManagementForm.reset();
    this.addClientButton = true;
    this.getList();
  }

  getList() {
    this.clientManagementService.getClientList().subscribe(res => {
      this.data = res;
      if (res)
        this.dataSource = new MatTableDataSource<clientModel>(res.reverse());
      this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
      if (this.dataSource?.paginator) {
        this.dataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;
      }
      this.filterData();
    })
  }

  getTimeZones() {
    this.clientManagementService.getTimeZone().subscribe(
      (res) => {
        this.TimeZoneMaster = res;
      })
  }

  getStates() {
    this.clientManagementService.getStateProvinces().subscribe(
      (res) => {
        this.StateProvincesMaster = res;
      })
  }

  createNewClient(data: any) {
    this.clientManagementForm.reset()
    this.TimeZoneMaster = [];
    this.StateProvincesMaster = [];
    forkJoin(
      this.clientManagementService.getTimeZone(),
      this.clientManagementService.getStateProvinces()
    ).subscribe(
      results => {
        this.TimeZoneMaster = results[0];
        this.StateProvincesMaster = results[1];
      },
      error => console.error
    );
    this.showForm = true;
    this.showEditForm = false;
    this.addClientButton = true;
  }

  addClientList(data: any) {
    if (this.clientManagementForm.valid) {
      const obj = {
        "clientModel": {
          "isDeleted": "N",
          "active": "N",
          "clientsName": this.clientManagementForm.value.clientsName,
          "timeZonesID": this.clientManagementForm.value.timeZonesID,
          "clientsNumber": this.clientManagementForm.value.clientsNumber,
          "clientsShortName": this.clientManagementForm.value.clientsShortName,
          "stateProvincesID": this.clientManagementForm.value.stateProvincesID
        }
      }
      this.clientManagementService.addClientList(obj).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          console.log(res.details[0].code)
          this.welcome = this.translate.instant("Record Added Successfully", { msg: msg });
          this.notificationService.success(this.welcome);
          this.clientManagementForm.reset();
          this.showForm = false;
          this.paginator.pageIndex = 0;
          this.getList();
          this.showForm = false;
        }
      }, error => {
        this.errorResponseCheck(error);
      })

    }
  }

  editClient(data: any) {
    console.log(data);
    this.editData = data;
    this.showForm = true;
    this.showEditForm = true;
    this.addClientButton = false;
    this.TimeZoneMaster = [];
    this.StateProvincesMaster = [];
    forkJoin(
      this.clientManagementService.getTimeZone(),
      this.clientManagementService.getStateProvinces(),
    ).subscribe(
      results => {
        this.TimeZoneMaster = results[0];
        this.StateProvincesMaster = results[1];
      },
      error => console.error
    );
    this.clientManagementForm.controls["clientsNumber"].setValue(data.clientsNumber);
    this.clientManagementForm.controls["clientsShortName"].setValue(data.clientsShortName);
    this.clientManagementForm.controls["clientsName"].setValue(data.clientsName);
    this.clientManagementForm.controls["stateProvincesID"].setValue(data.stateProvincesID);
    this.clientManagementForm.controls["timeZonesID"].setValue(data.timeZonesID);
  }

  updateClient(ClientData: any) {
    console.log(ClientData);
    if (this.clientManagementForm.valid) {
      const obj = {
        "clientModel": {
          "createUserID": 0,
          "updateUserID": 0,
          "createDatetime": "2022-04-22T08:46:42.064Z",
          "updateDatetime": "2022-04-22T08:46:42.064Z",
          "isDeleted": "N",
          "active": "N",
          "clientsId": this.editData.clientsId,
          "clientsNumber": this.clientManagementForm.value.clientsNumber,
          "clientsShortName": this.clientManagementForm.value.clientsShortName,
          "clientsName": this.clientManagementForm.value.clientsName,
          "stateProvincesID": this.clientManagementForm.value.stateProvincesID,
          "timeZonesID": this.clientManagementForm.value.timeZonesID
        }
      }
      this.clientManagementService.UpdateClient(this.editData.clientsNumber, obj).subscribe(res => {
        if (res.status == 'Success' || res.status == "failed") {
          const msg = '';
          this.alertMsg = this.translate.instant(res.details[0].code, { msg: msg });
          this.welcome = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.welcome);
          this.getList();
          this.showForm = false;
          this.getList();
          this.addClientButton = true;
          this.clientManagementForm.reset();
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }


  toggleClient(data: any, status: any) {
    const msgs = "";
    const obj = {
      "clientId": data.clientsId
    }
    if (status == "Y"){
      if (confirm(this.translate.instant(`Are you sure you want to Enable Client`, { msg: msgs }))) {

        this.clientManagementService.toggleClient(obj).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Client Enabled Successfully", { msg: msgs }));
            this.getList();
          }
        })

      }
    } else {
      if (confirm(this.translate.instant(`Are you sure you want to Disable Client`, { msg: msgs }))) {

        this.clientManagementService.toggleClient(obj).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            const errcodes = res.details[0].code;
            this.successMsg = this.translate.instant(errcodes, { msg: msg });
            this.notificationService.success(this.translate.instant("Client Disabled Successfully", { msg: msgs }));
            this.getList();
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
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.notificationService.error("Duplicate Record Found");
        this.clientManagementForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }
}
