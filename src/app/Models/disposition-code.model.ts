import { get } from "lodash";

export class DispositionCodeModel {

    dispositionId: number;
    contractId: number;
    dispCodeNew: number;
    dispCode: number;
    dispPriority: number;
    dispName: string
    dispRule: string;
    dispDescription: string;
    dispNotInUse: string;
    dispNameLong: string;
    dispClass: string;
    extraLongName: string;
    extraRules: string;
    extraDate1: string;
    extraDate2: string;
    createUserId: string;
    updateUserId: number;
    createDateTime: string
    updateDateTime: string;
    active: string;

    constructor(data: unknown) {
        this.dispositionId = get(data, "dispositionId");
        this.contractId = get(data, "contractId");
        this.dispCodeNew = get(data, "dispCodeNew");
        this.dispCode = get(data, "dispCode");
        this.dispPriority = get(data, "dispPriority");
        this.dispName = get(data, "dispName");
        this.dispRule = get(data, "dispRule");
        this.dispDescription = get(data, "dispDescription");
        this.dispNotInUse = get(data, "dispNotInUse");
        this.dispNameLong = get(data, "dispNameLong");
        this.dispClass = get(data, "dispClass");
        this.extraLongName = get(data, "extraLongName");
        this.extraRules = get(data, "extraRules");
        this.extraDate1 = get(data, "extraDate1");
        this.extraDate2 = get(data, "extraDate2");
        this.createUserId = get(data, "createUserId");
        this.updateUserId = get(data, "updateUserId");
        this.createDateTime = get(data, "createDateTime");
        this.updateDateTime = get(data, "updateDateTime");
        this.active = get(data, "active");
    }
}

export class DispRuleMasterModel {
    dispositionRulesMasterId: number;
    dispRule: string;
    dispDescription: string;
    
    constructor(data: unknown) {
        this.dispositionRulesMasterId = get(data, "dispositionRulesMasterId");
        this.dispRule = get(data, "dispRule");
        this.dispDescription = get(data, "dispDescription");
    }
}