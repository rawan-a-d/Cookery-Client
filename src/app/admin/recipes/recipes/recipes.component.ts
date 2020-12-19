import { Component, OnInit } from '@angular/core';
import { RecipeDTO } from 'src/app/models/RecipeDTO';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: RecipeDTO[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes() {
    this.recipeService.getAll()
      .subscribe((data) => {
        this.recipes = <RecipeDTO[]>data;
      })
  }


    // Delete recipe
    delete(recipeId: number): void {
      this.recipeService.delete(recipeId)
        .subscribe(() => {    
          this.getRecipes();
        });
    }

}
