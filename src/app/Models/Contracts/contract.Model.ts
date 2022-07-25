export interface ContractModel{
    contractsID :number ;
    // [Required]
      clientsID :number;
    // [Required]
      // name : string;
    // [Required]
      stateProvincesID : number;
    // [Required]
      timeZonesID : number;
    // [Required]
      identifier : string;
    // [Required]
      programManagerUserID :number;
    // [Required]
      contractTypeId : number;
    // [Required]
      code : string;
      // twoFactorEnabled :boolean;
      active : boolean ; // [Required]
      // passwordExpirationLength :number;
    // [Required]
      cBIDashboardLink :string;
    // [Required]
      // payByWebCode: number;
      partialPaymentDueValidation :boolean; // [Required]
      // mavroCode :string;
      // partialPaymentValidation :boolean; 
      initials :string;
      shortName :string;
      officeCode :number;
      officeName :string;
      pCRDate :string;
      dataBaseName :string;

      //new
      
  name: string,
  identifierName: string,
  codeName: string,
  payByWebCode: number,
  programManagerId: number,
  stateProvinceName: string,
  timeZone: null,
  cbiDashboardLink: string,
  passwordExpirationLength: number,
  mavroCode: string,
  twoFactorEnabled: boolean,
  partialPaymentValidation: boolean,
  contractTypeName: null,
  contractName: string,
  programManagerName: string,
  clientId: number,
  contractId: number,
  createUserID: number,
  updateUserID: number,
  createDatetime: number,
  updateDatetime: number
}