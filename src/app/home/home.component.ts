import { FilterPipe } from './../pipes/filter.pipe';
import { RecipeService } from './../services/recipe.service';
import { Recipe } from '../models/Recipe';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

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

  allRecipes: Recipe[] = [];
  filteredRecipes: Recipe[];

  isFavorite: boolean = false;


  constructor(private recipeService: RecipeService,
            private filterPipe: FilterPipe) {
  }

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes() {
    this.recipeService.getAll()
      .subscribe((recipes)=> {
        console.log(recipes);
        this.allRecipes = <Recipe[]>recipes;
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

}
