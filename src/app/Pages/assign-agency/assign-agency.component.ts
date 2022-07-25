import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { get } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Add_UpdateAssignAgency, AssignAgencyModel } from 'src/app/Models/assignAgency.Model';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-assign-agency',
  templateUrl: './assign-agency.component.html',
  styleUrls: ['./assign-agency.component.scss']
})
export class AssignAgencyComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!:ElementRef;
  displayedColumns: string[] = ['assignAgencyNo', 'assignAgencyCode', 'assignAgencyName', 'Action'];
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  dataSource = new MatTableDataSource<AssignAgencyModel>();
  alertMsg!: string;
  successMsg!: string;
  assignAgencyForm!: FormGroup;
  assignAgencyNoList!: AssignAgencyModel[];
  updatingAgency!: AssignAgencyModel;
  welcome: any;

  constructor(public translate: TranslateService,
    private headerSection: LanguageService,
    private apiService: ApiService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService : ToastrService,) { }

  ngOnInit(): void {
    this.getassignAgency();
    this.headerSection.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    // FORM CONTROLS
    this.assignAgencyForm = new FormGroup({
      'assignAgencyNo': new FormControl(0, [Validators.pattern('^[0-9]\\d*$'), Validators.minLength(1)]),
      'assignAgencyCode': new FormControl("", [Validators.required, Validators.maxLength(50)]),
      'assignAgencyName': new FormControl("", [Validators.required, Validators.maxLength(50)]),
    });
  }
  
  //<<-----------------------------------SORTING------------------------------------------>
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
  cancelAdd_Save() {
    this.assignAgencyForm.reset();
    this.showAddForm = false;
    this.showEditForm = false;
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }
  editIconClicked(rowData: AssignAgencyModel) {
    this.showEditForm = true;
    this.updatingAgency = rowData;
    this.assignAgencyForm.patchValue({
      assignAgencyNo:  get(this.updatingAgency, 'assignAgencyNo'),
      assignAgencyCode: get(this.updatingAgency, 'assignAgencyCode'),
      assignAgencyName: get(this.updatingAgency, 'assignAgencyName'),
    })
  }
  showAddFormPage() {
    this.apiService.get('getMaxAssignAgencyNumber').subscribe(res => this.assignAgencyForm.get('assignAgencyNo')?.setValue(res))
    this.showAddForm = true;
  }
  filterData(): void {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.assignAgencyCode?.toLocaleLowerCase().includes(filter) || data.assignAgencyNo?.toString() === filter || data.assignAgencyName?.toLocaleLowerCase().includes(filter);
    };
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // -------------------------------------- --------- API OPERATIONS ----------------------------->
  getassignAgency() {
    this.apiService.get('assignAgency').subscribe(res => {
      this.assignAgencyNoList = res.map((element: unknown) => {
        return new AssignAgencyModel(element)
      });
      this.dataSource = new MatTableDataSource<AssignAgencyModel>(this.assignAgencyNoList.reverse());
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
    });
  }

  addAssignAgency(formData: any) {
    this.sort.sort({id:'',start:'asc',disableClear : false}) //To Disable the applied sorting so that the inserted record will appear at top
    if(this.assignAgencyForm.valid) {
      this.apiService.post('assignAgency', new Add_UpdateAssignAgency(formData)).subscribe(res => {
        if(res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant(res.details[0].code, { msg: msg });
          this.notificationService.success(this.successMsg);
          this.assignAgencyForm.reset();
          this.paginator.pageIndex = 0;
          this.getassignAgency();
          this.showAddForm = false;
          this.searchString.nativeElement.value = ""
       }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }
  updateAssignAgency(formData: any) {
    if(this.assignAgencyForm.valid) 
    {
      this.apiService.put(`assignAgency/${this.updatingAgency.assignAgencyId}`,new Add_UpdateAssignAgency(formData)).subscribe( res => {
        if(res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.assignAgencyForm.reset();
          this.getassignAgency();
          this.showAddForm = false;
          this.showEditForm = false;
          this.searchString.nativeElement.value = ""
       }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }
  
  deleteAssignAgency(id:number) {
    const msgs = "";
    if(confirm(this.translate.instant("Are you sure to delete", { msg: msgs }))) {
      this.apiService.delete(`assignAgency/${id}`, id).subscribe(res => {
        if(res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.getassignAgency();
          this.showAddForm = false;
       }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }

// ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//
  errorResponseCheck(error: any) {
    for (var i = 0; i < error.error.details.length; i++) {
      if( error.error.details[i].code =="5000" && error.error.details[i].message != "DuplicateKey")
      {
        const msg = "";
        let translateCode=error.error.details[i].code +"_"+ error.error.details[i].fieldName;
        this.welcome = this.translate.instant( translateCode, { msg: msg });
        this.assignAgencyForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if(error.error.details[i].message == "DuplicateKey" && error.error.details[i].code =="5000")
      {
        const msg = "";
         let translateCode=error.error.details[i].code +"_"+ error.error.details[i].message;
         this.welcome = this.translate.instant( translateCode, { msg: msg });
         this.notificationService.error(this.translate.instant(this.welcome));
         if(error.error.details[i].fieldName === 'agencyassigncode') {
          this.assignAgencyForm.get('assignAgencyCode')?.setErrors({ invalid: this.welcome });
         }
         
      }
      else
      {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }

}
