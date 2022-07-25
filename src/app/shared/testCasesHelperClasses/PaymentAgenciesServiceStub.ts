import { Observable } from 'rxjs';
import { of } from 'rxjs';

export class PaymentAgenciesServiceStub {
    public getAgency(): Observable<any[]> {
        return of(
            [
                {
                    active: true,
                    agenciesName: "Edit Name1",
                    paymentAgenciesID: 1,
                    paymentVendorsLink: "www.testedit.com",
                    paymentVendorsName: "AmazonPay"
                }
            ]
        );
    }
    public getPaymentVendor(): Observable<any[]> {
        return of(
            [
                {
                    paymentVendorsID: 2,
                    paymentVendorsName: "E-Tims"
                },
                {
                    paymentVendorsID: 3,
                    paymentVendorsName: "PAYPAL"
                },
                {
                    paymentVendorsID: 4,
                    paymentVendorsName: "AmazonPay"
                }
            ]
        );
    }
    public getWorkflowStates(): Observable<any[]> {
        return of(
            [
                {
                    active: true,
                    contractID: 2,
                    createDatetime: "2022-04-12T12:37:20.43",
                    createUserID: 1,
                    isAdminVoid: false,
                    isCourt: false,
                    isDeleted: "N",
                    isReIssue: false,
                    isStartingState: false,
                    restoreAmountDue: true,
                    showCalendarWidget: false,
                    updateDatetime: "2022-04-12T12:37:20.43",
                    updateUserID: 1,
                    workflowStateTypesID: 4,
                    workflowStatesID: 1,
                    workflowStatesName: "22. Returned check - Bounced"
                },
                {
                    active: true,
                    contractID: 2,
                    createDatetime: "2022-04-12T12:37:20.43",
                    createUserID: 1,
                    isAdminVoid: false,
                    isCourt: false,
                    isDeleted: "N",
                    isReIssue: false,
                    isStartingState: false,
                    restoreAmountDue: false,
                    showCalendarWidget: false,
                    updateDatetime: "2022-04-12T12:37:20.43",
                    updateUserID: 1,
                    workflowStateTypesID: 4,
                    workflowStatesID: 2,
                    workflowStatesName: "Admin Hold - 1 Day"
                }
            ]
        );
    }
    public getStates(): Observable<any[]> {
        return of(
            [
                {
                    abbreviation: "HI",
                    countriesID: 1,
                    stateProvincesID: 48,
                    stateProvincesName: "New Brunswick"
                },
                {
                    abbreviation: "MO",
                    countriesID: 1,
                    stateProvincesID: 48,
                    stateProvincesName: "Wisconsin"
                }
            ]
        );
    }
    public getPaymentAgencyById(): Observable<any[]> {
        return of(
            [
                {
                    active: true,
                    agenciesName: "Edit Name1",
                    city: "London",
                    comments: "testing",
                    contents: null,
                    contractID: 2,
                    createDatetime: "2022-07-05T07:09:47.01",
                    createUserID: 1,
                    fileName: null,
                    imageErrorMessage: "error",
                    isDeleted: "N",
                    logoLink: "",
                    maintenance: false,
                    payByWebClientsCode: "123",
                    paymentAgenciesID: 1,
                    paymentVendorsID: 4,
                    paymentVendorsLink: "www.testedit.com",
                    phone: "9876543210",
                    receiptWorkflowStatesID: 1,
                    stateProvincesID: 48,
                    streetLine1: "Black plain",
                    streetLine2: "",
                    updateDatetime: "2022-07-05T07:09:47.01",
                    updateUserID: 1,
                    velocityPaymentSettingsID: 1,
                    videoErrorMessage: "error",
                    zipCode: "76765"
                }
            ]
        );
    }
    public addAgency(data: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    public updateAgency(data: any, id: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }
    public toggleAgency(id: any): Observable<any> {
        return of({ status: 'Success', details: [{ code: '200' }] });
    }

}