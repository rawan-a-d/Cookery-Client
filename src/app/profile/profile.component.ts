import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { ProfileDTO } from '../models/ProfileDTO';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: ProfileDTO;

  constructor(private userService: UserService,
              private authService: AuthService) { }

  ngOnInit(): void {
        this.userService.getProfile()
      .subscribe((data) => {
        console.log('data ' + data);
        console.log(data);
        this.profile = <ProfileDTO>data;
        console.log(this.profile);
      })
  }

}
