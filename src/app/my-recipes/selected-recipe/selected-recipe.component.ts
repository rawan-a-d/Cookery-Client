import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';

@Component({
  selector: 'app-selected-recipe',
  templateUrl: './selected-recipe.component.html',
  styleUrls: ['./selected-recipe.component.css']
})
export class SelectedRecipeComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
