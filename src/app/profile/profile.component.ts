import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { ProfileDTO } from '../models/ProfileDTO';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	profile: ProfileDTO;

	constructor(private userService: UserService,
							private authService: AuthService,
							public dialog: MatDialog) { }

	ngOnInit(): void {
		this.userService.getProfile()
			.subscribe((data) => {
				this.profile = <ProfileDTO>data;
			})
	}


  openDialog(): void {
    const dialogRef = this.dialog.open(UploadImageComponent, {
			width: '50%',
			panelClass: ['custom-modalbox','animate__animated','animate__slideInLeft']
    });
  }	
}