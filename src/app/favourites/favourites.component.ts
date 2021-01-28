import { favouriteAnimation, favouritesAnimation } from './favourites.component.animation';
import { RecipeDTO } from './../models/RecipeDTO';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/Recipe';
import { FavouriteService } from '../services/favourite.service';
import { UserService } from '../services/user.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
  animations: [
    favouritesAnimation,
    favouriteAnimation
  ]
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
    })
  }


  remove(id: number) {
    this.favouriteService.delete(id)
      .subscribe(() => {
        this.getAll();
      });
  }


  public trackRecipe (index: number, recipe: Recipe) {
    return recipe ? recipe.id : undefined;
  }
}
