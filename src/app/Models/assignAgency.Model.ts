import { get } from "lodash";

export class AssignAgencyModel {
    assignAgencyId: number;
    contractId: number;
    createUserId: number;
    updateUserId: number;
    createDateTime: string;
    updatedDateTime: string;
    assignAgencyNo: number;
    assignAgencyCode: string;
    assignAgencyName: string;
    isDeleted: string
    constructor(data:unknown) {
        this.assignAgencyId = get(data, "assignAgencyId");
        this.contractId = get(data, "contractId");
        this.createUserId = get(data, "createUserId");
        this.updateUserId = get(data, "updateUserId");
        this.createDateTime  = get(data, "createDateTime");
        this.updatedDateTime  = get(data, "updatedDateTime");
        this.assignAgencyNo = get(data, "assignAgencyNo");
        this.assignAgencyCode = get(data, "assignAgencyCode");
        this.assignAgencyName  = get(data, "assignAgencyName");
        this.isDeleted  = get(data, "isDeleted");
    }
}
export class Add_UpdateAssignAgency {
    assignAgencyNo: number;
    assignAgencyCode: string;
    assignAgencyName: string;
    constructor(data: unknown) {
        this.assignAgencyNo = get(data, "assignAgencyNo");
        this.assignAgencyCode = get(data, "assignAgencyCode");
        this.assignAgencyName  = get(data, "assignAgencyName");

    }
}