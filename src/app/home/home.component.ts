import { RecipeDTO } from './../models/RecipeDTO';
import { FilterPipe } from './../pipes/filter.pipe';
import { RecipeService } from './../services/recipe.service';
import { Recipe } from '../models/Recipe';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { FavouriteService } from '../services/favourite.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  direction: string = "next";
  flexWidth: number = 70;
  i: number = 0;

  searchText = '';
  myControl = new FormControl();

  // allRecipes: Recipe[] = [];
  allRecipes: RecipeDTO[] = [];

  filteredRecipes: Recipe[];
  // favourites: RecipeDTO[];

  isFavourite: boolean;


  constructor(private recipeService: RecipeService,
            private favouriteService: FavouriteService,
            private authService: AuthService,
            private filterPipe: FilterPipe) {
  }

  ngOnInit() {
    this.getRecipes();

    // this.getFavourites();
  }

  getRecipes() {
    this.recipeService.getAll()
      .subscribe((recipes)=> {
        console.log(recipes);
        this.allRecipes = <RecipeDTO[]>recipes;
      })  
  }


  get recipes() {
    if(this.allRecipes) {
      if(this.i <= 0 && this.direction == 'prev') {
        this.i = this.allRecipes.length - 2;
      }
      else if(this.i >= this.allRecipes.length - 1 && this.direction == 'next') {
        this.i = 0;
      }
      return this.allRecipes?.slice(this.i, this.i + 2);
    }
  }


  get filteredRecipesArr() {
    if(this.filteredRecipes) {
      if(this.i <= 0 && this.direction == 'prev') {
        this.i = this.filteredRecipes.length - 2;
      }
      else if(this.i >= this.filteredRecipes.length - 1 && this.direction == 'next') {
        this.i = 0;
      }

      return this.filteredRecipes?.slice(this.i, this.i + 2);
    }
  }

  // list of recipes
  // when I move to next element increase i and check if it's the last element
  // get the last element and the first

  // when I move back to previous decrease i and check if it's the first element
  // get the first element and last

  onKey() { // without type info
    if(this.searchText != ''){
      this.filteredRecipes = this.filterPipe.transform(this.allRecipes, this.searchText);
    }
    else {
      this.filteredRecipes = null;
    }

    // Set width
    this.setFlexWidth();
  }


  setFlexWidth() {
    if(this.filteredRecipes.length == 1) {
      this.flexWidth = 50;
    }
    else {
      this.flexWidth = 70;
    }
  }


  previous() {
    this.i = this.i - 1;
    this.direction = 'prev';
  }


  next() {
    this.i = this.i + 1;
    this.direction = 'next';
  }



  // Favourites
  // getFavourites() {
  //   this.favouriteService.getAll()
  //   .subscribe((data) => {
  //     this.favourites = <RecipeDTO[]>data;

  //     console.log(this.favourites)
  //     console.log(data);
  //   })
  // }

  toggleFavourite(recipe: RecipeDTO) {
    this.isFavourite = recipe.isFavourite;
    if(this.isFavourite) {
      this.removeFavourite(recipe.favouriteId);
      console.log("Trying to remove fav")
    }
    else {
      this.addFavourite(recipe);
      console.log("Trying to add fav")
    }

    this.isFavourite = false;
  }

  addFavourite(recipe: RecipeDTO) {
    this.favouriteService.create(recipe)
      .subscribe((data) => {

        this.getRecipes();

      })

  }

  removeFavourite(id: number) {
    this.favouriteService.delete(id)
      .subscribe(()=> {
        this.getRecipes();
      });
  }

  // isFavourite(recipe: Recipe): boolean {
  //   if(this.favourites.indexOf(recipe) >= 0) {
  //     return true;
  //   }

  //   return false;
  // }

}
