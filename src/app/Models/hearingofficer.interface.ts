import { get } from "lodash";
export class hearingOfficerList {
    hearingOfficerID: number;
    hearingOfficerNumber: string;
    hearingCAD: string;
    hearingAgency: number | string;
    hearingDivision: string;
    hearingOfficerFullName: string;
    hearingOfficerShortName: string;
    agencyName: string;
    agencyCode: number;
    imagePath: string;
    active: true;
    isFileUploaded: string;

    constructor(data: unknown) {
        this.hearingOfficerID = get(data, 'hearingOfficerID');
        this.hearingOfficerNumber = get(data, 'hearingOfficerNumber');
        this.hearingCAD = get(data, 'hearingCAD');
        this.hearingAgency = get(data, 'hearingAgency');
        this.hearingDivision = get(data, 'hearingDivision');
        this.hearingOfficerFullName = get(data, 'hearingOfficerFullName');
        this.hearingOfficerShortName = get(data, 'hearingOfficerShortName');
        this.agencyName = get(data, 'agencyName');
        this.agencyCode = get(data, 'agencyCode');
        this.imagePath = get(data, 'imagePath');
        this.active = get(data, 'active');
        this.isFileUploaded = get(data, 'isFileUploaded');
    }
}

export class hearingOfficerModel {
    createUserID: number;
    updateUserID: number;
    createDatetime: string;
    updateDatetime: string
    isDeleted: string;
    hearingOfficerID: number;
    contractID: number;
    hearingOfficerNumber: string;
    hearingCAD: string;
    hearingAgencyID: number | string;
    hearingDivisionID: number;
    hearingOfficerFullName: string;
    hearingOfficerShortName: string;
    imagePath: string;
    jurisdictionsID: number;
    active: boolean;
    isFileUploaded: string;
    timeRangeScheduleStartTime: string;
    timeRangeScheduleEndTime: string;
    weekDays: [0];
    fileToUpload: string;
    fileName: string

    constructor(data: unknown) {
        this.createUserID = get(data, 'createUserID');
        this.updateUserID = get(data, 'updateUserID');
        this.createDatetime = get(data, 'createDatetime');
        this.updateDatetime = get(data, 'updateDatetime');
        this.isDeleted = get(data, 'isDeleted');
        this.hearingOfficerID = get(data, 'hearingOfficerID');
        this.contractID = get(data, 'contractID');
        this.hearingOfficerNumber = get(data, 'hearingOfficerNumber');
        this.hearingCAD = get(data, 'hearingCAD');
        this.hearingAgencyID = get(data, 'hearingAgencyID');
        this.hearingDivisionID = get(data, 'hearingDivisionID');
        this.hearingOfficerFullName = get(data, 'hearingOfficerFullName');
        this.hearingOfficerShortName = get(data, 'hearingOfficerShortName');
        this.imagePath = get(data, 'imagePath');
        this.jurisdictionsID = get(data, 'jurisdictionsID');
        this.active = get(data, 'active');
        this.timeRangeScheduleStartTime = get(data, 'timeRangeScheduleStartTime') ? get(data, 'timeRangeScheduleStartTime') : '00: 00: 00.000';
        this.timeRangeScheduleEndTime = get(data, 'timeRangeScheduleEndTime') ? get(data, 'timeRangeScheduleEndTime') : '00: 00: 00.000';
        this.isFileUploaded = get(data, 'isFileUploaded');
        this.isFileUploaded = get(data, 'isFileUploaded');
        this.weekDays = get(data, 'weekDays');
        this.fileToUpload = get(data, 'fileToUpload');
        this.fileName = get(data, 'fileName')

    }
}