import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressSourceModel } from 'src/app/Models/Address Source/address-source-model';
import { AddressSourceService } from 'src/app/Services/AddressSource/address-source.service';
import { ToastrService } from 'ngx-toastr';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';


@Component({
  selector: 'app-address-source',
  templateUrl: './address-source.component.html',
  styleUrls: ['./address-source.component.scss']
})
export class AddressSourceComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!: ElementRef;
  displayedColumns: string[] = ['addressSourceCod', 'addressSourceDescription', 'action'];
  dataSource = new MatTableDataSource<AddressSourceModel>();;
  addressForm !: FormGroup;
  showForm: boolean = false;
  data: any;
  successMsg!: string;
  titleAlert: string = 'This field is required';
  alertMsg!: string;
  welcome: any;
  addAddressButton: boolean = true;
  editData: any;
  showEditForm: boolean = false;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(public translate: TranslateService,
    private language: LanguageService,
    private _liveAnnouncer: LiveAnnouncer,
    private addressSourceService: AddressSourceService,
    private notificationService: ToastrService
  ) { }

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'https://preview.ibb.co/jrsA6R/img12.jpg',
        medium: 'https://preview.ibb.co/jrsA6R/img12.jpg',
        big: 'https://preview.ibb.co/jrsA6R/img12.jpg'
      },
      {
        small: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
        medium: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
        big: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
      },
      {
        small: 'https://preview.ibb.co/mwsA6R/img7.jpg',
        medium: 'https://preview.ibb.co/mwsA6R/img7.jpg',
        big: 'https://preview.ibb.co/mwsA6R/img7.jpg'
      },{
        small: 'https://preview.ibb.co/kZGsLm/img8.jpg',
        medium: 'https://preview.ibb.co/kZGsLm/img8.jpg',
        big: 'https://preview.ibb.co/kZGsLm/img8.jpg'
      },  
      {
        small: 'https://preview.ibb.co/kZGsLm/img8.jpg',
        medium: 'https://preview.ibb.co/kZGsLm/img8.jpg',
        big: 'https://preview.ibb.co/kZGsLm/img8.jpg'
      },
      {
        small: 'https://preview.ibb.co/kZGsLm/img8.jpg',
        medium: 'https://preview.ibb.co/kZGsLm/img8.jpg',
        big: 'https://preview.ibb.co/kZGsLm/img8.jpg'
      },    
    ];

    this.getList();

    //Language Code
    this.language.sendLang.subscribe((lang) => {
      if (lang != '') {
        this.appendLang(lang);
      }
    });
    //Language Code

    this.addressForm = new FormGroup({
      'addressSourceCod': new FormControl('', Validators.required),
      'addressSourceDescription': new FormControl('', Validators.required),
    });
  }

  //<<-----------Sorting-------------------------------->>
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  //<<-----------Sorting Ends-------------------------------->>
  //<<-----------Language-------------------------------->>
  appendLang(lang: string) {
    this.translate.use(lang);
    this.setPagelabel(lang);
  }
  setPagelabel(lang: any) {
    const msg = "";
    this.translate.use(lang).toPromise();
    this.translate
      .use(lang)
      .subscribe(res => {
        this.dataSource.paginator = this.paginator;
        this.alertMsg = this.translate.instant("Items per page", { msg: msg });
        this.dataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;
      });
  }
  //<<-----------Language-------------------------------->>
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNewAddress() {
    this.showForm = true;
    this.showEditForm = false;
    this.addAddressButton = true;
    console.log(this.addressForm);
  }
  filterData(): void {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.addressSourceCod.toLocaleLowerCase().includes(filter) || data.addressSourceDescription.toLocaleLowerCase().includes(filter);
    };
  }

  cancelAdding() {
    this.showForm = false;
    this.alertMsg = "";
    this.successMsg = "";
    this.notificationService.info(this.translate.instant("Process Cancelled"));
    this.addressForm.reset();
    this.addAddressButton = true;
    this.getList();
  }

  getList() {
    this.addressSourceService.getAddressList().subscribe(res => {
      this.data = res;
      this.dataSource = new MatTableDataSource<AddressSourceModel>(res.reverse());
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.filterData();
    })
  }

  addAddressList(data: any) {
    // this.paginator.pageIndex = 0;
    // this.sort.sort({ id: '', start: 'asc', disableClear: false }) //To Disable the applied sorting so that the inserted record will appear at top
    if (this.addressForm.valid) {
      const obj = {
        "addressSourceCod": this.addressForm.value.addressSourceCod,
        "addressSourceDescription": this.addressForm.value.addressSourceDescription,
        "addressSourceId": 0,
        "contractId": 0,
        "createDatetime": "2022-04-18T11:47:02.518Z",
        "createUserId": 0,
        "updateDatetime": "2022-04-18T11:47:02.518Z",
        "updateUserId": 0
      }
      this.addressSourceService.addAddressList(obj).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          console.log(res.details[0].code)
          this.welcome = this.translate.instant("Record Added Successfully", { msg: msg });
          this.notificationService.success(this.welcome);
          this.addressForm.reset();
          this.getList();
          this.showForm = false;
        }
      }, error => {
        this.errorResponseCheck(error);
      })

    }
  }

  editAddress(data: any) {
    console.log(data);
    this.editData = data;
    this.showForm = true;
    this.showEditForm = true;
    this.addAddressButton = false;
    this.addressForm.controls["addressSourceCod"].setValue(data.addressSourceCod);
    this.addressForm.controls["addressSourceDescription"].setValue(data.addressSourceDescription);
  }

  updateAddress(addressData: any) {
    console.log(addressData);
    if (this.addressForm.valid) {
      const obj = {
        "addressSourceId": this.editData.addressSourceId,
        "addressSourceDescription": this.addressForm.value.addressSourceDescription,
        "addressSourceCod": this.addressForm.value.addressSourceCod
      }
      this.addressSourceService.UpdateAddress(this.editData.addressSourceId, obj).subscribe(res => {
        console.log(res);
        if (res.status == 'Success' || res.status == "failed") {
          const msg = '';
          this.alertMsg = this.translate.instant(res.details[0].code, { msg: msg });
          this.notificationService.success("Record Updated Successfully");
          this.getList();
          this.showForm = false;
          this.getList();
          this.addAddressButton = true;
          this.addressForm.reset();
        }
      }, error => {
        this.errorResponseCheck(error);
      })

    }
  }

  deleteAddress(rowData: any) {
    const msgs = "";
    if (confirm(this.translate.instant("Are you sure to delete", { msg: msgs }))) {
      this.addressSourceService.deleteAddress(rowData.addressSourceId).subscribe(res => {
        if (res.status == "Success") {
          const msg = "";
          const errcodes = res.details[0].code;
          this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          this.getList();
          this.showForm = false;
          this.addressForm.reset();
        }
      }, error => {
        this.errorResponseCheck(error);
      })

    }

  }

  // ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//
  errorResponseCheck(error: any) {
    for (var i = 0; i < error.error.details.length; i++) {
      if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
        const msg = "";
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        // this.notificationService.error("Duplicate Record Found");
        this.addressForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }
}
