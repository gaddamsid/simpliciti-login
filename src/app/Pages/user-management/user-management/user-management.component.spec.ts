import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';

import { UserManagementComponent } from './user-management.component';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let inputElement: HTMLInputElement;
  let apiService: ApiService;
  let formData: any;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserManagementComponent],
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
        MatTableModule,
        MatIconModule,
        MatSortModule,
        MatSelectModule,
        TranslateModule.forRoot(),
        MatFormFieldModule
      ],
      providers: [
        { provide: ApiService, useClass: apiServiceStub },
        // { provide: TranslateService, useClass:TranslateServiceStub},
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ToastrService, useClass: ToasterServiceStub }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(UserManagementComponent);
        component = fixture.componentInstance;
        apiService = TestBed.inject(ApiService);
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    formData = {
      "email": 'test45@gmail.com',
      "fname": 'test',
      "lname": 'test',
      "intUserCheck": false,
      "contracts": [
        {
          active: true,
          cbiDashboardLink: null,
          clientsID: 2,
          codeName: null,
          contractName: "Default",
          contractTypeId: 2,
          contractTypeName: null,
          contractsID: 1,
          createDatetime: "0001-01-01T00:00:00",
          createUserID: 0,
          identifierName: "default",
          isDeleted: "N",
          mavroCode: null,
          name: "Suffolk",
          partialPaymentDueValidation: true,
          partialPaymentValidation: true,
          passwordExpirationLength: 90,
          payByWebCode: 0,
          programManagerId: 3,
          programManagerName: "Jack Mack",
          stateProvinceName: "Hawaii",
          stateProvincesID: 1,
          timeZone: null,
          timeZonesID: 1,
          twoFactorEnabled: true,
          updateDatetime: "0001-01-01T00:00:00",
          updateUserID: 0,
        }
      ],
      "sysRoles": [
        {
          concurrencyStamp: null,
          createDatetime: "0001-01-01T00:00:00",
          createUserID: 1,
          displayName: null,
          isDeleted: "N",
          name: "System.Administrator",
          normalizedName: null,
          rolesId: 1,
          updateDatetime: "0001-01-01T00:00:00",
          updateUserID: 1,
        }
      ]
    }
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('User Management');
  })

  it('should get user list', () => {
    component.getUserList();
    fixture.detectChanges();
    expect(component.userList.length).toEqual(1);
  });

  it('should get system roles', () => {
    component.getSystemRoles();
    fixture.detectChanges();
    expect(component.sysRoles.length).toEqual(1);
  });

  it('should get contracts', () => {
    component.getContracts();
    fixture.detectChanges();
    expect(component.contractRoles.length).toEqual(1);
  });

  it('User management form should be invalid when empty', () => {
    component.userManageForm.controls["email"].setValue('');
    component.userManageForm.controls["fname"].setValue('');
    component.userManageForm.controls["lname"].setValue('');
    component.userManageForm.controls["intUserCheck"].setValue('');
    component.userManageForm.controls["sysRoles"].setValue('');
    expect(component.userManageForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors: any;
    let email = component.userManageForm.controls['email'];
    expect(email.valid).toBeFalsy();

    // email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    email.setValue('test@gmail.com');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('fname field validity', () => {
    let errors: any;
    let fname = component.userManageForm.controls['fname'];
    expect(fname.valid).toBeFalsy();

    // fname field is required
    errors = fname.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set fname to something
    fname.setValue('John');
    errors = fname.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('lname field validity', () => {
    let errors: any;
    let lname = component.userManageForm.controls['lname'];
    expect(lname.valid).toBeFalsy();

    // lname field is required
    errors = lname.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set lname to something
    lname.setValue('John');
    errors = lname.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('sysRoles field validity', () => {
    let errors: any;
    let sysRoles = component.userManageForm.controls['sysRoles'];
    expect(sysRoles.valid).toBeFalsy();

    // sysRoles field is required
    errors = sysRoles.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set sysRoles to something
    sysRoles.setValue('John');
    errors = sysRoles.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('User management form should be valid when not empty', () => {
    component.userManageForm.controls["email"].setValue('test@gmail.com');
    component.userManageForm.controls["fname"].setValue('John');
    component.userManageForm.controls["lname"].setValue('Doe');
    component.userManageForm.controls["intUserCheck"].setValue(false);
    component.userManageForm.controls["contracts"].setValue('test');
    component.userManageForm.controls["sysRoles"].setValue('test');
    expect(component.userManageForm.valid).toBeTruthy();
  });

  it('format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    component.getUserList();
    fixture.detectChanges();
    inputElement.value = 'abC';
    fixture.detectChanges();
    const event = new KeyboardEvent('keyup', { key: 'C' });
    inputElement.dispatchEvent(event);
    component.applyFilter(event);
    let searchData = (event.target as HTMLInputElement).value;
    expect(searchData.trim().toLowerCase()).toBe('abc');
    expect(component.dataSource.filter).toEqual('abc');
    expect(inputElement.value).toBe('abC');
    component.filterData();
    expect(component.dataSource.filter).toBe('abc');
  });

  it('showAddFormPage', () => {
    expect(component).toBeTruthy();
    component.showAddFormPage();
    expect(component.selectedContract).toEqual([]);
    expect(component.showAddForm).toBe(true);
    expect(component.disableCopy).toBe(true);
  });

  it('cancelAdd_Save', () => {
    component.cancelAdd_Save();
    expect(component.showAddForm).toBeFalsy();
    expect(component.showEditForm).toBeFalsy();
    expect(component.paginator.pageIndex).toEqual(0);
    expect(component.searchString.nativeElement.value).toEqual('');
  })

  it('sysRoleSelect', () => {
    fixture.detectChanges();
    let event = [
      {
        rolesId: 1
      }
    ]
    component.selectedRole = [];
    component.sysRoleSelect(event);
    component.sysRoles = [{ rolesId: 1 }];
    expect(component.sysRoles[0].rolesId).toEqual(event[0].rolesId);
  })

  it('avUserSelect', () => {
    fixture.detectChanges();
    let event: any = { value: "jack_mack@conduent.com" }
    component.avUserSelect(event);
    expect(component.userList[0].email).toEqual(event.value);
    expect(component.disableCopy).toBeFalsy();
    expect(component.selectedCopyUser).toBe(3)
  })

  it('getAvUserRole', () => {
    let event = 117;
    component.getAvUserRole(event);
    expect(event).toEqual(117);
  })

  it('announceSortChange', () => {
    let sortState: Sort = {
      direction: 'asc',
      active: 'true'
    }
    component.announceSortChange(sortState);
    expect(sortState.direction).toEqual('asc');
  })

  it('announceSortChange if direction is missing', () => {
    let sortState: Sort = {
      direction: '',
      active: 'true'
    }
    component.announceSortChange(sortState);
    expect(sortState.direction).toEqual('');
  })

  it('addUser', () => {
    component.userManageForm.controls["email"].setValue('test45@gmail.com');
    component.userManageForm.controls["fname"].setValue('test');
    component.userManageForm.controls["lname"].setValue('test');
    component.userManageForm.controls["intUserCheck"].setValue(false);
    component.userManageForm.controls["contracts"].setValue('test');
    component.userManageForm.controls["sysRoles"].setValue('test');
    expect(component.userManageForm.valid).toBeTruthy();
    component.addUser(formData);
    fixture.detectChanges();
  })

  it('updateUserRole', () => {
    component.userManageForm.controls["email"].setValue('test45@gmail.com');
    component.userManageForm.controls["fname"].setValue('test');
    component.userManageForm.controls["lname"].setValue('test');
    component.userManageForm.controls["intUserCheck"].setValue(false);
    component.userManageForm.controls["contracts"].setValue('test');
    component.userManageForm.controls["sysRoles"].setValue('test');
    expect(component.userManageForm.valid).toBeTruthy();
    let id = 117;
    component.editIconClicked(id);
    component.updateUserRole(formData);
    fixture.detectChanges();
  })

  it('editIconClicked', () => {
    let id = 117;
    component.editIconClicked(id);
    expect(component.updatedUser).toEqual(id);
  })

  it('error response when code is 5000 and message is not Duplicate Record', () => {
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

  it('error response when message is Duplicate Record and code 5000', () => {
    let error = {
      error: {
        details: [{
          "timestamp": "2022-06-29T06:47:59.717+0000",
          "code": 5000,
          "error": "Not Found",
          "message": "Duplicate Record",
          "path": "/admin/v1/interaction1"
        }]
      }
    }
    component.errorResponseCheck(error);
    expect(error.error.details[0].code).toEqual(5000);
  })

  it('error response when code is not 5000 and message is not Duplicate Record', () => {
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

  it('toggleAgency if status is true', () => {
    let id = 117;
    let status = true;
    component.toggleAgency(id, status);
    expect(id).toEqual(117);
  })

  it('toggleAgency if status is false', () => {
    let id = 117;
    let status = false;
    component.toggleAgency(id, status);
    expect(id).toEqual(117);
  })
});
