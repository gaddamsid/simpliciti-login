import { get } from "lodash";

export class AddTicketModel {
    // agency: string;
    agency1: string;
    agency2: string;
    agency3: string;
    agency4: string;
    agency5: string;
    amountDue1!: number;
    amountDue2!: number;
    amountDue3!: number;
    amountDue4!: number;
    amountDue5!: number;
    // badge: string;
    badge1: string;
    badge2: string;
    badge3: string;
    badge4: string;
    badge5: string;
    citationNo1: string;
    citationNo2: string;
    citationNo3: string;
    citationNo4: string;
    citationNo5: string;
    entityNo: number
    notes: string;
    plateNo: string;
    constructor(data: unknown) {
        // this.agency = get(data, 'agency');
        this.agency1 = get(data, 'agency1') || "";
        this.agency2 = get(data, 'agency2') || "";
        this.agency3 = get(data, 'agency3') || "";
        this.agency4 = get(data, 'agency4') || "";
        this.agency5 = get(data, 'agency5') || "";
        this.amountDue1! = get(data, 'amountDue1');
        this.amountDue2! = get(data, 'amountDue2');
        this.amountDue3! = get(data, 'amountDue3');
        this.amountDue4! = get(data, 'amountDue4');
        this.amountDue5! = get(data, 'amountDue5');
        // this.badge = get(data, 'badge');
        this.badge1 = get(data, 'badge1') || "";
        this.badge2 = get(data, 'badge2') || "";
        this.badge3 = get(data, 'badge3') || "";
        this.badge4 = get(data, 'badge4') || "";
        this.badge5 = get(data, 'badge5') || "";
        this.citationNo1 = get(data, 'citationNo1') || "";
        this.citationNo2 = get(data, 'citationNo2') || "";
        this.citationNo3 = get(data, 'citationNo3') || "";
        this.citationNo4 = get(data, 'citationNo4') || "";
        this.citationNo5 = get(data, 'citationNo5') || "";
        this.entityNo = get(data, 'entityNo');  
        this.notes = get(data, 'notes');
        this.plateNo = get(data, 'plateNo');
    }
}