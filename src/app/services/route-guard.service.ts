import { Injectable, inject } from '@angular/core';
import { BasicAuthenticationService } from './basic-authentication.service';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  if (inject(BasicAuthenticationService).isLoggedIn()) {
    return true;
  }
  else {
    inject(Router).navigate(['/login']);
    return false;
  }
};