import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { ClientManagementComponent } from './client-management.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ClientManagementService } from 'src/app/Services/ClientManagement/client-management.service';
import { ClientManagementServiceStub } from 'src/app/shared/testCasesHelperClasses/clientManagementServiceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { By } from '@angular/platform-browser';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { MessageService } from 'src/app/shared/services/message.service';
import { messageServiceStub } from 'src/app/shared/testCasesHelperClasses/messageServiceStub';
import { Sort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('ClientManagementComponent', () => {
  let component: ClientManagementComponent;
  let fixture: ComponentFixture<ClientManagementComponent>;
  let translate: TranslateService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientManagementComponent],
      imports: [BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule, TranslateStubsModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule
      ],
      providers: [
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: MessageService, useClass: messageServiceStub },
        { provide: ClientManagementService, useClass: ClientManagementServiceStub }

      ]
    })
      .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    translate = TestBed.inject(TranslateService);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(window, "confirm").and.returnValue(true);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('announceSortChange', () => {
    let sortState: Sort = {
      active: 'true',
      direction: 'asc'
    }
    component.announceSortChange(sortState);
    expect(sortState.direction).toEqual('asc');
  });

  it('announceSortChange if direction is missing', () => {
    let sortState: Sort = {
      direction: '',
      active: 'true'
    }
    component.announceSortChange(sortState);
    expect(sortState.direction).toEqual('');
  });

  it('Form should be invalid', () => {
    expect(component.clientManagementForm.valid).toBeFalsy();
  });
  it('filter data', () => {
    component.getList();
    fixture.detectChanges();
    component.filterData();
  });

  it('form invalid when empty', () => {
    expect(component.clientManagementForm.valid).toBeFalsy();
  });

  it('form is valid', () => {
    let clientsNumber = component.clientManagementForm.controls['clientsNumber'];
    let shortName = component.clientManagementForm.controls['clientsShortName'];
    let name = component.clientManagementForm.controls['clientsName'];
    let stateProvinces = component.clientManagementForm.controls['stateProvincesID'];
    let timeZones = component.clientManagementForm.controls['timeZonesID'];

    clientsNumber.setValue(1);
    shortName.setValue("test");
    name.setValue("Test1234");
    stateProvinces.setValue(2);
    timeZones.setValue(2);
    expect(component.clientManagementForm.valid).toBeTruthy();
  });


  it('clientsNumber field validity', () => {
    let errors: any;
    let clientsNumber = component.clientManagementForm.controls['clientsNumber'];
    expect(clientsNumber.valid).toBeFalsy();

    // clientsNumber field is required
    errors = clientsNumber.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set clientsNumber to something
    clientsNumber.setValue(1);
    errors = clientsNumber.errors || {};
    expect(errors['required']).toBeFalsy();
  });
  it('cancel and save', () => {
    component.clientManagementForm.reset();
    expect(component.showForm).toBeFalsy();
    expect(component.addClientButton).toBeTruthy();
    component.cancelAdding();
  });

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
    let searchData = (event.target as HTMLInputElement).value;
    let filter = searchData.trim().toLowerCase();
    expect(searchData.trim().toLowerCase()).toBe('abc');
    expect(component.dataSource.filter).toEqual('abc');
    expect(inputElement.value).toBe('abC');
    component.filterData();
    expect(component.dataSource.filter).toBe('abc');
  });

  // it('toggleType if status is true', () => {
  //   let id = 106;
  //   let status = 'Y';
  //   spyOn(window, "confirm").and.returnValue(true);
  //   component.toggleClient(id, status);
  //   expect(id).toEqual(106);
  // })

  // it('toggleType if status is false', () => {
  //   let id = 106;
  //   let status = 'N';
  //   spyOn(window, "confirm").and.returnValue(true);
  //   component.toggleClient(id, status);
  //   expect(id).toEqual(106);
  // });

  it('addClientList method should execute', () => {
    let data: any = {
      "createUserID": 0,
      "updateUserID": 0,
      "createDatetime": "2022-04-22T08:46:42.064Z",
      "updateDatetime": "2022-04-22T08:46:42.064Z",
      "isDeleted": "N",
      "active": true,
      "clientsId": 1,
      "clientsNumber": 1,
      "clientsShortName": "Texas Test",
      "clientsName": "Texas",
      "stateProvincesID": "22",
      "timeZonesID": "2"
    }
    component.addClientList(data)
    component.getList();
    expect(component.showForm).toBeFalsy();

  })



  let editData: any = {
    "clientModel": {
      "createUserID": 0,
      "updateUserID": 0,
      "createDatetime": "2022-04-22T08:46:42.064Z",
      "updateDatetime": "2022-04-22T08:46:42.064Z",
      "isDeleted": "N",
      "active": true,
      "clientsId": 1,
      "clientsNumber": 1,
      "clientsShortName": "Texas Test",
      "clientsName": "Texas",
      "stateProvincesID": "22",
      "timeZonesID": "2"
    }
  }
  it('editClient method should execute', () => {
    component.editClient(editData);
    expect(component.showForm).toBeTruthy();
    expect(component.showEditForm).toBeTruthy();
    expect(component.addClientButton).toBeFalsy();
  })

  it('updateClient method should execute', () => {
    let data: any = {
      "clientModel": {
        "createUserID": 0,
        "updateUserID": 0,
        "createDatetime": "2022-04-22T08:46:42.064Z",
        "updateDatetime": "2022-04-22T08:46:42.064Z",
        "isDeleted": "N",
        "active": true,
        "clientsId": 1,
        "clientsNumber": 1,
        "clientsShortName": "Texas Test",
        "clientsName": "Texas",
        "stateProvincesID": "22",
        "timeZonesID": "2"
      }
    }

    component.clientManagementForm.controls["clientsNumber"].setValue('1');
    component.clientManagementForm.controls["clientsShortName"].setValue('name');
    component.clientManagementForm.controls["clientsName"].setValue('name');
    component.clientManagementForm.controls["stateProvincesID"].setValue('1');
    component.clientManagementForm.controls["timeZonesID"].setValue('1');
    component.editData = data;
    component.updateClient(data);
    expect(component.showForm).toBeFalsy();
    expect(component.addClientButton).toBeTruthy();
  })

  it('should check setPagelabel', () => {
    let lang = 'fr'
    component.setPagelabel(lang);
    component.translate.use(lang).toPromise();
  })

  it('should call addHoliday(data: any)', () => {
    let data: any = {
      clientsNumber: "2022-06-27",
      clientsShortName: "Holiday Inn",
      clientsName: 4,
      stateProvincesID: 2,
      timeZonesID: 2

    };
    component.addClientList(data);
    expect(component.clientManagementForm.errors).toBeNull;
    expect(component.clientManagementForm.valid).toBeDefined
  })

  it('error response when code is 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "sectionType",
            "code": "5000",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.clientManagementForm.valid).toBeFalse();
  })

  it('error response when message is DuplicateKey and code 5000', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "sectionType",
            "code": "5000",
            "message": "DuplicateKey"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.clientManagementForm.valid).toBeFalse();
  })

  it('error response when code is not 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "sectionType",
            "code": "400",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.clientManagementForm.valid).toBeFalse();
  })

});
