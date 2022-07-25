export interface ContractSetting{
 // [Required]
 contractID :number;
 citationNumberFormat :string;
 citationSequenceNumber :number;
 eventSequenceNumber: number;
 batchSequenceNumber: number;
 maximumBatchSize :number;
 storageLocation :string;

// [Required]
 active :boolean;
 pointOfContactEmail :string;
 pointOfContactName :string;
 neighborThreshold :number;

// [Required]
 clearPlate :boolean;
 batchEncryptionPassword :string;

// TimeSpan? OvertimeCutoffTime 

// [Required]
 showDLBasic :boolean;

// [Required]
 showDOBGender :boolean;

// [Required]
 showDriverDescriptors :boolean;
 plateExamplesFileName :string;

// [Required]
 enablePlateExample :boolean;

// [Required]
 showCoOwner :boolean;

 warningCitationNumberFormat :string;
 warningCitationSequenceNumber :number;
 tolCitationNumberFormat :string;
 tolCitationSequenceNumber :number;

// [Required]
//  convenienceFee: decimal;

// [Required]
 convenienceFeePerCitation :boolean;

// [Required]
 convenienceFeePerPlate :boolean;

// [Required]
 enableOmniChannel :boolean;

// [Required]
 percentageBasedConvenienceFee :boolean;

// [Required]
//  percentageConvenienceFee: decimal;

// [Required]
//  thresholdAmountConvenienceFee: decimal;
 offlineBatchLimit :number;
 prevYearCitationSequenceNumber :number;

// [Required]
 enableOfflinePrintingContract :boolean;
 defaultCitationSequenceNumber :number;

// [Required]
 enableCustomerServiceTracking :boolean;
 secondCitationNumberFormat :string;
 secondCitationSequenceNumber :number;

// [Required]
 enableDistribution :boolean;

// [Required]
 appTimeout :number;

// [Required]
 maxoutAdvanceSearchResults :number;

// [Required]
 courtEventsCutOffDays :number;

// [Required]
 maxoutPrintingArchiveResults :number;

//[Required]
 partialPayment :boolean;



// [Required]
 enableDistributionDisplay :boolean;
 bootFee :number;
 towFee :number;
 firstSDayFee :number;
 multSDayFee :number;
 bootEscapeType :number;
 renewalRPPFee :number;
 bootTickCnt :number;
 holdTickCnt :number;
 databaseName :number;
 bootTowAmt :number;
 skeletonPayInd : string;
 scheduleInd : string;
 skeletonDispInd : string;
 skeletonSuspInd : string;
 rejectFiller :string;
 bootDelayDays :number;
 ticksPerRec :number;
 stdDevInd : string;
 payGracePD :number;
 suspHearingDays :number;
 loadSW :number;
   
}