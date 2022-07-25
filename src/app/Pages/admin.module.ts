import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ClientPaymentMethodComponent } from './Payments/client-payment-method/client-payment-method.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ContractSettingComponent } from './Contract-Setting/contract-setting/contract-setting.component';
import { IssuingAgencyComponent } from './Issuing-Agency/issuing-agency/issuing-agency.component';
import { CustomerInteractionComponent } from './Correspondence/customer-interaction/customer-interaction.component';
import { AngularmaterialModule } from '../angular-material/angular-material.module';
import { CitationTicketTypeComponent } from './CitationTicketType/citation-ticket-type/citation-ticket-type.component';
import { WeatherTypeComponent } from './weather-type/weather-type/weather-type.component';
import { I18nModule } from '../i18n/i18n.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';

import { GlobalHolidayComponent } from './global-holiday/global-holiday/global-holiday.component';
import { ContractComponent } from './Contract/contract/contract.component';
import { CourtHolidayComponent } from './court-holiday/court-holiday.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContractConfigurationComponent } from './ContractConfiguration/contract-configuration/contract-configuration.component';
import { ViolationCodeComponent } from './violation-code/violation-code/violation-code.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DecimalDirective } from './Contract/contract/decimal.directive';
import { PaymentAccountcodeComponent } from './Payment-AccountCode/payment-accountcode/payment-accountcode.component';

import { ClientManagementComponent } from './Client/client-management/client-management.component';
import { ActionsAndCategoriesComponent } from './actions-and-categories/actions-and-categories.component';
import { PaymentFeeComponent } from './PaymentFee/payment-fee/payment-fee.component';
import { ClientPaymentTypeComponent } from './ClientPaymentType/client-payment-type/client-payment-type.component';
import { JurisdictionComponent } from './jurisdiction/jurisdiction.component';

import { SuspendCodesComponent } from './suspend-codes/suspend-codes.component';
import { BadgeNumberComponent } from './badge-number/badge-number.component';
import { AssetMappingComponent } from './asset-mapping/asset-mapping.component';
import { DispositionCodeComponent } from './Disposition-code/disposition-code/disposition-code.component';
import { AddressSourceComponent } from './Address/address-source/address-source.component';
import { SpecialCharacterDirective } from '../shared/Directives/AlphaNumericOnly.directive';
import { CorrespondenceTypeComponent } from './correspondence-type/correspondence-type.component';
import { PaylockEmailComponent } from './PayLock Email/paylock-email/paylock-email.component';
import { FileTransferComponent } from './file-transfer/file-transfer/file-transfer.component';
import { PaymentAgenciesComponent } from './Payment-Agencies/payment-agencies/payment-agencies.component';
import { AssetSettingComponent } from './asset-setting/asset-setting.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IngestionSettingComponent } from './ingestion-setting/ingestion-setting.component';
import { NotAllowWhiteSpaceStartDirective } from '../shared/Directives/not-allow-white-space-start.directive';
import { PhoneStatusComponent } from './PhoneStatus/phone-status/phone-status.component';
import { CurrencyPipe } from '@angular/common';
import { CategoriesComponent } from './action-and-categories/categories/categories.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AssignAgencyComponent } from './assign-agency/assign-agency.component';
import { PhoneExtensionComponent } from './phone-extension/phone-extension.component';
import { LocationListComponent } from './location-list/location-list.component';
import { UserManagementComponent } from './user-management/user-management/user-management.component';
import { NonPayableWorkflowstatesComponent } from './NonPayableWorkflowstates/non-payable-workflowstates/non-payable-workflowstates.component';
import { EndBehaviorsComponent } from './EndBehaviors/end-behaviors/end-behaviors.component';
import { CreateCameraComponent } from './CreateCamera/create-camera/create-camera.component';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { AdminSectionsComponent } from './admin-sections/admin-sections.component';
import { CreateListComponent } from './Media File Configurations/create-list/create-list.component';
import { TableComponent } from '../shared/Components/table/table.component';
import { PaymentIvrComponent } from './Payment - IVR/payment-ivr/payment-ivr.component';
import { MasterPaymentTypeComponent } from './master-payment-type/master-payment-type.component';
import { DynamicFormRenderComponent } from '../shared/Components/dynamic-form-render/dynamic-form-render.component';
import { MasterPaymentMethodComponent } from './master-payment-method/master-payment-method.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { FourdecimalDirective } from '../shared/Directives/fourdecimal.directive';
import { SignatureUploadComponent } from './Signature Upload/signature-upload/signature-upload.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CrewTableComponent } from './crew-table/crew-table.component';
import { BootAndTowProcessComponent } from './boot-and-tow-process/boot-and-tow-process.component';
import { QueueComponent} from './queue/queue.component';
import { UIDesignComponent } from './ui-design/ui-design.component';
import { AdminQueuesComponent } from './admin-queues/admin-queues.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { GarageComponent } from './garage/garage.component';
import { QueueBehaviourComponent } from '../shared/Components/queue-behaviour/queue-behaviour.component';
import { QueuesActionCategoryComponent } from '../shared/Components/queues-action-category/queues-action-category.component';
import { TransitionDialogComponent } from '../shared/Components/transition-dialog/transition-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { HearingOfficerComponent } from './hearing-officer/hearing-officer.component';
import { CourtDetailsComponent } from './court/court.component';
import { NoticeTypeComponent } from './notice-type/notice-type.component';



@NgModule({
  declarations: [
    ClientPaymentMethodComponent,
    ContractSettingComponent,
    IssuingAgencyComponent,
    CustomerInteractionComponent,
    CitationTicketTypeComponent,
    WeatherTypeComponent,
    GlobalHolidayComponent,
    ContractComponent,
    CourtHolidayComponent,
    ContractConfigurationComponent,
    ViolationCodeComponent,
    DecimalDirective,
    PaymentAccountcodeComponent,
    AddressSourceComponent,
    ActionsAndCategoriesComponent,
    ClientManagementComponent,
    PaymentFeeComponent,
    ClientPaymentTypeComponent,
    JurisdictionComponent,
    SuspendCodesComponent,
    BadgeNumberComponent,
    AssetMappingComponent,
    SpecialCharacterDirective,
    CorrespondenceTypeComponent,
    DispositionCodeComponent,
    SpecialCharacterDirective,
    PaylockEmailComponent,
    FileTransferComponent,
    PaymentAgenciesComponent,
    AssetSettingComponent,
    NotAllowWhiteSpaceStartDirective,
    PhoneStatusComponent,
    IngestionSettingComponent,
    CategoriesComponent,
    AssignAgencyComponent,
    PhoneExtensionComponent,
    LocationListComponent,
    UserManagementComponent,
    NonPayableWorkflowstatesComponent,
    EndBehaviorsComponent,
    CreateCameraComponent,
    CreateListComponent,
    TableComponent,
    PaymentIvrComponent,
    // DynamicFormRenderComponent,
    MasterPaymentTypeComponent,
    AdminSectionsComponent,
    CreateListComponent,
    FourdecimalDirective,
    MasterPaymentMethodComponent,
    SignatureUploadComponent,
    CrewTableComponent,
    BootAndTowProcessComponent,
    QueueComponent,
    UIDesignComponent,
    AdminQueuesComponent,
   
    GarageComponent,
    QueueBehaviourComponent,
    QueuesActionCategoryComponent,
    TransitionDialogComponent,
    HearingOfficerComponent,
    CourtDetailsComponent,
    NoticeTypeComponent
    

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularmaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    I18nModule,
    I18nModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    DragDropModule,
    DigitOnlyModule,
    NgSelectModule,
    PdfViewerModule,
    MatFormFieldModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    // NgImageSliderModule,
    SharedModule,
    NgImageSliderModule,
    NgxGalleryModule
  ],
  providers: [CurrencyPipe],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule { }

