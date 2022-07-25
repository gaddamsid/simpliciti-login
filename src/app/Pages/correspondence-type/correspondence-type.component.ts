import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AccountCode } from 'src/app/Models/account-code';
import { CorrespondenceTypeService } from 'src/app/Services/CorrespondenceType/CorrespondenceType';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import * as _ from 'lodash';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-correspondence-type',
  templateUrl: './correspondence-type.component.html',
  styleUrls: ['./correspondence-type.component.scss']
})
export class CorrespondenceTypeComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;
  showAddForm = false;
  displayedColumns: string[] = ['corrTypeNumber', 'corrClass', 'corrLongName', 'corrShortName', 'active', 'corrPhoneInd', 'action'];
  correspondenceForm!: FormGroup;
  editData: any;
  addCorressButton: boolean = true;
  disableCorres: boolean = false;

  fileUploadList: string[] = [];
  fileNameList!: any[]
  pdfSrc = "https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/imaging/2/imgprod/images/checkimages/2022/5/20220516/323_Badge_Number_API_Response.docx";
  langFileList!: any[];
  dropdownList: any = [{ key: 'Spaces', value: '' }, { key: 'Y - Active', value: 'Y' },
  { key: 'N - In-Active', value: 'N' }]
  searchData: any;
  containers = [{
    "fileName": "",
    "url": "",
    "docTypeId": "002",
    "docGroup": "IO",
    "description": " ",
    "eventLevel": "",
    "language": ""
  }];
  addContactFieldWhenListAvail: boolean = false;

  constructor(private correspondenceTypeService: CorrespondenceTypeService, public translate: TranslateService,
    private language: LanguageService, private notificationService: ToastrService,
    private validationService: ValidationService, private router: Router, private fb: FormBuilder, private apiService: ApiService, private dialog: MatDialog) { }
  contact = {

    contacts: [{ fileName: '', language: '', URL: '', name: '' }]
  }


  ngOnInit(): void {
    this.getList();
    this.language.sendLang.subscribe(lang => {
      if (lang != "") {
        this.appendLang(lang);
      }
    });
    this.correspondenceForm = this.fb.group({
      'typeCode': new FormControl("", [Validators.required,
      this.validationService.positiveNumVali('^[0-9]\\d*$')]),
      'corresClass': new FormControl(""),
      'fullName': new FormControl("", [Validators.required, Validators.maxLength(20)]),
      'shortName': new FormControl("", [Validators.required, Validators.maxLength(8)]),
      'corresActive': new FormControl("No"),
      'callInd': new FormControl(" "),
      contacts: this.buildContacts(this.contact.contacts)
    });

    //////

  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }

    this.fileUploadList = [];
    this.fileNameList = [];
  }
  getControls() {
    return (this.correspondenceForm.get('contacts') as FormArray).controls;
  }
  
  getConactControls(i: number) {
    return this.correspondenceForm.controls['contacts'].get(i.toString())?.get('language');
  }
  
  buildContacts(contacts: { fileName: string; language: string; URL: string; name: string }[] = []) {
    return this.fb.array(contacts.map(contact => this.fb.group(contact)));
  }
  get contacts(): FormArray {
    return this.correspondenceForm.get('contacts') as FormArray;
  }
  addContactField() {
    let formArray = this.correspondenceForm.get("contacts") as FormArray;
    let count = 0;
    formArray.controls.forEach(c => {
      count = count + 1;
    });
    if (count < this.languageList.length) {
      this.contacts.push(this.fb.group({ fileName: null, language: null
        , URL: null, name: null },))
    }
    else {
      const msg = "";
      var successMsg = this.translate.instant("Max Limit Reached.", { msg: msg });
      this.notificationService.error(successMsg);
    }
  }

  //commenting it because its not been used
  // fileInputChange(fileInputEvent: any) {
  //   console.log(fileInputEvent.target.files[0].name);

  //   this.contacts.at(1).get('fileName')?.setValue(fileInputEvent.target.files[0].name)

  // }
  private getList() {
    this.correspondenceTypeService.getCorrespondenceList().subscribe(res => {
      if (res) {
        res.map(ele => {
          if (ele.active === 'Y') {
            ele.active = "Yes";
          } else if (ele.active === 'N') {
            ele.active = "No";
          }
        });
        this.dataSource = new MatTableDataSource<any>(res.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filterData();
      }
    });
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
        //  this.alertMsg = this.translate.instant("Items per page", { msg: msg });
        //  this.dataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;
      });
  }


  filterData() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      console.log('data', data)
      return data.corrClass.toLowerCase().includes(filter) ||
        data.corrLongName.toLowerCase().includes(filter) ||
        data.corrShortName.toLowerCase().includes(filter) ||
        data.active.toLowerCase().includes(filter) ||
        data.corrTypeNumber.toString() === filter ||
        data.corrPhoneInd.toString() === filter;
    };
  }
  addcorrespondence(value: any) {
    this.addCorressButton = true;
    console.log(value)
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  languageList!: any[];
  addGlobalcorrespondence() {
    this.showAddForm = true;
    this.correspondenceForm.controls["corresActive"].setValue("No");
    this.correspondenceForm.controls["callInd"].setValue(" ");
    this.clearFormArray(this.correspondenceForm.get('contacts') as FormArray)
    this.languageList = [];
    this.apiService.get('language', false).subscribe(res => {
      if (res) {
        this.languageList = res;
        this.addContactField();
      }

    });
  }
  cancelCorrespondence() {
    this.showAddForm = false;
    this.addCorressButton = true;
    this.correspondenceForm.reset();
    this.searchData = '';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.getList();
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }
  saveCorrespondece(data: any) {
    // this.addCorressButton = true;
    this.searchData = "";
    var fileList = []
    let formArray = this.correspondenceForm.get("contacts") as FormArray;
    let _fileList = formArray.value
    for (let i = 0; i < _fileList.length; i++) {
      if (_fileList[i].fileName != null && _fileList[i].language != null) {
        fileList.push({
          "fileName": _fileList[i].fileName.replace(/^.*[\\\/]/, ''),
          "docTypeId": "001",
          "docGroup": "CO",
          "description": "",
          "eventLevel": "",
          "languageId": _fileList[i].language,
          "languageDescription": "English"
        })
      } else {
        if (_fileList[i].fileName == null && _fileList[i].language != null) {
          const msg = "";
          var successMsg = this.translate.instant("Please select file.", { msg: msg });
          this.notificationService.error(successMsg);
          return;
        }
        else if (_fileList[i].fileName != null && _fileList[i].language == null) {
          const msg = "";
          var successMsg = this.translate.instant("Please select language.", { msg: msg });
          this.notificationService.error(successMsg);

          return;
        }
      }
    }

    if (this.correspondenceForm.valid) {
      // if(data.typeCode.toString()==='000'){
      //   this.correspondenceForm.
      //   return
      // }
      var isUploaded = "N";
      const formData = new FormData();
      for (var i = 0; i < this.fileUploadList.length; i++) {
        isUploaded = "Y";
        formData.append("files", this.fileUploadList[i]);
      }
      const obj = {
        "active": (data.corresActive === "Yes" ? 'Y' : 'N'),
        "corrClass": (_.isNull(data.corresClass) ? '' : data.corresClass),
        "corrLongName": data.fullName,
        "corrPhoneInd": data.callInd,
        "corrShortName": data.shortName,
        "corrTypeNumber": data.typeCode,
        "contract": "2",
        "isUploaded": isUploaded,
        "fileList": fileList
      };
      //  formData.append('files',JSON.stringify(this.fileUploadList));
      formData.append('corrTypeRequest', JSON.stringify(obj));
      console.log(JSON.stringify(obj))
      this.correspondenceTypeService.addCorrespondenceList(formData).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          const message = this.translate.instant("ADD_RECORD", { msg: msg });
          this.notificationService.success(message);
          this.correspondenceForm.reset();
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
          this.getList();
          this.showAddForm = false;
        }
      }, error => {
        this.errorResponseCheck(error);
      });
    }
  }

  editCorressData(data: any) {
    this.clearFormArray(this.correspondenceForm.get('contacts') as FormArray)
    this.editData = data;
    this.addCorressButton = false;
    this.disableCorres = true;
    this.searchData = '';
    this.showAddForm = true;
    this.correspondenceForm.controls["corresActive"].setValue(data.active);
    this.correspondenceForm.controls["corresClass"].setValue(data.corrClass);
    this.correspondenceForm.controls["fullName"].setValue(data.corrLongName);
    this.correspondenceForm.controls["callInd"].setValue(data.corrPhoneInd);
    this.correspondenceForm.controls["shortName"].setValue(data.corrShortName);
    this.correspondenceForm.controls["typeCode"].setValue(data.corrTypeNumber);
    this.apiService.get('language', false).subscribe(res => {
      if (res) {
        this.languageList = res;
        if(this.addContactFieldWhenListAvail){
          console.log('addContactFieldWhenListAvail');
          this.addContactField();
          this.addContactFieldWhenListAvail = false;
        }
      }
    });
    this.apiService.get('getCOImage?id=' + data.corrTypeId + '&type=CO').subscribe(res => {
      if (res) {
        // this.langFileList = res;
        for (let i = 0; i < res.length; i++) {
          this.contacts.push(this.fb.group({ URL: res[i].url, docIdFromReq: res[i].dcoID, fileName: undefined, language: res[i].languageId, name: res[i].fileName }))
        }
      } 
      if(res.length === 0){
        if(this.languageList && this.languageList.length > 0){
          this.addContactField();
          console.log('lang > 0')
        } else {
          this.addContactFieldWhenListAvail = true;
        }
      }
    })
  }


  updateCorres(data: any) {
    // this.addCorressButton= false;
    var fileList = []
    let formArray = this.correspondenceForm.get("contacts") as FormArray;
    let _fileList = formArray.value
    for (let i = 0; i < _fileList.length; i++) {
      if (_fileList[i].fileName != null) {
        fileList.push({
          "fileName": _fileList[i].fileName == null ? _fileList[i].name : _fileList[i].fileName.replace(/^.*[\\\/]/, ''),
          "docTypeId": "001",
          "docGroup": "CO",
          "description": "",
          "eventLevel": "",
          "languageId": _fileList[i].language,
          "languageDescription": "English",
          "isFileModified": _fileList[i].fileName == null ? "N" : "Y",
          "docIdFromReq": _fileList[i].docIdFromReq,
        })
      }
      if (_fileList[i].name != null && _fileList[i].language === null) {
        const msg = "";
        var successMsg = this.translate.instant("Please select language.", { msg: msg });
        this.notificationService.error(successMsg);
        return;
      } else if (_fileList[i].language != null && _fileList[i].name == null ) {
        const msg = "";
        var successMsg = this.translate.instant("Please select file.", { msg: msg });
        this.notificationService.error(successMsg);
        return;
      }
    }
    if (this.correspondenceForm.valid) {
      var isUploaded = "N";
      const formData = new FormData();
      for (var i = 0; i < this.fileUploadList.length; i++) {
        isUploaded = "Y";
        formData.append("files", this.fileUploadList[i]);
      }
      const obj = {
        "active": (data.corresActive === "Yes" ? 'Y' : 'N'),
        "corrClass": data.corresClass,
        "corrLongName": data.fullName,
        "corrPhoneInd": data.callInd,
        "corrShortName": data.shortName,
        "corrTypeNumber": data.typeCode,
        "contract": "2",
        "isUploaded": (fileList && fileList.length > 0 ? "Y" : "N"),
        "fileList": fileList
      }

      formData.append('corrTypeRequest', JSON.stringify(obj));
      console.log(JSON.stringify(obj))
      this.correspondenceTypeService.updateCorrespondence(this.editData.corrTypeId, formData).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          console.log(res.details[0].code)
          const welcome = this.translate.instant("UPDATE_RECORD", { msg: msg });
          this.notificationService.success(welcome);
          this.correspondenceForm.reset();
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
          this.getList();
          this.showAddForm = false;
          this.addCorressButton = true;
        }
      }, error => {
        console.log(error);
        this.errorResponseCheck(error);
      })
    }
  }
  deleteCorres(data: any) {
    const msgs = "";
    if (confirm(this.translate.instant("Are you sure to delete", { msg: msgs }))) {
      this.correspondenceTypeService.deleteCorrespondence(data.corrTypeId).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          const errcodes = res.details[0].code;
          const successMsg = this.translate.instant("DELETE_RECORD", { msg: msg });
          this.notificationService.success(successMsg);
          this.getList();
        }
      }, error => {
        console.log(error);
        this.errorResponseCheck(error);
      })
    }
  }
  errorResponseCheck(error: any) {
    if (error.error.details == undefined) {
      this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator."));
    } else {
      for (var i = 0; i < error.error.details.length; i++) {
        if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
          // const msg = "";
          // let translateCode=error.error.details[i].code +"_"+ error.error.details[i].fieldName;
          // let  welcome = this.translate.instant( translateCode, { msg: msg });
          // this.badgeNumberForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: welcome });
        }
        else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
          const msg = "";
          this.correspondenceForm.controls['typeCode'].setErrors({ 'duplicateKey': true });
          this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        }
        else {
          const msg = "";
          this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
        }
      }
    }
  }

  positiveNumVali(): ValidatorFn {
    return (control: AbstractControl): any | null => {
      // console.log(control.value);
      // if (control.errors) {
      //   // return if another validator has already found an error on the matchingControl
      //   return;
      // }

      if (control.value.toString() === '000' || control.value.toString() === ' ' || control.value.toString() === '  ' || control.value.toString() === '   ') {
        return { 'invalid': 'invalid' };
      } else if (parseInt(control.value) !== NaN && parseInt(control.value) < 0) {
        return { 'invalid': 'invalid' };
      }
    };
  }

  handleFileInput(event: any, index: any) {
    let files = event.files[0];
    if (files.type != "application/pdf") {
      const msg = "";
      var successMsg = this.translate.instant("Please Upload .Pdf format", { msg: msg });
      this.notificationService.error(successMsg);
      return;
    }

    this.getFileHref(index)
    if (files.size < 4000000) {
      // let formArray = this.correspondenceForm.get("contacts") as FormArray;
      // let _fileList = formArray.value

      // if (this.fileNameList.length > 0) {
      //   for (var i = 0; i < _fileList.length; i++) {
      //     if (_fileList[i].fileName != null) {
      //       if (_fileList.length == 1) {
      //         this.fileUploadList = [];
      //         this.fileNameList = [];
      //         isAvilable = false;
      //       }
      //       else if (_fileList[i].fileName.replace(/^.*[\\\/]/, '') == files.name) {
      //         isAvilable = true;
      //       }
      //     }

      //   }
      // }
      // else {
      //   isAvilable = true;
      //   this.fileUploadList = [];
      //   this.fileNameList = [];
      //   this.fileUploadList.push(files);
      //   this.fileNameList.push(files.name);
      // }
      var isAvilable = this.fileNameList.find(item => item === files.name)
      if (isAvilable == undefined) {
        this.fileUploadList.push(files);
        this.fileNameList.push(files.name);
      }

      const controlArray = <FormArray>this.correspondenceForm.get('contacts');
      controlArray?.at(index).get('name')?.setValue(files.name);
    }
    else {
      this.notificationService.error(this.translate.instant("File size should not greater than 4MB."));

      const controlArray = <FormArray>this.correspondenceForm.get('contacts');
      controlArray?.at(index).get('fileName')?.setValue(null);
    }

  }
  onchange(event: any, index: any)
  {
    alert();

  }
  onLanguageChange(event: any, index: any) {
    var value = event.value;
    let formArray = this.correspondenceForm.get("contacts") as FormArray;
    let _fileList = formArray.value
    let count1 = 0;
    for (let i = 0; i < _fileList.length; i++) {
      if (_fileList[i].language == value) {
        count1 = count1 + 1;
      }
    }
    if (count1 > 1) {
      this.notificationService.error(this.translate.instant("Language is already selected."));

      const controlArray = <FormArray>this.correspondenceForm.get('contacts');
      controlArray?.at(index).get('language')?.setValue(null);
    }
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>, element: any) {
    this.langFileList = [];
    this.apiService.get('getCOImage?id=' + element.corrTypeId + '&type=CO').subscribe(res => {
      console.log(res);
      if (res) {
        this.langFileList = res;
      }
    })
    this.dialog.open(templateRef);
  }
  getFileHref(index: any) {
    const controlArray = <FormArray>this.correspondenceForm.get('contacts');
    var f = controlArray?.at(index).get('name')?.value

    if (f != (null || undefined)) {
      return f;
    }
    else {
      return "";
    }

  }
  modify(index: any) {
    const controlArray = <FormArray>this.correspondenceForm.get('contacts');
    var f = controlArray?.at(index).get('URL')?.value

    const url = window.URL.createObjectURL(f);
    window.open(url);
  }
  isFileAvilable(index: any) {
    const controlArray = <FormArray>this.correspondenceForm.get('contacts');
    var f = controlArray?.at(index).get('URL')?.value
    if (f == undefined) {
      return false;
    }
    else {
      return true;
    }


  }

  getIndex(event: any) {
     return event;
  }

}
