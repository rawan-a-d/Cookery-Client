import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../models/Recipe';
import { finalize, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends DataService {
  // private url = 'http://localhost:90/recipes';

  constructor(http: HttpClient) { 
    super('http://localhost:90/recipes', http);
   }
  
   
   override
   get(id: any) {
    return this.http.get('http://localhost:90/recipes' + '/v1/' + id)
      .pipe(
        map(
          response => response
        )
      )
  }

  // curl -H “Accepts-version: 1.0”
  getRecipeFollow(id: any) {
    return this.http.get('http://localhost:90/recipes' + '/v2/' + id)
      .pipe(
        map(
          response => response
        )
      )
  }
  
}
