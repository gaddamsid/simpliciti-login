import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CitationTicketTypeServiceStub } from 'src/app/shared/testCasesHelperClasses/CitationTicketTypeStub/citationTicketTypeServiceStub';
import { CitationTicketTypeService } from 'src/app/Services/citationTicketType/citation-ticket-type.service';
import { By } from '@angular/platform-browser';
import { CitationTicketTypeComponent } from './citation-ticket-type.component';

describe('CitationTicketTypeComponent', () => {
  let component: CitationTicketTypeComponent;
  let fixture: ComponentFixture<CitationTicketTypeComponent>;
  let error: any = {};
  let inputElement: HTMLInputElement;
  let data = {
    "contractID": 2,
    "createUserID": 7500,
    "updateUserID": 5000,
    "createDatetime": "2022-02-24T09:15:00",
    "updateDatetime": "2021-03-22T11:25:00",
    "ticketDescText": "desc",
    "ticketTypeCode": "1",
    "description": "Citation Desc" 
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitationTicketTypeComponent ],
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
        { provide: ToastrService, useClass: ToasterServiceStub},
        // { provide: TranslateService, useClass:TranslateServiceStub},
        { provide: LanguageService, useClass:languageServiceStub},
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
        { provide: ValidationService, useValue: ValidationServiceStub},
        { provide: MessageService, useClass: messageServiceStub},
        { provide: CitationTicketTypeService, useClass: CitationTicketTypeServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitationTicketTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Citation Ticket Type');
  });

  it('announceSortChange', () => {
    let sortState: Sort = {
      direction: 'asc',
      active:'true'
    }
    component.announceSortChange(sortState);
    expect(sortState.direction).toEqual('asc');
  });

  it('announceSortChange if direction is missing', () => {
    let sortState: Sort = {
      direction: '',
      active:'true'
    }
    component.announceSortChange(sortState);
    expect(sortState.direction).toEqual('');
  });

  it('get ticketType should return a value', () => {
    component.ticketType;
    component.ticketForm.controls["ticketType"].setValue('1');
    expect(component.ticketType).toBeTruthy();
  });

  it('get description should return a value', () => {
    component.description;
    component.ticketForm.controls["description"].setValue('Description');
    expect(component.description).toBeTruthy();
  });

  it('Check required validations for ticketType', () => {
    // let error: any = {};
    let ticketType = component.ticketForm.controls['ticketType'];
    expect(ticketType.valid).toBeFalsy();     // when no value is entered
    error = ticketType.errors || {};
    expect(error['required']).toBeTruthy();
    ticketType.setValue('1');                 // after setting the value
    fixture.detectChanges();
    expect(ticketType.valid).toBeTruthy();
  });

  it('Check required validations for description', () => {
    // let error: any = {};
    let description = component.ticketForm.controls['description'];
    expect(description.valid).toBeFalsy();     // when no value is entered
    error = description.errors || {};
    expect(error['required']).toBeTruthy();
    description.setValue('1');                 // after setting the value
    fixture.detectChanges();
    expect(description.valid).toBeTruthy();
  });

  it('addNewTicketType', () => {
    component.addNewTicketType();
    expect(component.showAddForm).toBeTruthy();
    expect(component.showEditForm).toBeFalsy();
    expect(component.addTicketButton).toBeTruthy();
  });

  it('CancelTickettype', () => {
    component.CancelTickettype();
    expect(component.showAddForm).toBeFalsy();
  });

  it('editTicketType function', () => {
    component.editTicketType(data);
    expect(component.showAddForm).toBeTruthy();
  })

  it('apply filter, format input string to lowercase', () => {
    let input = fixture.debugElement.query(By.css('input'))
    inputElement = input.nativeElement
    component.getList();
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

  it('addTicket', () => {
    let description = component.ticketForm.controls['description'];
    description.setValue(data.ticketDescText); 
    let ticketType = component.ticketForm.controls['ticketType'];
    ticketType.setValue(data.ticketTypeCode); 
    expect(component.ticketForm.valid).toBeTruthy();
    component.addTicket(data);
  })

  it('updateTicketType', () => {
    component.editTicketType(data);
    let description = component.ticketForm.controls['description'];
    description.setValue(data.ticketDescText); 
    let ticketType = component.ticketForm.controls['ticketType'];
    ticketType.setValue(data.ticketTypeCode); 
    expect(component.ticketForm.valid).toBeTruthy();
    component.updateTicketType(data);
    expect(component.showAddForm).toBeFalsy();
  })

  it('deleteTicketType method should execute', () => {
    spyOn(window,"confirm").and.returnValue(true);
    component.deleteTicketType(data);
    expect(component.showAddForm).toBeFalsy();
  });

  xit('error response when code is 5000 and message is not DuplicateKey', () => {
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
    // spyOn(component, 'errorResponseCheck');
    component.deleteTicketType(data);
    // expect(component.badgeNumberForm.valid).toBeFalse();
  });

  xit('error response when message is DuplicateKey and code 5000', () => {
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
    // spyOn(component, 'errorResponseCheck');
    component.deleteTicketType(data);
    // expect(component.badgeNumberForm.valid).toBeFalse();
  });

  xit('error response when code is not 5000 and message is not DuplicateKey', () => {
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
    // spyOn(component, 'errorResponseCheck');
    component.deleteTicketType(data);
    // expect(component.badgeNumberForm.valid).toBeFalse();
  })
});
