

export interface ViolatioDetailResult {
    description: string,
    violationCode: number,
    issueDate: string,
    location: string,
    issuingOfficer: string,
    relatedViolations: string
}

export interface PaymentDetailResult {
    fine: number,
    penalty1: number,
    penalty2: number,
    penalty3: number,
    penalty4: number,
    penalty5: number,
    reduction: number,
    interest: number,
    batchNumber: number,
    type: string,
    account: null,
    processDate: string,
    paymentDept: null,
    method: null,
    amount: number,
    refundCheckNumber: null,
    reapplySource: null
}


export interface NameAndAddressDetail {
    firstName: string,
    lastName: string,
    fullAddress: string,
    city: string,
    zip: string,
    dateofBirth: string,
    lastUpdated: string,
    registrationExpiration: string,
    effectiveDate: string,
    addressSource: string,
    phoneNumber: number,
    email: string,
    san: number,
    state: string
}

export interface CitationDetailResult {
    agency: string,
    make: string,
    model: string,
    bodyStyle: string,
    vehicleYear: number,
    badge: string,
    division: string,
    beat: null,
    color: string,
    type: string,
    plate: string,
    registrationExpiration: null,
    parkingPermitNumber: null,
    meter: string,
    speedZone: number,
    speedActual: number,
    overWeight: number,
    hazardIndicator: null,
    accidentNumber: null,
    plateYear: number,
    plateColor: null
}

export interface ProcessingDetailResult {
    addedtoeTims: string,
    batchDate: string,
    batchNumber: number,
    microfilmNumber: number,
    backlogCode: string,
    nextEvent: string,
    holdStatus: number,
    holdProcessDate: string
}


export interface assetModel {
    active: boolean,
    assetDescriptorTypesID: number,
    assetTypesID: number,
    assetsID: number,
    assetsLocation: string,
    contractID: number,
    name: string,
    selectedForQueue: boolean,
    type: string
}

export interface eventImages {
    assetModel: assetModel;
    citationId: number,
    eventId: string,
}
export interface GalleryDetails {
    layoutType: number
    citationSearchResponse: CitationSearchResponse;
    eventImages: null;
}

export interface CitationSearchResponse {
    violatioDetailResult: ViolatioDetailResult;
    paymentDetailResult: PaymentDetailResult;
    nameAndAddressDetail: NameAndAddressDetail;
    citationDetailResult: CitationDetailResult;
    processingDetailResult: ProcessingDetailResult;
}

export interface CustomGalleryLayout {
    citation: string;
    citationHeight: number;
    contractId: number;
    functional: string;
    image: string;
    imageHeight: number;
    layoutType: string;
    nameAddress: string;
    nameAddressHeight: number;
    payementHeight: number;
    payments: string;
    processing: string;
    processingHeight: number;
    userId: number;
    violation: string;
    violationHeight: number;
}