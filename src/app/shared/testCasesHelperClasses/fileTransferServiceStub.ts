import { Observable } from 'rxjs';
import { of } from 'rxjs';

const obj = {
    active: false,
    fileTransferProtocol: "FTP",
    fileTransferProtocolsID: 2,
    fileTransfersID: 76,
    ip: "10.12.12.45",
    name: "FTP",
    port: 80,
    userName: "Automation"
}

export class FileTransferServiceStub {
    public getFileTransfer(): Observable<any[]> {
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
                    fileTransferProtocol: "FTP",
                    fileTransferProtocolsID: 2,
                    fileTransfersID: 76,
                    ip: "10.12.12.45",
                    name: "FTP",
                    port: 80,
                    userName: "Automation"
                }
            ]
        );
    }
    public getFileTransferProtocol(): Observable<any[]> {
        return of(
            [
                {
                    fileTransferProtocolsID: 1,
                    fileTransferProtocolsName: "None"
                },
                {
                    fileTransferProtocolsID: 1,
                    fileTransferProtocolsName: "None"
                }
            ]
        );
    }
    public addFileTransfer(data: any): Observable<any> {
        return of(obj);
    }
    public updateFileTransfer(id: any, data: any): Observable<any> {
        return of(obj);
    }
    public getFileTransferById(id: number): Observable<any[]> {
        return of(
            [{
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
            }]
        );
    }

}