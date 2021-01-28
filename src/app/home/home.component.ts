import { homeAnimation } from './home.component.animation';
import { RecipeDTO } from './../models/RecipeDTO';
import { FilterPipe } from './../pipes/filter.pipe';
import { RecipeService } from './../services/recipe.service';
import { Recipe } from '../models/Recipe';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { FavouriteService } from '../services/favourite.service';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchByIngredientComponent } from './search-by-ingredient/search-by-ingredient.component';
import { searchByIngredientsAnimation } from './search-by-ingredient/search-by-ingredient.component.animation';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	animations: [homeAnimation]
})
export class HomeComponent implements OnInit {
	direction: string = "next";
	flexWidth: number = 70;
	i: number = 0;
	filter = '';

	searchText = '';
	myControl = new FormControl();

	allRecipes: RecipeDTO[] = [];

	filteredRecipes: Recipe[];

	isFavourite: boolean;


	constructor(private recipeService: RecipeService,
						private favouriteService: FavouriteService,
						private authService: AuthService,
						private filterPipe: FilterPipe,
						private dialog: MatDialog) {

	}

	ngOnInit() {
		this.getRecipes();
	}

	getRecipes() {
		this.recipeService.getAll()
			.subscribe((recipes)=> {
				console.log("Recipes")
				console.log(recipes);
				this.allRecipes = <RecipeDTO[]>recipes;
			})  
	}


	get recipes() {
			if(this.i <= 0 && this.direction == 'prev') {
				this.i = this.allRecipes.length - 2;
				console.log(this.i);
			}
			else if(this.i >= this.allRecipes.length - 1 && this.direction == 'next') {
				this.i = 0;
				console.log(this.i);
			}
			return this.allRecipes?.slice(this.i, this.i + 2);
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


	// Search by ingredients dialog
	openSearchByIngredientDialog() {
		let dialogRef = this.dialog.open(SearchByIngredientComponent, {
			height: 'auto',
			width: '40%',
		})
		
		// Get filtered recipes
		dialogRef.afterClosed()
			.subscribe(data => {
				this.allRecipes = <RecipeDTO[]>data;
			});
	}


	public trackRecipe (index: number, recipe: Recipe) {
		return recipe ? recipe.id : undefined;
	}
}
