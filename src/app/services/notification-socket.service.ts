import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Recipe } from '../models/Recipe';

const WS_ENDPOINT = 'ws://localhost:90/ws/notification'

@Injectable({
  providedIn: 'root'
})
export class NotificationSocketService {
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
		console.log("SOCKET conn "+ this.socket$)
    // if no socket or closed
    if (!this.socket$ || this.socket$.closed) {
			console.log("Previous socket " + this.socket$)
      // create socket
      this.socket$ = NotificationSocketService.getNewWebSocket() as WebSocketSubject<any>;
			console.log("SOCKET post conn "+ this.socket$)

      // subscribe to receive messages from server
      this.socket$.subscribe(
        // Called whenever there is a message from the server
        // when message is received
        msg => this.populateMessage(msg),
        
        // Called if WebSocket API signals some kind of error
        // when an exception is received
        err => {
          console.log('getting error');
          console.log(err);
        },

        // Called when connection is closed (for whatever reason)
        // when disconnect
        () => {
          console.log('complete');
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
		console.log('message received: ' + message);
		console.log(notification);
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
    console.log('message: ' + msg);
    this.socket$.next(msg);
  }


  public close(): void {
		console.log("Socket close " + this.socket$);
    if(this.socket$ != undefined) {
			this.socket$.complete();
		} 
  }

}
