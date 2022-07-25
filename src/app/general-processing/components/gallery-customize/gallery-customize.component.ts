import { Component, Input, OnInit } from "@angular/core";
import { CitationDetailResult, CustomGalleryLayout, GalleryDetails, NameAndAddressDetail, PaymentDetailResult, ProcessingDetailResult, ViolatioDetailResult } from "../../models/customlayout.interface";
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { TranslateService } from '@ngx-translate/core';
import { HideShow } from "../../models/hide-show.model";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ApiService } from "src/app/shared/services/api.service";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { ToastrService } from "ngx-toastr";
import { ResizedEvent } from 'angular-resize-event';
import { GPService } from "../../services/g-p.service";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-gallery-customize',
  templateUrl: './gallery-customize.component.html',
  styleUrls: ['./gallery-customize.component.scss']
})

export class GalleryCustomizeComponent implements OnInit {
  vioheight!: number;
  payheight!: number;
  addreheight!: number;
  citaheight!: number;
  procesheight!: number;

  layoutForm!: FormGroup;
  ticketNumber!: any;
  hideShow: HideShow = {
    isGallery: true,
    isPro: true,
    isvio: true,
    isPay: true,
    isCita: true,
    isAddress: true
  };
  violatioDetailResult!: ViolatioDetailResult;
  paymentDetailResult!: PaymentDetailResult;
  nameAndAddressDetail!: NameAndAddressDetail;
  citationDetailResult!: CitationDetailResult;
  processingDetailResult!: ProcessingDetailResult;

  gpService: any;

  @Input() galleryDetails!: GalleryDetails;
  customLayoutForm: any;
  customLayout!: CustomGalleryLayout;
  isCheckedNameandAddress = false;
  isCheckedViolation = false;
  isCheckedProcessing = false;
  isCheckedPayments = false;
  isCheckedCitation = false;
  isCheckedImage = false;
  isCheckedRadioLayoutOne = false;
  isCheckedRadioLayoutTwo = false;
  isCheckedRadioLayoutThree = false;
  successMsg: any;
  isprocessing: boolean = false;
  isviolation: boolean = false;
  isaddress: boolean = false;
  iscitation: boolean = false;
  ispayment: boolean = false;
  isGallery: boolean = false;
  customlayoutDetails: any;
  isProcessingGrid: boolean = false;
  isviolationGrid: boolean = false;
  iscitationGrid: boolean = false;
  isnameAddressGrid: boolean = false;
  isimageGrid: boolean = false;
  ispaymentsGrid: boolean = false;
  isUpdate = false;


  constructor(
    public translate: TranslateService,
    private language: LanguageService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService,
    private gPService: GPService,
    private galleryDialogRef: MatDialogRef<GalleryCustomizeComponent>
  ) { }

  ngOnInit() {
    this.customLayout = {
      citation: 'Y',
      citationHeight: 100,
      contractId: 2,
      functional: '1',
      image: 'Y',
      imageHeight: 100,
      layoutType: '1',
      nameAddress: 'Y',
      nameAddressHeight: 100,
      payementHeight: 100,
      payments: 'Y',
      processing: 'Y',
      processingHeight: 100,
      userId: 1,
      violation: 'Y',
      violationHeight: 100,
    }
    this.language.sendLang.subscribe(lang => {
      if (lang != "") {
        this.appendLang(lang);
      }
    });
    this.getcustomlayout();
    this.layoutForm = new FormGroup({
      citation: new FormControl(""),
      itationHeight: new FormControl(""),
      contractId: new FormControl(""),
      functional: new FormControl(""),
      image: new FormControl(""),
      imageHeight: new FormControl(""),
      layoutPrefrenceId: new FormControl(""),
      layoutType: new FormControl(""),
      nameAddress: new FormControl(""),
      nameAddressHeight: new FormControl(""),
      payementHeight: new FormControl(""),
      payments: new FormControl(""),
      processing: new FormControl(""),
      processingHeight: new FormControl(""),
      userId: new FormControl(""),
      violation: new FormControl(""),
      violationHeight: new FormControl(""),
    })
  }

  ViolationResized(event: ResizedEvent): void {
    this.customLayout.violationHeight = Math.round(event.newRect.height);
  }
  AddressResized(event: ResizedEvent): void {
    this.customLayout.nameAddressHeight = Math.round(event.newRect.height);
  }
  CitationResized(event: ResizedEvent): void {
    this.customLayout.citationHeight = Math.round(event.newRect.height);
  }
  PaymentsResized(event: ResizedEvent): void {
    this.customLayout.payementHeight = Math.round(event.newRect.height);
  }
  ProcessingResized(event: ResizedEvent): void {
    this.customLayout.processingHeight = Math.round(event.newRect.height);
  }

  appendLang(lang: string) {
    this.translate.use(lang);
  }

  public toggleField(val: string) {
    this.customLayout.layoutType = val;
  }

  isChecked(event: any, key: 'citation' | 'image' | 'payments' | 'nameAddress' | 'processing' | 'violation') {
    this.customLayout[key] = event?.checked ? 'Y' : 'N';
  }

  SaveLayout() {
    const request = {
      citation: this.customLayout.citation,
      citationHeight: this.customLayout.citationHeight,
      contractId: "2",
      functional: "1",
      image: this.customLayout.image,
      imageHeight: this.customLayout.imageHeight,
      layoutPrefrenceId: this.customLayout.layoutType,
      layoutType: this.customLayout.layoutType,
      nameAddress: this.customLayout.nameAddress,
      nameAddressHeight: this.customLayout.nameAddressHeight,
      payementHeight: this.customLayout.payementHeight,
      payments: this.customLayout.payments,
      processing: this.customLayout.processing,
      processingHeight: this.customLayout.processingHeight,
      userId: 1,
      violation: this.customLayout.violation,
      violationHeight: this.customLayout.violationHeight
    }
    if (this.isUpdate) {
      this.gPService.put(`getCustomLayout?userId=1`, request).subscribe((res: any) => {
        if (res.status == 'Success') {
          const msg = '';
          this.successMsg = this.translate.instant('Layout Updated Successfully', { msg: msg, });
          this.notificationService.success(this.successMsg);
          this.galleryDialogRef.close();
        }
      });
    } else {
      this.apiService.postViolation(`getCustomLayout`, request, true).subscribe((res: any) => {
        if (res.status == 'Success') {
          const msg = '';
          this.successMsg = this.translate.instant('Layout Added Successfully', { msg: msg, });
          this.notificationService.success(this.successMsg);
          this.galleryDialogRef.close();
        }
      });
    }
  }

  getcustomlayout() {
    this.apiService.getViolation('getCustomLayout', true).subscribe((res: any) => {
      if (res && res?.length) {
        this.customLayout = res[0];
        this.isUpdate = true;
      }
      this.language.sendLang.subscribe(lang => {
        if (lang != '') {
          this.appendLang(lang);
        }
      });
    });
  }

}
