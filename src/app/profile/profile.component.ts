import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId = this.authService.currentUser.sub;
  user: User;

  constructor(private userService: UserService,
              private authService: AuthService) { }

  ngOnInit(): void {
        this.userService.get(this.userId)
      .subscribe((data) => {
        console.log(data);
        this.user = <User>data;
        console.log(this.user);
      })
  }

}
