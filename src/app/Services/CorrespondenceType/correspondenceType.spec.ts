import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { environment } from "src/environments/environment";
import { CorrespondenceTypeService } from "./CorrespondenceType";


describe('CorrespondenceTypeService', ()=> {
    let service : CorrespondenceTypeService;
    let controller : HttpTestingController; 
    let apiUrl = environment.BASE_eTIMS_URL;
    let reqObj = {
        "corrTypeId": 282,
        "contractId": 2,
        "createUserId": 1,
        "updateUserId": 1,
        "createDateTime": "2022-06-09T12:16:13.12",
        "updatedDateTime": "2022-06-09T12:16:13.12",
        "corrTypeNumber": 701,
        "corrClass": "A",
        "corrLongName": "Automatio",
        "corrShortName": "Aut",
        "corrPhoneInd": "N",
        "active": "Y",
        "isDeleted": "N",
        "corrLetterType": null,
        "corrNameLong": null,
        "extraLongName": null,
        "extraDate1": null,
        "extraDate2": null,
        "extraRules": null,
        "isUploaded": "Y"
        }
    let temObj = {
      "id" : ""
    };
    

    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports : [HttpClientTestingModule]
        });
        service = TestBed.inject(CorrespondenceTypeService);
        controller = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        controller.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
      });

    it('getCorrespondenceList shoudl return correnpondence list', ()=> {
        let data:any;
        let response:any;

        service.getCorrespondenceList().subscribe(res => {
            response = res;
            // setTimeout('',3000);
        });
        const request = controller.expectOne(apiUrl + '/admin/v1/correspondenceType');
        request.flush(reqObj);
        // console.log(data);
        // console.log(response);
        expect(reqObj).toEqual(response);
        
    });

    it('addCorrespondenceList should post Contract setting details', () => {
        let response : any;
        let data:any = reqObj;
        
        service.addCorrespondenceList(data).subscribe(res => {
          response = res;
        });
        const request = controller.expectOne(apiUrl + '/admin/v1/correspondenceType', data);
        request.flush(reqObj);
        controller.verify();
        expect(reqObj).toEqual(response);
      })

    it('updateCorrespondence should post Contract setting details', () => {
        let response : any;
        let data = JSON.stringify(reqObj);
        let id = reqObj.corrTypeId;
        service.updateCorrespondence(id,data).subscribe(res => {
          response = res;
        });
        const request = controller.expectOne(apiUrl + `/admin/v1/correspondenceType/${id}`, data);
        request.flush(reqObj);
        controller.verify();
        expect(reqObj).toEqual(response);
      });

      it('deleteCorrespondence should delete Contract setting details', () => {
        let response : any;
        let id = reqObj.corrTypeId;
        service.deleteCorrespondence(id).subscribe(res => {
          response = res;
        });
        const request = controller.expectOne(apiUrl + `admin/v1/correspondenceType/`+id);
        request.flush(reqObj);
        controller.verify();
        expect(reqObj).toEqual(response);
      });
});