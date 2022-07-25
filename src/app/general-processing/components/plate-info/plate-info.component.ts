import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EntityDetails } from '../../models/plate.model';
import * as pdfMake from "pdfmake/build/pdfmake";
// import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
import { ActivatedRoute, Router } from '@angular/router';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NotesViewComponent } from '../../components/entity/notes-view/notes-view.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-plate-info',
  templateUrl: './plate-info.component.html',
  styleUrls: ['./plate-info.component.scss'],
  providers: [DatePipe]
})

export class PlateInfoComponent implements OnInit {
  @Output() downloadPdf = new EventEmitter<any>();
  @Output() PlateHistory = new EventEmitter<any>();

  accountEntityId: any;
  dataSource: any;
  public shouldShow = true;
  status: boolean = false;
  statusArr: any = [];
  matDialog: any;
  clickEvent() {
    this.status = !this.status;
  }
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  @Input() entityDetails!: EntityDetails;
  private langValue = new BehaviorSubject<string>('');
  sendLang = this.langValue.asObservable();

  constructor(private language: LanguageService, public router: Router, private route: ActivatedRoute,
    public translate: TranslateService, public dialogRef: MatDialogRef<NotesViewComponent>, public dialog: MatDialog) {
    this.translate.addLangs(["en", "ar", "sp", "fr"]);
    translate.setDefaultLang('en');
    translate.use('en');

  }

  ngOnInit(): void {
    this.language.sendLang.subscribe(lang => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
  }

  public downloadAsPDF() {
    this.downloadPdf.emit(true);
    // const pdfTable = this.pdfTable?.nativeElement;
    // var html = htmlToPdfmake(pdfTable.innerHTML);
    // const documentDefinition = { content: html };
    // pdfMake.createPdf(documentDefinition).download(); 

  }

  goToPlateHistory() {
    this.PlateHistory.emit(true);
    // this.router.navigateByUrl('gp/palte-history');
  }

  appendLang(lang: string) {
    this.translate.use(lang);
  }
  translateLang(lang: string) {
    this.translate.use(lang);
    this.language.langSelection(lang);
    this.langValue.next(lang);
  }

  goToAddTicketPage() {
    if (this.entityDetails != undefined) {
      this.router.navigateByUrl(`gp/search/entity-details/entity/${this.entityDetails.plateDetails.plateNumber}/add-ticket`);
    }
  }



  goToPlateDetails() {
    if (this.entityDetails != undefined) {
      this.router.navigate([`/gp/search/entity-details/entity/${this.entityDetails.plateDetails.plateNumber}/plate-details`]);
    }
  }

  goToAddNotes() {
    this.route.params.subscribe(params => {
      const eventIdNo = params['eventId'];
      const plateNumber = params['plateNumber'];
      if (eventIdNo) {
        this.router.navigateByUrl(`gp/search/event-details/${eventIdNo}/add-notes/${this.entityDetails?.plateDetails?.plateNumber}/${this.entityDetails?.plateDetails?.accountEntityId}`);
      } else {
        this.router.navigateByUrl(`gp/search/entity-details/entity/${plateNumber}/add-notes/${this.entityDetails?.plateDetails?.accountEntityId}`);
      }
    });
  }

  openNotesViewDialog(accountEntityId: any) {
    console.log(accountEntityId)
    const dialogRef = this.dialog.open(NotesViewComponent, {
      maxWidth: '100%',
      data: accountEntityId,
      panelClass: 'notes-view-dailog-container',
      disableClose: true,
      "autoFocus": false
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }
}