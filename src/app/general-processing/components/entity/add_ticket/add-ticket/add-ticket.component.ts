import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AddTicketModel } from 'src/app/Models/addTicket.model'

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {

  ticketDetailsForm!: FormGroup;
  successMsg!: string;
  welcome: any;
  plateDetails: any;
  disablePlusBtn: boolean = false;
  badgeDetails: any;
  agencyDetails: any;
  addDisable: boolean = true;
  checkTicketVal: boolean = false;
  plateNumber!: string;
  isLoading!: boolean;
  entityDetails: any;
  citationNumber = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private apiService: ApiService,
    public translate: TranslateService, private notificationService: ToastrService,) {
    this.plateDetails = history.state;
  }

  get ticketData(): FormArray {
    return this.ticketDetailsForm.get("ticketData") as FormArray
  }

  newTicketData(): FormGroup {
    return this.fb.group({
      ticketNum: new FormControl('', Validators.required),
      amount: '',
      agency: '',
      badge: '',
    })
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      this.plateNumber = params['plateNumber'];
      this.citationNumber = params['citationNumber'];
      if (!this.citationNumber) {
        this.getEntityDetails();
      }
    });
    this.getAgencies();
    this.getBadgeNumber();
    this.ticketDetailsForm = this.fb.group({
      notes: '',
      ticketData: this.fb.array([]),

    });
    this.addTicketRow();
    if (this.citationNumber) {
      this.ticketData.controls[0]?.get('ticketNum')?.setValue(this.citationNumber);
    }
  }

  getBadgeNumber() {
    this.apiService.get('badgeNumber', false).subscribe((resp) => {
      if (resp) {
        this.badgeDetails = resp;
      }
    })
  }

  getEntityDetails() {
    this.apiService.getViolation(`getEntityDetails/${this.plateNumber}`, true).subscribe(res => {
      if (res.entityDetails) {
        this.entityDetails = res.entityDetails;
        this.isLoading = false;
      }
    },
      (err => { this.isLoading = false; }),
      () => { this.isLoading = false; });
  }

  getAgencies() {
    this.apiService.get('issuingAgency', false).subscribe((resp) => {
      if (resp) {
        this.agencyDetails = resp;
        this.isLoading = false;
      }
    })
  }

  agencySelect(event: any, i: number) {
    const result = this.agencyDetails.filter((element: { issuingAgencyId: any; }) => {
      return element.issuingAgencyId === event.value;
    });
    (<FormArray>this.ticketDetailsForm.get('ticketData')).controls[i].get('agency')?.setValue(result[0].issuingAgencyId);
  }

  badgeSelect(event: any, i: number) {
    const result = this.badgeDetails.filter((element: { badgeNumberId: any; }) => {
      return element.badgeNumberId === event.value;
    });
    (<FormArray>this.ticketDetailsForm.get('ticketData')).controls[i].get('badge')?.setValue(result[0].badgeNumberId);
  }

  regexStr = '^[ A-Za-z0-9_@./!@#$%^&*#&+-]*$';
  noWhiteSpace(event: any) {
    const key = event.keyCode;
    if (!((key > 64 && key < 91) || (key > 96 && key < 123) || key == 8 || key == 32 ||
      (key >= 48 && key <= 57)) && event.target.selectionStart === 0) {
      event.preventDefault();
      return false;
    }
    return new RegExp(this.regexStr).test(event.key);
  }

  addTicketRow() {
    this.addDisable = true;
    let t = this.ticketDetailsForm.controls['ticketData'];
    let len = t.value.length
    if (len <= 4) {
      this.ticketData.push(this.newTicketData());
    }
    else {
      this.disablePlusBtn = true;
    }
  }

  cancelAddTicket() {
    this.addDisable = true;
    history.back();
    // this.router.navigateByUrl('gp/search/entity-details/entity/' + this.plateNumber);
    this.notificationService.info(this.translate.instant("Process Cancelled"));
  }

  transformTotal(input: any, i: number) {
    let value = (<FormArray>this.ticketDetailsForm.get('ticketData')).controls[i].get(input)?.value;
    if (value != "" || value != null) {
      var decimalValue = parseFloat(value).toFixed(2);
      (<FormArray>this.ticketDetailsForm.get('ticketData')).controls[i].get('amount')?.setValue(decimalValue);
    }
  }

  checkValidations(data: any) {
    for (let i = 0; i < 5; i++) {
      if (data.ticketData[i] != undefined && data.ticketData[i].ticketNum != '') {
        if (data.ticketData[i].amount == '' || data.ticketData[i].amount == 'NaN') {
          (<FormArray>this.ticketDetailsForm.get('ticketData')).controls[i].get('amount')?.setErrors({ required: "Amount is Required" });
        }
        if (data.ticketData[i].agency == '') {
          (<FormArray>this.ticketDetailsForm.get('ticketData')).controls[i].get('agency')?.setErrors({ required: "Agency is Required" });
        }
        if (data.ticketData[i].badge == '') {
          (<FormArray>this.ticketDetailsForm.get('ticketData')).controls[i].get('badge')?.setErrors({ required: "Badge is Required" });
        }
      }
      for (let j = i + 1; j < 5; j++) {
        if (data.ticketData[i] != undefined && data.ticketData[j] != undefined) {
          if (data.ticketData[i].ticketNum == data.ticketData[j].ticketNum) {
            (<FormArray>this.ticketDetailsForm.get('ticketData')).controls[j].get('ticketNum')?.setErrors({ invalid: "Ticket is Duplicate" });
          }
        }
      }

    }
  }

  addTicketDetails(data: any) {
    this.checkValidations(data);
    let obj: any;
    if (this.ticketDetailsForm.valid) {
      if (data.ticketData[0] != undefined) {
        obj = {
          "citationRequestList": [
            {
              "agencyId": data.ticketData[0].agency,
              "amount": data.ticketData[0].amount,
              "badgeId": data.ticketData[0].badge,
              "citationNumber": data.ticketData[0].ticketNum.trim()
            }
          ],
          "notes": data.notes,
          "plateNumber": this.plateNumber,
        };
      }
      for (let i = 1; i < data.ticketData.length; i++) {
        if (data.ticketData[i] != undefined) {
          let ticketDetails = {
            "agencyId": data.ticketData[i].agency,
            "amount": data.ticketData[i].amount,
            "badgeId": data.ticketData[i].badge,
            "citationNumber": data.ticketData[i].ticketNum.trim()
          }
          obj.citationRequestList.push(ticketDetails);
        }
      }
      this.apiService.postViolation('addCitation', obj, true).subscribe((resp) => {
        if (resp.status == "Success") {
          this.router.navigateByUrl('gp/search/entity-details/entity/' + this.plateNumber);
          const msg = "";
          this.successMsg = this.translate.instant(resp.details[0].code, { msg: msg });
          this.notificationService.success(this.successMsg);
          this.ticketDetailsForm.reset();
        }
      }, error => {
        this.errorResponseCheck(error);
      });
    }
  }

  checkTicketNum() {
    this.addDisable = true;
  }

  checkEmptyTicket(data: any) {
    this.checkTicketVal = false;
    for (let i = 0; i < 5; i++) {
      if (data.ticketData[i] != undefined && data.ticketData[i].ticketNum == "") {
        this.checkTicketVal = true;
      }
    }
  }

  validateTicket(data: any) {
    this.checkEmptyTicket(data);
    if (this.checkTicketVal == true) {
      this.notificationService.error(this.translate.instant("Ticket Number cannot be empty"));
    }
    else {
      const obj = {
        "citationNo1": data.ticketData[0] != undefined ? data.ticketData[0].ticketNum : "",
        "citationNo2": data.ticketData[1] != undefined ? data.ticketData[1].ticketNum : "",
        "citationNo3": data.ticketData[2] != undefined ? data.ticketData[2].ticketNum : "",
        "citationNo4": data.ticketData[3] != undefined ? data.ticketData[3].ticketNum : "",
        "citationNo5": data.ticketData[4] != undefined ? data.ticketData[4].ticketNum : "",
      }

      this.apiService.postViolation('validateCitation', obj, true).subscribe((resp) => {
        if (data.ticketData[0] != undefined) {
          if (resp.citationNo1 != null) {
            (<FormArray>this.ticketDetailsForm.get('ticketData')).controls[0].get('ticketNum')?.setErrors({ invalid: "Invalid" });
          }
        }
        if (data.ticketData[1] != undefined) {
          if (resp.citationNo2 != null) {
            (<FormArray>this.ticketDetailsForm.get('ticketData')).controls[1].get('ticketNum')?.setErrors({ invalid: "Invalid" });
          }
        }
        if (data.ticketData[2] != undefined) {
          if (resp.citationNo3 != null) {
            (<FormArray>this.ticketDetailsForm.get('ticketData')).controls[2].get('ticketNum')?.setErrors({ invalid: "Invalid" });
          }
        }
        if (data.ticketData[3] != undefined) {
          if (resp.citationNo4 != null) {
            (<FormArray>this.ticketDetailsForm.get('ticketData')).controls[3].get('ticketNum')?.setErrors({ invalid: "Invalid" });
          }
        }
        if (data.ticketData[4] != undefined) {
          if (resp.citationNo5 != null) {
            (<FormArray>this.ticketDetailsForm.get('ticketData')).controls[4].get('ticketNum')?.setErrors({ invalid: "Invalid" });
          }
        }
        if (this.ticketDetailsForm.valid) {
          this.addDisable = false;
          this.notificationService.success(this.translate.instant("Validation Successful.!"));
        }
      }, error => {
        this.errorResponseCheck(error);
      });
    }
  }

  errorResponseCheck(error: any) {
    for (var i = 0; i < error.error.details.length; i++) {
      if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
        const msg = "";
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.ticketDetailsForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
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
