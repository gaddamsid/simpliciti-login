import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IngestionSettingsMockArray } from './LocationMockData/Ingestion-SettingMockArray';
import { WorkflowStatesMockArray} from './LocationMockData/workFlowStatesMockArray';


export class ingestionSettingServiceStub {
  public ContractID = 2;
  public responseObj = {
    active: true,
    autoSnapMilliSeconds: 0,
    contractID: 2,
    createDatetime: '2022-05-27T08:18:05.743',
    createUserID: 2,
    enableVideoAutoSnap: false,
    ingestionSettingsID: 8,
    isDeleted: 'N',
    rejectBelowSpeed: false,
    rejectBelowSpeedCategoryId: 0,
    rejectBelowSpeedValue: 0,
    rejectBelowSpeedWorkflowId: 0,
    rejectExceedingSpeed: false,
    rejectExceedingSpeedCategoryId: 0,
    rejectExceedingSpeedValue: 0,
    rejectExceedingSpeedWorkflowId: 0,
    rejectGreenMinimumSpeed: false,
    rejectGreenMinimumSpeedCategoryId: 0,
    rejectGreenMinimumSpeedValue: 0,
    rejectGreenMinimumSpeedWorkflowId: 0,
    rejectRedSecondsBelow: false,
    rejectRedSecondsBelowCategoryId: 0,
    rejectRedSecondsBelowValue: 0,
    rejectRedSecondsBelowWorkflowId: 0,
    rejectTestShots: false,
    rejectTestShotsCategoryId: 0,
    rejectTestShotsWorkflowId: 0,
    rejectZeroVelocity: false,
    rejectZeroVelocityCategoryId: 0,
    rejectZeroVelocityCategoryWorkflowId: 0,
    updateDatetime: '2022-05-27T08:18:05.743',
    updateUserID: 0,
  };

  public get(url: string, CW5type?: boolean): any {
    let contractID = 2;
    let laneLocId = 411;
    let speedLocId: any = 412;
    // let url:any='Locations/getAllLocations?ContractId='

    if (url == 'IngestionSettings/getIngestionSettingsById?ContractID=1') {
      return of(this.responseObj);
    }

    if (url == 'IngestionSettings/getIngestionSettingsById?ContractID=2') {
      return of({});
    }

    if (url == 'Categories/getCategoriesById?ContractID=' + contractID) {
      return of(IngestionSettingsMockArray);
    }
    if (url =='WorkflowStates/getWorkflowStatesById?ContractID=' + contractID) {
      return of(WorkflowStatesMockArray);
    }

    return of([]);
  }
  public put(url: string, data: any, CW5type?: boolean):Observable<any> {
    if(url=='IngestionSettings/updateIngestionSettings'){
      return of({});
    }
    return of({});
  }
public post(url:string,data:any,CW5type?:boolean):Observable<any> {
  if(url=="IngestionSettings/addIngestionSettings"){
    return of({});
  }
  return of({});
}
}
