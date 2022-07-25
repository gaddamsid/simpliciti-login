import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BadgeNumberComponent } from './badge-number/badge-number.component';
import { ActionsAndCategoriesComponent } from './actions-and-categories/actions-and-categories.component';
import { AddressSourceComponent } from './Address/address-source/address-source.component';
import { CitationTicketTypeComponent } from './CitationTicketType/citation-ticket-type/citation-ticket-type.component';
import { ClientManagementComponent } from './Client/client-management/client-management.component';
import { ClientPaymentTypeComponent } from './ClientPaymentType/client-payment-type/client-payment-type.component';
import { ContractSettingComponent } from './Contract-Setting/contract-setting/contract-setting.component';
import { ContractComponent } from './Contract/contract/contract.component';
import { ContractConfigurationComponent } from './ContractConfiguration/contract-configuration/contract-configuration.component';
import { CustomerInteractionComponent } from './Correspondence/customer-interaction/customer-interaction.component';
import { CourtHolidayComponent } from './court-holiday/court-holiday.component';
import { GeneralprocessingComponent } from './generalprocessing/generalprocessing.component';
import { GlobalHolidayComponent } from './global-holiday/global-holiday/global-holiday.component';
import { IssuingAgencyComponent } from './Issuing-Agency/issuing-agency/issuing-agency.component';
import { PaymentAccountcodeComponent } from './Payment-AccountCode/payment-accountcode/payment-accountcode.component';
import { JurisdictionComponent } from './jurisdiction/jurisdiction.component';
import { PaymentFeeComponent } from './PaymentFee/payment-fee/payment-fee.component';

import { ClientPaymentMethodComponent } from './Payments/client-payment-method/client-payment-method.component';
import { SuspendCodesComponent } from './suspend-codes/suspend-codes.component';
import { ViolationCodeComponent } from './violation-code/violation-code/violation-code.component';
import { WeatherTypeComponent } from './weather-type/weather-type/weather-type.component';
import { AssetMappingComponent } from './asset-mapping/asset-mapping.component';
import { CorrespondenceTypeComponent } from './correspondence-type/correspondence-type.component';
import { DispositionCodeComponent } from './Disposition-code/disposition-code/disposition-code.component';
import { PaylockEmailComponent } from './PayLock Email/paylock-email/paylock-email.component';
import { PaymentAgenciesComponent } from './Payment-Agencies/payment-agencies/payment-agencies.component';
import { FileTransferComponent } from './file-transfer/file-transfer/file-transfer.component';
import { AssetSettingComponent } from './asset-setting/asset-setting.component';
import { PhoneStatusComponent } from './PhoneStatus/phone-status/phone-status.component';
import { IngestionSettingComponent } from './ingestion-setting/ingestion-setting.component';
import { AssignAgencyComponent } from './assign-agency/assign-agency.component';
import { PhoneExtensionComponent } from './phone-extension/phone-extension.component';
import { LocationListComponent } from './location-list/location-list.component';
import { UserManagementComponent } from './user-management/user-management/user-management.component';
import { NonPayableWorkflowstatesComponent } from './NonPayableWorkflowstates/non-payable-workflowstates/non-payable-workflowstates.component';
import { EndBehaviorsComponent } from './EndBehaviors/end-behaviors/end-behaviors.component';
import { CreateCameraComponent } from './CreateCamera/create-camera/create-camera.component';
import { MasterPaymentTypeComponent } from './master-payment-type/master-payment-type.component';
import { AdminSectionsComponent } from './admin-sections/admin-sections.component';
import { CreateListComponent } from './Media File Configurations/create-list/create-list.component';
import { PaymentIvrComponent } from './Payment - IVR/payment-ivr/payment-ivr.component';
import { MasterPaymentMethodComponent } from './master-payment-method/master-payment-method.component';
import { SignatureUploadComponent } from './Signature Upload/signature-upload/signature-upload.component';
import { CrewTableComponent } from './crew-table/crew-table.component';
import { BootAndTowProcessComponent } from './boot-and-tow-process/boot-and-tow-process.component';
import { QueueComponent } from './queue/queue.component';
import { UIDesignComponent } from './ui-design/ui-design.component';
import { AdminQueuesComponent } from './admin-queues/admin-queues.component';
import { GalleryComponent } from '../shared/Components/gallery/gallery.component';
import { GarageComponent } from './garage/garage.component';
import { HearingOfficerComponent } from './hearing-officer/hearing-officer.component';
import { CourtDetailsComponent } from './court/court.component';
import { NoticeTypeComponent } from './notice-type/notice-type.component';



const routes: Routes = [

  { path: 'client-payment-method', component: ClientPaymentMethodComponent },
  { path: 'issuing-agency', component: IssuingAgencyComponent },
  { path: 'contract-setting', component: ContractSettingComponent },
  { path: 'customer-interaction', component: CustomerInteractionComponent },
  { path: 'weather-type', component: WeatherTypeComponent },
  { path: 'global-holiday', component: GlobalHolidayComponent },
  { path: 'citation-ticket', component: CitationTicketTypeComponent },
  { path: 'violation-code', component: ViolationCodeComponent },
  { path: 'contract', component: ContractComponent },
  { path: 'court-holiday', component: CourtHolidayComponent },
  { path: 'contract-configuration', component: ContractConfigurationComponent },
  { path: 'payment-accountcode', component: PaymentAccountcodeComponent },
  { path: 'disposition-code', component: DispositionCodeComponent },
  { path: 'Phone-Status', component: PhoneStatusComponent },
  { path: 'assign-agency', component: AssignAgencyComponent },
  { path: 'address-source', component: AddressSourceComponent },
  { path: 'actions-categories', component: ActionsAndCategoriesComponent },
  { path: 'client-management', component: ClientManagementComponent },
  { path: 'PaymentFee', component: PaymentFeeComponent },
  { path: 'ClientPaymentType', component: ClientPaymentTypeComponent },
  { path: 'Jurisdiction', component: JurisdictionComponent },
  { path: 'suspend-codes', component: SuspendCodesComponent },
  { path: 'badge-number', component: BadgeNumberComponent },
  { path: 'correspondence-type', component: CorrespondenceTypeComponent },
  { path: 'asset-mapping', component: AssetMappingComponent },
  { path: 'disposition-code', component: DispositionCodeComponent },
  { path: 'paylock-email', component: PaylockEmailComponent },
  { path: 'payment-agencies', component: PaymentAgenciesComponent },
  { path: 'file-transfer', component: FileTransferComponent },
  { path: 'asset-setting', component: AssetSettingComponent },
  { path: 'ingestion-setting', component: IngestionSettingComponent },
  { path: 'Phone-Extension', component: PhoneExtensionComponent },
  { path: 'location-list', component: LocationListComponent },
  { path: 'User-Management', component: UserManagementComponent },
  { path: 'workflowstates', component: NonPayableWorkflowstatesComponent },
  { path: 'end-behaviors', component: EndBehaviorsComponent },
  { path: 'create-camera', component: CreateCameraComponent },
  { path: 'create-list', component: CreateListComponent },
  { path: 'payment-ivr', component: PaymentIvrComponent },
  { path: 'master-payment', component: MasterPaymentTypeComponent },
  { path: 'master-payment-method', component: MasterPaymentMethodComponent },
  { path: 'admin-sections', component: AdminSectionsComponent },
  { path: 'signature-upload', component: SignatureUploadComponent },
  { path: 'crew-table', component: CrewTableComponent },
  { path: 'boot-tow-process', component: BootAndTowProcessComponent },
  { path: 'Queue/:id', component: QueueComponent },

  { path: 'Ui-design', component: UIDesignComponent },
  { path: 'Garage', component: GarageComponent },


  { path: 'admin-queues', component: AdminQueuesComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'court', component: CourtDetailsComponent },
  { path: 'notice-type', component: NoticeTypeComponent},
  { path: 'hearing-Officer', component: HearingOfficerComponent },
  { path: 'court', component: CourtDetailsComponent }








]


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AdminRoutingModule { }