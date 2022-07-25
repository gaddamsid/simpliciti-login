import { get } from "lodash"

export class GlobalHoliday {
        holidayID: number;
        contractID: number;
        active: boolean;
        holidayDate: string;
        holidayDescription: string;
        holidayRecordNumber: number;
        createUserID: number;
        createDatetime: string;
        updateUserID: number;
        updateDatetime: string;
        isDeleted: string;
        constructor (data: unknown) { 
                this.holidayID = get(data, "holidayID");
                this.contractID = get(data, "contractID");
                this.active =   get(data, "active");
                this.holidayDate= this.taskDate(get(data, "holidayDate"));
                this.holidayDescription = get(data, "holidayDescription");
                this.holidayRecordNumber = get(data, "holidayRecordNumber");
                this.createUserID = get(data, "createUserID");
                this.createDatetime = get(data, "createDatetime");
                this.updateUserID = get(data, "updateUserID");
                this.updateDatetime =  get(data, "updateDatetime");
                this.isDeleted = get(data,"isDeleted")
        }
        
        taskDate(date:string) {
                var d = (new Date(date) + '').split(' ');
                d[2] = d[2] + ',';
            
                return [d[1],d[2],d[3]].join(' ');
            }
}

