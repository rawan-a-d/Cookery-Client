import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId = 2;
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
        this.userService.get(this.userId)
      .subscribe((data) => {
        console.log(data);
        this.user = <User>data;
        console.log(this.user);
      })
  }

}
