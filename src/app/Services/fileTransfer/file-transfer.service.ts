import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileTransferService {
  public apiUrl = environment.BASE_CW5_URL;

  constructor(private http: HttpClient) { }
  
  getFileTransfer(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'api/v1/FileTransfer/getFileTransferList')
  }
  getFileTransferProtocol(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'api/v1/FileTransfer/getFileTransferProtocol')
  }
  addFileTransfer(data:any):Observable<any>{
    return this.http.post(this.apiUrl + `api/v1/FileTransfer/addFileTransfer`,data);  
   }
  updateFileTransfer(data: any):Observable<any> {
    return this.http.put<any>(this.apiUrl + `api/v1/FileTransfer/updateFileTransfer`, data);
  }
  getFileTransferById(id: number):Observable<any> {
    return this.http.get<any>(this.apiUrl + `api/v1/FileTransfer/getFileTransferById?FileTransfersId=${id}`);
  }
}
