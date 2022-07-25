import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule, By } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { messageServiceStub } from 'src/app/shared/testCasesHelperClasses/messageServiceStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { ValidationServiceStub } from 'src/app/shared/testCasesHelperClasses/ValidationServiceStub';
import { ValidationService } from 'src/app/shared/validation/validation.service';

import { MasterPaymentTypeComponent } from './master-payment-type.component';

describe('MasterPaymentTypeComponent', () => {
  let component: MasterPaymentTypeComponent;``
  let fixture: ComponentFixture<MasterPaymentTypeComponent>;
  let inputElement: HTMLInputElement;
  let messageService=MessageService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterPaymentTypeComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateStubsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule
      ],
      providers: [
        { provide: ApiService, useClass: apiServiceStub},
        { provide: TranslateService, useClass:TranslateServiceStub},
        { provide: LanguageService, useClass:languageServiceStub},
        { provide: LiveAnnouncer, useValue: {}},
        { provide: ToastrService, useClass: ToasterServiceStub},
        {provide: ValidationService, useValue: ValidationServiceStub},
        {provide: MessageService, useClass: messageServiceStub}
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPaymentTypeComponent);
    component = fixture.componentInstance;
    inputElement = <HTMLInputElement> fixture.debugElement.nativeElement.querySelector('INPUT');
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('master-payment-type');
  });
  it('should return list', () => {
    component.getList();
    fixture.detectChanges();
    // expect(component.dataSource);
  });
  it('search and filter', () => {
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
    let filter=searchData.trim().toLowerCase();
    expect(searchData.trim().toLowerCase()).toBe('abc');
    expect(component.dataSource.filter).toEqual('abc');
    expect(inputElement.value).toBe('abC');


    component.filterData();
    expect(component.dataSource.filter).toBe('abc');
    // expect(component.dataSource.filter).toBeUndefined();
  });
  it('add payment method', () => {
    expect(component).toBeTruthy();
    component.addPaymentType()
  });
  it('edit payment method', () => {
    expect(component).toBeTruthy();
    const event = new KeyboardEvent('keyup', { key: 'C' });
    component.editRowOutput(event);
  });
  it('delete payment method',()=>{
    const event = new KeyboardEvent('keyup', { key: 'C' });
    component.deleteRowOutput(event);

      // if($event){
      //   this.getList();
      // }

  })
  it('saveFormOutput',()=>{
    component.saveFormOutput({ 'form': 'saved' });
    expect(component.showAddForm).toEqual(false);
    expect(component.searchData).toEqual('');
    component.getList();
  })
  it('cancelOutput',()=>{
    component.cancelOutput({'cancel': 'reset'})
    expect(component.showAddForm).toEqual(false);
    expect(component.searchData).toEqual('');
    component.getList();
  })
  it('editFormOutput',()=>{
    component.editFormOutput(event)
  })
  it('enableRowOutput',()=>{
    component.enableRowOutput(event)
  })
  // it('subscription',()=>{
  //   spyOn(component, 'subscription');
  //   expect(component.subscription).toHaveBeenCalled();
  //   expect(component.subscription).toBeDefined();
  //   expect(component.showAddForm ).toEqual(true);
  // })
});
function item(item: any, arg1: (any: any) => void) {
  throw new Error('Function not implemented.');
}

