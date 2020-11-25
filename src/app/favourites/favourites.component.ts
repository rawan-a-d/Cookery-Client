import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/Recipe';
import { FavouriteService } from '../services/favourite.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favourites: Recipe[];

  constructor(private favouriteService: FavouriteService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.favouriteService.getAll()
    .subscribe((data) => {
      this.favourites = <Recipe[]>data;

      console.log(data);
    })
  }


  remove(id: number) {
    this.favouriteService.delete(id)
      .subscribe();
  }

}
