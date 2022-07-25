import { Observable } from 'rxjs';
import { of } from 'rxjs';

export class addTicketServiceStub {

    public getViolation(): Observable<any> {
			let entityObj = [{
				"entityDetails": {
				  "plateDetails": {
					"plateNumber": "VAUJJ5455",
					"vinNumber": " ",
					"plateExpireDate": "2022-07-14",
					"entityNumber": 35649499,
					"source": "Registry",
					"sourceDate": "2010-01-05",
					"accountEntityId": 102162
				  },
				  "ownerDetails": {
					"ownerName": "LALLY, NICHOLAS JOHN",
					"driverLicense": " ",
					"dateOfBirth": "2022-06-01T00:00:00",
					"address": {
					  "firstName": null,
					  "lastName": null,
					  "middleName": null,
					  "fullName": "LALLY, NICHOLAS JOHN",
					  "streetLine1": "14830 OLD FREDERICK RD.",
					  "streetLine2": " ",
					  "streetLine3": "",
					  "city": "VIRGINIA BEACH",
					  "state": "VA",
					  "zipCode": "234624415",
					  "phoneNumber": "0",
					  "email": ""
					},
					"ownershipStartDate": "2010-03-05"
				  },
				  "citationCount": {
					"openTickets": 2,
					"closedTickets": 0,
					"bootEligibleTickets": 0,
					"heldTickets": 0
				  },
				  "totalAmountDue": {
					"fines": 1715.25,
					"penalties": 10,
					"plateFees": 175,
					"payments": 389,
					"reductions": 0,
					"amountDue": 1511.25,
					"interests": 0
				  },
				  "status": {
					"notes": "",
					"indicators": ""
				  }
				},
			  }]
			return of(entityObj[0]);
    }
    public get(url: string, CW5type?: boolean): any {
        if (url == 'badgeNumber') {
			return of([
				{
					active: 1,
					badgeAgency: 10,
					badgeDivision: 1,
					badgeNumber: "009170",
					badgeNumberId: 377,
					badgeOfficerName: "D.K.",
					contractId: 2,
					createDatetime: "2022-05-20T12:06:20.54",
					createUserId: 1,
					isDeleted: "N",
					isUploaded: "Y",
					updateDatetime: "2022-05-20T12:06:20.54",
					updateUserId: 1
				}
			])
		}
        if (url == 'issuingAgency') {
			return of([
				{
					active: 1,
					agencyCode: 11,
					agencyDistrict: 21,
					agencyLongName: "Hyderabad",
					agencyMoveTktsPerBk: 23,
					agencyParkTktsPerBk: 22,
					agencyShortName: "India",
					agencyStreetEnforceInd: "A",
					agencyViolTableGroup: "B",
					contractId: 2,
					createDateTime: "2022-05-11T10:24:17.823",
					createUserId: 1,
					isDeleted: "N",
					issuingAgencyId: 2,
					updateDateTime: "2022-05-11T10:24:17.823",
					updateUserId: 1
				}
			])
		}
    }
    public postViolation(url: string, data: any): any {
        if(url == 'validateCitation'){
            return of({status: 'Success', details : [{code: '0000'}]});
        }
        else{
            return of({status: 'Success', details : [{code: '0000'}]});
        } 
    }
    // public updateBadgeNumber(id: any, data: any): Observable<any> {
    //     return of({status: 'Success'});
    // }
    // public deleteBadgeNumber(id: any): Observable<any> {
    //     return of({status: 'Success', details : [{code: '0000'}]});
    // }
}