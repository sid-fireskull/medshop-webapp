import { Component, OnInit } from '@angular/core';
import { BasicAuthenticationService } from '../services/basic-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  router: Router;
  authService: BasicAuthenticationService;

  constructor(authService: BasicAuthenticationService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

}
