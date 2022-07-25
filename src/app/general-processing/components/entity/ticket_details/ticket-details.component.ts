import { Component, ElementRef, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CitationsSummary, EntityDetails, Status1, EntityDetail, Layout } from 'src/app/general-processing/models/plate.model';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { GPService } from 'src/app/general-processing/services/g-p.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryDetails } from "../../../models/customlayout.interface";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { GalleryCustomizeComponent } from '../../gallery-customize/gallery-customize.component';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
  providers: [DatePipe]
})
export class TicketDetailsComponent implements OnInit, OnDestroy {
  dialogRef!: MatDialogRef<GalleryCustomizeComponent>;
  entityDetails!: EntityDetails;
  statusArr: any = [];
  entityDetail!: EntityDetail;
  status1!: Status1;
  citationsSummary: CitationsSummary[] = [];
  citationSummary!: CitationsSummary;
  galleryDetails!: GalleryDetails;
  public canvasImage: any[];

  eventLayout!: Layout;
  userLayout!: string;
  showTicketHistory: boolean = false;
  ticketNumber: any;
  subscription: any;
  msgSubscription: any;
  platSubscription: any;
  layoutType: number;
  plateNo: any;
  plateNumber: any;

  constructor(
    private language: LanguageService,
    public translate: TranslateService, private route: ActivatedRoute, private router: Router,
    private matDialog: MatDialog,
    private datePipe: DatePipe, private gpService: GPService, private dialog: MatDialog,
    private elementRef: ElementRef, private messageService: MessageService) {
    this.elementRef = elementRef;
    this.canvasImage = [];
    this.layoutType = 1;
  }

  ngOnInit(): void {
    this.getLayout();
    this.route.params.subscribe(params => {
      const citationNo = params['citationNumber'];
      this.plateNumber = params['plateNumber'];
      this.ticketNumber = citationNo;
      this.getData(citationNo);
    });

    this.msgSubscription = this.messageService.getMessage().subscribe(item => {
      if (item && item.layoutType) {
        this.eventLayout.layoutType = item.layoutType;
      }
    });

    this.platSubscription = this.messageService.getPlateNo().subscribe(item => {
      if (item.length > 0) {
        this.plateNo = item;
      }
    });

    this.subscription = this.messageService.getUpdatedLayout().subscribe(item => {
      if (item) {
        this.getLayout();
      }
    });
  }

  getLayout() {
    this.gpService.get(`getCustomLayout`).subscribe(res => {
      this.eventLayout = res[0];
      this.userLayout = res[0].layoutType;
    })
  }

  getData(citationNo: any) {
    this.gpService.get(`getCitationNumber/${citationNo}`).subscribe((res => {
      this.entityDetails = res.entityDetails;
      this.entityDetail = res.entityDetails;
      this.messageService.setAllEventEntityData(res.citationSearchResponse);
      // let plateNo = res.citationSearchResponse.citationDetailResult?.plate;
      if (this.plateNo) {
        this.gpService.get(`getEntityDetails/${this.plateNo}`).subscribe(res => {
          let noteValue: any;
          let CBFraud: any;
          let PrevMarked: any;
          let DMVHold: any;
          this.entityDetail = res?.entityDetails;
          this.entityDetails = res?.entityDetails;
          this.entityDetails.plateDetails.plateExpireDate = this.datePipe.transform(this.entityDetails?.plateDetails?.plateExpireDate, 'MMM d, y');
          this.entityDetails.plateDetails.sourceDate = this.datePipe.transform(this.entityDetails?.plateDetails?.sourceDate, 'MMM d, y');
          this.entityDetails.ownerDetails.dateOfBirth = this.datePipe.transform(this.entityDetails?.ownerDetails?.dateOfBirth, 'MMM d, y');
          this.entityDetails.ownerDetails.ownershipStartDate = this.datePipe.transform(this.entityDetails?.ownerDetails?.ownershipStartDate, 'MMM d, y');

          if ((this.entityDetail?.status?.indicators != null) || (this.entityDetail?.status?.indicators != undefined)) {
            this.statusArr = this.entityDetail?.status?.indicators.split(',');
            CBFraud = this.statusArr[0],
              PrevMarked = this.statusArr[2],
              DMVHold = this.statusArr[3]
          }
          if (this.entityDetail?.status != undefined) {
            if (this.statusArr[1] != undefined) {
              noteValue = this.statusArr[1]
            }
            else {
              noteValue = "Notes"
            }
            this.entityDetails.status = {
              notes: noteValue,
              CBFraud: CBFraud,
              PrevMarked: PrevMarked,
              DMVHold: DMVHold
            }
          }
        });
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
          pdf.save("event-details.pdf"); // Generated PDF
        }
      )
      .catch(
        (error) => {
          console.warn("An error occurred.");
          console.error(error);
        }
      );

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


  redirectShouldHappen() {
    const url = `/gp/search/entity-details/entity/${this.plateNumber}/address-update/${this.ticketNumber}`;
    const queryParamData = { ticketNumber: this.ticketNumber };
    this.router.navigate([url], { queryParams: queryParamData });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.msgSubscription) {
      this.msgSubscription.unsubscribe();
    }
    if (this.platSubscription) {
      this.platSubscription.unsubscribe();
    }
  }
}
