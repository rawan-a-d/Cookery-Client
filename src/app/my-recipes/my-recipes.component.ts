import { RecipeService } from './../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../models/Recipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent implements OnInit, AfterViewChecked {
  recipes: Recipe[];
  userId = 2;
  selectedRecipe: Recipe;
  subscription: Subscription;
  recipeSubscription: Subscription;
  selectedIndex = -1;

  isCreated = true;

  switch = '';

  // newRecipe ='';

  constructor(private userService: UserService, 
              private recipeService: RecipeService,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute,
              private elementRef: ElementRef) { }

  ngOnInit(): void {
    // Subscribe to userService
    // console.log("NG INIT")
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

    // Get recipes
    this.getRecipes();

  }

  getRecipes() {
    this.userService.getRecipes(this.userId)
      .subscribe((recipes) => {
        this.recipes = <Recipe[]>recipes;
        // console.log(recipes);
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

  // goToFavourites() {
  //   console.log("HELLO there")
  //   // this.router.navigate(['favourites'], {relativeTo: this.route});
  // }

  // ngOnDestroy() {
  //   // this.subscription.unsubscribe();
  //   console.log('Items destroyed');

  //   this.elementRef.nativeElement.remove();

  // }
}

