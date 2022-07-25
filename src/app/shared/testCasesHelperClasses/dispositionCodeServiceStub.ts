import { Observable } from 'rxjs';
import { of } from 'rxjs';

const obj = {
    createDatetime: "2022-04-12T07:16:32.897",
    createUserId: 1,
    dispDescription: "ADJUST FINE AND/OR PENALTY(S)",
    dispRule: "A",
    dispositionRulesMasterId: 1,
    updateDatetime: "2022-04-12T07:16:32.897",
    updateUserId: 1
}

export class DispositionCodeServiceStub {
    public getDispositionCode(): Observable<any[]> {
        return of(
            [
                {
                    active: "Y",
                    contractId: 2,
                    createDateTime: "2022-06-22T13:43:28.047",
                    createUserId: 1,
                    dispClass: "AS",
                    dispCode: 1,
                    dispDescription: "ZERO OUT REDUCTION",
                    dispName: "disp",
                    dispNameLong: "Disposition",
                    dispNotInUse: "N",
                    dispPriority: 1,
                    dispRule: "X",
                    dispositionId: 1,
                    extraDate1: "2022-06-22T13:43:27.913",
                    extraDate2: "2022-06-22T13:43:27.913",
                    extraLongName: "",
                    extraRules: "",
                    isDeleted: "N",
                    updateDateTime: "2022-06-22T13:43:28.047",
                    updateUserId: 1
                }
            ]
        );
    }
    public addDispCode(data: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    public updateDispCode(id: any, data: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    public deleteDispCode(id: number): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    public getDispRuleMasterList(): Observable<any[]> {
        return of(
            [
                {
                    createDatetime: "2022-04-12T07:16:32.897",
                    createUserId: 1,
                    dispDescription: "ADJUST FINE AND/OR PENALTY(S)",
                    dispRule: "A",
                    dispositionRulesMasterId: 1,
                    updateDatetime: "2022-04-12T07:16:32.897",
                    updateUserId: 1
                },
                {
                    createDatetime: "2022-04-12T07:16:32.897",
                    createUserId: 1,
                    dispDescription: "ADJUST FINE AND/OR PENALTY(S)",
                    dispRule: "A",
                    dispositionRulesMasterId: 1,
                    updateDatetime: "2022-04-12T07:16:32.897",
                    updateUserId: 1
                }
            ]
        );
    }

}