import { ConfigurableFocusTrap } from '@angular/cdk/a11y';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { JwtHelper, tokenNotExpired } from 'angular-jwt';
import { combineAll, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  credentials: string = "";

  constructor(private http: HttpClient) { 
    
  }


  // Login, send credentials to server
  login(credentials: any) {
    return this.http.post('http://localhost:90/authenticate', JSON.stringify(credentials), {responseType: 'text'})
        .pipe(
          map( response => {
            let result = response;
            if(result) {
              // Set token
              localStorage.setItem('token', result);

              return true;
            }

            return false;
          })
       )
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');

    if(token) {
      return true;
    }
    return false;

    // return tokenNotExpired();
  }

  get currentUser() {
    let token = localStorage.getItem('token');

    if(!token) {
      return null;
    }

    let jwtHelper = new JwtHelperService();
    let decodedToken = jwtHelper.decodeToken(token);

    return decodedToken;
  }
}
