import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { GlobalHoliday } from 'src/app/Models/global-holiday';
import { environment } from 'src/environments/environment';
const obj = {
  "createUserID": 0,
  "updateUserID": 0,
  "createDatetime": "2022-04-22T07:49:03.042Z",
  "updateDatetime": "2022-04-22T07:49:03.042Z",
  "isDeleted": "N",
  "holidayID": 0,
  "contractID": 0,
  "active": true,
  "holidayDate": "2022-04-22T07:49:03.042Z",
  "holidayDescription": "vacation",
  "holidayRecordNumber": 1
}
const A = [{
  "createUserID": 0,
  "updateUserID": 0,
  "createDatetime": "2022-04-22T07:49:03.042Z",
  "updateDatetime": "2022-04-22T07:49:03.042Z",
  "isDeleted": "N",
  "holidayID": 0,
  "contractID": 0,
  "active": true,
  "holidayDate": "2022-04-22T07:49:03.042Z",
  "holidayDescription": "vacation",
  "holidayRecordNumber": 1
}, {
  "createUserID": 0,
  "updateUserID": 0,
  "createDatetime": "2022-04-22T07:49:03.042Z",
  "updateDatetime": "2022-04-22T07:49:03.042Z",
  "isDeleted": "N",
  "holidayID": 0,
  "contractID": 0,
  "active": true,
  "holidayDate": "2022-04-22T07:49:03.042Z",
  "holidayDescription": "vacation",
  "holidayRecordNumber": 1
}]
export class globalHolidayServiceStub{
    
    public getHolidayList():Observable<any[]>{
     return of(A);  
    }
 
    public addHolidayList(data:any):Observable<any>{
     return of({ data: {
       active: true,
       contractID: 0,
       createDatetime: "2022-07-16T19:01:38.3858423+00:00",
       createUserID: 0,
       holidayDate: "2022-07-17T00:00:00",
       holidayDescription: "Holiday In Dubai",
       holidayID: 70,
       holidayRecordNumber: 3,
       isDeleted: "N",
       updateDatetime: "2022-07-16T19:01:38.3858446+00:00",
       updateUserID: 0
     },
       details: [{ fieldName: null, code: "1", message: "Inserted", fieldType: null }],
       developerMessage: "Inserted",
       status: "Success",
       timeStamp: "2022-07-16T19:01:38.4064126+00:00"
    });  
    }
 
    public UpdateHoliday(data:any):Observable<any>{
    let  globalHolidayModel={
      active: true,
      contractID: 0,
      createDatetime: "2022-04-22T08:10:10.007Z",
      createUserID: 0,
      holidayDate: "2022-07-18",
      holidayDescription: "Holiday In Dubaii",
      holidayID: 70,
      holidayRecordNumber: 3,
      isDeleted: "N",
      updateDatetime: "2022-04-22T08:10:10.007Z",
      updateUserID: 0
    }
     return of(
      { 
      data: {
       active: true,
       contractID: 0,
       createDatetime: "2022-07-16T19:42:20.8159176+00:00",
       createUserID: 0,
       holidayDate: "2022-07-18T00:00:00",
       holidayDescription: "Holiday In Dubaii",
       holidayID: 70,
       holidayRecordNumber: 3,
       isDeleted: "N",
       updateDatetime: "2022-07-16T19:42:20.8159198+00:00",
       updateUserID: 0
     },
       details: [{ fieldName: null, code: "0000", message: "Updated", fieldType: null }],
       developerMessage: "Updated",
       status: "Success",
       timeStamp: "2022-07-16T19:42:20.8488475+00:00"
    });
    }
 
    public toggleGlobalHoliday(data:any):Observable<any>{
     return of({
       data: 70,
       details: [{ fieldName: null, code: "1", message: "Updated", fieldType: null }],
       developerMessage: "Updated",
       status: "Success",
       timeStamp: "2022-07-16T19:48:49.3504053+00:00"
    });  
    }
    public reverse(){
        return of({obj})
      }
}