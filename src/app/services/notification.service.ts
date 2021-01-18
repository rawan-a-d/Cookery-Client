import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Recipe } from '../models/Recipe';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable({
	providedIn: 'root'
})
export class NotificationService extends DataService {

	constructor(private httpClient: HttpClient, 
							private authService: AuthService) {
    super('http://localhost:90/users/' + authService.currentUser?.sub + '/notifications', httpClient);
	}

	// userId
	markAsSeen() {
		this.httpClient.put('http://localhost:90/users/' + this.authService.currentUser?.sub + '/notifications/seen', {})
			.subscribe();
	}
}
