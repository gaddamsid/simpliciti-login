import { get } from "lodash";

export class SuspendCodeModel {
    suspendCodeTypeId: number;
    contractId: number;
    createUserId: number;
    updateUserId: number;
    createDatetime: string;
    updateDatetime: string;
    suspendCodeNew: number;
    suspendCod: number;
    suspendCodePriority: number;
    suspendName: string;
    suspendType: string;
    suspendNumDays: number;
    active: string;
    suspendNameLong: string;
    suspendClass: string;
    extraLongName: string;
    extraRules: string;
    isDeleted: string;
    calendarDays:string;
    constructor(data: unknown) {
        this.suspendCodeTypeId = get(data, "suspendCodeTypeId");
        this.contractId = get(data, "contractId");
        this.createUserId = get(data, "createUserId");
        this.updateUserId = get(data, "updateUserId");
        this.createDatetime = get(data, "createDatetime");
        this.updateDatetime = get(data, "updateDatetime");
        this.suspendCodeNew = get(data, "suspendCodeNew");
        this.suspendCod = get(data, "suspendCod");
        this.suspendCodePriority = get(data, "suspendCodePriority");
        this.suspendName = get(data, "suspendName");
        this.suspendType = get(data, "suspendType");
        this.suspendNumDays = get(data, "suspendNumDays");
        this.active = get(data, "active");
        this.suspendNameLong = get(data, "suspendNameLong");
        this.suspendClass = get(data, "suspendClass");
        this.extraLongName = get(data, "extraLongName");
        this.extraRules = get(data, "extraRules");
        this.isDeleted = get(data, "isDeleted");
        this.calendarDays = get(data, 'calendarDays');
    }
}

export class AddSuspendCode {
    active: string;
    suspendCodeNew: number;
    suspendCod: number;
    suspendCodePriority: number;
    suspendName: string;
    suspendType: number;
    extraLongName: string;
    extraRules: string;
    suspendClass: string;
    suspendNameLong: string;
    suspendNumDays: number;
    calendarDays:string;
    constructor(data: unknown) {
        this.active = get(data, "active");
        this.suspendCodeNew = 0;
        this.suspendCod = get(data, "suspendCod");
        this.suspendCodePriority = get(data, "suspendCodePriority");
        this.suspendName = get(data, "suspendName");
        this.suspendType = get(data, "suspendType");
        this.extraLongName = '';
        this.extraRules = '';
        this.suspendClass = get(data, "suspendClass");
        this.suspendNameLong = get(data, "suspendNameLong");
        this.suspendNumDays = get(data, "suspendNumDays");
        this.calendarDays = get(data, 'calendarDays')?"Y":"N";
    }
}

export class UpdateSuspendCode {
    contractId: number;
    createUserId: number;
    updateUserId: number;
    suspendCodeNew: string;
    suspendCod: number;
    suspendCodePriority: number;
    suspendName: string;
    suspendType: number;
    calendarDays:string;
    constructor(data: unknown) {
        this.contractId = 0;
        this.createUserId = 0;
        this.updateUserId = 0;
        this.suspendCodeNew = get(data, "suspendCodeNew");
        this.suspendCod = get(data, "suspendCod");
        this.suspendCodePriority = get(data, "suspendCodePriority");
        this.suspendName = get(data, "suspendName");
        this.suspendType = 0;
        this.calendarDays = get(data, 'calendarDays')? "Y": "N";
    }
}