import { Address } from 'cluster';
import { Observable, of } from 'rxjs';
// import { AddressSourceModel } from 'src/app/Models/Address Source/address-source-model';

const assetMappingList:any[] = [
    {
        "contractId": 2,
        "assetTypesID": 9,
        "assetTypesName": "Rear 1",
        "isSelected": true,
        "isDeleted": "N",
        "ordinalPosition": 1
    },
    {
        "contractId": 2,
        "assetTypesID": 8,
        "assetTypesName": "Front 2",
        "isSelected": true,
        "isDeleted": "N",
        "ordinalPosition": 2
    },
    {
        "contractId": 2,
        "assetTypesID": 29,
        "assetTypesName": "Front 8",
        "isSelected": true,
        "isDeleted": "N",
        "ordinalPosition": 3
    },
    {
        "contractId": 2,
        "assetTypesID": 21,
        "assetTypesName": "Front 9",
        "isSelected": true,
        "isDeleted": "N",
        "ordinalPosition": 4
    },
    {
        "contractId": 2,
        "assetTypesID": 20,
        "assetTypesName": "Make",
        "isSelected": true,
        "isDeleted": "N",
        "ordinalPosition": 5
    },
    {
        "contractId": 2,
        "assetTypesID": 7,
        "assetTypesName": "Front 1",
        "isSelected": true,
        "isDeleted": "N",
        "ordinalPosition": 6
    },
    {
        "contractId": 2,
        "assetTypesID": 1,
        "assetTypesName": "Front 12",
        "isSelected": true,
        "isDeleted": "N",
        "ordinalPosition": 7
    },
    {
        "contractId": 2,
        "assetTypesID": 3,
        "assetTypesName": "Rear 5",
        "isSelected": true,
        "isDeleted": "N",
        "ordinalPosition": 8
    },
    {
        "contractId": 2,
        "assetTypesID": 33,
        "assetTypesName": "Rear 3",
        "isSelected": true,
        "isDeleted": "N",
        "ordinalPosition": 9
    },
    {
        "contractId": 2,
        "assetTypesID": 27,
        "assetTypesName": "Front 3",
        "isSelected": true,
        "isDeleted": "N",
        "ordinalPosition": 10
    },
    {
        "contractId": 2,
        "assetTypesID": 2,
        "assetTypesName": "Front 11",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 11
    },
    {
        "contractId": 2,
        "assetTypesID": 4,
        "assetTypesName": "Rear 8",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 12
    },
    {
        "contractId": 2,
        "assetTypesID": 5,
        "assetTypesName": "Front 4",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 13
    },
    {
        "contractId": 2,
        "assetTypesID": 6,
        "assetTypesName": "Front 10",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 14
    },
    {
        "contractId": 2,
        "assetTypesID": 10,
        "assetTypesName": "Rear 2",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 15
    },
    {
        "contractId": 2,
        "assetTypesID": 11,
        "assetTypesName": "Video",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 16
    },
    {
        "contractId": 2,
        "assetTypesID": 12,
        "assetTypesName": "Video Snapshot",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 17
    },
    {
        "contractId": 2,
        "assetTypesID": 13,
        "assetTypesName": "Override Front 1",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 18
    },
    {
        "contractId": 2,
        "assetTypesID": 14,
        "assetTypesName": "Override Front 2",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 19
    },
    {
        "contractId": 2,
        "assetTypesID": 15,
        "assetTypesName": "Override Rear 1",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 20
    },
    {
        "contractId": 2,
        "assetTypesID": 16,
        "assetTypesName": "Override Rear 2",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 21
    },
    {
        "contractId": 2,
        "assetTypesID": 17,
        "assetTypesName": "Rear 7",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 22
    },
    {
        "contractId": 2,
        "assetTypesID": 18,
        "assetTypesName": "Face",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 23
    },
    {
        "contractId": 2,
        "assetTypesID": 19,
        "assetTypesName": "Plate",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 24
    },
    {
        "contractId": 2,
        "assetTypesID": 22,
        "assetTypesName": "Rear 4",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 25
    },
    {
        "contractId": 2,
        "assetTypesID": 23,
        "assetTypesName": "Rear 12",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 26
    },
    {
        "contractId": 2,
        "assetTypesID": 24,
        "assetTypesName": "Front 5",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 27
    },
    {
        "contractId": 2,
        "assetTypesID": 25,
        "assetTypesName": "Front 6",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 28
    },
    {
        "contractId": 2,
        "assetTypesID": 26,
        "assetTypesName": "Front 7",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 29
    },
    {
        "contractId": 2,
        "assetTypesID": 28,
        "assetTypesName": "Rear 9",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 30
    },
    {
        "contractId": 2,
        "assetTypesID": 30,
        "assetTypesName": "Rear 10",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 31
    },
    {
        "contractId": 2,
        "assetTypesID": 31,
        "assetTypesName": "Rear 11",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 32
    },
    {
        "contractId": 2,
        "assetTypesID": 32,
        "assetTypesName": "Rear 6 ",
        "isSelected": false,
        "isDeleted": "N",
        "ordinalPosition": 33
    }
]

const newAssetObj: any = 
    {
        "contractId": 2,
        "assetTypesID": 9,
        "assetTypesName": "Rear 1",
        "isSelected": true,
        "isDeleted": "N",
        "ordinalPosition": 1
    }

export class AssetMappingsServiceStub{

    getAddressSourceList():Observable<any[]>
    {
        return of(assetMappingList)
    }
    addAddressToSourceList():Observable<any>
    {
        return of(newAssetObj);
    }
    updateAddressInSourceList(): Observable<any>
    {
        return of(newAssetObj);
    }
    deleteAddressInSourceList(): Observable<any>
    {
        return of(newAssetObj);
    }
}