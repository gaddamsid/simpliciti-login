import { Observable } from 'rxjs';
import { of } from 'rxjs';

const obj = {
    active: false,
    contractId: 0,
    createDatetime: "2022-04-26T09:33:25.787",
    createUserID: 0,
    isDeleted: "N",
    updateDatetime: "2022-04-26T09:33:25.787",
    updateUserID: 0,
    weatherTypesId: 1,
    weatherTypesName: "Cloudy and wimdy",
}

export class WeatherTypeServiceStub {
    public getWeatherTypes(): Observable<any[]> {
        return of(
            [
                {
                    active: false,
                    contractId: 0,
                    createDatetime: "2022-04-26T09:33:25.787",
                    createUserID: 0,
                    isDeleted: "N",
                    updateDatetime: "2022-04-26T09:33:25.787",
                    updateUserID: 0,
                    weatherTypesId: 1,
                    weatherTypesName: "Cloudy and wimdy",
                },
                {
                    active: false,
                    contractId: 0,
                    createDatetime: "2022-04-26T09:33:25.787",
                    createUserID: 0,
                    isDeleted: "N",
                    updateDatetime: "2022-04-26T09:33:25.787",
                    updateUserID: 0,
                    weatherTypesId: 1,
                    weatherTypesName: "Cloudy and wimdy",
                }
            ]
        );
    }
    public createWeatherType(data: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    public updateWeatherType(id: any, data: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    public toggleWeatherState(id: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }

}