import { UserService } from './../services/user.service';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Recipe } from '../models/Recipe';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent implements OnInit, AfterViewChecked {
  recipes: Recipe[];
  userId = 2;
  selectedRecipe: Recipe;

  isCreated = true;

  switch = '';

  // newRecipe ='';

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.getRecipes();

  }

  getRecipes() {
    this.userService.getRecipes(this.userId)
      .subscribe((recipes) => {
        // console.log("______________________________________")
        // console.log("In get recipes")
        // console.log((<Recipe[]>recipes).length);
        // console.log(recipes)
        // console.log("______________________________________")

        // this.recipes = [];

        this.recipes = <Recipe[]>recipes;

       //this.ngAfterViewChecked();

      })
  }


  ngAfterViewChecked() {

    // console.log("After view checked")
   //this.getRecipes();
    this.cdr.detectChanges();
  }

  onSelected(recipe) {
    this.selectedRecipe = recipe;
    this.switch = 'selectedRecipe';
  }

  onNewRecipe() {
    this.switch = 'newRecipe';

    // console.log(this.switch)
    // console.log("HELLP TJERE")
  }

  onNewRecipeCreated() {
     console.log("Recipe created ");
    
     //setTimeout(()=>{                           //<<<---using ()=> syntax
    this.getRecipes();

     //s}, 4000);
    //this.recipes.push(mess)
    // this.recipes.push(this.recipes[this.recipes.length - 1])
    // this.newRecipe = 'hoho'
    // console.log(this.recipes.join());
    // console.log("all recipes length " + this.recipes.length);

    // console.log("****************************")
    // console.log(this.recipes);
    // console.log("****************************")

    // console.log("all recipes" + this.recipes[this.recipes.length - 1]);

    //this.cdr.detectChanges();

 


  }

  public trackRecipe (index: number, recipe: Recipe) {
    
    return recipe ? recipe.id : undefined;
    //return `${recipe.id}-${index}`;
  }
}
