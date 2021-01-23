import { Notification } from './../models/Notification';
import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { NotificationDTO } from '../models/NotificationDTO';
import { NotificationSocketService } from '../services/notification-socket.service';

@Component({
  selector: 'app-notification-menu',
  templateUrl: './notification-menu.component.html',
  styleUrls: ['./notification-menu.component.css']
})
export class NotificationMenuComponent implements OnInit {
  notificationsContainer: NotificationDTO;
  // @Input() isSeen: boolean;

  constructor(private notificationService: NotificationService,
              private notificationSocketService: NotificationSocketService) { }

  ngOnInit(): void {
    this.getAll();

    // Subscribe to socket
    this.notificationSocketService.state$
      .subscribe((value)=> {
        if(value != null && value != '') {
          // get new notification
          this.notificationsContainer.notifications.unshift(value);
          // increase not seen recipes by 1
          this.notificationsContainer.newNotificationsNr++;
        }
      })
  }

  // Get all notifications
  getAll() {
    this.notificationService.getAll()
        .subscribe((data) =>{
          this.notificationsContainer = <NotificationDTO> data;
        })
  }


  // Mark notifications as seen
  markAsSeen() {
    if(this.notificationsContainer.newNotificationsNr > 0) {
      this.notificationsContainer.newNotificationsNr = 0;
      this.notificationService.markAsSeen();

      this.getAll(); // update list to remove class is-seen
    }
  }
}