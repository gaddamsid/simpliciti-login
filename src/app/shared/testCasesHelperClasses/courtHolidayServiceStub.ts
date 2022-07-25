import { Observable } from 'rxjs';
import { of } from 'rxjs';

const obj = {
    active: false,
    contractID: 0,
    createDatetime: "2022-05-18T11:59:35.007",
    createUserID: 0,
    holidayDate: "2022-05-10T00:00:00",
    holidayDescription: "Janta",
    holidayId: 1,
    holidayRecordNumber: 897,
    isDeleted: "N",
    updateDatetime: "2022-05-18T11:59:35.007",
    updateUserID: 0
}

export class CourtHolidayServiceStub {
    public getCourtHoliday(): Observable<any[]> {
        return of(
            [
                {
                    active: false,
                    contractID: 0,
                    createDatetime: "2022-05-18T11:59:35.007",
                    createUserID: 0,
                    holidayDate: "2022-05-10T00:00:00",
                    holidayDescription: "Janta",
                    holidayId: 1,
                    holidayRecordNumber: 897,
                    isDeleted: "N",
                    updateDatetime: "2022-05-18T11:59:35.007",
                    updateUserID: 0
                },
                {
                    active: false,
                    contractID: 0,
                    createDatetime: "2022-05-18T11:59:35.007",
                    createUserID: 0,
                    holidayDate: "2022-05-10T00:00:00",
                    holidayDescription: "Janta",
                    holidayId: 1,
                    holidayRecordNumber: 897,
                    isDeleted: "N",
                    updateDatetime: "2022-05-18T11:59:35.007",
                    updateUserID: 0
                }
            ]
        );
    }
    public addCourtHoliday(data: any): Observable<any> {
        return of({status: 'Success', details: [{code: '200'}]});
    }
    public updateCourtHoliday(data: any): Observable<any> {
        return of({status: 'Success', details: [{code: '200'}]});
    }
    public updateHolidayRecord(data: any): Observable<any> {
        return of(obj);
    }
    public toggleCourtHoliday(id: any): Observable<any> {
        return of({status: 'Success', details: [{code: '200'}]});
    }

}