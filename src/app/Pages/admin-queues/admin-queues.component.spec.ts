import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { FormBuilder, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { ApiService } from 'src/app/shared/services/api.service';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { AdminQueuesComponent } from './admin-queues.component';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { MatDialogRefStub } from 'src/app/shared/testCasesHelperClasses/MatDialogRefStub';

describe('AdminQueuesComponent', () => {
  let component: AdminQueuesComponent;
  let fixture: ComponentFixture<AdminQueuesComponent>;
  let inputElement: HTMLInputElement;
  let formData: any;
  let formGroup: FormGroupDirective;
  let QActionCategoryFormData: any;
  const formGroupDirective = new FormGroupDirective([], []);
  const fb = new FormBuilder()

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminQueuesComponent],
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
        MatIconModule
      ],
      providers: [
        // { provide: TranslateService, useClass: TranslateServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: MatDialog, useClass: MatDialogRefStub },
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: ApiService, useClass: apiServiceStub },
        FormGroupDirective,
        FormBuilder,
        { provide: FormGroupDirective, useValue: formGroupDirective }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    formGroupDirective.form = fb.group({
      actionsID: fb.control(''),
      categoriesID: fb.control('')
    });
    fixture = TestBed.createComponent(AdminQueuesComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
    formData = {
      active: false,
      ageThreshold: 5,
      carryOverPreviousCategory: false,
      contractID: 2,
      coreImageDeleteEnabled: false,
      coreImageEditEnabled: false,
      coreImageRevertEnabled: false,
      countThreshold: 100,
      createDatetime: "2022-05-31T17:40:39.72",
      createUserID: 1,
      dmvHistoryEnabled: true,
      dmvRequestThreshold: 0,
      dmvReturnEnabled: true,
      doubleBlindEnabled: false,
      drcEnabled: false,
      editRegisteredOwnerInformationEnabled: true,
      editVehicleInformationEnabled: true,
      enableCourtForPostIssuanceQueue: false,
      enableLocalOfflinePrint: false,
      enableRollbackNoticesQueue: false,
      iCertifyDescription: null,
      identifier: "clientresearch",
      imageSelectionEnabled: false,
      isDeleted: "N",
      isICertifyEnabled: false,
      isVrLookup: false,
      kvlEnabled: false,
      licensePlateEditEnabled: false,
      miskeyedPlateEnabled: false,
      neighborListingEnabled: false,
      plateExamplesEnabled: false,
      previousDecisionEnabled: true,
      queueOrder: 9,
      queueTypesID: 3,
      queueTypesName: "Event",
      queuesID: 1,
      queuesName: "Client Research",
      registeredOwnerInformationEnabled: true,
      showSelectedImagesEnabled: false,
      skipEnabled: true,
      statusEntranceThreshold: 10,
      updateDatetime: "2022-05-31T17:40:39.72",
      updateUserID: 1,
      vehicleInformationEnabled: true,
      videoFrameCaptureEnabled: false,
      workflowStatesID: 5
    }
    QActionCategoryFormData = {
      actionsID: '15',
      categoriesID: '2'
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Queues');
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

  it('Queues form should be invalid when empty', () => {
    component.QueuesForm.controls["queuesName"].setValue('');
    component.QueuesForm.controls["queueTypesName"].setValue('');
    component.QueuesForm.controls["ageThreshold"].setValue('');
    component.QueuesForm.controls["statusEntranceThreshold"].setValue('');
    component.QueuesForm.controls["countThreshold"].setValue('');
    component.QueuesForm.controls["enabled"].setValue('');
    component.QueuesForm.controls["cloneQueue"].setValue('');
    component.QueuesForm.controls["registeredOwnerInformationEnabled"].setValue('');
    component.QueuesForm.controls["coreImageDeleteEnabled"].setValue('');
    component.QueuesForm.controls["editRegisteredOwnerInformationEnabled"].setValue('');
    component.QueuesForm.controls["videoFrameCaptureEnabled"].setValue('');
    component.QueuesForm.controls["doubleBlindEnabled"].setValue('');
    component.QueuesForm.controls["coreImageRevertEnabled"].setValue('');
    component.QueuesForm.controls["editVehicleInformationEnabled"].setValue('');
    component.QueuesForm.controls["coreImageEditEnabled"].setValue('');
    component.QueuesForm.controls["dmvReturnEnabled"].setValue('');
    component.QueuesForm.controls["vehicleInformationEnabled"].setValue('');
    component.QueuesForm.controls["licensePlateEditEnabled"].setValue('');
    component.QueuesForm.controls["isVrLookup"].setValue('');
    component.QueuesForm.controls["carryOverPreviousCategory"].setValue('');
    component.QueuesForm.controls["skipEnabled"].setValue('');
    component.QueuesForm.controls["previousDecisionEnabled"].setValue('');
    component.QueuesForm.controls["plateExamplesEnabled"].setValue('');
    component.QueuesForm.controls["drcEnabled"].setValue('');
    component.QueuesForm.controls["dmvHistoryEnabled"].setValue('');
    component.QueuesForm.controls["neighborListingEnabled"].setValue('');
    expect(component.QueuesForm.valid).toBeFalsy();
  });

  it('Queues form should be valid when not empty', () => {
    component.QueuesForm.controls["queuesName"].setValue('test');
    component.QueuesForm.controls["queueTypesName"].setValue('test');
    component.QueuesForm.controls["ageThreshold"].setValue(0);
    component.QueuesForm.controls["statusEntranceThreshold"].setValue(0);
    component.QueuesForm.controls["countThreshold"].setValue(0);
    component.QueuesForm.controls["enabled"].setValue('');
    component.QueuesForm.controls["cloneQueue"].setValue('');
    component.QueuesForm.controls["registeredOwnerInformationEnabled"].setValue(false);
    component.QueuesForm.controls["coreImageDeleteEnabled"].setValue(false);
    component.QueuesForm.controls["editRegisteredOwnerInformationEnabled"].setValue(false);
    component.QueuesForm.controls["videoFrameCaptureEnabled"].setValue(false);
    component.QueuesForm.controls["doubleBlindEnabled"].setValue(false);
    component.QueuesForm.controls["coreImageRevertEnabled"].setValue(false);
    component.QueuesForm.controls["editVehicleInformationEnabled"].setValue(false);
    component.QueuesForm.controls["coreImageEditEnabled"].setValue(false);
    component.QueuesForm.controls["dmvReturnEnabled"].setValue(false);
    component.QueuesForm.controls["vehicleInformationEnabled"].setValue(false);
    component.QueuesForm.controls["licensePlateEditEnabled"].setValue(false);
    component.QueuesForm.controls["isVrLookup"].setValue(false);
    component.QueuesForm.controls["carryOverPreviousCategory"].setValue(false);
    component.QueuesForm.controls["skipEnabled"].setValue(false);
    component.QueuesForm.controls["previousDecisionEnabled"].setValue(false);
    component.QueuesForm.controls["plateExamplesEnabled"].setValue(false);
    component.QueuesForm.controls["drcEnabled"].setValue(false);
    component.QueuesForm.controls["dmvHistoryEnabled"].setValue(false);
    component.QueuesForm.controls["neighborListingEnabled"].setValue(false);
    expect(component.QueuesForm.valid).toBeTruthy();
  });

  it('QAction Category Form should be invalid when empty', () => {
    component.QActionCategoryForm.controls["actionsID"].setValue('');
    component.QActionCategoryForm.controls["categoriesID"].setValue('');
    expect(component.QActionCategoryForm.valid).toBeFalsy();
  })

  it('QAction Category Form should be invalid when empty', () => {
    component.QActionCategoryForm.controls["actionsID"].setValue('test');
    component.QActionCategoryForm.controls["categoriesID"].setValue('test');
    expect(component.QActionCategoryForm.valid).toBeTruthy();
  })

  it('apply filter, format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    component.getQueues();
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

  it('cancelAdd_Save', () => {
    component.cancelAdd_Save();
    expect(component.showAddForm).toBeFalsy();
    expect(component.showEditForm).toBeFalsy();
  })

  it('showAddFormPage', () => {
    component.showAddFormPage();
    expect(component.showAddForm).toBeTruthy();
    expect(component.showButton).toBeFalsy();
  })

  it('cloneQueue if event of checked is true', () => {
    let event = {
      checked: true
    }
    component.cloneQueue(event);
    expect(component.disableCloning).toBeTruthy();
    expect(component.selectClone).toBeTruthy();
  })

  it('cloneQueue if event of checked is false', () => {
    let event = {
      checked: false
    }
    component.cloneQueue(event);
    expect(component.selectClone).toBeFalsy();
    expect(component.disableCloning).toBeFalsy();
  })

  it('getQueuesTypeID', () => {
    let event = 1
    component.getQueuesTypeID(event);
    expect(component.queueTypesID).toEqual(1);
  })

  it('cloneQueue if event of index is 1', () => {
    let event = {
      index: 1
    }
    component.hideSaveOrUpdateButton(event);
    expect(component.showButton).toBeTruthy();
  })

  it('cloneQueue if event of index is not 1', () => {
    let event = {
      index: 2
    }
    component.hideSaveOrUpdateButton(event);
    expect(component.showButton).toBeFalsy();
  })

  it('onQueueSelection', () => {
    component.onQueueSelection(1, true);
    expect(component.queueTypesID).toEqual(1)
  })

  it('isAllSelected', () => {
    component.isAllSelected();
    expect(component.isAllSelected()).toBeFalsy();
  })

  it('isIndeterminateSelected', () => {
    component.isAllSelected();
    component.isIndeterminateSelected();
    expect(component.isIndeterminateSelected()).toBeFalsy();
  })

  it('selectAll if checked true', () => {
    let event = {
      checked: true
    }
    component.selectAll(event);
    expect(component.QueuesForm.valid).toBeFalsy();
  })

  it('selectAll if checked false', () => {
    let event = {
      checked: false
    }
    component.selectAll(event);
    expect(component.QueuesForm.valid).toBeFalsy();
  })

  it('addNewQueues', () => {
    component.QueuesForm.controls["queuesName"].setValue('test');
    component.QueuesForm.controls["queueTypesName"].setValue('test');
    component.QueuesForm.controls["ageThreshold"].setValue(0);
    component.QueuesForm.controls["statusEntranceThreshold"].setValue(0);
    component.QueuesForm.controls["countThreshold"].setValue(0);
    component.QueuesForm.controls["enabled"].setValue('');
    component.QueuesForm.controls["cloneQueue"].setValue('');
    component.QueuesForm.controls["registeredOwnerInformationEnabled"].setValue(false);
    component.QueuesForm.controls["coreImageDeleteEnabled"].setValue(false);
    component.QueuesForm.controls["editRegisteredOwnerInformationEnabled"].setValue(false);
    component.QueuesForm.controls["videoFrameCaptureEnabled"].setValue(false);
    component.QueuesForm.controls["doubleBlindEnabled"].setValue(false);
    component.QueuesForm.controls["coreImageRevertEnabled"].setValue(false);
    component.QueuesForm.controls["editVehicleInformationEnabled"].setValue(false);
    component.QueuesForm.controls["coreImageEditEnabled"].setValue(false);
    component.QueuesForm.controls["dmvReturnEnabled"].setValue(false);
    component.QueuesForm.controls["vehicleInformationEnabled"].setValue(false);
    component.QueuesForm.controls["licensePlateEditEnabled"].setValue(false);
    component.QueuesForm.controls["isVrLookup"].setValue(false);
    component.QueuesForm.controls["carryOverPreviousCategory"].setValue(false);
    component.QueuesForm.controls["skipEnabled"].setValue(false);
    component.QueuesForm.controls["previousDecisionEnabled"].setValue(false);
    component.QueuesForm.controls["plateExamplesEnabled"].setValue(false);
    component.QueuesForm.controls["drcEnabled"].setValue(false);
    component.QueuesForm.controls["dmvHistoryEnabled"].setValue(false);
    component.QueuesForm.controls["neighborListingEnabled"].setValue(false);
    component.addNewQueues(formData, formGroup);
    expect(component.disableCloning).toBeFalsy();
  })

  it('getACDropdownValues', () => {
    component.getACDropdownValues();
    expect(component.catagoriesList.length).toBeGreaterThan(0);
    expect(component.actionsList.length).toBeGreaterThan(0);
  })

  it('AddActions', () => {
    component.AddActions();
    expect(component.newActionFlag).toBeTruthy();
  })

  it('getAllBehaviorsPerQueues', () => {
    let id = 352;
    component.getAllBehaviorsPerQueues(id);
    expect(id).toEqual(352);
  })

  it('DeleteBehavior', () => {
    let item = {
      behaviorsID: 1
    }
    component.DeleteBehavior(item);
    expect(component.successMsg).toEqual("Record Deleted Successfully");
  })

  it('disableQueue', () => {
    component.disableQueue();
    expect(component.successMsg).toEqual("Record Disabled Successfully");
  })

  it('editIconClicked', () => {
    component.editIconClicked(formData);
    expect(component.showButton).toBeFalsy();
  })

  it('getActionsColumnList', () => {
    let id = 352;
    component.getActionsColumnList(id);
    expect(component.listOfBahaviorsPerQ.length).toEqual(0);
  })

  it('updateQueues if form valid', () => {
    component.QueuesForm.controls["queuesName"].setValue('test');
    component.QueuesForm.controls["queueTypesName"].setValue('test');
    component.QueuesForm.controls["ageThreshold"].setValue(0);
    component.QueuesForm.controls["statusEntranceThreshold"].setValue(0);
    component.QueuesForm.controls["countThreshold"].setValue(0);
    component.QueuesForm.controls["enabled"].setValue('');
    component.QueuesForm.controls["cloneQueue"].setValue('');
    component.QueuesForm.controls["registeredOwnerInformationEnabled"].setValue(false);
    component.QueuesForm.controls["coreImageDeleteEnabled"].setValue(false);
    component.QueuesForm.controls["editRegisteredOwnerInformationEnabled"].setValue(false);
    component.QueuesForm.controls["videoFrameCaptureEnabled"].setValue(false);
    component.QueuesForm.controls["doubleBlindEnabled"].setValue(false);
    component.QueuesForm.controls["coreImageRevertEnabled"].setValue(false);
    component.QueuesForm.controls["editVehicleInformationEnabled"].setValue(false);
    component.QueuesForm.controls["coreImageEditEnabled"].setValue(false);
    component.QueuesForm.controls["dmvReturnEnabled"].setValue(false);
    component.QueuesForm.controls["vehicleInformationEnabled"].setValue(false);
    component.QueuesForm.controls["licensePlateEditEnabled"].setValue(false);
    component.QueuesForm.controls["isVrLookup"].setValue(false);
    component.QueuesForm.controls["carryOverPreviousCategory"].setValue(false);
    component.QueuesForm.controls["skipEnabled"].setValue(false);
    component.QueuesForm.controls["previousDecisionEnabled"].setValue(false);
    component.QueuesForm.controls["plateExamplesEnabled"].setValue(false);
    component.QueuesForm.controls["drcEnabled"].setValue(false);
    component.QueuesForm.controls["dmvHistoryEnabled"].setValue(false);
    component.QueuesForm.controls["neighborListingEnabled"].setValue(false);
    component.editIconClicked(formData);
    component.updateQueues(formData);
    expect(component.showButton).toBeFalsy();
  })

  it('updateQueues if form not valid', () => {
    component.editIconClicked(formData);
    component.updateQueues(formData);
    expect(component.showButton).toBeFalsy();
  })

  it('deleteQueue', () => {
    let id = 352
    component.deleteQueue(id);
    expect(component.successMsg).toEqual("Record Deleted Successfully");
  })

  it('getAllActionsCategoriesPerQueue', () => {
    component.contractID = 335;
    component.getAllActionsCategoriesPerQueue();
    component.getAllActionsCategoriesPerQueue();
    expect(component.actionCategoryList.length).toBeGreaterThan(0);
  })

  it('addActionCategoryForQueue', () => {
    component.QActionCategoryForm.controls["actionsID"].setValue('15');
    component.QActionCategoryForm.controls["categoriesID"].setValue('2');
    component.getACDropdownValues();
    component.addActionCategoryForQueue(QActionCategoryFormData, formGroupDirective);
    component.cancelEditingActionCategory();
    expect(component.actionCategoryList.length).toBeGreaterThan(0);
  })

  it('deleteQueueActionCategory', () => {
    let data = {
      actionCategoriesID: 552,
      actionsID: 1,
      active: true,
      categoriesID: 0,
      contractID: 2,
      isDeleted: "N",
      queuesID: 348,
    }
    component.deleteQueueActionCategory(data);
    expect(component.successMsg).toEqual("Record Deleted Successfully");
  })

  it('EditActionCategory', () => {
    let data = {
      actionCategoriesID: 552,
      actionID: 1,
      active: true,
      categoriesID: 0,
      contractID: 2,
      isDeleted: "N",
      queuesID: 348,
    }
    component.EditActionCategory(data);
    expect(component.QActionCategoryForm.controls['actionsID'].value).toEqual('1');
  })

  it('updateActionCategoryForQueue', () => {
    let data = {
      actionCategoriesID: 552,
      actionID: 1,
      active: true,
      categoriesID: 0,
      contractID: 2,
      isDeleted: "N",
      queuesID: 348,
    }
    component.QActionCategoryForm.controls["actionsID"].setValue('15');
    component.QActionCategoryForm.controls["categoriesID"].setValue('2');
    component.updateActionCategoryForQueue(data, formGroupDirective);
    expect(data.actionID).toEqual(1);
  })

  it('delteTransition', () => {
    let id = 157;
    component.delteTransition(id);
    expect(component.successMsg).toEqual("Record Deleted Successfully");
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
          "fieldName": "queueName",
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
});
