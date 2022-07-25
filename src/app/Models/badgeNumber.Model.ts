import { get } from "lodash";

export class BadgeNumberModel {
    badgenumberId: number;
    contractID: number;
    createUserID: number;
    updateUserID: number;
    createDatetime:string;
    updateDatetime: string;
    badgeNumber: string;
    badgeAgency: number;
    badgeDivision: number;
    badgeOfficerName: string;
    active: number;
    isUploaded:string;
    constructor(data: unknown) {
        this.badgenumberId = get(data, "badgeNumberId");
        this.contractID = get(data, "contractID");
        this.createUserID = get(data, "createUserID");
        this.updateUserID = get(data, "updateUserID");
        this.createDatetime = get(data, "createDatetime");
        this.updateDatetime = get(data, "updateDatetime");
        this.badgeNumber = get(data, "badgeNumber");
        this.badgeAgency = get(data, "badgeAgency");
        this.badgeDivision = get(data, "badgeDivision");
        this.badgeOfficerName = get(data, "badgeOfficerName");
        this.isUploaded=get(data,"isUploaded");
        this.active = get(data, "active");
        this.isUploaded = get(data,"isUploaded");
    }
}

export class AddBadgeModel {
    badgeNumberId: number;
    contractID: number;
    createUserID: number;
    updateUserID: number;
    badgeNumber: string;
    badgeAgency: number;
    badgeDivision: number;
    badgeOfficerName: string;
    active: number;
    constructor(data: unknown) {
        this.badgeNumberId = 0;
        this.contractID = 0;
        this.createUserID = 0;
        this.updateUserID = 0;
        this.badgeNumber = get(data, "badgeNumber");
        this.badgeAgency = get(data, "badgeAgency");
        this.badgeDivision = get(data, "badgeDivision");
        this.badgeOfficerName = get(data, "badgeOfficerName");
        this.active = 0;
    }
}

export class UpdateBadgeModel {
    badgeNumberId: number;
    contractID: number;
    createUserID: number;
    updateUserID: number;
    badgeNumber: string;
    badgeAgency: number;
    badgeDivision: number;
    badgeOfficerName: string;
    active: number;
    constructor(data: unknown, previousData:BadgeNumberModel) {
        this.badgeNumberId = get(previousData, "badgenumberId");
        this.contractID = 0;
        this.createUserID = 0;
        this.updateUserID = 0;
        this.badgeNumber = get(data, "badgeNumber");
        this.badgeAgency = get(data, "badgeAgency");
        this.badgeDivision = get(data, "badgeDivision");
        this.badgeOfficerName = get(data, "badgeOfficerName");
        this.active = 0;
    }
}