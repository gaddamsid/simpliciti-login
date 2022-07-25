import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-ingestion-setting',
  templateUrl: './ingestion-setting.component.html',
  styleUrls: ['./ingestion-setting.component.scss']
})
export class IngestionSettingComponent implements OnInit {
  ingestionForm!: FormGroup;
  categoriesList: any;
  queueList: any;
  contractID: any = 2; // This has to be fetch from sessionw when application will have it
  createUserID: any = 2; // This has to be fetch from sessionw when application will have it
  ingestionSettings: any;
  ingestionId: any;
  displaySpinner: any = false;
  checkBoxArray = [
    {
      'key': 'eventsExceedingSpeed',
      'value': false
    },
    {
      'key': 'eventsBelowSpeed',
      'value': false
    },
    {
      'key': 'eventsRedSecondsBelow',
      'value': false
    },
    {
      'key': 'eventsTestShots',
      'value': false
    },
    {
      'key': 'eventsGreenSecondsBelow',
      'value': false
    },
    {
      'key': 'eventsZeroVelocity',
      'value': false
    }
  ];

  constructor(private apiService: ApiService, public translate: TranslateService, private cdRef: ChangeDetectorRef,
    private language: LanguageService, private notificationService: ToastrService) { }

  ngOnInit(): void {
    this.getData();
    this.language.sendLang.subscribe(lang => {
      if (lang != "") {
        this.appendLang(lang);
      }
    });
    this.ingestionForm = new FormGroup({
      'eventsExceedingSpeed': new FormControl(""),
      'exceedingSpeed': new FormControl(""),
      'exceedingSpeedCategory': new FormControl(""),
      'exceedingSpeedQueue': new FormControl(""),
      'eventsBelowSpeed': new FormControl(""),
      'belowSpeed': new FormControl(""),
      'belowSpeedCategory': new FormControl(""),
      'belowSpeedQueue': new FormControl(""),
      'eventsRedSecondsBelow': new FormControl(""),
      'redSecondsBelow': new FormControl(""),
      'redSecondsBelowCategory': new FormControl(""),
      'redSecondsBelowQueue': new FormControl(""),
      'eventsGreenSecondsBelow': new FormControl(""),
      'greenSecondsBelow': new FormControl(""),
      'greenSecondsBelowCategory': new FormControl(""),
      'greenSecondsBelowQueue': new FormControl(""),
      'eventsTestShots': new FormControl(""),
      'testShotsCategory': new FormControl(""),
      'testShotsQueue': new FormControl(""),
      'eventsZeroVelocity': new FormControl(""),
      'zeroVelocityCategory': new FormControl(""),
      'zeroVelocityQueue': new FormControl(""),
      'snapshotTimeMilli': new FormControl(),
      'snapshotTime': new FormControl(),
    });
  }
  appendLang(lang: string) {
    this.translate.use(lang);
  }
  getData() {
    this.displaySpinner = true;
    this.apiService.get('IngestionSettings/getIngestionSettingsById?ContractID=' + this.contractID, true).subscribe(res => {
      this.displaySpinner = false;
      if (res) {
        this.ingestionSettings = res;
        this.setFormsValue(res);
      } else {
        this.ingestionSettings = null;
        this.ingestionForm.disable();
        this.ingestionForm.controls['eventsExceedingSpeed'].enable();
        this.ingestionForm.controls['eventsBelowSpeed'].enable();
        this.ingestionForm.controls['eventsRedSecondsBelow'].enable();
        this.ingestionForm.controls['eventsTestShots'].enable();
        this.ingestionForm.controls['eventsGreenSecondsBelow'].enable();
        this.ingestionForm.controls['eventsZeroVelocity'].enable();
        this.ingestionForm.controls['snapshotTime'].enable();
      }
    });
    this.apiService.get('Categories/getCategoriesById?ContractID=' + this.contractID, true).subscribe(res => {
      this.displaySpinner = false;
      if (res) {
        this.categoriesList = res;
      }
    });
    this.apiService.get('WorkflowStates/getWorkflowStatesById?ContractID=' + this.contractID, true).subscribe(res => {
      this.displaySpinner = false;
      if (res) {
        this.queueList = res;
      }
    });
  }
  setFormsValue(data: any) {
    this.displaySpinner = true;
    this.ingestionForm.disable();
    this.enableForm(data);
    this.ingestionId = data?.ingestionSettingsID;
    this.ingestionForm.controls['eventsExceedingSpeed'].setValue(data?.rejectExceedingSpeed);
    this.ingestionForm.controls['eventsBelowSpeed'].setValue(data?.rejectBelowSpeed);
    this.ingestionForm.controls['belowSpeed'].setValue(data?.rejectBelowSpeedValue);
    this.ingestionForm.controls['exceedingSpeed'].setValue(data?.rejectExceedingSpeedValue);
    this.ingestionForm.controls['eventsGreenSecondsBelow'].setValue(data?.rejectGreenMinimumSpeed);
    this.ingestionForm.controls['greenSecondsBelow'].setValue(data?.rejectGreenMinimumSpeedValue);
    this.ingestionForm.controls['eventsRedSecondsBelow'].setValue(data?.rejectRedSecondsBelow);
    this.ingestionForm.controls['redSecondsBelow'].setValue(data?.rejectRedSecondsBelowValue);
    this.ingestionForm.controls['eventsTestShots'].setValue(data?.rejectTestShots);
    this.ingestionForm.controls['eventsZeroVelocity'].setValue(data?.rejectZeroVelocity);
    if ((data?.rejectBelowSpeedCategoryId)?.toString() != '0')
      this.ingestionForm.controls['belowSpeedCategory'].setValue(data?.rejectBelowSpeedCategoryId?.toString());
    if ((data?.rejectExceedingSpeedCategoryId)?.toString() != '0')
      this.ingestionForm.controls['exceedingSpeedCategory'].setValue(data?.rejectExceedingSpeedCategoryId?.toString());
    if ((data?.rejectGreenMinimumSpeedCategoryId)?.toString() != '0')
      this.ingestionForm.controls['greenSecondsBelowCategory'].setValue(data?.rejectGreenMinimumSpeedCategoryId?.toString());
    if ((data?.rejectRedSecondsBelowCategoryId)?.toString() != '0')
      this.ingestionForm.controls['redSecondsBelowCategory'].setValue(data?.rejectRedSecondsBelowCategoryId?.toString());
    if ((data?.rejectTestShotsCategoryId)?.toString() != '0')
      this.ingestionForm.controls['testShotsCategory'].setValue(data?.rejectTestShotsCategoryId?.toString());
    if ((data?.rejectZeroVelocityCategoryId)?.toString() != '0')
      this.ingestionForm.controls['zeroVelocityCategory'].setValue(data?.rejectZeroVelocityCategoryId?.toString());

    if ((data?.rejectBelowSpeedWorkflowId)?.toString() != '0')
      this.ingestionForm.controls['belowSpeedQueue'].setValue(data?.rejectBelowSpeedWorkflowId?.toString());
    if ((data?.rejectExceedingSpeedWorkflowId)?.toString() != '0')
      this.ingestionForm.controls['exceedingSpeedQueue'].setValue(data?.rejectExceedingSpeedWorkflowId?.toString());
    if ((data?.rejectGreenMinimumSpeedWorkflowId)?.toString() != '0')
      this.ingestionForm.controls['greenSecondsBelowQueue'].setValue(data?.rejectGreenMinimumSpeedWorkflowId?.toString());
    if ((data?.rejectRedSecondsBelowWorkflowId)?.toString() != '0')
      this.ingestionForm.controls['redSecondsBelowQueue'].setValue(data?.rejectRedSecondsBelowWorkflowId?.toString());
    if ((data.rejectTestShotsWorkflowId)?.toString() != '0')
      this.ingestionForm.controls['testShotsQueue'].setValue(data?.rejectTestShotsWorkflowId?.toString());
    if ((data?.rejectZeroVelocityCategoryWorkflowId)?.toString() != '0')
      this.ingestionForm.controls['zeroVelocityQueue'].setValue(data.rejectZeroVelocityCategoryWorkflowId?.toString());

    this.ingestionForm.controls['snapshotTimeMilli'].setValue(data?.autoSnapMilliSeconds?.toString());
    this.ingestionForm.controls['snapshotTime'].setValue(data?.enableVideoAutoSnap);
    this.displaySpinner = false;
  }

  enableForm(data: any) {
    this.ingestionForm.controls['eventsExceedingSpeed'].enable();
    if (data.rejectExceedingSpeed) {
      this.updateValidation({ checked: true }, 'exceedingSpeedCategory',
        'exceedingSpeedQueue', 'exceedingSpeed');
    }
    this.ingestionForm.controls['eventsBelowSpeed'].enable();
    if (data.rejectBelowSpeed) {
      this.updateValidation({ checked: true }, 'belowSpeedCategory', 'belowSpeedQueue', 'belowSpeed');
    }
    this.ingestionForm.controls['eventsRedSecondsBelow'].enable();
    if (data.rejectRedSecondsBelow) {
      this.updateValidation({ checked: true }, 'redSecondsBelowCategory',
        'redSecondsBelowQueue', 'redSecondsBelow');
    }
    this.ingestionForm.controls['eventsTestShots'].enable();
    if (data.rejectTestShots) {
      this.updateValidation({ checked: true }, 'testShotsCategory', 'testShotsQueue');
    }
    this.ingestionForm.controls['eventsGreenSecondsBelow'].enable();
    if (data.rejectGreenMinimumSpeed) {
      this.updateValidation({ checked: true }, 'greenSecondsBelowCategory',
        'greenSecondsBelowQueue', 'greenSecondsBelow');
    }
    this.ingestionForm.controls['eventsZeroVelocity'].enable();
    if (data.rejectZeroVelocity) {
      this.updateValidation({ checked: true }, 'zeroVelocityCategory', 'zeroVelocityQueue');
    }
    this.ingestionForm.controls['snapshotTime'].enable();
    if (data.enableVideoAutoSnap) {
      this.updateMilliValidation({ checked: true }, 'snapshotTimeMilli');
    }
  }
  updateValidation($event: any, exceedingSpeedCategoryRef: any, exceedingSpeedQueueRef: any, exceedingSpeedRef?: any) {
    let exceedingSpeed;
    if (exceedingSpeedRef)
      exceedingSpeed = this.ingestionForm.get(exceedingSpeedRef);
    const exceedingSpeedCategory = this.ingestionForm.get(exceedingSpeedCategoryRef);
    const exceedingSpeedQueue = this.ingestionForm.get(exceedingSpeedQueueRef);
    if (exceedingSpeedCategory && exceedingSpeedQueue) {
      if ($event.checked) {
        if (exceedingSpeed) {
          exceedingSpeed.enable();
          exceedingSpeed.setValidators([Validators.required, Validators.pattern('^[0-9]\\d*$')]);
        }
        exceedingSpeedCategory.enable();
        exceedingSpeedCategory.setValidators([Validators.required]);
        exceedingSpeedQueue.enable();
        if (this.ingestionSettings)
          this.setSavedValue(exceedingSpeedCategoryRef, this.ingestionSettings);
      } else {
        if (exceedingSpeed) {
          exceedingSpeed.clearValidators();
          exceedingSpeed.disable();
          exceedingSpeed.setValue('0');
        }
        exceedingSpeedCategory.clearValidators();
        exceedingSpeedCategory.disable();
        exceedingSpeedCategory.reset();
        exceedingSpeedCategory.setValue('');
        exceedingSpeedQueue.disable();
        exceedingSpeedQueue.reset();
        exceedingSpeedQueue.setValue('');

      }
      if (exceedingSpeed)
        exceedingSpeed.updateValueAndValidity();
      exceedingSpeedCategory.updateValueAndValidity();
    }
    this.checkBoxArray.forEach(item => {
      if (item.value === false || _.isNull(item.value)) {
        this.setErrorNull(item);
      }
    });
  }

  private setErrorNull(item: { key: string; value: boolean; }) {
    switch (item.key) {
      case 'eventsExceedingSpeed':
        this.ingestionForm.controls['exceedingSpeed'].setErrors(null);
        this.ingestionForm.controls['exceedingSpeedCategory'].setErrors(null);
        break;
      case 'eventsBelowSpeed':
        this.ingestionForm.controls['belowSpeedCategory'].setErrors(null);
        this.ingestionForm.controls['belowSpeed'].setErrors(null);
        break;
      case 'eventsTestShots':
        this.ingestionForm.controls['testShotsCategory'].setErrors(null);
        break;
      case 'eventsGreenSecondsBelow':
        this.ingestionForm.controls['greenSecondsBelowCategory'].setErrors(null);
        this.ingestionForm.controls['greenSecondsBelow'].setErrors(null);
        break;
      case 'eventsRedSecondsBelow':
        this.ingestionForm.controls['redSecondsBelow'].setErrors(null);
        this.ingestionForm.controls['redSecondsBelowCategory'].setErrors(null);
        break;
      case 'eventsZeroVelocity':
        this.ingestionForm.controls['zeroVelocityCategory'].setErrors(null);
        break;
      default:
        break;
    }
  }

  setSavedValue(checkboxValue: any, data: any) {
    if(data)
   { switch (checkboxValue) {
      case "exceedingSpeedCategory":
        this.ingestionForm.controls['exceedingSpeed'].setValue(data.rejectExceedingSpeedValue);
        if (data.rejectExceedingSpeedCategoryId?.toString() != '0')
          this.ingestionForm.controls['exceedingSpeedCategory'].setValue(data.rejectExceedingSpeedCategoryId?.toString());
        if (data.rejectExceedingSpeedWorkflowId?.toString() != '0')
          this.ingestionForm.controls['exceedingSpeedQueue'].setValue(data.rejectExceedingSpeedWorkflowId?.toString());
        break;
      case "belowSpeedCategory":
        this.ingestionForm.controls['belowSpeed'].setValue(data.rejectBelowSpeedValue);
        if (data.rejectBelowSpeedCategoryId?.toString() != '0')
          this.ingestionForm.controls['belowSpeedCategory'].setValue(data.rejectBelowSpeedCategoryId?.toString());
        if (data.rejectBelowSpeedWorkflowId?.toString() != '0')
          this.ingestionForm.controls['belowSpeedQueue'].setValue(data.rejectBelowSpeedWorkflowId?.toString());
        break;
      case "redSecondsBelowCategory":
        this.ingestionForm.controls['redSecondsBelow'].setValue(data.rejectRedSecondsBelowValue);
        if (data.rejectRedSecondsBelowCategoryId?.toString() != '0')
          this.ingestionForm.controls['redSecondsBelowCategory'].setValue(data.rejectRedSecondsBelowCategoryId?.toString());
        if (data.rejectRedSecondsBelowWorkflowId?.toString() != '0')
          this.ingestionForm.controls['redSecondsBelowQueue'].setValue(data.rejectRedSecondsBelowWorkflowId?.toString());
        break;
      case "greenSecondsBelowCategory":
        if (data.rejectGreenMinimumSpeedCategoryId?.toString() != '0')
          this.ingestionForm.controls['greenSecondsBelowCategory'].setValue(data.rejectGreenMinimumSpeedCategoryId?.toString());
        if (data.rejectGreenMinimumSpeedWorkflowId?.toString() != '0')
          this.ingestionForm.controls['greenSecondsBelowQueue'].setValue(data.rejectGreenMinimumSpeedWorkflowId?.toString());
        this.ingestionForm.controls['greenSecondsBelow'].setValue(data.rejectGreenMinimumSpeedValue);

        break;
      case "testShotsCategory":
        if (data.rejectTestShotsCategoryId?.toString() != '0')
          this.ingestionForm.controls['testShotsCategory'].setValue(data.rejectTestShotsCategoryId?.toString());
        if (data.rejectTestShotsWorkflowId?.toString() != '0')
          this.ingestionForm.controls['testShotsQueue'].setValue(data.rejectTestShotsWorkflowId?.toString());
        break;
      case "zeroVelocityCategory":
        if (data.rejectZeroVelocityCategoryId?.toString() != '0')
          this.ingestionForm.controls['zeroVelocityCategory'].setValue(data.rejectZeroVelocityCategoryId?.toString());
        if (data.rejectZeroVelocityCategoryWorkflowId?.toString() != '0')
          this.ingestionForm.controls['zeroVelocityQueue'].setValue(data.rejectZeroVelocityCategoryWorkflowId?.toString());
        break;

        case "snapshotTime":
          if (data.autoSnapMilliSeconds?.toString() != '0')
            this.ingestionForm.controls['snapshotTimeMilli'].setValue(data.autoSnapMilliSeconds?.toString());
          break;

      default:
        break;
    }}
  }


  updateMilliValidation($event: any, snapshotTimeMilliRef?: any) {
    const snapshotTimeMilli = this.ingestionForm.get(snapshotTimeMilliRef);
    if (snapshotTimeMilli) {
      if ($event.checked) {
        snapshotTimeMilli.enable();
        snapshotTimeMilli.setValidators([Validators.required, Validators.pattern('^[0-9]\\d*$')]);
        if (this.ingestionSettings)
        this.setSavedValue('snapshotTime', this.ingestionSettings);
      } else {
        snapshotTimeMilli.disable();
        snapshotTimeMilli.clearValidators();
        snapshotTimeMilli.setValue('0');
      }
      snapshotTimeMilli.updateValueAndValidity();
    }

  }

  saveData(data: any) {
    this.ingestionForm.updateValueAndValidity();
    const formValid:any = [];
    Object.keys(this.ingestionForm.controls).forEach((key) => {
      const control = this.ingestionForm.controls[key];
      const index = this.checkBoxArray.findIndex(item => item.key === key);
      if (index != -1) {
        this.checkBoxArray[index].value = _.clone(control.value);
        if (this.checkBoxArray[index].value)
          formValid.push(this.setValidation(key));
      }
    });

  if(formValid.includes(false)){
    return;
  }
  if(this.ingestionForm.valid) {
    this.displaySpinner = true;
    const obj = {
      "ingestionSettingModel": {
        "createUserID": this.createUserID,
        "isDeleted": "N",
        "ingestionSettingsID": this.ingestionId,
        "active": true,
        "contractID": this.contractID,
        "rejectBelowSpeed": (data.eventsBelowSpeed ? true : false),
        "rejectBelowSpeedValue": (data.belowSpeed ? data.belowSpeed : 0),
        "rejectExceedingSpeed": (data.eventsExceedingSpeed ? data.eventsExceedingSpeed : false),
        "rejectExceedingSpeedValue": (data.exceedingSpeed ? data.exceedingSpeed : 0),
        "rejectGreenMinimumSpeed": (data.eventsGreenSecondsBelow ? data.eventsGreenSecondsBelow : false),
        "rejectGreenMinimumSpeedValue": (data.greenSecondsBelow ? data.greenSecondsBelow : 0),
        "rejectRedSecondsBelow": (data.eventsRedSecondsBelow ? data.eventsRedSecondsBelow : false),
        "rejectRedSecondsBelowValue": (data.redSecondsBelow ? data.redSecondsBelow : 0),
        "rejectTestShots": (data.eventsTestShots ? true : false),
        "rejectZeroVelocity": (data.eventsZeroVelocity ? true : false),
        "rejectBelowSpeedCategoryId": (data.belowSpeedCategory ? data.belowSpeedCategory : 0),
        "rejectExceedingSpeedCategoryId": (data.exceedingSpeedCategory ? data.exceedingSpeedCategory : 0),
        "rejectGreenMinimumSpeedCategoryId": (data.greenSecondsBelowCategory ? data.greenSecondsBelowCategory : 0),
        "rejectRedSecondsBelowCategoryId": (data.redSecondsBelowCategory ? data.redSecondsBelowCategory : 0),
        "rejectTestShotsCategoryId": (data.testShotsCategory ? data.testShotsCategory : 0),
        "rejectZeroVelocityCategoryId": (data.zeroVelocityCategory ? data.zeroVelocityCategory : 0),
        "autoSnapMilliSeconds": (data.snapshotTimeMilli ? data.snapshotTimeMilli : 0),
        "enableVideoAutoSnap": (data.snapshotTime ? true : false),
        "rejectBelowSpeedWorkflowId": (data.belowSpeedQueue ? data.belowSpeedQueue : 0),
        "rejectExceedingSpeedWorkflowId": (data.exceedingSpeedQueue ? data.exceedingSpeedQueue : 0),
        "rejectGreenMinimumSpeedWorkflowId": (data.greenSecondsBelowQueue ? data.greenSecondsBelowQueue : 0),
        "rejectRedSecondsBelowWorkflowId": (data.redSecondsBelowQueue ? data.redSecondsBelowQueue : 0),
        "rejectTestShotsWorkflowId": (data.testShotsQueue ? data.testShotsQueue : 0),
        "rejectZeroVelocityCategoryWorkflowId": (data.zeroVelocityQueue ? data.zeroVelocityQueue : 0)
      }
    }
    if (!this.ingestionSettings) {
      this.apiService.post("IngestionSettings/addIngestionSettings", obj, true).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          const message = this.translate.instant("Record_Saved_Successfully", { msg: msg });
          this.notificationService.success(message);
          this.getData();
        }
        this.displaySpinner = false;
      }, error => {
        this.displaySpinner = false;
        this.errorResponseCheck(error);
      });
    } else {
      this.apiService.put("IngestionSettings/updateIngestionSettings", obj, true).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          const message = this.translate.instant("Record_Saved_Successfully", { msg: msg });
          this.notificationService.success(message);
          this.getData();
        }
        this.displaySpinner = false;
      }, error => {
        this.displaySpinner = false;
        this.errorResponseCheck(error);
      });
    }
  }
}

errorResponseCheck(error: any) {
  for (var i = 0; i < error.error.details.length; i++) {
    if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
      const msg = "";
      this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
    }
    else {
      const msg = "";
      this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
    }
  }
}

clearForm() {
  this.ingestionForm.reset();
  this.ingestionForm.disable();
  this.ingestionForm.controls['eventsExceedingSpeed'].enable();
  this.ingestionForm.controls['eventsBelowSpeed'].enable();
  this.ingestionForm.controls['eventsRedSecondsBelow'].enable();
  this.ingestionForm.controls['eventsTestShots'].enable();
  this.ingestionForm.controls['eventsGreenSecondsBelow'].enable();
  this.ingestionForm.controls['eventsZeroVelocity'].enable();
  this.ingestionForm.controls['snapshotTime'].enable();
  this.checkBoxArray.map(item => {
      item.value= false;
      this.setErrorNull(item);
  });
}

resetData() {
  if (this.ingestionSettings) {
    this.setFormsValue(this.ingestionSettings);
  }
}
ngAfterViewChecked() {
  this.cdRef.detectChanges();
}

setValidation(checkboxValue: any) {
  let valid= '';
  switch (checkboxValue) {
    case "eventsExceedingSpeed":
      let exceedingSpeed = this.ingestionForm.controls['exceedingSpeed'].value;
      exceedingSpeed =  (_.isNull(exceedingSpeed)? true: exceedingSpeed.toString());
      if(_.isEmpty(exceedingSpeed)){
        valid = "eventsExceedingSpeed";
        this.ingestionForm.controls['exceedingSpeed'].setValidators([Validators.required, Validators.pattern('^[0-9]\\d*$')]);
        this.ingestionForm.controls['exceedingSpeed'].updateValueAndValidity();
      };
      let exceedingSpeedCategory = this.ingestionForm.controls['exceedingSpeedCategory'].value;
      exceedingSpeedCategory =  (_.isNull(exceedingSpeedCategory)? true: exceedingSpeedCategory.toString());
      if(_.isEmpty(exceedingSpeedCategory)){
        valid = "eventsExceedingSpeed";
        this.ingestionForm.controls['exceedingSpeedCategory'].setValidators([Validators.required]);
        this.ingestionForm.controls['exceedingSpeedCategory'].updateValueAndValidity();
      }
      break;
    case "eventsBelowSpeed":
      let belowSpeed = this.ingestionForm.controls['belowSpeed'].value;
      belowSpeed =  (_.isNull(belowSpeed)? true: belowSpeed.toString());
      if(_.isEmpty(belowSpeed)){
        valid = "eventsBelowSpeed";
        this.ingestionForm.controls['belowSpeed'].setValidators([Validators.required, Validators.pattern('^[0-9]\\d*$')]);
        this.ingestionForm.controls['belowSpeed'].updateValueAndValidity();
      };
      let belowSpeedCategory = this.ingestionForm.controls['belowSpeedCategory'].value;
      belowSpeedCategory =  (_.isNull(belowSpeedCategory)? true: belowSpeedCategory.toString());
      if(_.isEmpty(belowSpeedCategory)){
        valid = "eventsBelowSpeed";
        this.ingestionForm.controls['belowSpeedCategory'].setValidators([Validators.required]);
        this.ingestionForm.controls['belowSpeedCategory'].updateValueAndValidity();
      }
      break;
    case "eventsRedSecondsBelow":
      let redSecondsBelow = this.ingestionForm.controls['redSecondsBelow'].value;
      redSecondsBelow =  (_.isNull(redSecondsBelow)? true: redSecondsBelow.toString());
      if(_.isEmpty(redSecondsBelow)){
        valid = "eventsRedSecondsBelow";
        this.ingestionForm.controls['redSecondsBelow'].setValidators([Validators.required, Validators.pattern('^[0-9]\\d*$')]);
        this.ingestionForm.controls['redSecondsBelow'].updateValueAndValidity();
      };
      let redSecondsBelowCategory = this.ingestionForm.controls['redSecondsBelowCategory'].value;
      redSecondsBelowCategory =  (_.isNull(redSecondsBelowCategory)? true: redSecondsBelowCategory.toString());
      if(_.isEmpty(redSecondsBelowCategory)){
        valid = "eventsRedSecondsBelow";
        this.ingestionForm.controls['redSecondsBelowCategory'].setValidators([Validators.required]);
        this.ingestionForm.controls['redSecondsBelowCategory'].updateValueAndValidity();
      }
       break
    case "eventsGreenSecondsBelow":
      let greenSecondsBelow = this.ingestionForm.controls['greenSecondsBelow'].value;
      greenSecondsBelow =  (_.isNull(greenSecondsBelow)? true: greenSecondsBelow.toString());
      if(_.isEmpty(greenSecondsBelow)){
        valid = "eventsGreenSecondsBelow";
        this.ingestionForm.controls['greenSecondsBelow'].setValidators([Validators.required, Validators.pattern('^[0-9]\\d*$')]);
        this.ingestionForm.controls['greenSecondsBelow'].updateValueAndValidity();
      };
      let greenSecondsBelowCategory = this.ingestionForm.controls['greenSecondsBelowCategory'].value;
      greenSecondsBelowCategory =  (_.isNull(greenSecondsBelowCategory)? true: greenSecondsBelowCategory.toString());
      if(_.isEmpty(greenSecondsBelowCategory)){
        valid = "eventsGreenSecondsBelow";
        this.ingestionForm.controls['greenSecondsBelowCategory'].setValidators([Validators.required]);
        this.ingestionForm.controls['greenSecondsBelowCategory'].updateValueAndValidity();
      }

      break;
    case "eventsTestShots":
      let testShotsCategory = this.ingestionForm.controls['testShotsCategory'].value;
      testShotsCategory =  (_.isNull(testShotsCategory)? true: testShotsCategory.toString());
      if(_.isEmpty(testShotsCategory)){
        valid = "eventsTestShots";
        this.ingestionForm.controls['testShotsCategory'].setValidators([Validators.required]);
        this.ingestionForm.controls['testShotsCategory'].updateValueAndValidity();
      }
      break;
    case "eventsZeroVelocity":
      let zeroVelocityCategory = this.ingestionForm.controls['zeroVelocityCategory'].value;
      zeroVelocityCategory =  (_.isNull(zeroVelocityCategory)? true: zeroVelocityCategory.toString());
      if(_.isEmpty(zeroVelocityCategory)){
        valid = "eventsZeroVelocity";
        this.ingestionForm.controls['zeroVelocityCategory'].setValidators([Validators.required]);
        this.ingestionForm.controls['zeroVelocityCategory'].updateValueAndValidity();
      }
      break;

    default:
      break;
  }
  return (valid===''?  true : false);
}
}
