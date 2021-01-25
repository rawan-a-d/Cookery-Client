import { Component } from '@angular/core';
import { NotificationService } from './services/notification.service';
import {NotificationSocketDTO} from './models/NotificationSocketDTO';
import { AuthService } from './services/auth.service';
import { NotificationSocketService } from './services/notification-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NotificationSocketService]
})
export class AppComponent {
  title = 'CookeryAppClient';
  sentMessage;
  // list of messages
  receivedMessages: Array<NotificationSocketDTO> = [];

  constructor(private notificationSocketService: NotificationSocketService, 
            private authService: AuthService) {
      if(this.authService.isLoggedIn()) {
        // Connect to server when client starts the application
        this.notificationSocketService.connect();
    
        // Subscribe to state to get updated of new mesages
        // When message is received from the server
        notificationSocketService.getState().subscribe((msg) => {
          // add the new message on top on the collection, so start of the array
          this.receivedMessages.unshift({text: msg});
        });
      }

  }


  // Send message
  sendMessage(): void {
    // this.notificationService.sendMessage(this.sentMessage);
    let notification = new NotificationSocketDTO(this.sentMessage)
    this.notificationSocketService.sendMessage(notification);

  }


  // Disconnect from the server/ close communication
  disconnect(): void {
    this.notificationSocketService.close();
  }


  // Connect to the server/ open communication
  connect(): void {
    this.notificationSocketService.connect();
  }
}
