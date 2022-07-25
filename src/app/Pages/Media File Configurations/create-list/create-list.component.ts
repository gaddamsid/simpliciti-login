import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CreateList, mediaFileConfigurationModel } from '../../../Models/create-list';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';
import { get } from 'lodash';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss']
})
export class CreateListComponent implements OnInit {
  displayedColumns: string[] = ['dciDownload', 'dciConvertFiles', 'relativeDayBegin', 'relativeDayEnd', 'Action'];
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  mediaFileConfigForm!: FormGroup
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!: ElementRef;

  dataSource = new MatTableDataSource<CreateList>();
  alertMsg: any;
  welcome: any;
  successMsg: any;
  updatingMFConfig!: CreateList;
  constructor(public translate: TranslateService, private language: LanguageService, private apiService: ApiService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.language.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    this.getList();
    this.mediaFileConfigForm = new FormGroup({
      'dciDownload': new FormControl('', [Validators.required]),
      'dciConvertFiles': new FormControl('',[Validators.required]),
      'relativeDayBegin': new FormControl(null,[Validators.required]),
      'relativeDayEnd': new FormControl(null,[Validators.required]),
      'thumbnailScaleFraction': new FormControl(null,[Validators.required]),
      'dciEncrypted': new FormControl(''),
      'rearFolderName': new FormControl(''),
      'frontFolderName': new FormControl(''),
      'eventTypeString': new FormControl(''),
      'daystoWaitToLoadEventsForLog': new FormControl(0),
      'rear1': new FormControl(false),
      'rear2': new FormControl(false),
      'rear3': new FormControl(false),
      'rear4': new FormControl(false),
      'front1': new FormControl(false),
      'front2': new FormControl(false),
      'video': new FormControl(false),
      'extractedVideoImage': new FormControl(false),
      'requiredLPRPlate': new FormControl(false),
      'useExitSpeed': new FormControl(false),
    });

  }
  restrictWhiteSpace(event:any) {
    const key = event.keyCode;
    if (key === 32 && event.target.selectionStart === 0) {
      event.preventDefault();
    }
  }
  transformTotal(input: any) {
    var value = this.mediaFileConfigForm.get(input)?.value;
    if (value == "" || value == null) {
      this.mediaFileConfigForm.controls[input].setValue("");
    }
    else {
      var decimalValue = Number(value).toFixed(2);
      this.mediaFileConfigForm.controls[input].setValue(decimalValue);
    }
  }
  appendLang(lang: string) {
    this.translate.use(lang);
    this.setPagelabel(lang);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  getList() {

    this.apiService.get('MediaFileConfiguration/getMediaFileConfigurationList', true).subscribe(res => {
      this.dataSource = new MatTableDataSource<CreateList>(res.reverse());
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.filterData();
      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
        return data[sortHeaderId];
      };
    })

  }

  filterData(): void {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.dciDownload.toLocaleLowerCase().includes(filter) || data.dciConvertFiles.toLocaleLowerCase().includes(filter) || data.relativeDayBegin.toString().includes(filter) || data.relativeDayEnd.toString().includes(filter);
    }
  }
  showAddFormPage() {
    this.showAddForm = true;
    this.showEditForm = false;
  }
  cancelAdd_Save() {
    this.mediaFileConfigForm.reset();
    this.showAddForm = false;
    this.showEditForm = false;
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }
  editIconClicked(rowData: any) {
    this.showEditForm = true;
    this.updatingMFConfig = rowData;
    this.mediaFileConfigForm.patchValue({
      dciDownload:  get(this.updatingMFConfig, 'dciDownload'),
      dciConvertFiles: get(this.updatingMFConfig, 'dciConvertFiles'),
      relativeDayBegin: get(this.updatingMFConfig, 'relativeDayBegin'),
      relativeDayEnd:  get(this.updatingMFConfig, 'relativeDayEnd'),
      thumbnailScaleFraction: get(this.updatingMFConfig, 'thumbnailScaleFraction'),
      dciEncrypted: get(this.updatingMFConfig, 'dciEncrypted'),
      rearFolderName:  get(this.updatingMFConfig, 'rearFolderName'),
      frontFolderName: get(this.updatingMFConfig, 'frontFolderName'),
      eventTypeString: get(this.updatingMFConfig, 'eventTypeString'),
      daystoWaitToLoadEventsForLog:  get(this.updatingMFConfig, 'daystoWaitToLoadEventsForLog'),
      rear1: get(this.updatingMFConfig, 'rear1'),
      rear2: get(this.updatingMFConfig, 'rear2'),
      rear3:  get(this.updatingMFConfig, 'rear3'),
      rear4: get(this.updatingMFConfig, 'rear4'),
      front1: get(this.updatingMFConfig, 'front1'),
      front2:  get(this.updatingMFConfig, 'front2'),
      video: get(this.updatingMFConfig, 'video'),
      extractedVideoImage: get(this.updatingMFConfig, 'extractedVideoImage'),
      requiredLPRPlate:  get(this.updatingMFConfig, 'requiredLPRPlate'),
      useExitSpeed: get(this.updatingMFConfig, 'useExitSpeed'),
    })
  }
  addMediaFileConfig(formData:any) {
    this.sort.sort({id:'',start:'asc',disableClear : false}) //To Disable the applied sorting so that the inserted record will appear at top
    if(this.mediaFileConfigForm.valid) {
      this.apiService.post('MediaFileConfiguration/addMediaFileConfiguration', {mediaFileConfigurationModel: new mediaFileConfigurationModel(formData)},true).subscribe(res => {
        if(res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant(res.details[0].code, { msg: msg });
          this.notificationService.success(this.successMsg);
          this.mediaFileConfigForm.reset();
          this.paginator.pageIndex = 0;
          this.getList();
          this.showAddForm = false;
          this.searchString.nativeElement.value = ""
       }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }
  updateMediaFileConfig(formData: any) {
    if(this.mediaFileConfigForm.valid)
    {
      const updateData = {mediaFileConfigurationModel:new mediaFileConfigurationModel(formData)}
      updateData.mediaFileConfigurationModel.id = this.updatingMFConfig.id;
      this.apiService.put(`MediaFileConfiguration/updateMediaFileConfiguration`,updateData,true).subscribe( res => {
        if(res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.mediaFileConfigForm.reset();
          this.getList();
          this.showAddForm = false;
          this.showEditForm = false;
          this.searchString.nativeElement.value = ""
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
        this.mediaFileConfigForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if(error.error.details[i].message == "DuplicateKey" && error.error.details[i].code =="5000")
      {
        const msg = "";
         let translateCode=error.error.details[i].code +"_"+ error.error.details[i].message;
         this.welcome = this.translate.instant( translateCode, { msg: msg });
         this.notificationService.error(this.translate.instant(this.welcome));
         if(error.error.details[i].fieldName === 'agencyassigncode') {
          this.mediaFileConfigForm.get('assignAgencyCode')?.setErrors({ invalid: this.welcome });
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
