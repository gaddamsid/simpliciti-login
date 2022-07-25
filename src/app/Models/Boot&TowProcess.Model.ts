import { get } from "lodash";

export class BootAndTowProcess {
    bootTowProcessId: number;
    contractId: number;
    createDateTime: string;
    createUserId: number;
    isDeleted: string;
    processCode: string;
    processLongName: string;
    processShortName: string;
    processType: string;
    rules: string;
    status: string;
    updateUserId: number;
    updatedDateTime: string;
    constructor(data:unknown) {
        this.bootTowProcessId= get(data, 'bootTowProcessId');
        this.contractId= get(data, 'contractId');
        this.createDateTime= get(data, 'createDateTime');
        this.createUserId= get(data, 'createUserId');
        this.isDeleted= get(data, 'isDeleted');
        this.processCode= get(data, 'processCode');
        this.processLongName= get(data, 'processLongName');
        this.processShortName= get(data, 'processShortName');
        this.processType= get(data, 'processType');
        this.rules= get(data, 'rules');
        this.status= get(data, 'status');
        this.updateUserId= get(data, 'updateUserId');
        this.updatedDateTime= get(data, 'updatedDateTime');
    }
}

export class UpdateBTProcess {
    processCode: string;
    processLongName: string;
    processShortName: string;
    processType: string;
    rules: string;
    status: string;
    constructor(data: unknown) {
        this.processCode= get(data, 'processCode');
        this.processLongName= get(data, 'processLongName');
        this.processShortName= get(data, 'processShortName');
        this.processType= get(data, 'processType');
        this.rules= get(data, 'rules');
        this.status= get(data, 'status');
    }
}