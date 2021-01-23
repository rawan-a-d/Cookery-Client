import { RecipeFollowDTO } from './../models/RecipeFollowDTO';
import { RecipeService } from './../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { FollowService } from '../services/follow.service';
import { UserDTO } from '../models/UserDTO';
import { FavouriteService } from '../services/favourite.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipe: RecipeFollowDTO;
  id: number;

  constructor(private recipeService: RecipeService,
              private followService: FollowService,
              private favouriteService: FavouriteService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
			this.id =+ params.get("id")

      this.getRecipe(this.id);
		})
  }

  getRecipe(id: any) {
    this.recipeService.getRecipeFollow(id)
      .subscribe( (recipe) => {
        this.recipe = <RecipeFollowDTO>recipe;
      })
  }


  follow(user: UserDTO) {
    console.log(user);
    this.followService.create(user)
      .subscribe(() => {
        this.getRecipe(this.id);
      });
  }

  unFollow(followId: number) {
    console.log(followId);
    this.followService.delete(followId)
      .subscribe(() => {
        this.getRecipe(this.id);
      });
  }


  addFavourite(recipe) {
    this.favouriteService.create(recipe)
      .subscribe((data) => {
        this.getRecipe(this.id);
      })
  }

  removeFavourite(id: number) {
    this.favouriteService.delete(id)
      .subscribe(()=> {
        this.getRecipe(this.id);
      });
  }
}
