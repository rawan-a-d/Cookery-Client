import { RecipeService } from './../../services/recipe.service';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { Output } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-selected-recipe',
  templateUrl: './selected-recipe.component.html',
  styleUrls: ['./selected-recipe.component.css']
})
export class SelectedRecipeComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  // action = 'new';
  id: number;

  loggedInUserId = this.authService.userId;
  userIdInUrl;
  isOwner: boolean = false;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private elementRef: ElementRef,
              private authService: AuthService) { }

  ngOnInit(): void {
    // get user id in url
    this.route.parent.params
    .subscribe((params) => { 
      this.userIdInUrl = params.id;
    
      // current user is owner??
      this.isOwner = (this.loggedInUserId == this.userIdInUrl);
    });

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['recipeId'];

          this.recipeService.get(this.id)
          .subscribe((data) => {
            this.recipe = <Recipe>data;
          })
  
        }
      )

  }

  // Modify recipe
  edit() {
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
