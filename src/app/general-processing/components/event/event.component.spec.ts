import { EventComponent } from './event.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { GPStateServiceStub } from 'src/app/shared/testCasesHelperClasses/GPStateServiceStub';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ToastrModule } from 'ngx-toastr';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild, TemplateRef, ElementRef, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { GPStateService } from '../../services/g-p-state.service';
import { PaginationControls } from '../../models/pagination-controls.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventData } from '../../models/event.model';
import { EventtableDataSource } from 'src/app/Pages/generalprocessing/eventtable/eventtable-datasource';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';



describe('EventComponent', () => {
  let component!: EventComponent;
  let fixture: ComponentFixture<EventComponent>;
  let reqObj : any = {
    amountDue : 0,
    category: 'TestCategory',
    deploymentId : 1,
    eventId : 2,
    laneNumber : 1,
    locationCode : 'TestLocationCode',
    locationDescription : 'TestLocDesc',
    status : 'TestStatus',
    violationDateTime : Date.now().toString()

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EventComponent
       ],
       imports : [
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
        MatTableModule,
        MatIconModule,
        MatFormFieldModule
       ],
       providers: [
        { provide : TranslateService, useClass: TranslateServiceStub},
        { provide : LanguageService, useClass: languageServiceStub},
        {
          provide: GPStateService, userClass: GPStateServiceStub
        }
        ]
    }).compileComponents();

  });


  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    spyOn(window, 'confirm').and.returnValue(true);
    component.dataSource = new MatTableDataSource<any>(reqObj);
    component.selection = new SelectionModel<any>(true,[2,1,3]);
    fixture.detectChanges();
    // debugger
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadTableData should load data', () => {
      let data: EventData[] = [];
      data[0] = reqObj;
      let res = component.dataSource;

      component.loadTableData(data);
      expect(res).toBeTruthy();
  });

  it('isAllSelected returns true', () => {
    component.selection.selected.length = 2;
    component.dataSource.data.length = 2;

    let res = component.isAllSelected();

    expect(res).toBeTruthy();
  })

  it('isAllSelected returns false', () => {
    component.selection.selected.length = 2;
    component.dataSource.data.length = 1;

    let res = component.isAllSelected();

    expect(res).toBeFalsy();
  })

  // it('masterToggle should toggle', () => {
  //   component.selection.selected.length = 2;
  //   component.dataSource.data.length = 2;

  //   component.masterToggle();

  //   let res = component.selection.hasValue();

  //   expect(res).toBeTruthy();
  // });

  it('masterToggle should not toggle', () => {
    component.selection.selected.length = 2;
    component.dataSource.data.length = 1;

    component.masterToggle();

    let res = component.selection.hasValue();

    expect(res).toBeFalsy();
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

  it('pageChanged should change the page', () => {

    let event : any = {
      pageSize : 1,
      pageIndex : 1
    }

    component.pageChanged(event);

    expect(component.paginationDetails.pageSize).toEqual(event.pageSize);
    expect(component.paginationDetails.currentPage).toEqual(event.pageIndex);
  })


});
