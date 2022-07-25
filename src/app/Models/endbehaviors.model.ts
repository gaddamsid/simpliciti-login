import { get } from "lodash";

export class EndBehaviorsModel{
    
    behaviorsID: number;
    behaviorTypesID:number;
    contractID:number;
    isBatchSchedule: boolean;
    behaviorsName: string;
    workflowStatesID:number;
    active: boolean;
    isEntrance: boolean;
    behaviorTypesName: string;
    importBehaviorId:number;
    hasImportBehavior: boolean;
    behaviorsOrder: number;
    isRegistrationHold: boolean;
    registrationHoldAccept: string;
    registrationHoldReject: string;
    behaviorWorkTypesID: number;
    createUserID:number;
    updateUserID:number;
    createDatetime: string;
    updateDatetime: string;
    isDeleted: string
    courtDateModel!: any
    fleetLookupBehaviorsModel!: any
    conditionalEmailBehaviorModel!: any
    printingBehaviorModel!: any
    xmlExportFileBehaviorsModel!:any
    constructor(data: unknown, behaviorTypesName:string) {
        this.behaviorsID = get(data, 'behaviorsID') || 0;
        this.behaviorTypesID = get(data, 'behaviorTypesID');
        this.contractID = get(data, 'contractID')|| 1;
        this.isBatchSchedule = get(data, 'isBatchSchedule') || true;
        this.behaviorTypesName = behaviorTypesName;
        this.behaviorsName = get(data, 'behaviorsName');
        this.workflowStatesID = get(data, 'workflowStatesID') || 1;
        this.active = get(data, 'active');
        this.isEntrance = (get(data, 'isEntrance')==="Y")? true: false;
        this.importBehaviorId = get(data, 'importBehaviorId')|| 0;
        this.hasImportBehavior = get(data, 'hasImportBehavior') || true;
        this.behaviorsOrder = get(data, 'behaviorsOrder');
        this.isRegistrationHold = get(data, 'isRegistrationHold')|| false;
        this.registrationHoldAccept = this.isRegistrationHold? get(data, 'registrationHoldAccept'): "";
        this.registrationHoldReject = this.isRegistrationHold? get(data, 'registrationHoldReject'): "";
        this.behaviorWorkTypesID = get(data, 'behaviorWorkTypesID') || 0;
        this.createUserID = get(data, 'createUserID') || 0;
        this.updateUserID = get(data, 'updateUserID') || 0;
        this.createDatetime = new Date().toISOString();
        this.updateDatetime = new Date().toISOString();
        this.isDeleted = "N";
    }
}

export class CourtDateModel {
    createUserID: number;
    updateUserID:number;
    createDatetime: string;
    updateDatetime: string;
    isDeleted: string;
    courtDateBehaviorsID:number;
    behaviorsID:number;
    duration:number;
    active: boolean;
    contractId:number;
    constructor(data:unknown) {
        this.createUserID =  get(data, 'createUserID') || 0;
        this.updateUserID = get(data, 'updateUserID') || 0;
        this.createDatetime =  new Date().toISOString();
        this.updateDatetime =  new Date().toISOString();
        this.isDeleted = "N";
        this.courtDateBehaviorsID = get(data, 'courtDateBehaviorsID') || 0;
        this.behaviorsID = get(data, 'behaviorsID')|| 0;
        this.duration = get(data, 'duration') || 0;
        this.active = get(data, 'active') || true;
        this.contractId = 1;
    }
  }

export class fleetLookupBehaviorsModel {
    createUserID: number;
    updateUserID: number;
    createDatetime: string;
    updateDatetime: string;
    isDeleted: string;
    fleetLookupBehaviorsId: number;
    behaviorsId: number;
    transitionsId: number;
    active: boolean;
    contractID: number;
    constructor(data: unknown) {
        this.createUserID = get(data, 'createUserID') || 0;
        this.updateUserID = get(data, 'updateUserID') || 0;
        this.createDatetime = new Date().toISOString();
        this.updateDatetime = new Date().toISOString();
        this.isDeleted = "N";
        this.fleetLookupBehaviorsId = get(data, 'fleetLookupBehaviorsId') || 0;
        this.behaviorsId = get(data, 'behaviorsID') || 0;
        this.transitionsId = get(data, 'transitionsID');
        this.active = get(data, 'active');
        this.contractID = 0;
    }
}