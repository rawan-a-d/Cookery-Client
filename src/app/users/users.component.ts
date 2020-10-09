import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe((data) => {
        console.log(data);
        this.users = <User[]>data;
        console.log(this.users);
      })
  }

}
