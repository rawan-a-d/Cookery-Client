import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
// Protects routes from non admin
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // throw new Error('Method not implemented.');
        // Check if user is admin
    let user = this.authService.currentUser;
    let isAdmin = user.admin;
    
    if (user && isAdmin) {
      return true;
    }
    else {
      // no access page to
      // this.router.navigate(['no-access']);
      return false;
    }
  }
}
