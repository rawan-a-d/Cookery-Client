import { Ingredient } from './../models/Ingredient';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from './../services/recipe.service';
import { Recipe } from 'src/app/models/Recipe';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {AfterViewChecked,ChangeDetectorRef} from '@angular/core'
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {
  userId = this.authService.currentUser.sub;

  recipeId: number;
  editMode = false;
  recipeForm: FormGroup;

  // selectedFile: File;

  selectedFile: File = null;



  constructor(private recipeService: RecipeService,
              private authService: AuthService,
              private fb: FormBuilder, 
              private cdr: ChangeDetectorRef,
              private route: ActivatedRoute,
              private router: Router) { }


  ngOnInit(): void {
    // get recipeId if it exists
    this.recipeId = this.route.snapshot.params.recipeId;
    // check if edit mode or new mode
    this.editMode = this.recipeId != undefined;

    // initialize form
    this.initForm();
    
    this.recipeForm = this.fb.group({
      name: [],
      description: [],
      // image: [],
      image: [],

      // image: new FormData().append('imageFile', this.selectedFile, this.selectedFile.name),
      ingredients: this.fb.array(
        [this.fb.group(
          {
            ingredient: '',
            amount: '1'
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

    newRecipe.id = this.recipeId;

    newRecipe.userId = this.userId;
    // newRecipe.user = this.loggedInUser;

    // newRecipe.image = this.selectedFile;

    // newRecipe.ingredients = this.ingredients;

    console.log("UPDATED RECIPE: ")
    console.log(newRecipe);
    console.log("Ingredient " + this.ingredients[0])
    if(this.editMode) {
        console.log("Edit mode")
        this.recipeService.update(newRecipe)
          .subscribe((data) =>{
            this.cancel();

            console.log("UPDATED RECIPE: ")
            console.log(newRecipe)

            // inform parent    
            this.recipeService.setInfo('recipe updated');
          })
      }
      else {

        this.recipeService.create(newRecipe)
        .subscribe((data) =>{  
          this.cancel();
          // console.log('NEW RECIPE');
          // console.log(this.selectedFile);

          console.log(data);
          // inform parent
          this.recipeService.setInfo('recipe created');
        })
      }
  }

  // cancel and reset form
  cancel() {
      // Reset form
      this.router.navigate(['../'], { relativeTo: this.route });

      // this.recipeForm.reset();
      // this.recipeForm.markAsUntouched();
  }

  // add new ingredient
  addIngredient() {
    this.ingredients.push(this.fb.group({ingredient: '', amount: '1'}));
  }

  // delete ingredient
  deleteIngredient(index) {
    this.ingredients.removeAt(index);
  }

  // initialize form
  private initForm() {
    console.log("INIT FORM IS CALLED")
    let recipeName = '';
    let recipeDescription = '';
    let recipeImage;
    let recipeIngredients;
  


    // Edit form
    if(this.editMode) {
      // Get recipe
      let recipe: Recipe;
      this.recipeService.get(this.recipeId)
        .subscribe((data) => {
          recipe = <Recipe>data;

          console.log(recipe);
          recipeName = recipe.name;
          recipeDescription = recipe.description;
          // recipeImage = recipe.image;
          recipeImage = recipe.image;

          recipeIngredients = this.fb.array([]);

          recipe.ingredients.forEach(ingredient => {
            recipeIngredients.push(this.fb.group(
              {
                id: ingredient.id,
                ingredient: ingredient.ingredient,
                amount: ingredient.amount
              }
            ));
          });
    
          this.recipeForm = this.fb.group({
            name: [recipeName],
            description: [recipeDescription],
            image: [recipeImage],
            ingredients: recipeIngredients
          })
        })

      return;
    }

    // New form
    // this.recipeForm = this.fb.group({
    //   name: [],
    //   description: [],
    //   image: [],
    //   ingredients: this.fb.array(
    //     [this.fb.group(
    //       {
    //         ingredient: '',
    //         amount: ''
    //       }
    //     )]
    //   )
    // })



  }

  //Gets called when the user selects an image
  // public onFileChanged(event) {
  //   //Select File
  //   this.selectedFile = event.target.files[0];

  //   console.log(this.selectedFile)
  // }


  onFileSelected(event) {

    console.log(event); // target -> files
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    
  }
}

