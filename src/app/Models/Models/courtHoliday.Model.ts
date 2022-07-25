import { get } from "lodash";

export class CourtHoliday {
    active: boolean;
    contractID: number;
    createDatetime: string;
    createUserID: number;
    holidayDate: string;
    holidayDescription: string;
    holidayId: number;
    holidayRecordNumber: number;
    updateDatetime: string;
    updateUserID: number; 
    constructor(data: unknown) {
        this.active = get(data, "active");
        this.contractID= get(data, "contractID");
        this.createDatetime= get(data, "createDatetime");
        this.createUserID = get(data, "createUserID");
        this.holidayDate= this.taskDate(get(data, "holidayDate"));
        this.holidayDescription= get(data, "holidayDescription");
        this.holidayId = get(data, "holidayId");
        this.holidayRecordNumber = get(data, "holidayRecordNumber");
        this.updateDatetime= get(data, "updateDatetime");
        this.updateUserID = get(data, "updateUserID") ;
    }
    taskDate(date:string) {
        var d = (new Date(date) + '').split(' ');
        d[2] = d[2] + ',';
    
        return [d[1],d[2],d[3]].join(' ');
    }
}

export interface courtHolidayModel {
    createUserID: number,
    updateUserID: number,
    createDatetime: string,
    updateDatetime: string,
    holidayId: number,
    contractID: number,
    active: boolean,
    holidayDate: string,
    holidayDescription: string,
    holidayRecordNumber: number
    isDelete: string;
  }

