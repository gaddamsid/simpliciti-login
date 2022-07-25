import { Observable } from 'rxjs';
import { of } from 'rxjs';
// import { sampleArray } from 'src/app/shared/testCasesHelperClasses/endBehaviour/end-behaviourStub';

export class endbehaviourStub {
  ContractID = 2;
  public get(url: string, CW5type?: boolean): any {
    if (url == 'EndBehaviors/getAllEndBehaviors') {
      let userObj = {
        accessFailedCount: 1,
        concurrencyStamp: null,
        createDatetime: "2022-05-10T12:17:23.527",
        createUserID: 1,
        domainId: 1,
        email: "jack_mack@conduent.com",
        emailConfirmed: true,
        firstName: "Jack",
        id: 3,
        internationalUsers: false,
        isDeleted: "N",
        lastLogin: "2022-04-26T18:28:24.3566667",
        lastName: "Mack",
        lastPasswordChangeDate: null,
        lockoutEnabled: true,
        lockoutEnd: null,
        normalizedEmail: null,
        normalizedUserName: null,
        officerBadgeNumber: null,
        officerRank: null,
        passwordExpired: null,
        passwordHash: null,
        phoneNumber: null,
        phoneNumberConfirmed: true,
        resetPassword: true,
        resetQuestions: true,
        secondaryEmail: null,
        securityStamp: null,
        twoFactorEnabled: true,
        typedSignature: null,
        updateDatetime: "2022-05-10T12:17:23.527",
        updateUserID: 1,
        userEnabled: true,
        userName: "JackM",
      }
      let sampleArray =
      {
        "behaviorID": 9,
        "behaviorsName": "Test B",
        "behaviorTypesName": "ConditionalEmail",
        "active": true
      }
      return of([sampleArray]);
    }
    if (url == 'EndBehaviors/getBehaviorType') {

      let sampleArray =
        [
          {
            "behaviorTypesID": 1,
            "behaviorTypesName": "ConditionalEmail",
            "isImport": false,
            "isSystem": false
          },
          {
            "behaviorTypesID": 2,
            "behaviorTypesName": "XML Export File",
            "isImport": false,
            "isSystem": false
          },
          {
            "behaviorTypesID": 3,
            "behaviorTypesName": "Fleet License Plate Lookup",
            "isImport": false,
            "isSystem": false
          },
          {
            "behaviorTypesID": 4,
            "behaviorTypesName": "Court Date",
            "isImport": false,
            "isSystem": false
          },
          {
            "behaviorTypesID": 5,
            "behaviorTypesName": "Printing",
            "isImport": false,
            "isSystem": false
          },
          {
            "behaviorTypesID": 6,
            "behaviorTypesName": "Financial",
            "isImport": false,
            "isSystem": false
          }
        ]

      return of(sampleArray);
    }
    if (url == 'AspNetRoles/getSystemRoles') {
      let systemRoleObj = {
        concurrencyStamp: null,
        createDatetime: "0001-01-01T00:00:00",
        createUserID: 1,
        displayName: null,
        isDeleted: "N",
        name: "System.Administrator",
        normalizedName: null,
        rolesId: 1,
        updateDatetime: "0001-01-01T00:00:00",
        updateUserID: 1,
      }
      return of([systemRoleObj]);
    }
    if (url == 'Categories/getCategoriesById?ContractID=2') {
      let resObj = {
        active: true,
        categoriesID: 1,
        categoriesName: 'Accept',
        categoryTypesID: 1,
        contractID: 2,
        createDatetime: '2022-06-16T03:03:24.953',
        createUserID: 0,
        isDeleted: 'N',
        phasesID: 2,
        updateDatetime: '2022-06-16T03:03:24.953',
        updateUserID: 0,
      };
      return of([resObj]);
    }
    if (url == 'XMLExportFile/getAllXmlField') {
      let resObj = {
        createDatetime: '2022-06-29T12:02:10.803',
        createUserID: 1,
        fieldTypesID: 1,
        fieldsDescription: 'None',
        fieldsID: 0,
        fieldsName: 'None',
        isCodeSet: true,
        isDeleted: 'N',
        updateDatetime: '2022-06-29T12:02:10.803',
        updateUserID: 1,
      };
      return of([resObj]);
    }
    if (url == 'XMLExportFile/getAllDateFormat') {
      let resObj = {
        createDatetime: "2022-06-29T17:54:34.99",
        createUserID: 1,
        dateTypeFormatsID: 0,
        format: "",
        isDeleted: "N",
        updateDatetime: "2022-06-29T17:54:34.99",
        updateUserID: 1
      };
      return of([resObj]);
    }
    if (url == 'FileTransfer/getFileTransferList') {
      let resObj = {
        active: false,
        fileTransferProtocol: "FTP",
        fileTransferProtocolsID: 2,
        fileTransfersID: 76,
        ip: "10.12.12.45",
        name: "FTP",
        port: 80,
        userName: "Automation"
      };
      return of([resObj]);
    }
    let endBehaviorRes =
    {
      behaviorsID: 634,
      behaviorTypesID: 2,
      behaviorTypesName: "XML Export File",
      contractID: 1,
      isBatchSchedule: true,
      behaviorsName: "Name 23211d",
      workflowStatesID: 1,
      active: false,
      isEntrance: true,
      importBehaviorId: 0,
      hasImportBehavior: true,
      behaviorsOrder: 212,
      isRegistrationHold: true,
      registrationHoldAccept: "",
      registrationHoldReject: "",
      behaviorWorkTypesID: 0,
      courtDateModel: {
        courtDateBehaviorsID: 1
      },
      fleetLookupBehaviorsModel: null,
      conditionalEmailBehaviorModel: {
        subject: 'test',
        rolesID: 1,
        categoryId: 1,
        narrative:1
      },
      printingBehaviorModel: {
        Printing: 'test',
        contractCode: 1,
        vendorCode: 1,
        courtHearingLetterType: '1',
        fileTransfersID: 1,
        comWorkflowStatesID: 1,
        enableDate: null,
        fileExtension: '.jpg',
        templateFileName: 'end.behavior'
      },
      xmlExportFileBehaviorsModel: {
        xmlExportFileBehaviorsID: 88,
        contractID: 2,
        active: true,
        behaviorsID: 634,
        fileTransfersID: 76,
        fileNameFormat: "xsd",
        hashGeneration: false,
        dateTypeFormatsID: 1,
        includeAllEventsIntoFile: false,
        contents: null,
        templateFileName: "sample_CustomersOrders (3).xsd",
        templateFilePath: "https://tsgedetimsmodasa01.blob.core.windows.net/default/logos/sample_CustomersOrders (3).xsd",
        createUserID: 0,
        updateUserID: 0,
        createDatetime: "2022-07-07T07:31:09.55",
        updateDatetime: "2022-07-07T07:31:09.55",
        isDeleted: "N"
      },
      createUserID: 0,
      updateUserID: 0,
      createDatetime: "2022-07-07T07:31:08.917",
      updateDatetime: "2022-07-07T07:31:08.917",
      isDeleted: "N"

    };
    if (url == 'EndBehaviors/getEndBehaviorsByID?BehaviorsId=634') {
      return of(endBehaviorRes);
    }
    if (url == 'EndBehaviors/getEndBehaviorsByID?BehaviorsId=1') {
      endBehaviorRes.behaviorTypesName = "Court Date";
      return of(endBehaviorRes);
    }
    if (url == 'EndBehaviors/getEndBehaviorsByID?BehaviorsId=2') {
      endBehaviorRes.behaviorTypesName = "Fleet License Plate Lookup";
      return of(endBehaviorRes);
    }
    if (url == 'EndBehaviors/getEndBehaviorsByID?BehaviorsId=3') {
      endBehaviorRes.behaviorTypesName = "ConditionalEmail";
      return of(endBehaviorRes);
    }
    if (url == 'EndBehaviors/getEndBehaviorsByID?BehaviorsId=4') {
      endBehaviorRes.behaviorTypesName = "Printing";
      return of(endBehaviorRes);
    }
    if (url == 'EndBehaviors/getEndBehaviorsByID?BehaviorsId=5') {
      endBehaviorRes.behaviorTypesName = "NA";
      return of(endBehaviorRes);
    }
    if (url == 'XMLExportFile/getXmlExportFileBehaviorsByBehaviorsId?BehaviorsId=634') {
      let resObj = {
        active: true,
        behaviorsID: 634,
        contents: null,
        contractID: 2,
        createDatetime: '2022-07-07T07:31:09.55',
        createUserID: 0,
        dateTypeFormatsID: 1,
        fileNameFormat: 'xsd',
        fileTransfersID: 76,
        hashGeneration: false,
        includeAllEventsIntoFile: false,
        isDeleted: 'N',
        templateFileName: 'sample_CustomersOrders (3).xsd',
        templateFilePath:
          'https://tsgedetimsmodasa01.blob.core.windows.net/default/logos/sample_CustomersOrders (3).xsd',
        updateDatetime: '2022-07-07T07:31:09.55',
        updateUserID: 0,
        xmlExportFileBehaviorsID: 88,
      };
      return of(resObj);
    }
    if (url == 'XMLExportFile/getXmlExportFieldListByXmlExportFileBehaviorsID?xmlExportFileBehaviorsID=88') {
      let resObj = {
        "constantFieldModel": [
          {
            "xmlExportFieldsID": 326,
            "contractID": 0,
            "active": false,
            "xmlExportFileBehaviorsID": 88,
            "xmlElementPath": "root/root/Customers",
            "fieldsID": 0,
            "default": null,
            "dateTypeFormatId": 0,
            "dateTypeFormatName": "",
            "fieldName": "None",
            "createUserID": 0,
            "updateUserID": 0,
            "createDatetime": "0001-01-01T00:00:00",
            "updateDatetime": "0001-01-01T00:00:00",
            "isDeleted": "N"
          },
        ],
        "xmlExportFieldModel": [
          {
            "xmlExportFieldsID": 326,
            "contractID": 0,
            "active": false,
            "xmlExportFileBehaviorsID": 88,
            "xmlElementPath": "root/root/Customers",
            "fieldsID": 0,
            "default": null,
            "dateTypeFormatId": 0,
            "dateTypeFormatName": "",
            "fieldName": "None",
            "createUserID": 0,
            "updateUserID": 0,
            "createDatetime": "0001-01-01T00:00:00",
            "updateDatetime": "0001-01-01T00:00:00",
            "isDeleted": "N"
          },
          {
            "xmlExportFieldsID": 327,
            "contractID": 2,
            "active": true,
            "xmlExportFileBehaviorsID": 88,
            "xmlElementPath": "root/root/Orders",
            "fieldsID": 67,
            "default": "12",
            "dateTypeFormatId": 0,
            "dateTypeFormatName": "ddMMyyy",
            "fieldName": "sde",
            "createUserID": 0,
            "updateUserID": 0,
            "createDatetime": "0001-01-01T00:00:00",
            "updateDatetime": "0001-01-01T00:00:00",
            "isDeleted": "N"
          }
        ]
      }
      return of(resObj);
    }
    if (url == 'XMLExportFile/getAllXmlElementByXmlExportFileBehaviorsID?xmlExportFileBehaviorsID=88') {
      let resObj = [
        {
          "xmlExportFieldsID": 326,
          "contractID": 0,
          "active": false,
          "xmlExportFileBehaviorsID": 88,
          "xmlElementPath": "root/root/Customers",
          "fieldsID": 0,
          "default": null,
          "dateTypeFormatId": 0,
          "createUserID": 0,
          "updateUserID": 0,
          "createDatetime": "2022-07-07T07:31:10.25",
          "updateDatetime": "2022-07-07T07:31:10.25",
          "isDeleted": "N"
        },
        {
          "xmlExportFieldsID": 327,
          "contractID": 2,
          "active": true,
          "xmlExportFileBehaviorsID": 88,
          "xmlElementPath": "root/root/Orders",
          "fieldsID": 67,
          "default": "12",
          "dateTypeFormatId": 1,
          "createUserID": 0,
          "updateUserID": 0,
          "createDatetime": "2022-07-07T07:31:10.317",
          "updateDatetime": "2022-07-07T07:31:10.317",
          "isDeleted": "N"
        }
      ]
      return of(resObj);
    }
    if (url == 'AspNetRoles/getContractRoles') {
      let contactRoleObj = {
        concurrencyStamp: 'aafcd312-037e-4c7f-800c-7ed54edc6a9f',
        createDatetime: '2022-05-04T10:15:45.567',
        createUserID: 1,
        displayName: 'NULL',
        isDeleted: 'N',
        name: 'cyprusisd.administrator',
        normalizedName: 'CYPRUSISD.ADMINISTRATOR',
        rolesId: 1,
        updateDatetime: '2022-05-04T10:15:45.567',
        updateUserID: 1,
      };
      return of([contactRoleObj]);
    }
    if (url == 'Categories/getCategoriesById?ContractID=2') {
      let categoriesListObj = {
        active: true,
        categoriesID: 1,
        categoriesName: 'Accept',
        categoryTypesID: 1,
        contractID: 2,
        createDatetime: '2022-06-16T03:03:24.953',
        createUserID: 0,
        isDeleted: 'N',
        phasesID: 2,
        updateDatetime: '2022-06-16T03:03:24.953',
        updateUserID: 0,
      };

      return of([categoriesListObj]);
    }
    if (url == 'WorkflowStates/getAllWorkflowStates') {
      let resObj = {
        "workflowStatesID": 1,
        "contractID": 2,
        "workflowStatesName": "22. Returned check - Bounced",
        "workflowStateTypesID": 4,
        "isStartingState": false,
        "active": true,
        "restoreAmountDue": true,
        "isCourt": false,
        "isAdminVoid": false,
        "showCalendarWidget": false,
        "isReIssue": false,
        "createUserID": 1,
        "updateUserID": 1,
        "createDatetime": "2022-04-12T12:37:20.43",
        "updateDatetime": "2022-04-12T12:37:20.43",
        "isDeleted": "N"
      }
      return of(resObj);
    }
    if (url == 'FileTransfer/getFileTransferList') {
      let resObj = {
        "fileTransfersID": 76,
        "fileTransferProtocolsID": 2,
        "name": "FTP",
        "fileTransferProtocol": "FTP",
        "ip": "10.12.12.45",
        "port": 80,
        "userName": "Automation",
        "active": false
      }

      return of([resObj])
    }
    return of({});
  }
  public post(url: string, data: any, CW5type?: boolean): Observable<any> {
    if (url == 'EndBehaviors/addEndBehaviors') {
      return of({ status: 'Success', details: [{ code: '200' }] });
    }

    return of({ status: 'Success', details: [{ code: '200' }] });
  }
  public put(url: string, data: any, CW5type?: boolean): Observable<any> {
    if (url == 'EndBehaviors/toggleEndBehaviors') {
      let resObj = {
        data: 636,
        details: [
          {
            code: '0000',
            fieldName: null,
            fieldType: null,
          },
        ],
        message: 'Updated',
        developerMessage: 'Updated',
        status: 'Success',
        timeStamp: '2022-07-07T11:05:01.7894123+00:00',
      };
      return of(resObj);
    }
    if (url == 'EndBehaviors/toggleEndBehaviors') {
      let behaviorsID: 641;
      return of({});
    }
    return of({ status: 'Success', details: [{ code: '200' }] });
  }
  public delete(url: string, id: any, CW5type?: boolean): Observable<any> {
		return of({ status: 'Success', details: [{ code: '200' }] });
	}
}
