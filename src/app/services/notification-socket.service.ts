import { Injectable, OnInit } from '@angular/core';
import { AngularFaviconService } from 'angular-favicon';
import { BehaviorSubject, Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Recipe } from '../models/Recipe';
import { TitleBlinkerService } from './title-blinker.service';

const WS_ENDPOINT = 'ws://localhost:90/ws/notification'

@Injectable({
  providedIn: 'root'
})
export class NotificationSocketService {
  constructor(private titleBlinkerService: TitleBlinkerService,
            private ngxFavicon: AngularFaviconService) {

  }

  // OBSERVABLES
  // socket of current client, allows client to connect, send message, stop or unsubscribe...
  private socket$: WebSocketSubject<any>;
  // let modules and sercies communicate with each other
  public state$ = new BehaviorSubject<any>('');


  // Return new instance of the web socket and specify the url/end point
  private static getNewWebSocket(): WebSocketSubject<any> {
    return webSocket(WS_ENDPOINT);
  }


  // Connect to service, declare availability and interest
  // if there's no previous connection
  public connect(): void {
    // if no socket or closed
    if (!this.socket$ || this.socket$.closed) {
      // create socket
      this.socket$ = NotificationSocketService.getNewWebSocket() as WebSocketSubject<any>;

      // subscribe to receive messages from server
      this.socket$.subscribe(
        // Called whenever there is a message from the server
        // when message is received
        (msg) => {
          this.populateMessage(msg);

          // Handle browser tab notification
          // 1. blink tab with message
          this.titleBlinkerService.blink('Cookery Notification');
          // 2. Change icon to notification bell
          this.ngxFavicon.setFavicon('assets/notification.gif');
        },
        
        // Called if WebSocket API signals some kind of error
        // when an exception is received
        err => {
          console.log(err);
        },

        // Called when connection is closed (for whatever reason)
        // when disconnect
        () => {
          this.socket$ = null;
        }
      );
    }
  }


  // show message
  private populateMessage(message: any): void{
    if (!this.socket$){
      return;
		}
		let notification = <Notification>message;

    // pass message to next method, to inform any module interested in the change
    this.state$.next(message);
  }


  // get state observable
  public getState(): Observable<string>{
    return this.state$.asObservable();
  }


  // send message to server
  public sendMessage(msg: any): void {
    if (!this.socket$){
      return;
    }
    this.socket$.next(msg);
  }


  public close(): void {
    if(this.socket$ != undefined) {
			this.socket$.complete();
		} 
  }

}