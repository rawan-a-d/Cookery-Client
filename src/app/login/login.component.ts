import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
// import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
// import { ClientConfig } from 'clientconfig';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  invalidLogin;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  signIn(credentials) {
    console.log("HOHO");
    console.log(credentials)
    // let configCl: ClientConfig = new ClientConfig();

    // configCl.register(Http)
    

    this.authService.login(credentials)
    // .subscribe();
      // .subscribe(result => {
      //   console.log("result ");
      //   this.router.navigate(['/']);

        // if(result) {
        //   this.router.navigate(['/']);
        // }
        // else {
        //   console.log("ELSE")
        //   this.invalidLogin = true;
        // }
      // })
  }


  // this.userService.get(this.userId)
  // .subscribe((data) => {
  //   console.log(data);
  //   this.user = <User>data;
  //   console.log(this.user);
  // })

}
