import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {PaymentIvr} from '../../../Models/payment-ivr';
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
  selector: 'app-payment-ivr',
  templateUrl: './payment-ivr.component.html',
  styleUrls: ['./payment-ivr.component.scss']
})
export class PaymentIvrComponent implements OnInit {
  paymentIvrForm! : FormGroup;
  alertMsg: any;
  responseData : any;
  dataSource = new MatTableDataSource<PaymentIvr>();
  welcome: any;
  constructor(public translate: TranslateService,
     private language:LanguageService, private apiService: ApiService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService) { }

  ngOnInit(): void {
    this.language.sendLang.subscribe(lang =>{
      if(lang != '') {
       this.appendLang(lang);
      }
   });

   this.getIvrList();

   this.paymentIvrForm = new FormGroup({
    'cardsAmex': new FormControl(null),
    'cardsDiscover':new FormControl(null),
    'cardsVisaMasterCard': new FormControl(null),
    'clientNumber': new FormControl(null),
    'contractId': new FormControl(null),
    'createDateTime':new FormControl(null),
    'createUserId': new FormControl(null),
    'creditClCheckDigit': new FormControl(null),
    'creditClCompressFlag': new FormControl(null),
    'creditClNoticeFlag': new FormControl(null),
    'creditClNumber': new FormControl(null),
    'creditClPhoneFee': new FormControl('0.00',[Validators.maxLength(8),Validators.max(99999.99)]),
    'creditClPhoneSurcharge':new FormControl('0.0000',[Validators.maxLength(10),Validators.max(99999.9999)]),
    'creditClWebFee': new FormControl('0.00',[Validators.maxLength(8),Validators.max(99999.99)]),
    'creditClWebSurcharge': new FormControl('0.0000',[Validators.maxLength(10),Validators.max(99999.9999)]),
    'inquiryCollate': new FormControl(null),
    'inquiryFee': new FormControl(null),
    'inquiryFleet': new FormControl(null),
    'inquiryIPP': new FormControl(null),
    'inquiryLicense': new FormControl(null),
    'inquiryNotice': new FormControl(null),
    'inquiryPlate': new FormControl(null),
    'inquiryRedlight': new FormControl(null),
    'inquiryTicket': new FormControl(null),
    'ivrID': new FormControl(null),
    'paymentAll': new FormControl(null),
    'paymentAny': new FormControl(null),
    'paymentItem': new FormControl(null),
    'paymentList': new FormControl(null),
    'paymentListAny': new FormControl(null),
    'paymentListSpecial': new FormControl(null),
    'paymentRestore': new FormControl(null),
    'updateDateTime': new FormControl(null),
    'updateUserId': new FormControl(null)
  });


  }

  appendLang(lang:string) {
    this.translate.use(lang);
  }

  transformTotal(input: any) {
    var value = this.paymentIvrForm.get(input)?.value;
    if (value == "" || value == null) {
      this.paymentIvrForm.controls[input].setValue("0.0000");
    }
    else {
      var decimalValue = parseFloat(value).toFixed(4);
      this.paymentIvrForm.controls[input].setValue(decimalValue);
    }
  }

  transformTotalFee(val:any) {
    var value = this.paymentIvrForm.get(val)?.value;
    if (value == "" || value == null) {
      this.paymentIvrForm.controls[val].setValue("0.00");
    }
    else {
      var decimalValue = parseFloat(value).toFixed(2);
      this.paymentIvrForm.controls[val].setValue(decimalValue);
    }
  }

  getIvrList() {
    this.apiService.get('ivr').subscribe(res => {
      this.responseData = res;
      if(res.length > 0) {
      this.paymentIvrForm.controls["cardsVisaMasterCard"].setValue(res[0].cardsVisaMasterCard);
      this.paymentIvrForm.controls["cardsDiscover"].setValue(res[0].cardsDiscover);
      this.paymentIvrForm.controls["cardsAmex"].setValue(res[0].cardsAmex);
      this.paymentIvrForm.controls["creditClPhoneFee"].setValue(res[0]?.creditClPhoneFee == 0 ? "0.00":parseFloat(res[0].creditClPhoneFee).toFixed(2));
      this.paymentIvrForm.controls["creditClPhoneSurcharge"].setValue(res[0]?.creditClPhoneSurcharge == 0 ?"0.0000":parseFloat(res[0].creditClPhoneSurcharge).toFixed(4));
      this.paymentIvrForm.controls["inquiryCollate"].setValue(res[0].inquiryCollate);
      this.paymentIvrForm.controls["inquiryFee"].setValue(res[0].inquiryFee);
      this.paymentIvrForm.controls["inquiryFleet"].setValue(res[0].inquiryFleet);
      this.paymentIvrForm.controls["inquiryIPP"].setValue(res[0].inquiryIPP);
      this.paymentIvrForm.controls["inquiryLicense"].setValue(res[0].inquiryLicense);
      this.paymentIvrForm.controls["inquiryNotice"].setValue(res[0].inquiryNotice);
      this.paymentIvrForm.controls["inquiryPlate"].setValue(res[0].inquiryPlate);
      this.paymentIvrForm.controls["inquiryTicket"].setValue(res[0].inquiryTicket);
      this.paymentIvrForm.controls["inquiryRedlight"].setValue(res[0].inquiryRedlight);
      this.paymentIvrForm.controls["creditClNoticeFlag"].setValue(res[0].creditClNoticeFlag);
      this.paymentIvrForm.controls["creditClCheckDigit"].setValue(res[0].creditClCheckDigit);
      this.paymentIvrForm.controls["paymentItem"].setValue(res[0].paymentItem);
      this.paymentIvrForm.controls["paymentAll"].setValue(res[0].paymentAll);
      this.paymentIvrForm.controls["paymentRestore"].setValue(res[0].paymentRestore);
      this.paymentIvrForm.controls["paymentListAny"].setValue(res[0].paymentListAny);
      this.paymentIvrForm.controls["paymentList"].setValue(res[0].paymentList);
      this.paymentIvrForm.controls["paymentAny"].setValue(res[0].paymentAny);
      this.paymentIvrForm.controls["paymentListSpecial"].setValue(res[0].paymentListSpecial);
      this.paymentIvrForm.controls["creditClCompressFlag"].setValue(res[0].creditClCompressFlag);
      this.paymentIvrForm.controls["creditClWebFee"].setValue(res[0]?.creditClWebFee == 0 ?"0.00":parseFloat(res[0].creditClWebFee).toFixed(2));
      this.paymentIvrForm.controls["creditClWebSurcharge"].setValue(res[0].creditClWebSurcharge== 0 ?"0.0000":parseFloat(res[0].creditClWebSurcharge).toFixed(4));

    }else {
      this.setDefaultValue();
    }
})
  }


   setDefaultValue() {
    this.paymentIvrForm.controls['cardsVisaMasterCard'].setValue('N');
    this.paymentIvrForm.controls['cardsDiscover'].setValue('N');
    this.paymentIvrForm.controls['cardsAmex'].setValue('N');
    this.paymentIvrForm.controls['creditClPhoneFee'].setValue('0.00');
    this.paymentIvrForm.controls['creditClPhoneSurcharge'].setValue('0.0000');
    this.paymentIvrForm.controls['inquiryCollate'].setValue('N');
    this.paymentIvrForm.controls['inquiryFee'].setValue('N');
    this.paymentIvrForm.controls['inquiryFleet'].setValue('N');
    this.paymentIvrForm.controls['inquiryIPP'].setValue('N');
    this.paymentIvrForm.controls['inquiryLicense'].setValue('N');
    this.paymentIvrForm.controls['inquiryNotice'].setValue('N');
    this.paymentIvrForm.controls['inquiryPlate'].setValue('N');
    this.paymentIvrForm.controls['inquiryTicket'].setValue('N');
    this.paymentIvrForm.controls['inquiryRedlight'].setValue('N');
    this.paymentIvrForm.controls['creditClNoticeFlag'].setValue('N');
    this.paymentIvrForm.controls['creditClCheckDigit'].setValue('N');
    this.paymentIvrForm.controls['paymentItem'].setValue('N');
    this.paymentIvrForm.controls['paymentAll'].setValue('N');
    this.paymentIvrForm.controls['paymentRestore'].setValue('N');
    this.paymentIvrForm.controls['paymentListAny'].setValue('N');
    this.paymentIvrForm.controls['paymentList'].setValue('N');
    this.paymentIvrForm.controls['paymentAny'].setValue('N');
    this.paymentIvrForm.controls['paymentListSpecial'].setValue('N');
    this.paymentIvrForm.controls['creditClCompressFlag'].setValue('N');
    this.paymentIvrForm.controls['creditClWebFee'].setValue('0.00');
    this.paymentIvrForm.controls['creditClWebSurcharge'].setValue('0.0000');
  }

  updatepaymentIvr (data:any) {
    if(this.paymentIvrForm.valid) {
    const obj = {
        "cardsAmex": data.cardsAmex,
        "cardsDiscover": data.cardsDiscover,
        "cardsVisaMasterCard": data.cardsVisaMasterCard,
        "clientNumber": this.responseData[0].clientNumber,
        "contractId": this.responseData[0].contractId,
        "creditClCheckDigit": data.creditClCheckDigit,
        "creditClCompressFlag": data.creditClCompressFlag,
        "creditClNoticeFlag": data.creditClNoticeFlag,
        "creditClNumber": this.responseData[0].creditClNumber,
        "creditClPhoneFee": parseFloat(data.creditClPhoneFee),
        "creditClPhoneSurcharge": parseFloat(data.creditClPhoneSurcharge),
        "creditClWebFee": parseFloat(data.creditClWebFee),
        "creditClWebSurcharge": parseFloat(data.creditClWebSurcharge),
        "inquiryCollate": data.inquiryCollate,
        "inquiryFee": data.inquiryFee,
        "inquiryFleet": data.inquiryFee,
        "inquiryIPP": data.inquiryIPP,
        "inquiryLicense": data.inquiryLicense,
        "inquiryNotice": data.inquiryNotice,
        "inquiryPlate": data.inquiryPlate,
        "inquiryRedlight": data.inquiryRedlight,
        "inquiryTicket": data.inquiryTicket,
        "ivrId": this.responseData[0].ivrId,
        "paymentAll": data.paymentAll,
        "paymentAny": data.paymentAny,
        "paymentItem": data.paymentItem,
        "paymentList": data.paymentList,
        "paymentListAny": data.paymentListAny,
        "paymentListSpecial": data.paymentListSpecial,
        "paymentRestore": data.paymentRestore,
    }
    console.log(JSON.stringify(obj));

    this.apiService.put('ivr/?ivrId='+this.responseData[0].ivrId,obj).subscribe(res => {
        console.log(res);
        if(res.status == 'Success') {
          this.getIvrList();
          const msg ='';
          this.welcome = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.welcome);
        }
    }, (error) => {
      this.errorResponseCheck(error);
    })
  }

  }

  cancelChanges() {
    this.getIvrList();
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }


  // ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//
  errorResponseCheck(error: any) {

    for (var i = 0; i < error.error.details.length; i++) {
      if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
        const msg = "";
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.paymentIvrForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.paymentIvrForm.get("phoneStatusCode")?.setErrors({ invalid: "Phone Status Code Duplicate" });
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }

}

}
