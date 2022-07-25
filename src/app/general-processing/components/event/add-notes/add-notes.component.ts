import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { GPService } from 'src/app/general-processing/services/g-p.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {
  clearData: string = '';
  sendTicketId: any[] = [];
  ticketNumber: any[] = [];
  noteType!: string;
  plateId!: string;
  eventId!: string;
  citationsId: number[] = [];
  successMsg!: string;
  notesForm!: FormGroup;
  accountEntityId: any;
  getDataSubscription!: Subscription;
  el!: ElementRef;
  loader: boolean = false;
  isLoading: boolean = false
  entityObj: any = {
    "entityNumber": '',
    "SSN": '',
    "DOB": '',
    "driverLicense": '',
    "ticketType": '',
    "plate": '',
    "VIN": '',
    "address": '',
    "email": ''
  }
  Notes!: null;
  citationNumbers: any;

  constructor(private router: Router, public gpservice: GPService,
    public translate: TranslateService, private notificationService: ToastrService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.notesForm = new FormGroup({
      'dataRecord': new FormControl('', [Validators.required]),
    });
    this.eventId = this.route.snapshot.params['eventId'];
    this.plateId = this.route.snapshot.params['plateNumber'];
    this.citationNumbers = this.route.snapshot.params['citationNumbers'];
    if (this.eventId) {
      this.accountEntityId = this.route.snapshot.params['accountEntityId'];
      this.getDataForEvent();
    } else {
      if (this.citationNumbers) {
        this.citationsId = this.citationNumbers.toString().split(',');
        this.sendTicketId = this.route.snapshot.params['citationIds']?.toString().split(',');
        this.getDataForTicketTable();
      } else {
        this.accountEntityId = this.route.snapshot.params['accountEntityId'];
        this.getDataForTicketTable();
      }
    }
  }

  getDataForTicketTable() {
    this.loader = true;
    this.gpservice.get(`getEntityDetails/${this.plateId}`).subscribe(res => {
      this.entityObj = this.assignValues(res);
      this.loader = false;
    })
  }

  cancelAddNotes() {
    // this.notesDialogRef.close();
    this.notificationService.info(this.translate.instant("Process Cancelled"));
    this.toNavigate();
    // if (this.noteType == 'ticket' || this.noteType == 'entity') {
    //   this.router.navigateByUrl(`gp/search/entity-details/entity/${this.plateId}`);
    // }
    // else {
    //   this.router.navigateByUrl(`gp/search/event-details/${this.eventId}`);
    // }
  }

  clearFields() {
    // this.clearData = 'Notes';
    this.notesForm.controls['dataRecord'].setValue('');
    // this.el.nativeElement.querySelector()
    // this.notesForm.reset();
  }

  getDataForEvent() {
    this.loader = true;
    this.gpservice.get(`getEventId/${this.eventId}`).subscribe(res => {
      this.entityObj = this.assignValues(res);
      this.accountEntityId = res.entityDetails.plateDetails.accountEntityId;
      this.loader = false;
    })
  }

  assignValues(res: any) {
    this.entityObj.entityNumber = res.entityDetails.plateDetails.entityNumber;
    this.entityObj.DOB = res.entityDetails.ownerDetails.dateOfBirth, 'MMM d, y';
    this.entityObj.driverLicense = res.entityDetails.ownerDetails.driverLicense;
    this.entityObj.plate = res.entityDetails.plateDetails.plateNumber;
    this.entityObj.VIN = res.entityDetails.plateDetails.vinNumber;
    let streetline1 = res.entityDetails.ownerDetails.address.streetLine1 ? res.entityDetails.ownerDetails.address.streetLine1 : '';
    let streetline2 = res.entityDetails.ownerDetails.address.streetLine2 ? ',' + res.entityDetails.ownerDetails.address.streetLine2 : '';
    let streetline3 = res.entityDetails.ownerDetails.address.streetLine3 ? ',' + res.entityDetails.ownerDetails.address.streetLine3 : '';
    let streetAddress = streetline1 + streetline2 + streetline3;
    let city = res.entityDetails.ownerDetails.address.city;
    let state = res.entityDetails.ownerDetails.address.state;
    let zipCode = res.entityDetails.ownerDetails.address.zipCode;
    this.entityObj.address = this.combineAddress(streetAddress, state, city, zipCode);
    this.entityObj.email = res.entityDetails.ownerDetails.address.email;
    return this.entityObj;
  }

  combineAddress(streetAddres: string, state: string, city: string, zipCode: string) {
    return streetAddres + ',' + state + ',' + city + ',' + zipCode;
  }

  startspace(event: any) {
    console.log(event)
    const key = event.keyCode;
    if (key === 32 && event.target.selectionStart === 0) {
      event.preventDefault();

    }
  }

  AddNotes(data: any) {
    let obj;
    if (this.sendTicketId) {
      obj = {
        "dataRecord": data.dataRecord,
        "functionsId": 3,
        "recordIds": this.sendTicketId
      }
    }
    else {
      obj =
      {
        "dataRecord": data.dataRecord,
        "functionsId": 1,
        "recordIds": [this.accountEntityId]
      }
    }

    if (this.notesForm.valid) {
      this.loader = true;
      this.gpservice.post(`note`, obj, false).subscribe((res) => {
        this.loader = false;
        if (res.status == "Success") {
          const msg = "";
          const code = res.details[0].code;
          this.successMsg = this.translate.instant('Record Added Successfully', {
            msg: msg,
          });
          this.notificationService.success(this.successMsg);
          this.toNavigate();
        }
      });
    }
  }

  toNavigate() {
    if (this.eventId) {
      this.router.navigateByUrl(`gp/search/event-details/${this.eventId}`);
    } else {
      this.router.navigateByUrl(`gp/search/entity-details/entity/${this.plateId}`);
    }
  }
}
