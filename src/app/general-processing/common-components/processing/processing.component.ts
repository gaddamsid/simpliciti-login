import { Component, Input, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GlobalFormats } from '../../enums/global.formats';
import { MessageService } from 'src/app/shared/services/message.service';

export interface ProcessingDetails {
  addedtoeTims: string,
  batchDate: string,
  batchNumber: string,
  microfilmNumber: string,
  backlogCode: string,
  nextEvent: string,
  holdStatus: string,
  holdProcessDate: string
}
@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit,OnDestroy {
  public globalFormats = GlobalFormats;
  processingDetails!: ProcessingDetails;
  eventSubscription: any;

  constructor(
    public translate: TranslateService, private router: Router,private messageService: MessageService) { }

  ngOnInit(): void {
    this.eventSubscription = this.messageService.getAllEventEntityData().subscribe(item => {
      if (this.router.routerState.snapshot.url.includes('ticket-details')) {
          this.processingDetails = item.processingDetailResult;
      }
      else {
          this.processingDetails = item.processingDetailsResult;
      }
    });    
  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }
}
