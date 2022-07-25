export interface Entity {
    plateNo: string;
    name: string;
    effectiveDate: string | null;
    dateOfBirth: string | null;
    amountDue: string;
    addressDetails: AddressDetails;
    vehicleDetails: VehicleDetails;
    metadata: any;
    // added for merging the data
    addressInfo?: any
    vehicleInfo?: any
}
export interface AddressDetails {
    streetLine1: string;
    streetLine2: string;
    streetLine3: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}
export interface VehicleDetails {
    make: string;
    model: string;
    year: string;
    color: string;
}
