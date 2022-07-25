import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';
import { PaymentCartService } from 'src/app/shared/services/payment-cart.service';
import { FeeDetail } from '../../models/fee-detail.model';
import { PlateDetail } from '../../models/plate-detail.model';
import { TicketDetail } from '../../models/ticket-detail.model';
import { GPService } from '../../services/g-p.service';

@Component({
  selector: 'app-payment-cart',
  templateUrl: './payment-cart.component.html',
  styleUrls: ['./payment-cart.component.scss']
})

export class PaymentCartComponent implements OnInit, AfterViewInit {

  paymentCartForm!: FormGroup;
  paymentFeeTypes: Array<any> = [];
  paymentTypes: Array<any> = [];
  accountTypes: Array<any> = [];
  feeData: Array<any> = [];
  ticketData: Array<any> = [];
  maxPaymentDate = new Date();
  isLoading = false;

  constructor(private gpService: GPService,
    private fb: FormBuilder,
    private notificationService: ToastrService,
    private route: Router,
    private paymentCartService: PaymentCartService,
    public translate: TranslateService,
    private apiService: ApiService) { }

  //#region Oninit Form defining, get cart items, get list data
  ngOnInit(): void {
    this.paymentCartForm = this.fb.group({
      paymentSource: new FormControl('', [Validators.required]),
      paymentDate: new FormControl(new Date(), [Validators.required]),
      totalAmount: new FormControl(0),
      remainder: new FormControl(0),
      plateDetails: this.fb.array([]),
      method1: this.fb.group({
        type: ['', [Validators.required]],
        referenceNo: [''],
        amount: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d{0,5}(\.\d{1,2})?$/)]],
        cashReceived: [''],
        changeDue: [''],
      }),
      method2: this.fb.group({
        type: [''],
        referenceNo: [''],
        amount: ['', [Validators.min(0), Validators.pattern(/^\d{0,5}(\.\d{1,2})?$/)]]
      }),
      notes: ['']
    });
    this.gpService.post(`getTicketList`, {}).subscribe((res: any) => {
      this.feeData = res.feeDetails;
      this.ticketData = res.ticketDetails;
      const feePlates = [... new Set(this.feeData.map(data => data.statePlate))];
      const ticketPlates = [... new Set(this.ticketData.map(data => data.statePlate))];
      const totalPlates = feePlates.concat(ticketPlates);
      const ticketUniquePlates = [... new Set(totalPlates)];
      ticketUniquePlates.forEach(s => {
        const accountEntityId = this.ticketData.length > 0 ? this.ticketData?.find(a => a.statePlate == s)?.accountEntityId ?? ''
          : this.feeData.length > 0 ? this.feeData?.find(a => a.statePlate == s)?.accountEntityId ?? '' : '';
        const filteredTickets = this.ticketData?.filter(a => a.statePlate == s) ?? [];
        const filteredFees = this.feeData?.filter(a => (a.statePlate == s && a.dueAmount > 0)) ?? [];
        this.plateDetails.push(this.fb.group({
          accountEntityId: [accountEntityId],
          statePlate: [s],
          ticketDetails: this.setTicketDetails(filteredTickets),
          feeDetails: this.setFeeDetails(filteredFees)
        }));
      });
    });
    this.getListDetails();
  }

  setTicketDetails(ticketDetails: TicketDetail[]): FormArray {
    const tickets = this.fb.array([]);
    ticketDetails?.forEach(t => {
      tickets.push(this.newTicketData(t));
    });
    return tickets;
  }

  setFeeDetails(feeDetails: FeeDetail[]): FormArray {
    const fees = this.fb.array([]);
    feeDetails?.forEach((t, i) => {
      fees.push(this.newFeeData(t));
      if (fees.controls[i].get('dueAmount')?.value <= 0) {
        fees.controls[i].get('payment')?.setValidators([Validators.min(0), Validators.pattern(/^\d{0,5}(\.\d{1,2})?$/)]);
      } else {
        fees.controls[i].get('payment')?.setValidators([Validators.required, Validators.min(0), Validators.pattern(/^\d{0,5}(\.\d{1,2})?$/)]);
      }
      fees.controls[i].get('payment')?.updateValueAndValidity();
      fees.controls[i].get('violationAccountChargesId')?.disable();
    });
    return fees;
  }

  newFeeData(data: any): FormGroup {
    return this.fb.group({
      accountEntityId: [data ? data.accountEntityId ?? '' : null],
      chargeType: [data ? data.chargeType ?? '' : ''],
      dueAmount: [data ? data.dueAmount ?? 0 : 0],
      feeAmount: [data ? data.feeAmount ?? 0 : 0],
      feeName: [data ? data.feeName ?? '' : ''],
      paidAmount: [data ? data.paidAmount ?? 0 : 0],
      payment: [data ? data.payment ?? '' : '', [Validators.required, Validators.min(0), Validators.pattern(/^\d{0,5}(\.\d{1,2})?$/)]],
      shoppingCartItemsId: [data ? data.shoppingCartItemsId ?? '' : ''],
      statePlate: [data ? data.statePlate ?? '' : ''],
      violationAccountChargesId: [data ? data.violationAccountChargesId ?? '' : null, [Validators.required]],
    })
  }

  newTicketData(data: any): FormGroup {
    return this.fb.group({
      amountDue: [data.amountDue ? data.amountDue : 0],
      citationId: [data.citationId ? data.citationId : ''],
      citationNumber: [data.citationNumber ? data.citationNumber : ''],
      date: [data.date ? data.date : null],
      fines: [data.fines ? data.fines : ''],
      locationAndDescription: [data.locationAndDescription ? data.locationAndDescription : ''],
      partialPayments: [data.partialPayments ? data.partialPayments : 0],
      payThisAmount: [data.payThisAmount ? data.payThisAmount : '',
      [Validators.required, Validators.min(0), Validators.pattern(/^\d{0,5}(\.\d{1,2})?$/)]],
      penalties: [data.penalties ? data.penalties : 0],
      shoppingCartItemsId: [data.shoppingCartItemsId ? data.shoppingCartItemsId : ''],
      totalCharges: [data.totalCharges ? data.totalCharges : 0],
      accountEntityId: [data.accountEntityId ? data.accountEntityId : 0]
    })
  }
  //#endregion

  //#region common(reusable) methods

  sumOfAmount(arrayDaya: Array<any>, key: string): number {
    const total = arrayDaya.reduce(function (acc: any, curVal: any) {
      return +acc + +curVal[key];
    }, 0);
    return total;
  }

  //#endregion

  //#region cart items length calculation, payment type(cash) validations handling.
  ngAfterViewInit(): void {
    this.plateDetails.valueChanges.subscribe(s => {
      this.updateCartLength();
    });
    this.method1.get('type')?.valueChanges.subscribe(s => {
      if (s == 2) {
        this.method1.get('cashReceived')?.setValidators([Validators.required, Validators.min(0)]);
        this.method1.get('cashReceived')?.updateValueAndValidity();
      } else {
        this.method1.get('cashReceived')?.setValidators([]);
        this.method1.get('cashReceived')?.updateValueAndValidity();
      }
    });
  }
  //#endregion

  //#region Get list of records for payment details, payment fees, account types
  getListDetails() {
    this.apiService.get('paymentDetails').subscribe(s => {
      this.paymentTypes = s;
      this.paymentTypes?.sort(function (a, b) {
        if (!a.paymentModeDesc) {
          return 1;
        } else if (!b.paymentModeDesc) {
          return -1;
        } else {
          var nameA = a?.paymentModeDesc?.replace(/ /g, '').toString()?.toUpperCase();
          var nameB = b?.paymentModeDesc?.replace(/ /g, '').toString()?.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }
      });
    });
    this.apiService.get('paymentfee').subscribe(s => {
      this.paymentFeeTypes = s;
      this.paymentFeeTypes?.sort(function (a, b) {
        if (!a.chargeTypeLong) {
          return 1;
        } else if (!b.chargeTypeLong) {
          return -1;
        } else {
          var nameA = a?.chargeTypeLong?.replace(/ /g, '').toString()?.toUpperCase();
          var nameB = b?.chargeTypeLong?.replace(/ /g, '').toString()?.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }
      });
    });
    this.apiService.get('accountTypes').subscribe(s => {
      this.accountTypes = s;
      this.accountTypes?.sort(function (a, b) {
        if (!a.accountFullName) {
          return 1;
        } else if (!b.accountFullName) {
          return -1;
        } else {
          var nameA = a?.accountFullName?.replace(/ /g, '').toString()?.toUpperCase();
          var nameB = b?.accountFullName?.replace(/ /g, '').toString()?.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }
      });
    });
  }
  //#endregion

  //#region Cart length and cart Items total calculations

  updateCartLength() {
    const total = this.cartLength;
    this.paymentCartService.onChangeCartItems(total);
  }

  get cartTotal(): number {
    let ticketsTotal = 0, feesTotal = 0;
    this.plateDetails.getRawValue().forEach((s: PlateDetail) => {
      ticketsTotal += this.sumOfAmount(s.ticketDetails ?? [], 'amountDue');
    });
    this.plateDetails.getRawValue().forEach((s: PlateDetail) => {
      feesTotal += this.sumOfAmount(s.feeDetails ?? [], 'dueAmount');
    });
    return ticketsTotal + feesTotal;
  }

  getTicketsCount(): number {
    let ticketsCount = 0;
    this.plateDetails.getRawValue().forEach((s: PlateDetail) => {
      ticketsCount += s?.ticketDetails?.length ?? 0;
    });
    return ticketsCount;
  }

  getFeesCount(): number {
    let feesCount = 0;
    this.plateDetails.getRawValue().forEach((s: PlateDetail) => {
      feesCount += s?.feeDetails.filter(s => (+s?.dueAmount > 0))?.length ?? 0;
    });
    return feesCount;
  }

  get cartLength(): number { return this.getTicketsCount() + this.getFeesCount(); }

  //#endregion

  get method1(): FormGroup { return this.paymentCartForm.get('method1') as FormGroup }
  get method2(): FormGroup { return this.paymentCartForm.get('method2') as FormGroup }
  ticketDetails(index: number): FormArray { return this.plateDetails.controls[index].get('ticketDetails') as FormArray }
  feeDetails(index: number): FormArray { return this.plateDetails.controls[index].get('feeDetails') as FormArray }
  get plateDetails(): FormArray { return this.paymentCartForm.get("plateDetails") as FormArray }

  //#region adding, deleting(Fee & Ticket) Items, modifying field data.
  deleteCartItem(value: number, cartName: string, plateIndex: number, index: number) {
    if (value) {
      this.gpService.delete(`getShoppingCart?shoppingCartItemId=${value}`).subscribe(s => {
        (this.plateDetails.at(plateIndex).get(cartName) as FormArray).removeAt(index);
      }, (error) => {
        for (var i = 0; i < error?.error?.details?.length; i++) {
          const msg = error.error.details[i].message;
          this.notificationService.error(this.translate.instant(error.error.details[i].message, { msg: msg }));
        }
      });
    } else {
      (this.plateDetails.at(plateIndex).get(cartName) as FormArray).removeAt(index);
    }
  }

  addFee(plateIndex: number) {
    const data = { accountEntityId: this.plateDetails.controls[plateIndex].get('accountEntityId')?.value };
    (this.plateDetails.at(plateIndex).get('feeDetails') as FormArray).push(this.newFeeData(data));
  }

  onSelectFeePayment(event: MatSelectChange, plateIndex: number, index: number) {
    const data = this.paymentFeeTypes?.find(s => s.violationaccountchargesId == event.value);
    this.gpService.post(`addToShoppingCart?accountEntityId=${this.feeData[0]?.accountEntityId}&violationChargeId=${event.value}`, {}).subscribe(res => {
      (this.plateDetails.at(plateIndex).get('feeDetails') as FormArray).controls[index].get('accountEntityId')?.setValue(res.data.accountEntityId);
      (this.plateDetails.at(plateIndex).get('feeDetails') as FormArray).controls[index].get('shoppingCartItemsId')?.setValue(res.data.shoppingCartItemsId);
      (this.plateDetails.at(plateIndex).get('feeDetails') as FormArray).controls[index].get('chargeType')?.setValue(data.chargeTypeLong);
      (this.plateDetails.at(plateIndex).get('feeDetails') as FormArray).controls[index].get('dueAmount')?.setValue(data.chargeAmount);
      (this.plateDetails.at(plateIndex).get('feeDetails') as FormArray).controls[index].get('feeAmount')?.setValue(data.chargeAmount);
      (this.plateDetails.at(plateIndex).get('feeDetails') as FormArray).controls[index].get('feeName')?.setValue(data.chargeTypeLong);
      (this.plateDetails.at(plateIndex).get('feeDetails') as FormArray).controls[index].get('paidAmount')?.setValue(0);
      (this.plateDetails.at(plateIndex).get('feeDetails') as FormArray).controls[index].get('payment')?.setValue(0);
      (this.plateDetails.at(plateIndex).get('feeDetails') as FormArray).controls[index].get('statePlate')?.setValue('');
    });
  }

  onChangeAmount(item?: AbstractControl | null | undefined) {
    item?.setValue(item.value ? item.value.toFixed(2) : '0.00');
  }

  onChangePayment() {
    let ticketsTotal = 0, feesTotal = 0;
    this.plateDetails.getRawValue().forEach((s: PlateDetail) => {
      ticketsTotal += this.sumOfAmount(s.ticketDetails ?? [], 'payThisAmount');
    });
    this.plateDetails.getRawValue().forEach((s: PlateDetail) => {
      feesTotal += this.sumOfAmount(s.feeDetails ?? [], 'payment');
    });
    this.paymentCartForm.get('totalAmount')?.setValue(ticketsTotal + feesTotal);
    const amount1 = this.method1.get('amount')?.value ? +this.method1.get('amount')?.value : 0;
    const amount2 = this.method2.get('amount')?.value ? +this.method2.get('amount')?.value : 0;
    this.paymentCartForm.get('remainder')?.setValue((ticketsTotal + feesTotal) - (amount1 + amount2));
  }

  onChangeMethod1Amount(value: any) {
    this.onChangePayment(); this.onChangeCashReceived();
  }

  onChangeCashReceived() {
    this.method1.get('changeDue')?.setValue(+this.method1.get('cashReceived')?.value - +this.method1.get('amount')?.value);
  }
  //#endregion 

  //#region submitting the cart items.
  onSubmit() {
    if (this.cartLength > 0) {
      if (this.paymentCartForm.valid && this.paymentCartForm.get('remainder')?.value == 0) {
        if (this.paymentCartForm.get('totalAmount')?.value <= 0) {
          this.notificationService.error(this.translate.instant('Please enter valid amount'));
          return;
        }
        if (this.method2.get('amount')?.value > 0 && !this.method2.get('type')?.value) {
          this.notificationService.error(this.translate.instant('Please select Payment method 2'));
          return;
        }
        if (this.method2.get('type')?.value && (this.method2.get('type')?.value == this.method1.get('type')?.value)) {
          this.notificationService.error(this.translate.instant('The Payment method2 should be different'));
          return;
        }
        if (this.method2.get('type')?.value && (this.method2.get('amount')?.value <= 0)) {
          this.notificationService.error(this.translate.instant('Please fill amount in Method 2'));
          return;
        }
        if (!this.method2.get('type')?.value && (this.method2.get('amount')?.value > 0)) {
          this.notificationService.error(this.translate.instant('Please select Payment Method in Method 2'));
          return;
        }
        const ticketDetails: any[] = [];
        this.plateDetails.getRawValue()?.forEach(s => {
          s?.ticketDetails?.forEach((d: any) => {
            ticketDetails.push(d);
          });
        });
        const feeDetails: any[] = [];
        this.plateDetails.getRawValue()?.forEach(s => {
          s?.feeDetails?.forEach((d: any) => {
            feeDetails.push(d);
          });
        });
        const dateFrom = new Date(this.paymentCartForm.get('paymentDate')?.value);
        const dateStrFrom = dateFrom.getFullYear() + '-' + ('0' + (dateFrom.getMonth() + 1)).slice(-2) + '-' + ('0' + dateFrom.getDate()).slice(-2);
        const hours = dateFrom.getHours();
        const min = dateFrom.getMinutes();
        const sec = dateFrom.getSeconds();
        const isopaymentDate = dateStrFrom + 'T' + hours + ':' + min + ':' + sec + '.000Z';
        const request = {
          "accountTypesId": 1,
          "checkoutDetailsRequest": [
            {
              "amount": this.method1.get('amount')?.value,
              "paymentModeId": this.method1.get('type')?.value,
              "referenceNumber": this.method1.get('referenceNo')?.value,
              "selectMethod": this.method1.get('type')?.value
            }
          ],
          "feesDetailsRequest": feeDetails,
          "paymentDate": isopaymentDate,
          "paymentSource": this.paymentCartForm.get('paymentSource')?.value,
          "ticketDetailsRequest": ticketDetails,
          "totalAmountPaid": this.paymentCartForm.get('totalAmount')?.value
        };
        if ((+this.method2.get('amount')?.value > 0) && this.method2.get('type')?.value) {
          request.checkoutDetailsRequest.push(
            {
              "amount": this.method2.get('amount')?.value,
              "paymentModeId": this.method2.get('type')?.value,
              "referenceNumber": this.method2.get('referenceNo')?.value,
              "selectMethod": this.method2.get('type')?.value
            }
          )
        }
        this.isLoading = true;
        this.gpService.post('getPaymentCheckout', request).subscribe(s => {
          this.isLoading = false;
          this.notificationService.success(this.translate.instant('Payment has been Submitted',
            { msg: 'Payment has been Submitted' }));
          this.paymentCartService.onChangeCartItems(0);
          const paymentMethod1 = this.paymentTypes.find(s => s.paymentModeId == this.method1.get('type')?.value)?.paymentModeDesc;
          const paymentMethod2 = this.paymentTypes.find(s => s.paymentModeId == this.method2.get('type')?.value)?.paymentModeDesc;
          this.paymentCartService.updateCartItemsList({
            plateDetails: this.plateDetails.getRawValue(),
            ticketDetails: ticketDetails,
            feeDetails: feeDetails,
            paymentMethod1: paymentMethod1,
            paymentMethod1Amount: this.method1.get('amount')?.value,
            paymentMethod2: paymentMethod2,
            paymentMethod2Amount: this.method2.get('amount')?.value,
            totalAmount: this.paymentCartForm.get('totalAmount')?.value,
            transactionNumber: s?.data?.transactionNumber,
            receiptNumber: s?.data?.receiptNumber
          });
          this.route.navigate(['gp/search/payment-cart-confirmation']);
        }, (error) => {
          this.isLoading = false;
          for (var i = 0; i < error?.error?.details?.length; i++) {
            const msg = error.error.details[i].message;
            this.notificationService.error(this.translate.instant(error.error.details[i].message, { msg: msg }))
          }
        }, () => {
          this.isLoading = false;
        });
      } else {
        this.paymentCartForm.markAllAsTouched();
        this.paymentCartForm.markAsDirty();
        if (this.paymentCartForm.get('remainder')?.value != 0) {
          this.notificationService.error(this.translate.instant('The Remainder must be zero',
            { msg: 'The Remainder must be zero' }));
        }
      }
    } else {
      this.paymentCartForm.markAllAsTouched();
      this.paymentCartForm.markAsDirty();
      this.notificationService.error(this.translate.instant('There are no Items in the cart Please add Items',
        { msg: 'There are no Items in the cart Please add Items' }));
    }
  }
  //#endregion

  //#region cancel the payment.
  onCancel() {
    this.gpService.delete('deleteAllfromCart').subscribe(s => {
      this.paymentCartService.onChangeCartItems(0);
      window.history.back();
    }, (error) => {
      for (var i = 0; i < error?.error?.details?.length; i++) {
        const msg = error.error.details[i].message;
        this.notificationService.error(this.translate.instant(error.error.details[i].message, { msg: msg }))
      }
    });
  }
  //#endregion
}
