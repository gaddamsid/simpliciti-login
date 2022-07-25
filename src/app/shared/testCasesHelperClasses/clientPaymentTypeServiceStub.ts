import { Address } from 'cluster';
import { Observable, of } from 'rxjs';
// import { AddressSourceModel } from 'src/app/Models/Address Source/address-source-model';

const clientPatymentList: any[] = [
    {
        "paymentModeId": 1,
        "paymentModeMasterId": 161,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-16T16:56:23.34",
        "updateDatetime": "2022-06-16T16:56:23.34",
        "paymentModeDesc": "CASH - BOND",
        "paymentModeCD": "CB",
        "paymentModeNCR": 2,
        "paymentOpenDrawer": "Y",
        "active": 1,
        "isDeleted": "N"
    },
    {
        "paymentModeId": 2,
        "paymentModeMasterId": 160,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-16T16:56:35.77",
        "updateDatetime": "2022-06-16T16:56:35.77",
        "paymentModeDesc": "CASH",
        "paymentModeCD": "CA",
        "paymentModeNCR": 2,
        "paymentOpenDrawer": "Y",
        "active": 1,
        "isDeleted": "N"
    },
    {
        "paymentModeId": 3,
        "paymentModeMasterId": 162,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-16T16:56:44.307",
        "updateDatetime": "2022-06-16T16:56:44.307",
        "paymentModeDesc": "CREDIT CARD",
        "paymentModeCD": "CC",
        "paymentModeNCR": 2,
        "paymentOpenDrawer": "Y",
        "active": 1,
        "isDeleted": "N"
    },
    {
        "paymentModeId": 4,
        "paymentModeMasterId": 164,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-16T16:56:55.6",
        "updateDatetime": "2022-06-16T16:56:55.6",
        "paymentModeDesc": "CHECK",
        "paymentModeCD": "CK",
        "paymentModeNCR": 2,
        "paymentOpenDrawer": "Y",
        "active": 1,
        "isDeleted": "N"
    },
    {
        "paymentModeId": 5,
        "paymentModeMasterId": 166,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDatetime": "2022-06-16T16:57:22.59",
        "updateDatetime": "2022-06-16T16:57:22.59",
        "paymentModeDesc": "DEBIT CARD",
        "paymentModeCD": "DC",
        "paymentModeNCR": 2,
        "paymentOpenDrawer": "Y",
        "active": 1,
        "isDeleted": "N"
    }
]

const clientPaymentMode: any[] = [
    {
        "paymentModeMasterId": 160,
        "createUserId": 1,
        "updateUserId": 1,
        "createDateTime": "2022-06-23T10:41:25.977",
        "updateDateTime": "2022-06-23T10:41:25.977",
        "paymentModeDesc": "CASH",
        "paymentModeCD": "CA",
        "active": 1,
        "isDeleted": "N",
        "posCode": 1
    },
    {
        "paymentModeMasterId": 161,
        "createUserId": 1,
        "updateUserId": 1,
        "createDateTime": "2022-06-23T10:41:36.68",
        "updateDateTime": "2022-06-23T10:41:36.68",
        "paymentModeDesc": "CASH - BOND",
        "paymentModeCD": "CB",
        "active": 1,
        "isDeleted": "N",
        "posCode": 2
    },
    {
        "paymentModeMasterId": 162,
        "createUserId": 1,
        "updateUserId": 1,
        "createDateTime": "2022-06-23T10:41:45.93",
        "updateDateTime": "2022-06-23T10:41:45.93",
        "paymentModeDesc": "CREDIT CARD",
        "paymentModeCD": "CC",
        "active": 1,
        "isDeleted": "N",
        "posCode": 3
    },
    {
        "paymentModeMasterId": 163,
        "createUserId": 1,
        "updateUserId": 1,
        "createDateTime": "2022-06-23T10:41:53.817",
        "updateDateTime": "2022-06-23T10:41:53.817",
        "paymentModeDesc": "CASHIER'S CHECK",
        "paymentModeCD": "CH",
        "active": 1,
        "isDeleted": "N",
        "posCode": 4
    },
    {
        "paymentModeMasterId": 164,
        "createUserId": 1,
        "updateUserId": 1,
        "createDateTime": "2022-06-23T10:42:00.803",
        "updateDateTime": "2022-06-23T10:42:00.803",
        "paymentModeDesc": "CHECK",
        "paymentModeCD": "CK",
        "active": 1,
        "isDeleted": "N",
        "posCode": 5
    },
    {
        "paymentModeMasterId": 165,
        "createUserId": 1,
        "updateUserId": 1,
        "createDateTime": "2022-06-23T10:42:07.423",
        "updateDateTime": "2022-06-23T10:42:07.423",
        "paymentModeDesc": "CHEQUES",
        "paymentModeCD": "CQ",
        "active": 1,
        "isDeleted": "N",
        "posCode": 6
    },
    {
        "paymentModeMasterId": 166,
        "createUserId": 1,
        "updateUserId": 1,
        "createDateTime": "2022-06-23T10:42:14.853",
        "updateDateTime": "2022-06-23T10:42:14.853",
        "paymentModeDesc": "DEBIT CARD",
        "paymentModeCD": "DC",
        "active": 1,
        "isDeleted": "N",
        "posCode": 7
    },
    {
        "paymentModeMasterId": 167,
        "createUserId": 1,
        "updateUserId": 1,
        "createDateTime": "2022-06-23T10:42:35.147",
        "updateDateTime": "2022-06-23T10:42:35.147",
        "paymentModeDesc": "CHECK - BOND",
        "paymentModeCD": "KB",
        "active": 1,
        "isDeleted": "N",
        "posCode": 6
    },
    {
        "paymentModeMasterId": 168,
        "createUserId": 1,
        "updateUserId": 1,
        "createDateTime": "2022-06-23T10:42:52.463",
        "updateDateTime": "2022-06-23T10:42:52.463",
        "paymentModeDesc": "MON ORD - BOND",
        "paymentModeCD": "MB",
        "active": 1,
        "isDeleted": "N",
        "posCode": 8
    },
    {
        "paymentModeMasterId": 169,
        "createUserId": 1,
        "updateUserId": 1,
        "createDateTime": "2022-06-23T10:42:45.883",
        "updateDateTime": "2022-06-23T10:42:45.883",
        "paymentModeDesc": "MONEY ORDER",
        "paymentModeCD": "MO",
        "active": 1,
        "isDeleted": "N",
        "posCode": 8
    },
    {
        "paymentModeMasterId": 170,
        "createUserId": 1,
        "updateUserId": 1,
        "createDateTime": "2022-06-23T10:43:01.26",
        "updateDateTime": "2022-06-23T10:43:01.26",
        "paymentModeDesc": "NON CASH ENTRY",
        "paymentModeCD": "NC",
        "active": 1,
        "isDeleted": "N",
        "posCode": 0
    },
    {
        "paymentModeMasterId": 171,
        "createUserId": 1,
        "updateUserId": 1,
        "createDateTime": "2022-06-23T10:43:14.727",
        "updateDateTime": "2022-06-23T10:43:14.727",
        "paymentModeDesc": "CRED CRD - BOND",
        "paymentModeCD": "RB",
        "active": 1,
        "isDeleted": "N",
        "posCode": 3
    },
    {
        "paymentModeMasterId": 172,
        "createUserId": 1,
        "updateUserId": 1,
        "createDateTime": "2022-06-23T10:43:40.473",
        "updateDateTime": "2022-06-23T10:43:40.473",
        "paymentModeDesc": "TRAVELERS CHECK",
        "paymentModeCD": "TC",
        "active": 1,
        "isDeleted": "N",
        "posCode": 4
    },
    {
        "paymentModeMasterId": 173,
        "createUserId": 1,
        "updateUserId": 1,
        "createDateTime": "2022-06-23T10:43:49.183",
        "updateDateTime": "2022-06-23T10:43:49.183",
        "paymentModeDesc": "WORK CREDIT",
        "paymentModeCD": "WC",
        "active": 1,
        "isDeleted": "N",
        "posCode": 9
    }
]

const newobj: any = {
    "paymentModeId": 1,
    "paymentModeMasterId": 161,
    "contractId": 2,
    "createUserId": 1,
    "updateUserId": 1,
    "createDatetime": "2022-06-16T16:56:23.34",
    "updateDatetime": "2022-06-16T16:56:23.34",
    "paymentModeDesc": "CASH - BOND",
    "paymentModeCD": "CB",
    "paymentModeNCR": 2,
    "paymentOpenDrawer": "Y",
    "active": 1,
    "isDeleted": "N"
}

const clientPayment = [{
    "contractId": 2,
    "createUserId": 1,
    "updateUserId": 1,
    "active": 1,
    "isDeleted": "N",
    "createDatetime": "2022-06-16T16:56:23.34",
    "updateDatetime": "2022-06-16T16:56:23.34",
    "paymentSourceShortName": "test",
    "paymentSourceLongName": "test",
    "acctNumberInt": 20
}];

const clientPaymentMaster = [{
    "contractId": 2,
    "createUserId": 1,
    "updateUserId": 1,
    "active": 1,
    "isDeleted": "N",
    "createDatetime": "2022-06-16T16:56:23.34",
    "updateDatetime": "2022-06-16T16:56:23.34",
    "paymentSourceMasterShortName": "test",
    "paymentSourceMasterLongName": "test",
    "acctNumberInt": 20,
    "paymentSourceId": 1
}]

export class ClientPaymentTypeServiceStub {

    getPaymentDetails(): Observable<any[]> {
        return of(clientPatymentList)
    }

    getclientPayment(): Observable<any[]> {
        return of(clientPayment)
    }

    getclientPaymentMaster(): Observable<any[]> {
        return of(clientPaymentMaster)
    }

    addClientPaymentType(): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }

    updateClientPaymentType(): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }

    deleteClientPaymentType(): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }

    getPaymentMethod(): Observable<any> {
        return of(clientPaymentMode);
    }
    addTickettypeList(): Observable<any> {
        return of(newobj);
    }
    UpdateTicketType(): Observable<any> {
        return of(newobj);
    }
    deleteTicketType(): Observable<any> {
        return of(newobj);
    }
}