import * as _ from "lodash";
import { get } from "lodash";

export class UserManagementModel {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    lastLogin: string;
    internationalUsers: boolean;
    userEnabled: boolean;
    id: number;

    constructor(data: unknown) {
        this.userName = get(data, 'userName');
        this.firstName = get(data, 'firstName');
        this.lastName = get(data, 'lastName');
        this.email = get(data, 'email');
        this.lastLogin = get(data, 'lastLogin');
        this.internationalUsers = get(data, 'internationalUsers')? get(data, 'internationalUsers'): false;
        this.userEnabled = get(data, 'userEnabled');
        this.id = get(data, 'id');
    }
}

export class UserContracts {
    createUserID: number;
    updateUserID: number;
    createDatetime: string;
    updateDatetime: string;
    isDeleted: string;
    aspNetUserContractsID: number;
    userId: number;
    contractId: number
    constructor(data:unknown) {
        this.createUserID = get(data, 'createUserID')?get(data, 'createUserID'):0;
        this.updateUserID = get(data, 'updateUserID')?get(data, 'updateUserID'):0;
        this.createDatetime = new Date().toISOString();
        this.updateDatetime = new Date().toISOString();
        this.isDeleted = 'N';
        this.aspNetUserContractsID = get(data, 'aspNetUserContractsID')?get(data, 'aspNetUserContractsID'):0;
        this.userId = get(data, 'userId')?get(data, 'userId'):0;
        this.contractId  = get(data, 'contractId');
    }
}
export class AspNetRoles {
    createUserID: number;
    updateUserID: number;
    createDatetime: string;
    updateDatetime: string;
    isDeleted: string;
    aspNetUserRolesID: number;
    userId: number;
    roleId: number;
    constructor(data:unknown) {
        this.createUserID = get(data, 'createUserID')?get(data, 'createUserID'):0;
        this.updateUserID = get(data, 'updateUserID')?get(data, 'updateUserID'):0;
        this.createDatetime = new Date().toISOString();
        this.updateDatetime =new Date().toISOString();
        this.isDeleted =  "N";
        this.aspNetUserRolesID = get(data, 'aspNetUserRolesID')?get(data, 'aspNetUserRolesID'): 0;
        this.userId = get(data, 'userId')?get(data, 'userId'):0;
        this.roleId = get(data, 'roleId');
    }
}