import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { ProfileDTO } from '../models/ProfileDTO';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	profile: ProfileDTO;
	currentUserId = this.authService.userId;
	userId;

	constructor(private userService: UserService,
							public authService: AuthService,
							public dialog: MatDialog,
							public route: ActivatedRoute) { }


	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			this.userId = params.get("id")

			this.getProfile();
		})
	}

	getProfile() {
		this.userService.getProfile(this.userId)
			.subscribe((data) => {
				this.profile = <ProfileDTO>data;
			})
	}

	// Upload Image
	openDialog(): void {
		const dialogRef = this.dialog.open(UploadImageComponent, {
				width: '50%',
				panelClass: ['custom-modalbox','animate__animated','animate__slideInLeft']
		});
	}	



  // Update Profile
  openUpdateProfileDialog(): void {
	const dialogRef = this.dialog.open(UpdateProfileComponent, {
	  width: '35%',
	  data: {profile: this.profile}
	});

	dialogRef.afterClosed().subscribe(result => {
	  console.log('The dialog was closed');
	});
  }
}