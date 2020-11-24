import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService {
  // url = "http://localhost:90/users";

  constructor(private httpClient: HttpClient, private authService: AuthService) { 
    super('http://localhost:90/users', httpClient)
  }

  // public getUsers(){
  //   return this.httpClient.get(this.url);
  // }

  public getRecipes(userId: number) {
    // return this.httpClient.get('http://localhost:90/users/' + userId + '/recipes');
    return this.httpClient.get('http://localhost:90/users/' + this.authService.currentUser.sub + '/recipes');

  }
}