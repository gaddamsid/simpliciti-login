import { FeeDetail } from "./fee-detail.model";
import { TicketDetail } from "./ticket-detail.model";

export interface PlateDetail {
    feeDetails: FeeDetail[];
    ticketDetails: TicketDetail[];
    accountEntityId: string;
    statePlate: string;
}