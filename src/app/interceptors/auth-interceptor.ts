import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EMPTY, concat, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
//import { NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly TAG: string = 'AuthInterceptor';
  public static readonly SkipAuthInterceptorHeader = 'X-Skip-Auth-Interceptor';
  constructor(private authenticationService: AuthenticationService) { }

  //constructor(private authenticationService: AuthenticationService, private logger: NGXLogger) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(`${this.TAG}: request: `, req, 'next: ', next);
    if (req.headers.has(AuthInterceptor.SkipAuthInterceptorHeader)) {
      console.log(this.TAG, 'Skipping this interceptor');
      const headers = req.headers.delete(AuthInterceptor.SkipAuthInterceptorHeader);
      return next.handle(req.clone({ headers }));
    }

    let isLoggedIn = this.authenticationService.isLoggedIn();
    if (!isLoggedIn) {
      console.log(this.TAG, ': User is not logged in. Logging out');
      this.authenticationService.logout();
      return EMPTY;
    }
    let loginData = this.authenticationService.currentUserValue();
    let token = localStorage.getItem('currentUserToken');
    console.log(this.TAG, ': loginData `: ', loginData);
    console.log(this.TAG, ': local storage token `: ', token);
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        ContentType: 'application/json'
      }
    });

    return next.handle(authReq).pipe(
      catchError((err, caught: Observable<HttpEvent<any>>) => {
        if (err instanceof HttpErrorResponse && err.status == 401) {
          this.authenticationService.logout();
          return throwError(err);
        }
        return throwError(err);
      })
    );
  }
}
