import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { HomeComponent } from './home/home.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { SelectedRecipeComponent } from './my-recipes/selected-recipe/selected-recipe.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full'
    },
    {
        path: 'recipes',
        component: HomeComponent
    },
    {
        path: 'users/:id/recipes',
        component: MyRecipesComponent,
        children: [
            {
                path: 'new',
                component: NewRecipeComponent
            },
            {
                path: ':recipeId',
                component: SelectedRecipeComponent
            },
            {
                path: ':recipeId/edit',
                component: NewRecipeComponent
            }
        ]
    },
    {
        path: 'recipes/:id',
        component: RecipeComponent
      }
    
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }