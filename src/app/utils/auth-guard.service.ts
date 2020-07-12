import { AuthQuery } from './../core/auth/state/auth.query';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authQuery: AuthQuery, public router: Router) {

  }
  canActivate(): boolean {
    if(!this.authQuery.isLoggedIn) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }}
