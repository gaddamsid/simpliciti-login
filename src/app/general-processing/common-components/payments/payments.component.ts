import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GlobalFormats } from '../../enums/global.formats';
import { MessageService } from 'src/app/shared/services/message.service';

export interface PaymentDetails {
  fine: string,
  penalty1: number,
  penalty2: number,
  penalty3: number,
  penalty4: number,
  penalty5: number,
  reduction: number,
  interest: number,
  batchNumber: string,
  account: string,
  processDate: string,
  paymentDept: string,
  method: string,
  amount: number,
  refundCheckNumber: string,
  reapplySource: string,
  type: string
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit,OnDestroy {
  public globalFormats = GlobalFormats;
  eventId: any;
  paymentDetails!: PaymentDetails;
  eventSubscription: any;

  constructor(
    public translate: TranslateService,private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {

    this.eventSubscription = this.messageService.getAllEventEntityData().subscribe(item => {
      if (this.router.routerState.snapshot.url.includes('ticket-details')) {
          this.paymentDetails = item.paymentDetailResult;
      }
      else {
          this.paymentDetails = item.paymentDetailsResult;
      }
    });
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

}
