import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GlobalFormats } from '../../enums/global.formats';
import { MessageService } from 'src/app/shared/services/message.service';
export interface CitationDetails {
  agency: string,
  vehicleYear: string,
  badge: string,
  division: string,
  beat: string,
  type: string,
  plate: string,

  registrationExpiration: string,
  parkingPermitNumber: string,
  meter: string,
  speedZone: string,
  speedActual: string,
  overWeight: string,
  hazardIndicator: string,
  accidentNumber: string,
  plateYear: number,
  plateColor: string
  make: string,
  model: string,

  color: string,

  bodyStyle: string,

}
@Component({
  selector: 'app-citation-details',
  templateUrl: './citation-details.component.html',
  styleUrls: ['./citation-details.component.scss']
})
export class CitationDetailsComponent implements OnInit,OnDestroy {
  public globalFormats = GlobalFormats;
  eventId: any;
  citationDetails!: CitationDetails;
  eventSubscription: any;

  constructor(
    public translate: TranslateService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.eventSubscription = this.messageService.getAllEventEntityData().subscribe(item => {
      if (this.router.routerState.snapshot.url.includes('ticket-details')) {
          this.citationDetails = item.citationDetailResult;
      }
      else {
          this.citationDetails = item.citationDetailsResult;
      }
    });
     if (this.citationDetails?.meter == " ") {
        this.citationDetails.meter ="-";
      }
    }

    ngOnDestroy() {
      if (this.eventSubscription) {
        this.eventSubscription.unsubscribe();
      }
    }
  }
