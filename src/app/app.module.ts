import { RecipeService } from './services/recipe.service';
import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
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
    NewRecipeComponent
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
    FlexLayoutModule,

    RouterModule.forRoot([
      {
        path: 'recipes',
        component: HomeComponent
      },
      {
        path: 'recipes/:id',
        component: RecipeComponent
      },
      {
        path: 'users/:id/recipes',
        component: MyRecipesComponent
      }
    ]),

  ],
  providers: [
    DataService,
    RecipeService,
    FilterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
