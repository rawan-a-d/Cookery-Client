import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:90/users";

  constructor(private httpClient: HttpClient) { }

  public getUsers(){
    return this.httpClient.get(this.url);
  }

  public getRecipes(userId: number) {
    return this.httpClient.get(this.url + '/' + userId + '/recipes')
  }
}
