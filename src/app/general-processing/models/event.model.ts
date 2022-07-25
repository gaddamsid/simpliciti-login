export interface EventData {
    amountDue: number;
    category: string;
    deploymentId: number;
    eventId: number;
    laneNumber: number;
    locationCode: string;
    locationDescription: string;
    status: string;
    violationDateTime: string | null;
}