import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { HomeComponent } from './home/home.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { SelectedRecipeComponent } from './my-recipes/selected-recipe/selected-recipe.component';
import { AuthGuard } from  './services/auth-guard.service';
import { AdminAuthGuard } from  './services/admin-auth-guard.service';

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
        canActivate: [AuthGuard],
        children: [
            {
                path: 'new',
                component: NewRecipeComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':recipeId',
                component: SelectedRecipeComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':recipeId/edit',
                component: NewRecipeComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: 'recipes/:id',
        component: RecipeComponent
    },
    {
        path: 'users/:id/favourites',
        component: FavouritesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users/:id',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: HomeComponent, // Admin
        canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    // {
    //     path: 'no-access',
    //     component: NoAccessComponent
    // }

    
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }