import { Injectable } from '@angular/core';
import { AuthenticationBean } from '../entity/authentication-bean';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { BASE_URL } from '../const/app.constants';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {
  private http: HttpClient;
  private AUTH_TOKEN: string = "token";
  private AUTHENTICATED_USER = "authenticatedUser";

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(this.AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser())
      return sessionStorage.getItem(this.AUTH_TOKEN);
    else
      return null;
  }

  isLoggedIn(): boolean {
    let user = sessionStorage.getItem(this.AUTHENTICATED_USER);
    return !(user === null);
  }

  logout(): void {
    sessionStorage.removeItem(this.AUTHENTICATED_USER);
    sessionStorage.removeItem(this.AUTH_TOKEN);
  }

  auth(username: string, password: string) {
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });
    return this.http.get<AuthenticationBean>(`${BASE_URL}/auth`, { headers }).pipe(map(data => {
      console.log(data);
      sessionStorage.setItem(this.AUTHENTICATED_USER, username);
      sessionStorage.setItem(this.AUTH_TOKEN, basicAuthHeaderString);
      return data;
    }));
  }


}
