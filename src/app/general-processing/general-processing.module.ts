import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { GeneralProcessingRoutingModule } from './general-processing-routing.module';
import { GeneralProcessingComponent } from './components/general-processing/general-processing.component';
import { PlateInfoComponent } from './components/plate-info/plate-info.component';
import { AngularmaterialModule } from '../angular-material/angular-material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { I18nModule } from '../i18n/i18n.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { NgSelectModule } from '@ng-select/ng-select';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { GpSearchComponent } from './components/gp-search/gp-search.component';
import { EntityComponent } from './components/entity/entity.component';
import { EventComponent } from './components/event/event.component';
import { GpAnalyticsComponent } from './components/gp-analytics/gp-analytics.component';
import { MatTableModule } from '@angular/material/table';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { EventTicketInfoComponent } from './components/event-ticket-info/event-ticket-info.component';
import { EventDetailsComponent } from './components/event/event-details/event-details.component';
import { EntityDetailsComponent } from './components/entity/entity-details/entity-details.component';
import { GpGalleryComponent } from './common-components/gp-gallery/gp-gallery.component';
import { ViolationDetailsComponent } from './common-components/violation-details/violation-details.component';
import { PaymentsComponent } from './common-components/payments/payments.component';
import { CitationDetailsComponent } from './common-components/citation-details/citation-details.component';
import { ProcessingComponent } from './common-components/processing/processing.component';
import { AddressComponent } from './common-components/address/address.component';
import { GalleryCustomizeComponent } from './components/gallery-customize/gallery-customize.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxPrintModule } from 'ngx-print';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// Import the library module
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AngularResizeEventModule } from 'angular-resize-event';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TicketDetailsComponent } from './components/entity/ticket_details/ticket-details.component';
import { AddressUpdateComponent } from './common-components/address-update/address-update.component';
import { SharedModule } from '../shared/shared.module';
import { NotesViewComponent } from './components/entity/notes-view/notes-view.component';
import { AddTicketComponent } from './components/entity/add_ticket/add-ticket/add-ticket.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { TicketHistoryComponent } from './components/ticket-history/ticket-history.component';
import { AddNotesComponent } from './components/event/add-notes/add-notes.component';
import { PaymentCartComponent } from './components/payment-cart/payment-cart.component';
import { PlateHistoryComponent } from './components/plate-history/plate-history.component';
import { CitationComponent } from './components/entity/citation/citation.component';
import { PlateDetailsComponent } from './components/plate-details/plate-details.component';
import { PaymentCartConfirmationComponent } from './components/payment-cart-confirmation/payment-cart-confirmation.component';
import { CommaSeparatorPipe } from './Pipes/comma-separator.pipe';
import { EntityRouteComponent } from './components/entity-route/entity-route.component';
import { EventRouteComponent } from './components/event-route/event-route.component';

@NgModule({
  declarations: [
    GeneralProcessingComponent,
    PlateInfoComponent,
    GpSearchComponent,
    EntityComponent,
    EventComponent,
    GpAnalyticsComponent,
    EventTicketInfoComponent,
    EventDetailsComponent,
    EntityDetailsComponent,
    TicketDetailsComponent,
    GpGalleryComponent,
    ViolationDetailsComponent,
    PaymentsComponent,
    CitationDetailsComponent,
    ProcessingComponent,
    AddressComponent,
    GalleryCustomizeComponent,
    AddressUpdateComponent,
    NotesViewComponent,
    AddTicketComponent,
    SearchResultsComponent,
    TicketHistoryComponent,
    AddNotesComponent,
    PaymentCartComponent,
    PlateHistoryComponent,
    CitationComponent,
    PlateDetailsComponent,
    PaymentCartConfirmationComponent,
    CommaSeparatorPipe,
    EntityRouteComponent,
    EventRouteComponent
  ],
  imports: [
    CommonModule,
    GeneralProcessingRoutingModule,
    AngularmaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    I18nModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    DragDropModule,
    DigitOnlyModule,
    NgSelectModule,
    PdfViewerModule,
    MatTableModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    AngularResizeEventModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000, // 15 seconds
      progressBar: true,
    }),
    MatDialogModule,
    NgxGalleryModule,
    MatTableExporterModule,
    NgxPrintModule,
    MatProgressSpinnerModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [ 
    {
      provide: MatDialogRef,
      useValue: {}
    }
 ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeneralProcessingModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}