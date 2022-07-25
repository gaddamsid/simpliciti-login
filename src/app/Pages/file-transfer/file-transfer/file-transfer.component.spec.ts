import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { CategoryServiceStub } from 'src/app/shared/testCasesHelperClasses/Action-and-CategoriesStub/CategoryServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { messageServiceStub } from 'src/app/shared/testCasesHelperClasses/messageServiceStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { ValidationServiceStub } from 'src/app/shared/testCasesHelperClasses/ValidationServiceStub';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { CategoriesComponent } from '../../action-and-categories/categories/categories.component';
import { ActionsAndCategoriesComponent } from '../../actions-and-categories/actions-and-categories.component';

import { FileTransferComponent } from './file-transfer.component';

describe('FileTransferComponent', () => {
  let component: FileTransferComponent;
  let inputElement: HTMLInputElement;
  let fixture: ComponentFixture<FileTransferComponent>;
  let error: any = {};
  let data = {
    fileTransfersID: 21,
    fileTransferProtocolsID: 21,
    name: "abc.doc",
    fileTransferProtocol: "AP",
    ip:"ip",
    port: "2412",
    userName: "user",
    active: 1,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileTransferComponent ],

    imports: [
        HttpClientTestingModule,
        TranslateStubsModule,
        TranslateModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        AngularmaterialModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ToastrService, useClass: ToasterServiceStub},
        // { provide: TranslateService, useClass:TranslateServiceStub},
        { provide: LanguageService, useClass:languageServiceStub},
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ValidationService, useValue: ValidationServiceStub},
        { provide: MessageService, useClass: messageServiceStub},
        { provide: ApiService, useClass: CategoryServiceStub},
        { provide: MatPaginator, useValue: ({})},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.sort = new MatSort();
    component.sort.disableClear = true;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTransferComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render title in h3 tag', () => {
    const title = fixture.debugElement.nativeElement;
    const h3Title = "File Transfer"
    expect(title.querySelector('h3').textContent).toContain(h3Title);
  })
  it('should get FileTranserList', () => {
    component.getFileTransfer();
    let getListService = fixture.debugElement.injector.get(ApiService);
    spyOn(getListService, 'get').and.callFake(() => {
      return of([]);
    })
    component.getFileTransfer();
    fixture.detectChanges();
    expect(component.dataSource.data.length).toBe(0);
  });
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
  it('format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('div'))
    inputElement = input.nativeElement
    component.getFileTransfer();
    fixture.detectChanges();
    inputElement.value = 'abC'; 
    fixture.detectChanges();
    const event = new KeyboardEvent('keyup', { key: 'C' });
    inputElement.dispatchEvent(event);
    component.applyFilter(event);
    let searchData= (event.target as HTMLInputElement).value;
    expect(searchData.trim().toLowerCase()).toBe('abc');
    expect(component.dataSource.filter).toEqual('abc');
    expect(inputElement.value).toBe('abC');
    component.filterData();
    expect(component.dataSource.filter).toBe('abc');
  });
  it('Check required validations for fileTransferProtocolsID', () => {
    // let error: any = {};
    let fileTransferProtocolsID = component.fileTransferForm.controls['fileTransferProtocolsID'];
    expect(fileTransferProtocolsID.valid).toBeFalsy();     // when no value is entered
    error = fileTransferProtocolsID.errors || {};
    expect(error['required']).toBeTruthy();
    fileTransferProtocolsID.setValue("21");                 // after setting the value
    fixture.detectChanges();
    expect(fileTransferProtocolsID.valid).toBeTruthy();
  });
  it('showAddFormPage', () => {
    expect(component).toBeTruthy();
    //component.addRecord(data);
    component.showAddFormPage();
    expect(component.showAddForm).toBe(true);
    expect(component.showEditForm).toBe(false);
  });
  it('setPagelabel', () => {
    let lang = {};
    component.setPagelabel(lang);
    let paginator = fixture.debugElement.injector.get(MatPaginator);
    component.dataSource.paginator = paginator;
    paginator.pageIndex = 0;
    expect(lang).toEqual({});
  });
  
  it('it should Add Record', () => {
    const inputData ={
      "fileTransferModel": {          
        "isDeleted": "N",
        "fileTransfersID": 0,
        "fileTransferProtocolsID": 2,
        "protocol": "",
        "home": "Home",
        "ip": "208.242.8.10",
        "fileTransfersKey": "Key 2013",
        "fileTransfersName": "FileTransferName",
        "password": "548dt15@",
        "port": "9846",
        "userName": "UserName",
        "active": true,
        "contractID": 2,
        "transferOptionEnabled": null
      }
    }
    let fileTransferProtocolsID = component.fileTransferForm.controls["fileTransferProtocolsID"];
    fileTransferProtocolsID.setValue(2); 
    let transferOptionEnabled = component.fileTransferForm.controls['transferOptionEnabled'];
    transferOptionEnabled.setValue(false); 
    let home = component.fileTransferForm.controls['home'];
    home.setValue(inputData.fileTransferModel.home); 
    let ip = component.fileTransferForm.controls['ip'];
    ip.setValue(inputData.fileTransferModel.ip); 
    let port = component.fileTransferForm.controls['port'];
    port.setValue(inputData.fileTransferModel.port); 
    let password = component.fileTransferForm.controls['password'];
    password.setValue(inputData.fileTransferModel.password); 
    let userName = component.fileTransferForm.controls['userName'];
    userName.setValue(inputData.fileTransferModel.userName); 
    let fileTransfersName = component.fileTransferForm.controls['fileTransfersName'];
    fileTransfersName.setValue(inputData.fileTransferModel.fileTransfersName); 
    let fileTransfersKey = component.fileTransferForm.controls['fileTransfersKey'];
    fileTransfersKey.setValue(inputData.fileTransferModel.fileTransfersKey); 
    expect(component.fileTransferForm.valid).toBeTruthy();
    fixture.autoDetectChanges();
    component.sort.sort({ id: '', start: 'asc', disableClear: false })
    expect(component.sort).toBeDefined();
    component.searchString;
    let paginator = fixture.debugElement.injector.get(MatPaginator);
    component.dataSource.paginator = paginator;
    paginator.pageIndex = 0;
    component.addRecord(inputData);
  });
  it('it should Update Record', () => {
    const inputData ={
      "fileTransferModel": {          
        "isDeleted": "N",
        "fileTransfersID": 0,
        "fileTransferProtocolsID": 2,
        "protocol": "",
        "home": "Home",
        "ip": "208.242.8.20",
        "fileTransfersKey": "Key 2013",
        "fileTransfersName": "FileTransferName",
        "password": "548dt15@",
        "port": "9846",
        "userName": "UserName",
        "active": true,
        "contractID": 2,
        "transferOptionEnabled": false
      }
    }
    let transferOptionEnabled = component.fileTransferForm.controls['transferOptionEnabled'];
    transferOptionEnabled.setValue(false); 
    let home = component.fileTransferForm.controls['home'];
    home.setValue(inputData.fileTransferModel.home); 
    let ip = component.fileTransferForm.controls['ip'];
    ip.setValue(inputData.fileTransferModel.ip); 
    let port = component.fileTransferForm.controls['port'];
    port.setValue(inputData.fileTransferModel.port); 
    let password = component.fileTransferForm.controls['password'];
    password.setValue(inputData.fileTransferModel.password); 
    let userName = component.fileTransferForm.controls['userName'];
    userName.setValue(inputData.fileTransferModel.userName); 
    let fileTransfersName = component.fileTransferForm.controls['fileTransfersName'];
    fileTransfersName.setValue(inputData.fileTransferModel.fileTransfersName); 
    let fileTransfersKey = component.fileTransferForm.controls['fileTransfersKey'];
    fileTransfersKey.setValue(inputData.fileTransferModel.fileTransfersKey); 
    expect(component.fileTransferForm.valid).toBeFalsy();
    fixture.autoDetectChanges();
    component.sort.sort({ id: '', start: 'asc', disableClear: false })
    expect(component.sort).toBeDefined();
    component.updateBadgeRecord(inputData);
  });
  it('editIconClicked', () => {
    component.editIconClicked(data);
    expect(component.showAddForm).toBeFalsy();
  });
  it('cancelAdd_Save', () => {
    component.cancelAdd_Save();
    expect(component.showAddForm).toBe(false);
    expect(component.showEditForm).toBe(false);
  });

  it('error response when code is 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "categoriesID",
            "code": "5000",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.fileTransferForm.valid).toBeFalse();
  })

  it('error response when message is DuplicateKey and code 5000', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "categoriesID",
            "code": "5000",
            "message": "DuplicateKey"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.fileTransferForm.valid).toBeFalse();
  })

  it('error response when code is not 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "categoriesID",
            "code": "400",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.fileTransferForm.valid).toBeFalse();
  })
});
