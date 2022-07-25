import { get } from "lodash";

export interface CourtModel {
    courtsModel: {
        jurisdictions: string;
        createUserID: number,
        updateUserID: number,
        createDatetime: string,
        updateDatetime: string,
        isDeleted: string,
        courtsID: number,
        contractID: number,
        active: boolean,
        name: string,
        code: string,
        streetLine1: string,
        streetLine2: string,
        city: string,
        stateProvincesID: number,
        zipCode: string,
        jurisdictionsID: string,
        clerkName: string,
        disabilityAccommodationText: string,
        phone: string,
        leadDays: number,
        room: number,
        county: string
    }

}

export class CourtList {
    courtsID: number;
    name: string;
    code: string;
    room: string;
    jurisdictions: string;
    leadDays: number;
    streetLine1: string;
    streetLine2: string;
    active: boolean;
    constructor(data: unknown) {
        this.courtsID = get(data, "courtsID");
        this.name = get(data, "name");
        this.code = get(data, "code");
        this.room = get(data, "room");
        this.jurisdictions = get(data, "jurisdictions");
        this.leadDays = get(data, "leadDays");
        this.streetLine1 = get(data, "streetLine1");
        this.streetLine2 = get(data, "streetLine2");
        this.active = get(data, "active");
    }
}