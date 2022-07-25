import { get } from "lodash";

export class fileTransferModel {
    fileTransfersID: number;
    fileTransferProtocolsID: number;
    name: string;
    fileTransferProtocol: string;
    ip:string;
    port: string;
    userName: string;
    active: number;
    
    constructor(data: unknown) {
        this.fileTransfersID = get(data, "fileTransfersID");
        this.fileTransferProtocolsID = get(data, "fileTransferProtocolsID");
        this.name = get(data, "name");
        this.fileTransferProtocol = get(data, "fileTransferProtocol");
        this.ip = get(data, "ip");
        this.port = get(data, "port");
        this.userName = get(data, "userName");        
        this.active = get(data, "active");
    }
}
export interface CustomerInteraction {
    customerInteractionId: number,
    contractId: number,
    createUserId: number,
    updateUserId: number,
    createDatetime: string,
    updatedDatetime: string,
    customerInteractionCode: string,
    customerInteractionText: string

}


export class AddBadgeModel {
    badgenumberId: number;
    contractID: number;
    createUserID: number;
    updateUserID: number;
    badgeNumber: string;
    badgeAgency: number;
    badgeDivision: number;
    badgeOfficerName: string;
    active: number;
    constructor(data: unknown) {
        this.badgenumberId = 0;
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

// export class UpdateBadgeModel {
//     badgenumberId: number;
//     contractID: number;
//     createUserID: number;
//     updateUserID: number;
//     badgeNumber: string;
//     badgeAgency: number;
//     badgeDivision: number;
//     badgeOfficerName: string;
//     active: number;
//     constructor(data: unknown, previousData:BadgeNumberModel) {
//         this.badgenumberId = get(previousData, "badgenumberId");
//         this.contractID = 0;
//         this.createUserID = 0;
//         this.updateUserID = 0;
//         this.badgeNumber = get(data, "badgeNumber");
//         this.badgeAgency = get(data, "badgeAgency");
//         this.badgeDivision = get(data, "badgeDivision");
//         this.badgeOfficerName = get(data, "badgeOfficerName");
//         this.active = 0;
//     }
// }