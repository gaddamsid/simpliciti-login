import { get } from "lodash";

export class JuridictionModel {
      jurisdictionsID: Number;
      contractID: Number;
      active: boolean;
      jurisdictionsName: string;
      jurisdictionCode: string;
      jurisdictionsDmvCode: string;
      createUserID: Number;
      updateUserID:Number;
      createDatetime: string;
      updateDatetime:string
      isDeleted: string;
       constructor(data: unknown) {
        this.jurisdictionsID = get(data, "jurisdictionsID");
        this.contractID =get(data, "contractID");
        this.active =get(data, "active");
        this.jurisdictionsName =get(data, "jurisdictionsName");
        this.jurisdictionCode =get(data, "jurisdictionCode");
        this.jurisdictionsDmvCode =get(data, "jurisdictionsDmvCode");
        this.createUserID =get(data, "createUserID");
        this.updateUserID =get(data, "updateUserID");
        this.createDatetime =get(data, "createDatetime");
        this.updateDatetime =get(data, "updateDatetime");
        this.isDeleted = get(data, "isDeleted");
    }

}