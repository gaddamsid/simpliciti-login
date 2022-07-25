import { Observable } from 'rxjs';
import { of } from 'rxjs';
export class QueuesApiserviceStub {
    public get(url: string, CW5type?: boolean): Observable<any> {
        if (url == 'Queues/getAllActiveQueues?ContractID=2') {
            return of(
                [
                    {
                        active: true,
                        ageThreshold: 0,
                        carryOverPreviousCategory: false,
                        contractID: 2,
                        coreImageDeleteEnabled: true,
                        coreImageEditEnabled: true,
                        coreImageRevertEnabled: true,
                        countThreshold: 0,
                        dmvHistoryEnabled: false,
                        dmvRequestThreshold: 0,
                        dmvReturnEnabled: false,
                        doubleBlindEnabled: false,
                        drcEnabled: false,
                        editRegisteredOwnerInformationEnabled: false,
                        editVehicleInformationEnabled: false,
                        enableCourtForPostIssuanceQueue: false,
                        enableLocalOfflinePrint: false,
                        enableRollbackNoticesQueue: false,
                        iCertifyDescription: null,
                        identifier: "clientreview",
                        imageSelectionEnabled: false,
                        isICertifyEnabled: false,
                        isVrLookup: false,
                        kvlEnabled: true,
                        licensePlateEditEnabled: true,
                        miskeyedPlateEnabled: false,
                        neighborListingEnabled: false,
                        plateExamplesEnabled: false,
                        previousDecisionEnabled: true,
                        queueOrder: 0,
                        queueTypesID: 3,
                        queuesID: 3,
                        queuesName: "Client Review",
                        registeredOwnerInformationEnabled: true,
                        showSelectedImagesEnabled: false,
                        skipEnabled: true,
                        statusEntranceThreshold: 0,
                        vehicleInformationEnabled: true,
                        videoFrameCaptureEnabled: true,
                        workflowStatesID: 6
                    }
                ]
            );
        }

        if (url == 'Queues/getActiveQueuesById?QueueID=1') {
            return of(
                {
                    active: false,
                    ageThreshold: 5,
                    carryOverPreviousCategory: false,
                    contractID: 2,
                    coreImageDeleteEnabled: false,
                    coreImageEditEnabled: false,
                    coreImageRevertEnabled: false,
                    countThreshold: 100,
                    dmvHistoryEnabled: true,
                    dmvRequestThreshold: 0,
                    dmvReturnEnabled: true,
                    doubleBlindEnabled: false,
                    drcEnabled: false,
                    editRegisteredOwnerInformationEnabled: true,
                    editVehicleInformationEnabled: true,
                    enableCourtForPostIssuanceQueue: false,
                    enableLocalOfflinePrint: false,
                    enableRollbackNoticesQueue: false,
                    iCertifyDescription: null,
                    identifier: "clientresearch",
                    imageSelectionEnabled: false,
                    isICertifyEnabled: false,
                    isVrLookup: false,
                    kvlEnabled: false,
                    licensePlateEditEnabled: false,
                    miskeyedPlateEnabled: false,
                    neighborListingEnabled: false,
                    plateExamplesEnabled: false,
                    previousDecisionEnabled: true,
                    queueOrder: 9,
                    queueTypesID: 3,
                    queuesID: 1,
                    queuesName: "Client Research",
                    registeredOwnerInformationEnabled: true,
                    showSelectedImagesEnabled: false,
                    skipEnabled: true,
                    statusEntranceThreshold: 10,
                    vehicleInformationEnabled: true,
                    videoFrameCaptureEnabled: false,
                    workflowStatesID: 5
                }
            )
        }

        if (url == 'Queues/getFirstEventsByQueuesId?QueuesID=1&UserID=1') {
            return of(
                {
                    eventCheckOutID: 248300,
                    eventsID: 49572
                }
            )
        }

        if (url == 'Queues/getEventsByQueuesId?QueuesID=1&UserID=1') {
            return of(
                [
                    {
                        eventCheckOutID: 248300,
                        eventsID: 49572
                    }
                ]
            );
        }

        if (url == 'Queues/getEntireQueueInfoByEventId?EventId=49572') {
            return of(
                {
                    getDmvHistoriesInfoByEventIdQueryResponse: [],
                    getNeighborsInfoByEventIdQueryResponse: [{ laneNumber: 1, statePlate: "VAUHN7971", stateProvincesName: "VA", eventsID: 43380 }],
                    getRegisterOwnerInfoByEventIdQueryResponse: {
                        businessName: null,
                        city: "ANNANDALE",
                        coOwnerDateOfBirth: null,
                        coOwnerLicenseNumber: "",
                        coOwnerName: "CHRISTIAN WILLIAM ZISSIMOS",
                        dateOfBirth: "1977-01-05T00:00:00",
                        eye: null,
                        firstName: "CHRISTIAN WILLIAM",
                        gendersID: null,
                        hair: "0",
                        height: "0",
                        lastName: "ZISSIMOS",
                        licenseClass: null,
                        licenseNumber: "",
                        licenseStateProvinceId: 1,
                        stateProvincesID: 6,
                        streetLine1: "322 WYE RD",
                        streetLine2: "",
                        streetLine3: "",
                        weight: 0,
                        zipCode: "220032106"
                    },
                    getVehicleInfoByEventIdQueryResponse: {
                        bodyStyle: "0",
                        color: "1",
                        make: "0",
                        statePlate: "VATYW8892",
                        vehicleModel: "",
                        vehicleRecordsID: 6193,
                        vehicleTypesID: 1,
                        vehicleYearMonth: 0,
                        vinNumber: " "
                    },
                    getViolationImageInfoByEventIdQueryResponse: [],
                    getWorkFlowInfoByEventIdQueryResponse: {
                        actionsId: 1,
                        actionsName: "update action name 2345",
                        categoryID: 1,
                        categoryName: "Accept",
                        sectionsID: 5,
                        statePlate: "VATYW8892",
                        stateProvincesID: 6,
                        weatherTypesID: 1
                    }
                }
            );
        }

        if(url == 'Categories/getCategoriesById?ContractID=2') {
            return of([])
        }

        if(url == 'Actions/getAllActions?ContractID=2') {
            return of([])
        }
        return of(
            [
                {
                    eventCheckOutID: 248300,
                    eventsID: 49572
                }
            ]
        );
    }
    public post(data: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    public put(data: any, id: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    public delete(id: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    public deletepl(id: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    public arDelete(id: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }

}