import { formatDate } from "@angular/common";
import { Inject, LOCALE_ID } from "@angular/core";
import { random } from "lodash";

export class PlateDetailsComponentStub{
    

    @Inject(LOCALE_ID) private locale!: string;
    public date = new Date("2015-03-25T12:00:00Z");
    public longDate = new Date("March")
    public custInfo :any = {
        firstName: 'Test firstName',
        lastName : 'Test lastName',
        addressLine1: 'Test Address1',
        addressLine2: 'Test Address2',
        city: 'Test City',
        state: 'Test state',
        zip: '1001',
        addressSource : null,
        dob : this.date.toISOString(),
        lastUpdatedOn : null,
        effectiveDate : null,
        phoneNumber : 1234567,
        email: 'test@test.com',
        ssn : 'test',
        corporateIndicator : 'test'
    }

    public custInformation : any ={
        title: 'Customer Information',
        titleTextRight: false,
        headingTextRight: false,
        bodyTextRight: false,
        details:[]
      };

      public registryInformation : any = 
        {
            title: 'Registry Information',
            titleTextRight: false,
            headingTextRight: false,
            bodyTextRight: false,
            details: []
          };
      

    public registryInfo : any = {
        effectiveDate : this.date.toISOString(),
    }

    getCustInfoMockData() : string
    {
        return this.custInfo;
    }

    getCustInfoReturnValue() : any {
        return  {
            title: 'Customer Information',
            titleTextRight: false,
            headingTextRight: false,
            bodyTextRight: false,
            details: [
              {
                key: 'First Name',
                value: this.custInfo.firstName ? this.custInfo.firstName : null
              },
              {
                key: 'Last Name',
                value: this.custInfo.lastName ? this.custInfo.lastName : null
              },
              {
                key: 'Address',
                value: `${this.custInfo.addressLine1}, ${this.custInfo.addressLine2}`
              },
              {
                key: 'City,State,Zip',
                value: `${this.custInfo.city}, ${this.custInfo.state}, ${this.custInfo.zip}`
              },
              {
                key: 'Address Source',
                value: this.custInfo.lastName  ? this.custInfo.addressSource : null
              },
              {
                key: 'DOB',
                value: this.custInfo.dob ? this.onlyDateFormat(this.custInfo.dob) : null
              },
              {
                key: 'Last Updated On',
                value: this.onlyDateFormat(this.custInfo.lastUpdatedOn) ? this.onlyDateFormat(this.custInfo.lastUpdatedOn) : null
              },
              {
                key: 'Effective Date',
                value: this.registryInfo.effectiveDate ? this.onlyDateFormat(this.registryInfo.effectiveDate) : null
              },
              {
                key: 'Phone Number',
                value: this.custInfo.phoneNumber ? `${this.custInfo.phoneNumber}` : null
              },
              {
                key: 'Email',
                value: this.custInfo.email ? `${this.custInfo.email}` : null
              },
              {
                key: 'SSN',
                value: this.custInfo.ssn ? `${this.custInfo.ssn}` : null
              },
              {
                key: 'Corporate Indicator',
                value: this.custInfo.corporateIndicator ? `${this.custInfo.corporateIndicator}` : null
              }
            ]
        
          }

          
    }
    onlyDateFormat(date: any) {
        return formatDate(date, 'MMM d, y', this.locale);
      }
      
    
}