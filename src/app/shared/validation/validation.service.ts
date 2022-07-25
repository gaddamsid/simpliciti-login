import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})

export class ValidationService {

    positiveNumVali(regPattern: string): ValidatorFn {
        return (control: AbstractControl): any | null => {
          if(control && control.value){
            const pattern = new RegExp(regPattern);
            if (control.value === '') {
                return;
            } else if (parseInt(control.value) < 0 || _.isEmpty(control.value.toString()) ||
                (control && control.value.toString() === '000' || control.value.toString() === '00' ||
                    control.value.toString() === '0')) {
                return { 'invalid': 'invalid' };
            } else if (!pattern.test(control.value)) {
                return { 'invalid': 'invalid' };
            }
          }
        };
    }

    positiveNumValiWithZero(regPattern: string): ValidatorFn {
        return (control: AbstractControl): any | null => {
          if(control && control.value){
            const pattern = new RegExp(regPattern);
            if (control.value === '') {
                return;
            } else if (parseInt(control.value) < 0 || _.isEmpty(control.value.toString())) {
                return { 'invalid': 'invalid' };
            } else if (!pattern.test(control.value)) {
                return { 'invalid': 'invalid' };
            }
          }
        };
    }

    zipLengthChecker(): ValidatorFn{
        return (control: AbstractControl): any | null => {
            // console.log(control);
          if(control && control.value){
            if (control.value === '') {
                return;
            } else if ((control.value.length === 6) || (control.value.length === 7) || (control.value.length === 8)) {
                return { 'invalid': 'invalid' };
            } 
          }
        };
    }

    todaysDateAllowed(): ValidatorFn {
        return (control: AbstractControl): any | null => {
          if(control && control.value){
            const controlDate= new Date(control.value);
            const todaysDate = new Date();
            if (control.value === '') {
                return;
            } else if(controlDate.getFullYear() === todaysDate.getFullYear()
            && controlDate.getDate() === todaysDate.getDate()
            && controlDate.getMonth() === todaysDate.getMonth()){
                return;
            } else if (controlDate.getTime()  < todaysDate.getTime()) {
                return { 'invalidDate': 'invalidDate' };
            } 
          }
        };
    }
    // isEmptyVali(regPattern?: string) {
    //     return (control: AbstractControl): any | null => {
    //         if (regPattern && control) {
    //             const pattern = new RegExp(regPattern);
    //             if (!pattern.test(control.value)) {
    //                 return { 'invalid': 'invalid' };
    //             }
    //         }
    //         console.log(control);
    //         if (control && control.value === '') {
    //             return;
    //         } else if (control && control.value && control.value.toString().trim() ==='') {
    //             return { 'invalid': 'invalid' };
    //         }
    //     };
    // }
}
