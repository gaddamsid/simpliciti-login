import * as _ from "lodash";
import { get } from "lodash";

export class QueuesList {
    active:boolean;
    queuesID:number;
    contractID: number;
    queuesName: string;
    queueTypesID: string;
    ageThreshold: number;
    countThreshold: number;
    statusEntranceThreshold: number;
    queueOrder: number;
    enabled: string;
    queueTypesName: string;
    workflowStatesID: number;
    constructor(data: unknown) {
        this.active = get(data, 'active');
        this.queuesID = get(data, 'queuesID');
        this.contractID = get(data, 'contractID');
        this.queuesName = get(data, 'queuesName');
        this.queueTypesID = get(data, 'queueTypesID');
        this.ageThreshold = get(data, 'ageThreshold')? get(data, 'ageThreshold'): 0;
        this.countThreshold = get(data, 'countThreshold')? get(data, 'countThreshold'): 0;
        this.statusEntranceThreshold = get(data, 'statusEntranceThreshold')? get(data, 'statusEntranceThreshold'): 0;
        this.queueOrder = get(data, 'queueOrder');
        this.queueTypesName = get(data, 'queueTypesName');
        this.enabled = get(data, 'active')? 'Yes': 'No';
        this.workflowStatesID = get(data,'workflowStatesID');

    }
}

export class queuesModel {
    createUserID: number;
    updateUserID: number;
    createDatetime: string;
    updateDatetime: string;
    isDeleted:string;
    queuesID: number;
    contractID: number;
    coreImageDeleteEnabled: boolean;
    coreImageEditEnabled: boolean;
    coreImageRevertEnabled: boolean;
    dmvHistoryEnabled: boolean;
    dmvReturnEnabled: boolean;
    drcEnabled: boolean;
    editVehicleInformationEnabled: boolean;
    doubleBlindEnabled: boolean;
    licensePlateEditEnabled: boolean;
    queuesName:string;
    registeredOwnerInformationEnabled: boolean;
    skipEnabled: boolean;
    vehicleInformationEnabled: boolean;
    videoFrameCaptureEnabled: boolean;
    workflowStatesID: number;
    queueTypesID: number;
    editRegisteredOwnerInformationEnabled: boolean;
    identifier:string;
    ageThreshold: number;
    countThreshold: number;
    active: boolean;
    previousDecisionEnabled: boolean;
    neighborListingEnabled: boolean;
    statusEntranceThreshold: number;
    isVrLookup: boolean;
    dmvRequestThreshold: number;
    plateExamplesEnabled: boolean;
    queueOrder: number;
    enableLocalOfflinePrint: boolean;
    miskeyedPlateEnabled: boolean;
    carryOverPreviousCategory: boolean;
    enableCourtForPostIssuanceQueue: boolean;
    imageSelectionEnabled: boolean;
    showSelectedImagesEnabled: boolean;
    iCertifyDescription:string;
    isICertifyEnabled: boolean;
    enableRollbackNoticesQueue: boolean;
    kvlEnabled: boolean;
    queueTypesName:string;
    constructor(data: unknown) {
        this.createUserID =  get(data, "createUserID")? get(data, "createUserID"): 0;
        this.updateUserID =  get(data, "updateUserID")? get(data, "updateUserID"): 0;
        this.createDatetime = new Date().toISOString();
        this.updateDatetime =  new Date().toISOString();
        this.isDeleted = "N";
        this.queuesID =  get(data, "queuesID")? get(data, "queuesID"): 0;
        this.contractID = get(data, "contractID")? get(data, "contractID"): 2;
        this.coreImageDeleteEnabled =  get(data, "coreImageDeleteEnabled")? get(data, "coreImageDeleteEnabled"): false;
        this.coreImageEditEnabled =  get(data, "coreImageEditEnabled")?  get(data, "coreImageEditEnabled"):false;
        this.coreImageRevertEnabled = get(data, "coreImageRevertEnabled")? get(data, "coreImageRevertEnabled"): false;
        this.dmvHistoryEnabled = get(data, "dmvHistoryEnabled")? get(data, "dmvHistoryEnabled"): false ;
        this.dmvReturnEnabled =  get(data, "dmvReturnEnabled")? get(data, "dmvReturnEnabled"): false;
        this.drcEnabled =  get(data, "drcEnabled")? get(data, "drcEnabled"): false;
        this.editVehicleInformationEnabled =  get(data, "editVehicleInformationEnabled")? get(data, "editVehicleInformationEnabled"): false;
        this.doubleBlindEnabled =  get(data, "doubleBlindEnabled")? get(data, "doubleBlindEnabled"): false ;
        this.licensePlateEditEnabled =  get(data, "licensePlateEditEnabled")? get(data, "licensePlateEditEnabled"): false ;
        this.queuesName = get(data, "queuesName");
        this.registeredOwnerInformationEnabled =  get(data, "registeredOwnerInformationEnabled")? get(data, "registeredOwnerInformationEnabled"): false;
        this.skipEnabled =  get(data, "skipEnabled")? get(data, "skipEnabled"): false;
        this.vehicleInformationEnabled =  get(data, "vehicleInformationEnabled")? get(data, "vehicleInformationEnabled"): false;
        this.videoFrameCaptureEnabled =  get(data, "videoFrameCaptureEnabled")? get(data, "videoFrameCaptureEnabled"): false;
        this.workflowStatesID =  get(data, "workflowStatesID")? get(data, "workflowStatesID"): 0;
        this.queueTypesID =  get(data, "queueTypesID")? get(data, "queueTypesID"): 1;
        this.editRegisteredOwnerInformationEnabled =  get(data, "editRegisteredOwnerInformationEnabled")?  get(data, "editRegisteredOwnerInformationEnabled"): false;
        this.identifier =  get(data, "identifier")? get(data, "identifier"): '';
        this.ageThreshold =  get(data, "ageThreshold")? get(data, "ageThreshold"): 0;
        this.countThreshold =  get(data, "countThreshold")? get(data, "countThreshold"): 0;
        this.active = get(data, "active")? get(data, "active"): true;
        this.previousDecisionEnabled =  get(data, "previousDecisionEnabled")? get(data, "previousDecisionEnabled"): false ;
        this.neighborListingEnabled =  get(data, "neighborListingEnabled")? get(data, "neighborListingEnabled"): false ;
        this.statusEntranceThreshold =  get(data, "statusEntranceThreshold")? get(data, "statusEntranceThreshold"):0 ;
        this.isVrLookup =  get(data, "isVrLookup")? get(data, "isVrLookup"): false ;
        this.dmvRequestThreshold =  get(data, "dmvRequestThreshold")? get(data, "dmvRequestThreshold"): 0;
        this.plateExamplesEnabled =  get(data, "plateExamplesEnabled")? get(data, "plateExamplesEnabled"): false;
        this.queueOrder = get(data, "queueOrder")? get(data, "queueOrder"): 0;
        this.enableLocalOfflinePrint =  get(data, "enableLocalOfflinePrint")? get(data, "enableLocalOfflinePrint"): false ;
        this.miskeyedPlateEnabled =  get(data, "miskeyedPlateEnabled")? get(data, "miskeyedPlateEnabled"): false;
        this.carryOverPreviousCategory =  get(data, "carryOverPreviousCategory")? get(data, "carryOverPreviousCategory"): false;
        this.enableCourtForPostIssuanceQueue =  get(data, "enableCourtForPostIssuanceQueue")? get(data, "enableCourtForPostIssuanceQueue"): false;
        this.imageSelectionEnabled =  get(data, "imageSelectionEnabled")? get(data, "imageSelectionEnabled"):false ;
        this.showSelectedImagesEnabled =  get(data, "showSelectedImagesEnabled")? get(data, "showSelectedImagesEnabled"): false;
        this.iCertifyDescription =  get(data, "iCertifyDescription")? get(data, "iCertifyDescription"): '';
        this.isICertifyEnabled =  get(data, "isICertifyEnabled")? get(data, "isICertifyEnabled"): false;
        this.enableRollbackNoticesQueue = get(data, "enableRollbackNoticesQueue")? get(data, "enableRollbackNoticesQueue"): false ;
        this.kvlEnabled = get(data, "kvlEnabled")? get(data, "kvlEnabled"): false;
        this.queueTypesName = get(data, "queueTypesName");
    }
  }
  export class ActionCategoriesModel {
    createUserID: number;
    updateUserID: number;
    createDatetime: string;
    updateDatetime: string;
    isDeleted: string;
    actionsID: number;
    categoriesID: number;
    contractID: number;
    active: boolean;
    queuesID: number;
    actionCategoriesId: number;
    constructor(data: unknown) {
        this.createUserID = get(data, "createUserID") || 0;
        this.updateUserID = get(data, "updateUserID") || 0;
        this.createDatetime = new Date().toISOString();
        this.updateDatetime = new Date().toISOString();
        this.isDeleted = "N";
        this.actionsID = _.toNumber(get(data, "actionsID"));
        this.categoriesID = _.toNumber(get(data, "categoriesID"));
        this.contractID = get(data, "contractID");
        this.active = get(data, "active") || true;
        this.queuesID = get(data, "queuesID");
        this.actionCategoriesId = get(data, "actionCategoriesID");
    }
  }