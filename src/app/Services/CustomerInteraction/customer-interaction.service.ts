import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerInteraction } from '../../Models/customer-interaction.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerInteractionService {
  getList(code: any) {
    throw new Error('Method not implemented.');
  }
  public apiUrl = environment.BASE_eTIMS_URL;
  constructor(private http: HttpClient) {}

  getCustomerintractionlist(): Observable<CustomerInteraction[]> {
    return this.http.get<CustomerInteraction[]>(
      this.apiUrl + 'admin/v1/interaction'
    );
  }

  addCustomerintractionlist(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'admin/v1/interaction', data);
  }

  updateCustomerintractionlist(id:any,data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'admin/v1/interaction/'+id, data);
  }
  deleteCustomerintractionlist(data: any): Observable<any> {
    return this.http.delete<any>(
      this.apiUrl + 'admin/v1/interaction/' + data
    );
  }
}
