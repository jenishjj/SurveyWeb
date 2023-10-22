import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = "https://localhost:7131/api/";
  constructor(private http: HttpClient) { }

  postData(url: string, data: any): Observable<any> {
    return this.http.post(this.apiUrl + url, data);
  }

  getData(url: string): Observable<any> {
    return this.http.get(this.apiUrl + url);
  }

}
