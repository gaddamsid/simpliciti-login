import { randomInt } from 'crypto';
import { Observable, of } from 'rxjs';
import { AccountCode } from 'src/app/Models/account-code';
// import {AccountCode} from '../../Models/account-code';

const maxAccountCode = 12;
const newAccount = {
    "accountTypesID": 1,
        "contractID": 2,
        "createUserID": 1,
        "createDatetime": "2022-06-15T14:33:27.933",
        "updateUserID": 1,
        "updateDatetime": "2022-06-15T14:33:27.933",
        "intAccountNumber": 11,
        "extAccountNumber": 10,
        "accountFullName": "abc",
        "accountShortName": "abc2",
        "isDeleted": "N"
}

export class AccountCodeServiceStub{
    
    getaccountCodelist():Observable<AccountCode[]>{
        return of([
            {
                "accountTypesID": 14,
                "contractID": 2,
                "createUserID": 1,
                "createDatetime": "2022-06-07T11:00:49.273",
                "updateUserID": 1,
                "updateDatetime": "2022-06-07T11:00:49.273",
                "intAccountNumber": 1,
                "extAccountNumber": 1,
                "accountFullName": "In Person",
                "accountShortName": "Inper",
                "isDeleted": "N"
            },
            {
                "accountTypesID": 2,
                "contractID": 2,
                "createUserID": 1,
                "createDatetime": "2022-06-07T11:01:11.273",
                "updateUserID": 1,
                "updateDatetime": "2022-06-07T11:01:11.273",
                "intAccountNumber": 2,
                "extAccountNumber": 2,
                "accountFullName": "Lockbox",
                "accountShortName": "Lkbox",
                "isDeleted": "N"
            },
            {
                "accountTypesID": 3,
                "contractID": 2,
                "createUserID": 1,
                "createDatetime": "2022-06-07T11:01:32.983",
                "updateUserID": 1,
                "updateDatetime": "2022-06-07T11:01:32.983",
                "intAccountNumber": 3,
                "extAccountNumber": 3,
                "accountFullName": "OFFICE INFO SYS",
                "accountShortName": "OITS",
                "isDeleted": "N"
            },
            {
                "accountTypesID": 4,
                "contractID": 2,
                "createUserID": 1,
                "createDatetime": "2022-06-07T11:01:48.997",
                "updateUserID": 1,
                "updateDatetime": "2022-06-07T11:01:48.997",
                "intAccountNumber": 4,
                "extAccountNumber": 4,
                "accountFullName": "COLLECTION",
                "accountShortName": "COLL",
                "isDeleted": "N"
            },
            {
                "accountTypesID": 5,
                "contractID": 2,
                "createUserID": 1,
                "createDatetime": "2022-06-07T11:02:16.773",
                "updateUserID": 1,
                "updateDatetime": "2022-06-07T11:02:16.773",
                "intAccountNumber": 5,
                "extAccountNumber": 5,
                "accountFullName": "PAY-BY-PHONE",
                "accountShortName": "PHONE",
                "isDeleted": "N"
            },
            {
                "accountTypesID": 6,
                "contractID": 2,
                "createUserID": 1,
                "createDatetime": "2022-06-07T11:02:37.327",
                "updateUserID": 1,
                "updateDatetime": "2022-06-07T11:02:37.327",
                "intAccountNumber": 6,
                "extAccountNumber": 6,
                "accountFullName": "INTERNET PAYMNT",
                "accountShortName": "WEB",
                "isDeleted": "N"
            },
            {
                "accountTypesID": 7,
                "contractID": 2,
                "createUserID": 1,
                "createDatetime": "2022-06-07T11:02:58.597",
                "updateUserID": 1,
                "updateDatetime": "2022-06-07T11:02:58.597",
                "intAccountNumber": 7,
                "extAccountNumber": 7,
                "accountFullName": "DUNCAN IVR",
                "accountShortName": "DIVR",
                "isDeleted": "N"
            },
            {
                "accountTypesID": 8,
                "contractID": 2,
                "createUserID": 1,
                "createDatetime": "2022-06-07T11:03:17.697",
                "updateUserID": 1,
                "updateDatetime": "2022-06-07T11:03:17.697",
                "intAccountNumber": 8,
                "extAccountNumber": 8,
                "accountFullName": "DUNCAN PBW",
                "accountShortName": "DPBW",
                "isDeleted": "N"
            },
            {
                "accountTypesID": 12,
                "contractID": 2,
                "createUserID": 1,
                "createDatetime": "2022-06-15T07:12:05.897",
                "updateUserID": 1,
                "updateDatetime": "2022-06-15T07:12:05.897",
                "intAccountNumber": 9,
                "extAccountNumber": 9,
                "accountFullName": "Febin",
                "accountShortName": "al",
                "isDeleted": "N"
            },
            {
                "accountTypesID": 13,
                "contractID": 2,
                "createUserID": 1,
                "createDatetime": "2022-06-15T14:33:27.933",
                "updateUserID": 1,
                "updateDatetime": "2022-06-15T14:33:27.933",
                "intAccountNumber": 11,
                "extAccountNumber": 10,
                "accountFullName": "abc",
                "accountShortName": "abc2",
                "isDeleted": "N"
            }
        ])
    }

    getintAccounNumber():Observable<any>{
        return of({value: maxAccountCode});
    }
    addaccountCode():Observable<any>{
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    UpdateaccountCode():Observable<any>{
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    deleteaccountCode():Observable<any>{
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    getMaxIntNumber() : Number {
        return maxAccountCode; 
    }
}




    




