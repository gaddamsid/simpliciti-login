export interface PlateDetails {
  entityNumber: any;
  plateExpireDate: any;
  plateNumber: any;
  source: any;
  sourceDate: any | null;
  vinNumber: any;
  accountEntityId: any;
}
export interface CitationsSummary {
  amountDue: any;
  citationNo: any;
  citationsId?: any;
  events: any;
  fines: number;
  interest: number;
  issuedDate: any;
  locationDescription: any;
  payments: number;
  penalties: number;
  reduction: number;
  status: any;
  violationDate: any;
  courtScheduleId: number;
}
export interface CitationCount {
  bootEligibleTickets: number;
  closedTickets: number;
  heldTickets: number;
  openTickets: number;
  totalTickets: number;
}

export interface totalAmountDue {
  amountDue: number;
  fines: number;
  payments: number;
  penalties: number;
  interests:any;
  plateFees: number;
  reductions: number;
}
export interface Address {
  city: any;
  email:any;
  firstName: any;
  fullName: any;
  lastName: any;
  mobile:any;
  phoneNumber: any;
  state: any;
  streetLine1: any;
  streetLine2: any;
  streetLine3: any;
  zipCode: any;
}
export interface OwnerDetails {
  ownerName: any;
  driverLicense: any;
  dateOfBirth: any;
  address: Address;
  ownershipStartDate: any;
}
export interface Status {
  notes: any;
  indicators: any;
}
export interface EntityDetail{
  plateDetails: PlateDetails;
  ownerDetails: OwnerDetails;
  totalAmountDue: totalAmountDue;
  citationCount: CitationCount;
  status: Status;
}
export interface EntityDetails {
  plateDetails: PlateDetails;
  ownerDetails: OwnerDetails;
  totalAmountDue: totalAmountDue;
  citationCount: CitationCount;
  status: Status1;
}
export interface Status1 {
  notes: any;
  CBFraud:any;
  PrevMarked:any;
  DMVHold:any;
}
export interface Layout {
    contractId: number,
    userId: number,
    functional: string;
    layoutType: string;
    image: string;
    violation: string;
    citation: string;
    nameAddress: string;
    processing: string;
    payments: string;
    imageHeight: number,
    violationHeight: number,
    citationHeight: number,
    nameAddressHeight: number,
    processingHeight: number,
    payementHeight: number
}