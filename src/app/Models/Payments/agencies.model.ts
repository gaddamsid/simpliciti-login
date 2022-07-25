import { get } from "lodash";

export class PaymentAgenciesModel {
    paymentAgenciesID: number;
    agenciesName: string;
    paymentVendorsName: string;
    paymentVendorsLink: string;
    active: boolean;

    constructor(data: unknown){
        this.paymentAgenciesID = get(data, "paymentAgenciesID");
        this.agenciesName = get(data, "agenciesName");
        this.paymentVendorsName = get(data, "paymentVendorsName");
        this.paymentVendorsLink = get(data, "paymentVendorsLink");
        this.active = get(data, "active");
    }
}