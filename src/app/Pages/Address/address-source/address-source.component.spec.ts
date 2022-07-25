import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressSourceComponent } from './address-source.component';
import { TranslateStubsModule } from 'src/app/shared/testCasesHelperClasses/TranslateStubsModule.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ToasterServiceStub } from 'src/app/shared/testCasesHelperClasses/ToasterServiceStub';
import { MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LiveAnnouncerStub } from 'src/app/shared/testCasesHelperClasses/LiveAnnouncerStub';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { languageServiceStub } from 'src/app/shared/testCasesHelperClasses/languageServiceStub';
import { By } from '@angular/platform-browser';
import { AddressSourceService } from 'src/app/Services/AddressSource/address-source.service';
import { AddressSourceServiceStub } from 'src/app/shared/testCasesHelperClasses/addresssSourceServiceStub';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('AddressSourceComponent', () => {
  let component: AddressSourceComponent;
  let fixture: ComponentFixture<AddressSourceComponent>;
  let inputElement: HTMLInputElement;

  let rowData = {
    addressSourceCod: "A5",
    addressSourceDescription: "SecRail",
    addressSourceId: 150,
    contractId: 2,
    createDateTime: "2022-06-29",
    createUserId: 1,
    isDeleted: "N",
    updateDateTime: "2022-06-29",
    updateUserId: 1,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressSourceComponent],
      imports:[
        TranslateStubsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatTooltipModule
      ],
      providers:[
        { provide: AddressSourceService, useClass: AddressSourceServiceStub },
        { provide: ToastrService, useClass: ToasterServiceStub },
        { provide: LanguageService, useClass: languageServiceStub },
        { provide: LiveAnnouncer, useClass: LiveAnnouncerStub },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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

  it('update Address', () => {
    component.editAddress(rowData);
    component.updateAddress(rowData);
    expect(component.addAddressButton).toBeTruthy();
  });

  it('edit Address', () => {
    let addressSourceCod = component.addressForm.controls['addressSourceCod'];
    addressSourceCod.setValue(rowData.addressSourceCod);
    let addressSourceDescription = component.addressForm.controls['addressSourceDescription'];
    addressSourceDescription.setValue(rowData.addressSourceDescription);
    component.editAddress(rowData);
    expect(component.showForm).toBeTruthy();
    expect(component.showEditForm).toBeTruthy();
    expect(component.addAddressButton).toBeFalsy();
  });

  
  it('show Add FormPage', () => {
    expect(component).toBeTruthy();
    component.addressForm.controls["addressSourceCod"].setValue('q838473');
    component.addressForm.controls["addressSourceDescription"].setValue('23e');
    component.addAddressList(rowData);
  });

  

  it('apply filter', () => {
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

  it('add New Address', () => {
    component.addNewAddress();
    expect(component.showForm).toBeTruthy();
    expect(component.showEditForm).toBeFalsy();
    expect(component.addAddressButton).toBeTruthy();
  });

  
  it('cancel Adding', () => {
    expect(component.showForm).toBeFalsy();
    expect(component.addAddressButton).toBeTruthy();
    component.addressForm.reset();
    component.cancelAdding();
  });

  it('error response when code is 5000 and message is not Duplicate Key', () => {
    let error = {
      error: {
        details: [{
          code: "5000",
          fieldName: "addresssourcecode",
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
          fieldName: "addresssourcecode",
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

  it('delete Address', () => {
    spyOn(window,"confirm").and.returnValue(true);
    component.deleteAddress(rowData.addressSourceId);
    expect(component.showForm).toBeFalsy();
  });
  

});
