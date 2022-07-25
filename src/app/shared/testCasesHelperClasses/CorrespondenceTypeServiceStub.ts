import { Observable } from 'rxjs';
import { of } from 'rxjs';

const obj = {
    active: "Y",
    contractId: 2,
    corrClass: "A",
    corrLetterType: null,
    corrLongName: "Automatio",
    corrNameLong: null,
    corrPhoneInd: "N",
    corrShortName: "Aut",
    corrTypeId: 282,
    corrTypeNumber: 701,
    createDateTime: "2022-06-09T12:16:13.12",
    createUserId: 1,
    extraDate1: null,
    extraDate2: null,
    extraLongName: null,
    extraRules: null,
    isDeleted: "N",
    isUploaded: "Y",
    updateUserId: 1,
    updatedDateTime: "2022-06-09T12:16:13.12",
}

export class CorrespondenceTypeServiceStub {
    public getCorrespondenceList(): Observable<any[]> {
        return of(
            [
                {
                    "corrTypeId": 282,
                    "contractId": 2,
                    "createUserId": 1,
                    "updateUserId": 1,
                    "createDateTime": "2022-06-09T12:16:13.12",
                    "updatedDateTime": "2022-06-09T12:16:13.12",
                    "corrTypeNumber": 701,
                    "corrClass": "A",
                    "corrLongName": "Automatio",
                    "corrShortName": "Aut",
                    "corrPhoneInd": "N",
                    "active": "Y",
                    "isDeleted": "N",
                    "corrLetterType": null,
                    "corrNameLong": null,
                    "extraLongName": null,
                    "extraDate1": null,
                    "extraDate2": null,
                    "extraRules": null,
                    "isUploaded": "Y"
                },
                {
                    "corrTypeId": 285,
                    "contractId": 2,
                    "createUserId": 1,
                    "updateUserId": 1,
                    "createDateTime": "2022-06-09T12:26:09.123",
                    "updatedDateTime": "2022-06-09T12:26:09.123",
                    "corrTypeNumber": 706,
                    "corrClass": "A",
                    "corrLongName": "Automatio",
                    "corrShortName": "Aut",
                    "corrPhoneInd": "N",
                    "active": "N",
                    "isDeleted": "N",
                    "corrLetterType": null,
                    "corrNameLong": null,
                    "extraLongName": null,
                    "extraDate1": null,
                    "extraDate2": null,
                }
            ]
        );
    }
    public addCorrespondenceList(data: any): Observable<any> {
        return of({ status: 'Success', details: [{code: '200'}] });
    }
    public updateCorrespondence(id: any, data: any): Observable<any> {
        return of({ status: 'Success', details: [{code: '200'}] });
    }
    public deleteCorrespondence(id: any): Observable<any> {
        return of({ status: 'Success', details: [{code: '200'}] });
    }

}