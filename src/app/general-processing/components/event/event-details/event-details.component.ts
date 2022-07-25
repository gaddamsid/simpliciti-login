import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { CitationsSummary, EntityDetails,Status1,EntityDetail, Layout } from 'src/app/general-processing/models/plate.model';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { GPService } from 'src/app/general-processing/services/g-p.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ActivatedRoute } from '@angular/router';
import { GalleryDetails } from "../../../models/customlayout.interface";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { GalleryCustomizeComponent } from '../../gallery-customize/gallery-customize.component';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  providers:[DatePipe]
})
export class EventDetailsComponent implements OnInit {
  dialogRef!: MatDialogRef<GalleryCustomizeComponent>;
  entityDetails!: EntityDetails;
  statusArr:any=[];
  isLoading = false;
  eventLayout!: Layout;
  entityDetail!: EntityDetail;
  status1!:Status1;
  citationsSummary: CitationsSummary[] = [];
  citationSummary!:CitationsSummary;
  galleryDetails!: GalleryDetails;
  public canvasImage: any[];
  userLayout!: string;
  showTicketHistory: boolean = false;
  applyClass1:boolean = false;
  applyClass2:boolean = false;
  applyClass3:boolean = false;

  constructor(
    private language: LanguageService,
    private matDialog: MatDialog,
    public translate: TranslateService, private route: ActivatedRoute,
    private datePipe: DatePipe, private gpService: GPService,private dialog: MatDialog,
    private elementRef: ElementRef, private messageService: MessageService ) {

      this.elementRef = elementRef;
      this.canvasImage = [];
  
    }
  ngOnInit(): void {
    this.getLayout();
    this.route.params.subscribe(params => {
      const eventIdNo = params['eventId'];
      this.getData(eventIdNo);
    });
  }

  openCustomLayout() {
    this.dialogRef = this.matDialog.open(GalleryCustomizeComponent, {
      "width": '4500px',
      "maxHeight": '90vh',
      "data": '',
      "autoFocus": false
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.getLayout();
    })
  }
  changeLayout(type:number) {
    this.eventLayout.layoutType = type.toString();
    this.checkStyle(this.eventLayout.layoutType);
  }
  checkStyle(type:any)
  {
    if(type == 1){
        this.applyClass1 = true;
        this.applyClass2 = false;
        this.applyClass3 = false; 
     }
     else if(type == 2){
         this.applyClass1 = false;
         this.applyClass2 = true;
         this.applyClass3 = false; 
     }
     else if(type == 3){
         this.applyClass1 = false;
         this.applyClass2 = false;
         this.applyClass3 = true; 
     }
     else{
         
     }
  }
  getLayout() {
    this.gpService.get(`getCustomLayout`).subscribe(res => {
      this.eventLayout = res[0];
      this.checkStyle(res[0].layoutType);
      this.userLayout = res[0].layoutType;
      
    })
  }
  
  getData(eventIdNo: any) {
    this.gpService.get(`getEventId/${eventIdNo}`).subscribe((res => {
      let noteValue:any;
      let CBFraud:any;
      let PrevMarked:any;
      let DMVHold:any;
      this.entityDetails = res.entityDetails;
     
      this.entityDetail=res.entityDetails;
      if(this.entityDetails)
      {
        this.entityDetails.plateDetails.sourceDate = this.datePipe.transform(this.entityDetails.plateDetails.sourceDate, 'MMM d, y');
        this.entityDetails.ownerDetails.dateOfBirth=this.datePipe.transform(this.entityDetails.ownerDetails.dateOfBirth, 'MMM d, y');
        this.entityDetails.plateDetails.plateExpireDate=this.datePipe.transform(this.entityDetails.plateDetails.plateExpireDate, 'MMM d, y');
        this.entityDetails.ownerDetails.ownershipStartDate= this.datePipe.transform(this.entityDetails.ownerDetails.ownershipStartDate, 'MMM d, y');
      }
      this.messageService.setAllEventEntityData(res.eventDetails);
      res?.citationsSummary?.forEach((e:any)=> {
        this.citationSummary = {
          amountDue:e.amountDue,
          citationNo: e.citationNo,
          events: e.events,
          fines: e.fines,
          interest: e.interest,
          issuedDate: this.datePipe.transform(e.issuedDate, 'MMMM d, y'),
          locationDescription: e.locationDescription,
          payments: e.payments,
          penalties: e.penalties,
          reduction: e.reduction,
          status: e.status,
          violationDate: this.datePipe.transform(e.violationDate, 'MMMM d, y'),
          courtScheduleId: e.courtScheduleId
        }
      });
      this.citationsSummary.push(this.citationSummary);
  
       if( (this.entityDetail?.status?.indicators!=null)||(this.entityDetail?.status?.indicators!=undefined))
       { 
         this.statusArr = this.entityDetail?.status?.indicators.split(','); 
         CBFraud=this.statusArr[0],
         PrevMarked=this.statusArr[2],
         DMVHold=this.statusArr[3]
       }
       if(this.entityDetail?.status!=undefined){
         if(this.statusArr[1]!=undefined){
           noteValue=this.entityDetail?.status?.notes
         }
         else{
           noteValue="Notes"
         }
         this.entityDetails.status = {
           notes: noteValue,
           CBFraud: CBFraud,
           PrevMarked:PrevMarked,
           DMVHold: DMVHold
         }
       }
      this.language.sendLang.subscribe(lang => {
        if (lang != '') {
          this.appendLang(lang);
        }
      });
    }));
  }
  appendLang(lang: string) {
    this.translate.use(lang);
  }

  findByTicketNumber(ticketNumber: any) {
    this.gpService.get(`getCitationNumber/${ticketNumber}`).subscribe(((res) => {
      this.galleryDetails = res;
      this.language.sendLang.subscribe(lang => {
        if (lang != '') {
          this.appendLang(lang);
        }
      });
    }));
  }

  // ------------------------- Image PDF Code ------------------------
  
  // public elementRef: ElementRef;
  // I initialize the app component.

  // ---
  // PUBLIC METHODS.
  // ---

  // I use html2canvas to generate a PNG of the current meme configuration. The
  // generated images is appended to the view.
  public downloadAsPDF(): void {
    // The html2canvas library, at the time of this writing, is having trouble
    // generating canvas images if the window is scrolled down. To "fix" this, we
    // need to scroll the user back to the top before we initiate the screenshot.
    // --
    // Read more: https://github.com/niklasvh/html2canvas/issues/1878
    window.scrollTo(0, 0);
    var target = this.elementRef.nativeElement.querySelector("#pdfPage");
    // Generate the screenshot using html2canvas.
    var promise = html2canvas(
      target,
      {
        logging: false,
        allowTaint: true,
        useCORS: true,
        // The onclone callback gives us access to the cloned DOCUMENT before the
        // screenshot is generated. This gives us the ability to make edits to
        // the DOM that won't affect the original page content. In this case, I
        // am applying a special CSS class that allows me to tweak the padding
        // around the text.
        onclone: (doc) => {
          doc.querySelector("#pdfPage")!.classList.add("html2canvas");
        }
      }
    );

    promise
      .then(
        (canvas) => {
          // Once the screenshot has been generated (as a canvas element), we
          // can grab the PNG data URI which we can then use to render an IMG
          // tag in the app.
          this.canvasImage.unshift({
            id: Date.now(),
            url: canvas.toDataURL()
          });
          var imgWidth = 208;
          var pageHeight = 295;
          var imgHeight = (canvas.height * imgWidth) / canvas.width;
          var heightLeft = imgHeight;
          const contentDataURL = canvas.toDataURL("image/png");
          let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
          var position = 0;
          pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
          pdf.save("event-detail-export.pdf"); // Generated PDF
        }
      )
      .catch(
        (error) => {
          console.warn("An error occurred.");
          console.error(error);
        }
      )
      ;

  }


  // I scroll the given HTML element into view, using smooth scrolling if available.
  public scrollIntoView(element: HTMLElement): void {
    // NOTE: The "options" are not available in all browsers.
    try {
      element.scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
    } catch (error) {
      element.scrollIntoView();
    }
  }
  ticketHistory() {
    this.showTicketHistory = true;
  }
  
}
