import { Address } from 'cluster';
import { Observable, of } from 'rxjs';
// import { AddressSourceModel } from 'src/app/Models/Address Source/address-source-model';

const addressList:any[] = [
    {
        "addressSourceId": 116,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-01T17:12:55.36",
        "updateDatetime": "2022-06-01T17:12:55.36",
        "addressSourceCod": "M",
        "addressSourceDescription": "Manual",
        "active": 0
    },
    {
        "addressSourceId": 117,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-01T17:13:10.337",
        "updateDatetime": "2022-06-01T17:13:10.337",
        "addressSourceCod": "O",
        "addressSourceDescription": "NCOA",
        "active": 0
    },
    {
        "addressSourceId": 118,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-01T17:13:32.83",
        "updateDatetime": "2022-06-01T17:13:32.83",
        "addressSourceCod": "R",
        "addressSourceDescription": "Registry",
        "active": 0
    },
    {
        "addressSourceId": 119,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-01T17:13:42.483",
        "updateDatetime": "2022-06-01T17:13:42.483",
        "addressSourceCod": "T",
        "addressSourceDescription": "Telephone",
        "active": 0
    },
    {
        "addressSourceId": 120,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-03T06:06:29.513",
        "updateDatetime": "2022-06-03T06:06:29.513",
        "addressSourceCod": "E",
        "addressSourceDescription": "Experian",
        "active": 0
    },
    {
        "addressSourceId": 121,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-03T06:03:41.12",
        "updateDatetime": "2022-06-03T06:03:41.12",
        "addressSourceCod": "F",
        "addressSourceDescription": "Fleet",
        "active": 0
    },
    {
        "addressSourceId": 122,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-03T06:04:09.253",
        "updateDatetime": "2022-06-03T06:04:09.253",
        "addressSourceCod": "C",
        "addressSourceDescription": "Correspondence",
        "active": 0
    },
    {
        "addressSourceId": 123,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-03T06:04:27.03",
        "updateDatetime": "2022-06-03T06:04:27.03",
        "addressSourceCod": "I",
        "addressSourceDescription": "Incomplete",
        "active": 0
    },
    {
        "addressSourceId": 124,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-03T06:04:45.277",
        "updateDatetime": "2022-06-03T06:04:45.277",
        "addressSourceCod": "A",
        "addressSourceDescription": "Accurint",
        "active": 0
    },
    {
        "addressSourceId": 125,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-03T06:04:59.833",
        "updateDatetime": "2022-06-03T06:04:59.833",
        "addressSourceCod": "S",
        "addressSourceDescription": "Swap",
        "active": 0
    },
    {
        "addressSourceId": 126,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-03T06:05:30.793",
        "updateDatetime": "2022-06-03T06:05:30.793",
        "addressSourceCod": "P",
        "addressSourceDescription": "Installment Plan",
        "active": 0
    },
    {
        "addressSourceId": 127,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-03T06:05:56.847",
        "updateDatetime": "2022-06-03T06:05:56.847",
        "addressSourceCod": "V",
        "addressSourceDescription": "Abandon Vehicle",
        "active": 0
    },
    {
        "addressSourceId": 128,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-03T06:06:50.293",
        "updateDatetime": "2022-06-03T06:06:50.293",
        "addressSourceCod": "L",
        "addressSourceDescription": "License",
        "active": 0
    },
    {
        "addressSourceId": 129,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-03T06:07:05.98",
        "updateDatetime": "2022-06-03T06:07:05.98",
        "addressSourceCod": "Z",
        "addressSourceDescription": "USPS",
        "active": 0
    },
    {
        "addressSourceId": 130,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-03T06:08:04.683",
        "updateDatetime": "2022-06-03T06:08:04.683",
        "addressSourceCod": "EM",
        "addressSourceDescription": "Email",
        "active": 0
    }
]

const newAddress: any = {
    "addressSourceId": 135,
    "contractId": 2,
    "createUserId": 1,
    "updateUserId": 1,
    "createDatetime": "2022-06-01T17:12:55.36",
    "updateDatetime": "2022-06-01T17:12:55.36",
    "addressSourceCod": "M",
    "addressSourceDescription": "Manual",
    "active": 0
}

export class AddressSourceServiceStub{

    getAddressSourceList():Observable<any[]>
    {
        return of(addressList)
    }
    addAddressToSourceList():Observable<any>
    {
        return of(newAddress);
    }
    addAddressList(url: string, data: any, CW5type?: boolean): Observable<any> {
		return of({ status: 'Success', details: [{ code: '200' }] });
	}
    getAddressList(): Observable<any> {
        return of(addressList)
	}
    deleteAddress(url: string, data: any, CW5type?: boolean): Observable<any> {
		return of({ status: 'Success', details: [{ code: '200' }] });
	}
    UpdateAddress(url: string, data: any, CW5type?: boolean): Observable<any> {
		return of({ status: 'Success', details: [{ code: '200' }] });
	}
    updateAddressInSourceList(): Observable<any>
    {
        return of(newAddress);
    }
    deleteAddressInSourceList(): Observable<any>
    {
        return of(newAddress);
    }
}