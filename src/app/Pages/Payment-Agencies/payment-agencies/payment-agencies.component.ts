import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { get } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { PaymentAgenciesModel } from 'src/app/Models/Payments/agencies.model';
import { PaymentAgenciesService } from 'src/app/Services/payment-agencies.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-payment-agencies',
  templateUrl: './payment-agencies.component.html',
  styleUrls: ['./payment-agencies.component.scss']
})
export class PaymentAgenciesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('search') searchString!: ElementRef;
  agenciesForm!: FormGroup;
  displayedColumns: string[] = ['agenciesName', 'paymentVendorsLink', 'paymentVendorsName', 'Action'];
  dataSource = new MatTableDataSource<PaymentAgenciesModel>();
  agencyList!: PaymentAgenciesModel[];
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  alertMsg!: string;
  successMsg!: string;
  welcome: any;
  paymentVendorList: any;
  workflowState: any;
  statesList: any;
  logoImgBytes: any;
  hideAddBtn: boolean = false;
  agencyDetailsById: any;
  logoFileName: any;
  file: any;

  constructor(public translate: TranslateService,
    private headerSection: LanguageService,
    private notificationService: ToastrService,
    private _liveAnnouncer: LiveAnnouncer,
    private agencyService: PaymentAgenciesService) { }

  ngOnInit(): void {
    this.getAgencies();
    this.headerSection.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    this.getPaymentVendor();
    this.getWorkflowStates();
    this.getStates();
    let fileName = '';
    // FORM CONTROLS
    this.agenciesForm = new FormGroup({
      'name': new FormControl("", [Validators.required, Validators.maxLength(40)]),
      'payVendor': new FormControl("", [Validators.required]),
      'workflow': new FormControl("", [Validators.required]),
      'payLink': new FormControl("", [Validators.required, Validators.maxLength(500)]),
      'payByWeb': new FormControl("", [Validators.required]),
      'line1': new FormControl("", [Validators.required, Validators.maxLength(35)]),
      'line2': new FormControl("", [Validators.maxLength(35)]),
      'city': new FormControl("", [Validators.required, Validators.maxLength(20)]),
      'state': new FormControl("", [Validators.required]),
      'zip': new FormControl("", [Validators.required]),
      'phone': new FormControl("", [Validators.required]),
      'imageError': new FormControl("", [Validators.maxLength(150)]),
      'enable': new FormControl(false),
      'logoUpload': new FormControl(""),
      'logoName': new FormControl(fileName),
      'videoError': new FormControl("", [Validators.maxLength(150)]),
      'logoLink': new FormControl("", [ Validators.maxLength(150)]),
      'comments': new FormControl("", [Validators.maxLength(3500)])
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

  workflowStateSelect(event: any) {
    const result = this.workflowState.filter((element: { workflowStatesID: any; }) => {
      return element.workflowStatesID === event.value;
    });
    // To set the value
    this.agenciesForm.controls['workflow'].setValue(result[0].workflowStatesID);
  }

  stateSelect(event: any) {
    const result = this.statesList.filter((element: { stateProvincesID: any; }) => {
      return element.stateProvincesID === event.value;
    });
    // To set the value
    this.agenciesForm.controls['state'].setValue(result[0].stateProvincesID);
  }

  payVendorSelect(event: any) {
    const result = this.paymentVendorList.filter((element: { paymentVendorsID: any; }) => {
      return element.paymentVendorsID === event.value;
    });
    // To set the value
    this.agenciesForm.controls['payVendor'].setValue(result[0].paymentVendorsID);
  }

  // ----------------------------------------------- API OPERATIONS ----------------------------->

  getAgencies() {
    this.agencyService.getAgency().subscribe(resp => {
      this.agencyList = resp.map(element => {
        return new PaymentAgenciesModel(element)
      });
      this.dataSource = new MatTableDataSource<PaymentAgenciesModel>(this.agencyList.reverse());
      this.dataSource.sort = this.sort;
      if (resp.length >= 1) {
        this.hideAddBtn = true;
      }
      this.sort.disableClear = true;
      this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
        if (typeof data[sortHeaderId] === 'string') {
          return data[sortHeaderId].toLocaleLowerCase();
        }
        return data[sortHeaderId];
      };
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPaymentVendor() {
    this.agencyService.getPaymentVendor().subscribe(res => {
      this.paymentVendorList = res;
    });
  }

  getWorkflowStates() {
    let contractId = 2;
    this.agencyService.getWorkflowStates(contractId).subscribe(res => {
      this.workflowState = res;
    });
  }

  getStates() {
    this.agencyService.getStates().subscribe(res => {
      this.statesList = res;
    });
  }

  addAgencyRecord(formData: any) {
    this.sort.sort(
      { id: '', start: 'asc', disableClear: false }
    )
    if (this.agenciesForm.valid) {
      const obj = {
        paymentAgencyModel: {
          createUserID: 1,
          updateUserID: 1,
          createDatetime: new Date().toISOString(),
          updateDatetime: new Date().toISOString(),
          isDeleted: "N",
          paymentAgenciesID: 0,
          contractID: 2,
          active: true,
          agenciesName: formData.name.trim(),
          paymentVendorsID: formData.payVendor,
          paymentVendorsLink: formData.payLink.trim(),
          streetLine1: formData.line1.trim(),
          streetLine2: formData.line2.trim(),
          city: formData.city.trim(),
          stateProvincesID: formData.state,
          zipCode: formData.zip,
          phone: formData.phone,
          velocityPaymentSettingsID: 1,
          fileName: this.logoFileName,
          // logoLink: formData.logoLink,
          comments: formData.comments.trim(),
          receiptWorkflowStatesID: formData.workflow,
          payByWebClientsCode: formData.payByWeb,
          imageErrorMessage: formData.imageError.trim(),
          maintenance: this.agenciesForm.value.enable,
          videoErrorMessage: formData.videoError.trim(),
          contents: this.logoImgBytes
        }
      }

      this.agencyService.addAgency(obj).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant(res.details[0].code, { msg: msg });
          this.notificationService.success(this.successMsg);
          this.searchString.nativeElement.value = ""
          this.agenciesForm.reset({ enable: false });
          this.paginator.pageIndex = 0;
          this.getAgencies();
          this.showAddForm = false;
          // this.logoImgBytes = "";
          // this.logoFileName = "";
          // this.file = "";
        }
      }, error => {
        this.errorResponseCheck(error);
      });
    }
  }

  handleFileInput(event: any) {
    let files = event.files[0];
    this.logoFileName = files.name;
    if (files.type == "image/png" || files.type == "image/jpeg") {
      if (files.size < 2000000) {
        this.file = this.logoFileName;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.logoImgBytes = e.target.result.split('base64,')[1];
        };
        reader.readAsDataURL(files);
      }
      else {
        const msg = "";
        this.successMsg = this.translate.instant("File size should not be greater than 2MB", { msg: msg });
        this.notificationService.error(this.successMsg);
        this.agenciesForm.controls['logoUpload'].setValue(null);
      }

    }
    else {
      const msg = "";
      this.successMsg = this.translate.instant("Please Upload file only JPEG/PNG format", { msg: msg });
      this.notificationService.error(this.successMsg);
      this.agenciesForm.controls['logoUpload'].setValue(null);
    }

  }

  editIconClicked(rowData: any) {
    this.showEditForm = true;
    this.agencyService.getPaymentAgencyById(rowData.paymentAgenciesID).subscribe((resp) => {
      this.agencyDetailsById = resp;
      this.agenciesForm.controls['name'].setValue(resp[0].agenciesName);

      // To set the Payment Vendor value
      const payVendor = this.paymentVendorList.filter((element: { paymentVendorsID: any; }) => {
        return element.paymentVendorsID === resp[0].paymentVendorsID;
      });
      this.agenciesForm.controls['payVendor'].setValue(payVendor[0].paymentVendorsID);

      // To set the workflowState value
      const workflowRes = this.workflowState.filter((element: { workflowStatesID: any; }) => {
        return element.workflowStatesID === resp[0].receiptWorkflowStatesID;
      });

      this.agenciesForm.controls['workflow'].setValue(workflowRes[0].workflowStatesID);
      this.agenciesForm.controls['payLink'].setValue(resp[0].paymentVendorsLink);
      this.agenciesForm.controls['payByWeb'].setValue(resp[0].payByWebClientsCode);
      this.agenciesForm.controls['line1'].setValue(resp[0].streetLine1);
      this.agenciesForm.controls['line2'].setValue(resp[0].streetLine2);
      this.agenciesForm.controls['city'].setValue(resp[0].city);

      // To set the State Province value
      const stateId = this.statesList.filter((element: { stateProvincesID: any; }) => {
        return element.stateProvincesID === resp[0].stateProvincesID;
      });
      this.agenciesForm.controls['state'].setValue(stateId[0].stateProvincesID);
      this.agenciesForm.controls['zip'].setValue(resp[0].zipCode);
      this.agenciesForm.controls['phone'].setValue(resp[0].phone);
      this.agenciesForm.controls['imageError'].setValue(resp[0].imageErrorMessage);
      this.agenciesForm.controls['videoError'].setValue(resp[0].videoErrorMessage);
      this.agenciesForm.controls['enable'].setValue(resp[0].maintenance);
      this.agenciesForm.controls['logoLink'].setValue(resp[0].logoLink);
      this.agenciesForm.controls['comments'].setValue(resp[0].comments);
      // To set the filename
      this.file = resp[0].fileName; // <--- File Object for future use.
    });
  }

  updateAgencyRecord(formData: any) {
    if (this.agenciesForm.valid) {
      const obj = {
        paymentAgencyModel: {
          createUserID: 1,
          updateUserID: 1,
          createDatetime: new Date().toISOString(),
          updateDatetime: new Date().toISOString(),
          isDeleted: "N",
          paymentAgenciesID: this.agencyDetailsById[0].paymentAgenciesID,
          contractID: 2,
          active: true,
          agenciesName: formData.name.trim(),
          paymentVendorsID: formData.payVendor,
          paymentVendorsLink: formData.payLink.trim(),
          streetLine1: formData.line1.trim(),
          streetLine2: formData.line2.trim(),
          city: formData.city.trim(),
          stateProvincesID: formData.state,
          zipCode: formData.zip,
          phone: formData.phone,
          velocityPaymentSettingsID: 1,
          fileName: this.logoFileName,
          logoLink: formData.logoLink,
          comments: formData.comments.trim(),
          receiptWorkflowStatesID: formData.workflow,
          payByWebClientsCode: formData.payByWeb,
          imageErrorMessage: formData.imageError.trim(),
          maintenance: this.agenciesForm.value.enable,
          videoErrorMessage: formData.videoError.trim(),
          contents: this.logoImgBytes
        }
      }
      this.agencyService.updateAgency(obj).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          this.successMsg = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.searchString.nativeElement.value = ""
          this.agenciesForm.reset({ enable: false });
          this.getAgencies();
          this.showAddForm = false;
          this.showEditForm = false;
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    }
  }

  toggleAgency(id: number, status: boolean) {
    let payId = {
      paymentAgenciesID: id
    }
    const msgs = "";
    if (status) {
      if (confirm(this.translate.instant("Are you sure you want to Enable the Agency", { msg: msgs }))) {
        this.agencyService.toggleAgency(payId).subscribe(res => {
          if (res.status == "Success") {
            const msg = "";
            this.successMsg = this.translate.instant("Agency Enabled Successfully", { msg: msg });
            this.notificationService.success(this.successMsg);
            this.getAgencies();
          }
        })

      }
    } else {
      if (confirm(this.translate.instant("Are you sure you want to Disable the Agency", { msg: msgs }))) {
        this.agencyService.toggleAgency(payId).subscribe(res => {
          if (res.status === "Success") {
            const msg = "";
            this.successMsg = this.translate.instant("Agency Disabled Successfully", { msg: msg });
            this.notificationService.success(this.successMsg);
            this.getAgencies();
          }
        })

      }
    }
  }


  cancelAdd_Save() {
    this.agenciesForm.reset({ enable: false });
    this.searchString.nativeElement.value = ""
    this.showAddForm = false;
    this.showEditForm = false;
    // this.logoImgBytes = "";
    // this.logoFileName = "";
    // this.file = "";
    this.getAgencies();
    this.paginator.pageIndex = 0;
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }


  showAddFormPage() {
    this.file = "";
    this.showAddForm = true;
  }

  // ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//

  errorResponseCheck(error: any) {
    for (var i = 0; i < error.error.details.length; i++) {
      if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
        const msg = "";
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.agenciesForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Unknown error occured, please contact support team.", { msg: msg }));
      }
    }
  }

}
