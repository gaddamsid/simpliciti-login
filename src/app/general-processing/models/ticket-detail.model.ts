export interface TicketDetail {
    amountDue: number;
    citationId: string;
    citationNumber: string;
    date: string;
    fines: string;
    locationAndDescription: string;
    partialPayments: string;
    payThisAmount: string;
    penalties: string;
    shoppingCartItemsId: string;
    totalCharges: string;
    accountEntityId: string;
    statePlate?: string;
}