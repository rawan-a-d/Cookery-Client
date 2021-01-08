import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';


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

  public getRecipes() {
    // return this.httpClient.get('http://localhost:90/users/' + userId + '/recipes');
    return this.httpClient.get('http://localhost:90/users/' + this.authService.currentUser.sub + '/recipes')
    .pipe(
      map(
        response => response
      )
    )

  }


  public getProfile(id: number) {
    return this.httpClient.get('http://localhost:90/users/' + id + '/profile')
      .pipe(
        map(
          response => response
        )
      )
  }

  public uploadImage(data) {
    return this.httpClient.put('http://localhost:90/users/'+ this.authService.currentUser.sub +'/image', data, 
                {headers : new HttpHeaders({ 'Content-Type': 'multipart/form-data' })}
                )
      .pipe(
        map(
          response => response
        )
      )
  }
}