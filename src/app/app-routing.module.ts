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
import { RecipesComponent } from './admin/recipes/recipes/recipes.component';
import { UsersComponent } from './admin/users/users/users.component';
import { StatisticsComponent } from './admin/statistics/statistics.component';
import { AdminComponent } from './admin/admin/admin.component';
import { ForbiddenComponent } from './errors/forbidden/forbidden.component';
import { UnexpectedErrorComponent } from './errors/unexpected-error/unexpected-error.component';
import { BadRequestComponent } from './errors/bad-request/bad-request.component';
import { OfflineComponent } from './errors/offline/offline.component';
import { InternalServerErrorComponent } from './errors/internal-server-error/internal-server-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

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
        component: AdminComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
        children: [
            {
                path: 'statistics',
                component: StatisticsComponent,
                pathMatch: 'full'
            },
            {
                path: 'users',
                component: UsersComponent, // Admin
                pathMatch: 'full'
            },
            {
                path: 'recipes',
                component: RecipesComponent, // Admin
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
	{
		path: 'forbidden',
		component: ForbiddenComponent,
	},
	{
		path: 'unexpected-error',
		component: UnexpectedErrorComponent,
	},
	{
		path: 'bad-request',
		component: BadRequestComponent,
	},
	{
		path: 'offline',
		component: OfflineComponent
	},
	{
		path: 'internal-server-error',
		component: InternalServerErrorComponent
	},
	{
		path: '**',
		component: NotFoundComponent
	}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }