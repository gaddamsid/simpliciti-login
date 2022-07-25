import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { sectionMockList, sectionTypeMockList, cameraTypeMockList } from './AdminSectionMockList';

export class AdminSectionServiceStub {

    public get(url: string, CW5type?: boolean): any {
        if(url == "Section/getAllSectionTypes"){
            return of(sectionTypeMockList);
        }
        if(url == "CameraType/getAllCameraType"){
            return of(cameraTypeMockList);
        }
        else {
            return of(sectionMockList);
        }
    }

    public post(url: string, data: any, CW5type?: boolean): Observable<any> {
        return of({ status: 'Success', details: [{ code: '0000' }] });
    }

    public put(url: string, data: any, CW5type?: boolean): Observable<any> {
        return of({ status: 'Success', details: [{ code: '0000' }] });
    }

    public delete(id: any): Observable<any> {
        return of({status: 'Success', details : [{code: '0000'}]});
    }

}