import { followAnimation, followsAnimation } from './../followees.component.animation';
import { Component, OnInit } from '@angular/core';
import { UserFollowDTO } from 'src/app/models/UserFollowDTO';
import { FollowService } from 'src/app/services/follow.service';

@Component({
  selector: 'app-followees',
  templateUrl: './followees.component.html',
  styleUrls: ['./followees.component.css'],
  animations: [
    followsAnimation,
    followAnimation
  ]
})
export class FolloweesComponent implements OnInit {
  followees: UserFollowDTO[];

  constructor(private followService: FollowService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.followService.getFollowees()
    .subscribe((data) => {
      this.followees = <UserFollowDTO[]>data;

      console.log("Followees");
      console.log(this.followees)
      console.log(data);
    })
  }


  unFollow(followId: number) {
    console.log(followId);
    this.followService.delete(followId)
      .subscribe(() => {
        this.getAll();
      });
  }
}
