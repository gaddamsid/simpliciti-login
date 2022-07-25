import { get } from "lodash";

export class TicketHistoryModel {
    citationNumber: string;
    citationDate: string;
    details: string;
    imageUrl: any;
    processDate: string;
    transactionType: string;
    userName: string;
    constructor(data: unknown) {
        this.citationNumber = get(data, "citationNumber");
        this.citationDate = get(data, "citationDate");
        this.details = get(data, "details");
        this.imageUrl = get(data, "imageUrl");
        this.processDate = get(data, "processDate");
        this.transactionType = get(data, "transactionType");
        this.userName = get(data, "userName");
    }
}