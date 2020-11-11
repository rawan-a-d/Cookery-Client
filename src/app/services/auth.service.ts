import { ConfigurableFocusTrap } from '@angular/cdk/a11y';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineAll, map } from 'rxjs/operators';


// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json', 
//     'Authorization': localStorage.getItem('token') // Basic email:password
//   })
// }


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  credentials: string = "";
  // Fixes Unsupported Media Type
  // httpOptions = {
  //   headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': "HELLO"})
  // }

  constructor(private http: HttpClient) { 
    
  }


  // Login, send credentials to server
  login(resource: any) {
    this.credentials = btoa(resource.email + ":" + resource.password); // rawan:1234
    console.log("CREDENTIALS " + this.credentials);
    // ClientConfig config = new ClientConfig()
    // config config = new ConfigurableFocusTrap();
    // this.httpOptions.headers.append('Authorization', "HELLO");


    // let httpOptions = {
    //   headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.credentials})
    // }

    localStorage.removeItem('token');
    localStorage.setItem('token', this.credentials);
    
    // return this.http.post('http://localhost:90/authenticate')
    //     .pipe(
    //       map(
    //         response => response
    //       )
    //    )
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return false;
  }
}
