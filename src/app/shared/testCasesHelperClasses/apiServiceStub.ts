import { Observable } from 'rxjs';
import { of } from 'rxjs';
export class apiServiceStub {
	static get() {
		throw new Error('Method not implemented.');
	}

	public get(url: string, CW5type?: boolean): any {
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
		if (url == 'Queues/getFirstEventsByQueuesId?QueuesID=1&UserID=1') {
			return of({
				eventCheckOutID: 248300,
				eventsID: 49572
			})
		}
		if (url == 'MediaFileConfiguration/getMediaFileConfigurationList') {
			let mediaFileConfigurationModel = {
				active: true,
				contractID: 0,
				createDatetime: '2022-05-09T07:33:58.321Z',
				createUserID: 0,
				daystoWaitToLoadEventsForLog: 3,
				dciConvertFiles: 'dfdfd',
				dciDownload: 'dsaddf',
				dciEncrypted: 'fsafsfsd',
				eventTypeString: 'sasa',
				extractedVideoImage: false,
				front1: false,
				front2: false,
				frontFolderName: 'ssasa',
				id: 0,
				isDeleted: 'N',
				rear1: true,
				rear2: false,
				rear3: false,
				rear4: false,
				rearFolderName: 'ddssas',
				relativeDayBegin: 2,
				relativeDayEnd: 2,
				requiredLPRPlate: false,
				thumbnailScaleFraction: 0.05,
				updateDatetime: '2022-05-09T07:33:58.321Z',
				updateUserID: 0,
				useExitSpeed: false,
				video: false
			}
			return of([mediaFileConfigurationModel])
		}
		if (url == 'User/getAllUsers') {
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
			return of([userObj]);
		}

		if (url == 'ClientContracts/getAllContracts') {
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
		if (url == 'getCOImage?id=306&type=CO') {
			let systemRoleObj = {
				content: null,
				contentType: "BlockBlob",
				dcoId: 673,
				fileName: "sample.pdf",
				hash: null,
				imageName: null,
				languageDesc: "Spanish",
				languageId: 2,
				size: "3028",
				url: "https://tsgedetimsmodasa01.blob.core.windows.net/sanfran/imaging/2/imgprod/images/checkimages/2022/6/20220613/673_sample.pdf"
			}
			return of([systemRoleObj]);
		}
		if (url == 'getCOImage?id=null&type=CO') {
			return of([]);
		}
		if (url == 'User/getUserAndRolesById?UserId=117') {
			return of({
				"aspNetUserModel": {
					"id": 120,
					"accessFailedCount": 1,
					"concurrencyStamp": null,
					"email": "test45@gmail.com",
					"emailConfirmed": true,
					"lockoutEnabled": true,
					"lockoutEnd": "2022-06-16T12:41:36.896+00:00",
					"normalizedEmail": null,
					"normalizedUserName": null,
					"passwordHash": null,
					"phoneNumber": null,
					"phoneNumberConfirmed": true,
					"securityStamp": null,
					"twoFactorEnabled": true,
					"userName": "testt",
					"resetPassword": true,
					"firstName": "test",
					"lastLogin": "2022-06-16T12:41:36.896",
					"lastName": "test",
					"userEnabled": true,
					"secondaryEmail": null,
					"resetQuestions": true,
					"lastPasswordChangeDate": "2022-06-16T12:41:36.896",
					"passwordExpired": true,
					"domainId": 1,
					"officerBadgeNumber": null,
					"typedSignature": null,
					"officerRank": null,
					"internationalUsers": false,
					"createUserID": 0,
					"updateUserID": 0,
					"createDatetime": "2022-06-16T12:42:09.26",
					"updateDatetime": "2022-06-16T12:42:09.26",
					"isDeleted": "N"
				},
				"aspNetRoles": [
					{
						"aspNetUserRolesID": 173,
						"userId": 120,
						"roleId": 2,
						"createUserID": 0,
						"updateUserID": 0,
						"createDatetime": "2022-06-16T12:42:09.853",
						"updateDatetime": "2022-06-16T12:42:09.853",
						"isDeleted": "N"
					}
				],
				"userContracts": [
					{
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
				]
			}
			);
		}

		if (url == 'issuingAgency') {
			return of([
				{
					active: 1,
					agencyCode: 11,
					agencyDistrict: 21,
					agencyLongName: "Hyderabad",
					agencyMoveTktsPerBk: 23,
					agencyParkTktsPerBk: 22,
					agencyShortName: "India",
					agencyStreetEnforceInd: "A",
					agencyViolTableGroup: "B",
					contractId: 2,
					createDateTime: "2022-05-11T10:24:17.823",
					createUserId: 1,
					isDeleted: "N",
					issuingAgencyId: 2,
					updateDateTime: "2022-05-11T10:24:17.823",
					updateUserId: 1
				}
			])
		}

		if (url == 'badgeNumber') {
			return of([
				{
					active: 1,
					badgeAgency: 10,
					badgeDivision: 1,
					badgeNumber: "009170",
					badgeNumberId: 377,
					badgeOfficerName: "D.K.",
					contractId: 2,
					createDatetime: "2022-05-20T12:06:20.54",
					createUserId: 1,
					isDeleted: "N",
					isUploaded: "Y",
					updateDatetime: "2022-05-20T12:06:20.54",
					updateUserId: 1
				}
			])
		}

		if (url == 'WorkflowStates/getAllWorkflowStates') {
			return of([
				{
					active: true,
					contractID: 2,
					createDatetime: "2022-04-12T12:37:20.43",
					createUserID: 1,
					isAdminVoid: false,
					isCourt: false,
					isDeleted: "N",
					isReIssue: false,
					isStartingState: false,
					restoreAmountDue: true,
					showCalendarWidget: false,
					updateDatetime: "2022-04-12T12:37:20.43",
					updateUserID: 1,
					workflowStateTypesID: 4,
					workflowStatesID: 1,
					workflowStatesName: "22. Returned check - Bounced"
				}
			])
		}

		if (url == 'bootAndTowGarage') {
			return of([
				{
					abbreviation: null,
					bootTowGarageId: 3,
					contractId: 2,
					createDatetime: "2022-07-01T08:15:46.567",
					createUserId: 1,
					garageAddress1: null,
					garageAddress2: null,
					garageCity: null,
					garageCode: "AB13",
					garageEmail: null,
					garageName: "Eknathshinde",
					garagePhoneNumber: null,
					garageState: null,
					garageStateId: null,
					garageZip: null,
					isDeleted: "N",
					updateDatetime: "2022-07-01T08:15:46.567",
					updateUserId: 1
				}
			])
		}

		if (url == 'getAllStateNamesAndId') {
			return of([
				{
					abbreviation: "HI",
					isDeleted: "N",
					stateProvincesId: 1
				}
			])
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
		if (url == 'language') {
			return of([
				{
					contractId: 2,
					createDatetime: "2022-05-10T13:47:51.777",
					createUserId: 1,
					languageId: 1,
					languagesDescription: "English",
					updateDateTime: "2022-05-10T13:47:51.777",
					updateUserId: 1
				}
			]);
		}

		if (url == 'Cameras/getAllCameras') {
			return of(
				[
					{
						active: true,
						cameraEnabled: true,
						cameraID: 69,
						cameraTypesName: "Mesa",
						firmwareVersion: "V1.0.0.0",
						latitude: 0,
						locationsName: "Location 01",
						longitude: 0,
						rententionDays: 5
					},
					{
						active: true,
						cameraEnabled: true,
						cameraID: 90,
						cameraTypesName: "Drive Safe",
						firmwareVersion: "V1.0.0.0",
						latitude: 43.45,
						locationsName: "LocTwo",
						longitude: 100.56,
						rententionDays: 5
					}
				]
			)
		}

		if (url == 'Cameras/getCamerasById?Id=69') {
			return of(
				{
					active: true,
					approach: "Approach",
					asset: "Front360",
					cameraDescription: "Description",
					cameraEnabled: true,
					cameraID: 69,
					cameraTypesID: 2,
					contractID: 0,
					createDatetime: "2022-06-09T10:31:47.887",
					createUserID: 0,
					encryprtionFile: "file",
					fileTransfersID: 77,
					firmwareVersionsID: 1,
					inAlarm: true,
					isDeleted: "N",
					isEncrypted: true,
					isEnforcement: true,
					lastUpdateTime: "2022-05-10T15:49:19.687",
					latitude: 43.45,
					locationsID: 354,
					longitude: 100.56,
					retentionDays: 5,
					updateDatetime: "2022-06-09T10:31:47.887",
					updateUserID: 0
				}
			)
		}

		if (url == 'CameraType/getAllCameraType') {
			return of(
				[
					{
						active: false,
						cameraTypesID: 0,
						cameraTypesName: "None",
						contractId: 1,
						createDatetime: "2022-03-23T18:23:11.33",
						createUserID: 0,
						isDeleted: "N",
						updateDatetime: "2022-03-23T18:23:11.33",
						updateUserID: 0
					},
					{
						active: false,
						cameraTypesID: 1,
						cameraTypesName: "Vitronic",
						contractId: 1,
						createDatetime: "2022-03-23T18:23:26.387",
						createUserID: 0,
						isDeleted: "N",
						updateDatetime: "2022-03-23T18:23:26.387",
						updateUserID: 0
					}
				]
			)
		}

		if (url == 'Locations/getAllLocations?ContractId=2') {
			return of(
				[
					{
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
				]
			)
		}

		if (url == 'FirmwareVersions/getAllFirmwareVersion') {
			return of(
				[
					{
						cameraTypesID: 1,
						firmwareVersionsID: 1,
						firmwareVersionsName: "V1.0.0.0"
					}
				]
			)
		}

		if (url == 'FileTransfer/getFileTransferList') {
			return of(
				[
					{
						active: false,
						fileTransferProtocol: "FTP",
						fileTransferProtocolsID: 2,
						fileTransfersID: 76,
						ip: "10.12.12.45",
						name: "FTP",
						port: 80,
						userName: "Automation"
					},
					{
						active: false,
						fileTransferProtocol: "SFTP",
						fileTransferProtocolsID: 3,
						fileTransfersID: 77,
						ip: "10.12.1.32",
						name: "RFP",
						port: 80,
						userName: "SFTP"
					}
				]
			)
		}

		if (url == 'bootAndTowCrew') {
			return of(
				[
					{
						bootTowCrewId: 1,
						contractId: 2,
						createDatetime: "2022-06-10T12:40:56.937",
						createUserId: 1,
						crewAuthLevel: 1,
						crewChief: "CHi name",
						crewCode: "0001",
						crewType: 1,
						isDeleted: "N",
						updateDatetime: "2022-06-10T12:40:56.937",
						updateUserId: 1
					},
					{
						bootTowCrewId: 2,
						contractId: 2,
						createDatetime: "2022-06-10T12:41:11.177",
						createUserId: 1,
						crewAuthLevel: 2,
						crewChief: "new name",
						crewCode: "0002",
						crewType: 2,
						isDeleted: "N",
						updateDatetime: "2022-06-10T12:41:11.177",
						updateUserId: 1
					}
				]
			)
		}

		if (url == 'assignAgency') {
			return of([
				{
					assignAgencyCode: "001",
					assignAgencyId: 96,
					assignAgencyName: "USPS Dept",
					assignAgencyNo: 1,
					contractId: 2,
					createDateTime: "2022-05-20T11:47:14.723",
					createUserId: 1,
					isDeleted: "N",
					updateUserId: 1,
					updatedDateTime: "2022-05-20T11:47:25.71"
				}
			])
		}

		if (url == 'getMaxAssignAgencyNumber') {
			return of(1);
		}

		if (url == 'Queues/getAllQueues?ContractID=2') {
			return of([
				{
					active: false,
					ageThreshold: 5,
					carryOverPreviousCategory: false,
					contractID: 2,
					coreImageDeleteEnabled: false,
					coreImageEditEnabled: false,
					coreImageRevertEnabled: false,
					countThreshold: 100,
					createDatetime: "2022-05-31T17:40:39.72",
					createUserID: 1,
					dmvHistoryEnabled: true,
					dmvRequestThreshold: 0,
					dmvReturnEnabled: true,
					doubleBlindEnabled: false,
					drcEnabled: false,
					editRegisteredOwnerInformationEnabled: true,
					editVehicleInformationEnabled: true,
					enableCourtForPostIssuanceQueue: false,
					enableLocalOfflinePrint: false,
					enableRollbackNoticesQueue: false,
					iCertifyDescription: null,
					identifier: "clientresearch",
					imageSelectionEnabled: false,
					isDeleted: "N",
					isICertifyEnabled: false,
					isVrLookup: false,
					kvlEnabled: false,
					licensePlateEditEnabled: false,
					miskeyedPlateEnabled: false,
					neighborListingEnabled: false,
					plateExamplesEnabled: false,
					previousDecisionEnabled: true,
					queueOrder: 9,
					queueTypesID: 3,
					queueTypesName: "Event",
					queuesID: 1,
					queuesName: "Client Research",
					registeredOwnerInformationEnabled: true,
					showSelectedImagesEnabled: false,
					skipEnabled: true,
					statusEntranceThreshold: 10,
					updateDatetime: "2022-05-31T17:40:39.72",
					updateUserID: 1,
					vehicleInformationEnabled: true,
					videoFrameCaptureEnabled: false,
					workflowStatesID: 5
				}
			])
		}

		if (url == 'Transitions/getAllTransitionTypes') {
			return of([
				{
					transitionTypesID: 1,
					transitionTypesName: "Conditional"
				}
			])
		}

		if (url == 'WorkflowStates/getWorkflowStatesById?ContractID=2') {
			return of([
				{
					active: true,
					contractID: 2,
					createDatetime: "2022-04-12T12:37:20.43",
					createUserID: 1,
					isAdminVoid: false,
					isCourt: false,
					isDeleted: "N",
					isReIssue: false,
					isStartingState: false,
					restoreAmountDue: true,
					showCalendarWidget: false,
					updateDatetime: "2022-04-12T12:37:20.43",
					updateUserID: 1,
					workflowStateTypesID: 4,
					workflowStatesID: 1,
					workflowStatesName: "22. Returned check - Bounced"
				}
			])
		}
		if (url == 'Transitions/getAllRelativeDateTypes') {
			return of([
				{
					relativeDateTypesID: 1,
					relativeDateTypesName: "Event Date"
				}
			])
		}
		if (url == 'Transitions/getAllRelativeDateDayTypes') {
			return of([
				{
					relativeDateDayTypesID: 6,
					relativeDateDayTypesName: "Business Days"
				}
			])
		}
		if (url == 'Queues/getQueueTypes') {
			return of([
				{
					queueTypesID: 1,
					queueTypesName: "Deployment"
				}
			])
		}
		if (url == 'Queues/getQueuesById?QueuesId=1') {
			return of(
				{
					active: true,
					ageThreshold: 11,
					carryOverPreviousCategory: true,
					contractID: 2,
					coreImageDeleteEnabled: true,
					coreImageEditEnabled: true,
					coreImageRevertEnabled: true,
					countThreshold: 111,
					createDatetime: "2022-07-06T07:19:14.287",
					createUserID: 0,
					dmvHistoryEnabled: true,
					dmvRequestThreshold: 0,
					dmvReturnEnabled: true,
					doubleBlindEnabled: true,
					drcEnabled: true,
					editRegisteredOwnerInformationEnabled: true,
					editVehicleInformationEnabled: true,
					enableCourtForPostIssuanceQueue: false,
					enableLocalOfflinePrint: false,
					enableRollbackNoticesQueue: false,
					iCertifyDescription: "",
					identifier: "",
					imageSelectionEnabled: false,
					isDeleted: "N",
					isICertifyEnabled: false,
					isVrLookup: true,
					kvlEnabled: false,
					licensePlateEditEnabled: true,
					miskeyedPlateEnabled: false,
					neighborListingEnabled: true,
					plateExamplesEnabled: true,
					previousDecisionEnabled: true,
					queueOrder: 0,
					queueTypesID: 1,
					queueTypesName: null,
					queuesID: 352,
					queuesName: "VR Lookup 3",
					registeredOwnerInformationEnabled: true,
					showSelectedImagesEnabled: false,
					skipEnabled: true,
					statusEntranceThreshold: 100,
					updateDatetime: "2022-07-06T07:19:14.287",
					updateUserID: 0,
					vehicleInformationEnabled: true,
					videoFrameCaptureEnabled: true,
					workflowStatesID: 324
				}
			)
		}
		if (url == 'Queues/GetAllBehaviorsByQueue?QueuesId=335') {
			return of([])
		}
		if (url == 'Queues/GetAllActionCategoriesByQueue?QueuesId=335') {
			return of([
				{
					actionCategoriesId: 497,
					actionID: 15,
					actionName: "Accept",
					active: true,
					categoriesID: 25,
					categoryName: "DMV No Hit - In State",
					categoryPhaseType: "Closed",
					categoryType: "Uncontrollable",
					categoryTypeID: 2,
					contractId: 2,
					phasesID: 3,
					queueName: "VR Look2",
					queuesId: 335
				}
			])
		}
		if (url == 'Queues/GetAllTransitionsByQueue?QueuesId=352') {
			return of([
				{
					active: true,
					destinationWorkflowStatesID: 3,
					destinationWorkflowStatesName: "Asset Research",
					transitionTypeID: 1,
					transitionTypeName: "Conditional",
					transitionsID: 157,
					transitionsName: "Conditional -Asset Research"
				}
			])
		}

		if (url == 'ActionCategories/getActionCategories') {
			return of([
				{
					actionID: 0,
					active: false,
					categoriesID: 0,
					categoriesQueueNames: [],
					categoriesQueuesIds: [],
					categoryName: "Sagar test2 updated 12",
					categoryPhaseType: "Issued",
					categoryType: "Controllable",
					categoryTypeID: 1,
					contractId: 2,
					phasesID: 1
				}
			])
		}

		if (url == 'AspNetRoles/getContractRoles') {
			return of([
				{
					actionID: 0,
					active: false,
					categoriesID: 0,
					categoriesQueueNames: [],
					categoriesQueuesIds: [],
					categoryName: "Sagar test2 updated 12",
					categoryPhaseType: "Issued",
					categoryType: "Controllable",
					categoryTypeID: 1,
					contractId: 2,
					phasesID: 1,
					rolesId: 1
				}
			])
		}

		if (url == 'Actions/getAllActions?ContractID=2') {
			return of([
				{
					actionQueueNames: ["Client RV3", "Client RV3"],
					actionsID: 1,
					actionsName: "update action name 2345",
					active: false,
					contractID: 2,
					createDatetime: "2022-04-27T13:32:38.477",
					createUserID: 0,
					isDeleted: "N",
					updateDatetime: "2022-04-27T13:32:38.477",
					updateUserID: 0
				}
			])
		}
		// Start - Added By Biraba For Transition Dialog Component Test
		if (url == 'Transitions/getAllJoinOperatorsQuery') {
			return of({
				"operators": [
					{
						"operatorsID": 13,
						"operatorsDescription": null,
						"operatorsName": "AND",
						"operatorTypesID": 3
					},
					{
						"operatorsID": 14,
						"operatorsDescription": null,
						"operatorsName": "OR",
						"operatorTypesID": 3
					},
					{
						"operatorsID": 21,
						"operatorsDescription": null,
						"operatorsName": "None",
						"operatorTypesID": 3
					}
				]
			});
		}

		if (url == 'WorkflowStates/getWorkflowStatesById?ContractID=2') {
			return of([
				{
					"workflowStatesID": 1, "contractID": 2, "workflowStatesName": "22. Returned check - Bounced", "workflowStateTypesID": 4, "isStartingState": false, "active": true, "restoreAmountDue": true, "isCourt": false, "isAdminVoid": false, "showCalendarWidget": false, "isReIssue": false, "createUserID": 1, "updateUserID": 1, "createDatetime": "2022-04-12T12:37:20.43", "updateDatetime": "2022-04-12T12:37:20.43", "isDeleted": "N"
				},
				{
					"workflowStatesID": 2, "contractID": 2, "workflowStatesName": "Admin Hold - 1 Day", "workflowStateTypesID": 4, "isStartingState": false, "active": true, "restoreAmountDue": false, "isCourt": false, "isAdminVoid": false, "showCalendarWidget": false, "isReIssue": false, "createUserID": 1, "updateUserID": 1, "createDatetime": "2022-04-12T12:37:20.43", "updateDatetime": "2022-04-12T12:37:20.43", "isDeleted": "N"
				},
				{
					"workflowStatesID": 3, "contractID": 2, "workflowStatesName": "Asset Research", "workflowStateTypesID": 2, "isStartingState": false, "active": true, "restoreAmountDue": false, "isCourt": false, "isAdminVoid": false, "showCalendarWidget": false, "isReIssue": false, "createUserID": 1, "updateUserID": 1, "createDatetime": "2022-04-12T12:37:20.43", "updateDatetime": "2022-04-12T12:37:20.43", "isDeleted": "N"
				}
			]);
		}

		if (url == 'XMLExportFile/getAllXmlField') {
			return of([
				{
					"fieldsID": 0,
					"fieldsDescription": "Action",
					"fieldTypesID": 1,
					"fieldsName": "Action",
					"isCodeSet": true,
					"createUserID": 1,
					"updateUserID": 1,
					"createDatetime": "2022-06-29T12:02:10.803",
					"updateDatetime": "2022-06-29T12:02:10.803",
					"isDeleted": "N"
				},
				{
					"fieldsID": 66,
					"fieldsDescription": "wqe",
					"fieldTypesID": 1,
					"fieldsName": "qw",
					"isCodeSet": true,
					"createUserID": 0,
					"updateUserID": 0,
					"createDatetime": "2022-06-16T13:23:02.373",
					"updateDatetime": "2022-06-16T13:23:02.373",
					"isDeleted": "N"
				},
				{
					"fieldsID": 67,
					"fieldsDescription": "we",
					"fieldTypesID": 1,
					"fieldsName": "sde",
					"isCodeSet": true,
					"createUserID": 0,
					"updateUserID": 0,
					"createDatetime": "2022-06-16T13:23:39.113",
					"updateDatetime": "2022-06-16T13:23:39.113",
					"isDeleted": "N"
				}
			]);
		}

		if (url == 'Courts/getAllCourts') {
			return of([
				{
					active: true,
					code: "Ab01",
					courtsID: 1,
					jurisdictions: "ddwed",
					leadDays: 1,
					name: "test name",
					room: 1,
					streetLine1: "addresses1 for test 99",
					streetLine2: "addresses2 for test99"
				},
				{
					active: true,
					code: "q100",
					courtsID: 2,
					jurisdictions: "3233444ff@aB  --",
					leadDays: 9,
					name: "District Court",
					room: 9,
					streetLine1: "addresses demo 1 for test",
					streetLine2: "addresses demo 2 for test"
				},
				{
					active: true,
					code: "Pc01",
					courtsID: 3,
					jurisdictions: "fggg",
					leadDays: 9,
					name: "Court Name",
					room: 3,
					streetLine1: "Fort Minor Road",
					streetLine2: "Fort Minor Road"
				}
			]);
		}

		if (url == 'Courts/getCourtsById?courtsID=8') {
			return of({
				"courtsID": 8,
				"contractID": 0,
				"active": true,
				"name": "new york district ",
				"code": "234d",
				"streetLine1": "",
				"streetLine2": null,
				"city": "",
				"stateProvincesID": 2,
				"zipCode": "",
				"jurisdictionsID": 128,
				"clerkName": null,
				"disabilityAccommodationText": null,
				"phone": "09030132220",
				"leadDays": 4,
				"room": 3,
				"county": null,
				"createUserID": 0,
				"updateUserID": 0,
				"createDatetime": "2022-07-01T06:34:57.62",
				"updateDatetime": "2022-07-01T06:34:57.62",
				"isDeleted": "N"
			})
		}

		if (url == 'Transitions/getTransitionsById?transitionsId=158') {
			return of(
				{
					active: true,
					automaticTransitionsModel: null,
					clauses: [{
						active: true,
						clauseOrder: 0,
						clauseValue: "",
						clausesID: 184,
						contractID: 2,
						createDatetime: "2022-07-06T11:06:49.463",
						createUserID: 0,
						fieldsID: 0,
						isDeleted: "N",
						joinOperatorsID: 21,
						operatorsID: 18,
						transitionsID: 158,
						updateDatetime: "2022-07-06T11:06:49.463",
						updateUserID: 0
					}],
					contractID: 2,
					createDatetime: "2022-07-06T11:06:49.407",
					createUserID: 0,
					destinationWorkflowStatesID: 20,
					enableQualityControl: false,
					isDeleted: "N",
					qualityControlModel: null,
					sourceWorkflowStatesID: 324,
					transitionTypeID: 1,
					transitionTypeName: null,
					transitionsID: 158,
					transitionsName: "Conditional -END",
					updateDatetime: "2022-07-06T11:06:49.407",
					updateUserID: 0
				}
			)
		}
		if (url == 'NonPayableWorkflowStates/getNonPayableWorkflowStatesByContractId?ContractId=2') {
			return of([
				{
					active: true,
					contractID: 2,
					errorCode: '0000009',
					isDeleted: 'N',
					nonPayable: true,
					nonPayableWorkflowStatesID: 1,
					violationDateCheck: false,
					workFlowStateName: 'Admin Hold - 1 Day',
					workflowStateID: 2,
				},
			]);
		}
		if (url == 'WorkflowStates/getWorkflowStatesById?ContractID=2') {
			return of([
				{
					active: true,
					contractID: 2,
					createDatetime: "2022-04-12T12:37:20.43",
					createUserID: 1,
					isAdminVoid: false,
					isCourt: false,
					isDeleted: "N",
					isReIssue: false,
					isStartingState: false,
					restoreAmountDue: true,
					showCalendarWidget: false,
					updateDatetime: "2022-04-12T12:37:20.43",
					updateUserID: 1,
					workflowStateTypesID: 4,
					workflowStatesID: 1,
					workflowStatesName: "22. Returned check - Bounced"
				}
			])
		}

		if (url == 'Categories/getCategoriesById/?ContractID=2') {
			return of([
				{
					active: true,
					code: "Pc01",
					courtsID: 3,
					categoriesName: "fggg",
					leadDays: 9,
					name: "Court Name",
					room: 3,
					streetLine1: "Fort Minor Road",
					streetLine2: "Fort Minor Road"
				}
			])
		}

		if (url == 'StateProvinces/getAllStateProvinces') {
			return of([
				{
					active: true,
					code: "Pc01",
					courtsID: 3,
					stateProvincesName: "fggg",
					leadDays: 9,
					name: "Court Name",
					room: 3,
					streetLine1: "Fort Minor Road",
					streetLine2: "Fort Minor Road"
				}
			])
		}

		if (url == 'Locations/getAllLocationsMaster') {
			return of([
				{
					active: true,
					code: "Pc01",
					courtsID: 3,
					locationsName: "fggg",
					leadDays: 9,
					name: "Court Name",
					room: 3,
					streetLine1: "Fort Minor Road",
					streetLine2: "Fort Minor Road"
				}
			])
		}

		if (url == 'Jurisdictions/getAllJurisdictions') {
			return of([
				{
					active: true,
					code: "Pc01",
					courtsID: 3,
					jurisdictionsName: "fggg",
					leadDays: 9,
					name: "Court Name",
					room: 3,
					streetLine1: "Fort Minor Road",
					streetLine2: "Fort Minor Road"
				}
			])
		}

		if (url == 'Queues/getAllQueues/?ContractID=2') {
			return of([
				{
					active: true,
					code: "Pc01",
					courtsID: 3,
					queuesName: "fggg",
					leadDays: 9,
					name: "Court Name",
					room: 3,
					streetLine1: "Fort Minor Road",
					streetLine2: "Fort Minor Road"
				}
			])
		}

		if (url == 'ivr' && CW5type === undefined) {
			return of([
				{
					cardsAmex: "Y",
					cardsDiscover: "Y",
					cardsVisaMasterCard: "N",
					clientNumber: "c1",
					contractId: 2,
					createDateTime: "2022-05-11T05:22:26.11",
					createUserId: 1,
					creditClCheckDigit: "Y",
					creditClCompressFlag: "Y",
					creditClNoticeFlag: "Y",
					creditClNumber: "A1",
					creditClPhoneFee: 4444.33,
					creditClPhoneSurcharge: 444.2355,
					creditClWebFee: 444.55,
					creditClWebSurcharge: 444.1234,
					inquiryCollate: "Y",
					inquiryFee: "Y",
					inquiryFleet: "Y",
					inquiryIPP: "Y",
					inquiryLicense: "Y",
					inquiryNotice: "Y",
					inquiryPlate: "Y",
					inquiryRedlight: "Y",
					inquiryTicket: "Y",
					ivrId: 1,
					paymentAll: "Y",
					paymentAny: "Y",
					paymentItem: "Y",
					paymentList: "Y",
					paymentListAny: "Y",
					paymentListSpecial: "Y",
					paymentRestore: "Y",
					updateDateTime: "2022-07-12T15:38:19.607",
					updateUserId: 1
				}
			])
		}
		else {
			return of([]);
		}
		// End - By Biraba

		return of([sampleObj]);
	}
	public paymentTranTypesMaster(): any {
		return of({});
	}
	public reverse() {
		return of([{}])
	}
	public getViolation(url: string, violationType?: boolean): Observable<any> {
		return of([
			{
				citation: 'Y',
				citationHeight: 100,
				contractId: 2,
				functional: '1',
				image: 'Y',
				imageHeight: 100,
				layoutType: '1',
				nameAddress: 'Y',
				nameAddressHeight: 100,
				payementHeight: 100,
				payments: 'Y',
				processing: 'Y',
				processingHeight: 100,
				userId: 1,
				violation: 'Y',
				violationHeight: 100,
			}
		]);
	}

	public post(url: string, data: any, CW5type?: boolean): Observable<any> {
		if (url == 'Queues/addQueues') {
			return of({
				status: 'Success', data: {
					workflowStatesID: 5,
					queuesID: 1
				}, details: [{ code: '200' }]
			});
		}

		if (url == 'ActionCategories/addActionCategoryForQueues') {
			return of({
				status: 'Success', data: {
					actionCategoriesID: 552,
					actionsID: 1,
					active: true,
					categoriesID: 0,
					contractID: 2,
					createDatetime: "2022-07-07T05:27:00.7461441+00:00",
					createUserID: 0,
					isDeleted: "N",
					queuesID: 348,
					updateDatetime: "2022-07-07T05:27:00.7461463+00:00",
					updateUserID: 0
				}, details: [{
					code: "0000",
					fieldName: null,
					fieldType: null,
					message: "Inserted"
				}]
			});
		}
		if (url == 'MediaFileConfiguration/addMediaFileConfiguration') {
			let mediaFileConfigurationModel = {
				active: true,
				contractID: 0,
				createDatetime: '2022-05-09T07:33:58.321Z',
				createUserID: 0,
				daystoWaitToLoadEventsForLog: 2,
				dciConvertFiles: 'F:\\Bhat\\Kapoor',
				dciDownload: 'K:\\Warne\\Public"',
				dciEncrypted: 'H:\\\\Bhat\\\\Kapoor',
				eventTypeString: 'Lumgni',
				extractedVideoImage: true,
				front1: true,
				front2: true,
				frontFolderName: 'BoldFolder',
				id: 0,
				isDeleted: 'N',
				rear1: true,
				rear2: true,
				rear3: true,
				rear4: true,
				rearFolderName: 'OldFolder',
				relativeDayBegin: 13,
				relativeDayEnd: 9,
				requiredLPRPlate: true,
				thumbnailScaleFraction: 0.05,
				updateDatetime: '2022-05-09T07:33:58.321Z',
				updateUserID: 0,
				useExitSpeed: true,
				video: true,
			};
			return of({
				data: { mediaFileConfigurationModel },
				details: [
					{
						fieldName: "", code: "0000", message: "Save Success"
					}
				],
				developerMessage: "Response Returned Successfully.",
				status: "Success",
				timeStamp: "2022-07-11T14:39:35.251"
			})
		}
		if (url == 'NonPayableWorkflowStates/addNonPayableWorkflowStates') {
			return of({
				data: {

					active: true,
					contractID: 3,
					createDatetime: "2022-04-12T12:37:20.43",
					createUserID: 2,
					isAdminVoid: false,
					isCourt: false,
					isDeleted: "N",
					isReIssue: false,
					isStartingState: false,
					restoreAmountDue: true,
					showCalendarWidget: false,
					updateDatetime: "2022-04-12T12:37:20.43",
					updateUserID: 1,
					workflowStateTypesID: 4,
					workflowStatesID: 1,
					workflowStatesName: "22. Returned check - Bounced"

				},
				details: [
					{
						fieldName: "", code: "0000", message: "Save Success"
					}
				],
				developerMessage: "Response Returned Successfully.",
				status: "Success",
				timeStamp: "2022-07-11T14:39:35.251"
			});
		}
		return of({ status: 'Success', details: [{ code: '200' }] });
	}

	public postViolation(url: string, data: any, violationType?: boolean): Observable<any> {
		return of({});
	}

	public put(url: string, data: any, CW5type?: boolean): Observable<any> {
		if (url == 'ActionCategories/updateActionCategoryForQueues') {
			return of({
				status: 'Success', data: {
					actionCategoriesID: 552,
					actionsID: 1,
					active: true,
					categoriesID: 0,
					contractID: 2,
					createDatetime: "2022-07-07T05:27:00.7461441+00:00",
					createUserID: 0,
					isDeleted: "N",
					queuesID: 348,
					updateDatetime: "2022-07-07T05:27:00.7461463+00:00",
					updateUserID: 0
				}, details: [{
					code: "0000",
					fieldName: null,
					fieldType: null,
					message: "Inserted"
				}]
			});
		}
		if (url == 'ivr/?ivrId=1') {
			return of(
				{
					data: {
						cardsAmex: "Y",
						cardsDiscover: "Y",
						cardsVisaMasterCard: "N",
						clientNumber: "c1",
						contractId: 2,
						createDateTime: "2022-05-11T05:22:26.11",
						createUserId: 1,
						creditClCheckDigit: "Y",
						creditClCompressFlag: "Y",
						creditClNoticeFlag: "Y",
						creditClNumber: "A1",
						creditClPhoneFee: 4444.33,
						creditClPhoneSurcharge: 444.2355,
						creditClWebFee: 444.55,
						creditClWebSurcharge: 444.1234,
						inquiryCollate: "Y",
						inquiryFee: "Y",
						inquiryFleet: "Y",
						inquiryIPP: "Y",
						inquiryLicense: "Y",
						inquiryNotice: "Y",
						inquiryPlate: "Y",
						inquiryRedlight: "Y",
						inquiryTicket: "Y",
						ivrId: 1,
						paymentAll: "Y",
						paymentAny: "Y",
						paymentItem: "Y",
						paymentList: "Y",
						paymentListAny: "Y",
						paymentListSpecial: "Y",
						paymentRestore: "Y",
						updateDateTime: "2022-07-12T15:38:19.608",
						updateUserId: 1
					},
					details: [{ fieldName: "", code: "0000", message: "Update Success" }],
					developerMessage: "Response Returned Successfully.",
					status: "Success",
					timeStamp: "2022-07-12T15:38:19.661"
				}
			)
		}
		if (url == 'MediaFileConfiguration/updateMediaFileConfiguration') {
			return of({
				data: {
					active: true,
					contractID: 0,
					createDatetime: '2022-05-09T07:33:58.321Z',
					createUserID: 0,
					daystoWaitToLoadEventsForLog: 342,
					dciConvertFiles: 'F:\\Bhat\\Kapoor',
					dciDownload: 'K:\\Warne\\Public"',
					dciEncrypted: 'H:\\\\Bhat\\\\Kapoor',
					eventTypeString: 'Lumgni',
					extractedVideoImage: true,
					front1: true,
					front2: true,
					frontFolderName: 'BoldFolder',
					id: 0,
					isDeleted: 'N',
					rear1: true,
					rear2: true,
					rear3: true,
					rear4: true,
					rearFolderName: 'OldFolder',
					relativeDayBegin: 14,
					relativeDayEnd: 9,
					requiredLPRPlate: true,
					thumbnailScaleFraction: 0.05,
					updateDatetime: '2022-05-09T07:33:58.321Z',
					updateUserID: 0,
					useExitSpeed: true,
					video: true,
				},
				details: [{ fieldName: "", code: "0000", message: "Update Success" }],
				developerMessage: "Response Returned Successfully.",
				status: "Success",
				timeStamp: "2022-07-12T15:38:19.661"
			});
		}
		if (url == 'NonPayableWorkflowStates/updateNonPayableWorkFlowStates') {
			return of({
				data: {

					active: true,
					contractID: 3,
					createDatetime: "2022-04-12T12:37:20.43",
					createUserID: 2,
					isAdminVoid: false,
					isCourt: false,
					isDeleted: "N",
					isReIssue: false,
					isStartingState: false,
					restoreAmountDue: true,
					showCalendarWidget: false,
					updateDatetime: "2022-04-12T12:37:20.43",
					updateUserID: 1,
					workflowStateTypesID: 4,
					workflowStatesID: 1,
					workflowStatesName: "22. Returned check - Bounced"
				},
				details: [{ fieldName: "", code: "0000", message: "Update Success" }],
				developerMessage: "Response Returned Successfully.",
				status: "Success",
				timeStamp: "2022-07-12T15:38:19.661"
			});
		}
		if (url == 'NonPayableWorkflowStates/updateNonPayableWorkFlowStatesStatus?NonPayableWorkflowStatesID=28') {
			return of({
				data: {
					active: false,
					contractID: 2,
					createDatetime: "2022-07-13T15:35:04.1796673+00:00",
					createUserID: 0,
					errorCode: "TeAu7",
					isDeleted: "N",
					nonPayable: true,
					nonPayableWorkflowStatesID: 28,
					updateDatetime: "2022-07-13T15:35:04.1796704+00:00",
					updateUserID: 0,
					violationDateCheck: true,
					workflowStateID: 311
				},
				details: [{ fieldName: null, code: "0000", message: "Updated", fieldType: null }],
				developerMessage: "Updated",
				status: "Success",
				timeStamp: "2022-07-13T15:35:04.3128122+00:00"
			});
		}
		if (url == 'NonPayableWorkflowStates/updateNonPayableWorkFlowStates') {
			let nonPayableWorkFlowStateModel: {
				active: true,
				contractID: 2,
				createDatetime: "2022-05-05T16:37:30.060Z",
				createUserID: 0,
				errorCode: "TeAu7",
				isDeleted: "N",
				nonPayable: true,
				nonPayableWorkflowStatesID: 28,
				updateDatetime: "2022-05-05T16:37:30.060Z",
				updateUserID: 0,
				violationDateCheck: false,
				workflowStateID: 305
			}
			return of({
				data: {
					active: true,
					contractID: 2,
					createDatetime: "2022-05-05T16:37:30.06Z",
					createUserID: 0,
					errorCode: "TeAu7",
					isDeleted: "N",
					nonPayable: true,
					nonPayableWorkflowStatesID: 28,
					updateDatetime: "2022-05-05T16:37:30.06Z",
					updateUserID: 0,
					violationDateCheck: false,
					workflowStateID: 305
				},
				details: [{ fieldName: null, code: "0000", message: "Updated", fieldType: null }],
				developerMessage: "Updated",
				status: "Success",
				timeStamp: "2022-07-13T15:35:04.3128122+00:00"
			});
		}
		return of({ status: 'Success', details: [{ code: '200' }] });
	}

	public delete(url: string, id: any, CW5type?: boolean): Observable<any> {
		return of({ status: 'Success', details: [{ code: '200' }] });
	}

	public deletepl(url: string, data: any, id: any, CW5type?: boolean): Observable<any> {
		return of({});
	}

	public arDelete(url: string, id: any, CW5type?: boolean): Observable<any> {
		return of({ status: 'Success', details: [{ code: '200' }] });
	}
}
