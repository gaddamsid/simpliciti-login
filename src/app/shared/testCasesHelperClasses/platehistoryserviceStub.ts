import { Observable } from 'rxjs';
import { of } from 'rxjs';

let data = [{
    "customerInformation": {
      "firstName": "Sweet",
      "lastName": "Delli",
      "addressLine1": "maxima",
      "addressLine2": "dilli ",
      "city": "NewRock",
      "state": "North Carolina",
      "zip": "21913",
      "country": "U.S.A",
      "status": "status",
      "email": "",
      "entityNumber": "F144560432",
      "corporateIndicator": "Corporate Indicator",
      "ssn": "0",
      "dob": "1977-01-05T00:00:00",
      "driverLicense": " ",
      "ticketType": "TicketType",
      "reasonInHistory": "Reason in History",
      "ticketCausedHistory": "TicketCausedHistory",
      "movedToHistory": "MovedToHistory"
    },
    "registryInformation": {
      "plateNumber": "VAUHN7971",
      "effectiveDate": "2010-01-05",
      "plateType": " ",
      "oldPlateType": "Old Plate Type",
      "effectiveDateSource": "T",
      "plateOwnershipDate": "2010-03-05",
      "plateExpirationDate": "2022-07-08",
      "vin": " ",
      "addressStatus": "status",
      "lastRequestedOn": "2022-07-08T08:05:06.568",
      "processedOn": "2022-07-08",
      "confirmedOn": "2022-07-08",
      "combineAction": "CombineAction",
      "combineDate": "2022-07-08",
      "combineUserId": "123",
      "nixieStatus": "0",
      "nixieDate": "2022-07-08"
    }
  }]


export class plateHistoryServicesStub {

    public get(url: string, CW5type?: boolean): any {
            return of(data);
    }


}