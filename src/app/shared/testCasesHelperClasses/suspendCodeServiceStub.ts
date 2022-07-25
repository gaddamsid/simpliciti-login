import { Observable } from 'rxjs';
import { of } from 'rxjs';

const obj = {
    active: "Y",
    calendarDays: "Y",
    contractId: 2,
    createDateTime: "2022-06-16T13:00:19.797",
    createUserId: 1,
    extraLongName: "",
    extraRules: "",
    isDeleted: "N",
    suspendClass: "",
    suspendCod: 99,
    suspendCodeNew: 0,
    suspendCodePriority: 1,
    suspendCodeTypeId: 1,
    suspendName: "SCHED HEAR",
    suspendNameLong: "HEAR SCHED",
    suspendNumDays: 10,
    suspendType: "T",
    updateDateTime: "2022-06-16T13:00:19.797",
    updateUserId: 1,
}

export class SuspendCodeServiceStub {
    public getSuspendCode(): Observable<any[]> {
        return of(
            [
                {
                    active: "Y",
                    calendarDays: "Y",
                    contractId: 2,
                    createDateTime: "2022-06-16T13:00:19.797",
                    createUserId: 1,
                    extraLongName: "",
                    extraRules: "",
                    isDeleted: "N",
                    suspendClass: "",
                    suspendCod: 99,
                    suspendCodeNew: 0,
                    suspendCodePriority: 1,
                    suspendCodeTypeId: 1,
                    suspendName: "SCHED HEAR",
                    suspendNameLong: "HEAR SCHED",
                    suspendNumDays: 10,
                    suspendType: "T",
                    updateDateTime: "2022-06-16T13:00:19.797",
                    updateUserId: 1,
                },
                {
                    active: "Y",
                    calendarDays: "Y",
                    contractId: 2,
                    createDateTime: "2022-06-16T13:00:19.797",
                    createUserId: 1,
                    extraLongName: "",
                    extraRules: "",
                    isDeleted: "N",
                    suspendClass: "",
                    suspendCod: 99,
                    suspendCodeNew: 0,
                    suspendCodePriority: 1,
                    suspendCodeTypeId: 1,
                    suspendName: "SCHED HEAR",
                    suspendNameLong: "HEAR SCHED",
                    suspendNumDays: 10,
                    suspendType: "T",
                    updateDateTime: "2022-06-16T13:00:19.797",
                    updateUserId: 1,
                }
            ]
        );
    }
    public addSuspendCode(data: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    public updateSuspendCode(data: any, id: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    public deleteSuspendCode(id: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }

}