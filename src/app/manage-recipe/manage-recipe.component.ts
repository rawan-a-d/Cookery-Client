import { Ingredient } from '../models/Ingredient';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from 'src/app/models/Recipe';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {AfterViewChecked,ChangeDetectorRef} from '@angular/core'
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { NotificationSocketService } from '../services/notification-socket.service';
import { fade } from './manage-recipe.component.animation'

@Component({
  selector: 'app-new-recipe',
  templateUrl: './manage-recipe.component.html',
  styleUrls: ['./manage-recipe.component.css'],
  animations: [
    fade
  ]
})
export class NewRecipeComponent implements OnInit {
  userId = this.authService.currentUser.sub;

  recipeId: number;
  editMode = false;
  recipeForm: FormGroup;

  selectedFile: File = null;

  constructor(private recipeService: RecipeService,
              private authService: AuthService,
              private fb: FormBuilder, 
              private cdr: ChangeDetectorRef,
              private route: ActivatedRoute,
              private router: Router,
              public notificationSocketService: NotificationSocketService) { }


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

    if(this.editMode) {
        this.recipeService.update(newRecipe)
          .subscribe((data) =>{
            this.cancel();

            // inform parent    
            this.recipeService.setInfo('recipe updated');
          })
      }
      else {
        this.recipeService.create(newRecipe)
        .subscribe((data) =>{  
          this.cancel();

          // inform parent
          this.recipeService.setInfo('recipe created');

          this.notificationSocketService.sendMessage(newRecipe);
        })
      }
  }

  // cancel and reset form
  cancel() {
      // Reset form
      this.router.navigate(['../'], { relativeTo: this.route });
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


  }

  onFileSelected(event) {

    console.log(event); // target -> files
    this.selectedFile = <File>event.target.files[0];
  }
}

