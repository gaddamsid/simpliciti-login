import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GlobalFormats } from '../../enums/global.formats';
import { MessageService } from 'src/app/shared/services/message.service';
export interface ViolationDetails {
  description: string,
  location: string,
  violationCode: string,
  issueDate: string,
  issuingOfficer: string,
  relatedViolations: string,
}
@Component({
  selector: 'app-violation-details',
  templateUrl: './violation-details.component.html',
  styleUrls: ['./violation-details.component.scss']
})
export class ViolationDetailsComponent implements OnInit,OnDestroy {
  public globalFormats = GlobalFormats;
  eventId: any;
  violationDetails!: ViolationDetails;
  eventSubscription: any;

  constructor(
    public translate: TranslateService, private router: Router,private messageService: MessageService) { }

  ngOnInit(): void {

    this.eventSubscription = this.messageService.getAllEventEntityData().subscribe(item => {
      if (this.router.routerState.snapshot.url.includes('ticket-details')) {
          this.violationDetails = item.violatioDetailResult;
      }
      else {
          this.violationDetails = item.violatioDetailsResult;
      }
    });  
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }
}
