import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { BasicAuthenticationService } from '../basic-authentication.service';
import { LoaderService } from '../loader.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {
  basicAuthService: BasicAuthenticationService;
  loaderService: LoaderService;

  constructor(basicAuthService: BasicAuthenticationService, loaderService: LoaderService) {
    this.basicAuthService = basicAuthService;
    this.loaderService = loaderService;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let basicAuthHeaderString = this.basicAuthService.getAuthenticatedToken();
    let userName = this.basicAuthService.getAuthenticatedUser();
    this.loaderService.isLoading.next(true);
    //console.log(userName + "; " + basicAuthHeaderString);
    if (userName && basicAuthHeaderString) {
      req = req.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      });
    }
    return next.handle(req).pipe(finalize(() => {
      this.loaderService.isLoading.next(false);
    }));
  }
}
