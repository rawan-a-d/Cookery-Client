import { recipeAnimation, recipesAnimation } from './user-recipes.component.animation';
import { RecipeService } from './../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../models/Recipe';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css'],
  animations: [
    recipesAnimation,
    recipeAnimation,
  ]
})
export class MyRecipesComponent implements OnInit, AfterViewChecked {
  recipes: Recipe[];
  selectedRecipe: Recipe;
  subscription: Subscription;
  recipeSubscription: Subscription;
  selectedIndex = -1;

  isCreated = true;

  switch = '';

  loggedInUserId = this.authService.userId;
  userIdInUrl;
  isOwner: boolean;

  constructor(private userService: UserService, 
              private recipeService: RecipeService,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    // get id in url
    this.route.paramMap.subscribe(params => {
			this.userIdInUrl = params.get("id")

			this.getRecipes();

			// current user is owner??
      this.isOwner = (this.loggedInUserId == this.userIdInUrl);
    })

    
    // Subscribe to userService
    this.subscription = this.userService.getInfo()
      .subscribe(value => {
        console.log('Info got changed to: ' + value);

        this.getRecipes();

      })

    // Subscribe to recipeService
    this.recipeSubscription = this.recipeService.getInfo()
    .subscribe(value => {
      console.log('Info got changed to: ' + value);

      this.getRecipes();
    })
  }

  getRecipes() {
    this.userService.getRecipes(this.userIdInUrl)
      .subscribe((recipes) => {
        this.recipes = <Recipe[]>recipes;
      })
  }


  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  onSelected(recipe, index) {
    this.selectedRecipe = recipe;
    this.switch = 'selectedRecipe';

    this.selectedIndex = index;
    
    // change route
    this.router.navigate([recipe.id], {relativeTo: this.route});
  
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onRecipeUpdate() {
    console.log("Something happend in child")
    this.getRecipes();
  }

  public trackRecipe (index: number, recipe: Recipe) {
    return recipe ? recipe.id : undefined;
  }


  animationStarted($event) {
    console.log($event);
  }

  animationDone($event) {
    console.log($event);
  }
}

