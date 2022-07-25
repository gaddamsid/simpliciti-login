import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureUploadComponent } from './signature-upload.component';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { apiServiceStub } from 'src/app/shared/testCasesHelperClasses/apiServiceStub';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('SignatureUploadComponent', () => {
  let component: SignatureUploadComponent;
  let fixture: ComponentFixture<SignatureUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignatureUploadComponent ],
      imports:[TranslateStubsModule,
        FormsModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule],
      providers:[
        { provide: ApiService, useClass: apiServiceStub },
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatureUploadComponent);
    component = fixture.componentInstance;
    spyOn(window, "confirm").and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('upload file',() => {
    let filedata = {
      target: {
        files: [{
          lastModified: 1654859116164,
          lastModifiedDate: "10-07-2022",
          name: "dummy.pdf",
          size: 13264,
          type: "application/pdf",
          webkitRelativePath: ""
        }]
      }
    }
    component.UploadFile(filedata);
    expect(component.fileData.length).toBeGreaterThan(0);
  })

});
