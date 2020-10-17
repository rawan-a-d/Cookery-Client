import { FilterPipe } from './../pipes/filter.pipe';
import { RecipeService } from './../services/recipe.service';
import { Recipe } from '../models/Recipe';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchText = '';

  myControl = new FormControl();


  allRecipes: Recipe[] = [];

  firstRecipe: Recipe;
  secondRecipe: Recipe;

  firstRecipeFavorite: boolean = false;
  secondRecipeFavorite: boolean = true;

  filteredRecipes: Recipe[];

  regularDistribution = 100 / 3;

  i: number = 0;

  constructor(private recipeService: RecipeService,
            private filterPipe: FilterPipe) {

  }

  ngOnInit() {
      this.recipeService.getAll()
        .subscribe((recipes)=> {
          console.log(recipes);
          this.allRecipes = <Recipe[]>recipes;
        })  
  }


  get recipes() {
    console.log(this.allRecipes)
    if(this.allRecipes) {
      if(this.i == 0 || this.i == this.allRecipes.length - 1) {
        this.i = 0;
      }
      return this.allRecipes?.slice(this.i, this.i + 2);
    }
  }

  get filteredRecipesArr() {
    if(this.filteredRecipes) {
      if(this.i == 0 || this.i == this.filteredRecipes.length - 1) {
        this.i = 0;
      }
      return this.filteredRecipes?.slice(this.i, this.i + 2);
    }
  }

  onKey() { // without type info
    if(this.searchText != ''){
      this.filteredRecipes = this.filterPipe.transform(this.allRecipes, this.searchText);
    }
    else {
      this.filteredRecipes = null;
    }

  }


}
