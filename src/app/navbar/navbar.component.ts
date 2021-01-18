import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationMenuComponent } from '../notification-menu/notification-menu.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild(NotificationMenuComponent)
  notificationMenuComponent: NotificationMenuComponent;

  constructor(public authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    
    this.router.navigate(['login'])
  }

}
