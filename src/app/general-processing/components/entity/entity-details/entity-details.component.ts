import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, Query, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GetCustomLayout } from 'src/app/general-processing/models/getcustomlayout.interface';
import { CitationsSummary, EntityDetails, Status1, EntityDetail } from 'src/app/general-processing/models/plate.model';
import { GPService } from 'src/app/general-processing/services/g-p.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { CitationDetailResult, GalleryDetails, NameAndAddressDetail, PaymentDetailResult, ProcessingDetailResult, ViolatioDetailResult } from "../../../models/customlayout.interface";
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { GalleryCustomizeComponent } from '../../gallery-customize/gallery-customize.component';
import { NotesViewComponent } from '../notes-view/notes-view.component';
import { GlobalFormats } from 'src/app/general-processing/enums/global.formats';
import { MessageService } from 'src/app/shared/services/message.service';
import { DataService } from 'src/app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { filter, map } from 'rxjs';
import { PaymentCartService } from 'src/app/shared/services/payment-cart.service';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

export interface IssuanceData {
  citationNumber: string,
  issueDateTime: string,
  division: string,
  route: string,
  badge: string,
  color: string,
  make: string,
  model: string,
  style: string,
  tagExpirationDate: string,
  location: string,
  violationCode: string,
  rppDistrict: string,
  meter: string
}

export interface SuspendsData {
  citationNumber: string,
  totalAmountDue: string,
  caseNumber: string,
  dateOverride: string,
  processDate: string,
  userId: string,
  reductionAmount: string,
  suspendCode: string,
  suspendName: string,
  suspendDateTime: string,
  suspendTillDate: string
}


export interface hearingResurestData {
  citationNumber: string,
  suspendClass: string,
  suspendStartDate: string,
  lastDateToRequest: null,
  paymentWaiver: string,
  suspendCode: Number,
  amountPaid: null,
  totalDue: 0,
  suspendName: string

}

export interface hearingStatusData {
  citationNumber: string,
  scheduledDate: string,
  hearingLocation: string,
  hearingDateTime: string,
  dispClass: string,
  dispDescription: string,
  adjudicator: string,
  decisionDate: string,
  untimelyHearing: string,
  receivedDate: string
}

export interface hearingData {
  reductionAmount: number,
  totalDue: number,
  citationNumber: string,
  userId: string,
  hearingOfficer: string,
  dispositionDateTime: string,
  dispositionName: string,
  suspendCode: number,
  suspendDesc: string,
  suspendEndDate: string,
  caseNumber: string,
  pleaCode: string,
  hearingDateTime: string
}


export interface PenaltyData {
  citationNumber: string,
  fine: number,
  overPaid: number,
  penalty1: number,
  penalty2: number,
  penalty3: number,
  penalty4: number,
  penalty5: number,
  penalty1Date: string,
  penalty2Date: string,
  penalty3Date: string,
  penalty4Date: string,
  penalty5Date: string,
  reductionAmount: number,
  totalDue: number,
  totalPaid: number
}
export interface PaymentData {
  citationNumber: string;
  userId: string;
  paymentDate: string;
  amountPaid: number;
  totalDue: number;
  overPaid: number;
  account: string;
  processedOn: string;
  ippInd: string;
  paymentType: string;
}
export interface Moving1 {
  accident: string,
  actaualSpeed: number,
  bookedInd: string,
  filed: string,
  hazard: number,
  issueDate: string,
  microfilmNumber: number,
  misc: string,
  overweight: number,
  owner: string,
  radarIndication: string,
  sample: string,
  speedZone: number,
  ticket: string,
  violation: string,
  imageIndicator: string
}
export interface Moving2 {
  assignAgency: number,
  assignDate: string,
  dateOfBirth: string,
  description: string,
  eyes: string,
  hair: string,
  height: string,
  issuingAgency: string,
  plate: string,
  race: string,
  sex: string,
  ticket: string,
  vin: string,
  violation: string,
  weight: number,
  imageIndicator: string
}

export interface OtherVoilation {
  OthercitationNumber: string,
  OtherissueDate: string,
  fineAmount: number,
  violationCode1: string,
  description1: string,
  violationCode2: string,
  description2: string,
  violationCode3: string,
  description3: string,
  violationCode4: string,
  description4: string
}

export interface NON_RENEWABLE {
  citationNumber: string;
  date: string;
  status: string;
  swapStatus: string;
  swapDate: string;
  responseDate: string;
}

export interface SurchargeModel {
  citationNumber: string;
  suspEvent: string;
  // surchargeProcessDate: string;
  surchargeStatus: string;
  lastNoticeSusp: string;
  // proposedJudgment: string;
  judgeStatus: string;
  judgeDocket: string;
  cancelledProcess: string;
  cancelledClerk: string;
}

export interface EnforcementModel {
  citationNumber: string;
  civilNum: string;
  // lienReleased: string;
  warrantReason: string;
}

export interface citaitons {
  citationNo: any;
  citationId: any;
}

export interface CollectionData {
  citationNumber: string,
  nixieStatus: string,
  traceSource: string,
  amountDue: number,
  amountPaid: number,
  costOfCollection: number,
  assingedAgency: string,
  activity: string,
  recallDate: string,
  category: string,
  lastActivityDate: string,
  lastMailDate: string,
  fines: number,
  penalties: number
}
export interface NoticeData {
  citationNumber: string,
  mailSentDate1: string,
  mailProcessDate1: string,
  mailSentDate2: string,
  mailProcessDate2: string,
  mailSentDate3: string,
  mailProcessDate3: string,
  mailSentDate4: string,
  mailProcessDate4: string,
  mailSentDate5: string,
  mailProcessDate5: string
}
export interface SystemViewData {
  backlogSample: string;
  citationNumber: string;
  error: number;
  event: number;
  event2: number;
  iPPDefault: number;
  nextActionDate: string;
  nextActionType: string;
  sPCIND: string;
  seizeBoot: string;
}
export interface RevenueData {
  amountPaid: number,
  citationNumber: string,
  cityShare: number,
  collectionFees: number,
  countryAndStateShare: number,
  courtFees: number,
  handicapFees: number,
  justiceFees: number,
  specialFees: number
}


export interface AdminReview {
  AdmincitationNumber: string,
  AdminissueDate: string,
  violationt: string,
  lastContestDate: string,
  disposition: string,
  adminsuspendClass: string,
  untimelyReview: string,
  suspendCode: string,
  suspendStart: string,
  suspendUntil: string,
}

export interface PublicSpace {
  fines: number,
  status: string,
  violation: string,
  penalties: number,
  amountDue: number,
  servMethod: string,
  location: string,
  servDate: string,
  surchargeNumber: string,
  abateAmount: number

}

@Component({
  selector: 'app-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.scss'],
  providers: [DatePipe]
})

export class EntityDetailsComponent implements OnInit {
  dialogRef!: MatDialogRef<GalleryCustomizeComponent>;
  dialogRefForNotes!: MatDialogRef<NotesViewComponent>
  // ticketNumber: string;
  citationsSummary: CitationsSummary[] = [];
  citationSummary!: CitationsSummary;
  violatioDetailResult!: ViolatioDetailResult;
  paymentDetailResult!: PaymentDetailResult;
  nameAndAddressDetail!: NameAndAddressDetail;
  citationDetailResult!: CitationDetailResult;
  processingDetailResult!: ProcessingDetailResult;
  entityDetails!: EntityDetails;
  entityDetail!: EntityDetail;
  galleryDetails!: GalleryDetails;
  getCustomLayout!: GetCustomLayout;
  customlayoutDetails!: GetCustomLayout;
  layoutprefrencesid!: any;
  queryArray: citaitons[] = [];
  storecitationId!: citaitons;
  citationsIDArray: citaitons[] = [];
  platGNo: any;
  howTicketHistory: boolean = false;
  isCollection: boolean = false;
  isRevenueDistribution = false;
  isSystemView: boolean = false;
  issuanceData: IssuanceData[] = [];
  publicSpace: PublicSpace[] = [];
  suspendsData: SuspendsData[] = [];
  penaltyData: PenaltyData[] = [];
  collectionData: CollectionData[] = [];
  noticeData: NoticeData[] = [];
  revenueDistributionData: RevenueData[] = [];
  systemView: SystemViewData[] = [];
  hearingResurestData: hearingResurestData[] = [];
  hearingStatusData: hearingStatusData[] = [];
  hearingData: hearingData[] = [];
  otherVoilationData_array: any = [];

  public globalFormats = GlobalFormats;
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  statusArr: any = [];

  status1!: Status1;
  displayedColumns = ['select', 'citationNo', 'violationDate', 'issuedDate', 'status',
    'locationDescription', 'fines', 'penalties', 'reduction', 'interest', 'payments', 'amountDue', 'events'
  ];
  public canvasImage: any[];
  plateNoDlNo = "";
  isAmtTotalDue: boolean = true;
  isplateHistoryView: boolean = false;
  isLoading = true;
  currentTicketNumber: any;
  paymentData: any;
  surchargeTabData: any;
  enforcementTabData: any;
  paymentDetails: boolean = false;
  hearingStatustData: any;
  customerInformation: any;
  registryInformation: any;
  hearingShow: boolean = false;
  hearingRequestTable: boolean = false;
  multiOwnerDetail: any;
  nonRenewalData: any;
  moving1Data!: Moving1[];
  moving2Data!: Moving2[];
  otherVoilationData: OtherVoilation[] | undefined;
  adminReviewData: AdminReview[] | undefined;
  imgSrc!: string;
  adminReviewData_array: any = [];
  courtScheduledList: any[] = [];
  constructor(
    private language: LanguageService,
    private matDialog: MatDialog, private dataService: DataService,
    public translate: TranslateService, private route: ActivatedRoute,
    private datePipe: DatePipe, private gpService: GPService,
    private paymentCartService: PaymentCartService,
    private http: HttpClient,
    private dialog: MatDialog, private messageService: MessageService,
    private elementRef: ElementRef, private router: Router, private notificationService: ToastrService) {

    this.elementRef = elementRef;
    this.canvasImage = [];

  }


  openCustomLayout() {
    this.dialogRef = this.matDialog.open(GalleryCustomizeComponent, {
      "width": '4500px',
      "maxHeight": '90vh',
      "data": '',
      "autoFocus": false
    });
    this.dialogRef.afterClosed().subscribe(result => {
      //this.getLayout();
    })
  }
  // openNotes(templateRef: TemplateRef<any>) {
  //   this.dialog.open(templateRef);
  // }

  hideEntity = false;
  ngOnInit(): void {

    // for hide entity details start
    let activatedRoute = this.route.snapshot;
    while (activatedRoute?.firstChild) {
      activatedRoute = activatedRoute?.firstChild
    }
    if (activatedRoute?.data['hideEntity']) {
      this.hideEntity = activatedRoute?.data['hideEntity'];
    }
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route.snapshot),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild
        }
        return route;
      })
    ).subscribe((route: ActivatedRouteSnapshot) => {
      this.hideEntity = route.data && route.data['hideEntity'];
    })
    // for hide entity details end

    this.route.params.subscribe(params => {
      this.plateNoDlNo = params['plateNumber'];
      this.findByPlateNumber(this.plateNoDlNo);
      this.messageService.sendPlateNo(this.plateNoDlNo);
    });
    this.language.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
  }

  findByPlateNumber(plateNumber: any) {
    this.gpService.get(`getEntityDetails/${plateNumber}`).subscribe(res => {
      this.isLoading = false;
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



      res?.citationsSummary?.forEach((e: any) => {
        this.storecitationId = {
          citationId: e.citationsId,
          citationNo: e.citationNo
        }
        this.queryArray.push(this.storecitationId);

        this.citationSummary = {
          amountDue: e.amountDue,
          citationNo: e.citationNo,
          citationsId: e.citationsId,
          events: e.events,
          fines: e.fines,
          interest: e.interest,
          issuedDate: this.datePipe.transform(e.issuedDate, 'MMM d, y'),
          locationDescription: e.locationDescription,
          payments: e.payments,
          penalties: e.penalties,
          reduction: e.reduction,
          status: e.status,
          courtScheduleId: e.courtScheduleId,
          violationDate: this.datePipe.transform(e.violationDate, 'MMM d, y')
        }
        this.citationsSummary.push(this.citationSummary);
      });
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<any>(this.citationsSummary);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      this.language.sendLang.subscribe(lang => {
        if (lang != '') {
          this.appendLang(lang);
        }
      });
    }, (err => { this.isLoading = false; }),
      () => { this.isLoading = false; });
  }


  //this is for getting data in layout text field
  getCitationNumber(ticketNumber: any) {
    this.gpService.get(`getCitationNumber/${ticketNumber}`).subscribe(((res) => {
      this.isLoading = false;
      this.galleryDetails = res;
      this.language.sendLang.subscribe(lang => {
        if (lang != '') {
          this.appendLang(lang);
        }
      });
    }));
  }

  appendLang(lang: string) {
    this.translate.use(lang);
    this.setPagelabel(lang);
  }
  setPagelabel(lang: any) {
    this.translate.use(lang).subscribe((res: any) => {
      this.dataSource.paginator = this.paginator;
      const alertMsg = this.translate.instant("Items per page", { msg: '' });
      this.dataSource.paginator._intl.itemsPerPageLabel = alertMsg;
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    // if there is a selection then clear that selection
    if (this.isSomeSelected()) {
      this.selection.clear();
      this.citationsIDArray = [];
    } else {
      this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));

      let citationsIDArray1 = this.dataSource.data;
      citationsIDArray1.forEach((element: any) => {
        let obj: citaitons = {
          citationId: element.citationsId,
          citationNo: element.citationNo
        };
        this.citationsIDArray.push(obj);
      })

    }
  }

  isSomeSelected() {
    return this.selection.selected.length > 0;
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
          pdf.save("entity-detail-export.pdf"); // Generated PDF
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
  viewCitationImage(templateRef: TemplateRef<any>, url: string) {
    this.imgSrc = url;
    this.dialog.open(templateRef);
  }
  dialogClose() {
    this.dialog.closeAll();
  }
  platehistroyView(event: boolean) {
    this.isLoading = true;
    this.isplateHistoryView = event;
    this.route.params.subscribe(params => {
      const eventIdNo = params['id'];
      this.gpService.get('getPlateHistory/' + eventIdNo).subscribe(res => {
        this.isLoading = false;
        this.customerInformation = res.customerInformation;
        this.registryInformation = res.registryInformation;
        this.isplateHistoryView = event;
      }, err => { this.isLoading = false; },
        () => { this.isLoading = false; })
    });
  }

  removePlatehistroy(event: boolean) {
    if (event == true) {
      this.isplateHistoryView = false;
      this.notificationService.info(this.translate.instant("Process Cancelled"));
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      this.isplateHistoryView = true;
    }
  }

  findByTicketNumber(ticketNumber: any) {
    this.currentTicketNumber = ticketNumber;
    this.router.navigateByUrl(`gp/search/entity-details/entity/${this.plateNoDlNo}/citation/${ticketNumber}/ticket-details`);
  }

  addTicketNote() {
    let test = 0;
    let noteType = 'ticket';
    let plateID = this.entityDetails.plateDetails.plateNumber;
    let citationsIds: any = [];
    let citationsNos: any = [];

    if (this.queryArray != []) {

      this.citationsIDArray.forEach((e) => {
        citationsNos.push(e.citationNo);
        this.queryArray.forEach((q) => q.citationNo === e.citationNo ? citationsIds.push(q.citationId) : '');
      })
    }
    if (this.citationsIDArray.toString() !== '') {
      this.router.navigate([`gp/search/entity-details/entity/${plateID}/add-notes/${citationsNos}/${citationsIds}`]);
    }
    else if (this.queryArray.toString() === '') {
      alert('Please select a value from the table');
    }
  }

  onCheck(row: any) {
    if (this.isSomeSelected()) {
      let length = this.selection.selected.length;
      console.log(length);
      console.log(this.citationsIDArray);
    }
    if (this.citationsIDArray.find(e => e.citationNo === row.citationNo)) {
      this.citationsIDArray = this.citationsIDArray.filter(e => e.citationNo !== row.citationNo);
    }
    else {
      let obj: citaitons = {
        citationId: 0,
        citationNo: row.citationNo
      };
      this.citationsIDArray.push(obj);
    }

    console.log(this.citationsIDArray);
    this.citationsIDArray = this.citationsIDArray;
  }

  onClickCart() {
    if (this.selection?.selected?.length) {
      const selectedItems = this.selection.selected?.filter(s => s?.amountDue > 0);
      const citationNos = selectedItems?.map(s => s.citationsId);
      if (selectedItems?.length > 0) {
        const request = {
          "accountEntityChargeId": 0,
          "accountEntityId": 0,
          "accountEntityIds": [
            this.entityDetails.plateDetails.accountEntityId
          ],
          "amountApplied": 0,
          "cashierSessionId": 0,
          "citationFinancialsId": 0,
          "citationIds": citationNos,
          "citationsId": 0,
          "contractId": 0,
          "createDateTime": "2022-06-23T11:42:58.428Z",
          "createUserId": 0,
          "entityTypesId": 1,
          "ippLineItemId": 0,
          "rppLineItemNumber": 0,
          "rppNumber": 0,
          "shoppingCartItemsDate": "2022-06-23T11:42:58.428Z",
          "shoppingCartItemsId": 0,
          "updateDateTime": "2022-06-23T11:42:58.428Z",
          "updateUserID": 0
        };
        this.isLoading = true;
        this.gpService.post(`getShoppingCart`, request).subscribe((res: any) => {
          this.isLoading = false;
          this.paymentCartService.onChangeCartItems(res.data.numberOfItems);
          this.notificationService.success(`${res.data.numberOfItems} ` + this.translate.instant(`Items are added to the Cart Successfully`));
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
        this.notificationService.error(this.translate.instant('Selected Tickets amount due must be greater than 0'));
      }
    } else {
      this.notificationService.error(this.translate.instant('Please select at least one Ticket to Proceed'));
    }
  }
  getTicketHistory() {
    if (this.citationsIDArray.length) {
      this.router.navigateByUrl(`gp/search/entity-details/entity/${this.plateNoDlNo}/citation/${this.citationsIDArray[0]?.citationNo}/ticket-history`);
    }
  }
  onSelectEvent(value: any) {
    this.isLoading = true;
    this.isCollection = false;
    this.isRevenueDistribution = false;
    this.selection.clear();
    if (value == '3') {
      //Issuance tab

      this.displayedColumns = ['select', 'citationNumber', 'issueDateTime', 'division', 'badge',
        'make', 'style', 'violationCode', 'rppDistrict'];
      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'ISSUANCE'}`).subscribe(res => {
        this.issuanceData = res.issuanceDetail;
        this.dataSource = new MatTableDataSource<any>(this.issuanceData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.isLoading = false;
      }, (err: any) => { this.isLoading = false; },
        () => { this.isLoading = false; })
    } else if (value == '14') {
      this.displayedColumns = ['select', 'surchargeNumber', 'servDate', 'servMethod', 'violation',
        'publicstatus', 'pernalties', 'abateAmount', 'amountDue'];
      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'PUBLIC_SPACE'}`).subscribe(res => {
        this.publicSpace = res.publicSpaceResponse;
        this.dataSource = new MatTableDataSource<any>(this.publicSpace);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.isLoading = false;
      }, (err: any) => { this.isLoading = false; },
        () => { this.isLoading = false; })
    }
    else if (value == '1') {
      //MultiOwnerDetail tab 
      this.displayedColumns = ['select', 'citationNumber', 'alternateName', 'vinnumber', 'rentalData', 'effectiveDate', 'terminationDate'];
      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'MULTI_OWNER'}`).subscribe(res => {
        this.multiOwnerDetail = res.multiOwnerDetail;
        this.dataSource = new MatTableDataSource<any>(this.multiOwnerDetail);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.isLoading = false;
      }, (err: any) => { this.isLoading = false; },
        () => { this.isLoading = false; })
    }
    else if (value == '19') {
      //Susupends
      this.isAmtTotalDue = false;
      this.displayedColumns = ['select', 'citationNumber', 'suspendCode', 'suspendDateTime', 'processDate', 'caseNumber', 'dateOverride', 'reductionAmount', 'totalAmountDue'];
      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'SUSPEND'}`).subscribe(res => {
        this.suspendsData = res.suspendDetail;
        this.dataSource = new MatTableDataSource<any>(this.suspendsData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.isLoading = false;
      }, (err: any) => { this.isLoading = false; },
        () => { this.isLoading = false; });

    }

    else if (value == '8')//Hearing Request
    {
      this.hearingRequestTable = true;
      this.displayedColumns = ['select', 'citationNumber', 'suspendClass', 'suspendCode', 'suspendStartDate', 'lastDateToRequest', 'amountPaid', 'paymentWaiver'];
      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'HEARING_REQUEST'}`).subscribe(res => {
        this.hearingResurestData = res.hearingRequestDetail;
        this.dataSource = new MatTableDataSource<any>(this.hearingResurestData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.isLoading = false;
      }, (err: any) => { this.isLoading = false; },
        () => { this.isLoading = false; });
    }

    else if (value == '9')//Hearing Status
    {

      this.displayedColumns = ['select', 'citationNumber', 'scheduledDate', 'hearingLocation', 'dispClass', 'adjudicator', 'decisionDate', 'untimelyHearing'];
      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'HEARING_STATUS'}`).subscribe(res => {
        this.hearingStatustData = res.hearingStatusDetail;
        this.dataSource = new MatTableDataSource<any>(this.hearingStatustData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.isLoading = false;
      }, (err: any) => { this.isLoading = false; },
        () => { this.isLoading = false; });

    }
    else if (value == '18')//Hearing
    {

      this.hearingShow = true;
      this.displayedColumns = ['select', 'citationNumber', 'hearingOfficer', 'hearingDateTime', 'dispositionDateTime', 'dispositionUserID', 'suspendDesc', 'caseNumber', 'reductionAmount', 'totalDue'];
      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'HEARING'}`).subscribe(res => {
        this.hearingData = res.hearingDetail;
        this.dataSource = new MatTableDataSource<any>(this.hearingData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.isLoading = false;
      }, (err: any) => { this.isLoading = false; },
        () => { this.isLoading = false; });

    }
    else if (value == '11')//Penalty
    {
      this.paymentDetails = false;
      this.displayedColumns = ['select', 'citationNumber', 'fine', 'penalty1', 'penalty2', 'penalty3', 'penalty4', 'penalty5', 'totalPaid', 'reduced', 'totalDue'];

      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'PENALTY'}`).subscribe((res => {
        this.penaltyData = res.penaltyDetail;
        this.dataSource = new MatTableDataSource<any>(this.penaltyData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.isLoading = false;
      }));
    }
    else if (value == '10') {
      this.paymentDetails = false;
      this.isSystemView = true;
      this.displayedColumns = ['select', 'citationNumber', 'next/Action', 'event/event2', 'error', 'sPCIND', 'seizeBoot', 'iPPDefault', 'backlogSample'];

      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'SYSTEM_VIEW'}`).subscribe((res => {
        this.systemView = res.systemView;
        console.log("System Views:", this.systemView)
        this.dataSource = new MatTableDataSource<any>(this.systemView);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.isLoading = false;
      }));
    }
    else if (value == '16')//Payment
    {
      this.isLoading = false;
      this.paymentDetails = true;
      this.hearingRequestTable = false;
      this.displayedColumns = ['select', 'citationNumber', 'amountPaid', 'paymentType', 'account', 'processedOn', 'ippInd', 'overPaid', 'totalDue'];

      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'PAYMENT'}`).subscribe((res => {
        this.paymentData = res.paymentDetail;
        this.dataSource = new MatTableDataSource<PaymentData>(this.paymentData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }));
    }
    else if (value == '2')//Non-renewal
    {
      this.isLoading = false;
      // this.nonRenewalTable = true;
      this.displayedColumns = ['select', 'citationNumber', 'status', 'date', 'swapStatus', 'swapDate', 'responseDate'];

      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'NON_RENEWABLE'}`).subscribe((res => {
        this.nonRenewalData = res.nonRenewable;
        this.dataSource = new MatTableDataSource<NON_RENEWABLE>(this.nonRenewalData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }));
    }
    else if (value == '13') // Surcharge Tab
    {

      this.paymentDetails = false;
      this.hearingRequestTable = false;
      this.displayedColumns = ['select', 'citationNumber', 'suspEvent', 'surchargeStatus',
        'lastNoticeSusp', 'judgeStatus', 'judgeDocket', 'cancelledProcess', 'cancelledClerk'];
      // TO DO - Need to integrate API
      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'SURCHARGE'}`).subscribe(res => {
        this.isLoading = false;
        this.surchargeTabData = res.surChargeDetail;
        // this.surchargeTabData = [{
        //   "citationNumber": "F144616671", "suspendCode": 0, "suspendNameLong": null,
        //   "processDate": "2022-05-10", "status": "SUSPENDED", "lastNoticeDate": "2022-05-11",
        //   "proposedJudgment": "", "judgeStatus": "", "judgeDate": "", "judgeDocket": "", "cancelledProcessDate": "",
        //   "dispositionDate": null, "cancelledClerk": ""
        // }]

        this.dataSource = new MatTableDataSource<SurchargeModel>(this.surchargeTabData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
    }
    else if (value == '12') // Enforcement Tab
    {
      this.paymentDetails = false;
      this.hearingRequestTable = false;
      this.displayedColumns = ['select', 'citationNumber', 'civilNum', 'warrantReason'];
      // TO DO - Need to integrate API
      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'ENFORCEMENT'}`).subscribe(res => {
        this.isLoading = false;
        this.enforcementTabData = res.enforcement;

        // this.enforcementTabData = [
        //   {
        //     "citationNumber": "T987678",
        //     "civilNumber": "2",
        //     "lienReleased": "233455",
        //     "warrantReason": "None Response"

        //   },
        //   {
        //     "citationNumber": "T987678",
        //     "civilNumber": "2",
        //     "lienReleased": "233455",
        //     "warrantReason": "None Response"
        //   },
        //   {
        //     "citationNumber": "T987678",
        //     "civilNumber": "2",
        //     "lienReleased": "233455",
        //     "warrantReason": "None Response"
        //   }
        // ]

        this.dataSource = new MatTableDataSource<EnforcementModel>(this.enforcementTabData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
    }
    else if (value == '15')//Collection
    {
      this.isLoading = false;
      this.isCollection = true;
      this.paymentDetails = false;
      this.displayedColumns = ['select', 'citationNumber', 'fines', 'nixieStatus', 'amountDue', 'costOfCollection', 'assingedAgency', 'category', 'lastActivityDate', 'lastMailDate'];
      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'COLLECTION'}`).subscribe((res => {
        this.collectionData = _.get(res, 'collectionDetail');
        this.dataSource = new MatTableDataSource<any>(this.collectionData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }))
    }
    else if (value == '17')//NOTICE
    {
      this.isLoading = false;
      this.paymentDetails = false;
      this.displayedColumns = ['select', 'citationNumber', 'mailSentDate1', 'mailSentDate2', 'mailSentDate3', 'mailSentDate4', 'mailSentDate5'];
      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'NOTICE'}`).subscribe((res => {
        this.noticeData = _.get(res, 'noticeDetail');
        this.dataSource = new MatTableDataSource<any>(this.noticeData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }))
    }
    else if (value == '4')//Moving 1
    {
      this.isLoading = false;
      this.displayedColumns = ['select', 'ticket', 'issueDate', 'speedZone', 'overweight', 'bookedInd', 'hazard', 'filed', 'microfilmNumber'];
      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'MOVING1'}`).subscribe(((res: any) => {
        this.moving1Data = _.get(res, 'moving1Resposne')
        this.dataSource = new MatTableDataSource<Moving1>(this.moving1Data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }));
    }
    else if (value == '5')//Moving 2
    {
      this.isLoading = false;
      this.displayedColumns = ['select', 'ticket', 'description', 'plate', 'assignDate', 'sex', 'height', 'eyes', 'dateOfBirth'];
      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'MOVING2'}`).subscribe(((res: any) => {
        this.moving2Data = _.get(res, 'moving2Resposne')
        this.dataSource = new MatTableDataSource<Moving2>(this.moving2Data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }));
    }

    else if (value == '6')//Other Voilation
    {
      this.isLoading = false;
      this.displayedColumns = ['select', 'OthercitationNumber', 'OtherissueDate', 'fineAmount', 'violationCode1', 'violationCode2', 'violationCode3'];
      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'OTHER_VIOLATIONS'}`).subscribe(((res: any) => {
        this.otherVoilationData_array = [];
        for (var i = 0; i < res.otherViolations.length; i++) {
          const obj = {
            otherViolations: {
              OthercitationNumber: res.otherViolations[i].citationNumber,
              OtherissueDate: res.otherViolations[i].issueDate,
              fineAmount: res.otherViolations[i].fineAmount,
              violationCode1: res.otherViolations[i].violationCode1,
              description1: res.otherViolations[i].description1,
              violationCode2: res.otherViolations[i].violationCode2,
              description2: res.otherViolations[i].description2,
              description3: res.otherViolations[i].description3,
              violationCode4: res.otherViolations[i].violationCode4,
              description4: res.otherViolations[i].description4,
              violationCode3: res.otherViolations[i].violationCode3,
            }
          }
          this.otherVoilationData_array.push(obj.otherViolations)
        }
        this.otherVoilationData = this.otherVoilationData_array;
        this.dataSource = new MatTableDataSource<OtherVoilation>(this.otherVoilationData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }));
    }
    else if (value == '7')//Admin Review
    {
      this.isLoading = false;
      this.displayedColumns = ['select', 'AdmincitationNumber', 'Adminviolationt', 'lastContestDate', 'aadminsuspendClass', 'adminsuspendCode', 'suspendStart'];
      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'ADMIN_REVIEW'}`).subscribe(((res: any) => {
        this.adminReviewData_array = [];
        for (var i = 0; i < res.adminReview.length; i++) {
          const obj = {
            adminReview: {
              AdmincitationNumber: res.adminReview[i].citationNumber,
              AdminissueDate: res.adminReview[i].issueDateTime,
              Adminviolationt: res.adminReview[i].violCodeAltExt,
              lastContestDate: res.adminReview[i].lastContestDate,
              disposition: res.adminReview[i].dispositionCodeID,
              aadminsuspendClass: res.adminReview[i].suspendClass,
              untimelyReview: res.adminReview[i].untimelyReview,
              adminsuspendCode: res.adminReview[i].suspendCode,
              suspendStart: res.adminReview[i].suspendDateTime,
              suspendUntil: res.adminReview[i].suspendTillDate,
              badgeNumber: res.adminReview[i].badgeNumber

            }
          }
          this.adminReviewData_array.push(obj.adminReview)
        }
        this.adminReviewData = this.adminReviewData_array;
        this.dataSource = new MatTableDataSource<AdminReview>(this.adminReviewData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }));
    }


    else if (value == '20')//Revenue Disribution
    {
      this.isRevenueDistribution = true;
      this.isLoading = false;
      this.displayedColumns = ['select', 'citationNumber', 'amountPaid', 'collectionFees', 'courtFees', 'justiceFees', 'specialFees', 'handicapFees', 'countryAndStateShare', 'cityShare'];
      this.paymentDetails = false;
      this.gpService.get(`getEntityView?plateNumber=${this.plateNoDlNo}&tabName=${'REVENUE_DISTRIBUTION'}`).subscribe(((res: any) => {
        this.revenueDistributionData = _.get(res, 'revenueDistributionDetail');
        this.dataSource = new MatTableDataSource<any>(this.revenueDistributionData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }))
    }
    else {
      //For Summary
      this.displayedColumns = ['select', 'citationNo', 'violationDate', 'issuedDate', 'status',
        'locationDescription', 'fines', 'penalties', 'reduction', 'interest', 'payments', 'amountDue', 'events'
      ];
      this.citationsSummary = [];
      this.findByPlateNumber(this.plateNoDlNo);
    }
  }
  redirectShouldHappen() {
    if (this.citationsIDArray.length > 0) {
      const url = `gp/search/entity-details/entity/${this.plateNoDlNo}/address-update/${this.citationsIDArray[0].citationNo}`;
      this.dataService.sharedArray = { ticketList: this.citationsIDArray, plateNoDlNo: this.plateNoDlNo }
      this.router.navigate([url]);
    } else {
      this.notificationService.error(this.translate.instant("selectCitationMsg", { msg: '' }));
    }
    // this.messageService.sendMessage();
  }
  onClickCalender() {
    this.courtScheduledList = this.selection.selected.filter(s => s.courtScheduleId && s.courtScheduleId > 0);
    if (this.courtScheduledList?.length > 0) {
      this.notificationService.info(this.translate.instant(`This slot is already booked.`));
      return;
    }
    if (this.selection?.selected?.length) {
      const citationNos = this.selection.selected.filter(s => !s.courtScheduleId).map(d => d.citationNo);
      if (citationNos?.length > 0) {
        const citations = citationNos.join(',');
        this.router.navigate([`court/schedule-hearing/${this.plateNoDlNo}/${citations}`]);
      }
    }
  }

  deleteSelectedCoutSchedule(citationNumber: string) {
    const index = this.courtScheduledList.findIndex(s => s.citationNo == citationNumber);
    this.courtScheduledList.splice(index,1);
  }

  isScheduleAllow(citationNumber: string): boolean {
    const isShow = this.courtScheduledList.some(s => s.citationNo == citationNumber);
    return isShow;
  }
}
