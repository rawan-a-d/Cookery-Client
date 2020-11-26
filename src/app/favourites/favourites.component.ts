import { RecipeDTO } from './../models/RecipeDTO';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/Recipe';
import { FavouriteService } from '../services/favourite.service';
import { UserService } from '../services/user.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favourites: RecipeDTO[];

  constructor(private favouriteService: FavouriteService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.favouriteService.getAll()
    .subscribe((data) => {
      this.favourites = <RecipeDTO[]>data;

      console.log(data);
    })
  }


  remove(id: number) {
    this.favouriteService.delete(id)
      .subscribe(() => {
        this.getAll();
      });
  }

}
