import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FileTransferServiceStub } from 'src/app/shared/testCasesHelperClasses/fileTransferServiceStub';
import { environment } from 'src/environments/environment';

import { FileTransferService } from './file-transfer.service';

describe('FileTransferService', () => {
  let fileTransferService: FileTransferService;
  let controller: HttpTestingController;
  let baseUrl = environment.BASE_CW5_URL;
  let serviceStub = new FileTransferServiceStub();
  let reqObj: any;
  let reqObjForTF: any;
  let reqObjById: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    fileTransferService = TestBed.inject(FileTransferService);
    controller = TestBed.inject(HttpTestingController);

    reqObj = {
      active: false,
      fileTransferProtocol: "FTP",
      fileTransferProtocolsID: 2,
      fileTransfersID: 76,
      ip: "10.12.12.45",
      name: "FTP",
      port: 80,
      userName: "Automation"
    }

    reqObjForTF = {
      fileTransferProtocolsID: 1,
      fileTransferProtocolsName: "None"
    }

    reqObjById = {
      active: false,
      contractID: 0,
      createDatetime: "0001-01-01T00:00:00",
      createUserID: 0,
      fileTransferProtocolsID: 2,
      fileTransfersID: 111,
      fileTransfersKey: null,
      fileTransfersName: "fax viewer",
      home: "ee",
      ip: "192.168.2.0",
      isDeleted: "\u0000",
      password: "Koushal@011",
      port: 2,
      protocol: "FTP",
      transferOptionEnabled: false,
      updateDatetime: "0001-01-01T00:00:00",
      updateUserID: 0,
      userName: ""
    }
  });

  it('should be created', () => {
    expect(fileTransferService).toBeTruthy();
  });

  it('should be created', () => {
    expect(fileTransferService).toBeTruthy();
  });

  it('getFileTransfer should return a list', () => {
    let mockData: any;
    let response: any;
    serviceStub.getFileTransfer().subscribe((res1) => {
      mockData = res1;
    })
    fileTransferService.getFileTransfer().subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/FileTransfer/getFileTransferList');
    request.flush(reqObj);
    controller.verify();
    expect(mockData[0]).toEqual(response);
  });

  it('getFileTransferProtocol should return a list', () => {
    let mockData: any;
    let response: any;
    serviceStub.getFileTransferProtocol().subscribe((res1) => {
      mockData = res1;
    })
    fileTransferService.getFileTransferProtocol().subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/FileTransfer/getFileTransferProtocol');
    request.flush(reqObjForTF);
    controller.verify();
    expect(mockData[0]).toEqual(response);
  });

  it('addFileTransfer should add a record', () => {
    let response: any;
    fileTransferService.addFileTransfer(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/FileTransfer/addFileTransfer');
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  });

  it('updateFileTransfer should update an existing record', () => {
    let response: any;
    fileTransferService.updateFileTransfer(reqObj).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + 'api/v1/FileTransfer/updateFileTransfer');
    request.flush(reqObj);
    expect(reqObj).toEqual(response);
  })

  it('getFileTransferById should return a list', () => {
    let mockData: any;
    let response: any;
    let fileTransfersID = 76
    serviceStub.getFileTransferById(fileTransfersID).subscribe((res1) => {
      mockData = res1;
    })
    fileTransferService.getFileTransferById(fileTransfersID).subscribe((res) => {
      response = res;
    });
    const request = controller.expectOne(baseUrl + `api/v1/FileTransfer/getFileTransferById?FileTransfersId=${fileTransfersID}`);
    request.flush(reqObjById);
    controller.verify();
    expect(mockData[0]).toEqual(response);
  });
});
