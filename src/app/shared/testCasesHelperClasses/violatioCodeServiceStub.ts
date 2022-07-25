import { Observable } from 'rxjs';
import { of } from 'rxjs';

const obj = {
    "violationCodesId": 585,
    "contractId": 2,
    "createUserId": 1,
    "createDateTime": "2022-05-02T11:00:20.797",
    "updateUserId": 1,
    "updateDateTime": "2022-05-02T11:00:20.797",
    "violClassTbl": "A",
    "violCodeAltExt": "ViolCodeAltExt_Java",
    "violCodeInt": 458,
    "violCodeExt": "TRC7.2.55",
    "violPriority": 2,
    "violClass": "Q",
    "violType": "P",
    "violName": "NO PRK ZN",
    "violLongName": "NO PARKING ZONE     ",
    "violProcessDesc": " ",
    "violProcessDate1": "1905-06-15T00:00:00",
    "violAgencyGroup": "VAgeGrp_D",
    "violProcessDate2": "1905-06-15T00:00:00",
    "violProcessData2": "VPData2_D",
    "codeText": "",
    "clientNumber": "51",
    "active": 1,
    "isDeleted": "N",
    "violationCodeCharges": [
        {
            "violationCodeChargesId": 67,
            "contractId": 2,
            "createUserId": 5,
            "createDateTime": "1905-06-15T00:00:00",
            "updateUserId": 5,
            "updateDateTime": "1905-06-15T00:00:00",
            "fine": 100.75,
            "effDate": "2021-06-15T00:00:00",
            "pen1": 101.0,
            "pen2": 102.0,
            "pen3": 103.0,
            "pen4": 104.0,
            "pen5": 105.0
        },
    ]
}

export class ViolatioCodeServiceStub {
    public getViolationCode(): Observable<any[]> {
        return of(
            [
                {
                    "violationCodesId": 585,
                    "contractId": 2,
                    "createUserId": 1,
                    "createDateTime": "2022-05-02T11:00:20.797",
                    "updateUserId": 1,
                    "updateDateTime": "2022-05-02T11:00:20.797",
                    "violClassTbl": "A",
                    "violCodeAltExt": "ViolCodeAltExt_Java",
                    "violCodeInt": 458,
                    "violCodeExt": "TRC7.2.55",
                    "violPriority": 2,
                    "violClass": "Q",
                    "violType": "P",
                    "violName": "NO PRK ZN",
                    "violLongName": "NO PARKING ZONE     ",
                    "violProcessDesc": " ",
                    "violProcessDate1": "1905-06-15T00:00:00",
                    "violAgencyGroup": "VAgeGrp_D",
                    "violProcessDate2": "1905-06-15T00:00:00",
                    "violProcessData2": "VPData2_D",
                    "codeText": "",
                    "clientNumber": "51",
                    "active": 1,
                    "isDeleted": "N",
                    "violationCodeCharges": [
                        {
                            "violationCodeChargesId": 67,
                            "contractId": 2,
                            "createUserId": 5,
                            "createDateTime": "1905-06-15T00:00:00",
                            "updateUserId": 5,
                            "updateDateTime": "1905-06-15T00:00:00",
                            "fine": 100.75,
                            "effDate": "2021-06-15T00:00:00",
                            "pen1": 101.0,
                            "pen2": 102.0,
                            "pen3": 103.0,
                            "pen4": 104.0,
                            "pen5": 105.0
                        },
                    ]
                }
            ]
        );
    }

    public incrementviolation(): Observable<any[]> {
        return of([509]);
    }
    public addViolationCode(data: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    public updateViolationCode(data: any, id: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    public deleteViolationCode(id: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }

}