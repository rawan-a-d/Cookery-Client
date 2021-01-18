import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { RecipeService } from 'src/app/services/recipe.service';
import { RecipeDTO } from 'src/app/models/RecipeDTO';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-search-by-ingredient',  templateUrl: './search-by-ingredient.component.html',
	styleUrls: ['./search-by-ingredient.component.css']
})
export class SearchByIngredientComponent implements OnInit {
	[x: string]: any;
	visible = true;
	selectable = true;
	removable = true;
	addOnBlur = true;
	readonly separatorKeysCodes: number[] = [ENTER, COMMA];
	ingredients: string[] = [];
	doesIngredientExist = false;

	recipes: RecipeDTO[];

	constructor(private recipeService: RecipeService, 
							private dialogRef: MatDialogRef<SearchByIngredientComponent>) { }

	ngOnInit(): void {
	}


	// Add ingredient
	// check if ingredient is unique
	add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		const valueLowCase = value.trim().toLowerCase();

		if(this.ingredients.includes(valueLowCase)) {
			this.doesIngredientExist = true;
		}
		else {
			this.doesIngredientExist = false;

			// Add ingredient
			if ((value || '').trim().toLowerCase()) {
				this.ingredients.push(valueLowCase);
			}
	
			// Reset the input value
			if (input) {
				input.value = '';
			}
		}
	}


	// Remove ingredient
	remove(ingredient: string): void {
		const index = this.ingredients.indexOf(ingredient);

		if (index >= 0) {
			this.ingredients.splice(index, 1);
		}
	}


	// Search
	search() {
		if(this.ingredients.length > 0) {
			this.getRecipesByIngredient();
		}
	}


	// Get recipes by ingredients
	getRecipesByIngredient() {
		this.recipeService.getRecipesBy(this.ingredients)
			.subscribe((data)=> {
				this.recipes = <RecipeDTO[]>data;
		
				this.dialogRef.close(this.recipes);
			});
	} 
}