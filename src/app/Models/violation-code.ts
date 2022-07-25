import { get } from "lodash";

export class ViolationCode {
    
        violationCodesId: number;
        contractId: number;
        createUserID: number;
        createDatetime: string;
        updateUserId: number;
        updateDateTime: string;
        violClassTbl: string;
        violCodeAltExt: null;
        violCodeInt: number;
        violCodeExt: string;
        violPriority: number;
        violClass: string;
        violType: string;
        violName: string;
        violLongName: string;
        violProcessDesc: string;
        violProcessDate1: null;
        violAgencyGroup: null;
        violProcessDate2: string;
        violProcessData2: string;
        codeText: string;
        clientNumber: string;
        violationCodeCharges: ViolationCodeCharges[];
        constructor (data: unknown) {
            this.violationCodesId = get(data, "violationCodesId") ;
            this.contractId= get(data, "contractId");
            this.createUserID = get(data, "createUserID");
            this.createDatetime = get(data, "createDatetime");
            this.updateUserId = get(data, "updateUserId");
            this.updateDateTime = get(data, "updateDateTime");
            this.violClassTbl = get(data, "violClassTbl");
            this.violCodeAltExt = get(data, "violCodeAltExt");
            this.violCodeInt = get(data, "violCodeInt");
            this.violCodeExt = get(data, "violCodeExt");
            this.violPriority = get(data, "violPriority");
            this.violClass = get(data, "violClass");
            this.violType = get(data, "violType");
            this.violName = get(data, "violName");
            this.violLongName = get(data, "violLongName");
            this.violProcessDesc = get(data, "violProcessDesc");
            this.violProcessDate1 = get(data, "violProcessDate1");
            this.violAgencyGroup = get(data, "violAgencyGroup");
            this.violProcessDate2 = this.taskDate(get(data, "violProcessDate2"));
            this.violProcessData2 = this.taskDate(get(data, "violProcessData2"));
            this.codeText = get(data, "codeText");
            this.clientNumber = get(data, "clientNumber");
            this.violationCodeCharges = this.getViolationCodeCharges(get(data, "violationCodeCharges"));
        }
        getViolationCodeCharges(list: any) {
            if(list && list.length > 0) {
                const violationCodeList = list.map((element: any) => {
                    return new ViolationCodeCharges(element)
                })
                return violationCodeList;
            }
        }
         taskDate(date:string) {
                var d = (new Date(date) + '').split(' ');
                d[2] = d[2] + ',';
            
                return [d[1],d[2],d[3]].join(' ');
            }
       
}


export class ViolationCodeCharges {
    violationCodeChargesId:number ;
    contractId: number;
    createUserId: number;
    createDateTime: string;
    updateUserId: number;
    updateDateTime: string;
    fine: number;
    effDate: string;
    pen1: number;
    pen2: number;
    pen3: number;
    pen4: number;
    pen5: number;
    violationCodesId: number
    constructor(data: unknown) {
        this.violationCodeChargesId = get(data, "violationCodeChargesId");
        this.contractId = get(data, "contractId") ;
        this.createUserId = get(data, "createUserId") ;
        this.createDateTime = get(data, "createDateTime") ;
        this.updateUserId = get(data, "updateUserId") ;
        this.updateDateTime = get(data, "updateDateTime") ;
        this.fine = get(data, "fine");
        this.effDate = this.taskDate(get(data, "effDate")) ;
        this.pen1 = get(data, "pen1") ;
        this.pen2 = get(data, "pen2") ;
        this.pen3 = get(data, "pen3") ;
        this.pen4 = get(data, "pen4") ;
        this.pen5 = get(data, "pen5") ;
        this.violationCodesId = get(data, "violationCodesId") ;
    }
    taskDate(date:string) {
                var d = (new Date(date) + '').split(' ');
                d[2] = d[2] + ',';
            
                return [d[1],d[2],d[3]].join(' ');
            }
       
}
