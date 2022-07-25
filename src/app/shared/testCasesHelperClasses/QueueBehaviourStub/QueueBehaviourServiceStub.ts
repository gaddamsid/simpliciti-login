import { Observable } from 'rxjs';
import { of } from 'rxjs';
// import { sectionMockList, sectionTypeMockList, cameraTypeMockList } from './AdminSectionMockList';
let data = [{
    "xmlExportFieldModel": {
        "createUserID": 0,
        "updateUserID": 0,
        "createDatetime": "2022-05-18T15:38:44.951Z",
        "updateDatetime": "2022-05-18T15:38:44.951Z",
        "isDeleted": "N",
        "xmlExportFieldsID": 0,
        "contractID": 2,
        "active": true,
        "xmlExportFileBehaviorsID": 1,
        "xmlElementPath": "C:/users/test.xml",
        "fieldsID": 2,
        "default": "defauls",
        "dateTypeFormatId": 1,
        "dateTypeFormatName": ".xlsx",
        "fieldName": "excelName"
      }
}]

export class QueueBehaviourServiceStub {

    public get(url: string, CW5type?: boolean): any {
        if(url == "EndBehaviors/getEndBehaviorsByID?BehaviorsId=1"){
                return of({behaviorTypesName: "Court Date", 
                behaviorTypesID: 1, 
                isRegistrationHold: true,
                courtDateModel: {
                    duration: '2'
                }});
        }
        if(url == "EndBehaviors/getEndBehaviorsByID?BehaviorsId=2"){
            return of({behaviorTypesName: "Fleet License Plate Lookup", 
            behaviorTypesID: 2, 
            isRegistrationHold: true,
            fleetLookupBehaviorsModel: {
                transitionsId: 1
            }});
        }
        if(url == "EndBehaviors/getEndBehaviorsByID?BehaviorsId=3"){
            return of({behaviorTypesName: "ConditionalEmail", 
            behaviorTypesID: 3, 
            isRegistrationHold: true,
            conditionalEmailBehaviorModel: {
                subject: "subj",
                rolesID: 1,
                categoryId: 1,
                narrative: "narrative"
            }});
        }
        if(url == "EndBehaviors/getEndBehaviorsByID?BehaviorsId=4"){
            return of({behaviorTypesName: "XML Export File", 
            behaviorTypesID: 4, 
            isRegistrationHold: true,
            behaviorsName: "XML Export File",
            behaviorsOrder: 4,
            "xmlExportFileBehaviorsModel": {
                "hashGeneration": "hash",
                "fileNameFormat": "xls",
                "dateTypeFormatsID": 1,
                "xmlExportFileBehaviorsID": 1,
                "xmlElementPath": "C:/users/test.xml",
                "fieldsID": 2,
                "default": "defauls",
                "includeAllEventsIntoFile": "includeAll",
                "fileTransfersID": 1,
                "fieldName": "excelName",
                "templateFileName": "template"
              }});
        }
        if(url == "EndBehaviors/getEndBehaviorsByID?BehaviorsId=5"){
            return of({behaviorTypesName: "Printing", 
            behaviorTypesID: 5, 
            isRegistrationHold: true,
            printingBehaviorModel: {
                Printing: "Print",
                "contractCode": 1,
                "vendorCode": 1,
                "isExcludeToBatch": true,
                "courtHearingLetterType": "courtHearing",
                "fileTransfersID": 1,
                "comWorkflowStatesID": 1,
                "enableDate": "2022-05-19T15:17:44.085Z",
                "fileExtension": "fileExtension1",
                "templateFileName": "someVal",
                "dateTypeFormatsID": "2022-05-19T15:17:44.085Z"
            }});
        }
        else{
            return of(data);
        }
    }

    public post(url: string, data: any, CW5type?: boolean): Observable<any> {
        return of({ status: 'Success', details: [{ code: '0000' }] });
    }

    public put(url: string, data: any, CW5type?: boolean): Observable<any> {
        return of({ status: 'Success', details: [{ code: '0000' }] });
    }

}