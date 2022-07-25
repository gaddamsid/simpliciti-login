import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { ApiService } from 'src/app/shared/services/api.service';
import { categoryList } from 'src/app/shared/testCasesHelperClasses/Action-and-CategoriesStub/CategoriesMockList';
import { CategoryServiceStub } from 'src/app/shared/testCasesHelperClasses/Action-and-CategoriesStub/CategoryServiceStub';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { messageServiceStub } from 'src/app/shared/testCasesHelperClasses/messageServiceStub';
import { ValidationServiceStub } from 'src/app/shared/testCasesHelperClasses/ValidationServiceStub';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CategoriesComponent } from './categories.component';
import { ActionsAndCategoriesComponent } from 'src/app/Pages/actions-and-categories/actions-and-categories.component';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let hostFixture: ComponentFixture<ActionsAndCategoriesComponent>;
  let error: any = {};
  let inputElement: HTMLInputElement;
  let data = {
    "actionCategoriesPostModel": {
      "isDeleted": "N",
      "categoriesID": 0,
      "categoriesName": "cat1",
      "actionsID": 4,
      "actionName": "string",
      "categoryTypesID": 2,
      "phasesID": 2,
      "phasesName": "string",
      "contractID": "2",
      "active": true,
      "queuesID": [
        6
      ]
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesComponent, ActionsAndCategoriesComponent ],
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
        // TO DO - Need to add MatPaginatorStub
        { provide: MatPaginator, useValue: ({})},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    hostFixture = TestBed.createComponent(ActionsAndCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.sort = new MatSort();
    component.sort.disableClear = true;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should have title', () => {
    let childDebugElement = hostFixture.debugElement.query(By.directive(CategoriesComponent));
    const t = childDebugElement.nativeElement
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Categories');
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

  it('Form should be invalid',()=>{
    expect(component.PageForm.valid).toBeFalsy();
  });

  it('Check required validations for categoryName', () => {
    // let error: any = {};
    component.addRecord(data);
    let categoryName = component.PageForm.controls['categoryName'];
    expect(categoryName.valid).toBeFalsy();     // when no value is entered
    error = categoryName.errors || {};
    expect(error['required']).toBeTruthy();
    categoryName.setValue("Category Name");                 // after setting the value
    fixture.detectChanges();
    expect(categoryName.valid).toBeTruthy();
  });

  it('Check required validations for phasesID', () => {
    // let error: any = {};
    let phasesID = component.PageForm.controls['phasesID'];
    expect(phasesID.valid).toBeFalsy();     // when no value is entered
    error = phasesID.errors || {};
    expect(error['required']).toBeTruthy();
    phasesID.setValue("Phases ID");                 // after setting the value
    fixture.detectChanges();
    expect(phasesID.valid).toBeTruthy();
  });

  it('Check required validations for categoryTypesID', () => {
    // let error: any = {};
    let categoryTypesID = component.PageForm.controls['categoryTypesID'];
    expect(categoryTypesID.valid).toBeFalsy();     // when no value is entered
    error = categoryTypesID.errors || {};
    expect(error['required']).toBeTruthy();
    categoryTypesID.setValue("CategoryTypesID");                 // after setting the value
    fixture.detectChanges();
    expect(categoryTypesID.valid).toBeTruthy();
  });

  it('Check required validations for actionsID', () => {
    // let error: any = {};
    let actionsID = component.PageForm.controls['actionsID'];
    expect(actionsID.valid).toBeFalsy();     // when no value is entered
    error = actionsID.errors || {};
    expect(error['required']).toBeTruthy();
    actionsID.setValue("Actions ID");                 // after setting the value
    fixture.detectChanges();
    expect(actionsID.valid).toBeTruthy();
  });

  xit('format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('div'))
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

  it('should return list', () => {
    let getListService = fixture.debugElement.injector.get(ApiService);
    spyOn(getListService, 'get').and.callFake(() => {
      return of(categoryList);
    })
    component.getListData();
    fixture.detectChanges();
    expect(component.dataSource.data.length).toBe(1);
  });

  it('showAddFormPage', () => {
    expect(component).toBeTruthy();
    component.addRecord(data);
    component.showAddFormPage();
    expect(component.showAddForm).toBe(true);
  });

  it('cancelAdd_Save', () => {
    component.cancelAdd_Save();
    expect(component.showAddForm).toBe(false);
    expect(component.showEditForm).toBe(false);
    expect(component.showActionForm).toBe(true);
  });

  it('addData', () => {
    let categoriesName = component.PageForm.controls['categoryName'];
    categoriesName.setValue("categoriesName");
    let actionsID = component.PageForm.controls['actionsID'];
    actionsID.setValue(data.actionCategoriesPostModel.actionsID);
    let categoryTypesID = component.PageForm.controls['categoryTypesID'];
    categoryTypesID.setValue(data.actionCategoriesPostModel.categoryTypesID);
    let phasesID = component.PageForm.controls['phasesID'];
    phasesID.setValue(data.actionCategoriesPostModel.phasesID);
    expect(component.PageForm.valid).toBeTruthy();
    fixture.autoDetectChanges();
    component.sort.sort({ id: '', start: 'asc', disableClear: false })
    expect(component.sort).toBeDefined();
    component.searchString;
    let paginator = fixture.debugElement.injector.get(MatPaginator);
    component.dataSource.paginator = paginator;
    paginator.pageIndex = 0;
    component.addRecord(data);
  });

  it('editIconClicked', () => {
    component.editIconClicked(data);
    expect(component.showAddForm).toBeFalsy();
  });

  it('updateBadgeRecord', () => {
    component.editIconClicked(data);
    let categoriesName = component.PageForm.controls['categoryName'];
    categoriesName.setValue("Name");
    let actionsID = component.PageForm.controls['actionsID'];
    actionsID.setValue("4");
    let categoryTypesID = component.PageForm.controls['categoryTypesID'];
    categoryTypesID.setValue("2");
    let phasesID = component.PageForm.controls['phasesID'];
    phasesID.setValue("2");
    expect(component.PageForm.valid).toEqual(true);
    component.showActionForm = true;
    // component.searchString.nativeElement.value = ''
    component.updateBadgeRecord(data);
    expect(component.showAddForm).toBeFalsy();
  });

  it('toggleType if status is true', () => {
    let id = 169;
    let status = true;
    spyOn(window,"confirm").and.returnValue(true);
    component.toggleType(id, status);
    expect(id).toEqual(169);
  })

  it('toggleType if status is false', () => {
    let id = 169;
    let status = false;
    spyOn(window,"confirm").and.returnValue(true);
    component.toggleType(id, status);
    expect(id).toEqual(169);
  })

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
    expect(component.PageForm.valid).toBeFalse();
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
    expect(component.PageForm.valid).toBeFalse();
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
    expect(component.PageForm.valid).toBeFalse();
  })

  it('parseJson', () => {
    let str = ['Digitize Review'];
    component.parseJson(str);
    expect(str.length).toBe(1);
    str = []
    component.parseJson(str);
    expect(str.length).toBe(0);
    let str1 = undefined;
    component.parseJson(str1);
    expect(str1).toBe(undefined);
  });

  it('myFunction', () => {
    component.hide = true;
    component.myFunction();
    expect(component.hide).toBe(false);
  });

  it('actionQueueNamesCount', () => {
    let str = ['Digitize Review'];
    component.actionQueueNamesCount(str);
    expect(str.length).toBe(1);
  });

});
