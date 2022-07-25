import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { IssuingAgencyModel } from 'src/app/Models/IssuingAgency/issuingAgency.Model';
import { IssuingAgencyService } from 'src/app/Services/IssuingAgency/issuing-agency.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-issuing-agency',
  templateUrl: './issuing-agency.component.html',
  styleUrls: ['./issuing-agency.component.scss']
})
export class IssuingAgencyComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!: ElementRef;
  issuingForm !: FormGroup;
  dataSource = new MatTableDataSource<IssuingAgencyModel>();
  displayedColumns: string[] = ['agencyCode', 'agencyLongName', 'agencyShortName', 'agencyDistrict', 'agencyParkTktsPerBk', 'agencyStreetEnforceInd', 'agencyViolTableGroup', 'action'];
  data: any = [];
  resultdata: any;
  obj: any = {};
  showForm: boolean = false;
  issuing: any;
  alertMsg!: string;
  newAgencyModel!: IssuingAgencyModel;
  successMsg!: string;
  agencyTypes: any;
  welcome: any;
  titleAlert: string = 'This field is required';
  addAgencyButton: boolean = true;

  constructor(public translate: TranslateService,
    private language: LanguageService,
    private agencyService: IssuingAgencyService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService

  ) { }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.getAgencyList();
    //Language Code
    this.language.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    //Language Code
    this.issuingForm = new FormGroup({
      'agencyCode': new FormControl(null,[ Validators.required, Validators.maxLength(3)],),
      'agencyLongName': new FormControl(null, [Validators.required,Validators.maxLength(35)]),
      'agencyShortName': new FormControl(null,  [Validators.required,Validators.maxLength(10)]),
      'agencyDistrict': new FormControl('', [Validators.maxLength(3)]),
      'agencyParkTktsPerBk': new FormControl('', [Validators.maxLength(2)]),
      'agencyMoveTktsPerBk': new FormControl('', [Validators.maxLength(2)]),
      'agencyStreetEnforceInd': new FormControl('',[ Validators.pattern('^[a-zA-Z]*$')]),
      'agencyViolTableGroup': new FormControl('',[ Validators.pattern('^[a-zA-Z]*$')])
    });

  }

  getAgencyList() {
    this.agencyService.getIssuingAgency().subscribe((result) => {
      this.data = [];
      this.dataSource = new MatTableDataSource<IssuingAgencyModel>(result);
      for (var i = 0; i < result.length; i++) {
        this.obj = {
          "agencyCode": result[i].agencyCode,
          "agencyDistrict": result[i].agencyDistrict,
          "agencyLongName": result[i].agencyLongName,
          "agencyMoveTktsPerBk": result[i].agencyMoveTktsPerBk,
          "agencyParkTktsPerBk": result[i].agencyParkTktsPerBk,
          "agencyShortName": result[i].agencyShortName,
          "agencyStreetEnforceInd": result[i].agencyStreetEnforceInd,
          "agencyViolTableGroup": result[i].agencyViolTableGroup,
          "issuingAgencyId": result[i].issuingAgencyId,
          "createUserId": result[i].createUserId,
          "createDatetime": result[i].createDatetime,
          "updateUserId": result[i].updateUserId,
          "updateDatetime": result[i].updateDatetime,
          "contractId": result[i].contractId,
          "parking": "Parking",
          "moving": "Moving",
        }
        this.data.push(this.obj);
      }
      this.dataSource = new MatTableDataSource<IssuingAgencyModel>(this.data.reverse());
      if(this.sort!=undefined)
      {
        this.dataSource.sort = this.sort;
        this.sort.disableClear = true;
      }
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
  setPagelabel(lang:any) {
    const msg ="";
    this.translate.use(lang).toPromise();
    this.translate
         .use(lang)
         .subscribe(res =>
         {
           this.dataSource.paginator = this.paginator;
           this.alertMsg = this.translate.instant("Items per page", { msg: msg });
           this.dataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;
         });
  }
  //<<-----------Language-------------------------------->>
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addAgency() {

    this.showForm = true;
  }
  cancelAdding() {
    this.showForm = false;
    this.alertMsg = "";
    this.successMsg = "";
    this.notificationService.info(this.translate.instant("Process Cancelled"));
    this.issuingForm.reset();
    this.getAgencyList();
    this.addAgencyButton = true;

  }
  createIssuingForm(data: any) {
    this.addNewAgency(data);
    this.getAgencyCode();
    this.showForm = true;

    this.alertMsg = "";
    this.successMsg = "";
  }

  getAgencyCode() {
    return this.issuingForm.value;
  }
  filterData(): void {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.agencyCode?.toString().includes(filter)
             || data.agencyDistrict?.toString().includes(filter)
             || data.agencyShortName?.toLocaleLowerCase().includes(filter)
             || data.agencyLongName?.toLocaleLowerCase().includes(filter)
             || data.agencyParkTktsPerBk?.toString().includes(filter)
             || data.agencyMoveTktsPerBk?.toString().includes(filter)
             || data.agencyStreetEnforceInd?.toLocaleLowerCase().includes(filter)
             || data.agencyViolTableGroup?.toLocaleLowerCase().includes(filter)
    };
  }

  addNewAgency(data: any) {
    if (this.issuingForm.valid) {
      const agencyData =
      {
        "active": 0,
        "agencyCode": this.issuingForm.value.agencyCode,
        "agencyDistrict": this.issuingForm.value.agencyDistrict,
        "agencyLongName": this.issuingForm.value.agencyLongName,
        "agencyMoveTktsPerBk": this.issuingForm.value.agencyMoveTktsPerBk,
        "agencyParkTktsPerBk": this.issuingForm.value.agencyParkTktsPerBk,
        "agencyShortName": this.issuingForm.value.agencyShortName,
        "agencyStreetEnforceInd": this.issuingForm.value.agencyStreetEnforceInd,
        "agencyViolTableGroup": this.issuingForm.value.agencyViolTableGroup
      }
      this.agencyService.addIssuingAgencylist(agencyData).subscribe((res) => {

        if (res.status == "Success") {
          const msg = "";
          const code = res.details[0].code;
          this.successMsg = this.translate.instant('Record Added Successfully', { msg: msg });
          this.notificationService.success(this.successMsg);
          this.issuingForm.reset();
          this.getAgencyList();
          this.showForm = false;
        }
      }, error => {
        this.errorResponseCheck(error);
      });
    }
  }

  editdata: any;
  editAgency(data: any) {
    this.editdata = [];
    this.editdata = data;
    this.addAgencyButton = false;
    this.showForm = true;
    this.issuingForm.controls['agencyCode'].setValue(data.agencyCode);
    this.issuingForm.controls['agencyDistrict'].setValue(data.agencyDistrict);
    this.issuingForm.controls['agencyLongName'].setValue(data.agencyLongName);
    this.issuingForm.controls['agencyMoveTktsPerBk'].setValue(data.agencyMoveTktsPerBk);
    this.issuingForm.controls['agencyParkTktsPerBk'].setValue(data.agencyParkTktsPerBk);
    this.issuingForm.controls['agencyShortName'].setValue(data.agencyShortName);
    this.issuingForm.controls['agencyStreetEnforceInd'].setValue(data.agencyStreetEnforceInd.trim());
    this.issuingForm.controls['agencyViolTableGroup'].setValue(data.agencyViolTableGroup.trim());
  }

  saveAgency(formData: any) {
    if (this.issuingForm.valid) {
      const editAgencyData =
      {
        "agencyCode": formData.agencyCode,
        "agencyDistrict": formData.agencyDistrict,
        "agencyLongName": formData.agencyLongName,
        "agencyMoveTktsPerBk": formData.agencyMoveTktsPerBk,
        "agencyParkTktsPerBk": formData.agencyParkTktsPerBk,
        "agencyShortName": formData.agencyShortName,
        "agencyStreetEnforceInd": formData.agencyStreetEnforceInd,
        "agencyViolTableGroup": formData.agencyViolTableGroup,
      }
      this.agencyService.updateIssuingAgency(this.editdata.issuingAgencyId,editAgencyData).subscribe(res => {
        if (res.status == 'Success'|| res.status =="failed") {
          const msg ='';
          this.notificationService.success(this.translate.instant("Record Updated Successfully",{ msg: msg } ));
          this.getAgencyList();
          this.showForm = false;
          this.getAgencyList();
          this.addAgencyButton = true;
          this.issuingForm.reset();
        }
      }, error => {
        this.errorResponseCheck(error);
      });
    }
  }

  deleteAgency(rowData :any)
  {
    const msgs = "";
    if(confirm(this.translate.instant("Are you sure to delete", { msg: msgs }))) {
       this.agencyService.deleteIssuingAgency(rowData.issuingAgencyId).subscribe(res =>{
         if(res.status == "Success" || res.status =="failed") {
           const msg = "";
           const errcodes=res.details[0].code;
           this.successMsg = this.translate.instant(res.details[0].code, { msg: msg });
           this.notificationService.success(this.translate.instant("Record Deleted Successfully",{ msg: msgs } ));
           this.getAgencyList();
            this.showForm = false;
           this.issuingForm.reset();
        }
      },error =>{
        this.errorResponseCheck(error);
       })
      }
  }
  errorResponseCheck(error: any) {
    for (var i = 0; i < error.error.details.length; i++) {
      if( error.error.details[i].code =="5000" && error.error.details[i].message != "DuplicateKey")
      {
        const msg = "";
        let translateCode=error.error.details[i].code +"_"+ error.error.details[i].fieldName;
        this.welcome = this.translate.instant( translateCode, { msg: msg });
        this.issuingForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if(error.error.details[i].message == "DuplicateKey" && error.error.details[i].code =="5000")
      {
        const msg = "";
         this.notificationService.error(this.translate.instant( error.error.details[i].fieldName+"_"+error.error.details[i].message, { msg: msg }) )
      }
      else
      {
        const msg = "";
        this.notificationService.error(this.translate.instant("Unknown error occured, please contact support team.", { msg: msg }));
      }
    }
  }
}


