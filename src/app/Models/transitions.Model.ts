import * as _ from "lodash";
import { get } from "lodash";

export class transitionsModel {
    createUserID: number;
    updateUserID: number;
    createDatetime: string;
    updateDatetime: string;
    isDeleted: string;
    transitionsID: number;
    contractID: number;
    destinationWorkflowStatesID: number;
    transitionsName: string;
    sourceWorkflowStatesID: number;
    transitionTypeID: number;
    transitionTypeName: string;
    active: boolean;
    enableQualityControl: boolean;
    automaticTransitionsModel: any;
    clauses: Clauses[];
    qualityControlModel:any;

    constructor(data: unknown) {
        this.createUserID = 0;
        this.updateUserID = 0;
        this.createDatetime = new Date().toISOString();
        this.updateDatetime = new Date().toISOString();
        this.isDeleted = "N";
        this.transitionsID = get(data, 'transitionsID')? get(data, 'transitionsID'): 0;
        this.contractID = get(data, 'contractID');
        this.destinationWorkflowStatesID = parseInt(get(data, 'destinationWorkflowStatesID'));
        this.transitionsName = get(data, 'transitionsName');
        this.sourceWorkflowStatesID = get(data, 'sourceWorkflowStatesID')? get(data, 'sourceWorkflowStatesID'): 0;
        this.transitionTypeID = parseInt(get(data, 'transitionTypesID'));
        this.transitionTypeName = get(data, 'transitionTypeName');
        this.active = true;
        this.enableQualityControl = get(data, 'enableQualityControl')? get(data, 'enableQualityControl'): false;
        this.automaticTransitionsModel = get(data, 'automaticTransitionsModel')? get(data, 'automaticTransitionsModel') : null;
        this.clauses = get(data, 'clauses');
        this.qualityControlModel = get(data, 'qualityControlModel')? get(data, 'qualityControlModel') : null;
    }
}
export class Clauses {
    createUserID: number;
    updateUserID: number;
    createDatetime: string;
    updateDatetime: string;
    isDeleted: string;
    active: boolean;
    clausesID: number;
    contractID: number;
    fieldsID: number;
    joinOperatorsID: number;
    operatorsID: number;
    clauseOrder: number;
    transitionsID: number;
    clauseValue: string;
    constructor(data: unknown, index:number,clauseID:number, transitionID:number) {
        this.createUserID = 0;
        this.updateUserID = 0;
        this.createDatetime = new Date().toISOString();
        this.updateDatetime = new Date().toISOString();
        this.isDeleted = "N";
        this.active = true;
        this.clausesID = clauseID? clauseID : 0;
        this.contractID = 2;
        this.fieldsID = parseInt(get(data, 'fieldsID'));
        this.joinOperatorsID = parseInt(get(data, 'joinOperatorsID'))? parseInt(get(data, 'joinOperatorsID')): 0;
        this.operatorsID = parseInt(get(data, 'operatorsID'));
        this.clauseOrder = get(data, 'clauseOrder')? get(data, 'clauseOrder'): index;
        this.transitionsID = transitionID;
        this.clauseValue = get(data, "actionID")? get(data, "actionID"): "";
      
    }
}
export class QualityControlModel {
        createUserID: number;
        updateUserID: number;
        createDatetime: string;
        updateDatetime: string;
        isDeleted: string;
        qualityControlsID: number;
        contractID: number;
        qualityControlsName: string;
        percentage: number;
        transitionsID: number;
        active: boolean;
        constructor(data: unknown, transitionsID: number) {
            this.createUserID = 0;
            this.updateUserID = 0;
            this.createDatetime = new Date().toISOString();
            this.updateDatetime = new Date().toISOString();
            this.isDeleted = "N"
            this.qualityControlsID = get(data, "qualityControlsID")? get(data, "qualityControlsID") :0;
            this.contractID = 2;
            this.qualityControlsName = get(data, "qualityControlsName")? get(data, "qualityControlsName") :'';
            this.percentage = get(data, "percentage");
            this.transitionsID = get(data, "transitionsID")?  get(data, "transitionsID"): transitionsID;
            this.active = true;
        }
     
}