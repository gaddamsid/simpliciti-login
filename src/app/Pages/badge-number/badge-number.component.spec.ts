import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeNumberComponent } from './badge-number.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { MessageService } from 'src/app/shared/services/message.service';
import { messageServiceStub } from 'src/app/shared/testCasesHelperClasses/messageServiceStub';
import { ValidationServiceStub } from 'src/app/shared/testCasesHelperClasses/ValidationServiceStub';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BadgeNumServiceStub } from 'src/app/shared/testCasesHelperClasses/BadgeNumStub/BadgeNumServiceStub';
import { BadgeNumberService } from 'src/app/Services/BadgeNumber/badge-number.service';

describe('BadgeNumberComponent', () => {
  let component: BadgeNumberComponent;
  let fixture: ComponentFixture<BadgeNumberComponent>;
  let error: any = {};
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BadgeNumberComponent],
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
        MatTooltipModule,
        MatDialogModule,
      ],
      providers: [
        { provide: ToastrService, useClass: ToasterServiceStub },
        // { provide: TranslateService, useClass:TranslateServiceStub},
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ValidationService, useValue: ValidationServiceStub },
        { provide: MessageService, useClass: messageServiceStub },
        { provide: BadgeNumberService, useClass: BadgeNumServiceStub },
        { provide: MatDialogModule, useValue: ({}) },
      ]
    })
      .compileComponents().then(() => {
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Issuing Officer Number');
  });

  it('Form should be invalid', () => {
    expect(component.badgeNumberForm.valid).toBeFalsy();
  });

  it('format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    component.getBadgeNumber();
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

  it('announceSortChange', () => {
    let sortState: Sort = {
      direction: 'asc',
      active: 'true'
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

  it('Check required validations for badgeNumber', () => {
    // let error: any = {};
    let badgeNumber = component.badgeNumberForm.controls['badgeNumber'];
    expect(badgeNumber.valid).toBeFalsy();     // when no value is entered
    error = badgeNumber.errors || {};
    expect(error['required']).toBeTruthy();
    badgeNumber.setValue("009170");                 // after setting the value
    fixture.detectChanges();
    expect(badgeNumber.valid).toBeTruthy();
  });

  it('Check required validations for badgeOfficerName', () => {
    // let error: any = {};
    let badgeOfficerName = component.badgeNumberForm.controls['badgeOfficerName'];
    expect(badgeOfficerName.valid).toBeFalsy();     // when no value is entered
    error = badgeOfficerName.errors || {};
    expect(error['required']).toBeTruthy();
    badgeOfficerName.setValue("D.K.");                 // after setting the value
    fixture.detectChanges();
    expect(badgeOfficerName.valid).toBeTruthy();
  });

  it('should return list', () => {
    component.getBadgeNumber();
    fixture.detectChanges();
    expect(component.dataSource.data.length).toBe(47);
  });

  it('showAddFormPage', () => {
    expect(component).toBeTruthy();
    component.showAddFormPage();
    expect(component.showAddForm).toBe(true);
  });

  it('cancelAdd_Save', () => {
    component.cancelAdd_Save();
    expect(component.showAddForm).toBe(false);
    expect(component.showEditForm).toBe(false);
    expect(component.showCross).toBe(false);
  });

  let formData = {
    badgeAgency: 2,
    badgeDivision: 2,
    badgeNumber: "009172",
    badgeOfficerName: "D.K.2",
    signatureUpload: null
  }

  it('addData', () => {
    expect(component.sort.sort).toBeDefined()
    let badgeNumber = component.badgeNumberForm.controls['badgeNumber'];
    badgeNumber.setValue('009171');
    let badgeOfficerName = component.badgeNumberForm.controls['badgeOfficerName'];
    badgeOfficerName.setValue('D.K1');
    expect(component.badgeNumberForm.valid).toBeTruthy();
    component.addBadgeRecord(formData);
    fixture.detectChanges();
    component.badgeNumberForm.reset();
    component.getBadgeNumber();
    expect(component.paginator.pageIndex).toBe(0);
    expect(component.showAddForm).toBeFalsy();
    expect(component.searchString.nativeElement.value).toBe('');
  });

  let rowData = {
    "active": 1,
    "badgeAgency": 2,
    "badgeDivision": 2,
    "badgeNumber": "009172",
    "contractID": 1,
    "badgeOfficerName": "D.K.20",
    "badgenumberId": 469,
    "createDatetime": "2022-07-05T12:33:09.82",
    "createUserID": 1,
    "isUploaded": "Y",
    "updateDatetime": "2022-07-05T12:33:09.82",
    "updateUserID": 1
}
  it('editIconClicked', () => {
    // let res = {
    //   content: null,
    //   contentType: "BlockBlob",
    //   dcoId: null,
    //   fileName: "Sign5.png",
    //   hash: null,
    //   imageName: null,
    //   languageDesc: null,
    //   languageId: null,
    //   size: "4457",
    //   url: "https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/imaging/2/imgprod/images/checkimages/2022/6/20220629/681_Sign5.png"
    // }
    // component.uploadfile = res;
    // component.file = res.fileName;
    component.editIconClicked(rowData);
    expect(component.showEditForm).toBeTruthy();
  });

  it('updateBadgeRecord', () => {
    component.editIconClicked(rowData);
    expect(component.sort.sort).toBeDefined()
    let badgeNumber = component.badgeNumberForm.controls['badgeNumber'];
    badgeNumber.setValue('009171');
    let badgeOfficerName = component.badgeNumberForm.controls['badgeOfficerName'];
    badgeOfficerName.setValue('D.K1');
    expect(component.badgeNumberForm.valid).toBeTruthy();
    component.updatingBadgeRecord.badgenumberId = 469;
    component.updateBadgeRecord(formData);
    fixture.detectChanges();
    component.badgeNumberForm.reset();
    component.getBadgeNumber();
    expect(component.paginator.pageIndex).toBe(0);
    expect(component.showAddForm).toBeFalsy();
    expect(component.searchString.nativeElement.value).toBe('');
  });

  it('deleteBadgeRecord method should execute', () => {
    let id = 469
    spyOn(window,"confirm").and.returnValue(true);
    component.deleteBadgeRecord(id);
    expect(component.showAddForm).toBeFalsy();
  });

  it('resetUpload method should execute', () => {
    let signatureUpload = component.badgeNumberForm.controls['signatureUpload'];
    signatureUpload.setValue(null);
    component.resetUpload();
    expect(component.showCross).toBeFalsy();
  });

  it('UploadFile method should execute', () => {
    let file = {
      target: {
        files: [{
          lastModified: 1651050333395,
          lastModifiedDate: "Wed Apr 27 2022 14:35:33 GMT+0530",
          name: "PNG_transparency_demonstration_1.png",
          size: 174780,
          type: "image/png",
          webkitRelativePath: ""
        }]
      }
    }
    component.UploadFile(file);
    expect(component.showCross).toBeTrue();
    file.target.files[0].size = 2100000;
    component.UploadFile(file);
    let signatureUpload = component.badgeNumberForm.controls['signatureUpload'];
    signatureUpload.setValue(null);
    file.target.files[0].type = "image/mp3";
    component.UploadFile(file);
    signatureUpload.setValue(null);
  });

  it('error response when code is 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "badgenumber",
            "code": "5000",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.badgeNumberForm.valid).toBeFalse();
  })

  it('error response when message is DuplicateKey and code 5000', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "badgenumber",
            "code": "5000",
            "message": "DuplicateKey"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.badgeNumberForm.valid).toBeFalse();
  })

  it('error response when code is not 5000 and message is not DuplicateKey', () => {
    let error = {
      error: {
        "status": "ERROR",
        "timeStamp": "2022-07-01T12:03:23.521",
        "developerMessage": "org.springframework.dao.DataIntegrityViolationException",
        "details": [
          {
            "fieldName": "badgenumber",
            "code": "400",
            "message": "DuplicateKey1"
          }
        ]
      }
    }
    component.errorResponseCheck(error);
    expect(component.badgeNumberForm.valid).toBeFalse();
  })

});
