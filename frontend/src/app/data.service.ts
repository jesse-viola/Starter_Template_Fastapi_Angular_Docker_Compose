import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {
  }

  getItems(params: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/items", { params: params });
  }
}
