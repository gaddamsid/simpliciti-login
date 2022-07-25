import { ComponentFixture, TestBed, getTestBed, fakeAsync } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { ApiService } from 'src/app/shared/services/api.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { messageServiceStub } from 'src/app/shared/testCasesHelperClasses/messageServiceStub';
import { ValidationServiceStub } from 'src/app/shared/testCasesHelperClasses/ValidationServiceStub';
import { ActionList } from 'src/app/shared/testCasesHelperClasses/Action-and-CategoriesStub/ActionMockList';
import { ActionServiceStub } from 'src/app/shared/testCasesHelperClasses/Action-and-CategoriesStub/ActionServiceStub';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionsAndCategoriesComponent } from './actions-and-categories.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ActionsAndCategoriesComponent', () => {
  let component: ActionsAndCategoriesComponent;
  let fixture: ComponentFixture<ActionsAndCategoriesComponent>;
  let error: any = {};
  let inputElement: HTMLInputElement;
  let editData = {
    "actionsModel": {
      "createUserID": 0,
      "updateUserID": 0,
      "createDatetime": "2022-04-27T10:00:20.245Z",
      "updateDatetime": "2022-04-27T10:00:20.245Z",
      "isDeleted": "N",
      "actionsID": 0,
      "contractID": "2",
      "active": true,
      "actionsName": "Test jazz",
      "actionQueueNames": [
        "string"
      ]
    }
  }
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ ActionsAndCategoriesComponent ],
      schemas: [NO_ERRORS_SCHEMA],
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
        MatTooltipModule
      ],
      providers: [
        { provide: ToastrService, useClass: ToasterServiceStub},
        // { provide: TranslateService, useClass:TranslateServiceStub},
        { provide: LanguageService, useClass:languageServiceStub},
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ValidationService, useValue: ValidationServiceStub},
        { provide: MessageService, useClass: messageServiceStub},
        { provide: ApiService, useClass: ActionServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsAndCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Actions');
  });

  it('Form should be invalid',()=>{
    expect(component.actionForm.valid).toBeFalsy();
  });

  it('Check required validations for actionsName', () => {
    // let error: any = {};
    let actionsName = component.actionForm.controls['actionsName'];
    expect(actionsName.valid).toBeFalsy();     // when no value is entered
    error = actionsName.errors || {};
    expect(error['required']).toBeTruthy();
    actionsName.setValue("Actions Name");                 // after setting the value
    fixture.detectChanges();
    expect(actionsName.valid).toBeTruthy();
  });

  it('should return list', () => {
    // let serviceStub = apiServiceSpy.get.and.returnValue(of(ActionList));
    let getListService = fixture.debugElement.injector.get(ApiService);
    spyOn(getListService, 'get').and.callFake(() => {
      return of(ActionList);
    })
    component.getListData();
    fixture.detectChanges();
    // expect(component.dataSource.data).toBe(ActionList);
    expect(component.dataSource.data.length).toBe(60);
    expect(component.sort.disableClear).toBeTruthy();
  });

  it('format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    component.getListData();
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

  it('showAddFormPage', () => {
    expect(component).toBeTruthy();
    component.showAddFormPage();
    expect(component.showAddForm).toBe(true);
  });

  it('cancelAdd_Save', () => {
    component.cancelAdd_Save();
    expect(component.showAddForm).toBe(false);
    expect(component.showEditForm).toBe(false);
    expect(component.showCatForm).toBe(true);
  });

  it('addData', fakeAsync(() => {
    expect(component.sort.sort).toBeDefined()
    let addData = {
      "actionsModel": {
        "createUserID": 0,
        "updateUserID": 0,
        "createDatetime": "2022-04-27T10:00:20.245Z",
        "updateDatetime": "2022-04-27T10:00:20.245Z",
        "isDeleted": "N",
        "actionsID": 0,
        "contractID": "2",
        "active": true,
        "actionsName": "Test jazz",
        "actionQueueNames": [
          "string"
        ]
      }
    }
    let actionsName = component.actionForm.controls['actionsName'];
    actionsName.setValue(addData.actionsModel.actionsName); 
    expect(component.actionForm.valid).toBeTruthy();
    component.addRecord(addData);
    fixture.detectChanges();
    component.actionForm.reset();
    component.getListData();
    expect(component.paginator.pageIndex).toBe(0);
    expect(component.showAddForm).toBeFalsy();
    expect(component.searchString.nativeElement.value).toBe('');
    
   
  }));

  it('editIconClicked', () => {
    component.editIconClicked(editData);
    expect(component.showCatForm).toBeFalsy();
    expect(component.showEditForm).toBeTruthy();
    let actionsName = component.actionForm.controls['actionsName'];
    actionsName.setValue(editData.actionsModel.actionsName);
  });

  it('updateRecord', () => {
    let updateData = {
      "actionsModel": {
        "createUserID": 0,
        "updateUserID": 0,
        "createDatetime": "2022-04-27T10:00:20.245Z",
        "updateDatetime": "2022-04-27T10:00:20.245Z",
        "isDeleted": "N",
        "actionsID": 0,
        "contractID": "2",
        "active": true,
        "actionsName": "Test jazz",
        "actionQueueNames": []
      }
    }
    component.editIconClicked(editData);
    let actionsName = component.actionForm.controls['actionsName'];
    actionsName.setValue(updateData.actionsModel.actionsName); 
    expect(component.actionForm.valid).toBeTruthy();
    component.updateBadgeRecord(updateData);
    fixture.detectChanges();
    expect(component.searchString.nativeElement.value).toBe("");
  });

  it('toggleType if status is true', () => {
    let id = 106;
    let status = true;
    spyOn(window,"confirm").and.returnValue(true);
    component.toggleType(id, status);
    expect(id).toEqual(106);
  })

  it('toggleType if status is false', () => {
    let id = 106;
    let status = false;
    spyOn(window,"confirm").and.returnValue(true);
    component.toggleType(id, status);
    expect(id).toEqual(106);
  });

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
    expect(component.actionForm.valid).toBeFalse();
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
    expect(component.actionForm.valid).toBeFalse();
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
    expect(component.actionForm.valid).toBeFalse();
  });

  it('myFunction', () => {
    component.hide = true;
    component.myFunction();
    expect(component.hide).toBe(false);
  });

  it('parseJson', () => {
    let str = ['Digitize Review'];
    // spyOn(component, 'parseJson');
    component.parseJson(str);
    expect(str.length).toBe(1);
    str = []
    component.parseJson(str);
    expect(str.length).toBe(0);
    // let str1 = undefined;
    // component.parseJson(str1);
    // expect(str1).toBe(undefined);
  });

  it('onCategoriADDEdit', () => {
    let data = "testUT"
    component.onCategoriADDEdit(data);
    // fixture.detectChanges();
    expect(data).toBe("testUT");
  });

  it('onAcionList', () => {
    let data = "testUT"
    component.onAcionList(data);
    // fixture.detectChanges();
    expect(data).toBe("testUT");
  });

});
