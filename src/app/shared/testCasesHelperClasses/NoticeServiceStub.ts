import { Observable } from 'rxjs';
import { of } from 'rxjs';

export class NoticeServiceStub {
    public getNoticeTypeList(): Observable<any[]> {
        return of(
            []
        );
    }
    public getStateList(): Observable<any[]> {
        return of(
            []
        );
    }
    public getNoticeDetails(): Observable<any[]> {
        return of(
            []
        );
    }

    public getCitationDetails(id: any): Observable<any[]> {
        return of(
            [
                {
                    "_citationModel": {
                        "sequenceNumber": 1,
                        "pageNumber": 3,
                        "numberOfPages": 2,
                        "noticeTypeShortName": "ch.high",
                        "mailDate": "2022-07-09T00:00:00",
                        "citationNumber": "D031687918",
                        "locationDesc": "37TH ST S/B @ WHITEHAVEN PKWY NW",
                        "vinNumber": " ",
                        "violName": "NO PRK ZN",
                        "issueDateTime": "2022-05-06T00:00:00",
                        "meter": " ",
                        "badgeNumber": "900",
                        "agencyCode": "XCaliber",
                        "lastMailType": 101,
                        "lastMailDate": "2022-05-11T00:00:00",
                        "registryMake": "MAZD",
                        "color": "1",
                        "bodyStyle": "0",
                        "vehicleYearMonth": 0,
                        "plateExpireDate": "2020-03-05T00:00:00",
                        "settlementDate": "2022-02-21T00:00:00",
                        "settlementId": "5",
                        "microFilmNo": 50,
                        "financialInformation": [
                            {
                                "reductionAmount": 0,
                                "maxPenalty": 50,
                                "penalty": 150,
                                "totalDue": 160,
                                "paidToDate": 20
                            },
                            {
                                "reductionAmount": 0,
                                "maxPenalty": 50,
                                "penalty": 10,
                                "totalDue": 160,
                                "paidToDate": 20
                            }
                        ]
                    }
                }
            ]
        );
    }

}