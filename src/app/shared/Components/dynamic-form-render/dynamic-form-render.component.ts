import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { result } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { MessageService } from '../../services/message.service';
import { LanguageService } from '../header/languages.service';
import * as _ from 'lodash';
import { ValidationService } from '../../validation/validation.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dynamic-form-render',
  templateUrl: './dynamic-form-render.component.html',
  styleUrls: ['./dynamic-form-render.component.scss']
})
export class DynamicFormRenderComponent implements OnInit, OnDestroy {
  @Output() editFormOutput = new EventEmitter<any>();
  @Output() saveFormOutput = new EventEmitter<any>();
  @Output() cancelOutput = new EventEmitter<any>();
  // @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;
  _defaultDropdwonValue!:any;
  @Input() set defaultDropdwonValue(value: any) {
    if (value) {
      this._defaultDropdwonValue = value;
    }
  }
  get defaultDropdwonValue(): any {
    return this._defaultDropdwonValue;
  }
  listOfDropdownData: any = [];
  minDateValue: any= '';
  _pageConfig!: any;
  dynamicForm!: any;
  subscription: any;
  editMode: boolean = false;
  itemValuesInEditMode: any;
  // resetHard: boolean = true;
  @Input() set pageConfig(value: any) {
    if (value) {
      this._pageConfig = value;
    }
  }
  get pageConfig(): any {
    return this._pageConfig;
  }
  constructor(private apiService: ApiService, public translate: TranslateService, private messageService: MessageService,
    private language: LanguageService, private notificationService: ToastrService,  private datePipe: DatePipe,
    private validationService: ValidationService) { }

  ngOnInit(): void {
    this.dynamicForm = new FormGroup({});
    if(this.defaultDropdwonValue){
      this.listOfDropdownData = this.defaultDropdwonValue;
    }
    if (this.pageConfig) {
      this.pageConfig.uiElementList.forEach((row: any) => {
        this.addElement(row);
      });
    }
    this.subscription = this.messageService.getMessage().subscribe(item => {
      if (item.editItem) {
        this.itemValuesInEditMode = item.row;
        this.editMode = true;
        this.setFormValues(item.row);
      }
    });
    // this.setValidation();
  }
  setFormValues(item: any) {
    Object.keys(this.dynamicForm.controls).forEach((key) => {
      const control = this.dynamicForm.controls[key];
      this.dynamicForm.controls[key].setValue(item[key]);
    });
  }
  resetFormErrors() {
    Object.keys(this.dynamicForm.controls).forEach((key) => {
      this.dynamicForm.controls[key].setErrors(null);
    });
  }
  addElement(item: any) {
    for (let i = 0; i < item.row.length; i++) {
      if(item.row[i].minDateValue && item.row[i].minDateValue ==='Today'){
        this.minDateValue = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      }
      if(item.row[i].required){
        // if(item.row[i].elementType === 'date') {
        //   this.dynamicForm.addControl(item.row[i].formControlName, new FormControl(''));
        //   this.dynamicForm.get(item.row[i].formControlName)?.setErrors({ 'required': 'required' });
        // } else {
          if( item.row[i].customValidation && item.row[i].required){
            if(item.row[i].customValidation ==="positiveNumVali")
            this.dynamicForm.addControl(item.row[i].formControlName, new FormControl('', [Validators.required, this.validationService.positiveNumVali(item.row[i].regEx)]));
            if(item.row[i].customValidation ==="positiveNumValiWithZero"){
              if(item.row[i].defaultValue) {
                this.dynamicForm.addControl(item.row[i].formControlName, new FormControl(item.row[i].defaultValue,[Validators.required, this.validationService.positiveNumValiWithZero(item.row[i].regEx)]));
              } else {
                this.dynamicForm.addControl(item.row[i].formControlName, new FormControl('', [Validators.required, this.validationService.positiveNumValiWithZero(item.row[i].regEx)]));
              }
            }
          } else if(item.row[i].elementType === 'date' && item.row[i].minDateValue && item.row[i].minDateValue ==='Today'){
            this.dynamicForm.addControl(item.row[i].formControlName, new FormControl('',[Validators.required, this.validationService.todaysDateAllowed()]));
          } else if(item.row[i].defaultValue ==='Today' && item.row[i].elementType ==='date'){
            this.dynamicForm.addControl(item.row[i].formControlName, new FormControl(this.datePipe.transform(new Date(), 'yyyy-MM-dd')));
          } else {
            this.dynamicForm.addControl(item.row[i].formControlName, new FormControl('', Validators.required));
          }
          console.log(item.row[i].formControlName);
        this.dynamicForm.controls[item.row[i].formControlName].updateValueAndValidity();
      } else if(item.row[i].defaultValue) {
        this.dynamicForm.addControl(item.row[i].formControlName, new FormControl(item.row[i].defaultValue));
      } else if (item.row[i].customValidation === "positiveNumVali") {
        this.dynamicForm.addControl(item.row[i].formControlName, new FormControl('',[this.validationService.positiveNumVali(item.row[i].regEx)]));
      } if (item.row[i].customValidation === "positiveNumValiWithZero") {
        this.dynamicForm.addControl(item.row[i].formControlName, new FormControl('',[this.validationService.positiveNumValiWithZero(item.row[i].regEx)]));
      } if (item.row[i].customValidation === "regEx") {
        this.dynamicForm.addControl(item.row[i].formControlName, new FormControl('',[Validators.pattern(item.row[i].regEx)]));
      } else if(item.row[i].elementType === 'date' && item.row[i].minDateValue && item.row[i].minDateValue ==='Today'){
        this.dynamicForm.addControl(item.row[i].formControlName, new FormControl('',[this.validationService.todaysDateAllowed()]));
      } else {
        this.dynamicForm.addControl(item.row[i].formControlName, new FormControl(''));
      }
      if (item.row[i].elementType === 'select' && item.row[i].urlConfig) {
        if(item.row[i].disabled){
          this.dynamicForm.controls[item.row[i].formControlName].disable();
        }
        const obj = { 'formControlName': item.row[i].formControlName, 'url': item.row[i].urlConfig[0].url, 
        'envType': item.row[i].urlConfig[0].envType };
        this.getSelectDropdownData(obj);
      }
      // this.dynamicForm.updateValueAndValidity();
      //  this.dynamicForm.addControl(item.row[i].formControlName, new FormControl('', Validators.required));
    }
  }
  
  getSelectDropdownData(obj : any) {
    const formControlName = obj.formControlName;
    this.apiService.get(obj.url, true).subscribe((res: Response) => {
      if(res){
        // const item = {};
        // item['key'+formControlName] = res;
        this.listOfDropdownData[formControlName]=res;
        if(this.dynamicForm.controls[formControlName] && this.itemValuesInEditMode && this.itemValuesInEditMode[formControlName]){
          this.dynamicForm.controls[formControlName].setValue(this.itemValuesInEditMode[formControlName]);
          // this.dynamicForm.controls[formControlName].updateValueAndValidity();
        }
      }
    });
  }

  cancel() {
    this.notificationService.info(this.translate.instant("Process Cancelled"));
    this.dynamicForm.reset();
    // this.formRef.reset(); 
    this.editMode = false;
    this.pageConfig.uiElementList.forEach((row: any) => {
      this.setDefaultValue(row);
    });
    this.resetFormErrors();
    this.cancelOutput.emit({ 'cancel': 'reset' });
  }
  setDefaultValue(item:any) {
    for (let i = 0; i < item.row.length; i++) {
      if(item.row[i].defaultValue && item.row[i].defaultValue ==='Today'){
        this.dynamicForm.controls[item.row[i].formControlName].setValue(this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
      } else{
        this.dynamicForm.controls[item.row[i].formControlName].setValue(item.row[i].defaultValue);
      }
    }
  }
  setValidation(){
    let validSet = false;
    this.dynamicForm.valueChanges.subscribe((value: any) => {
      if(!validSet){
        Object.keys(this.dynamicForm.controls).forEach((key) => {
          if(this.dynamicForm.controls[key].untouched){
            this.dynamicForm.controls[key].setValidators([Validators.required]);
            this.dynamicForm.controls[key].updateValueAndValidity();
            validSet = true;
          }
        });
      }
 });
  }
  save() {
    console.log("formData", this.dynamicForm.value);
    // const obj = this.dynamicForm.value;
    // Object.keys(this.dynamicForm.controls).forEach((key) => {
    //   this.dynamicForm.controls[key].setValidators([Validators.required]);
    //   this.dynamicForm.controls[key].updateValueAndValidity();
    // });
    // Add Validation while saving as well cause it has been removed due to reset error method
    this.pageConfig.uiElementList.forEach((row: any) => {
      this.addValidationWhileSaving(row);
    });

    let formValues = _.cloneDeep(this.dynamicForm.value);
    if (this.dynamicForm.valid) {
      if (this.pageConfig.apiConfigList[0].paramtersStructure) {
        const paramStructureKey = this.pageConfig.apiConfigList[0].paramtersStructure;
        let noticeTypeModel = this.pageConfig.apiConfigList[0].paramters[paramStructureKey];
        for (const iterator in noticeTypeModel) {
          if (!this.pageConfig.apiConfigList[0].paramters[iterator] && formValues[iterator]) {
            if(typeof this.pageConfig.apiConfigList[0].paramters[paramStructureKey][iterator] === 'number'){
             this.pageConfig.apiConfigList[0].paramters[paramStructureKey][iterator] =  parseInt(formValues[iterator]);
            } else {
              this.pageConfig.apiConfigList[0].paramters[paramStructureKey][iterator] =  formValues[iterator];
            }
          }
          if(iterator === 'createDatetime' || iterator === 'updateDatetime' ){
            this.pageConfig.apiConfigList[0].paramters[paramStructureKey][iterator] = new Date();
          }
        }
        formValues = this.pageConfig.apiConfigList[0].paramters;
      } 
      this.apiService.post(this.pageConfig.apiConfigList[0].url, formValues,
        this.pageConfig.apiConfigList[0].CW5type).subscribe(result => {
          if (result.status == "Success") {
            const msg = "";
            const message = this.translate.instant("ADD_RECORD", { msg: msg });
            this.notificationService.success(message);
            this.dynamicForm.reset();
            this.pageConfig.uiElementList.forEach((row: any) => {
              this.setDefaultValue(row);
            });
            this.resetFormErrors();
            this.saveFormOutput.emit({ 'form': 'saved' });
          }
        }, error => {
          this.errorResponseCheck(error);
        });
    }
  }
  addValidationWhileSaving(item: any) {
    for (let i = 0; i < item.row.length; i++) {
      if(item.row[i].minDateValue && item.row[i].minDateValue ==='Today'){
        this.minDateValue = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      }
      if(item.row[i].required){
        // if(item.row[i].elementType === 'date') {
        //   this.dynamicForm.addControl(item.row[i].formControlName, new FormControl(''));
        //   this.dynamicForm.get(item.row[i].formControlName)?.setErrors({ 'required': 'required' });
        // } else {
          if( item.row[i].customValidation && item.row[i].required){
            if(item.row[i].customValidation ==="positiveNumVali")
               this.dynamicForm.controls[item.row[i].formControlName].setValidators([ Validators.required, this.validationService.positiveNumVali(item.row[i].regEx)]);
               if(item.row[i].customValidation ==="positiveNumValiWithZero")
               this.dynamicForm.controls[item.row[i].formControlName].setValidators([ Validators.required, this.validationService.positiveNumValiWithZero(item.row[i].regEx)]);
            
                  // this.dynamicForm.controls[item.row[i].formControlName].updateValueAndValidity();
            // this.dynamicForm.addControl(item.row[i].formControlName, new FormControl('', [Validators.required, this.validationService.positiveNumVali(item.row[i].regEx)]));
          } else if(item.row[i].elementType === 'date' && item.row[i].minDateValue && item.row[i].minDateValue ==='Today'){
            // this.dynamicForm.addControl(item.row[i].formControlName, new FormControl('',[Validators.required, this.validationService.todaysDateAllowed()]));
            this.dynamicForm.controls[item.row[i].formControlName].setValidators([Validators.required, this.validationService.todaysDateAllowed()]);
          } else{
            this.dynamicForm.controls[item.row[i].formControlName].setValidators([Validators.required]);
            // this.dynamicForm.controls[item.row[i].formControlName].updateValueAndValidity();
            // this.dynamicForm.addControl(item.row[i].formControlName, new FormControl('', Validators.required));
          }
        this.dynamicForm.controls[item.row[i].formControlName].updateValueAndValidity();
      } else if(item.row[i].elementType === 'date' && item.row[i].minDateValue && item.row[i].minDateValue ==='Today'){
        this.dynamicForm.controls[item.row[i].formControlName].setValidators([this.validationService.todaysDateAllowed()]);
        this.dynamicForm.controls[item.row[i].formControlName].updateValueAndValidity();
        // this.dynamicForm.addControl(item.row[i].formControlName, new FormControl('',[this.validationService.todaysDateAllowed()]));
      } else if (item.row[i].customValidation === "positiveNumVali") {
        this.dynamicForm.controls[item.row[i].formControlName].setValidators([this.validationService.positiveNumVali(item.row[i].regEx)]);
        this.dynamicForm.controls[item.row[i].formControlName].updateValueAndValidity();
      } else if (item.row[i].customValidation === "positiveNumValiWithZero") {
        this.dynamicForm.controls[item.row[i].formControlName].setValidators([this.validationService.positiveNumValiWithZero(item.row[i].regEx)]);
        this.dynamicForm.controls[item.row[i].formControlName].updateValueAndValidity();
      } else if (item.row[i].customValidation === "regEx") {
        this.dynamicForm.controls[item.row[i].formControlName].setValidators([Validators.pattern(item.row[i].regEx)]);
        this.dynamicForm.controls[item.row[i].formControlName].updateValueAndValidity();
      } 
      if (item.row[i].elementType === 'select' && item.row[i].urlConfig) {
        if(item.row[i].disabled){
          this.dynamicForm.controls[item.row[i].formControlName].disable();
        }
      }
    }
  }
  update(formData: any) {
    if (this.dynamicForm.valid) {
      let url = this.pageConfig.apiConfigList[1].url;
      const obj = this.pageConfig.apiConfigList[1].paramters;
      let formValues = _.cloneDeep(this.dynamicForm.value);
      if (this.pageConfig.apiConfigList[1].paramtersInUrl) {
        url = url + '/' + this.itemValuesInEditMode[this.pageConfig.apiConfigList[1].paramtersInUrl];
      } else {
        if(this.pageConfig.apiConfigList[1].paramtersStructure){
            const paramStructureKey = this.pageConfig.apiConfigList[1].paramtersStructure;
            let noticeTypeModel = this.pageConfig.apiConfigList[1].paramters[paramStructureKey];
            for (const iterator in noticeTypeModel) {
              if (!this.pageConfig.apiConfigList[1].paramters[iterator] && !_.isUndefined(formValues[iterator]) ) {
                this.pageConfig.apiConfigList[1].paramters[paramStructureKey][iterator] = formValues[iterator];
              }
              if(iterator === 'createDatetime' || iterator === 'updateDatetime' ){
                this.pageConfig.apiConfigList[1].paramters[paramStructureKey][iterator] = new Date();
              }
            }
            formValues = this.pageConfig.apiConfigList[1].paramters;
        } else {
          for (const iterator in obj) {
            if (!formValues[iterator]) {
              formValues[iterator] = this.itemValuesInEditMode[iterator];
            }
          }
        }
      }
      // Need to change one value with filter matching Put call;
      this.apiService.put(url, formValues,
        this.pageConfig.apiConfigList[1].CW5type).subscribe(result => {
          if (result.status == "Success") {
            const msg = "";
            const message = this.translate.instant("UPDATE_RECORD", { msg: msg });
            this.notificationService.success(message);
            this.dynamicForm.reset();
            this.pageConfig.uiElementList.forEach((row: any) => {
              this.setDefaultValue(row);
            });
            this.resetFormErrors();
            this.editMode = false;
            this.saveFormOutput.emit({ 'form': 'saved' });
          }
        }, error => {
          this.errorResponseCheck(error);
        });
    }
  }


  errorResponseCheck(error: any) {
    for (var i = 0; i < error.error.details.length; i++) {
      if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        let formCtrlName= "";
        Object.keys(this.dynamicForm.controls).forEach((key) => {
          const lowerStrKey = key;
          if(error.error.details[i].fieldName === lowerStrKey.toLowerCase()){
            formCtrlName = key;
          } else if(error.error.details[i].fieldName === lowerStrKey){
            formCtrlName = key;
          }
        });
        if(formCtrlName)
        this.dynamicForm.controls[formCtrlName].setErrors({ 'duplicateKey': true });
        this.notificationService.error(this.translate.instant("Duplicate Record Found", { msg: msg }))//error.error.details[i].fieldName + "_" + error.error.details[i].message
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }

  
  trackChangeEvent($event: any, formControlName: any){
  }
  
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}


