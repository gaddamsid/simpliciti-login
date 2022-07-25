import { get } from "lodash";

export interface actionModel {
    actionsID: number;
    contractID: number;
    active: boolean;
    actionsName: string;
    actionQueueNames:any[];
    isDeleted: string;
    createUserID: number;
    updateUserID: number;
    createDatetime: string;
    updateDatetime : string;    
   
}





