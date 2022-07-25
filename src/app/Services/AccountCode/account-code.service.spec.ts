import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {AccountCodeServiceStub} from '../../shared/testCasesHelperClasses/accountCodeServiceStub';
import { inject, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment.dev';
import { AccountCodeService } from './account-code.service';



describe('AccountCodeService', ()=> {
  
  let accountCodeService: AccountCodeService;
  let controller : HttpTestingController;
  let baseUrl = environment.BASE_eTIMS_URL;
  let serviceStub = new AccountCodeServiceStub();
  let reqObj :any;
  reqObj = {
    "accountTypesId": 1,
    "contractId": 2,
    "createUserId": 1,
    "createDatetime": "2022-06-07T11:00:49.273",
    "updateUserId": 1,
    "updateDatetime": "2022-06-07T11:00:49.273",
    "intAccountNumber": 1,
    "extAccountNumber": 1,
    "accountFullName": "In Person",
    "accountShortName": "Inper",
    "isDeleted": "N"
}
  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
    accountCodeService = TestBed.inject(AccountCodeService);
    controller = TestBed.inject(HttpTestingController);
    
  });
  
  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(accountCodeService).toBeTruthy();
  });

  //
  it('getaccountCodelist should return a list', () => {
    let response : any;
    let mockData : any;

    serviceStub.getaccountCodelist().subscribe(accounts => {
      mockData = accounts;
    });
    
    accountCodeService.getaccountCodelist().subscribe(res => {
      response = res;
    });

    const request = controller.expectOne(baseUrl + 'admin/v1/accountTypes');
    request.flush(reqObj);
    controller.verify();
    expect(reqObj).toEqual(response);
  });

  it('getintAccountNumber should return account number', () => {
    let response:any;
    let mockData! : any;

    // serviceStub.getMaxAccountCode().subscribe(account => {
    //   mockData = account.value;
    // });
    mockData = accountCodeService.getintAccounNumber();
    accountCodeService.getintAccounNumber().subscribe(res => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/getMaxIntAccNumber');
    request.flush(mockData);
    controller.verify();
   
    expect(response).toEqual(mockData);

  })

  it('addaccountCode should add a new account', () => {
    let response: any;
    accountCodeService.addaccountCode(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/accountTypes',reqObj);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })

  it('UpdateaccountCode should update an existing account', () => {
    let response: any;
    accountCodeService.UpdateaccountCode(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'admin/v1/accountTypes',reqObj);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })

  it('deleteaccountCode should delete an account', () => {
    let response: any;
    let id = 1;
    accountCodeService.deleteaccountCode(id).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + `admin/v1/accountTypes?accountTypesId=`+ id);
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })
});
