import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { PaylockEmail } from 'src/app/Models/paylock-email';
import {PaylockEmailService} from '../../Services/PayLockEmail/paylock-email.service';
const obj={
    "paylockEmailconfigId":7,
    "contractId":2,
    "sNo":7,
    "emailId":"automation5@gmail.com",
    "createUserId":1,
    "updateUserId":1,
    "createDatetime":"2022-05-09T07:44:11.203",
    "updateDatetime":"2022-05-09T07:44:11.203",
    "clientD":0,
    "active":1,
    "isDeleted":"N"
  }
export class PayLockEmailServiceStub{
    // sendLang = of({});

	public  getpaylockList():Observable<any[]> {
		return of([{
            "paylockEmailconfigId":7,
            "contractId":2,
            "sNo":7,
            "emailId":"automation@gmail.com",
            "createUserId":1,
            "updateUserId":1,
            "createDatetime":"2022-05-09T07:44:11.203",
            "updateDatetime":"2022-05-09T07:44:11.203",
            "clientD":0,
            "active":1,
            "isDeleted":"N"
        }
            ,{"paylockEmailconfigId":9,"contractId":2,"sNo":9,"emailId":"conduent@gmail.com","createUserId":1,"updateUserId":1,"createDatetime":"2022-05-09T11:21:58.027","updateDatetime":"2022-05-09T11:21:58.027","clientD":0,"active":1,"isDeleted":"N"},{"paylockEmailconfigId":10,"contractId":2,"sNo":10,"emailId":"automation1@gmail.com","createUserId":1,"updateUserId":1,"createDatetime":"2022-05-09T11:24:13.307","updateDatetime":"2022-05-09T11:24:13.307","clientD":0,"active":1,"isDeleted":"N"},{"paylockEmailconfigId":11,"contractId":2,"sNo":11,"emailId":"automation2@test.com","createUserId":1,"updateUserId":1,"createDatetime":"2022-05-09T11:26:28.757","updateDatetime":"2022-05-09T11:26:28.757","clientD":0,"active":1,"isDeleted":"N"},{"paylockEmailconfigId":12,"contractId":2,"sNo":12,"emailId":"automation3@test.com","createUserId":1,"updateUserId":1,"createDatetime":"2022-05-09T11:28:54.747","updateDatetime":"2022-05-09T11:28:54.747","clientD":0,"active":1,"isDeleted":"N"},{"paylockEmailconfigId":13,"contractId":2,"sNo":13,"emailId":"automatuon3@bls.com","createUserId":1,"updateUserId":1,"createDatetime":"2022-05-09T11:32:39.173","updateDatetime":"2022-05-09T11:32:39.173","clientD":0,"active":1,"isDeleted":"N"},{"paylockEmailconfigId":16,"contractId":2,"sNo":16,"emailId":"error@test.com","createUserId":1,"updateUserId":1,"createDatetime":"2022-05-27T08:56:47.01","updateDatetime":"2022-05-27T08:56:47.01","clientD":0,"active":1,"isDeleted":"N"},{"paylockEmailconfigId":22,"contractId":2,"sNo":18,"emailId":"automanual4@bls.com","createUserId":1,"updateUserId":1,"createDatetime":"2022-05-09T11:52:51.227","updateDatetime":"2022-05-09T11:52:51.227","clientD":0,"active":1,"isDeleted":"N"},{"paylockEmailconfigId":24,"contractId":2,"sNo":19,"emailId":"automanual@bls.com","createUserId":1,"updateUserId":1,"createDatetime":"2022-05-09T11:53:21.903","updateDatetime":"2022-05-09T11:53:21.903","clientD":0,"active":1,"isDeleted":"N"},{"paylockEmailconfigId":26,"contractId":2,"sNo":21,"emailId":"automanual2@test.com","createUserId":1,"updateUserId":1,"createDatetime":"2022-05-20T08:29:05.327","updateDatetime":"2022-05-20T08:29:05.327","clientD":0,"active":1,"isDeleted":"N"},{"paylockEmailconfigId":62,"contractId":2,"sNo":0,"emailId":"string","createUserId":1,"updateUserId":1,"createDatetime":"2022-06-14T16:45:44.767","updateDatetime":"2022-06-14T16:45:44.767","clientD":0,"active":1,"isDeleted":"N"}]);
	}
    public getserialNumber():Observable<any[]>{
        return of([{"sNo":7}])
    }
    public addPaylock(data:any):Observable<any>{
      let addObj={sNo: 46, emailId: "i@ssn.co"}
        return of({
          data: {
            active: 1,
            clientD: 0,
            contractId: 2,
            createDatetime: '2022-07-13T11:50:47.351',
            createUserId: 1,
            emailId: 'i@ssn.co',
            isDeleted: 'N',
            paylockEmailconfigId: 79,
            sNo: 46,
            updateDatetime: '2022-07-13T11:50:47.351',
            updateUserId: 1,
          },
          details: [{ fieldName: '', code: '0000', message: 'Save Success' }],
          developerMessage: 'Response Returned Successfully.',
          status: 'Success',
          timeStamp: '2022-07-13T11:50:47.457',
        });
    }
    public updatePaylockEmail(id:any,data:any):Observable<any>{
      let updateObj={sNo: 40, emailId: "automanual1@sss.com"}

        return of({
          data: {
            active: 1,
            clientD: 0,
            contractId: 2,
            createDatetime: '2022-07-13T11:46:51.813',
            createUserId: 1,
            emailId: 'automanual1@sss.com',
            isDeleted: 'N',
            paylockEmailconfigId: 72,
            sNo: 40,
            updateDatetime: '2022-07-13T11:46:51.813',
            updateUserId: 1,
          },
          details: [{ fieldName: '', code: '0000', message: 'Update Success' }],
          developerMessage: 'Response Returned Successfully.',
          status: 'Success',
          timeStamp: '2022-07-13T11:46:51.918',
        });
    }
    public deletePaylockEmail(id:any):Observable<any>{
        return of({
          data: null,
          details: [{ fieldName: '', code: '0000', message: 'Delete Success' }],
          developerMessage: 'Response Returned Successfully.',
          status: 'Success',
          timeStamp: '2022-07-13T11:31:08.971',
        });
      }
      public reverse(){
        return of(obj)
      }
}
