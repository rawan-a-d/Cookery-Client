import { Recipe } from './../models/Recipe';
import { RecipeService } from './../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipe: Recipe;

  isFavorite: boolean = false;
  isFollowed: boolean = true;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

    this.get(id);
  }

  get(id: any) {
    this.recipeService.get(id)
      .subscribe( (recipe) => {
        console.log(recipe);
        this.recipe = <Recipe>recipe;
      })
  }

}
