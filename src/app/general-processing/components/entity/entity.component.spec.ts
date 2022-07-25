import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { GPStateService } from '../../services/g-p-state.service';
import { EntityComponent } from './entity.component';
import { GPStateServiceStub } from 'src/app/shared/testCasesHelperClasses/GPStateServiceStub';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ToastrModule } from 'ngx-toastr';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddressDetails, Entity, VehicleDetails } from '../../models/entity.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Address } from 'cluster';
import { ContentObserver } from '@angular/cdk/observers';
import { PaymentCartServiceStub } from 'src/app/shared/testCasesHelperClasses/PaymentCartServiceStub';
import { PaymentCartService } from 'src/app/shared/services/payment-cart.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';


describe('EntityComponent', () => {
  let component!: EntityComponent;
  let fixture: ComponentFixture<EntityComponent>;
  let router: Router;
  let gpStateServiceStub : GPStateServiceStub;
  let inputElement: HTMLInputElement;
  let dataSource = new MatTableDataSource<any>();
  let data : Entity[] =[
    {
    plateNo : '',
    name: "Test",
    effectiveDate: Date.now().toString() ,
    dateOfBirth: Date.now().toString(),
    amountDue: "string",
    addressDetails: {} as AddressDetails,
    vehicleDetails: {} as VehicleDetails,
    metadata: "any",
    addressInfo: "any",
    vehicleInfo: ""
  },
 ]


  // let searchResults = new BehaviorSubject<{ events: any[], entity: any[] }>({ events: [], entity: [] });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityComponent],
      imports: [
        ToastrModule.forRoot(),
        RouterTestingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AngularmaterialModule,
        TranslateStubsModule,
        HttpClientTestingModule,
        BrowserDynamicTestingModule,
        BrowserAnimationsModule,
        MatTableExporterModule,
        ToastrModule,
        MatPaginatorModule,
        MatSortModule,
        AngularmaterialModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule
      ],
      providers: [
        { provide : TranslateService, useClass: TranslateServiceStub},
        { provide : LanguageService, useClass: languageServiceStub},
        {
          provide: GPStateService, userClass: GPStateServiceStub
        },
        {
          provide: PaymentCartService, userClass: PaymentCartServiceStub
        }
        ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityComponent);
    component = fixture.componentInstance;
    spyOn(window, 'confirm').and.returnValue(true);
    component.dataSource = new MatTableDataSource<any>(data);
    // component.selection = new SelectionModel<any>(true,[2,1,3]);
    fixture.detectChanges();
    // debugger
  });

  afterEach(() => {
    // component.selection = new SelectionModel<any>(true,[2,1,3]);
  })

  it('should create', () => {
    // debugger
    expect(component).toBeTruthy();
  });

  it('loadTableData data should be load data', () => {

    dataSource  = new MatTableDataSource<any>(data);
    dataSource.sort = null;
    component.loadTableData(data);
    expect(component.dataSource.data).toEqual(dataSource.data);

  });

  it('pageChanged should change page', () => {
      let event: PageEvent = {
        pageIndex : 2,
        pageSize : 1,
        length : 5
      };
      let response = component.paginationDetails;


      component.pageChanged(event);

      expect(response.pageSize).toEqual(event.pageSize);
      expect(response.currentPage).toEqual(event.pageIndex);
  })

  it('billingAddress should return a string', () => {
    let row = {
      address : {
        streetLine1 : 'Test',
        streetLine2 : 'test',
        streetLine3 : 'test2',
        city : 'TestCity',
        state : 'TestState',
        zipCode : 'TestZipCode'
      }
    }

      let res = component.bindingAddress(row);
      const streetLine1 = row.address?.streetLine1 ? (row.address?.streetLine1) : '';
      const streetLine2 = row.address?.streetLine2 ? (', ' + row.address?.streetLine2) : '';
      const streetLine3 = row.address?.streetLine3 ? (', ' + row.address?.streetLine3) : '';
      const city = row.address?.city ? (', ' + row.address?.city) : '';
      const state = row.address?.state ? (', ' + row.address?.state) : '';
      const zipCode = row.address?.zipCode ? (', ' + row.address?.zipCode) : '';
      let mockRes = String(streetLine1) + String(streetLine2) + String(streetLine3) + String(city) + String(state) + String(zipCode);

      expect(res).toBeTruthy();
      expect(res).toEqual(mockRes);
  });

  it('bindingVehicleInfo should return a string', () => {
    let row = {
      vehicle : {
        make : 'testMake',
        model : 'testModel',
        color : 'testColor',
        year : 'testYear'
      }
    };

    let res = component.bindingVehicleInfo(row);

    const make = row.vehicle?.make ? (row.vehicle?.make) : '';
    const model = row.vehicle?.model ? (', ' + row.vehicle?.model) : '';
    const color = row.vehicle?.color ? (', ' + row.vehicle?.color) : '';
    const year = row.vehicle?.year ? (', ' + row.vehicle?.year) : '';
    let mockRes = String(make) + String(model) + String(color) + String(year);

    expect(res).toBeTruthy();
    expect(res).toEqual(mockRes);
  })

  it('isAllSelected should return false', ()=> {
    // debugger
    component.selection.selected.length = 2;
    component.dataSource.data.length = 1;

    let res = component.isAllSelected();

    expect(res).toBeFalsy();

  });

  it('isAllSelected should return true', ()=> {
    // debugger
    
    component.selection.selected.length = 2;
    component.dataSource.data.length = 2;

    let res = component.isAllSelected();

    expect(res).toBeTruthy();
  })

  it('masterToggle should not toogle', () => {
    component.selection = new SelectionModel(true,[2,1,3]);
    component.selection.selected.length = 3;
    component.dataSource.data.length = 1;

    component.masterToggle();

    let res = component.selection.isEmpty();
    expect(res).toBeFalsy();

  });

  it('masterToggle should toggle' , () => {

    component.selection = new SelectionModel(true,[2,1,3]);
    component.selection.selected.length = 3;
    component.dataSource.data.length = 1;

    component.masterToggle();

    let res = component.selection.hasValue();
    // console.log(component.selection, res);
    expect(res).toBeTruthy();
  });

  it('applyFilter should update the value of filter', ( ) => {

    let event:any  = {target : {value : 'testEvent'}};

    component.applyFilter(event);

    let res = component.dataSource.filter;

    expect(res).toEqual('testevent');
  })  

  it('applyFilter should update the value of filter', ( ) => {

    let event:any  = {target : {value : null}};

    component.applyFilter(event);

    let res = component.dataSource.filter;

    expect(res).toEqual('');
  }) 

  it('onOpenAccountChange assign value to dataSource on event value 0', () => {

    let event: any = { value : 'O'};
    let mockData = {
      plateNo: 'string',
      name: 'TestName',
      effectiveDate: Date.now().toString(),
      dateOfBirth: Date.now().toString(),
      amountDue: '0',
      addressDetails: {} as AddressDetails,
      vehicleDetails: {} as VehicleDetails,
      metadata: 'any',
      addressInfo: 'testAddressInfo',
      vehicleInfo: 'testVehicleInfo'
    };
    let mockData2 = {
      plateNo: 'string',
      name: 'TestName',
      effectiveDate: Date.now().toString(),
      dateOfBirth: Date.now().toString(),
      amountDue: '10',
      addressDetails: {} as AddressDetails,
      vehicleDetails: {} as VehicleDetails,
      metadata: 'any',
      addressInfo: 'testAddressInfo',
      vehicleInfo: 'testVehicleInfo'
    }
    component.entityData = [mockData,mockData2];
    
    component.onOpenAccountChange(event);

    let res = component.dataSource;

    expect(res).toBeTruthy();
    expect(res.data.length).not.toEqual(component.entityData.length);
    expect(res.data[0]).toEqual(component.entityData[1]);

  });

  it('onOpenAccountChange assign value to dataSource on event value not 0', () => {

    let event: any = { value : 10};
    let mockData = {
      plateNo: 'string',
      name: 'TestName',
      effectiveDate: Date.now().toString(),
      dateOfBirth: Date.now().toString(),
      amountDue: '0',
      addressDetails: {} as AddressDetails,
      vehicleDetails: {} as VehicleDetails,
      metadata: 'any',
      addressInfo: 'testAddressInfo',
      vehicleInfo: 'testVehicleInfo'
    };
    let mockData2 = {
      plateNo: 'string',
      name: 'TestName',
      effectiveDate: Date.now().toString(),
      dateOfBirth: Date.now().toString(),
      amountDue: '10',
      addressDetails: {} as AddressDetails,
      vehicleDetails: {} as VehicleDetails,
      metadata: 'any',
      addressInfo: 'testAddressInfo',
      vehicleInfo: 'testVehicleInfo'
    }
    component.entityData = [mockData,mockData2];
    
    component.onOpenAccountChange(event);

    let res = component.dataSource;

    expect(res).toBeTruthy();
    expect(res.data.length).toEqual(component.entityData.length);
    expect(res.data.values).toEqual(component.entityData.values);

  });

});

