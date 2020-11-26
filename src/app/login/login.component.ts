import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

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
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  signIn(credentials) {

    this.authService.login(credentials)
      .subscribe((result) => {
        console.log("result ");
        if(result) {
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl'); // The url the user wanted to go to before he logged in
          this.router.navigate([returnUrl || '/']);

        }
        else {
          this.invalidLogin = true;
        }

      })
  }
}
