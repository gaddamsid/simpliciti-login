import { get } from "lodash";

export class WeatherTypeModel {
    createUserID:number;
    createDatetime:string;
    updateUserID:number;
    updateDatetime:string;
    weatherTypesId:number;
    contractId:number;
    active:boolean;
    weatherTypesName:string;
    isDeleted: string;
    constructor(data: unknown) {
        this.createUserID = get(data, "createUserID");
        this.updateUserID =get(data, "updateUserID");
        this.createDatetime =get(data, "createDatetime");
        this.updateDatetime =get(data, "updateDatetime");
        this.weatherTypesId =get(data, "weatherTypesId");
        this.contractId =get(data, "contractId");
        this.active =get(data, "active");
        this.weatherTypesName =get(data, "weatherTypesName");
        this.isDeleted = get(data, "isDeleted");
    }
   
}