import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {Sort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormBuilder, FormGroup, FormControl, Validators,AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-signature-upload',
  templateUrl: './signature-upload.component.html',
  styleUrls: ['./signature-upload.component.scss']
})
export class SignatureUploadComponent implements OnInit {

uploadFileForm!:FormGroup
fileData: any;
fileArray :any =[];

  constructor(public translate: TranslateService, private language:LanguageService, private apiService: ApiService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService) { }

  ngOnInit(): void {
    this.language.sendLang.subscribe(lang =>{
      if(lang != '') {
       this.appendLang(lang);
      }
   });

   this.uploadFileForm = new FormGroup({
    'signatureUpload': new FormControl(null),
   })

  }

  appendLang(lang:string) {
    this.translate.use(lang);
  }

  UploadFile(file:any) {
      this.fileData = file.target.files;
      const obj = {
        "fileName": this.fileData[0].name,"docTypeId": "001","docGroup": "IO","description": "Issuing Officer","eventLevel": "","languageID": 1,"languageDescription": "English"
      }
      this.fileArray.push(obj);
      const dataObj = {
        "active": 1,
        "badgeAgency": 38,
        "badgeDivision": 102,
        "badgeNumber": "DB9",
        "badgeOfficerName": "RV",
        "contract": "2",
        "isUploaded": "1",
        "fileList" : obj
      }

      const finaldata = new FormData();
      
      finaldata.append('files',this.fileData[0]);
      finaldata.append('badgeNumberRequest', JSON.stringify(dataObj));
      this.apiService.post('badgeNumber',finaldata).subscribe(res => {
        console.log(res);
      })

  }

}
