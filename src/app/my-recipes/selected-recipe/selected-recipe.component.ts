import { RecipeService } from './../../services/recipe.service';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { Output } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-selected-recipe',
  templateUrl: './selected-recipe.component.html',
  styleUrls: ['./selected-recipe.component.css']
})
export class SelectedRecipeComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  // action = 'new';
  id: number;

  // Update my-recipes on delete or update
  // @Output() onUpdate = new EventEmitter();


  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['recipeId'];

          console.log(this.id)

          console.log('NEW RECIPE SELECTED ' + this.id)

          this.recipeService.get(this.id)
          .subscribe((data) => {
            this.recipe = <Recipe>data;
          })
  
        }
      )




        // console.log(this.recipe)

  }

  // Modify recipe
  edit() {
    // console.log(this.action);
    // open new component and send recipe
    // this.action= 'edit';

    this.recipe = null;

    this.router.navigate(['edit'], {relativeTo: this.route});
  }


  // Delete recipe
  delete() {
    console.log('deleting ' + this.recipe.id)
    this.recipeService.delete(this.recipe.id)
      .subscribe(() => {
        // this.onUpdate.emit();

        this.recipe = null;

        
        this.recipeService.setInfo('recipe deleted');
        this.router.navigate(['../'], {relativeTo: this.route});

      });


  }


  ngOnDestroy() {
    // this.subscription.unsubscribe();
    console.log('Items destroyed');

    this.elementRef.nativeElement.remove();

  }
}
