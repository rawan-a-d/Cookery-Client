import { RecipeService } from './../services/recipe.service';
import { Recipe } from 'src/app/models/Recipe';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {AfterViewChecked,ChangeDetectorRef} from '@angular/core'


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {
  loggedInUser = 2;

  // @Input() isCreated: boolean = false;
  @Output() onSubmit = new EventEmitter();

  constructor(private recipeService: RecipeService,
              private fb: FormBuilder, 
              private cdr: ChangeDetectorRef) { }

  recipeForm: FormGroup;

  ngOnInit(): void {

    this.recipeForm = this.fb.group({
      name: [],
      description: [],
      image: [],
      ingredients: this.fb.array(
        [this.fb.group(
          {
            ingredient: '',
            amount: ''
          }
        )]
      )
    })
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  submit(f) {
    //console.log(f);
    let newRecipe : Recipe;

    // send to backend
    newRecipe = new Recipe(f.value);

    newRecipe.userId = this.loggedInUser;

    this.recipeService.create(newRecipe)
      .subscribe((data) =>{
        // inform parent
        this.onSubmit.emit();
      })

  }

  cancel() {

  }

  addIngredient() {
    this.ingredients.push(this.fb.group({ingredient: '', amount: ''}));
  }

  delete(index) {
    this.ingredients.removeAt(index);
  }
}
