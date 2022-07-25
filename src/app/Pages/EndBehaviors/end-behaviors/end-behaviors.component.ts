import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/Components/header/languages.service';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CourtDateModel, EndBehaviorsModel, fleetLookupBehaviorsModel } from 'src/app/Models/endbehaviors.model';
import { WorkflowstatesService } from 'src/app/Services/Workflowstates/workflowstates.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { get } from 'lodash';
import * as _ from 'lodash';
import * as xml2js from 'xml2js';
import * as converter from 'xml-js';


import { forkJoin } from 'rxjs';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-end-behaviors',
  templateUrl: './end-behaviors.component.html',
  styleUrls: ['./end-behaviors.component.scss']
})
export class EndBehaviorsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchField') searchString!: ElementRef;

  @ViewChild('xmlSort') public  xmlSort!: MatSort;
  @ViewChild('xmlPaginator') xmlPaginator!: MatPaginator;
  displayedColumns: string[] = ['behaviorsName', 'behaviorTypesName', 'action'];
  displayedXMLColumns: string[] = ['xmlElementPath', 'fieldName', 'constantFieldsValue', 'default', 'dateTypeFormatName', 'action']
  dataSource = new MatTableDataSource<EndBehaviorsModel>();
  xmldataSource = new MatTableDataSource<any>();
  EndBehviorsForm !: FormGroup;
  addFieldForm!: FormGroup;
  addconstantForm!: FormGroup
  showForm: boolean = false;
  data: any;
  successMsg!: string;
  titleAlert: string = 'This field is required';
  alertMsg!: string;
  welcome: any;
  addBtn: boolean = true;
  editData: any;
  showEditForm: boolean = false;
  queueList: any;
  contractID: any = 2;
  transitionVal: any;
  behaviorTypesName!: string;
  categoriesList: any;
  roleList: any;
  conditionalEmailEnable: boolean = false;
  xmlExportEnable: boolean = false;
  fileData: any;
  enablexmlTable: boolean = false;
  addxmlFields: boolean = false;
  constantfields: boolean = false;
  selectFileMsg:boolean = false;
  fileName: string = "";
  dateFormat: any;
  xmlfield: any;
  xml: any;
  outputXml: string = "";
  xmldata: any = [];
  xmlelementObj: any = {};
  xmlelementArray: any = [];
  filetransfer: any;
  logoImgBytes: any;
  responseData:any = [];

  minDate!: Date;
  datetpeName: any;
  addFile:boolean = false;
  editFile:boolean = false;
  checkGridData: any;
  xmlUploaded:boolean =false;
  xmlfield_array:any = [];
  xml_resData: any;
  xmlData:any = [];
  xmlfieldname: any;
  xmlConstant_array:any = [];
  xmlconstant_field:any = [];
  behaviourId: any;
  isdeleteConstant:boolean = false;

  constructor(public translate: TranslateService,
    private language: LanguageService,
    private _liveAnnouncer: LiveAnnouncer,
    private notificationService: ToastrService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.minDate = new Date();
    this.dataSource.paginator = this.paginator;
    this.getList();
    this.getTransition();
    this.language.sendLang.subscribe(lang => {
      if (lang != "") {
        this.appendLang(lang);
      }
    });
    this.EndBehviorsForm = new FormGroup({
      'behaviorsName': new FormControl('', [Validators.required]),
      'isRegistrationHold': new FormControl(false),
      'isEntrance': new FormControl('', [Validators.required]),
      'behaviorsOrder': new FormControl('', [Validators.required]),
      'behaviorTypesID': new FormControl('', [Validators.required]),
      'registrationHoldAccept': new FormControl(''),
      'registrationHoldReject': new FormControl(''),
    });

    this.addFieldForm = new FormGroup({
      'xmlElementPath': new FormControl('',[Validators.required]),
      'dateTypeFormatName': new FormControl(''),
      'fieldName': new FormControl('',[Validators.required]),
      'default': new FormControl(''),
    });

    this.addconstantForm = new FormGroup({
      'xmlElementPath': new FormControl('',[Validators.required]),
      'fieldsName': new FormControl('',[Validators.required]),
      'fieldsDescription': new FormControl('',[Validators.required]),
    });

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  //<<-----------Sorting-------------------------------->>
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  appendLang(lang: string) {
    this.translate.use(lang);
    this.setPagelabel(lang);
  }
  setPagelabel(lang: any) {
    const msg = "";
    this.translate.use(lang).toPromise();
    this.translate
      .use(lang)
      .subscribe(res => {
        this.dataSource.paginator = this.paginator;
        this.alertMsg = this.translate.instant("Items per page", { msg: msg });
        this.dataSource.paginator._intl.itemsPerPageLabel = this.alertMsg;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  changeBehaviourType(e: any) {
    this.behaviorTypesName = this.queueList[e - 1].behaviorTypesName
    switch (this.behaviorTypesName) {
      case 'Court Date':
        this.EndBehviorsForm.addControl('duration', new FormControl(0));
        this.EndBehviorsForm.removeControl('transitionsID')
        this.EndBehviorsForm.removeControl('subject');
        this.EndBehviorsForm.removeControl('narrative');
        this.EndBehviorsForm.removeControl('rolesID');
        this.EndBehviorsForm.removeControl('categoryId');
        this.removePrintingControl();
        this.removeXMLControls();
        this.xmlExportEnable = false;
        break;
      case 'Fleet License Plate Lookup':
        this.EndBehviorsForm.addControl('transitionsID', new FormControl('', Validators.required))
        this.EndBehviorsForm.updateValueAndValidity();
        this.EndBehviorsForm.removeControl('duration');
        this.EndBehviorsForm.removeControl('subject');
        this.EndBehviorsForm.removeControl('narrative');
        this.EndBehviorsForm.removeControl('rolesID');
        this.EndBehviorsForm.removeControl('categoryId');
        this.removePrintingControl();
        this.xmlExportEnable = false;
        break;

      case 'ConditionalEmail':
        this.EndBehviorsForm.addControl('subject', new FormControl(""))
        this.EndBehviorsForm.addControl('narrative', new FormControl(""))
        this.EndBehviorsForm.addControl('rolesID', new FormControl("", Validators.required))
        this.EndBehviorsForm.addControl('categoryId', new FormControl("", Validators.required))
        this.EndBehviorsForm.removeControl('duration');
        this.EndBehviorsForm.removeControl('transitionsID');
        this.removePrintingControl();
        this.conditionalEmailEnable = true;
        this.xmlExportEnable = false;
        break;

      case 'XML Export File':
        this.EndBehviorsForm.addControl('dateTypeFormatsID', new FormControl(""));
        this.EndBehviorsForm.addControl('fileName', new FormControl(""));
        this.EndBehviorsForm.addControl('exportFile', new FormControl("", Validators.required));
        this.EndBehviorsForm.addControl('hashGeneration', new FormControl(null));
        this.EndBehviorsForm.addControl('includeAllEventsIntoFile', new FormControl(null));
        this.EndBehviorsForm.addControl('ftpTransfersID', new FormControl("" , Validators.required));
        this.xmlExportEnable = true;

        break;
      case 'Printing':
        this.getAllDropDownForPrinting();
        this.IsFileUploadPrinting = false;
        this.xmlExportEnable = false;
        this.logoFileName = "";
        this.file = "";
        this.EndBehviorsForm.removeControl('transitionsID');
        this.EndBehviorsForm.removeControl('duration');
        break;


      default:
        break;
    }
  }

  exportxmlFile(file: any,value:string) {
    this.fileData = [];
    this.xmlelementArray = [];
    this.fileData = file.target.files;
    if(value == 'add') {
      if(this.fileData.length) {
        this.xmlUploaded = true;
        if (this.fileData[0].size < 2000000) {
          this.fileName = this.fileData[0].name;
          const reader = new FileReader();
          reader.onload = (e: any) => {
            let xml = e.target.result;
            this.outputXml = xml;
            const parser = new xml2js.Parser({ trim: true, explicitArray: true });
            parser.parseString(this.outputXml, (err, result) => {
              this.xml = result;
              let result1 = converter.xml2json(xml, { compact: true, spaces: 2 });
              console.log(result1);
              const JSONData = JSON.parse(result1);
              const schema = JSONData['xs:schema'];
              const element = schema['xs:element'];
              const complexType = element['xs:complexType'];
              const sequence = complexType['xs:sequence'];
              const ArrayElement = sequence['xs:element'];
              console.log(sequence['xs:element']);
              for (var i = 0; i < ArrayElement.length; i++) {
                this.xmlelementObj = {
                  xmlkey: 'root/root/' + ArrayElement[i]._attributes.name
                }
                this.xmlelementArray.push(this.xmlelementObj);
              }
              console.log(this.xmlelementArray);
            });
          }
          reader.readAsText(file.target.files[0])
          // To convert file into Base 64
          const readertext = new FileReader();
          readertext.onload = (e: any) => {
          this.logoImgBytes = e.target.result.split('base64,')[1];
          console.log(this.logoImgBytes);
          };
          readertext.readAsDataURL(this.fileData[0]);
          this.enablexmlTable = true;
        } else {
          const msg = "";
          this.successMsg = this.translate.instant("File size should not greater than 4MB", { msg: msg });
          this.notificationService.error(this.successMsg);
          this.EndBehviorsForm.controls['exportFile'].setValue(null);
        }
      }
    }else {
      if(this.fileData.length) {
        if (this.fileData[0].size < 2000000) {
          this.fileName = this.fileData[0].name;
          const reader = new FileReader();
          reader.onload = (e: any) => {
            let xml = e.target.result;
            this.outputXml = xml;
            const parser = new xml2js.Parser({ trim: true, explicitArray: true });
            parser.parseString(this.outputXml, (err, result) => {
              this.xml = result;
              let result1 = converter.xml2json(xml, { compact: true, spaces: 2 });
              console.log(result1);
              const JSONData = JSON.parse(result1);
              const schema = JSONData['xs:schema'];
              const element = schema['xs:element'];
              const complexType = element['xs:complexType'];
              const sequence = complexType['xs:sequence'];
              const ArrayElement = sequence['xs:element'];
              console.log(sequence['xs:element']);
              for (var i = 0; i < ArrayElement.length; i++) {
                this.xmlelementObj = {
                  xmlkey: 'root/root/' + ArrayElement[i]._attributes.name
                }
                this.xmlelementArray.push(this.xmlelementObj);
              }
              console.log(this.xmlelementArray);
            });
          }
          reader.readAsText(file.target.files[0])
          // To convert file into Base 64
          const readertext = new FileReader();
          readertext.onload = (e: any) => {
          this.logoImgBytes = e.target.result.split('base64,')[1];
          console.log(this.logoImgBytes);
          };
          readertext.readAsDataURL(this.fileData[0]);
          this.enablexmlTable = true;
        } else {
          const msg = "";
          this.successMsg = this.translate.instant("File size should not greater than 4MB", { msg: msg });
          this.notificationService.error(this.successMsg);
          this.EndBehviorsForm.controls['exportFile'].setValue(null);
        }
      }
    }


  }
  removeXMLControls() {
    this.EndBehviorsForm.removeControl('dateTypeFormatsID');
    this.EndBehviorsForm.removeControl('fileName');
    this.EndBehviorsForm.removeControl('exportFile');
    this.EndBehviorsForm.removeControl('hashGeneration');
    this.EndBehviorsForm.removeControl('includeAllEventsIntoFile');
    this.EndBehviorsForm.removeControl('ftpTransfersID');
  }
  addXmlfields() {

    this.addxmlFields = true;
    this.constantfields = false;
  }
  xmlfields_data(data: any) {
   if((data.xmlElementPath != "" &&  data.fieldName != "")) {
    if (this.addFieldForm.valid) {
      for(var x in this.dateFormat) {
          if(data.dateTypeFormatName == this.dateFormat[x].dateTypeFormatsID)
          this.datetpeName =  this.dateFormat[x].format;
      }

      for(var y in this.xmlfield) {
        if(this.xmlfield[y].fieldsID == data.fieldName) {
          this.xmlfieldname = this.xmlfield[y].fieldsName;
        }
      }
      const obj =
        {
          "createUserID": 0,
          "updateUserID": 0,
          "createDatetime": "2022-05-18T15:38:44.951Z",
          "updateDatetime": "2022-05-18T15:38:44.951Z",
          "isDeleted": "N",
          "xmlExportFieldsID": 0,
          "contractID": 2,
          "active": true,
          "xmlExportFileBehaviorsID": 37,
          "xmlElementPath": data.xmlElementPath,
          "fieldsID": data.fieldName,
          "default": data.default,
          "dateTypeFormatId": data.dateTypeFormatName,
          "dateTypeFormatName": this.datetpeName,
          "fieldName": this.xmlfieldname,

        }



      this.xmlfield_array.push(obj);
      this.xmldataSource = new MatTableDataSource<any>(this.xmlfield_array);
      for(var i in this.xmlelementArray) {
              if(data.xmlElementPath == this.xmlelementArray[i].xmlkey)
                this.xmlelementArray.splice(this.xmlelementArray[i],1)
        }
        this.addxmlFields = false;
        this.addFieldForm.reset();
        const msg = "";
        this.successMsg = this.translate.instant("Record Added Successfully", { msg: msg });
        this.notificationService.success(this.successMsg);
        console.log(this.xmldataSource);

      // this.apiService.post('XMLExportFile/addXmlExportField', obj, true).subscribe(res => {
      //   console.log(res);
      //   if (res.status = 'Success') {
      //     this.getxmlList();
      //     this.addFieldForm.reset();
      //     this.addxmlFields = false;
      //     const msg = "";
      //     this.successMsg = this.translate.instant("Record Added Successfully", { msg: msg });
      //     this.notificationService.success(this.successMsg);
      //     for(var i in this.xmlelementArray) {
      //       if(data.xmlElementPath == this.xmlelementArray[i].xmlkey)
      //         this.xmlelementArray.splice(this.xmlelementArray[i],1)
      //     }
      //   }
      // })
    }
   }

  }

  deletexmlRecordItem(deleteId:number) {
    this.xmlfield_array.splice(deleteId,1);
    this.xmldataSource = new MatTableDataSource<any>(this.xmlfield_array);
  }

 addconstants_data(data: any) {
   if((data.fieldsDescription != "" && data.fieldsName != "") && data.xmlElementPath != "") {
          const Cobj = {
            "createUserID": 0,
            "updateUserID": 0,
            "createDatetime": "2022-07-07T10:15:29.547Z",
            "updateDatetime": "2022-07-07T10:15:29.547Z",
            "isDeleted": "N",
            "fieldsID": 0,
            "fieldsDescription": data.fieldsDescription,
            "fieldTypesID": 0,
            "fieldsName": data.fieldsName,
            "isCodeSet": true,
            "xmlElementPath": data.xmlElementPath,
            "xmlExportFileBehaviorsID": 0,
            "isConstantStatic":true

          }
    //Start ---------------------------
    this.apiService.get('XMLExportFile/checkDuplicateRecordConstantField?FieldName='+ data.fieldsName + '&ConstantFieldsValue='+ data.fieldsDescription, true).subscribe(res => {
      console.log(res);
       if(res.constantFieldsID > 0)
       {
        const msg = "";
        this.notificationService.error(this.translate.instant( "Duplicate Record for Constant Fieldname and Value", { msg: msg }))
       }
       else
       {
        this.xmlfield_array.push(Cobj);
        this.xmlConstant_array.push(Cobj);
        this.isdeleteConstant = true;
        this.xmldataSource = new MatTableDataSource<any>(this.xmlfield_array);
        console.log(this.xmldataSource);
        for(var i in this.xmlelementArray) {
                if(data.xmlElementPath == this.xmlelementArray[i].xmlkey)
                  this.xmlelementArray.splice(this.xmlelementArray[i],1)
          }
          this.constantfields = false;
          this.addconstantForm.reset();
          const msg = "";
          this.successMsg = this.translate.instant("Record Added Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
       }
    })
    //End ----------------------------

    // this.apiService.post('XMLExportFile/addXmlExportConstantField', obj, true).subscribe(res => {
    //   if (res.status = 'Success') {
    //     // this.getxmlList();
    //     this.constantfields = false;
    //     this.addconstantForm.reset();
    //     const msg = "";
    //     this.successMsg = this.translate.instant("Record Added Successfully", { msg: msg });
    //     this.notificationService.success(this.successMsg);
    //     for(var i in this.xmlelementArray) {
    //       if(data.xmlElementPath == this.xmlelementArray[i].xmlkey)
    //         this.xmlelementArray.splice(this.xmlelementArray[i],1)
    //     }
    //   }
    // })
   }
  }

  getxmlList(id:number) {
    this.responseData = [];
    this.apiService.get('XMLExportFile/getXmlExportFieldListByXmlExportFileBehaviorsID?xmlExportFileBehaviorsID='+ id, true).subscribe(res => {
      console.log(res);
      if(res.xmlExportFieldModel.length) {
        for(var i=0;i<res.xmlExportFieldModel.length;i++) {
          if(res.xmlExportFieldModel[i].fieldsID != 0) {
            this.responseData.push(res.xmlExportFieldModel[i]);
          }
        }
      }
      if(res.constantFieldModel.length) {
          for(var x in res.constantFieldModel) {
            this.responseData.push(res.constantFieldModel[x]);
          }
      }
      this.checkGridData = this.responseData;
      this.xmldataSource = new MatTableDataSource<any>(this.responseData);
      this.xmldataSource.sort = this.xmlSort;
    })
  }

  deletexmlRecord(id: any) {
    const msgs = "";
    if(confirm(this.translate.instant("Are you sure to delete", { msg: msgs }))) {
      this.apiService.delete('XMLExportFile/deleteXmlExportFieldById?XmlExportFieldId=' + id, id, true).subscribe(res => {
        console.log(res);
        if (res.status == 'Success') {
          const msg = "";
          this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          // this.getxmlList();
        }
      },error => {
        console.log(error);
        this.errorResponseCheck(error);
      })

      }

  }

  deletexmlField( fieldid : any) {
    const msgs = "";
    if(confirm(this.translate.instant("Are you sure to delete", { msg: msgs }))) {
      this.apiService.put('XMLExportFile/deleteExportField?FieldId=' + fieldid,true).subscribe(res => {
        console.log(res);
        if (res.status == 'Success') {
          const msg = "";
          this.successMsg = this.translate.instant("Record Deleted Successfully", { msg: msg });
          this.notificationService.success(this.successMsg);
          // this.getxmlList();
        }

      },error => {
       this.errorResponseCheck(error);
      })

      }

  }
  createConstantfields() {
    this.EndBehviorsForm.addControl('name', new FormControl(""));
    this.EndBehviorsForm.addControl('value', new FormControl(""));
    this.EndBehviorsForm.addControl('xmlelement', new FormControl(""));
    this.constantfields = true;
    this.addxmlFields = false;
  }

  restrictWhiteSpace(event: any) {
    const key = event.keyCode;
    if (key === 32 && event.target.selectionStart === 0) {
      event.preventDefault();
    }
  }

  addClientList() {
    this.showForm = true;
    this.addFile = true;
    this.editFile =false;
    this.showEditForm = false;
    this.addBtn = true;
    this.behaviorTypesName = "";
    this.EndBehviorsForm.removeControl('transitionsID');
    this.EndBehviorsForm.removeControl('duration');
  }

  cancelAdding() {
    this.showForm = false;
    this.alertMsg = "";
    this.successMsg = "";
    this.notificationService.info(this.translate.instant("Process Cancelled"));
    this.behaviorTypesName = ''
    this.EndBehviorsForm.get('behaviorTypesID')?.enable();
    this.EndBehviorsForm.reset();
    this.addBtn = true;
    this.xmlExportEnable = false;
    this.enablexmlTable = false;
    this.searchString.nativeElement.value = "";
    this.fileName = "";
    this.constantfields = false;
    this.addxmlFields = false;
    this.getList();
    this.xmldataSource = new MatTableDataSource<any>();
  }
  // to get transition values for fleet lookup
  getTransition() {
    this.apiService.get('Transitions/getAllTransitions', true).subscribe(resp => {
      if (resp) {
        this.transitionVal = resp;
      }
    });
  }

  // to select transition
  transitionSelect(event: any) {
    const result = this.transitionVal.filter((element: { transitionsID: any; }) => {
      return element.transitionsID == event.value;
    });
    // To set the value
    this.EndBehviorsForm.controls['transitionsID'].setValue(result[0].transitionsID);
  }

  getList() {
    this.apiService.get('EndBehaviors/getAllEndBehaviors', true).subscribe(res => {
      if (res) {
        this.dataSource = new MatTableDataSource<EndBehaviorsModel>(
          res.reverse()
        );
        if(this.sort!=undefined)
       { this.dataSource.sort = this.sort;
        this.sort.disableClear = true;}
        this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
          if (typeof data[sortHeaderId] === 'string') {
            return data[sortHeaderId].toLocaleLowerCase();
          }
          return data[sortHeaderId];
        };
        this.dataSource.paginator = this.paginator;
        this.filterData();
      }
    });
    this.apiService.get('EndBehaviors/getBehaviorType', true).subscribe(res => {
      if (res) {
        this.queueList = res;
      }
    });
    this.apiService.get('AspNetRoles/getContractRoles', true).subscribe(res => {
      if (res) {
        this.roleList = res;
      }
    });
    this.apiService.get('Categories/getCategoriesById?ContractID=' + this.contractID, true).subscribe(res => {
      if (res) {
        this.categoriesList = res;
      }
    });

    this.apiService.get('XMLExportFile/getAllDateFormat', true).subscribe(res => {
      if (res) {
        this.dateFormat = res;
      }
    })

    this.apiService.get('XMLExportFile/getAllXmlField', true).subscribe(res => {
      if (res) {
        this.xmlfield = res;
      }
    })

    this.apiService.get('FileTransfer/getFileTransferList', true).subscribe(res => {
      this.filetransfer = res;
    })

  }

  filterData() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.behaviorsName.toLocaleLowerCase().includes(filter) || data.behaviorTypesName.toLocaleLowerCase().includes(filter);
    };
  }
  isShown: boolean = false; // hidden by default
  toggleShow() {
    this.isShown = !this.isShown;
  }
  addData(data: any) {
    if(!this.xmlUploaded && this.behaviorTypesName=="XML Export File")
      {
        const msg = "";
        var successMsg = this.translate.instant("Please Upload File", { msg: msg });
        this.notificationService.error(successMsg);
        return;
      }
  //   if(this.xmlExportEnable == true) {
  //     if(this.checkGridData == undefined) {
  //       this.notificationService.error("Please enter the Xml Fields");
  //       return;
  //     }else {

  //     }
  // }

    this.sort.sort({ id: '', start: 'asc', disableClear: false })
    if (this.EndBehviorsForm.valid) {
      const obj = new EndBehaviorsModel(data, this.behaviorTypesName)
      switch (this.behaviorTypesName) {
        case "Court Date":
          obj.courtDateModel = new CourtDateModel(data);
          break;
        case "Fleet License Plate Lookup":
          obj.fleetLookupBehaviorsModel = new fleetLookupBehaviorsModel(data);
          break;
        case "ConditionalEmail":
          obj.behaviorTypesID = _.toNumber(obj.behaviorTypesID);
          obj.courtDateModel = null;
          obj.fleetLookupBehaviorsModel = null;
          obj.printingBehaviorModel = null;
          obj.conditionalEmailBehaviorModel = {
            "createUserID": 0,
            "updateUserID": 0,
            "createDatetime": new Date().toISOString(),
            "updateDatetime": new Date().toISOString(),
            "isDeleted": "N",
            "conditionalEmailBehaviorsID": 0,
            "behaviorsID": 0,
            "subject": data.subject,
            "narrative": data.narrative,
            "rolesID": (_.isNull(data.rolesID) ? '' : data.rolesID.toString()),
            "categoryId": (_.isNull(data.categoryId) ? '' : data.categoryId.toString()),
            "contractId": this.contractID
          };
          break;
        case 'XML Export File':
          obj.xmlExportFileBehaviorsModel = {
            "createUserID": 0,
            "updateUserID": 0,
            "createDatetime": "2022-05-19T15:17:44.085Z",
            "updateDatetime": "2022-05-19T15:17:44.085Z",
            "isDeleted": "N",
            "xmlExportFileBehaviorsID": 0,
            "contractID": 2,
            "active": true,
            "behaviorsID": 1,
            "fileTransfersID": data.ftpTransfersID,
            "fileNameFormat": data.fileName,
            "hashGeneration": data.hashGeneration == ("" || null) ? false : data.hashGeneration,
            "dateTypeFormatsID": data.dateTypeFormatsID,
            "includeAllEventsIntoFile": data.includeAllEventsIntoFile == ("" || null) ? false : data.includeAllEventsIntoFile,
            "contents": this.logoImgBytes,
            "templateFileName": this.fileName,
            "templateFilePath": null
          }
          break;
        case "Printing":
          var fileName = this.logoFileName.split(".");
          obj.behaviorTypesID = _.toNumber(obj.behaviorTypesID);
          obj.courtDateModel = null;
          obj.fleetLookupBehaviorsModel = null;
          obj.printingBehaviorModel = null;
          obj.conditionalEmailBehaviorModel = null;
          if (this.logoFileName != undefined) {
            if (data.fileTransfersID == null) {
              data.fileTransfersID = 0;
            }
            if (data.comWorkflowStatesID == null) {
              data.comWorkflowStatesID = 0;
            }
            obj.printingBehaviorModel = {
              "createUserID": 0,
              "updateUserID": 0,
              "createDatetime": new Date().toISOString(),
              "updateDatetime": new Date().toISOString(),
              "isDeleted": "N",
              "printingBehaviorsID": 0,
              "behaviorsID": 0,
              "contractID": 0,
              "fileTransfersID": Number(data.fileTransfersID) == 0 ? null : Number(data.fileTransfersID),
              "vendorCode": data.vendorCode,
              "active": true,
              "contractCode": data.contractCode,
              "isExcludeToBatch": data.isExcludeToBatch == null ? false : data.isExcludeToBatch,
              "comWorkflowStatesID": Number(data.comWorkflowStatesID) == 0 ? null : Number(data.comWorkflowStatesID),
              "courtHearingLetterType": data.courtHearingLetterType,
              "noticeVersion": "1",
              "templateFileName": fileName[0],
              "templateFilePath": "string",
              "fileExtension": "pdf",
              "enableDate": (_.isNull(data.enableDate)) ? null : data.enableDate,
              "contents": this.logoImgBytes
            };
          }
          else {
            obj.printingBehaviorModel = null;
          }
          break;
        default:
          break;
      }
      console.log(2222);
      console.log(this.selectFileMsg);
      console.log(this.behaviorTypesName);
      if(!this.selectFileMsg && this.behaviorTypesName=="Printing")
      {
        const msg = "";
        var successMsg = this.translate.instant("Please Upload File", { msg: msg });
        this.notificationService.error(successMsg);
        return;
      }
      this.apiService.post('EndBehaviors/addEndBehaviors', { endBehaviorsModel: obj }, true).subscribe(
        (res) => {
          if (res.status == 'Success') {
            this.xml_resData = res;
            if(this.behaviorTypesName == 'XML Export File') {
              for(var i=0;i<this.xmlfield_array.length;i++) {
                  this.xmlfield_array[i].xmlExportFileBehaviorsID = this.xml_resData.data.xmlExportFileBehaviorsModel.xmlExportFileBehaviorsID;
              }
              for(var j=0;j<this.xmlelementArray.length;j++) {
                const obj =
                {
                  "createUserID": 0,
                  "updateUserID": 0,
                  "createDatetime": "2022-05-18T15:38:44.951Z",
                  "updateDatetime": "2022-05-18T15:38:44.951Z",
                  "isDeleted": "N",
                  "xmlExportFieldsID": 0,
                  "contractID": 2,
                  "active": true,
                  "xmlExportFileBehaviorsID":this.xml_resData.data.xmlExportFileBehaviorsModel.xmlExportFileBehaviorsID,
                  "xmlElementPath": this.xmlelementArray[j].xmlkey,
                  "fieldsID": 0,
                  "default": null,
                  "dateTypeFormatId": 0,
                  "dateTypeFormatName": null,
                  "fieldName": null
                }
                this.xmlfield_array.push(obj);
              }

              console.log(this.xmlfield_array);
              const obj = {
                xmlExportFieldModel:this.xmlfield_array
              }
                 this.apiService.post('XMLExportFile/addXmlExportField', obj, true).subscribe( res => {
                  if (res.status = 'Success') {
                   this.getxmlList(this.xml_resData.data.xmlExportFileBehaviorsModel.xmlExportFileBehaviorsID);
                  }
                })

                for(var i=0;i<this.xmlConstant_array.length;i++) {
                  this.xmlConstant_array[i].xmlExportFileBehaviorsID = this.xml_resData.data.xmlExportFileBehaviorsModel.xmlExportFileBehaviorsID;
              }

                for(var k=0;k<this.xmlConstant_array.length;k++) {
               const obj1= {

                      "createUserID": 0,
                      "updateUserID": 0,
                      "createDatetime": "2022-07-07T10:15:29.547Z",
                      "updateDatetime": "2022-07-07T10:15:29.547Z",
                      "isDeleted": "N",
                      "fieldsID": 0,
                      "fieldsDescription": this.xmlConstant_array[k].fieldsDescription,
                      "fieldTypesID": 1,
                      "fieldsName": this.xmlConstant_array[k].fieldsName,
                      "isCodeSet": true,
                      "xmlElementPath": this.xmlConstant_array[k].xmlElementPath,
                      "xmlExportFileBehaviorsID":this.xml_resData.data.xmlExportFileBehaviorsModel.xmlExportFileBehaviorsID,
                }
                this.xmlconstant_field.push(obj1);

                }
                const fieldData = {
                  "fieldViewModel":this.xmlconstant_field
                }

              this.apiService.post('XMLExportFile/addXmlExportConstantField', fieldData, true).subscribe( res => {
                if (res.status = 'Success') {
                  this.isdeleteConstant = false;
                 this.getxmlList(this.xml_resData.data.xmlExportFileBehaviorsModel.xmlExportFileBehaviorsID);
                }
              })


            }

            //--START--
            // for(var j=0;j<this.xmlelementArray.length;j++) {
            //   const objConst =
            //   {
            //     "createUserID": 0,
            //     "updateUserID": 0,
            //     "createDatetime": "2022-05-18T15:38:44.951Z",
            //     "updateDatetime": "2022-05-18T15:38:44.951Z",
            //     "isDeleted": "N",
            //     "fieldsID": 0,
            //     "fieldsDescription": "",
            //     "fieldTypesID": 0,
            //     "fieldsName": "",
            //     "isCodeSet": true,
            //     "xmlElementPath": this.xmlelementArray[j].xmlkey,
            //     "xmlExportFileBehaviorsID":this.xml_resData.data.xmlExportFileBehaviorsModel.xmlExportFileBehaviorsID,
            //   }
            //   this.xmlfield_array.push(objConst);
            // }

            // this.apiService.post('XMLExportFile/addXmlExportConstantField', this.xmlfield_array, true).subscribe(res => {
            //   if (res.status = 'Success') {
            //     // this.getxmlList();
            //     this.constantfields = false;
            //     this.addconstantForm.reset();
            //     for(var i in this.xmlelementArray) {
            //       if(data.xmlElementPath == this.xmlelementArray[i].xmlkey)
            //         this.xmlelementArray.splice(this.xmlelementArray[i],1)
            //     }
            //   }
            // })
            //--END--

            const msg = '';
            const code = res.details[0].code;
            this.successMsg = this.translate.instant('Record Added Successfully', {
              msg: msg,
            });
            this.notificationService.success(this.successMsg);
            this.paginator.pageIndex = 0;
            this.getList();
            this.addBtn = false;
            this.showForm = false;
            this.EndBehviorsForm.reset();
            this.searchString.nativeElement.value = "";
            this.enablexmlTable = false;
            this.fileName = "";
            this.xmldataSource = new MatTableDataSource<any>();


            this.removePrintingControl();
          }
        }, error => {
          this.errorResponseCheck(error);
        })
    }
  }

  editIconClicked(data: any) {

    this.apiService.get(`EndBehaviors/getEndBehaviorsByID?BehaviorsId=${data.behaviorID}`, true).subscribe((res) => {
      this.editData = res;
      this.showForm = true;
      this.addFile = false;
      this.editFile = true;
      this.showEditForm = true;
      this.addBtn = false;
      switch (res.behaviorTypesName) {
        case "Court Date":
          this.EndBehviorsForm.controls['behaviorsName'].setValue(res.behaviorsName);
          this.EndBehviorsForm.controls['isEntrance'].setValue(res.isEntrance ? 'Y' : 'N');
          this.EndBehviorsForm.controls['behaviorsOrder'].setValue(res.behaviorsOrder);
          this.EndBehviorsForm.controls['behaviorTypesID'].setValue(res.behaviorTypesID.toString());
          this.EndBehviorsForm.get('behaviorTypesID')?.disable();
          if (res.isRegistrationHold) {
            this.isShown = !this.isShown;
            this.EndBehviorsForm.controls['isRegistrationHold'].setValue(res.isRegistrationHold);
            this.EndBehviorsForm.controls['registrationHoldAccept'].setValue(res.registrationHoldAccept);
            this.EndBehviorsForm.controls['registrationHoldReject'].setValue(res.registrationHoldReject);
          }
          this.changeBehaviourType(res.behaviorTypesID)
          this.EndBehviorsForm.addControl('duration', new FormControl(0));
          this.EndBehviorsForm.controls['duration'].setValue(res.courtDateModel?.duration);
          break;
        case "Fleet License Plate Lookup":
          this.EndBehviorsForm.controls['behaviorsName'].setValue(res.behaviorsName);
          this.EndBehviorsForm.controls['isEntrance'].setValue(res.isEntrance ? 'Y' : 'N');
          this.EndBehviorsForm.controls['behaviorsOrder'].setValue(res.behaviorsOrder);
          this.EndBehviorsForm.controls['behaviorTypesID'].setValue(res.behaviorTypesID.toString());
          this.EndBehviorsForm.get('behaviorTypesID')?.disable();
          if (res.isRegistrationHold) {
            this.isShown = !this.isShown;
            this.EndBehviorsForm.controls['isRegistrationHold'].setValue(res.isRegistrationHold);
            this.EndBehviorsForm.controls['registrationHoldAccept'].setValue(res.registrationHoldAccept);
            this.EndBehviorsForm.controls['registrationHoldReject'].setValue(res.registrationHoldReject);
          }
          this.changeBehaviourType(res.behaviorTypesID)
          this.EndBehviorsForm.addControl('transitionsID', new FormControl('', Validators.required));
          this.EndBehviorsForm.updateValueAndValidity();
          this.EndBehviorsForm.controls['transitionsID'].setValue(res.fleetLookupBehaviorsModel?.transitionsId.toString());
          break;
        case "ConditionalEmail":
          this.conditionalEmailEnable = true;
          this.EndBehviorsForm.controls['behaviorsName'].setValue(res.behaviorsName);
          this.EndBehviorsForm.controls['isRegistrationHold'].setValue(res.isRegistrationHold);
          this.EndBehviorsForm.controls['isEntrance'].setValue(res.isEntrance ? 'Y' : 'N');
          this.EndBehviorsForm.controls['behaviorsOrder'].setValue(res.behaviorsOrder);
          this.EndBehviorsForm.controls['behaviorTypesID'].setValue(res.behaviorTypesID.toString());
          this.changeBehaviourType(res.behaviorTypesID)
          this.EndBehviorsForm.get('behaviorTypesID')?.disable();
          this.EndBehviorsForm.controls['registrationHoldAccept'].setValue(res.registrationHoldAccept);
          this.EndBehviorsForm.controls['subject'].setValue(res.conditionalEmailBehaviorModel.subject);
          this.EndBehviorsForm.controls['rolesID'].setValue(res.conditionalEmailBehaviorModel.rolesID.toString());
          this.EndBehviorsForm.controls['categoryId'].setValue(res.conditionalEmailBehaviorModel.categoryId.toString());
          this.EndBehviorsForm.controls['narrative'].setValue(res.conditionalEmailBehaviorModel.narrative.toString());
          break;
        case 'XML Export File':
          this.xmlExportEnable = true;
          this.enablexmlTable = true;
          this.apiService.get('XMLExportFile/getXmlExportFileBehaviorsByBehaviorsId?BehaviorsId='+ data.behaviorID,true).subscribe(res => {
            this.behaviourId = res.xmlExportFileBehaviorsID;
            this.getxmlList(res.xmlExportFileBehaviorsID);
            this.getxmlElementData(res.xmlExportFileBehaviorsID);
            this.getxmldropList(res.xmlExportFileBehaviorsID);
          })

          this.EndBehviorsForm.controls['behaviorsName'].setValue(res.behaviorsName);
          this.EndBehviorsForm.controls['isRegistrationHold'].setValue(res.isRegistrationHold);
          this.EndBehviorsForm.controls['isEntrance'].setValue(res.isEntrance ? 'Y' : 'N');
          this.EndBehviorsForm.controls['behaviorsOrder'].setValue(res.behaviorsOrder);
          this.EndBehviorsForm.controls['behaviorTypesID'].setValue(res.behaviorTypesID.toString());
          this.changeBehaviourType(res.behaviorTypesID)
          this.EndBehviorsForm.controls['fileName'].setValue(res.xmlExportFileBehaviorsModel.fileNameFormat);
          this.EndBehviorsForm.controls['dateTypeFormatsID'].setValue(res.xmlExportFileBehaviorsModel.dateTypeFormatsID.toString());
          this.EndBehviorsForm.controls['hashGeneration'].setValue(res.xmlExportFileBehaviorsModel.hashGeneration);
          this.EndBehviorsForm.controls['includeAllEventsIntoFile'].setValue(res.xmlExportFileBehaviorsModel.includeAllEventsIntoFile);
          this.fileName = res.xmlExportFileBehaviorsModel.templateFileName;
          this.EndBehviorsForm.controls['ftpTransfersID'].setValue(res.xmlExportFileBehaviorsModel.fileTransfersID.toString());
          break
        case "Printing":
          this.getAllDropDownForPrinting();
          this.conditionalEmailEnable = true;
          this.EndBehviorsForm.get('behaviorTypesID')?.disable();
          this.EndBehviorsForm.controls['registrationHoldAccept'].setValue(res.registrationHoldAccept);
          this.getAllDropDownForPrinting();
          this.GetBindPrintingControls();
          this.EndBehviorsForm.controls['Printing'].setValue(res.printingBehaviorModel.Printing);
          this.EndBehviorsForm.controls['contractCode'].setValue(res.printingBehaviorModel.contractCode.toString());
          this.EndBehviorsForm.controls['vendorCode'].setValue(res.printingBehaviorModel.vendorCode.toString());
          this.EndBehviorsForm.controls['isExcludeToBatch'].setValue(res.printingBehaviorModel?.isExcludeToBatch);
          this.EndBehviorsForm.controls['courtHearingLetterType'].setValue(res.printingBehaviorModel?.courtHearingLetterType);
          var fileTID = res.printingBehaviorModel?.fileTransfersID == null ? res.printingBehaviorModel?.fileTransfersID : res.printingBehaviorModel?.fileTransfersID.toString();
          var COMWSTID = res.printingBehaviorModel?.comWorkflowStatesID == null ? res.printingBehaviorModel?.comWorkflowStatesID : res.printingBehaviorModel?.comWorkflowStatesID.toString();
          this.EndBehviorsForm.controls['fileTransfersID'].setValue(fileTID);
          this.EndBehviorsForm.controls['comWorkflowStatesID'].setValue(COMWSTID);
          var enableDate = res?.printingBehaviorModel?.enableDate == null ? null : formatDate(res.printingBehaviorModel?.enableDate, 'yyyy-MM-dd', 'en');
          this.EndBehviorsForm.controls['enableDate'].setValue(enableDate);
          this.logoImgBytes = null
          this.file = res.printingBehaviorModel.templateFileName + "." + res.printingBehaviorModel.fileExtension
          if (res.printingBehaviorModel.templateFileName != null) {
            this.IsFileUploadPrinting = true;
          }
          else {
            this.IsFileUploadPrinting = false;
          }
          break;
        default:
          break;
      }
      this.EndBehviorsForm.controls['behaviorsName'].setValue(res.behaviorsName);
      this.EndBehviorsForm.controls['isRegistrationHold'].setValue(res.isRegistrationHold);
      this.EndBehviorsForm.controls['isEntrance'].setValue(res.isEntrance ? 'Y' : 'N');
      this.EndBehviorsForm.controls['behaviorsOrder'].setValue(res.behaviorsOrder);
      this.EndBehviorsForm.controls['behaviorTypesID'].setValue(res.behaviorTypesID.toString());
      this.EndBehviorsForm.controls['registrationHoldAccept'].setValue(res.registrationHoldAccept);
      this.EndBehviorsForm.controls['registrationHoldReject'].setValue(res.registrationHoldReject);
    });

  }

  getxmlElementData(id:number) {
      this.apiService.get('XMLExportFile/getAllXmlElementByXmlExportFileBehaviorsID?xmlExportFileBehaviorsID='+id,true).subscribe(res => {
       this.xmlelementArray = [];
        for (var x in res) {
            if(res[x].fieldsID == 0) {
                this.xmlelementArray.push(res[x].fieldsID);
                console.log(this.xmlelementArray);
            }
        }

      })
  }

  updateRecord(data: any) {
    if (this.EndBehviorsForm.valid) {
      const obj = new EndBehaviorsModel(data, this.editData.behaviorTypesName);
      obj.behaviorsID = this.editData.behaviorsID;
      obj.behaviorTypesID = this.editData.behaviorTypesID;
      obj.active = this.editData.active;
      switch (this.editData.behaviorTypesName) {
        case "Court Date":
          obj.courtDateModel = new CourtDateModel(data);
          obj.courtDateModel.behaviorsID = this.editData.behaviorsID
          obj.courtDateModel.courtDateBehaviorsID = this.editData.courtDateModel.courtDateBehaviorsID
          break;
        case "Fleet License Plate Lookup":
          obj.fleetLookupBehaviorsModel = new fleetLookupBehaviorsModel(data);
          obj.fleetLookupBehaviorsModel.behaviorsId = this.editData.behaviorsID
          obj.fleetLookupBehaviorsModel.fleetLookupBehaviorsId = this.editData.fleetLookupBehaviorsModel.fleetLookupBehaviorsId
          break;
        case "ConditionalEmail":
          obj.behaviorTypesID = _.toNumber(obj.behaviorTypesID);
          obj.courtDateModel = null;
          obj.fleetLookupBehaviorsModel = null;
          obj.printingBehaviorModel = null;
          obj.conditionalEmailBehaviorModel = {
            "createUserID": this.editData.conditionalEmailBehaviorModel.createUserID,
            "updateUserID": this.editData.conditionalEmailBehaviorModel.updateUserID,
            "createDatetime": this.editData.conditionalEmailBehaviorModel.createDatetime,
            "updateDatetime": new Date().toISOString(),
            "isDeleted": this.editData.conditionalEmailBehaviorModel.isDeleted,
            "conditionalEmailBehaviorsID": this.editData.conditionalEmailBehaviorModel.conditionalEmailBehaviorsID,
            "behaviorsID": this.editData.conditionalEmailBehaviorModel.behaviorsID,
            "subject": data.subject,
            "narrative": data.narrative,
            "rolesID": (_.isNull(data.rolesID) ? '' : data.rolesID.toString()),
            "categoryId": (_.isNull(data.categoryId) ? '' : data.categoryId.toString()),
            "contractId": this.editData.conditionalEmailBehaviorModel.contractId
          };
          break;
        case 'XML Export File':
          if (this.logoImgBytes == undefined) {
            this.logoImgBytes = null;
          }
          obj.xmlExportFileBehaviorsModel = {
            "createUserID": 0,
            "updateUserID": 0,
            "createDatetime": "2022-05-19T15:17:44.085Z",
            "updateDatetime": "2022-05-19T15:17:44.085Z",
            "isDeleted": "N",
            "xmlExportFileBehaviorsID": this.editData.xmlExportFileBehaviorsModel.xmlExportFileBehaviorsID,
            "contractID": 2,
            "active": true,
            "behaviorsID": this.editData.behaviorsID,
            "fileTransfersID": data.ftpTransfersID,
            "fileNameFormat": data.fileName,
            "hashGeneration": data.hashGeneration,
            "dateTypeFormatsID": data.dateTypeFormatsID,
            "includeAllEventsIntoFile": data.includeAllEventsIntoFile,
            "contents": this.logoImgBytes,
            "templateFileName": this.fileName,
            "templateFilePath": null
          }
          break
        case "Printing":
          var fileName = this.logoFileName.split(".");
          obj.behaviorTypesID = _.toNumber(obj.behaviorTypesID);
          obj.courtDateModel = null;
          obj.fleetLookupBehaviorsModel = null;
          obj.printingBehaviorModel = null;
          obj.conditionalEmailBehaviorModel = null;
          if (this.file != undefined) {
            if (data.fileTransfersID == null) {
              data.fileTransfersID = 0;
            }
            if (data.comWorkflowStatesID == null) {
              data.comWorkflowStatesID = 0;
            }
            obj.printingBehaviorModel = {
              "createUserID": 0,
              "updateUserID": 0,
              "createDatetime": new Date().toISOString(),
              "updateDatetime": new Date().toISOString(),
              "isDeleted": "N",
              "printingBehaviorsID": this.editData.printingBehaviorModel.printingBehaviorsID,
              "behaviorsID": this.editData.printingBehaviorModel.behaviorsID,
              "contractID": this.editData.printingBehaviorModel.contractId,
              "fileTransfersID": Number(data.fileTransfersID) == 0 ? null : Number(data.fileTransfersID),
              "vendorCode": data.vendorCode,
              "active": true,
              "contractCode": data.contractCode,
              "isExcludeToBatch": data.isExcludeToBatch == null ? false : data.isExcludeToBatch,
              "comWorkflowStatesID": Number(data.comWorkflowStatesID) == 0 ? null : Number(data.comWorkflowStatesID),
              "courtHearingLetterType": data.courtHearingLetterType,
              "noticeVersion": "1",
              "templateFileName": fileName[0] == "" ? this.editData.printingBehaviorModel.templateFileName : fileName[0],
              "templateFilePath": null,//  this.editData.printingBehaviorModel.templateFilePath ,
              "fileExtension": "pdf",
              "enableDate": (_.isNull(data.enableDate)) ? null : data.enableDate,
              "contents": this.logoImgBytes == (undefined || null) ? null : this.logoImgBytes
            };
          }
          else {
            obj.printingBehaviorModel = null;
          }
          console.log(JSON.stringify({ endBehaviorsModel: obj }));
          break;
        default:
          break;
      }
      console.log(JSON.stringify(obj));
      this.apiService.put(`EndBehaviors/updateEndBehaviors`, { endBehaviorsModel: obj }, true).subscribe(res => {
        if (res.status === 'Success') {
          this.showForm = false;
          this.EndBehviorsForm.reset();
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
          this.getList();
          const msg = '';
          this.welcome = this.translate.instant("Record Updated Successfully", { msg: msg });
          this.notificationService.success(this.welcome);
          this.searchString.nativeElement.value = ""
          this.EndBehviorsForm.get('behaviorTypesID')?.enable();
          this.fileName = "";
          this.xmlExportEnable = false;
          this.removePrintingControl();
        }
      }, error => {
        this.errorResponseCheck(error);
      })
    }

  }

  toggleClient(data: any, status: boolean) {
    const msgs = "";
    if (status) {
      if (confirm(this.translate.instant(`Are you sure you want to Enable the End Behavior?`, { msg: msgs }))) {
        const obj = {
          "behaviorsID": data.behaviorID
        }
        this.apiService.put(`EndBehaviors/toggleEndBehaviors`, obj, true).subscribe(res => {
          if (res.status == "Success") {
            this.notificationService.success(this.translate.instant("End Behavior Enabled Successfully", { msg: msgs }));
            this.searchString.nativeElement.value = ""
            this.getList();
          }
        })

      }
    } else {
      if (confirm(this.translate.instant(`Are you sure you want to Disable the End Behavior?`, { msg: msgs }))) {
        const obj = {
          "behaviorsID": data.behaviorID
        }
        this.apiService.put(`EndBehaviors/toggleEndBehaviors`, obj, true).subscribe(res => {
          if (res.status == "Success") {
            this.notificationService.success(this.translate.instant("End Behavior Disabled Successfully", { msg: msgs }));
            this.searchString.nativeElement.value = ""
            this.getList();
          }
        })

      }
    }
  }

  // ----------------------------------ERROR RESPONSE HANDLING-----------------------------------------//
  errorResponseCheck(error: any) {
    for (var i = 0; i < error.error.details.length; i++) {
      if (error.error.details[i].code == "5000" && error.error.details[i].message != "DuplicateKey") {
        const msg = "";
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
        this.notificationService.error(this.translate.instant(this.welcome))
        this.EndBehviorsForm.get(error.error.details[i].fieldName)?.setErrors({ invalid: this.welcome });
      }
      else if (error.error.details[i].message == "DuplicateKey" && error.error.details[i].code == "5000") {
        const msg = "";
        this.notificationService.error(this.translate.instant(error.error.details[i].fieldName + "_" + error.error.details[i].message, { msg: msg }))
        let translateCode = error.error.details[i].code + "_" + error.error.details[i].fieldName;
        this.welcome = this.translate.instant(translateCode, { msg: msg });
      }
      else {
        const msg = "";
        this.notificationService.error(this.translate.instant("Something went wrong please contact your administrator.", { msg: msg }));
      }
    }
  }
  logoFileName: any;
  file: any;

  IsFileUploadPrinting: boolean = false;
  handleFileInput(event: any) {
    let files = event.files[0];
    if (files.size > 2000000) {
      const msg = "";
      this.successMsg = this.translate.instant("File size should not greater than 2MB", { msg: msg });
      this.notificationService.error(this.successMsg);
      return;
    }
    if (this.file == "") {
      this.removePrintingControl();

      this.GetBindPrintingControls();
    }
    this.logoImgBytes = null;
    this.logoFileName = "";
    this.file = "";
    if (files.type != "") {
      this.selectFileMsg=true;
    }
    if (files.type != "application/pdf") {
      const msg = "";
      var successMsg = this.translate.instant("Please Upload .Pdf format", { msg: msg });
      this.notificationService.error(successMsg);
      this.IsFileUploadPrinting = false;
      this.logoFileName = "";
      this.file = "";
      return;
    }
    this.IsFileUploadPrinting = true;


    this.logoFileName = files.name;
    this.file = this.logoFileName;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.logoImgBytes = e.target.result.split('base64,')[1];
    };
    reader.readAsDataURL(files);

  }
  ComWorkflowStatesList: any;
  FileTransfersList: any;

  getAllDropDownForPrinting() {

    this.ComWorkflowStatesList = [];
    this.FileTransfersList = [];
    forkJoin(
      this.apiService.get('WorkflowStates/getAllWorkflowStates', true),
      this.apiService.get('FileTransfer/getFileTransferList', true),

    ).subscribe(
      results => {
        this.ComWorkflowStatesList = results[0];
        this.FileTransfersList = results[1];
      },
      error => console.error
    );
  }
  GetBindPrintingControls() {

    this.EndBehviorsForm.addControl('Printing', new FormControl(0));
    this.EndBehviorsForm.addControl('contractCode', new FormControl("PR", Validators.required));
    this.EndBehviorsForm.addControl('vendorCode', new FormControl("", Validators.required));
    this.EndBehviorsForm.addControl('isExcludeToBatch', new FormControl(false));
    this.EndBehviorsForm.addControl('courtHearingLetterType', new FormControl(0));
    this.EndBehviorsForm.addControl('fileTransfersID', new FormControl(0));
    this.EndBehviorsForm.addControl('comWorkflowStatesID', new FormControl(0));
    this.EndBehviorsForm.addControl('enableDate', new FormControl(null));

  }
  removePrintingControl() {
    this.EndBehviorsForm.removeControl('Printing');
    this.EndBehviorsForm.removeControl('contractCode');
    this.EndBehviorsForm.removeControl('vendorCode');
    this.EndBehviorsForm.removeControl('isExcludeToBatch');
    this.EndBehviorsForm.removeControl('courtHearingLetterType');
    this.EndBehviorsForm.removeControl('fileTransfersID');
    this.EndBehviorsForm.removeControl('comWorkflowStatesID');
    this.EndBehviorsForm.removeControl('enableDate');
  }

  getxmldropList(id:any) {
    this.apiService.get('XMLExportFile/getAllXmlElementByXmlExportFileBehaviorsID?xmlExportFileBehaviorsID='+id,true).subscribe(res => {
        console.log(res);
        this.xmlelementArray = [];
        for(var i=0;i<res.length;i++) {
          if(res[i].fieldsID === 0) {
            const obj = {
              xmlkey : res[i].xmlElementPath
            }
            this.xmlelementArray.push(obj);
          }
        }


    })
  }
}

