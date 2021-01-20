import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { DeleteUserConfirmationDialogComponent } from '../delete-user-confirmation-dialog/delete-user-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
	users: User[];

	constructor(private userService: UserService, 
				private dialog: MatDialog) { }

	ngOnInit(): void {
		this.getUsers();
	}

	getUsers() {
		this.userService.getAll()
			.subscribe((data) => {
				console.log(data);
				this.users = <User[]>data;
				console.log(this.users);
			})
	}

	makeAdmin(user: User): void {
		user.role = 'admin';
		this.userService.update(user)
			.subscribe(() => {    
				this.getUsers();
			});
	}

	makeUser(user: User): void {
		user.role = 'user';
		this.userService.update(user)
			.subscribe(() => {    
				this.getUsers();
			});
	}



	// DELETE USER DIALOG
	openDialog(user: User): void {
		const dialogRef = this.dialog.open(DeleteUserConfirmationDialogComponent, {
			maxWidth: '40%',
			width: '20%',
			data: {user: user}
		});
	
		dialogRef.afterClosed()
			.subscribe(() => {
				this.getUsers();  
			});
	}
}