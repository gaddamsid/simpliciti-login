import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootAndTowProcessComponent } from './boot-and-tow-process.component';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { ApiService } from 'src/app/shared/services/api.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('BootAndTowProcessComponent', () => {
  let component: BootAndTowProcessComponent;
  let fixture: ComponentFixture<BootAndTowProcessComponent>;
  let inputElement: HTMLInputElement;

  let rowData = {
      bootTowProcessId: 6,
      contractId: 2,
      createDateTime: "2022-05-12",
      createUserId: 1,
      isDeleted: "N",
      processCode: "BCO",
      processLongName: "VEHICLE BOOTED",
      processShortName: "CONFIRM",
      processType: "X",
      rules: "********************",
      status: "B",
      updateUserId: 1,
      updatedDateTime: "2022-05-12"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootAndTowProcessComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        TranslateStubsModule,
        ReactiveFormsModule ,
        FormsModule,
        HttpClientModule,
        MatSortModule,
        MatPaginatorModule,
        BrowserAnimationsModule  ,
        MatTableModule,
        MatIconModule
        ],
        providers:[
          { provide: ApiService, useClass: apiServiceStub },
          { provide: ToastrService, useClass: ToasterServiceStub },
          { provide: LanguageService, useClass: languageServiceStub },
          { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
          { provide: MatPaginator, useValue: ({})},
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BootAndTowProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('processCode valid',() => {
    component.processCode;
    expect(component.BTProcessForm.controls['processCode'].value).toEqual(null);
  })

  it('processType Valid',() => {
    component.processType;
    expect(component.BTProcessForm.controls['processType'].value).toEqual(null);
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

  it('editIconClicked', () => {
    component.editIconClicked(rowData);
    expect(component.showEditForm).toBeTruthy();
    let processCode = component.BTProcessForm.controls['processCode'];
    processCode.setValue(rowData.processCode);
    let processType = component.BTProcessForm.controls['processType'];
    processType.setValue(rowData.processType);
    let processLongName = component.BTProcessForm.controls['processLongName'];
    processLongName.setValue(rowData.processLongName);
    let processShortName = component.BTProcessForm.controls['processShortName'];
    processShortName.setValue(rowData.processShortName);
    let rules = component.BTProcessForm.controls['rules'];
    rules.setValue(rowData.rules);
    let status = component.BTProcessForm.controls['status'];
    status.setValue(rowData.status);
  });

  it('updateBTProcess', () => {
    component.editIconClicked(rowData);
    let processCode = component.BTProcessForm.controls['processCode'];
    processCode.setValue(rowData.processCode);
    let processType = component.BTProcessForm.controls['processType'];
    processType.setValue(rowData.processType);
    let processLongName = component.BTProcessForm.controls['processLongName'];
    processLongName.setValue(rowData.processLongName);
    let processShortName = component.BTProcessForm.controls['processShortName'];
    processShortName.setValue(rowData.processShortName);
    let rules = component.BTProcessForm.controls['rules'];
    rules.setValue(rowData.rules);
    let status = component.BTProcessForm.controls['status'];
    status.setValue(rowData.status);
    component.updateBTProcess(rowData);
    expect(component.showAddForm).toBeFalsy();
    expect(component.showEditForm).toBeFalsy();
    expect(component.isDuplicate).toBeFalsy();
    component.BTProcessForm.reset();
    expect(component.searchString.nativeElement.value).toBe('');
  });

  
  it('showAddFormPage', () => {
    expect(component).toBeTruthy();
    component.BTProcessForm.controls["processCode"].setValue('q838473');
    component.BTProcessForm.controls["processType"].setValue('23e');
    component.BTProcessForm.controls["processLongName"].setValue('q838473');
    component.BTProcessForm.controls["processShortName"].setValue('23e2832');
    component.BTProcessForm.controls["rules"].setValue('q838473');
    component.BTProcessForm.controls["status"].setValue('23e2832');
    component.addBTProcess(rowData);
    component.showAddFormPage();
    expect(component.showAddForm).toBe(true);
  });

  
  it('apply filter', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    component.getBTProcessList();
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

  it('cancel and save', () => {
    component.BTProcessForm.reset();
    expect(component.showAddForm).toBeFalsy();
    expect(component.showEditForm).toBeFalsy();
    expect(component.isDuplicate).toBeFalsy();
    component.cancelAdd_Save();
  });

  it('on Field Change', () => {
    expect(component.isDuplicate).toBeFalsy();
    component.BTProcessForm.controls["processCode"].setValue('q838473');
    component.BTProcessForm.controls["processType"].setValue('232');
    component.onFildChange('e');
  });

  it('active Selected', () => {
     let event = {
      status:''
     };
     component.activeSelected(event);
  });

  

  it('error response when code is 5000 and message is not Duplicate Key', () => {
    let error = {
      error: {
        details: [{
          code: "5000",
          fieldName: "boottowprocess",
          message: "DuplicateKey"
        }]
      }
    }
    component.errorResponseCheck(error);
    expect(error.error.details[0].code).toEqual("5000");
  })

  it('error response when message is Duplicate Key and code 5000', () => {
    let error = {
      error: {
        details: [{
          code: "5000",
          fieldName: "boottowprocess",
          message: "Duplicate Key"
        }]
      }
    }
    component.errorResponseCheck(error);
    expect(error.error.details[0].code).toEqual("5000");
  })

  it('error response when code is not 5000 and message is not Duplicate Key', () => {
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

  it('deleteRecord', () => {
    spyOn(window,"confirm").and.returnValue(true);
    component.deleteBTProcess(rowData.bootTowProcessId);
    expect(component.showAddForm).toBeFalsy();
  });


});
