import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService extends DataService {

  constructor(http: HttpClient, private authService: AuthService) { 
    super('http://localhost:90/users/' + authService.currentUser.sub + '/followers', http);
   }
}
