import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router, Route } from '@angular/router';
import { LoginResponse } from '../model/login-response.model';
import { LoginRequest } from '../model/login-request.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private currentUserToken: string;
  public currentUser: Observable<LoginResponse>;
  private currentUserSubject: BehaviorSubject<LoginResponse>;

    constructor(private http: HttpClient, private router: Router) {
    this.currentUserToken = localStorage.getItem('currentUserToken');
    this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  currentUserTokenValue(): string {
    return this.currentUserToken;
  }

  currentUserValue(): LoginResponse {
    return this.currentUserSubject.value;
  }

  login(loginRequest: LoginRequest) {
    const headers = new HttpHeaders().set('X-Skip-Auth-Interceptor', 'SkipAuthInterceptor');
    let test = "username=exec&password=PASSW0RD%25&grant_type=password";
    let url = "https://demoironcrm.azurewebsites.net/login";
    //let url = 'http://localhost:65082/login';

    return this.http.post<LoginResponse>(url, test, { headers })
      .pipe(map(response => {
        console.log(" login response:", response)
        var logindata = response;
        if (logindata && logindata.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUserToken', JSON.stringify(logindata.access_token));
          localStorage.setItem('currentUser', JSON.stringify(logindata));
          this.currentUserSubject.next(logindata);
        }
        return response;
      }));
  }

  //isLoggedIn(): boolean {
  //  return this.currentUserToken != null;
  //}
  isLoggedIn(): boolean {
    return this.currentUserSubject.value != null;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserToken');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
    console.log('redirect to login from auth service');
  }
     
}
