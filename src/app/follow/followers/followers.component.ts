import { Component, OnInit } from '@angular/core';
import { UserFollowDTO } from 'src/app/models/UserFollowDTO';
import { FollowService } from 'src/app/services/follow.service';
import { followAnimation, followsAnimation } from '../followees.component.animation';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css'],
  animations: [
    followsAnimation,
    followAnimation
  ]
})
export class FollowersComponent implements OnInit {
  followers: UserFollowDTO[];

  constructor(private followService: FollowService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.followService.getAll()
    .subscribe((data) => {
      this.followers = <UserFollowDTO[]>data;

      console.log("Followers");
      console.log(this.followers)
      console.log(data);
    })
  }
}