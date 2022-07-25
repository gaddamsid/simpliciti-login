import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { get } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { DispositionCodeService } from 'src/app/Services/disposition/disposition-code.service';
import { DispositionCodeModel } from 'src/app/Models/disposition-code.model';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-disposition-code',
  templateUrl: './disposition-code.component.html',
  styleUrls: ['./disposition-code.component.scss']
})

export class DispositionCodeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('search') searchString!:ElementRef;
  displayedColumns: string[] = ['dispCode', 'dispClass', 'dispNameLong','dispName','dispPriority','dispRule','active','Action'];
  dataSource = new MatTableDataSource<DispositionCodeModel>();
  dispositionCodeList!: DispositionCodeModel[];
  updateDespCode!: DispositionCodeModel;
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  dispositionCodeForm!: FormGroup;
  successMsg!: string;
  alertMsg!: string;
  welcome: any;
  ruleDesc!: any;

  constructor(private dispositionService: DispositionCodeService,
    public translate: TranslateService,
    private headerSection: LanguageService,
    private notificationService : ToastrService,
    private _liveAnnouncer: LiveAnnouncer,) { }

  ngOnInit(): void {
    this.getDispositionCode();
    this.headerSection.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    this.dispositionService.getDispRuleMasterList().subscribe(res => {
      this.ruleDesc = res;
    });
    // FORM CONTROLS
    this.dispositionCodeForm = new FormGroup({
      'dispCode': new FormControl("", [Validators.required]),
      'dispositionId': new FormControl(),
      'dispClass': new FormControl("", [Validators.maxLength(3)]),
      'dispNameLong': new FormControl("", [Validators.required, Validators.maxLength(20)]),
      'dispName': new FormControl("", [Validators.required, Validators.maxLength(10)]),
      'dispPriority': new FormControl('',[Validators.required, Validators.maxLength(2)]),
      'dispRule': new FormControl("", [Validators.required]),
      'active': new FormControl("", [Validators.required, Validators.maxLength(1)]),
    })
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
          //  this.dataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;
         });
  }

  editIconClicked(rowData: DispositionCodeModel) {
    this.showEditForm = true;
    this.updateDespCode = rowData;
    this.dispositionCodeForm.patchValue({
      dispCode: get(this.updateDespCode, 'dispCode'),
      dispositionId: get(this.updateDespCode, 'dispositionId'),
      dispClass: get(this.updateDespCode, 'dispClass'),
      dispNameLong: get(this.updateDespCode, 'dispNameLong'),
      dispName: get(this.updateDespCode, 'dispName'),
      dispPriority: get(this.updateDespCode, 'dispPriority'),
      dispRule: get(this.updateDespCode, 'dispRule'),
      active: get(this.updateDespCode, 'active'),
    })
  }

  cancelAdd_Save() {
    this.dispositionCodeForm.reset();
    this.searchString.nativeElement.value = ""
    this.showAddForm = false;
    this.showEditForm = false;
    this.getDispositionCode();
    this.paginator.pageIndex = 0;
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }

  ruleDescSelect(event: any) {
    const result = this.ruleDesc.filter((element: { dispRule: any; }) => {
      return element.dispRule === event.value;
    });
    // To set the value
   this.dispositionCodeForm.controls['dispRule'].setValue(result[0].dispRule);
  }

  // -------------------------------------- --------- API OPERATIONS ----------------------------->

  getDispositionCode(){
    this.dispositionService.getDispositionCode().subscribe(res => {
      this.dispositionCodeList = res.map(element => {
        return new DispositionCodeModel(element)
      });
      this.dataSource = new MatTableDataSource<DispositionCodeModel>(this.dispositionCodeList.reverse());
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

  filterData(): void {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.dispCode.toString() === filter || data.dispNameLong.toLocaleLowerCase().includes(filter)
       || data.dispClass === filter || data.dispName.toLocaleLowerCase().includes(filter)
       || data.dispRule.toLocaleLowerCase() === filter || data.dispDescription.toLocaleLowerCase().includes(filter)
       || data.active?.toLocaleLowerCase()  === filter || data.dispPriority.toString().includes(filter)
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addDespCodeRecord(formData: any) {
    this.sort.sort(
      {id:'',start:'asc',disableClear : false}
    )
    if(this.dispositionCodeForm.valid) {
    const obj = {
      dispCode: formData.dispCode,
      dispClass: formData.dispClass,
      dispNameLong: formData.dispNameLong.trim(),
      dispName: formData.dispName.trim(),
      dispPriority: formData.dispPriority,
      dispRule: formData.dispRule.trim(),
      active: formData.active,
    }
    
      this.dispositionService.addDispCode(obj).subscribe(res => {
        if(res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant(res.details[0].code, { msg: msg });
          this.notificationService.success(this.successMsg);
          this.searchString.nativeElement.value = ""
          this.dispositionCodeForm.reset();
          this.paginator.pageIndex = 0;
          this.getDispositionCode();
          this.showAddForm = false;
       }
      }, error => {
        this.errorResponseCheck(error);
      });
    }
  }

  updateDespCodeRecord(formData: any) {
    if(this.dispositionCodeForm.valid) 
    {
      const obj = {
        dispCode: formData.dispCode,
        dispositionId: formData.dispositionId,
        dispClass: formData.dispClass,
        dispNameLong: formData.dispNameLong.trim(),
        dispName: formData.dispName.trim(),
        dispPriority: formData.dispPriority,
        dispRule: formData.dispRule.trim(),
        active: formData.active
      }
      this.dispositionService.updateDispCode(obj.dispositionId, obj).subscribe( res => {
        if(res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.searchString.nativeElement.value = ""
          this.dispositionCodeForm.reset();
          this.getDispositionCode();
          this.showAddForm = false;
          this.showEditForm = false;
       }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }

  deleteDespCodeRecord(id:number) {
    const msgs = "";
    if(confirm(this.translate.instant("Are you sure to delete", { msg: msgs }))) {
      this.dispositionService.deleteDispCode(id).subscribe(res => {
        if(res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.getDispositionCode();
          this.showAddForm = false;
       }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }

  showAddFormPage() {
    this.ruleDesc;
    this.showAddForm = true;
  }

  // ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//
  
  errorResponseCheck(error: any) {
    for (var i = 0; i < error.error.details.length; i++) {
      if( error.error.details[i].code =="5000" && error.error.details[i].message != "DuplicateKey")
      {
        const msg = "";
        let translateCode=error.error.details[i].code +"_"+ error.error.details[i].fieldName;
        this.welcome = this.translate.instant( translateCode, { msg: msg });
        this.dispositionCodeForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if(error.error.details[i].message == "DuplicateKey" && error.error.details[i].code =="5000")
      {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.dispositionCodeForm.get("dispCode")?.setErrors({ invalid: "Duplicate Record Found" });
      }
      else
      {
        const msg = "";
        this.notificationService.error(this.translate.instant("Unknown error occured, please contact support team.", { msg: msg }));
      }
    }
  }

}
