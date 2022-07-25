import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CitationTicketType} from '../../Models/citation-ticket-type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitationTicketTypeService {

  public apiUrl= environment.BASE_eTIMS_URL;

  constructor(private http:HttpClient) { }

    getTickettypeList():Observable<CitationTicketType[]>{
      return this.http.get<CitationTicketType[]>(this.apiUrl + 'admin/v1/ticketType');
    }

    addTickettypeList(data:any):Observable<any>{
      return this.http.post(this.apiUrl + 'admin/v1/ticketType',data);
    }

    UpdateTickettype(id:any,data:any):Observable<any>{
      return this.http.put(this.apiUrl + 'admin/v1/ticketType/'+id,data);
    }

    deleteTickettype(id:any):Observable<any>{
      return this.http.delete(this.apiUrl + 'admin/v1/ticketType/'+id);
    }
}
