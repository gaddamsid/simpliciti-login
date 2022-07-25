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

export class ContractSettingServiceStub {
    public postContractSetting(data: any): Observable<any> {
        return of(obj);
    }
}