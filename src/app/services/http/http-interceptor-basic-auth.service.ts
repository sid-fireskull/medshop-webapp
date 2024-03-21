import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {
  basicAuthService: BasicAuthenticationService;

  constructor(basicAuthService: BasicAuthenticationService) {
    this.basicAuthService = basicAuthService;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let basicAuthHeaderString = this.basicAuthService.getAuthenticatedToken();
    let userName = this.basicAuthService.getAuthenticatedUser();

    console.log(userName + "; " + basicAuthHeaderString);
    console.log("Request: " + req);
    if (userName && basicAuthHeaderString) {
      req = req.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      });
    }
    return next.handle(req);
  }
}
