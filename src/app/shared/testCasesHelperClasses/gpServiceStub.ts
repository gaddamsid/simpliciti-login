import { Observable } from 'rxjs';
import { of } from 'rxjs';
export class gpServiceStub {
	static get() {
		throw new Error('Method not implemented.');
	}

	public get(url: string, CW5type?: boolean): any {
		let sampleObj = {
			active: 1,
			createDatetime: "2022-06-09T07:41:09.28",
			createUserId: 1,
			isDeleted: "N",
			paymentTranTypesMasterId: 224,
			paymentTypesCode: "kb",
			paymentTypesIndicator: 2,
			paymentTypesName: "testsearc",
			paymentTypesOrderBy: 2,
			updateDatetime: "2022-06-09T07:41:09.28",
			updateUserId: 1
		}

		if(url == 'AdvanceSearch/getApprovingOfficers') {
			return of([
				{
					active: true,
					code: "Pc01",
					courtsID: 3,
					badgeOfficerName: "fggg",
					leadDays: 9,
					name: "Court Name",
					room: 3,
					streetLine1: "Fort Minor Road",
					streetLine2: "Fort Minor Road"
				}
			])
		}

		if(url == 'getEntityDetails/MD7EB3592') {
			return of({
				"entityDetails": {
				  "plateDetails": {
					"plateNumber": "MD7EB3592",
					"vinNumber": " ",
					"plateExpireDate": "2020-03-05",
					"entityNumber": 35665578,
					"source": "Registry",
					"sourceDate": "2010-01-05",
					"accountEntityId": 102187
				  },
				  "ownerDetails": {
					"ownerName": "HEUSER, ANNETTE",
					"driverLicense": " ",
					"dateOfBirth": "2022-06-01T00:00:00",
					"address": {
					  "firstName": null,
					  "lastName": null,
					  "middleName": null,
					  "fullName": "HEUSER, ANNETTE",
					  "streetLine1": "1553 44TH ST NW",
					  "streetLine2": " ",
					  "streetLine3": "",
					  "city": "SILVER SPRING",
					  "state": "MD",
					  "zipCode": "209101228",
					  "phoneNumber": "0",
					  "email": ""
					},
					"ownershipStartDate": "2010-03-05"
				  },
				  "citationCount": {
					"openTickets": 1,
					"closedTickets": 0,
					"bootEligibleTickets": 0,
					"heldTickets": 0
				  },
				  "totalAmountDue": {
					"fines": 150,
					"penalties": 10,
					"plateFees": 0,
					"payments": 160,
					"reductions": 0,
					"amountDue": 0,
					"interests": 0
				  },
				  "status": {
					"notes": "",
					"indicators": ""
				  }
				},
				"citationsSummary": [
				  {
					"citationsId": 106094,
					"citationNo": "D031687918",
					"violationDate": "2022-05-06T00:00:00.000+0000",
					"issuedDate": "2022-05-06T00:00:00.000+0000",
					"status": "Current Status",
					"locationDescription": "000-000-None",
					"fines": 150,
					"penalties": 10,
					"reduction": 0,
					"interest": 0,
					"payments": 160,
					"amountDue": 0,
					"events": "Previous Status"
				  }
				]
			  })
		}
		return of([sampleObj]);
	}
	
	public post(url: string, data: any, CW5type?: boolean): Observable<any> {
		return of({ status: 'Success', details: [{ code: '200' }] });
	}

	public put(url: string, data: any, CW5type?: boolean): Observable<any> {
		return of({ status: 'Success', details: [{ code: '200' }] });
	}

	public delete(url: string, id: any, CW5type?: boolean): Observable<any> {
		return of({ status: 'Success', details: [{ code: '200' }] });
	}
}
