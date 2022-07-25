import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalFormats } from '../../enums/global.formats';
import { MessageService } from 'src/app/shared/services/message.service';
export interface AddressDetails {
  firstName: string,
  lastName: string,
  fullAddress: string,
  state: string,
  city: string,
  zip: string,
  phoneNumber: string,
  dateofBirth: string,
  lastUpdated: string,
  registrationExpiration: string,
  effectiveDate: string,
  addressSource: string,
  san: string,
  email: string
}
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnDestroy {
  public globalFormats = GlobalFormats;
  eventId: any;
  addressDetails!: AddressDetails;
  eventSubscription: any;

  constructor(public translate: TranslateService, private messageService: MessageService)
  { }

  ngOnInit(): void {
    this.eventSubscription = this.messageService.getAllEventEntityData().subscribe(item => {
      this.addressDetails = item.nameAndAddressDetail;
    });
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }
}
