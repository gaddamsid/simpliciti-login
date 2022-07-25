export interface IssuingAgencyModel {
		issuingAgencyId: number,
        agencyCode: number,
        agencyShortName: string,
        agencyLongName: string,
        agencyDistrict: number,
        agencyParkTktsPerBk: number,
        agencyMoveTktsPerBk: number,
        agencyStreetEnforceInd: string,
        agencyViolTableGroup: string,
        createUserId: number,
        createDatetime: string,
        updateUserId: number,
        updateDatetime: string,
        contractId: number
}