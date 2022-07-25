import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { WorkflowstatesModel } from 'src/app/Models/non-payable-workflowstates.Model';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';

import { NonPayableWorkflowstatesComponent } from './non-payable-workflowstates.component';

describe('NonPayableWorkflowstatesComponent', () => {
  let component: NonPayableWorkflowstatesComponent;
  let fixture: ComponentFixture<NonPayableWorkflowstatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonPayableWorkflowstatesComponent ],
      imports:[
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
        MatFormFieldModule],
        providers:[
          { provide: ApiService, useClass: apiServiceStub},
        { provide: TranslateService, useClass:TranslateServiceStub},
        { provide: LanguageService, useClass:languageServiceStub},
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub},
        { provide: ToastrService,useClass: ToasterServiceStub}
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonPayableWorkflowstatesComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Non Payable Workflowstates');
  });
  // it('initially sets up sorting', () => {
  //   fixture.detectChanges();
  //   component.dataSource = new MatTableDataSource<WorkflowstatesModel>();
  //   const sort = component.dataSource.sort;
  //   expect(sort).toBeInstanceOf(MatSort);
  // });
  it('should check getList',()=>{
    component.getList();
  })
  it('should check WorkflowstatesForm form validity',()=>{
    expect(component.WorkflowstatesForm.valid).toBeFalsy();
  })
  it('should check errorCode  validity',()=>{
    let errors:any={};
    let errorCode = component.WorkflowstatesForm.controls['errorCode'];
    expect(errorCode.valid).toBeFalsy();
    errors = errorCode.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(errors['maxLength(10)']).toBeFalsy();

    errorCode.setValue('Noarway');
    fixture.detectChanges();
    errors = errorCode.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxLength(10)']).toBeFalsy();
  })
  it('should check workflowStateID  validity',()=>{
    let errors:any={};
    let workflowStateID = component.WorkflowstatesForm.controls['workflowStateID'];
    expect(workflowStateID.valid).toBeFalsy();
    errors = workflowStateID.errors || {};
    expect(errors['required']).toBeTruthy();

    workflowStateID.setValue('Noarway');
    fixture.detectChanges();
    errors = workflowStateID.errors || {};
    expect(errors['required']).toBeFalsy();
  })
  it('should check violationDateCheck  validity',()=>{
    let errors:any={};
    let violationDateCheck = component.WorkflowstatesForm.controls['violationDateCheck'];
    expect(violationDateCheck.valid).toBeTruthy();
    errors = violationDateCheck.errors || {};
    expect(violationDateCheck.errors).toBeNull();

    violationDateCheck.setValue('Noarway');
    fixture.detectChanges();
    errors = violationDateCheck.errors || {};
    expect(violationDateCheck.errors).toBeNull();
  })
  it('should check nonPayableWorkflowStatesID  validity',()=>{
    let errors:any={};
    let nonPayableWorkflowStatesID = component.WorkflowstatesForm.controls['nonPayableWorkflowStatesID'];
    expect(nonPayableWorkflowStatesID.valid).toBeTruthy();
    errors = nonPayableWorkflowStatesID.errors || {};
    expect(nonPayableWorkflowStatesID.errors).toBeNull();

    nonPayableWorkflowStatesID.setValue('Noarway');
    fixture.detectChanges();
    errors = nonPayableWorkflowStatesID.errors || {};
    expect(nonPayableWorkflowStatesID.errors).toBeNull();
  })
  it('should check WorkflowstatesForm form validity',()=>{
    let errorCode = component.WorkflowstatesForm.controls['errorCode'];
    let workflowStateID = component.WorkflowstatesForm.controls['workflowStateID'];
    let violationDateCheck = component.WorkflowstatesForm.controls['violationDateCheck'];
    let nonPayableWorkflowStatesID = component.WorkflowstatesForm.controls['nonPayableWorkflowStatesID'];

    errorCode.setValue("Noarway");
    workflowStateID.setValue(1);
    violationDateCheck.setValue(123);
    nonPayableWorkflowStatesID.setValue(123);

    expect(component.WorkflowstatesForm.valid).toBeTruthy();
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
  it('setPagelabel(lang: any)',()=>{
    let lang='en';
    component.setPagelabel(lang)
  })
  it('should call applyFilter',()=>{
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

    expect(searchData.trim().toLowerCase()).toBe('abc');

    expect(component.dataSource.filter).toEqual('abc');

    expect(inputElement.value).toBe('abC');

    component.filterData();

    expect(component.dataSource.filter).toBe('abc');
  })
  it('addClientList',()=>{
    component.addClientList();
    expect(component.showForm).toEqual(true);
    expect(component.showEditForm).toEqual(false);
    expect(component.addBtn ).toEqual(true);
  })
  it('cancelAdding',()=>{
    component.cancelAdding();
    expect(component.showForm).toEqual(false);
    expect(component.alertMsg).toEqual("");
    expect(component.successMsg).toEqual("");
      // this.notificationService.info(this.translate.instant("Process Cancelled"));
      component.WorkflowstatesForm.reset();
      expect(component.addBtn).toEqual(true);
      component.getList();
  })
  it('cancelAdd_Save',()=>{
    component.cancelAdd_Save();
    expect(component.showForm).toEqual(false);
      component.WorkflowstatesForm.reset();
      expect(component.dataSource.paginator).toBeDefined;
      component.getList();
      // this.notificationService.info(this.translate.instant('Process Cancelled'));
  })
  it('checkZeroValue(event: any)',()=>{
    let input = fixture.debugElement.query(By.css('input'));
    let inputElement = input.nativeElement;

    component.getList();
    fixture.detectChanges();
    inputElement.value = 'abC';
    fixture.detectChanges();
    const event = new KeyboardEvent('blur', { key: 'C' });

    inputElement.dispatchEvent(event);
    component.checkZeroValue(event);
    let val="He was 40";
    let check=isNaN(parseInt(val));
    expect(check).toEqual(true)
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var testVal=!format.test(val);
    expect(testVal).toEqual(true);
  })
  it('checkZeroValue(event: any)',()=>{
    const event = new KeyboardEvent('blur', { key: 'C' });
    component.checkZeroValue(event);
    let val="0/0";
    let check=isNaN(parseInt(val));
    expect(check).toEqual(false)
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var testVal=!format.test(val);
    expect(testVal).toEqual(false);
  })
  it('checkZeroValue(event: any)',()=>{
    const event = new KeyboardEvent('blur', { key: 'C' });
    component.checkZeroValue(event);
    let val="10.33";
    let check=isNaN(parseInt(val));
    expect(check).toEqual(false);
    expect(parseInt(val)).toBeGreaterThan(0);
    expect(parseInt(val)).toBeLessThan(999999999);
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
    let welcome=5000 +"_"+ "DuplicateKey";
    component.WorkflowstatesForm.get('assignAgencyCode')?.setErrors({ invalid: component.welcome });
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
  it('editIconClicked',()=>{
    let data={
      errorCode:'Noarway',
      workflowStateID:2,
      violationDateCheck:124,
      nonPayableWorkflowStatesID:1234
    }
    component.editIconClicked(data)
      expect(component.editData ).toEqual(data);
      expect(component.showForm).toBeTruthy;
      expect(component.showEditForm).toBeTruthy;
      expect(component.addBtn).toBeFalsy;
      // component.WorkflowstatesForm.controls['errorCode'].setValue(data.errorCode);
      // component.WorkflowstatesForm.controls['workflowStateID'].setValue(data.workflowStateID.toString());
      // component.WorkflowstatesForm.controls['violationDateCheck'].setValue(data.violationDateCheck);
      // component.WorkflowstatesForm.controls['nonPayableWorkflowStatesID'].setValue(data.nonPayableWorkflowStatesID);

  })
  it('addData(data: any)',()=>{
    let errorCode = component.WorkflowstatesForm.controls['errorCode'];
    let workflowStateID = component.WorkflowstatesForm.controls['workflowStateID'];
    let violationDateCheck = component.WorkflowstatesForm.controls['violationDateCheck'];
    let nonPayableWorkflowStatesID = component.WorkflowstatesForm.controls['nonPayableWorkflowStatesID'];

    errorCode.setValue("Noarway");
    workflowStateID.setValue(1);
    violationDateCheck.setValue(123);
    nonPayableWorkflowStatesID.setValue(123);

    expect(component.WorkflowstatesForm.valid).toBeTruthy();
    const data =component.WorkflowstatesForm.value;
    component.addData(data);
  })
  it(' updateRecord(data: any)',()=>{
    let errorCode = component.WorkflowstatesForm.controls['errorCode'];
    let workflowStateID = component.WorkflowstatesForm.controls['workflowStateID'];
    let violationDateCheck = component.WorkflowstatesForm.controls['violationDateCheck'];
    let nonPayableWorkflowStatesID = component.WorkflowstatesForm.controls['nonPayableWorkflowStatesID'];

    errorCode.setValue("Noarway");
    workflowStateID.setValue(1);
    violationDateCheck.setValue(123);
    nonPayableWorkflowStatesID.setValue(123);

    expect(component.WorkflowstatesForm.valid).toBeTruthy();
    const data =component.WorkflowstatesForm.value;
    component.updateRecord(data)
  })
  it('toggleClient when not cameraEnabled', () => {
    let status: any = true;
    let data = {
      errorCode:'Noarway',
        workflowStateID:2,
        violationDateCheck:124,
        nonPayableWorkflowStatesID:1234
    };
    component.toggleClient(data, status);
    // expect(data.cameraEnabled).toBeTruthy();
  })

  it('toggleClient when cameraEnabled', () => {
    let status: any = false;
    let data = {
      errorCode:'Noarway',
      workflowStateID:2,
      violationDateCheck:124,
      nonPayableWorkflowStatesID:1234
    }
    component.toggleClient(data, status);
    // expect(data.cameraEnabled).toBeFalsy();
  })
});
