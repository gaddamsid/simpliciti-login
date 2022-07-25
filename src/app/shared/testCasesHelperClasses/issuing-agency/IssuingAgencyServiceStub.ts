import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { IssuingAgencyService } from 'src/app/Services/IssuingAgency/issuing-agency.service';
import { issuingAgencyMock } from './issuingAgencyMock';
export class IssuingAgencyServiceStub
{
    getIssuingAgency():Observable<any>{
        return of({
          active: 0,
          agencyCode: 20,
          agencyDistrict: 33,
          agencyLongName: "Kriti",
          agencyMoveTktsPerBk: 7,
          agencyParkTktsPerBk: 6,
          agencyShortName: "Roy",
          agencyStreetEnforceInd: "A",
          agencyViolTableGroup: "B"
        });
      }

      addIssuingAgencylist(data:any):Observable<any>{
        return of(
          {
            data: {
              active: 1,
              agencyCode: 20,
              agencyDistrict: 33,
              agencyLongName: "Kriti",
              agencyMoveTktsPerBk: 7,
              agencyParkTktsPerBk: 6,
              agencyShortName: "Roy",
              agencyStreetEnforceInd: "A",
              agencyViolTableGroup: "B",
              contractId: 2,
              createDateTime: "2022-07-11T14:39:35.202",
              createUserId: 1,
              isDeleted: "N",
              issuingAgencyId: 54,
              updateDateTime: "2022-07-11T14:39:35.202",
              updateUserId: 1
            },
            details: [
              {
                fieldName: "", code: "0000", message: "Save Success"
              }
              ],
            developerMessage: "Response Returned Successfully.",
            status: "Success",
            timeStamp: "2022-07-11T14:39:35.251"
          }
          );
      }

      updateIssuingAgency(id:any,data:any):Observable<any>{
     
        return of(
          {
            data: {
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
            },
    details: [{fieldName: "", code: "1", message: "Update Success"}],
    developerMessage: "Response Returned Successfully.",
    status: "Success",
    timeStamp: "2022-07-16T10:21:51.851"
          }
          );
      }

      deleteIssuingAgency(data:any):Observable<any>{
        return of
        (
          {
            "status": "Success",
            "timeStamp": "2022-07-11T14:22:36.209",
            "developerMessage": "Response Returned Successfully.",
            "details": [
                {
                    "fieldName": "",
                    "code": "1",
                    "message": "Delete  Success"
                }
            ],
            "data": null
        }
          );
      }
}
