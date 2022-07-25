import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityDetailsComponent } from './components/entity/entity-details/entity-details.component';
import { EventDetailsComponent } from './components/event/event-details/event-details.component';
import { GeneralProcessingComponent } from './components/general-processing/general-processing.component';
import { TicketDetailsComponent } from './components/entity/ticket_details/ticket-details.component';
import { AddTicketComponent } from './components/entity/add_ticket/add-ticket/add-ticket.component';
import { GpAnalyticsComponent } from './components/gp-analytics/gp-analytics.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { AddressUpdateComponent } from './common-components/address-update/address-update.component';
import { TicketHistoryComponent } from './components/ticket-history/ticket-history.component';
import { AddNotesComponent } from './components/event/add-notes/add-notes.component';
import { PaymentCartComponent } from './components/payment-cart/payment-cart.component';
import { PlateHistoryComponent } from './components/plate-history/plate-history.component';
import { CitationComponent } from './components/entity/citation/citation.component';
import { PlateDetailsComponent } from './components/plate-details/plate-details.component';
import { PaymentCartConfirmationComponent } from './components/payment-cart-confirmation/payment-cart-confirmation.component';
import { EntityRouteComponent } from './components/entity-route/entity-route.component';
import { EventRouteComponent } from './components/event-route/event-route.component';

const routes: Routes = [
  { path: '', redirectTo: 'search' },
  {
    path: 'search', component: GeneralProcessingComponent,
    data: { breadcrumb: 'Search Results' },
    children: [
      { path: '', redirectTo: 'results' },
      { path: 'analytics', component: GpAnalyticsComponent, data: { breadcrumb: 'Analytics' }, },
      { path: 'results', component: SearchResultsComponent, data: { breadcrumb: '' }, },
      { path: ':sequenceId/:isAdvance/results', component: SearchResultsComponent, data: { breadcrumb: '' }, },
      {
        path: 'entity-details/:entityPageType/:plateNumber', component: EntityRouteComponent, data: { breadcrumb: 'Entity Details' },
        children: [
          { path: '', redirectTo: 'info' },
          {
            path: 'info', component: EntityDetailsComponent, data: { breadcrumb: '' },
            children: [
              { path: 'plate-details', component: PlateDetailsComponent, data: { breadcrumb: 'Plate Details', hideSearch: true, hideEntity: true } } // kritika
            ]
          },
          { path: 'address-update/:citationNumber', component: AddressUpdateComponent, data: { breadcrumb: 'Address Update', hideSearch: true }, }, // pratik fixed
          { path: 'add-ticket', component: AddTicketComponent, data: { breadcrumb: 'Add Ticket', hideSearch: true }, }, // shivangi fixed
          { path: 'add-ticket/:citationNumber', component: AddTicketComponent, data: { breadcrumb: 'Add Ticket', hideSearch: true }, }, // shivangi fixed
          { path: 'add-notes/:accountEntityId', component: AddNotesComponent, data: { breadcrumb: 'Add Notes', hideSearch: true }, }, // rupal, prabhu
          { path: 'add-notes/:citationNumbers/:citationIds', component: AddNotesComponent, data: { breadcrumb: 'Add Notes', hideSearch: true }, }, // rupal, prabhu
          { path: 'payment-cart', component: PaymentCartComponent, data: { breadcrumb: 'Payment Cart', hideSearch: true }, }, // shyam
          { path: 'payment-cart-confirmation', component: PaymentCartConfirmationComponent, data: { breadcrumb: 'Payment Cart Confirmation', hideSearch: true }, },
          {
            path: 'citation/:citationNumber', component: CitationComponent, data: { breadcrumb: '', hideSearch: true }, children: [
              { path: 'ticket-history', component: TicketHistoryComponent, data: { breadcrumb: 'Ticket History', hideSearch: true } },
              { path: 'ticket-details', component: TicketDetailsComponent, data: { breadcrumb: 'Ticket Details', hideSearch: true } }
            ]
          } // srinu fixed
        ]
      },
      { path: 'payment-cart', component: PaymentCartComponent, data: { breadcrumb: 'Payment Cart', hideSearch: true }, }, // shyam
      { path: 'payment-cart-confirmation', component: PaymentCartConfirmationComponent, data: { breadcrumb: 'Payment Cart Confirmation', hideSearch: true }, },
      {
        path: 'event-details/:eventId', component: EventRouteComponent, data: { breadcrumb: '' },
        children: [
          { path: '', redirectTo: 'info' },
          { path: 'info', component: EventDetailsComponent, data: { breadcrumb: 'Event Details' }, },
          { path: 'add-notes/:plateId/:accountEntityId', component: AddNotesComponent }, // rupal, prabhu
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralProcessingRoutingModule { }
