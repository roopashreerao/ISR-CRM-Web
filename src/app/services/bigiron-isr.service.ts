import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BigironISRService {

  constructor(private http: HttpClient) {
  }

  getData(){
    //let url = "http://localhost:65082/api/Mobile/Accounts/1d80c52e-4a94-11eb-9234-0123456789ab";
    let url = "https://demoironcrm.azurewebsites.net/api/Mobile/Leads?countyId=270";
    return this.http.get(url);
  }

}
