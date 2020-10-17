import { RecipeService } from './../services/recipe.service';
import { Recipe } from '../models/Recipe';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface User {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myControl = new FormControl();
  options: User[] = [
    {name: 'Mary'},
    {name: 'Shelley'},
    {name: 'Igor'}
  ];
  filteredOptions: Observable<User[]>;

  allRecipes: Recipe[] = [];

  firstRecipe: Recipe;
  secondRecipe: Recipe;

  firstRecipeFavorite: boolean = false;
  secondRecipeFavorite: boolean = true;

  i: number = 0;

  constructor(private recipeService: RecipeService) {

  }

  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => typeof value === 'string' ? value : value.name),
    //     map(name => name ? this._filter(name) : this.options.slice())
    //   );
      

      this.recipeService.getAll()
        .subscribe((recipes)=> {
          console.log(recipes);
          this.allRecipes = <Recipe[]>recipes;
        })  
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
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

  public icon = 'close'; 

  public changeIcon(){
      this.firstRecipeFavorite = true ; 
  }
}
