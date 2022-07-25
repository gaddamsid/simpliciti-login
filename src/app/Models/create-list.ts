import { get } from "lodash";

export interface CreateList {

    id: number,
    contractID: number,
    dciEncrypted: string,
    dciDownload: string,
    dciConvertFiles: string,
    eventTypeString: string,
    rear2FolderName: string,
    hasFrontImage: boolean,
    rearFolderName: string,
    frontFolderName: string,
    videoConverterPath: string,
    videoConversionArguments: string,
    thumbnailScaleFraction:number,
    rear1: boolean,
    rear2: boolean,
    front1: boolean,
    front2: boolean,
    video: boolean,
    extractedVideoImage: boolean,
    relativeDayBegin: number,
    relativeDayEnd: number,
    hasDualCamera: boolean,
    daystoWaitToLoadEventsForLog: number,
    requiredLPRPlate: boolean,
    rear3: boolean,
    rear4: boolean,
    useExitSpeed: boolean,
    active: boolean,
    createUserID: number,
    updateUserID: number,
    createDatetime: string,
    updateDatetime: string,
    isDeleted: string
}
export class mediaFileConfigurationModel {
    id: number;
    contractID: number;
    dciEncrypted: string;
    dciDownload: string;
    dciConvertFiles: string;
    eventTypeString: string;
    rear2FolderName: string;
    hasFrontImage: boolean;
    rearFolderName: string;
    frontFolderName: string;
    videoConverterPath: string;
    videoConversionArguments: string;
    thumbnailScaleFraction:number;
    rear1: boolean;
    rear2: boolean;
    front1: boolean;
    front2: boolean;
    video: boolean;
    extractedVideoImage: boolean;
    relativeDayBegin: number;
    relativeDayEnd: number;
    hasDualCamera: boolean;
    daystoWaitToLoadEventsForLog: number;
    requiredLPRPlate: boolean;
    rear3: boolean;
    rear4: boolean;
    useExitSpeed: boolean;
    active: boolean;
    createUserID: number;
    updateUserID: number;
    createDatetime: string;
    updateDatetime: string;
    isDeleted: string
    constructor(data: unknown) {
        this.id = 0;
        this.contractID = 0;
        this.dciEncrypted = get(data, "dciEncrypted");
        this.dciDownload =  get(data, "dciDownload");
        this.dciConvertFiles = get(data, "dciConvertFiles");
        this.eventTypeString = get(data, "eventTypeString");
        this.rear2FolderName =  get(data, "rear2FolderName");
        this.hasFrontImage =  get(data, "hasFrontImage");
        this.rearFolderName = get(data, "rearFolderName");
        this.frontFolderName = get(data, "frontFolderName");
        this.videoConverterPath =  get(data, "videoConverterPath");
        this.videoConversionArguments = get(data, "videoConversionArguments");
        this.thumbnailScaleFraction = Number(get(data, "thumbnailScaleFraction"));
        this.rear1 =  get(data, "rear1")? get(data, "rear1"): false;
        this.rear2 =  get(data, "rear2")? get(data,'rear2'): false;
        this.front1 =  get(data, "front1")? get(data,'front1'): false;
        this.front2 =  get(data, "front2")? get(data,'front2'): false;
        this.video =  get(data, "video")? get(data,'video'): false;
        this.extractedVideoImage =  get(data, "extractedVideoImage")? get(data, "extractedVideoImage"):false;
        this.relativeDayBegin =  get(data, "relativeDayBegin");
        this.relativeDayEnd =  get(data, "relativeDayEnd");
        this.hasDualCamera =  get(data, "hasDualCamera");
        this.daystoWaitToLoadEventsForLog =  get(data, "daystoWaitToLoadEventsForLog")? get(data, "daystoWaitToLoadEventsForLog"): 0;
        this.requiredLPRPlate =  get(data, "requiredLPRPlate")? get(data, "requiredLPRPlate"): false;
        this.rear3 =  get(data, "rear3")? get(data, "rear3"): false;
        this.rear4 =  get(data, "rear4")? get(data, "rear4"): false;
        this.useExitSpeed =  get(data, "useExitSpeed")? get(data, "useExitSpeed"):false;
        this.active =  true;
        this.createUserID =  0;
        this.updateUserID =  0;
        this.createDatetime =  "2022-05-09T07:33:58.321Z";
        this.updateDatetime =  "2022-05-09T07:33:58.321Z";
        this.isDeleted = "N";
    }
}
