import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
// Protect routes from anonymous users
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route, state: RouterStateSnapshot) {
    // throw new Error('Method not implemented.');
    // if user is logged in
    if(this.authService.isLoggedIn()) {
      return true;
    }

    // If not
    this.router.navigate(
      ['/login'], 
      { queryParams: 
        { returnUrl: state.url }
      });
    return false;
  }
}
