import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService extends DataService{

  constructor(private httpClient: HttpClient, private authService: AuthService) { 
    super('http://localhost:90/users/' + authService.currentUser?.sub + '/favourites', httpClient)
  }

  // public getFavouriteRecipes() {
  //   return this.httpClient.get('http://localhost:90/users/' + this.authService.currentUser.sub + '/favourites');
  // }

  // public addFavourite() {
  //   this.httpClient.post('http://localhost:90/users/' + this.authService.currentUser.sub + '/favourites', resource);
  // }

  // public removeFavourite() {

  // }
}
