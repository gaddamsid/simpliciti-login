import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GPService } from '../../services/g-p.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-plate-details',
  templateUrl: './plate-details.component.html',
  styleUrls: ['./plate-details.component.scss']
})
export class PlateDetailsComponent implements OnInit {

  constructor(
    private gpService: GPService,
    private route: ActivatedRoute,
    @Inject(LOCALE_ID) private locale: string,
    private router: Router
  ) { }

  customerInfo = {};
  registeryInfo = {};
  installmentPaymentPlan = {};
  excludeInfo = {};
  collectionInfo = {};
  plateNoDlNo = null;
  isLoading = true;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.plateNoDlNo = params['plateNumber'];
    });
    this.getPlateDetails();
  }

  getPlateDetails() {
    this.gpService.get(`getPlateInformation/${this.plateNoDlNo}`).subscribe((res) => {
      this.isLoading = false;
      this.customerInfo = this.customerInformation(res.customerInformation, res.registryInformation);
      this.registeryInfo = this.registryInformation(res.registryInformation);
      this.installmentPaymentPlan = this.installmentPaymentPlanList(res.installmentPaymentPlan);
      this.excludeInfo = this.excludeInformation(res.excludeInformation);
      this.collectionInfo = this.collectionInformation(res.collectionInformation);
    });
  }

  customerInformation(customerInfo: any, registryInfo: any) {
    if (customerInfo) {
      return {
        title: 'Customer Information',
        titleTextRight: false,
        headingTextRight: false,
        bodyTextRight: false,
        id: 'customer_info',
        details: [
          {
            key: 'First Name',
            value: customerInfo.firstName ? customerInfo.firstName : null
          },
          {
            key: 'Last Name',
            value: customerInfo.lastName ? customerInfo.lastName : null
          },
          {
            key: 'Address',
            value: `${customerInfo.addressLine1}, ${customerInfo.addressLine2}`
          },
          {
            key: 'City,State,Zip',
            value: `${customerInfo.city}, ${customerInfo.state}, ${customerInfo.zip}`
          },
          {
            key: 'Address Source',
            value: customerInfo.lastName ? customerInfo.addressSource : null
          },
          {
            key: 'DOB',
            value: customerInfo.dob ? this.onlyDateFormat(customerInfo.dob) : null
          },
          {
            key: 'Last Updated On',
            value: this.onlyDateFormat(customerInfo.lastUpdatedOn) ? this.onlyDateFormat(customerInfo.lastUpdatedOn) : null
          },
          {
            key: 'Effective Date',
            value: registryInfo.effectiveDate ? this.onlyDateFormat(registryInfo.effectiveDate) : null
          },
          {
            key: 'Phone Number',
            value: customerInfo.phoneNumber ? `${customerInfo.phoneNumber}` : null
          },
          {
            key: 'Email',
            value: customerInfo.email ? `${customerInfo.email}` : null
          },
          {
            key: 'SSN',
            value: customerInfo.ssn ? `${customerInfo.ssn}` : null
          },
          {
            key: 'Corporate Indicator',
            value: customerInfo.corporateIndicator ? `${customerInfo.corporateIndicator}` : null
          }
        ]
      }
    } else {
      return {
        title: 'Customer Information',
        titleTextRight: false,
        headingTextRight: false,
        bodyTextRight: false,
        id: 'customer_info',
        details: []
      };
    }
  }

  registryInformation(registryInfo: any) {
    if (registryInfo) {
      return {
        title: 'Registry Information',
        titleTextRight: false,
        headingTextRight: false,
        bodyTextRight: false,
        id: 'registry_info',
        details: [
          {
            key: 'Plate',
            value: registryInfo.plate ? `${registryInfo.plate}` : null
          },
          {
            key: 'VIN',
            value: registryInfo.vin ? `${registryInfo.vin}` : null
          },
          {
            key: 'Effective Date',
            value: registryInfo.effectiveDate ? this.onlyDateFormat(registryInfo.effectiveDate) : null
          },
          {
            key: 'Effective Date Source',
            value: registryInfo.effectiveDateSource ? `${registryInfo.effectiveDateSource}` : null
          },
          {
            key: 'Plate Owenership Date',
            value: registryInfo.plateOwnershipDate ? this.onlyDateFormat(registryInfo.plateOwnershipDate) : null
          },
          {
            key: 'Plate Type',
            value: registryInfo.plateType ? `${registryInfo.plateType}` : null
          },
          {
            key: 'Old Plate Type',
            value: registryInfo.oldPlateType ? `${registryInfo.oldPlateType}` : null
          },
          {
            key: 'Plate Expiration Date',
            value: registryInfo.plateExpirationDate ? `${registryInfo.plateExpirationDate}` : null
          },
          {
            key: 'Source',
            value: registryInfo.source ? `${registryInfo.source}` : null
          },
          {
            key: 'Last Requested',
            value: registryInfo.lastRequestedOn ? this.onlyDateFormat(registryInfo.lastRequestedOn) : null
          },
          {
            key: 'Processed On',
            value: registryInfo.processedOn ? this.onlyDateFormat(registryInfo.processedOn) : null
          },
          {
            key: 'Confirmed On',
            value: registryInfo.confirmedOn ? this.onlyDateFormat(registryInfo.confirmedOn) : null
          },
          {
            key: 'Hold Number',
            value: registryInfo.holdNumber ? `${registryInfo.holdNumber}` : null
          },
          {
            key: 'Save State Plate',
            value: registryInfo.saveStatePlate ? `${registryInfo.saveStatePlate}` : null
          },
          {
            key: 'Fleet Number',
            value: registryInfo.fleetNumber ? `${registryInfo.fleetNumber}` : null
          },
          {
            key: 'Fleet Termination Date',
            value: registryInfo.fleetTerminationDate ? this.onlyDateFormat(registryInfo.fleetTerminationDate) : null
          }
        ]
      }
    } else {
      return {
        title: 'Registry Information',
        titleTextRight: false,
        headingTextRight: false,
        bodyTextRight: false,
        id: 'registry_info',
        details: []
      };
    }
  }

  installmentPaymentPlanList(installmentPlan: any) {
    if (installmentPlan) {
      return {
        title: 'Installment Payment Plan',
        titleTextRight: false,
        headingTextRight: false,
        bodyTextRight: false,
        id: 'IPP_info',
        details: [
          {
            key: 'Plan Number',
            value: installmentPlan.ippNumber ? `${installmentPlan.ippNumber}` : null
          },
          {
            key: 'Plan Status',
            value: installmentPlan.ippStatus ? `${installmentPlan.ippStatus}` : null
          },
          {
            key: 'Plan Date',
            value: installmentPlan.ippDate ? this.onlyDateFormat(installmentPlan.ippDate) : null
          }
        ]
      }
    } else {
      return {
        title: 'Installment Payment Plan',
        titleTextRight: false,
        headingTextRight: false,
        bodyTextRight: false,
        id: 'IPP_info',
        details: []
      };
    }
  }

  excludeInformation(excludeInfo: any) {
    if (excludeInfo) {
      return {
        title: 'Exclude Information',
        titleTextRight: false,
        headingTextRight: false,
        bodyTextRight: false,
        id: 'exclude_info',
        details: [
          {
            key: 'Exclude Date',
            value: excludeInfo.excludeDate ? this.onlyDateFormat(excludeInfo.excludeDate) : null
          },
          {
            key: 'Exclude Time',
            value: excludeInfo.excludeTime ? this.onlyTime(excludeInfo.excludeTime) : null
          },
          {
            key: 'Exclude Duration',
            value: excludeInfo.excludeDuration ? `${excludeInfo.excludeDuration}` : null
          }
        ]
      }
    } else {
      return {
        title: 'Exclude Information',
        titleTextRight: false,
        headingTextRight: false,
        bodyTextRight: false,
        id: 'exclude_info',
        details: []
      };
    }
  }

  collectionInformation(collectionInfo: any) {
    if (collectionInfo) {
      return {
        title: 'Collection Information',
        titleTextRight: false,
        headingTextRight: false,
        bodyTextRight: false,
        id: 'collection_info',
        details: [
          {
            key: 'Phone Status',
            value: collectionInfo.phoneStatus ? `${collectionInfo.phoneStatus}` : null
          },
          {
            key: 'Status Date',
            value: collectionInfo.statusDate ? this.onlyDateFormat(collectionInfo.statusDate) : null
          },
          {
            key: 'Phone Number',
            value: collectionInfo.phoneNumber ? `${collectionInfo.phoneNumber}` : null
          },
          {
            key: 'Total Tickets Assigned',
            value: collectionInfo.totalTicketsAssigned ? `${collectionInfo.totalTicketsAssigned}` : null
          },
          {
            key: 'Total Amount Due',
            value: collectionInfo.totalAmountDue ? `${collectionInfo.totalAmountDue}` : null
          },
          {
            key: 'Reported Items',
            value: collectionInfo.reportedItems ? `${collectionInfo.reportedItems}` : null
          }
        ]
      }
    } else {
      return {
        title: 'Collection Information',
        titleTextRight: false,
        headingTextRight: false,
        bodyTextRight: false,
        id: 'collection_info',
        details: []
      }
    }
  }

  back() {
    this.router.navigate([`/gp/search/entity-details/entity/${this.plateNoDlNo}`])
  }

  onlyDateFormat(date: any) {
    return formatDate(date, 'MMM d, y', this.locale);
  }

  onlyTime(date: any) {
    return formatDate(date, 'h:mm a', this.locale);
  }

}
