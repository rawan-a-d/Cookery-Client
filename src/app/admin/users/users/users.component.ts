import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
	users: User[];

	constructor(private userService: UserService) { }

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


		// Delete recipe
		delete(userId: number): void {
			this.userService.delete(userId)
				.subscribe(() => {    
					this.getUsers();
				});
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
}