import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends DataService {

  constructor(http: HttpClient) { 
    super('http://localhost:90/recipes', http);
   }
  
}
