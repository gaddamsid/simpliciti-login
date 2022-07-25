import { of,Observable } from "rxjs";
const obj = {
  "jurisdictionsID": 128, "contractID": 1, "active": true, "jurisdictionsName": "Bronx", "jurisdictionCode": "1000", "jurisdictionsDmvCode": "11", "createUserID": 0, "updateUserID": 0, "createDatetime": "2022-05-20T12:03:46.29", "updateDatetime": "2022-05-20T12:03:46.29", "isDeleted": "N"
}
export class JurisdictionServiceStub{
  
    getAllJurisdictions():Observable<any> {
      return of(
        [
          {
            "jurisdictionsID": 128, "contractID": 1, "active": true, "jurisdictionsName": "Bronx", "jurisdictionCode": "1000", "jurisdictionsDmvCode": "11", "createUserID": 0, "updateUserID": 0, "createDatetime": "2022-05-20T12:03:46.29", "updateDatetime": "2022-05-20T12:03:46.29", "isDeleted": "N"
          },
          {
            "jurisdictionsID": 129, "contractID": 2, "active": true, "jurisdictionsName": "ddwed", "jurisdictionCode": "4", "jurisdictionsDmvCode": "jndd  ", "createUserID": 0, "updateUserID": 0, "createDatetime": "2022-05-27T07:45:16.3", "updateDatetime": "2022-05-27T07:45:16.3", "isDeleted": "N"
          },
          {
            "jurisdictionsID": 130, "contractID": 2, "active": true, "jurisdictionsName": "3233444ff@aB  --", "jurisdictionCode": "10", "jurisdictionsDmvCode": "dddfxc333         ", "createUserID": 0, "updateUserID": 0, "createDatetime": "2022-05-27T07:52:59.4", "updateDatetime": "2022-05-27T07:52:59.4", "isDeleted": "N"
          },
          {
            "jurisdictionsID": 131, "contractID": 2, "active": true, "jurisdictionsName": "ddwed", "jurisdictionCode": "5", "jurisdictionsDmvCode": "jndd  ", "createUserID": 0, "updateUserID": 0, "createDatetime": "2022-05-27T07:53:30.71", "updateDatetime": "2022-05-27T07:53:30.71", "isDeleted": "N"
          },
        ]
      );
      }
      addJurisdictions(body:any) {
      let  JuridictionModel={
        active: true,
        contractID: 1,
        jurisdictionCode: 6,
        jurisdictionsDmvCode: "5666",
        jurisdictionsID: 0,
        jurisdictionsName: "Juris"
      }
        return of({data: {
        active: true,
        contractID: 1,
        jurisdictionCode: "6",
        jurisdictionsDmvCode: "5666",
        jurisdictionsID: 155,
        jurisdictionsName: "Juris"
        },
        details: [{fieldName: null, code: "0000", message: "Inserted", fieldType: null}],
        developerMessage: "Inserted",
        status: "Success",
        timeStamp: "2022-07-15T16:37:19.9511093+00:00"});
      }
      updateJurisdictions(body:any):Observable<any> {
        let  JuridictionModel={
          active: true,
          contractID: 1,
          jurisdictionCode: 9,
          jurisdictionsDmvCode: "5666",
          jurisdictionsID: 155,
          jurisdictionsName: "Jurisdiction"
        }
        return of({data: {
        active: true,
        contractID: 1,
        jurisdictionCode: "9",
        jurisdictionsDmvCode: "5666",
        jurisdictionsID: 155,
        jurisdictionsName: "Jurisdiction"},
        details: [{fieldName: null, code: '1', message: "Updated", fieldType: null}],
        developerMessage: "Updated",
        status: "Success",
        timeStamp: "2022-07-15T16:40:47.5811885+00:00"});
      }
      toggleJuriState(Id: number):Observable<any> {
        return of({data: {
        active: false,
        contractID: 1,
        createDatetime: "2022-07-15T17:50:13.0272371+00:00",
        createUserID: 0,
        isDeleted: "N",
        jurisdictionCode: "16",
        jurisdictionsDmvCode: "1",
        jurisdictionsID: 135,
        jurisdictionsName: "aaa",
        updateDatetime: "2022-07-15T17:50:13.0272396+00:00",
        updateUserID: 0
      },
        details: [{fieldName: null, code: "0000", message: "Updated", fieldType: null}],
        developerMessage: "Updated",
        status: "Success",
        timeStamp: "2022-07-15T17:50:13.0549053+00:00"})
      }
}