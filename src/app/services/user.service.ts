import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService {
  // url = "http://localhost:90/users";

  constructor(private httpClient: HttpClient) { 
    super('http://localhost:90/users', httpClient)
  }

  // public getUsers(){
  //   return this.httpClient.get(this.url);
  // }

  public getRecipes(userId: number) {
    return this.httpClient.get('http://localhost:90/users/' + userId + '/recipes')
  }
}
