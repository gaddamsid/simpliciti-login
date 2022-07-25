import { ComponentFixture, fakeAsync, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { apiServiceStub } from '../../testCasesHelperClasses/apiServiceStub';
import { languageServiceStub } from '../../testCasesHelperClasses/languageServiceStub';
import { TranslateServiceStub } from '../../testCasesHelperClasses/TranslateServiceStub.class';
import { TranslateStubsModule } from '../../testCasesHelperClasses/TranslateStubsModule.module';
import { LanguageService } from '../header/languages.service';

import { TransitionDialogComponent } from './transition-dialog.component';

describe('TransitionDialogComponent', () => {
  let component: TransitionDialogComponent;
  let fixture: ComponentFixture<TransitionDialogComponent>;

  let toastrService: jasmine.SpyObj<ToastrService>
  const formGroupDirective = new FormGroupDirective([], []);

  const dialogMock = {
    close: () => { }
  };

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success', 'info']);
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateStubsModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule
      ],
      declarations: [TransitionDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: ApiService, useClass: apiServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: ToastrService, useValue: toastrService },
        { provide: TranslateService, useClass: TranslateServiceStub },
        FormGroupDirective,
        FormBuilder,
        { provide: FormGroupDirective, useValue: formGroupDirective }
      ]
    })
      .compileComponents();
  });
  let transitionDialogRef: MatDialogRef<TransitionDialogComponent>;
  beforeEach(() => {
    fixture = TestBed.createComponent(TransitionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    transitionDialogRef = TestBed.inject(MatDialogRef);
    spyOn(window, "confirm").and.returnValue(true);
    component.ngOnInit();
  });

  it('should create', () => {
    component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render title in h3 tag', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('New Transition');
  });

  it('should call addItem() method', () => {
    spyOn(component, 'addItem').and.callThrough();
    component.addItem();
    expect(component.addItem).toHaveBeenCalled();
  });

  it('qualityControlChecked if checked true', () => {
    let e = {
      checked: true
    }
    component.qualityControlChecked(e);
  });

  it('qualityControlChecked if checked false', () => {
    let e = {
      checked: false
    }
    component.qualityControlChecked(e);
  });

  it('should call transitionTypeChange() with case 1', () => {
    component.transitionTypeChange('1');
    fixture.detectChanges();
    expect(component.timedTransitionType).toBeFalsy();
    expect(component.transitionForm.controls["duration"]).toBeFalsy();
    expect(component.transitionForm.controls["relativeDateTypesID"]).toBeFalsy();
    expect(component.transitionForm.controls["relativeDateDayTypesID"]).toBeFalsy();
    expect(component.transitionForm.controls["categoriesID"]).toBeFalsy();
    expect(component.transitionForm.controls["enableQualityControl"]).toBeTruthy();
    expect(component.transitionForm.controls["percentage"]).toBeTruthy();
  });

  it('should call transitionTypeChange() with case 2', () => {
    component.transitionTypeChange('2');
    fixture.detectChanges();
    expect(component.transitionForm.controls["enableQualityControl"]).toBeFalsy();
    expect(component.transitionForm.controls["percentage"]).toBeFalsy();
    expect(component.timedTransitionType).toBeTruthy();
    expect(component.transitionForm.controls["duration"]).toBeTruthy();
    expect(component.transitionForm.controls["relativeDateTypesID"]).toBeTruthy();
    expect(component.transitionForm.controls["relativeDateDayTypesID"]).toBeTruthy();
    expect(component.transitionForm.controls["categoriesID"]).toBeTruthy();
  });

  it('should call transitionTypeChange() with wrong case', () => {
    component.transitionTypeChange('0');
    fixture.detectChanges();
    expect(component.transitionForm.valid).toBeFalsy();
  });

  it('should call getDestinationWorkflowstatesName() method', () => {
    spyOn(component, 'getDestinationWorkflowstatesName').and.callThrough();
    component.getDestinationWorkflowstatesName(1);
    expect(component.getDestinationWorkflowstatesName).toHaveBeenCalled();
  });

  it('should call fieldActionSelected() method when fieldsID 0', () => {
    let fieldsID = 0;
    spyOn(component, 'fieldActionSelected').and.callThrough();
    component.getTransitionDropdowns;
    component.fieldActionSelected(fieldsID, 0);
    expect(component.fieldActionSelected).toHaveBeenCalled();
  });

  it('should call fieldActionSelected() method when fieldsID 66', () => {
    let fieldsID = 66;
    spyOn(component, 'fieldActionSelected').and.callThrough();
    component.getTransitionDropdowns;
    component.fieldActionSelected(fieldsID, 0);
    expect(component.fieldActionSelected).toHaveBeenCalled();
  });

  it('should call editTransitions() method transition type Timed', () => {
    let rowData = {
      active: true,
      automaticTransitionsModel: {
        duration: 2,
        relativeDateTypesID: 1,
        categoriesID: 2,
        relativeDateDayTypesID: 1
      },
      clauses: [
        {
          active: true,
          clauseOrder: 0,
          clauseValue: "",
          clausesID: 183,
          contractID: 2,
          createDatetime: "2022-07-06T11:05:20.557",
          createUserID: 0,
          fieldsID: 0,
          isDeleted: "N",
          joinOperatorsID: 21,
          operatorsID: 19,
          transitionsID: 157,
          updateDatetime: "2022-07-06T11:05:20.557",
          updateUserID: 0
        }
      ],
      contractID: 2,
      createDatetime: "2022-07-06T11:06:49.407",
      createUserID: 0,
      destinationWorkflowStatesID: 20,
      enableQualityControl: false,
      isDeleted: "N",
      qualityControlModel: null,
      sourceWorkflowStatesID: 324,
      transitionTypeID: 1,
      transitionTypeName: null,
      transitionsID: 158,
      transitionsName: "Conditional -END",
      updateDatetime: "2022-07-06T11:06:49.407",
      updateUserID: 0
    }
    component.data.transitionsType = 'Timed';
    component.editTransitions(rowData);
    expect(component.data.transitionsType).toEqual('Timed');
  });

  it('should call editTransitions() method if transition type Conditional', () => {
    let rowData = {
      active: true,
      automaticTransitionsModel: {
        duration: 2,
        relativeDateTypesID: 1,
        categoriesID: 2,
        relativeDateDayTypesID: 1
      },
      clauses: [
        {
          active: true,
          clauseOrder: 0,
          clauseValue: "",
          clausesID: 183,
          contractID: 2,
          createDatetime: "2022-07-06T11:05:20.557",
          createUserID: 0,
          fieldsID: 0,
          isDeleted: "N",
          joinOperatorsID: 21,
          operatorsID: 19,
          transitionsID: 157,
          updateDatetime: "2022-07-06T11:05:20.557",
          updateUserID: 0
        }
      ],
      contractID: 2,
      createDatetime: "2022-07-06T11:06:49.407",
      createUserID: 0,
      destinationWorkflowStatesID: 20,
      enableQualityControl: false,
      isDeleted: "N",
      qualityControlModel: null,
      sourceWorkflowStatesID: 324,
      transitionTypeID: 1,
      transitionTypeName: null,
      transitionsID: 158,
      transitionsName: "Conditional -END",
      updateDatetime: "2022-07-06T11:06:49.407",
      updateUserID: 0
    }
    component.data.transitionsType = 'Conditional';
    component.editTransitions(rowData);
    expect(component.data.transitionsType).toEqual('Conditional');
  });

  it('should call editTransitions() method if transition type Conditional enableQualityControl', () => {
    let rowData = {
      active: true,
      automaticTransitionsModel: {
        duration: 2,
        relativeDateTypesID: 1,
        categoriesID: 2,
        relativeDateDayTypesID: 1
      },
      clauses: [
        {
          active: true,
          clauseOrder: 0,
          clauseValue: "Test",
          clausesID: 183,
          contractID: 2,
          createDatetime: "2022-07-06T11:05:20.557",
          createUserID: 0,
          fieldsID: 0,
          isDeleted: "N",
          joinOperatorsID: 21,
          operatorsID: 19,
          transitionsID: 157,
          updateDatetime: "2022-07-06T11:05:20.557",
          updateUserID: 0
        }
      ],
      contractID: 2,
      createDatetime: "2022-07-06T11:06:49.407",
      createUserID: 0,
      destinationWorkflowStatesID: 20,
      enableQualityControl: true,
      isDeleted: "N",
      qualityControlModel: null,
      sourceWorkflowStatesID: 324,
      transitionTypeID: 1,
      transitionTypeName: null,
      transitionsID: 158,
      transitionsName: "Conditional -END",
      updateDatetime: "2022-07-06T11:06:49.407",
      updateUserID: 0
    }
    component.data.transitionsType = 'Conditional';
    component.editTransitions(rowData);
    expect(component.data.transitionsType).toEqual('Conditional');
  });

  it('should call editTransitions() method if transition type is emptys', () => {
    let rowData = {
      active: true,
      automaticTransitionsModel: {
        duration: 2,
        relativeDateTypesID: 1,
        categoriesID: 2,
        relativeDateDayTypesID: 1
      },
      clauses: [
        {
          active: true,
          clauseOrder: 0,
          clauseValue: "Test",
          clausesID: 183,
          contractID: 2,
          createDatetime: "2022-07-06T11:05:20.557",
          createUserID: 0,
          fieldsID: 0,
          isDeleted: "N",
          joinOperatorsID: 21,
          operatorsID: 19,
          transitionsID: 157,
          updateDatetime: "2022-07-06T11:05:20.557",
          updateUserID: 0
        }
      ],
      contractID: 2,
      createDatetime: "2022-07-06T11:06:49.407",
      createUserID: 0,
      destinationWorkflowStatesID: 20,
      enableQualityControl: true,
      isDeleted: "N",
      qualityControlModel: null,
      sourceWorkflowStatesID: 324,
      transitionTypeID: 1,
      transitionTypeName: null,
      transitionsID: 158,
      transitionsName: "Conditional -END",
      updateDatetime: "2022-07-06T11:06:49.407",
      updateUserID: 0
    }
    component.data.transitionsType = '';
    component.editTransitions(rowData);
    expect(component.data.transitionsType).toEqual('');
  });

  it('should call addClause() method', () => {
    spyOn(component, 'addClause').and.callThrough();
    component.addClause();
    expect(component.addClause).toHaveBeenCalled();
  });

  it('should call close() method', () => {
    spyOn(component, 'close').and.callThrough();
    component.close(true);
    expect(component.close).toHaveBeenCalled();
  });

  it('should call confirm() method', () => {
    spyOn(component, 'close').and.callThrough();
    spyOn(transitionDialogRef, 'close').and.callThrough();
    component.confirm();
    expect(component.close).toHaveBeenCalled();
    expect(transitionDialogRef.close).toHaveBeenCalled();
  });

  it('should call onEsc() method', () => {
    spyOn(component, 'close').and.callThrough();
    spyOn(transitionDialogRef, 'close').and.callThrough();
    component.onEsc();
    expect(component.close).toHaveBeenCalled();
    expect(transitionDialogRef.close).toHaveBeenCalled();
  });

  it('should call JoinOperatorChange() method', () => {
    component.clause;
    component.getTransitionDropdowns;
    expect(component.joinOperatorsDropdownList).toBeTruthy();
    component.JoinOperatorChange('13', 0);
    component.JoinOperatorChange('14', 0);
    component.JoinOperatorChange('21', 0);
  });

  it('addNewTransition when timedTransitionType true', () => {
    let rowData = {
      active: true,
      automaticTransitionsModel: {
        duration: 2,
        relativeDateTypesID: 1,
        categoriesID: 2,
        relativeDateDayTypesID: 1
      },
      clause: [
        {
          active: true,
          clauseOrder: 0,
          clauseValue: "Test",
          clausesID: 183,
          contractID: 2,
          createDatetime: "2022-07-06T11:05:20.557",
          createUserID: 0,
          fieldsID: 0,
          isDeleted: "N",
          joinOperatorsID: 21,
          operatorsID: 19,
          transitionsID: 157,
          updateDatetime: "2022-07-06T11:05:20.557",
          updateUserID: 0
        }
      ],
      contractID: 2,
      createDatetime: "2022-07-06T11:06:49.407",
      createUserID: 0,
      destinationWorkflowStatesID: 1,
      enableQualityControl: true,
      isDeleted: "N",
      qualityControlModel: null,
      sourceWorkflowStatesID: 324,
      transitionTypeID: 1,
      transitionTypeName: null,
      transitionsID: 158,
      transitionsName: "Conditional -END",
      updateDatetime: "2022-07-06T11:06:49.407",
      updateUserID: 0
    }
    component.transitionForm.controls["transitionTypesID"].setValue(1);
    component.transitionForm.controls["destinationWorkflowStatesID"].setValue(1);
    component.transitionForm.controls["duration"].setValue(1);
    component.transitionForm.controls["percentage"].setValue(0);
    component.transitionForm.controls["relativeDateTypesID"].setValue(0);
    component.transitionForm.controls["relativeDateDayTypesID"].setValue(1);
    component.transitionForm.controls["categoriesID"].setValue(1);
    component.transitionForm.controls["enableQualityControl"].setValue(true);
    component.transitionForm.controls["clause"].setValue([
      {
        actionID: "",
        fieldsID: null,
        joinOperatorsID: null,
        operatorsID: null
      }
    ]);
    component.addNewTransition(rowData, formGroupDirective);
    expect(component.timedTransitionType).toBeTruthy();
  })

  it('addNewTransition when conditionalTransitionType true', () => {
    let rowData = {
      active: true,
      automaticTransitionsModel: {
        duration: 2,
        relativeDateTypesID: 1,
        categoriesID: 2,
        relativeDateDayTypesID: 1
      },
      clause: [
        {
          active: true,
          clauseOrder: 0,
          clauseValue: "Test",
          clausesID: 183,
          contractID: 2,
          createDatetime: "2022-07-06T11:05:20.557",
          createUserID: 0,
          fieldsID: 0,
          isDeleted: "N",
          joinOperatorsID: 21,
          operatorsID: 19,
          transitionsID: 157,
          updateDatetime: "2022-07-06T11:05:20.557",
          updateUserID: 0
        }
      ],
      contractID: 2,
      createDatetime: "2022-07-06T11:06:49.407",
      createUserID: 0,
      destinationWorkflowStatesID: 1,
      enableQualityControl: true,
      isDeleted: "N",
      qualityControlModel: null,
      sourceWorkflowStatesID: 324,
      transitionTypeID: 1,
      transitionTypeName: null,
      transitionsID: 158,
      transitionsName: "Conditional -END",
      updateDatetime: "2022-07-06T11:06:49.407",
      updateUserID: 0
    }
    component.transitionForm.controls["transitionTypesID"].setValue(1);
    component.transitionForm.controls["destinationWorkflowStatesID"].setValue(1);
    component.transitionForm.controls["duration"].setValue(1);
    component.transitionForm.controls["percentage"].setValue(0);
    component.transitionForm.controls["relativeDateTypesID"].setValue(0);
    component.transitionForm.controls["relativeDateDayTypesID"].setValue(1);
    component.transitionForm.controls["categoriesID"].setValue(1);
    component.transitionForm.controls["enableQualityControl"].setValue(true);
    component.transitionForm.controls["clause"].setValue([
      {
        actionID: "",
        fieldsID: null,
        joinOperatorsID: null,
        operatorsID: null
      }
    ]);
    component.timedTransitionType = false;
    component.conditionalTransitionType = true;
    component.addNewTransition(rowData, formGroupDirective);
    expect(component.timedTransitionType).toBeFalsy();
  })

  it('updateTransition when transitionsType is Timed', () => {
    let rowData = {
      active: true,
      automaticTransitionsModel: {
        duration: 2,
        relativeDateTypesID: 1,
        categoriesID: 2,
        relativeDateDayTypesID: 1
      },
      clause: [
        {
          active: true,
          clauseOrder: 0,
          clauseValue: "Test",
          clausesID: 183,
          contractID: 2,
          createDatetime: "2022-07-06T11:05:20.557",
          createUserID: 0,
          fieldsID: 0,
          isDeleted: "N",
          joinOperatorsID: 21,
          operatorsID: 19,
          transitionsID: 157,
          updateDatetime: "2022-07-06T11:05:20.557",
          updateUserID: 0
        }
      ],
      contractID: 2,
      createDatetime: "2022-07-06T11:06:49.407",
      createUserID: 0,
      destinationWorkflowStatesID: 1,
      enableQualityControl: true,
      isDeleted: "N",
      qualityControlModel: null,
      sourceWorkflowStatesID: 324,
      transitionTypeID: 1,
      transitionTypeName: 'Timed',
      transitionsID: 158,
      transitionsName: "Conditional -END",
      updateDatetime: "2022-07-06T11:06:49.407",
      updateUserID: 0
    }
    component.transitionForm.controls["transitionTypesID"].setValue(1);
    component.transitionForm.controls["destinationWorkflowStatesID"].setValue(1);
    component.transitionForm.controls["duration"].setValue(1);
    component.transitionForm.controls["percentage"].setValue(0);
    component.transitionForm.controls["relativeDateTypesID"].setValue(0);
    component.transitionForm.controls["relativeDateDayTypesID"].setValue(1);
    component.transitionForm.controls["categoriesID"].setValue(1);
    component.transitionForm.controls["enableQualityControl"].setValue(true);
    component.transitionForm.controls["clause"].setValue([
      {
        actionID: "",
        fieldsID: null,
        joinOperatorsID: null,
        operatorsID: null
      }
    ]);
    component.data.transitionsType = "Timed";
    component.data.QData = rowData;
    component.data.QData['clauses'] = [
      {
        active: true,
        clauseOrder: 0,
        clauseValue: "Test",
        clausesID: 183,
        contractID: 2,
        createDatetime: "2022-07-06T11:05:20.557",
        createUserID: 0,
        fieldsID: 0,
        isDeleted: "N",
        joinOperatorsID: 21,
        operatorsID: 19,
        transitionsID: 157,
        updateDatetime: "2022-07-06T11:05:20.557",
        updateUserID: 0
      },
      {
        active: true,
        clauseOrder: 0,
        clauseValue: "Test",
        clausesID: 183,
        contractID: 2,
        createDatetime: "2022-07-06T11:05:20.557",
        createUserID: 0,
        fieldsID: 0,
        isDeleted: "N",
        joinOperatorsID: 21,
        operatorsID: 19,
        transitionsID: 157,
        updateDatetime: "2022-07-06T11:05:20.557",
        updateUserID: 0
      }
    ]
    component.updateTransition(rowData);
  })

  it('updateTransition when transitionsType is Conditional', () => {
    let rowData = {
      active: true,
      automaticTransitionsModel: {
        duration: 2,
        relativeDateTypesID: 1,
        categoriesID: 2,
        relativeDateDayTypesID: 1
      },
      clause: [
        {
          active: true,
          clauseOrder: 0,
          clauseValue: "Test",
          clausesID: 183,
          contractID: 2,
          createDatetime: "2022-07-06T11:05:20.557",
          createUserID: 0,
          fieldsID: 0,
          isDeleted: "N",
          joinOperatorsID: 21,
          operatorsID: 19,
          transitionsID: 157,
          updateDatetime: "2022-07-06T11:05:20.557",
          updateUserID: 0
        }
      ],
      contractID: 2,
      createDatetime: "2022-07-06T11:06:49.407",
      createUserID: 0,
      destinationWorkflowStatesID: 1,
      enableQualityControl: true,
      isDeleted: "N",
      qualityControlModel: null,
      sourceWorkflowStatesID: 324,
      transitionTypeID: 1,
      transitionTypeName: 'Conditional',
      transitionsID: 158,
      transitionsName: "Conditional -END",
      updateDatetime: "2022-07-06T11:06:49.407",
      updateUserID: 0
    }
    component.transitionForm.controls["transitionTypesID"].setValue(1);
    component.transitionForm.controls["destinationWorkflowStatesID"].setValue(1);
    component.transitionForm.controls["duration"].setValue(1);
    component.transitionForm.controls["percentage"].setValue(0);
    component.transitionForm.controls["relativeDateTypesID"].setValue(0);
    component.transitionForm.controls["relativeDateDayTypesID"].setValue(1);
    component.transitionForm.controls["categoriesID"].setValue(1);
    component.transitionForm.controls["enableQualityControl"].setValue(true);
    component.transitionForm.controls["clause"].setValue([
      {
        actionID: "",
        fieldsID: null,
        joinOperatorsID: null,
        operatorsID: null
      }
    ]);
    component.data.transitionsType = "Conditional";
    component.data.QData = rowData;
    component.data.QData['clauses'] = [
      {
        active: true,
        clauseOrder: 0,
        clauseValue: "Test",
        clausesID: 183,
        contractID: 2,
        createDatetime: "2022-07-06T11:05:20.557",
        createUserID: 0,
        fieldsID: 0,
        isDeleted: "N",
        joinOperatorsID: 21,
        operatorsID: 19,
        transitionsID: 157,
        updateDatetime: "2022-07-06T11:05:20.557",
        updateUserID: 0
      },
      {
        active: true,
        clauseOrder: 0,
        clauseValue: "Test",
        clausesID: 183,
        contractID: 2,
        createDatetime: "2022-07-06T11:05:20.557",
        createUserID: 0,
        fieldsID: 0,
        isDeleted: "N",
        joinOperatorsID: 21,
        operatorsID: 19,
        transitionsID: 157,
        updateDatetime: "2022-07-06T11:05:20.557",
        updateUserID: 0
      }
    ]
    component.updateTransition(rowData);
  })

});