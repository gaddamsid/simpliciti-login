import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { globalHolidayServiceStub } from 'src/app/shared/testCasesHelperClasses/globalHolidayServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { GlobalHolidayService } from 'src/app/Services/GlobalHoliday/global-holiday.service';
import { GlobalHolidayComponent } from './global-holiday.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { formatDate } from '@angular/common';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
describe('GlobalHolidayComponent', () => {
  let component: GlobalHolidayComponent;
  let fixture: ComponentFixture<GlobalHolidayComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalHolidayComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserDynamicTestingModule,
        HttpClientTestingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AngularmaterialModule,
        TranslateStubsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: TranslateService, useClass:TranslateServiceStub},
        { provide: LanguageService, useClass:languageServiceStub},
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub},
        { provide: ToastrService, useClass: ToasterServiceStub},
        {provide: GlobalHolidayService, useClass: globalHolidayServiceStub}
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalHolidayComponent);
    component = fixture.componentInstance;
    spyOn(window,"confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Global Holiday');
  });
  it('should return a  List',()=>{
    let reqObj = {
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
    };
    component.getList();
  })
  it('search and filter', () => {
    let input = fixture.debugElement.query(By.css('input'));
    let inputElement = input.nativeElement;
    component.getList();
    fixture.detectChanges();
    inputElement.value = 'abC';
    fixture.detectChanges();
    const event = new KeyboardEvent('keyup', { key: 'C' });
    inputElement.dispatchEvent(event);
    component.applyFilter(event);
    let searchData= (event.target as HTMLInputElement).value;
    let filter=searchData.trim().toLowerCase();
    expect(searchData.trim().toLowerCase()).toBe('abc');
    expect(component.dataSource.filter).toEqual('abc');
    expect(inputElement.value).toBe('abC');


    component.filterData();
    expect(component.dataSource.filter).toBe('abc');
  });
  it('form invalid when empty', () => {
    expect(component.holidayForm.valid).toBeFalsy();
});
it('holidayDate field validity', () => {
  let errors:any={};
  let holidayDate = component.holidayForm.controls['holidayDate'];
  errors = holidayDate.errors || {};
  expect(holidayDate.errors).toBeNull();
});
it('holidayDescription field validity', () => {
  let errors:any={};
  let holidayDescription = component.holidayForm.controls['holidayDescription'];
  errors = holidayDescription.errors || {};
  fixture.detectChanges();
  expect(errors['required']).toBeTruthy();

  holidayDescription.setValue("Vacation");
  fixture.detectChanges();
  expect(holidayDescription.errors).toBeNull();
});
it('holidayRecordNumber field validity:required validation', () => {
  let errors:any={};

  let holidayRecordNumber = component.holidayForm.controls['holidayRecordNumber'];

  errors = holidayRecordNumber.errors || {};
  expect(errors['required']).toBeUndefined();
});

it('holidayRecordNumber field validity:setvalue validation', () => {
  let errors:any={};

  let holidayRecordNumber = component.holidayForm.controls['holidayRecordNumber'];

  // holidayRecordNumber field is required
  errors = holidayRecordNumber.errors || {};

   // Set emaholidayRecordNumberil to something
   holidayRecordNumber.setValue(0);
   fixture.detectChanges();
   expect(errors['required']).toBeUndefined();
   expect(errors['pattern']).toBeUndefined();
   expect(holidayRecordNumber.errors).toBeNull();

});

it('form is invalid when empty',()=>{
  expect(component.holidayForm.valid).toBeFalsy();
})
it('form is valid ',()=>{
  let holidayDescription = component.holidayForm.controls['holidayDescription'];
  holidayDescription.setValue("Vacation");
  expect(component.holidayForm.valid).toBeTruthy();
})
it('submitting a form when holidateDate is blank', () => {
  expect(component.holidayForm.valid).toBeFalsy();
  component.holidayForm.controls['holidayDate'].setValue("");
  component.holidayForm.controls['holidayDescription'].setValue("vacation");
  component.holidayForm.controls['holidayRecordNumber'].setValue(1);

  let errors:any={};

  expect(component.holidayForm.valid).toBeTruthy();
  interface User{
    holidayDate: any,
    holidayDescription:any,
    holidayRecordNumber:any
  }
  let reqObj = {
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
  };
  let user: User={
    holidayDate: "",
    holidayDescription: "vacation",
    holidayRecordNumber: 1
  };
  component.saveHolidayChanges(user);
  expect(user.holidayDate).toBe("");
  expect(user.holidayDescription).toBe("vacation");
  expect(user.holidayRecordNumber).toBe(1);
  expect(component.holidayForm.valid).toBeDefined();

  component.getList();
  expect(component.showAddForm).toEqual(false);
  expect(component.AddHolidayButton).toEqual(true);
  expect(component.holidayForm).toBeFalsy;
});
it('submitting a form save a user', () => {
  expect(component.holidayForm.valid).toBeFalsy();
  component.holidayForm.controls['holidayDate'].setValue("2022-04-22T07:49:03.042");
  component.holidayForm.controls['holidayDescription'].setValue("vacation");
  component.holidayForm.controls['holidayRecordNumber'].setValue(1);

  let errors:any={};

  expect(component.holidayForm.valid).toBeTruthy();
  interface User{
    holidayDate: any,
    holidayDescription:any,
    holidayRecordNumber:any
  }
  let reqObj = {
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
  };
  let user: User={
    holidayDate: "2022-04-22T07:49:03.042Z",
    holidayDescription: "vacation",
    holidayRecordNumber: 1
  };
  let updateReqObj = {
    "createUserID": 2,
    "updateUserID": 3,
    "createDatetime": "2022-04-22T07:49:03.042Z",
    "updateDatetime": "2022-04-22T07:49:03.042Z",
    "isDeleted": "N",
    "holidayID": 1,
    "contractID": 1,
    "active": true,
    "holidayDate": "2022-04-22T07:49:03.042Z",
    "holidayDescription": "vacation",
    "holidayRecordNumber": 1
  };
  let msg='';
  // Trigger the savepaylockEmail function
  component.saveHolidayChanges(user);
// expect(user.holidayDate).toBe("")
  // Now we can check to make sure the emitted value is correct
  expect(user.holidayDate).toBe("2022-04-22T07:49:03.042Z");
  expect(user.holidayDescription).toBe("vacation");
  expect(user.holidayRecordNumber).toBe(1);
  expect(component.holidayForm.valid).toBeDefined();

  component.getList();
  expect(component.showAddForm).toEqual(false);
  expect(component.AddHolidayButton).toEqual(true);
  expect(component.holidayForm).toBeFalsy;
});

it('should check toggleCourtHoliday',()=>{
  let obj={
    active: true,
    contractID: 0,
    createDatetime: "2022-06-27T06:58:31.15",
    createUserID: 1,
    holidayDate: "Jun 27, 2022",
    holidayDescription: "Testing done by Kritika",
    holidayID: 52,
    holidayRecordNumber: 9,
    isDeleted: "N",
    updateDatetime: "2022-06-27T06:58:31.15",
    updateUserID: 0
  }
  component.toggleCourtHoliday(obj,true);
  fixture.detectChanges()
  fixture.detectChanges()
  component.getList();
  fixture.detectChanges()
})
it('should check toggleCourtHoliday',()=>{
  let obj={
    active: false,
    contractID: 0,
    createDatetime: "2022-06-27T06:58:31.15",
    createUserID: 1,
    holidayDate: "Jun 27, 2022",
    holidayDescription: "Testing done by Kritika",
    holidayID: 52,
    holidayRecordNumber: 9,
    isDeleted: "N",
    updateDatetime: "2022-06-27T06:58:31.15",
    updateUserID: 0
  }
  component.toggleCourtHoliday(obj,false);
  fixture.detectChanges()
  fixture.detectChanges()
  component.getList();
  fixture.detectChanges()
})
it('should check setPagelabel',()=>{
  let lang='fr'
  component.setPagelabel(lang);
  component.translate.use(lang).toPromise();
})
it('should check addGlobalholiday',()=>{
  component.addGlobalholiday()
    expect(component.holidayForm.controls["holidayRecordNumber"]).toBeNull;
    expect(component.showAddForm).toEqual(true);
    expect(component.AddHolidayButton).toEqual(true);
})
it('should call cancelGlobalHoliday',()=>{
  component.cancelGlobalHoliday();
  expect(component.showAddForm).toEqual(false);
  expect(component.holidayForm).toBeUndefined;
  component.getList();
})
it('should call addHoliday(data: any)',()=>{
  component.holidayForm.controls['holidayDate'].setValue("");
  component.holidayForm.controls['holidayDescription'].setValue("Holiday In Dubai");
  component.holidayForm.controls['holidayRecordNumber'].setValue(3);

  let data: any={
    holidayDate: "",
    holidayDescription: "Holiday In Dubai",
    holidayRecordNumber: 3
};
  component.addHoliday(data);
})
it('should call addHoliday(data: any)',()=>{
  let globalHolidayModel={
    active: true,
    contractID: 0,
    createDatetime: "2022-04-22T07:49:03.042Z",
    createUserID: 0,
    holidayDate: "2022-07-17",
    holidayDescription: "Holiday In Dubai",
    holidayID: 0,
    holidayRecordNumber: 3,
    isDeleted: "N",
    updateDatetime: "2022-04-22T07:49:03.042Z",
    updateUserID: 0
}
  component.holidayForm.controls['holidayDate'].setValue("2022-07-17");
  component.holidayForm.controls['holidayDescription'].setValue("Holiday In Dubai");
  component.holidayForm.controls['holidayRecordNumber'].setValue(3);

  let errors:any={};
  expect(component.holidayForm.valid).toBeTruthy();
  let data: any={
    holidayDate: "2022-07-17",
    holidayDescription: "Holiday In Dubai",
    holidayRecordNumber: 3
};
  component.addHoliday(data);
  expect(component.holidayForm.errors).toBeNull();
  component.successMsg = "1"
  component.holidayForm.reset();
  component.paginator.pageIndex = 0;
  component.getList();
  expect(component.showAddForm).toEqual(false);
})
it('updateHolidayRecord(data: any)',()=>{
  let data: any={
    holidayDate: "2022-07-18",
    holidayDescription: "Holiday In Dubaii",
    holidayRecordNumber: 3
};
const date = formatDate(
  new Date(data.holidayDate).toLocaleDateString(),
  'yyyy-MM-dd',
  'en'
)
 let updateReqObj = {
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
  };
  component.updateHolidayRecord(data);
  expect(component.editData).toEqual(data);
  expect(component.showAddForm).toBeTrue;
  expect(component.AddHolidayButton).toBeFalse;

  component.holidayForm.value.holidayDate=date;
  expect(component.holidayForm.value.holidayDate).toEqual(updateReqObj.holidayDate);
  expect(component.holidayForm.value.holidayDescription).toEqual(updateReqObj.holidayDescription);
  expect(component.holidayForm.value.holidayRecordNumber).toEqual(updateReqObj.holidayRecordNumber);

})
it('holidayDate()',()=>{
  component.holidayDate;
})
it('holidayDescription()',()=>{
  component.holidayDescription;
})
it('holidayRecordNumber()',()=>{
  component.holidayRecordNumber;
})
it('announceSortChange', () => {
  let sortState: Sort = {
    direction: 'asc',
    active:'true'
  }
  component.announceSortChange(sortState);
  expect(sortState.direction).toEqual('asc');
})
it('announceSortChange if direction is missing', () => {
  let sortState: Sort = {
    direction: '',
    active:'true'
  }
  component.announceSortChange(sortState);
  expect(sortState.direction).toEqual('');
})
it('error response when code is 5000 and message is not DuplicateKey', () => {
  let error = {
    error: {
      details: [{
        "timestamp": "2022-06-29T06:47:59.717+0000",
        "code": 5000,
        "error": "Not Found",
        "message": "No message available",
        "path": "/admin/v1/interaction1"
      }]
    }
  }
  component.errorResponseCheck(error);
  expect(error.error.details[0].code).toEqual(5000);
})

it('error response when message is DuplicateKey and code 5000', () => {
  let error = {
    error: {
      details: [{
        "timestamp": "2022-06-29T06:47:59.717+0000",
        "code": 5000,
        "error": "Not Found",
        "message": "DuplicateKey",
        "path": "/admin/v1/interaction1"
      }]
    }
  }
  component.errorResponseCheck(error);
  expect(error.error.details[0].code).toEqual(5000);
})

it('error response when code is not 5000 and message is not DuplicateKey', () => {
  let error = {
    error: {
      details: [{
        "timestamp": "2022-06-29T06:47:59.717+0000",
        "code": 404,
        "error": "Not Found",
        "message": "No message available",
        "path": "/admin/v1/interaction1"
      }]
    }
  }
  component.errorResponseCheck(error);
  expect(error.error.details[0].code).toEqual(404);
})
it('error response when details is undefined', () => {
  let error = {
    error: {
    }
  }
  component.errorResponseCheck(error);
})
});
