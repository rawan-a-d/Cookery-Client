import { FavouriteService } from './services/favourite.service';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './services/recipe.service';
import { DataService } from './services/data.service';
import { ErrorService } from './services/errors/error.service';
import { NotificationService } from './services/errors/notification.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsersComponent } from './admin/users/users/users.component';
import { HomeComponent } from './home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FilterPipe } from './pipes/filter.pipe';
import {MatChipsModule} from '@angular/material/chips';

import { FlexLayoutModule } from '@angular/flex-layout';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NavbarComponent } from './navbar/navbar.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RouterModule } from '@angular/router';

import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { SelectedRecipeComponent } from './my-recipes/selected-recipe/selected-recipe.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import {MatFormFieldModule} from '@angular/material/form-field';
// import { MatSidenavModule, MatListModule } from  '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FavouritesComponent } from './favourites/favourites.component';
import { ProfileComponent } from './profile/profile.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { LoginComponent } from './login/login.component';
import { AuthHttpInterceptor } from './services/auth-http.interceptor';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { RecipesComponent } from './admin/recipes/recipes/recipes.component';
import { StatisticsComponent } from './admin/statistics/statistics.component';
import { AdminComponent } from './admin/admin/admin.component';
import {MatSelectModule} from '@angular/material/select';
import { NgxEchartsModule } from 'ngx-echarts';
import { BadRequestComponent } from './errors/bad-request/bad-request.component';
import { ForbiddenComponent } from './errors/forbidden/forbidden.component';
import { InternalServerErrorComponent } from './errors/internal-server-error/internal-server-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { OfflineComponent } from './errors/offline/offline.component';
import { UnexpectedErrorComponent } from './errors/unexpected-error/unexpected-error.component';
import { ErrorInterceptor } from './services/error.interceptor';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import { UploadImageComponent } from './profile/upload-image/upload-image.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { FollowersComponent } from './follow/followers/followers.component';
import { FolloweesComponent } from './follow/followees/followees.component';
import { SearchByIngredientComponent } from './home/search-by-ingredient/search-by-ingredient.component';
import { NotificationMenuComponent } from './notification-menu/notification-menu.component';
import {MatBadgeModule} from '@angular/material/badge';


// NgxEchartsModule.forRoot({
//   echarts: () => import('echarts')
// })

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    FilterPipe,
    NavbarComponent,
    RecipeComponent,
    MyRecipesComponent,
    SelectedRecipeComponent,
    NewRecipeComponent,
    FavouritesComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    RecipesComponent,
    StatisticsComponent,
    AdminComponent,
    BadRequestComponent,
    ForbiddenComponent,
    InternalServerErrorComponent,
    NotFoundComponent,
    OfflineComponent,
    UnexpectedErrorComponent,
    UploadImageComponent,
    UpdateProfileComponent,
    FollowersComponent,
    FolloweesComponent,
    SearchByIngredientComponent,
    NotificationMenuComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    MatAutocompleteModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDividerModule,
    MatTableModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    AppRoutingModule,
    MatChipsModule,
    MaterialFileInputModule,
    MatPasswordStrengthModule,
    MatSlideToggleModule,
    MatDialogModule,
     MatBadgeModule,
    // RouterModule.forRoot([
    //   {
    //     path: 'recipes',
    //     component: HomeComponent
    //   },
    //   {
    //     path: 'recipes/:id',
    //     component: RecipeComponent
    //   },
    //   {
    //     path: 'users/:id/recipes',
    //     component: MyRecipesComponent
    //   },
    //   {
    //     path: 'users/:id/recipes/:recipeId',
    //     component: SelectedRecipeComponent
    //   }
    // ]),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
    

  ],
  providers: [
    DataService,
    RecipeService,
    AuthService,
    FavouriteService,
    // ErrorService,
    // NotificationService,
    FilterPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    AuthGuard,
    AdminAuthGuard,
    // {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
