import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { LocationModel } from 'src/app/Models/Location.interface';
import { cameraTypeArray } from './LocationMockData/cameraTypeArray';
import { sampleArray } from './LocationMockData/mockLocationArray';
export class LocationListServiceStub{
  public get(url: string, CW5type?: boolean): any {
    let contractID=2;
	let laneLocId=411;
	let speedLocId:any=412;
    // let url:any='Locations/getAllLocations?ContractId='
		let sampleObj = {
			active: 1,
			createDatetime: "2022-06-09T07:41:09.28",
			createUserId: 1,
			isDeleted: "N",
			paymentTranTypesMasterId: 224,
			paymentTypesCode: "kb",
			paymentTypesIndicator: 2,
			paymentTypesName: "testsearc",
			paymentTypesOrderBy: 2,
			updateDatetime: "2022-06-09T07:41:09.28",
			updateUserId: 1
		}

		if (url == 'Locations/getAllLocations?ContractId=2') {
			let userObj = {
        active: true,
        amberTime: 0,
        contractID: 2,
        contractTypeId: 1,
        contractTypesName: "Red Light",
        createDatetime: "2022-06-08T12:59:37.33",
        createUserID: 0,
        isDeleted: "N",
        jurisdictionsName: "3233444ff@aB  --",
        latitude: 0,
        locationsCode: "001",
        locationsDescription: "Desc Norway",
        locationsEnabled: false,
        locationsID: 350,
        locationsName: "Noarway",
        longitude: 0,
        updateDatetime: "2022-06-08T12:59:37.33",
        updateUserID: 0
			}
			return of(sampleArray);
		}
		if (url == 'CameraType/getAllCameraType') {

			return of(cameraTypeArray);
		}
		if (url == 'Jurisdictions/getAllJurisdictions') {
			let contractObj = {
				active: true,
				cbiDashboardLink: null,
				clientsID: 2,
				codeName: null,
				contractName: "Default",
				contractTypeId: 2,
				contractTypeName: null,
				contractsID: 1,
				createDatetime: "0001-01-01T00:00:00",
				createUserID: 0,
				identifierName: "default",
				isDeleted: "N",
				mavroCode: null,
				name: "Suffolk",
				partialPaymentDueValidation: true,
				partialPaymentValidation: true,
				passwordExpirationLength: 90,
				payByWebCode: 0,
				programManagerId: 3,
				programManagerName: "Jack Mack",
				stateProvinceName: "Hawaii",
				stateProvincesID: 1,
				timeZone: null,
				timeZonesID: 1,
				twoFactorEnabled: true,
				updateDatetime: "0001-01-01T00:00:00",
				updateUserID: 0,
			}
			return of([contractObj]);
		}

		if (url == 'ActionCategories/getActionCategories') {
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
	  if (url == 'lanes/getLanebyLocationId?Id=436') {
		  let payloadObj = {
			  active: true,
			  contractID: 2,
			  createDatetime: "2022-07-01T09:19:20.713",
			  createUserID: 1,
			  isDeleted: "N",
			  lanesID: 159,
			  lanesMinimumSpeed: 243,
			  lanesNumber: 99,
			  locationsID: 433,
			  updateDatetime: "2022-07-01T09:19:20.713",
			  updateUserID: 1,
			  warningPeriodStart: "2022-06-16T20:37:00"
		  }
		  return of([{payloadObj}])
	  }
	  if(url =='variableSpeedLimit/getVariableSpeedLimitbyLocationId?Id=421'){
		let speedLimitObj=[
			{
				active: true,
				contractId: 1,
				createDatetime: "2022-07-01T06:37:34.64",
				createUserID: 0,
				daysOfTheWeek: "M",
				endTime: "02:02:00",
				enforcementSpeed: 123,
				isDeleted: "N",
				locationCode: null,
				locationId: 421,
				speedLimit: 99,
				startTime: "14:02:00",
				updateDatetime: "2022-07-01T06:37:34.64",
				updateUserID: 0,
				variableSpeedLimitsID: 76
			}
		]
		return of(speedLimitObj)
	  }
	  if(url=='Locations/getLocationByLocationId?LocationId=447'){
		return of({active: true,
			cameraTypesID: 2,
			contractID: 2,
			createDatetime: "2022-07-15T14:15:19.337",
			createUserID: 0,
			direction: "WB",
			enforcementPeriodStart: "2022-07-25T19:44:00",
			isDeleted: "N",
			jurisdictionsID: 129,
			latitude: 1,
			locationsCode: "435",
			locationsDescription: "Work",
			locationsEnabled: true,
			locationsID: 447,
			locationsName: "Kolkata",
			longitude: 167.9999,
			lprEnable: true,
			redLightLocations: {
			active: true,
			contractId: 2,
			createDatetime: "2022-07-15T14:15:19.383",
			createUserID: 0,
			isDeleted: "N",
			locationCode: "435",
			locationsID: 447,
			redLightLocationsID: 129,
			redSeconds: 3,
			rejectYellowSecondsBelow: true,
			rejectYellowSecondsBelowCategoryId: 2,
			rejectYellowSecondsBelowValue: 2,
			updateDatetime: "2022-07-15T14:15:19.383",
			updateUserID: 0,
			yellowSeconds: 3
		},
			speedLimit: 3,
			speedLocations: null,
			updateDatetime: "2022-07-15T14:15:19.337",
			updateUserID: 0,
			warningPeriodStart: "2022-07-19T19:44:00"});
	  }
		return of([]);
	}
    public post(url: string, data: any, CW5type?: boolean): Observable<any> {
		var responseObj={
			data:
			[
				{
				active: true,
				contractID: 1,
				createDatetime: "2022-06-22T10:35:51.8368796+00:00",
				createUserID: 1,
				isDeleted: "N",
				lanesID: 143,
				lanesMinimumSpeed: 2,
				lanesNumber: 1,
				locationsID: 412,
				updateDatetime: "2022-06-22T10:35:51.8368818+00:00",
				updateUserID: 1
			}
			],
			details:
			[
				{
					fieldName: null,
					code: '1',
					message: "Inserted",
					fieldType: null
				}
			],
			developerMessage: "Inserted",
			status: "Success",
			timeStamp: "2022-06-22T10:35:52.2269642+00:00"
		}
		var obj = {
			laneModel:[{
				active: true,
				contractID: 1,
				createDatetime: "2022-05-19T06:58:26.374Z",
				createUserID: 1,
				isDeleted: "N",
				lanesID: 0,
				lanesMinimumSpeed: 2,
				lanesNumber: 1,
				locationsID: 412,
				updateDatetime: "2022-05-19T06:58:26.374Z",
				updateUserID: 1,
			}]
		  }
		if(url=='Lanes/addLanes'){
			if(data=='obj')
			{
				if(CW5type==true)
				{
					return of({responseObj});
				}
		}

		}
		if(url=='Locations/addLocations'){
			let redLightLocations:any=
			{
				active: true,
				contractId: 2,
				createDatetime: "0001-01-01T00:00:00",
				createUserID: 0,
				isDeleted: "N",
				locationCode: "162",
				locationsID: 409,
				redLightLocationsID: 0,
				redSeconds: 14,
				rejectYellowSecondsBelow: true,
				rejectYellowSecondsBelowCategoryId: 5,
				rejectYellowSecondsBelowValue: 4,
				updateDatetime: "0001-01-01T00:00:00",
				updateUserID: 0,
				yellowSeconds: 27
			};
			let locationsModelPayload:any=
			{
				"locationsModel":{
				"active": true,
				"cameraTypesID": 3,
				"contractID": 2,
				"direction": "WB",
				"enforcementPeriodStart": "2022-06-23T23:35",
				"isDeleted": "N",
				"jurisdictionsID": 133,
				"latitude": "1",
				"locationsCode": "162",
				"locationsDescription": "Travel",
				"locationsEnabled": true,
				"locationsID": 409,
				"locationsName": "Loc 34",
				"longitude": 0,
				"lprEnable": true,
				"redLightLocations": redLightLocations,
				"speedLimit": 0,
				"speedLocations": null,
				"warningPeriodStart": "2022-06-23T20:35"
			}
		}
			return of({data: {
				cameraTypesID: 2,
				contractID: 1,
				createDatetime: "2022-07-15T08:27:32.0134919+00:00",
				createUserID: 0,
				direction: "WB",
				enforcementPeriodStart: "2022-07-17T13:56:00",
				isDeleted: "N",
				jurisdictionsID: 133,
				latitude: 1,
				locationsCode: "906",
				locationsDescription: "Work",
				locationsEnabled: true,
				locationsID: 446,
				locationsName: "Kolkata",
				longitude: 167.9999,
				lprEnable: true,
				redLightLocations: null,
				speedLimit: 3,
				speedLocations: {
				active: true,
				contractId: 1,
				createDatetime: "0001-01-01T00:00:00",
				createUserID: 0,
				enable: true,
				enforcementSpeed: 8,
				isDeleted: "N",
				locationCode: "906",
				locationsId: 446,
				speedLocationsId: 103,
				updateDatetime: "0001-01-01T00:00:00",
				updateUserID: 0
			},
				updateDatetime: "2022-07-15T08:27:32.0134952+00:00",
				updateUserID: 0,
				warningPeriodStart: "2022-07-15T13:56:00",
				details: [{fieldName: null, code: '1', message: "Inserted", fieldType: null}],
				developerMessage: "Inserted",
				status: "Success",
				timeStamp: "2022-07-15T08:27:32.0615733+00:00"
				}});
		}
		if(url=='variableSpeedLimit/addVariableSpeedLimit'){
			let responseObj={
				data:
				[
					{
						active: true,
						contractId: 1,
						createDatetime: "2022-06-22T10:35:51.58703+00:00",
						createUserID: 0,
						daysOfTheWeek: "M",
						endTime: "22:11:00",
						enforcementSpeed: 1,
						isDeleted: "N",
						locationCode: null,
						locationId: 412,
						speedLimit: 1,
						startTime: "08:09:00",
						updateDatetime: "2022-06-22T10:35:51.5870318+00:00",
						updateUserID: 0,
						variableSpeedLimitsID: 70
					}
				],
				details:
				[
					{
						fieldName: null,
						code: '1',
						message: "Inserted",
						fieldType: null
				}
			],
				developerMessage: "Inserted",
				status: "Success",
				timeStamp: "2022-06-22T10:35:51.8589524+00:00"
			}
			let variableSpeedLimitModelObj=[
				{
					active: true,
					contractId: 1,
					daysOfTheWeek: "M",
					endTime: "22:11",
					enforcementSpeed: 1,
					isDeleted: "N",
					locationId: 412,
					speedLimit: 1,
					startTime: "08:09",
					variableSpeedLimitsID: 0
}]
			return of({responseObj});
		}
		return of({});
    }
    public delete(url: string, id: any, CW5type?: boolean): Observable<any> {
      if(url=='Lanes/deleteLanes?LaneId=168'){
        return of({data: 159,
			details: [{fieldName: null, code: "0000", message: "Deleted", fieldType: null}],
			developerMessage: "Deleted",
			status: "Success",
			timeStamp: "2022-07-15T19:49:40.2901247+00:00"});
      }
	  if(url=='variableSpeedLimit/deleteVariableSpeedLimit?VariableSpeedLimitsID=85'){
		return of({data: 82,
			details: [{fieldName: null, code: "0000", message: "Deleted", fieldType: null}],
			developerMessage: "Deleted",
			status: "Success",
			timeStamp: "2022-07-15T19:03:08.3851197+00:00"});
	  }
		return of({});
    }
    public put(url: string, data: any, CW5type?: boolean): Observable<any> {
		let redLightLocations:any=
		{
			active: true,
			contractId: 2,
			createDatetime: "0001-01-01T00:00:00",
			createUserID: 0,
			isDeleted: "N",
			locationCode: "162",
			locationsID: 409,
			redLightLocationsID: 0,
			redSeconds: 14,
			rejectYellowSecondsBelow: true,
			rejectYellowSecondsBelowCategoryId: 5,
			rejectYellowSecondsBelowValue: 4,
			updateDatetime: "0001-01-01T00:00:00",
			updateUserID: 0,
			yellowSeconds: 27
		};
		let locationsModelPayload:any={
			active: true,
			cameraTypesID: 3,
			contractID: 2,
			direction: "WB",
			enforcementPeriodStart: "2022-06-23T23:35",
			isDeleted: "N",
			jurisdictionsID: 133,
			latitude: "1",
			locationsCode: "162",
			locationsDescription: "Travel",
			locationsEnabled: true,
			locationsID: 409,
			locationsName: "Loc 34",
			longitude: 0,
			lprEnable: true,
			redLightLocations: redLightLocations,
			speedLimit: 0,
			speedLocations: null,
			warningPeriodStart: "2022-06-23T20:35"
		}
		let obj={
			active: true,
			cameraTypesID: 3,
			contractID: 2,
			createDatetime: "0001-01-01T00:00:00",
			createUserID: 0,
			direction: "WB",
			enforcementPeriodStart: "2022-06-23T23:35:00",
			isDeleted: "N",
			jurisdictionsID: 133,
			latitude: 1,
			locationsCode: "162",
			locationsDescription: "Travel",
			locationsEnabled: true,
			locationsID: 409,
			locationsName: "Loc 34",
			longitude: 0,
			lprEnable: true,
			redLightLocations: {
				active: true,
				contractId: 2,
				createDatetime: "0001-01-01T00:00:00",
				createUserID: 0,
				isDeleted: "N",
				locationCode: "162",
				locationsID: 409,
				redLightLocationsID: 0,
				redSeconds: 14,
				rejectYellowSecondsBelow: true,
				rejectYellowSecondsBelowCategoryId: 5,
				rejectYellowSecondsBelowValue: 4,
				updateDatetime: "0001-01-01T00:00:00",
				updateUserID: 0,
				yellowSeconds: 27
			},
			details: [{
				code: "0000",
				fieldName: null,
				fieldType: null,
				message: "Updated"
			}],
			developerMessage: "Updated",
			status: "Success",
			timeStamp: "2022-06-21T08:58:03.1334897+00:00"
}
if(url=='Locations/updateLocations')
		{
			return of({data: {
			active: true,
			cameraTypesID: 2,
			contractID: 1,
			createDatetime: "0001-01-01T00:00:00",
			createUserID: 0,
			direction: "EB",
			enforcementPeriodStart: "2022-07-30T19:28:00",
			isDeleted: "N",
			jurisdictionsID: 156,
			latitude: 89.999999,
			locationsCode: "40000008",
			locationsDescription: "Max length added violattion long description fieldMax length added violattion long description fieldMax length added violattion long description field",
			locationsEnabled: true,
			locationsID: 440,
			locationsName: "Che8 Tonkin- 86 Baker St.North- Sydney NSW 2156- Australia- Landmark- Opposite St. Marys High School",
			longitude: 179.999999,
			lprEnable: true,
			redLightLocations: null,
			speedLimit: 123
		},
			speedLocations: {
			active: true,
			contractId: 1,
			createDatetime: "0001-01-01T00:00:00",
			createUserID: 0,
			enable: true,
			enforcementSpeed: 123,
			isDeleted: "N",
			locationCode: "40000008",
			locationsId: 440,
			speedLocationsId: 0,
			updateDatetime: "0001-01-01T00:00:00",
			updateUserID: 0
			},
			updateDatetime: "0001-01-01T00:00:00",
			updateUserID: 0,
			warningPeriodStart: "2022-07-19T18:28:00",
			details: [{fieldName: null, code: "0000", message: "Updated", fieldType: null}],
			developerMessage: "Updated",
			status: "Success",
			timeStamp: "2022-07-18T10:36:57.9246751+00:00"});
		}
if(url=='Locations/updateLocationToggle'){
  let locId={locationId: 444}
  if(CW5type==true)
 { return of({
    data: 444,
    details: [
      { fieldName: null, code: '0000', message: 'Updated', fieldType: null },
    ],
    developerMessage: 'Updated',
    status: 'Success',
    timeStamp:  "2022-07-15T10:44:52.6103035+00:00",
  });}
}
		return of({})
    }
    public reverse(){
      let userObj = {
        active: true,
        amberTime: 0,
        contractID: 2,
        contractTypeId: 1,
        contractTypesName: "Red Light",
        createDatetime: "2022-06-08T12:59:37.33",
        createUserID: 0,
        isDeleted: "N",
        jurisdictionsName: "3233444ff@aB  --",
        latitude: 0,
        locationsCode: "001",
        locationsDescription: "Desc Norway",
        locationsEnabled: false,
        locationsID: 350,
        locationsName: "Noarway",
        longitude: 0,
        updateDatetime: "2022-06-08T12:59:37.33",
        updateUserID: 0
			}
      return of({userObj})
    }

public toPromise(){
	return ({})
}
public subscription(){
	return ([{}])
}
public getDate(){
  return of([{}])
}
public filter(){
  return of([{}])
}
public substring(){
	return of({})
}
}
