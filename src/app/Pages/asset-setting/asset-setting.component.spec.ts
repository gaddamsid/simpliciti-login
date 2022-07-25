import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSettingComponent } from './asset-setting.component';
import { TranslateStubsModule  } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
describe('AssetSettingComponent', () => {
  let component: AssetSettingComponent;
  let fixture: ComponentFixture<AssetSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetSettingComponent ],
      imports:[
        TranslateStubsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        DragDropModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule
      ],
      providers:[
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSettingComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

  it('save Settings', () => {
    component.getAssetMappings();
    component.saveSettings();
    expect(component.dataSuffled).toBeFalsy();
  });

  // it('drop functionality', () => {
  //   expect(component.dataSuffled).toBeFalsy();
  //   let event = {}
  //   component.drop();
  //   component.sortAssetToBeMapped(component.assetToBeMapped);
  // });
});
