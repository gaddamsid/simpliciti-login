import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularmaterialModule } from 'src/app/angular-material/angular-material.module';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { messageServiceStub } from 'src/app/shared/testCasesHelperClasses/messageServiceStub';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { TranslateServiceStub } from 'src/app/shared/testCasesHelperClasses/TranslateServiceStub.class';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { ValidationServiceStub } from 'src/app/shared/testCasesHelperClasses/ValidationServiceStub';
import { ValidationService } from 'src/app/shared/validation/validation.service';

import { CreateListComponent } from './create-list.component';
describe('CreateListComponent', () => {
  let component: CreateListComponent;
  let fixture: ComponentFixture<CreateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateListComponent ],
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
        MatFormFieldModule
      ],
      providers:[
    { provide: ApiService, useClass: apiServiceStub},
        { provide: TranslateService, useClass:TranslateServiceStub},
        { provide: LanguageService, useClass:languageServiceStub},
        { provide: LiveAnnouncer,useClass: LiveAnnouncerStub},
        { provide: ToastrService, useClass: ToasterServiceStub},
        {provide: ValidationService, useValue: ValidationServiceStub},
        {provide: MessageService, useClass: messageServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(window, "confirm").and.returnValue(true);
    component.showAddForm=true
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have title', () => {
    const title = fixture.debugElement.nativeElement;
    expect(title.querySelector('h3').textContent).toContain('Media File Configuration');
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
  it('Form should be invalid',()=>{
    expect(component.mediaFileConfigForm.valid).toBeFalsy();
  })
  it('dciDownload:check required Validation',()=>{
    let errors:any={};
    let dciDownload=component.mediaFileConfigForm.controls["dciDownload"];
    expect(dciDownload.valid).toBeFalsy();
    errors = dciDownload.errors || {};
    expect(errors['required']).toBeTruthy();
  })
  it('dciDownload:check required Validation',()=>{
    let errors:any={};
    let dciDownload=component.mediaFileConfigForm.controls["dciDownload"];
    dciDownload.setValue("K:\Warne\Public");
    fixture.detectChanges();
    expect(errors['required']).toBeFalsy();
  })
  it('dciConvertFiles:check required Validation',()=>{
    let errors:any={};
    let dciConvertFiles=component.mediaFileConfigForm.controls["dciConvertFiles"];
    expect(dciConvertFiles.valid).toBeFalsy();
    errors = dciConvertFiles.errors || {};
    expect(errors['required']).toBeTruthy();
  })
  it('dciConvertFiles:check required Validation',()=>{
    let errors:any={};
    let dciConvertFiles=component.mediaFileConfigForm.controls["dciConvertFiles"];
    dciConvertFiles.setValue("F:\Bhat\Kapoor");
    fixture.detectChanges();
    expect(errors['required']).toBeFalsy();
  })
  it('relativeDayBegin:check required Validation',()=>{
    let errors:any={};
    let relativeDayBegin=component.mediaFileConfigForm.controls["relativeDayBegin"];
    expect(relativeDayBegin.valid).toBeFalsy();
    errors = relativeDayBegin.errors || {};
    expect(errors['required']).toBeTruthy();
  })
  it('relativeDayBegin:check required Validation',()=>{
    let errors:any={};
    let relativeDayBegin=component.mediaFileConfigForm.controls["relativeDayBegin"];
    relativeDayBegin.setValue(13);
    fixture.detectChanges();
    expect(errors['required']).toBeFalsy();
  })
  it('relativeDayEnd:check required Validation',()=>{
    let errors:any={};
    let relativeDayEnd=component.mediaFileConfigForm.controls["relativeDayEnd"];
    expect(relativeDayEnd.valid).toBeFalsy();
    errors = relativeDayEnd.errors || {};
    expect(errors['required']).toBeTruthy();
  })
  it('relativeDayEnd:check required Validation',()=>{
    let errors:any={};
    let relativeDayEnd=component.mediaFileConfigForm.controls["relativeDayEnd"];
    relativeDayEnd.setValue(13);
    fixture.detectChanges();
    expect(errors['required']).toBeFalsy();
  })
  it('thumbnailScaleFraction:check required Validation',()=>{
    let errors:any={};
    let thumbnailScaleFraction=component.mediaFileConfigForm.controls["thumbnailScaleFraction"];
    expect(thumbnailScaleFraction.valid).toBeFalsy();
    errors = thumbnailScaleFraction.errors || {};
    expect(errors['required']).toBeTruthy();
  })
  it('thumbnailScaleFraction:check required Validation',()=>{
    let errors:any={};
    let thumbnailScaleFraction=component.mediaFileConfigForm.controls["thumbnailScaleFraction"];
    thumbnailScaleFraction.setValue(0.05);
    fixture.detectChanges();
    expect(errors['required']).toBeFalsy();
  })
  it('dciEncrypted:check required Validation',()=>{
    let errors:any={};
    let dciEncrypted=component.mediaFileConfigForm.controls["dciEncrypted"];
    expect(dciEncrypted.valid).toBeTruthy();
    errors = dciEncrypted.errors || {};
    expect(errors['required']).toBeFalsy();
  })
  it('dciEncrypted:check required Validation',()=>{
    let errors:any={};
    let dciEncrypted=component.mediaFileConfigForm.controls["dciEncrypted"];
    dciEncrypted.setValue("H:\\Bhat\\Kapoor");
    fixture.detectChanges();
    expect(dciEncrypted.errors).toBeNull();
  })
  it('rearFolderName:check required Validation',()=>{
    let errors:any={};
    let rearFolderName=component.mediaFileConfigForm.controls["rearFolderName"];
    expect(rearFolderName.valid).toBeTruthy();
    errors = rearFolderName.errors || {};
    expect(errors['required']).toBeFalsy();
  })
  it('rearFolderName:check required Validation',()=>{
    let errors:any={};
    let rearFolderName=component.mediaFileConfigForm.controls["rearFolderName"];
    rearFolderName.setValue("OldFolder");
    fixture.detectChanges();
    expect(rearFolderName.errors).toBeNull();
  })
  it('frontFolderName:check required Validation',()=>{
    let errors:any={};
    let frontFolderName=component.mediaFileConfigForm.controls["frontFolderName"];
    expect(frontFolderName.valid).toBeTruthy();
    errors = frontFolderName.errors || {};
    expect(errors['required']).toBeFalsy();
  })
  it('frontFolderName:check required Validation',()=>{
    let errors:any={};
    let frontFolderName=component.mediaFileConfigForm.controls["frontFolderName"];
    frontFolderName.setValue("BoldFolder");
    fixture.detectChanges();
    expect(frontFolderName.errors).toBeFalsy();
  })
  it('eventTypeString:check required Validation',()=>{
    let errors:any={};
    let eventTypeString=component.mediaFileConfigForm.controls["eventTypeString"];
    expect(eventTypeString.valid).toBeTruthy();
    errors = eventTypeString.errors || {};
    expect(errors['required']).toBeFalsy();
  })
  it('eventTypeString:check required Validation',()=>{
    let errors:any={};
    let eventTypeString=component.mediaFileConfigForm.controls["eventTypeString"];
    eventTypeString.setValue("Lumgni");
    fixture.detectChanges();
    expect(eventTypeString.errors).toBeNull();
  })
  it('daystoWaitToLoadEventsForLog:check required Validation',()=>{
    let errors:any={};
    let daystoWaitToLoadEventsForLog=component.mediaFileConfigForm.controls["daystoWaitToLoadEventsForLog"];
    expect(daystoWaitToLoadEventsForLog.valid).toBeTruthy();
    errors = daystoWaitToLoadEventsForLog.errors || {};
    expect(errors['required']).toBeFalsy();
  })
  it('daystoWaitToLoadEventsForLog:check required Validation',()=>{
    let errors:any={};
    let daystoWaitToLoadEventsForLog=component.mediaFileConfigForm.controls["daystoWaitToLoadEventsForLog"];
    daystoWaitToLoadEventsForLog.setValue(342);
    fixture.detectChanges();
    expect(daystoWaitToLoadEventsForLog.errors).toBeNull();
  })
  it('rear1:check required Validation',()=>{
    let errors:any={};
    let rear1=component.mediaFileConfigForm.controls["rear1"];
    expect(rear1.valid).toBeTruthy();
    errors = rear1.errors || {};
    expect(errors['required']).toBeFalsy();
  })
  it('rear1:check required Validation',()=>{
    let errors:any={};
    let rear1=component.mediaFileConfigForm.controls["rear1"];
    rear1.setValue(true);
    fixture.detectChanges();
    expect(rear1.errors).toBeNull();
  })
  it('rear2:check required Validation',()=>{
    let errors:any={};
    let rear2=component.mediaFileConfigForm.controls["rear2"];
    expect(rear2.valid).toBeTruthy();
    errors = rear2.errors || {};
    expect(errors['required']).toBeFalsy();
  })
  it('rear2:check required Validation',()=>{
    let errors:any={};
    let rear2=component.mediaFileConfigForm.controls["rear2"];
    rear2.setValue(true);
    fixture.detectChanges();
    expect(rear2.errors).toBeNull();
  })
  it('rear3:check required Validation',()=>{
    let errors:any={};
    let rear3=component.mediaFileConfigForm.controls["rear3"];
    expect(rear3.valid).toBeTruthy;
    errors = rear3.errors || {};
    expect(errors['required']).toBeFalsy();
  })
  it('rear3:check required Validation',()=>{
    let errors:any={};
    let rear3=component.mediaFileConfigForm.controls["rear3"];
    rear3.setValue(true);
    fixture.detectChanges();
    expect(rear3.errors).toBeNull();
  })
  it('rear4:check required Validation',()=>{
    let errors:any={};
    let rear4=component.mediaFileConfigForm.controls["rear4"];
    expect(rear4.valid).toBeTruthy();
    errors = rear4.errors || {};
    expect(errors['required']).toBeFalsy();
  })
  it('rear4:check required Validation',()=>{
    let errors:any={};
    let rear4=component.mediaFileConfigForm.controls["rear4"];
    rear4.setValue(true);
    fixture.detectChanges();
    expect(rear4.errors).toBeNull();
  })
  it('front1:check required Validation',()=>{
    let errors:any={};
    let front1=component.mediaFileConfigForm.controls["front1"];
    expect(front1.valid).toBeTruthy();
    errors = front1.errors || {};
    expect(errors['required']).toBeFalsy();
  })
  it('front1:check required Validation',()=>{
    let errors:any={};
    let front1=component.mediaFileConfigForm.controls["front1"];
    front1.setValue(true);
    fixture.detectChanges();
    expect(front1.errors).toBeNull();
  })
  it('front2:check required Validation',()=>{
    let errors:any={};
    let front2=component.mediaFileConfigForm.controls["front2"];
    expect(front2.valid).toBeTruthy();
    errors = front2.errors || {};
    expect(errors['required']).toBeFalsy();
  })
  it('front2:check required Validation',()=>{
    let errors:any={};
    let front2=component.mediaFileConfigForm.controls["front2"];
    front2.setValue(true);
    fixture.detectChanges();
    expect(front2.errors).toBeNull();
  })
  it('video:check required Validation',()=>{
    let errors:any={};
    let video=component.mediaFileConfigForm.controls["video"];
    expect(video.valid).toBeTruthy();
    errors = video.errors || {};
    expect(errors['required']).toBeFalsy();
  })
  it('video:check required Validation',()=>{
    let errors:any={};
    let video=component.mediaFileConfigForm.controls["video"];
    video.setValue(true);
    fixture.detectChanges();
    expect(video.errors).toBeNull();
  })
  it('extractedVideoImage:check required Validation',()=>{
    let errors:any={};
    let extractedVideoImage=component.mediaFileConfigForm.controls["extractedVideoImage"];
    expect(extractedVideoImage.valid).toBeTruthy();
    errors = extractedVideoImage.errors || {};
    expect(errors['required']).toBeFalsy();
  })
  it('extractedVideoImage:check required Validation',()=>{
    let errors:any={};
    let extractedVideoImage=component.mediaFileConfigForm.controls["extractedVideoImage"];
    extractedVideoImage.setValue(true);
    fixture.detectChanges();
    expect(extractedVideoImage.errors).toBeNull();
  })
  it('requiredLPRPlate:check required Validation',()=>{
    let errors:any={};
    let requiredLPRPlate=component.mediaFileConfigForm.controls["requiredLPRPlate"];
    expect(requiredLPRPlate.valid).toBeTruthy();
    errors = requiredLPRPlate.errors || {};
    expect(errors['required']).toBeFalsy();
  })
  it('requiredLPRPlate:check required Validation',()=>{
    let errors:any={};
    let requiredLPRPlate=component.mediaFileConfigForm.controls["requiredLPRPlate"];
    requiredLPRPlate.setValue(true);
    fixture.detectChanges();
    expect(requiredLPRPlate.errors).toBeNull();
  })
  it('useExitSpeed:check required Validation',()=>{
    let errors:any={};
    let useExitSpeed=component.mediaFileConfigForm.controls["useExitSpeed"];
    expect(useExitSpeed.valid).toBeTruthy();
    errors = useExitSpeed.errors || {};
    expect(errors['required']).toBeFalsy();
  })
  it('useExitSpeed:check required Validation',()=>{
    let errors:any={};
    let useExitSpeed=component.mediaFileConfigForm.controls["useExitSpeed"];
    useExitSpeed.setValue(true);
    fixture.detectChanges();
    expect(useExitSpeed.errors).toBeNull();
  })
  it('mediaFileConfigForm',()=>{
    let dciDownload=component.mediaFileConfigForm.controls["dciDownload"];
    let dciConvertFiles=component.mediaFileConfigForm.controls["dciConvertFiles"];
    let relativeDayBegin=component.mediaFileConfigForm.controls["relativeDayBegin"];
    let relativeDayEnd=component.mediaFileConfigForm.controls["relativeDayEnd"];
    let thumbnailScaleFraction=component.mediaFileConfigForm.controls["thumbnailScaleFraction"];
    let dciEncrypted=component.mediaFileConfigForm.controls["dciEncrypted"];
    let rearFolderName=component.mediaFileConfigForm.controls["rearFolderName"];
    let frontFolderName=component.mediaFileConfigForm.controls["frontFolderName"];
    let eventTypeString=component.mediaFileConfigForm.controls["eventTypeString"];
    let daystoWaitToLoadEventsForLog=component.mediaFileConfigForm.controls["daystoWaitToLoadEventsForLog"];
    let rear1=component.mediaFileConfigForm.controls["rear1"];
    let rear2=component.mediaFileConfigForm.controls["rear2"];
    let rear3=component.mediaFileConfigForm.controls["rear3"];
    let rear4=component.mediaFileConfigForm.controls["rear4"];
    let front1=component.mediaFileConfigForm.controls["front1"];
    let front2=component.mediaFileConfigForm.controls["front2"];
    let video=component.mediaFileConfigForm.controls["video"];
    let extractedVideoImage=component.mediaFileConfigForm.controls["extractedVideoImage"];
    let requiredLPRPlate=component.mediaFileConfigForm.controls["requiredLPRPlate"];
    let useExitSpeed=component.mediaFileConfigForm.controls["useExitSpeed"];

    dciDownload.setValue("K:\Warne\Public");
    dciConvertFiles.setValue("F:\Bhat\Kapoor");
    relativeDayBegin.setValue(13);
    relativeDayEnd.setValue(13);
    thumbnailScaleFraction.setValue(0.05);
    dciEncrypted.setValue("H:\\Bhat\\Kapoor");
    rearFolderName.setValue("OldFolder");
    frontFolderName.setValue("BoldFolder");
    eventTypeString.setValue("Lumgni");
    daystoWaitToLoadEventsForLog.setValue(342);
    rear1.setValue(true);
    rear2.setValue(true);
    rear3.setValue(true);
    rear4.setValue(true);
    front1.setValue(true);
    front2.setValue(true);
    video.setValue(true);
    extractedVideoImage.setValue(true);
    requiredLPRPlate.setValue(true);
    useExitSpeed.setValue(true);

    expect(component.mediaFileConfigForm.valid).toBeDefined();
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
  it(' restrictWhiteSpace(event:any)',()=>{
    spyOn(component, 'restrictWhiteSpace');
    let input = fixture.debugElement.query(By.css('input'));
    let inputElement = input.nativeElement;
    // const event = {
    //   isTrusted: false,
    //   altKey: false,
    //   bubbles: false,
    //   cancelBubble: false,
    //   cancelable: false,
    //   charCode: 0,
    //   code: '',
    //   composed: false,
    //   ctrlKey: false,
    //   currentTarget: null,
    //   defaultPrevented: false,
    //   detail: 0,
    //   eventPhase: 0,
    //   isComposing: false,
    //   key: '',
    //   keyCode: 32,
    //   location: 0,
    //   metaKey: false,
    //   path: [],
    //   repeat: false,
    //   returnValue: true,
    //   shiftKey: false,
    //   sourceCapabilities: null,
    //   srcElement: null,
    //   target: {selectionStart:0},
    //   timeStamp: 8680.800000011921,
    //   type: 'keypress',
    //   view: null,
    //   which: 0,
    // };
    const event = new KeyboardEvent('keypress',{keyCode:32});
    inputElement.dispatchEvent(event);
    component.restrictWhiteSpace(event)
      const key = event.keyCode;
      expect(key).toEqual(32);
      event.preventDefault();
  })
  it('showAddFormPage',()=>{
    component.showAddFormPage() ;
      expect(component.showAddForm).toEqual(true);
      expect(component.showEditForm).toEqual(false);
  })
  it('cancelAdd_Save',()=>{
    component.cancelAdd_Save()
      component.mediaFileConfigForm.reset();
      expect(component.showAddForm).toEqual(false);
      expect(component.showEditForm).toEqual(false);
  })
  it('editIconClicked',()=>{
    expect(component.showEditForm).toBeTruthy;
    let dciDownload=component.mediaFileConfigForm.controls["dciDownload"];
    let dciConvertFiles=component.mediaFileConfigForm.controls["dciConvertFiles"];
    let relativeDayBegin=component.mediaFileConfigForm.controls["relativeDayBegin"];
    let relativeDayEnd=component.mediaFileConfigForm.controls["relativeDayEnd"];
    let thumbnailScaleFraction=component.mediaFileConfigForm.controls["thumbnailScaleFraction"];
    let dciEncrypted=component.mediaFileConfigForm.controls["dciEncrypted"];
    let rearFolderName=component.mediaFileConfigForm.controls["rearFolderName"];
    let frontFolderName=component.mediaFileConfigForm.controls["frontFolderName"];
    let eventTypeString=component.mediaFileConfigForm.controls["eventTypeString"];
    let daystoWaitToLoadEventsForLog=component.mediaFileConfigForm.controls["daystoWaitToLoadEventsForLog"];
    let rear1=component.mediaFileConfigForm.controls["rear1"];
    let rear2=component.mediaFileConfigForm.controls["rear2"];
    let rear3=component.mediaFileConfigForm.controls["rear3"];
    let rear4=component.mediaFileConfigForm.controls["rear4"];
    let front1=component.mediaFileConfigForm.controls["front1"];
    let front2=component.mediaFileConfigForm.controls["front2"];
    let video=component.mediaFileConfigForm.controls["video"];
    let extractedVideoImage=component.mediaFileConfigForm.controls["extractedVideoImage"];
    let requiredLPRPlate=component.mediaFileConfigForm.controls["requiredLPRPlate"];
    let useExitSpeed=component.mediaFileConfigForm.controls["useExitSpeed"];

    dciDownload.setValue("K:\Warne\Public");
    dciConvertFiles.setValue("F:\Bhat\Kapoor");
    relativeDayBegin.setValue(13);
    relativeDayEnd.setValue(13);
    thumbnailScaleFraction.setValue(0.05);
    dciEncrypted.setValue("H:\\Bhat\\Kapoor");
    rearFolderName.setValue("OldFolder");
    frontFolderName.setValue("BoldFolder");
    eventTypeString.setValue("Lumgni");
    daystoWaitToLoadEventsForLog.setValue(342);
    rear1.setValue(true);
    rear2.setValue(true);
    rear3.setValue(true);
    rear4.setValue(true);
    front1.setValue(true);
    front2.setValue(true);
    video.setValue(true);
    extractedVideoImage.setValue(true);
    requiredLPRPlate.setValue(true);
    useExitSpeed.setValue(true);

    let rowData={
      dciDownload:dciDownload,
      dciConvertFiles:dciConvertFiles,
      relativeDayBegin:relativeDayBegin,
      relativeDayEnd:relativeDayEnd,
      thumbnailScaleFraction:thumbnailScaleFraction,
      dciEncrypted:dciEncrypted,
      rearFolderName:rearFolderName,
      frontFolderName:frontFolderName,
      eventTypeString:eventTypeString,
      daystoWaitToLoadEventsForLog:daystoWaitToLoadEventsForLog,
      rear1:rear1,
      rear2:rear2,
      rear3:rear3,
      rear4:rear4,
      front1:front1,
      front2:front2,
      video:video,
      extractedVideoImage:extractedVideoImage,
      requiredLPRPlate:requiredLPRPlate,
      useExitSpeed:useExitSpeed
    }
     component.editIconClicked(rowData)
  })
  it('addMediaFileConfig',()=>{
    component.sort.sort({id:'',start:'asc',disableClear : false});
    let dciDownload=component.mediaFileConfigForm.controls["dciDownload"];
    let dciConvertFiles=component.mediaFileConfigForm.controls["dciConvertFiles"];
    let relativeDayBegin=component.mediaFileConfigForm.controls["relativeDayBegin"];
    let relativeDayEnd=component.mediaFileConfigForm.controls["relativeDayEnd"];
    let thumbnailScaleFraction=component.mediaFileConfigForm.controls["thumbnailScaleFraction"];
    let dciEncrypted=component.mediaFileConfigForm.controls["dciEncrypted"];
    let rearFolderName=component.mediaFileConfigForm.controls["rearFolderName"];
    let frontFolderName=component.mediaFileConfigForm.controls["frontFolderName"];
    let eventTypeString=component.mediaFileConfigForm.controls["eventTypeString"];
    let daystoWaitToLoadEventsForLog=component.mediaFileConfigForm.controls["daystoWaitToLoadEventsForLog"];
    let rear1=component.mediaFileConfigForm.controls["rear1"];
    let rear2=component.mediaFileConfigForm.controls["rear2"];
    let rear3=component.mediaFileConfigForm.controls["rear3"];
    let rear4=component.mediaFileConfigForm.controls["rear4"];
    let front1=component.mediaFileConfigForm.controls["front1"];
    let front2=component.mediaFileConfigForm.controls["front2"];
    let video=component.mediaFileConfigForm.controls["video"];
    let extractedVideoImage=component.mediaFileConfigForm.controls["extractedVideoImage"];
    let requiredLPRPlate=component.mediaFileConfigForm.controls["requiredLPRPlate"];
    let useExitSpeed=component.mediaFileConfigForm.controls["useExitSpeed"];

    dciDownload.setValue("K:\Warne\Public");
    dciConvertFiles.setValue("F:\Bhat\Kapoor");
    relativeDayBegin.setValue(13);
    relativeDayEnd.setValue(13);
    thumbnailScaleFraction.setValue(0.05);
    dciEncrypted.setValue("H:\\Bhat\\Kapoor");
    rearFolderName.setValue("OldFolder");
    frontFolderName.setValue("BoldFolder");
    eventTypeString.setValue("Lumgni");
    daystoWaitToLoadEventsForLog.setValue(342);
    rear1.setValue(true);
    rear2.setValue(true);
    rear3.setValue(true);
    rear4.setValue(true);
    front1.setValue(true);
    front2.setValue(true);
    video.setValue(true);
    extractedVideoImage.setValue(true);
    requiredLPRPlate.setValue(true);
    useExitSpeed.setValue(true);
    expect(component.mediaFileConfigForm.valid).toBeDefined();

    let mediaFileConfigurationModel = {
      active: true,
      contractID: 0,
      createDatetime: '2022-05-09T07:33:58.321Z',
      createUserID: 0,
      daystoWaitToLoadEventsForLog: 342,
      dciConvertFiles: 'F:\\Bhat\\Kapoor',
      dciDownload: 'K:\\Warne\\Public"',
      dciEncrypted: 'H:\\\\Bhat\\\\Kapoor',
      eventTypeString: 'Lumgni',
      extractedVideoImage: true,
      front1: true,
      front2: true,
      frontFolderName: 'BoldFolder',
      id: 0,
      isDeleted: 'N',
      rear1: true,
      rear2: true,
      rear3: true,
      rear4: true,
      rearFolderName: 'OldFolder',
      relativeDayBegin: 13,
      relativeDayEnd: 9,
      requiredLPRPlate: true,
      thumbnailScaleFraction: 0.05,
      updateDatetime: '2022-05-09T07:33:58.321Z',
      updateUserID: 0,
      useExitSpeed: true,
      video: true,
    };
    component.addMediaFileConfig(mediaFileConfigurationModel)
  })
  it('updateMediaFileConfig',()=>{
    component.sort.sort({id:'',start:'asc',disableClear : false});
    let dciDownload=component.mediaFileConfigForm.controls["dciDownload"];
    let dciConvertFiles=component.mediaFileConfigForm.controls["dciConvertFiles"];
    let relativeDayBegin=component.mediaFileConfigForm.controls["relativeDayBegin"];
    let relativeDayEnd=component.mediaFileConfigForm.controls["relativeDayEnd"];
    let thumbnailScaleFraction=component.mediaFileConfigForm.controls["thumbnailScaleFraction"];
    let dciEncrypted=component.mediaFileConfigForm.controls["dciEncrypted"];
    let rearFolderName=component.mediaFileConfigForm.controls["rearFolderName"];
    let frontFolderName=component.mediaFileConfigForm.controls["frontFolderName"];
    let eventTypeString=component.mediaFileConfigForm.controls["eventTypeString"];
    let daystoWaitToLoadEventsForLog=component.mediaFileConfigForm.controls["daystoWaitToLoadEventsForLog"];
    let rear1=component.mediaFileConfigForm.controls["rear1"];
    let rear2=component.mediaFileConfigForm.controls["rear2"];
    let rear3=component.mediaFileConfigForm.controls["rear3"];
    let rear4=component.mediaFileConfigForm.controls["rear4"];
    let front1=component.mediaFileConfigForm.controls["front1"];
    let front2=component.mediaFileConfigForm.controls["front2"];
    let video=component.mediaFileConfigForm.controls["video"];
    let extractedVideoImage=component.mediaFileConfigForm.controls["extractedVideoImage"];
    let requiredLPRPlate=component.mediaFileConfigForm.controls["requiredLPRPlate"];
    let useExitSpeed=component.mediaFileConfigForm.controls["useExitSpeed"];

    dciDownload.setValue("K:\Warne\Public");
    dciConvertFiles.setValue("F:\Bhat\Kapoor");
    relativeDayBegin.setValue(13);
    relativeDayEnd.setValue(13);
    thumbnailScaleFraction.setValue(0.05);
    dciEncrypted.setValue("H:\\Bhat\\Kapoor");
    rearFolderName.setValue("OldFolder");
    frontFolderName.setValue("BoldFolder");
    eventTypeString.setValue("Lumgni");
    daystoWaitToLoadEventsForLog.setValue(342);
    rear1.setValue(true);
    rear2.setValue(true);
    rear3.setValue(true);
    rear4.setValue(true);
    front1.setValue(true);
    front2.setValue(true);
    video.setValue(true);
    extractedVideoImage.setValue(true);
    requiredLPRPlate.setValue(true);
    useExitSpeed.setValue(true);
    expect(component.mediaFileConfigForm.valid).toBeDefined();

    let mediaFileConfigurationModel = {
      active: true,
      contractID: 0,
      createDatetime: '2022-05-09T07:33:58.321Z',
      createUserID: 0,
      daystoWaitToLoadEventsForLog: 342,
      dciConvertFiles: 'F:\\Bhat\\Kapoor',
      dciDownload: 'K:\\Warne\\Public"',
      dciEncrypted: 'H:\\\\Bhat\\\\Kapoor',
      eventTypeString: 'Lumgni',
      extractedVideoImage: true,
      front1: true,
      front2: true,
      frontFolderName: 'BoldFolder',
      id: 0,
      isDeleted: 'N',
      rear1: true,
      rear2: true,
      rear3: true,
      rear4: true,
      rearFolderName: 'OldFolder',
      relativeDayBegin: 13,
      relativeDayEnd: 9,
      requiredLPRPlate: true,
      thumbnailScaleFraction: 0.05,
      updateDatetime: '2022-05-09T07:33:58.321Z',
      updateUserID: 0,
      useExitSpeed: true,
      video: true,
    };
    component.editIconClicked(mediaFileConfigurationModel);
    component.updateMediaFileConfig(mediaFileConfigurationModel)
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
    component.mediaFileConfigForm.get('assignAgencyCode')?.setErrors({ invalid: component.welcome });
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
  it('transformTotal value is not empty', () => {
    component.showAddForm=true
    let input = 'thumbnailScaleFraction';
    var value = "";
    component.mediaFileConfigForm.controls[input].setValue(null);
    component.transformTotal(input);
  });
  it('transformTotal value is empty', () => {
    component.showAddForm=true
    let input = 'thumbnailScaleFraction';
    var value = 7.8990;
    var decimalValue = Number(value).toFixed(2);
    component.mediaFileConfigForm.controls[input].setValue(decimalValue);
    component.transformTotal(input);
  });
  it('appendLangInAdd',()=>{
    let lang='en';
    component.appendLang(lang);
  })
  it('setPagelabel(lang: any)',()=>{
    let lang='en';
    component.setPagelabel(lang)
  })
});
