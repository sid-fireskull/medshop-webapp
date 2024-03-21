import { Component, OnInit } from '@angular/core';
import { BasicAuthenticationService } from '../services/basic-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username="john";
  password="wick";
  errorMsg="Invalid Credential";
  invalidCred = false;

  router:Router;
  basicAuth: BasicAuthenticationService;

  constructor(router: Router, basicAuth: BasicAuthenticationService) { 
    this.router = router;
    this.basicAuth = basicAuth;
  }

  ngOnInit(): void {
  }

  handleBasicAuthLogin() : void{
    this.basicAuth.auth(this.username, this.password).subscribe({
     next: res => {
      this.router.navigate(["products/"])
      this.invalidCred=false;
    }, 
    error: error => {
      console.log(error);
      this.invalidCred=true;
    }});
  }
  

}
