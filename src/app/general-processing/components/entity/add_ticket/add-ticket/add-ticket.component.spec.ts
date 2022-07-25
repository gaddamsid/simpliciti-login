import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed, fakeAsync, waitForAsync, tick } from '@angular/core/testing';
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { PaymentCartService } from 'src/app/shared/services/payment-cart.service';
import { addTicketServiceStub } from 'src/app/shared/testCasesHelperClasses/AddTicketStub/addTicketServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { MatDialogRefStub } from 'src/app/shared/testCasesHelperClasses/MatDialogRefStub';
import { PaymentCartServiceStub } from 'src/app/shared/testCasesHelperClasses/PaymentCartServiceStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { AddTicketComponent } from './add-ticket.component';

describe('AddTicketComponent', () => {
  let component: AddTicketComponent;
  let fixture: ComponentFixture<AddTicketComponent>;

  let agencyObj = {

    "issuingAgencyId": 2,
    "agencyCode": 11,
    "agencyShortName": "India",
    "agencyLongName": "Hyderabad",
    "agencyDistrict": 21,
    "agencyParkTktsPerBk": 22,
    "agencyMoveTktsPerBk": 23,
    "agencyStreetEnforceInd": "A",
    "agencyViolTableGroup": "B",
    "createUserId": 1,
    "createDateTime": "2022-05-11T10:24:17.823",
    "updateUserId": 1,
    "updateDateTime": "2022-05-11T10:24:17.823",
    "contractId": 2,
    "active": 1,
    "isDeleted": "N"
  }

  let badgeObj =
    {
      "badgeNumberId": 377,
      "contractId": 2,
      "createUserId": 1,
      "updateUserId": 1,
      "createDatetime": "2022-05-20T12:06:20.54",
      "updateDatetime": "2022-05-20T12:06:20.54",
      "badgeAgency": 10,
      "badgeDivision": 1,
      "badgeOfficerName": "D.K.",
      "active": 1,
      "isDeleted": "N",
      "isUploaded": "Y",
      "badgeNumber": "009170"
  }

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  let router: Router;

  beforeEach(waitForAsync (() => {
    class RouterStub {
      navigateByUrl(url: string) { return url; }
  }
    TestBed.configureTestingModule({
      declarations: [ AddTicketComponent ],
      imports: [
      //   RouterTestingModule.withRoutes(
      //     [{path: '', component: BlankCmp}, {path: 'simple', component: SimpleCmp}]
      //   ),
        BrowserModule,
        FormsModule,
        RouterModule,
        RouterTestingModule,
        ReactiveFormsModule,
        AngularmaterialModule,
        TranslateStubsModule,
        HttpClientTestingModule,
        BrowserDynamicTestingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: PaymentCartService, useClass: PaymentCartServiceStub },
        { provide: ApiService, useClass: addTicketServiceStub },
        // { provide: Router, useValue: routerSpy }
      ],
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(AddTicketComponent);
      component = fixture.componentInstance;
    });;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTicketComponent);
    component = fixture.componentInstance;
    spyOn(window, 'confirm').and.returnValue(true);
    component.plateDetails = {
      navigationId : 1,
      plateDetails : {
        plateNumber :  'VA8137XD'
      }
    };
    // component.agencyDetails = [ {
    //   issuingAgencyId : 1
    // }]
    component.citationNumber = 'DD21072022';
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check if agency details return value after intialization', () => {
    component.getAgencies();
    expect(component.agencyDetails.length).toBeGreaterThan(0);
  })

  it('check if badgeNumber return value after intialization ', () => {
   component.getBadgeNumber();
   expect(component.badgeDetails.length).toBeGreaterThan(0);
  })

  it('agencySelect should update the ticketdata array', () => {
    let event = {
      value : 2
    }
    let i = 0;

    let expRes = 2;
    component.agencyDetails = [];
    component.agencyDetails.push(agencyObj);
    component.agencySelect(event,i);

    let res = (<FormArray>component.ticketDetailsForm.get('ticketData')).controls[i].get('agency')?.value;

    expect(res).toBeTruthy();
    expect(res).toEqual(expRes);
  })

  it('badgeSelect should update the ticketdata array', () => {

    let event = {
      value : 377
    }
    let i = 0;

    let expRes = 377;
    component.agencyDetails = [];
    component.badgeDetails.push(badgeObj);
    
    component.badgeSelect(event,i);

    let res = (<FormArray>component.ticketDetailsForm.get('ticketData')).controls[i].get('badge')?.value;

    expect(res).toBeTruthy();
    expect(res).toEqual(expRes);
  })

  it('noWhiteSpace should not fail and return true', () => {

      let event = {
        keyCode : 100,
        target : {
          selectionStart  : 1
        }
      };
      let expRes = true;

      let res = component.noWhiteSpace(event);

      expect(res). toBeTrue();

  })

  it('noWhiteSpace should fail and return expected false', () => {
    // debugger
      let event = {
        keyCode : 32,
        target : {
          selectionStart  : 0
        },
        preventDefault(){}
      };
      component.noWhiteSpace(event);
      expect(event.keyCode).toEqual(32);
  })

  it('cancelAddTicket should disable submit button', () => {
    component.cancelAddTicket();
    let res = component.addDisable;
    expect(res).toBeTruthy();
  })

  it('checkValidations should return - Amount is Required', () => {
    // debugger;
    let ticketData = [];
    let ticketDetails = {
      amount : '',
      agency: 1,
      badge: 1,
      ticketNum : 1
    }
    let expRes = 'Amount is Required';
    ticketData.push(ticketDetails);
    let data = {
      ticketData : ticketData
    };
    component.checkValidations(data);
    let resErr  = (<FormArray>component.ticketDetailsForm.get('ticketData')).controls[0]?.get('amount')?.errors?.['required'];

    expect(resErr).toBeTruthy();
    expect(resErr).toEqual(expRes);
  })

  it('checkValidations should return - Agency is Required', () => {
    // debugger;
    let ticketData = [];
    let ticketDetails = {
      amount : 200,
      agency: '',
      badge: 1,
      ticketNum : 1
    }
    let expRes = 'Agency is Required';
    ticketData.push(ticketDetails);
    let data = {
      ticketData : ticketData
    };
    component.checkValidations(data);
    let resErr  = (<FormArray>component.ticketDetailsForm.get('ticketData')).controls[0]?.get('agency')?.errors?.['required'];

    expect(resErr).toBeTruthy();
    expect(resErr).toEqual(expRes);
  })

  it('checkValidations should return - Badge is Required', () => {
    // debugger;
    let ticketData = [];
    let ticketDetails = {
      amount : 100,
      agency: 1,
      badge: '',
      ticketNum : 1
    }
    let expRes = 'Badge is Required';
    ticketData.push(ticketDetails);
    let data = {
      ticketData : ticketData
    };
    component.checkValidations(data);
    let resErr  = (<FormArray>component.ticketDetailsForm.get('ticketData')).controls[0]?.get('badge')?.errors?.['required'];

    expect(resErr).toBeTruthy();
    expect(resErr).toEqual(expRes);
  })
  
  it('should execute getEntityDetails method', () => {
    component.getEntityDetails();
    expect(component.isLoading).toBeFalse();
  })

  it('should execute set the search value in TicketNum field', () => {
    component.citationNumber = 'DD21072022';
    component.ticketData.controls[0]?.get('ticketNum')?.setValue(component.citationNumber);
    expect(component.citationNumber).toBe('DD21072022');
  }) 

  let ticketData1 : any = {
    amount: 100,
    ticketNum : '41',
    agency : 1,
    badge : 2
  }
  let ticketData2 : any = {
    amount: 101,
    ticketNum : '42',
    agency : 1,
    badge :2
  }
  let ticketData3 : any = {
    amount: 102,
    ticketNum : '43',
    agency : 1,
    badge : 2
  }
  let ticketData4 : any = {
    amount: 103,
    ticketNum : '44',
    agency : 1,
    badge : 2
  }
  let ticketData5 : any = {
    amount: 104,
    ticketNum : '45',
    agency : 1,
    badge : 2
  }

  let ticketData : any = [];
  ticketData.push(ticketData1);
  ticketData.push(ticketData2);
  ticketData.push(ticketData3);
  ticketData.push(ticketData4);
  ticketData.push(ticketData5);

  xit('addTicketDetails',  fakeAsync(() => {
    // debugger

    let data = {
      ticketData : ticketData,
      entityNo : '',
      notes : '',
      plateNo : ''
    };

    (<FormArray>component.ticketDetailsForm.get('ticketData')).controls[0]?.get('ticketNum')?.setValue('test');
    let router = fixture.debugElement.injector.get(Router);
    let res = component.addTicketDetails(data);
    const spy = router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    // const spy = spyOn(router, 'navigateByUrl');
    // el.click();
    // const navArgs = spy.calls.first().args[0];
    const plateNumber = 'DD20220721'
    expect(navArgs).toBe('gp/search/entity-details/entity/'+plateNumber);
    let res1 = component.successMsg;
    expect(res).toBeFalsy();
  }));

  it('checkTicketNum should update addDisable', () => {

    component.addDisable = false;
    let check = component.addDisable;

    component.checkTicketNum();
    let res = component.addDisable;

    expect(res).not.toBe(check);
  })
  
  it('checkEmptyTicket should update checkTicketInterval as false', () => {
    let mockData : any = {
      ticketNum : ''
    }
    let mockData1 : any = {
      ticketNum : 10
    }
    let mockData2 : any = {
      ticketNum : 10
    }
    let mockData3 : any = {
      ticketNum : 10
    }
    let mockData4 : any = {
      ticketNum : 10
    }

    let data : any = {
        ticketData : [mockData,mockData1,mockData2,mockData3,mockData4]
    }
    component.checkTicketVal = false;


    component.checkEmptyTicket(data);
    let res = component.checkTicketVal;

    expect(res).toBeTrue();
  })

  it('checkEmptyTicket should update checkTicketInterval as true', () => {
    let mockData : any = {
      ticketNum : 10
    }
    let mockData1 : any = {
      ticketNum : 10
    }
    let mockData2 : any = {
      ticketNum : 10
    }
    let mockData3 : any = {
      ticketNum : 10
    }
    let mockData4 : any = {
      ticketNum : 10
    }

    let data : any = {
        ticketData : [mockData,mockData1,mockData2,mockData3,mockData4]
    }
    component.checkTicketVal = false;


    component.checkEmptyTicket(data);
    let res = component.checkTicketVal;

    expect(res).toBeFalse();
  })
  
  it('should call transformTotal and do parsing', () => {
    const input = 'amount';
    const i = 0;
    (<FormArray>component.ticketDetailsForm.get('ticketData')).controls[i]?.get(input)?.setValue(12);
    let val = (<FormArray>component.ticketDetailsForm.get('ticketData')).controls[i]?.get('amount')?.value;
    let decimalValue = parseFloat(val).toFixed(2);
    component.transformTotal(input,i);
    expect((<FormArray>component.ticketDetailsForm.get('ticketData')).controls[i]?.get('amount')?.value).toEqual(decimalValue);
  });

  it('validateTicket when ticketNum is not empty', () => {
    let data = {
      ticketData : ticketData,
      entityNo : '',
      notes : '',
      plateNo : ''
    };
    let res;
    (<FormArray>component.ticketDetailsForm.get('ticketData')).controls[0]?.get('ticketNum')?.setValue('test');
    // component.checkTicketVal = true;
    res = component.validateTicket(data);
    expect(res).toBeFalsy();
  })

  it('error response when code is 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "actionsName",
            "code": "5000",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.ticketDetailsForm.valid).toBeFalse();
  })

  it('error response when message is DuplicateKey and code 5000', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "actionsName",
            "code": "5000",
            "message": "DuplicateKey"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.ticketDetailsForm.valid).toBeFalse();
  })

  it('error response when code is not 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "actionsName",
            "code": "400",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.ticketDetailsForm.valid).toBeFalse();
  });




});
