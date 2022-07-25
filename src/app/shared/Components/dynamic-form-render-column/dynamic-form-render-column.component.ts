import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import { MessageService } from '../../services/message.service';
import { ValidationService } from '../../validation/validation.service';
import { LanguageService } from '../header/languages.service';

@Component({
  selector: 'app-dynamic-form-render-column',
  templateUrl: './dynamic-form-render-column.component.html',
  styleUrls: ['./dynamic-form-render-column.component.scss']
})
export class DynamicFormRenderColumnComponent implements OnInit, OnDestroy {
    @Output() editFormOutput = new EventEmitter<any>();
    @Output() saveFormOutput = new EventEmitter<any>();
    @Output() cancelOutput = new EventEmitter<any>();
    // @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;
    _pageConfig!: any;
    dynamicForm!: any;
    subscription: any;
    editMode: boolean = false;
    itemValuesInEditMode: any;
    listOfSelectUrl: any =[];
    listOfDropdownData: any = [];
    minDate!: Date;
    // resetHard: boolean = true;
    @Input() set pageConfig(value: any) {
      if (value) {
        this._pageConfig = value;
      }
    }
    get pageConfig(): any {
      return this._pageConfig;
    }
    
    _defaultDropdwonValue!:any;
    @Input() set defaultDropdwonValue(value: any) {
      if (value) {
        this._defaultDropdwonValue = value;
      }
    }
    get defaultDropdwonValue(): any {
      return this._defaultDropdwonValue;
    }

    constructor(private apiService: ApiService, public translate: TranslateService, private messageService: MessageService,
      private language: LanguageService, private notificationService: ToastrService, private dataService: DataService,
      private validationService: ValidationService) { }
  
    ngOnInit(): void {
      this.minDate = new Date();
      if(this.defaultDropdwonValue){
        this.listOfDropdownData = this.defaultDropdwonValue;
      }
      // this.listOfDropdownData = [...this.defaultDropdwonValue];
      this.dynamicForm = new FormGroup({});
      if (this.pageConfig) {
        if(this.pageConfig.pageConfig && this.pageConfig.pageConfig.length > 0  && this.pageConfig.pageConfig[0].forceEditMode){
          this.editMode = true;
        }
        this.pageConfig.uiElementList.forEach((column: any) => {
          this.addElement(column);
        });
      }
      // this.subscription = this.messageService.getMessage().subscribe(item => {
      //   if (item.editItem) {
      //     this.itemValuesInEditMode = item.column;
      //     this.editMode = true;
      //     this.setFormValues(item.column);
      //   }
      // },(error) => console.log('error', error));
      // sharedObject
      if(this.dataService && this.dataService.sharedObject && this.dataService.sharedObject.editItem){
          this.itemValuesInEditMode = this.dataService.sharedObject.column;
          this.editMode = true;
          this.setFormValues(this.dataService.sharedObject.column);
      }
    }
    setFormValues(item: any) {
      Object.keys(this.dynamicForm.controls).forEach((key) => {
        const control = this.dynamicForm.controls[key];
        this.dynamicForm.controls[key].setValue(item[key]);
        // this.dynamicForm.controls[key].updateValueAndValidity();
      });
    }
    resetFormErrors() {
      Object.keys(this.dynamicForm.controls).forEach((key) => {
        this.dynamicForm.controls[key].setErrors(null);
      });
    }
    addElement(item: any) {
      for (let i = 0; i < item.column.length; i++) {
        if(item.column[i].required){
          // if(item.column[i].elementType === 'date') {
          //   this.dynamicForm.addControl(item.column[i].formControlName, new FormControl(''));
          //   this.dynamicForm.get(item.column[i].formControlName)?.setErrors({ 'required': 'required' });
          // } else {
            if( item.column[i].customValidation && item.column[i].required){
              this.dynamicForm.addControl(item.column[i].formControlName, new FormControl('', [Validators.required, this.validationService.zipLengthChecker()]));
            } else{
              this.dynamicForm.addControl(item.column[i].formControlName, new FormControl('', Validators.required));
            }
          // }
           // const obj = this.dynamicForm.value;
      // Object.keys(this.dynamicForm.controls).forEach((key) => {
      //     this.dynamicForm.controls[key].setValidators([Validators.required]);
          this.dynamicForm.controls[item.column[i].formControlName].updateValueAndValidity();
      // });
        } else if(item.column[i].defaultValue) {
          this.dynamicForm.addControl(item.column[i].formControlName, new FormControl(item.column[i].defaultValue));
        } else {
          this.dynamicForm.addControl(item.column[i].formControlName, new FormControl(''));
        }
        if (item.column[i].elementType === 'select' && item.column[i].urlConfig) {
          if(item.column[i].disabled){
            this.dynamicForm.controls[item.column[i].formControlName].disable();
          }
          const obj = { 'formControlName': item.column[i].formControlName, 'url': item.column[i].urlConfig[0].url, 
          'envType': item.column[i].urlConfig[0].envType };
          this.getSelectDropdownData(obj);
          // this.listOfSelectUrl.push(obj);
        }
      }
      // if(this.listOfSelectUrl.length > 0 ){
      //   this.getSelectData();
      // }
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
      this.resetFormErrors();
      this.cancelOutput.emit({ 'cancel': 'reset' });
    }
    setValidation() {
      let validSet = false;
      this.dynamicForm.valueChanges.subscribe((value: any) => {
        if (!validSet) {
          Object.keys(this.dynamicForm.controls).forEach((key) => {
            if (this.dynamicForm.controls[key].untouched) {
              this.dynamicForm.controls[key].setValidators([Validators.required]);
              // this.dynamicForm.controls[key].updateValueAndValidity();
              this.dynamicForm.controls[key].updateValueAndValidity({emitEvent : false});
              validSet = true;
            }
          });
        }
      });
    }
    save() {
      console.log("formData", this.dynamicForm.value);
    // To Do (Pratik): Remove code 
    //   Object.keys(this.dynamicForm.controls).forEach((key) => {
    //     this.dynamicForm.controls[key].setValidators([Validators.required]);
    //     this.dynamicForm.controls[key].updateValueAndValidity();
    // });
          
      if (this.dynamicForm.valid) {        
        this.apiService.post(this.pageConfig.apiConfigList[0].url, this.dynamicForm.value,
          this.pageConfig.apiConfigList[0].CW5type).subscribe(result => {
            if (result.status == "Success") {
              const msg = "";
              const message = this.translate.instant("ADD_RECORD", { msg: msg });
              this.notificationService.success(message);
              this.dynamicForm.reset();
              this.resetFormErrors();
              this.saveFormOutput.emit({ 'form': 'saved' });
            }
          }, error => {
            this.errorResponseCheck(error);
          });
      }
    }
    update(formData: any) {
      if (this.dynamicForm.valid) {
        let url = this.pageConfig.apiConfigList[1].url;
        const obj = this.pageConfig.apiConfigList[1].paramters;
        let formValues = _.cloneDeep(this.dynamicForm.value);
        if (this.pageConfig.apiConfigList[1].paramtersInUrl) {
          url = url + '/' + formValues[this.pageConfig.apiConfigList[1].paramtersInUrl];
        } else {
          // for (const iterator in obj) {
          //   if (!formValues[iterator]) {
          //     formValues[iterator] = this.itemValuesInEditMode[iterator];
          //   }
          // }
        }
        if(this.pageConfig.apiConfigList[1].matchParameters){
          for (const property in this.pageConfig.apiConfigList[1].paramters) {
            // if( this.pageConfig.apiConfigList[1].paramters[property] === "array"){
            //   this.pageConfig.apiConfigList[1].paramters[property] = formValues[property];
            // } else{
              this.pageConfig.apiConfigList[1].paramters[property] = formValues[property];
            // }
            // console.log(`${property}: ${this.pageConfig.apiConfigList[1].paramters[property]}`);
          }
          formValues =  this.pageConfig.apiConfigList[1].paramters;
        }
        // Need to change one value with filter matching Put call;
        let envType;
        if(this.pageConfig.apiConfigList[1].CW5type != null){
           envType =  this.apiService.put(url, formValues, this.pageConfig.apiConfigList[1].CW5type);
        } else if(this.pageConfig.apiConfigList[1].envType === environment.SEARCH_V) {
          // console.log('url-->',url, formValues, this.pageConfig.apiConfigList[1].violationType);
          envType = this.apiService.putViolation(url, formValues, this.pageConfig.apiConfigList[1].violationType);
        }
        envType?.subscribe(result => {
            if (result.status == "Success") {
              const msg = "";
              const message = this.translate.instant("UPDATE_RECORD", { msg: msg });
              this.notificationService.success(message);
              this.dynamicForm.reset();
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
  
    getSelectData(){
      const apiVUrl = this.listOfSelectUrl.map((item: any): any => {
        if(item.envType === environment.API_V && item.url){
          return this.apiService.get(item.url, true).pipe(map((res: Response) => res));
        }
      }) ;
      forkJoin(...apiVUrl).subscribe(
        data => {
             console.log('<------->',data);
        },
        err => console.error(err)
     );
    }
    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      if(this.subscription){
        this.subscription.unsubscribe();
      }
    }
  
  }
