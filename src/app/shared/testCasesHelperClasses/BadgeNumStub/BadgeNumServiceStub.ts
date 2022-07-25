import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { BadgeNumMockList } from './BadgeNumMockList';

let res = {
    content: null,
    contentType: "BlockBlob",
    dcoId: null,
    fileName: "Sign5.png",
    hash: null,
    imageName: null,
    languageDesc: null,
    languageId: null,
    size: "4457",
    url: "https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/imaging/2/imgprod/images/checkimages/2022/6/20220629/681_Sign5.png"
  }

export class BadgeNumServiceStub {

    public getBadgeNumber(): Observable<any[]> {
        return of(BadgeNumMockList);
    }
    public get(): Observable<any> {
        return of(res);
    }
    public addBadgeNumber(data: any): Observable<any> {
        return of({status: 'Success', details : [{code: '0000'}]});
    }
    public updateBadgeNumber(id: any, data: any): Observable<any> {
        return of({status: 'Success'});
    }
    public deleteBadgeNumber(id: any): Observable<any> {
        return of({status: 'Success', details : [{code: '0000'}]});
    }
}