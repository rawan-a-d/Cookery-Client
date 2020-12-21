import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
	links = [
		{
			url: '/admin/statistics',
			name: 'Statistics',
			icon: 'insert_chart'
		},
		{
			url: '/admin/users',
			name: 'Users',
			icon: 'people_alt'
		},
		{
			url: '/admin/recipes',
			name: 'Recipes',
			icon: 'local_pizza'
		}
	]

	activeLink = localStorage.getItem("admin-current-page") ? localStorage.getItem("admin-current-page") : this.links[0].url;

	constructor(private router: Router,
							private route: ActivatedRoute
		) { }

	ngOnInit(): void {
		this.router.navigate([this.activeLink], {relativeTo: this.route});
	}


	// onTabChanged(event: MatTabChangeEvent): void {
	// 	console.log("index " + event.index)
	// 	switch (event.index) {
	// 		case 0: // index of the tab
	// 			// this is our stub tab for link
	// 			this.router.navigate(['statistics'], {relativeTo: this.route});
	// 			break;
	// 		case 1:
	// 			this.router.navigate(['users'], {relativeTo: this.route});
	// 			break;
	// 		case 2:
	// 			this.router.navigate(['recipes'], {relativeTo: this.route});
	// 			break;
	// 	}
	// }


	activatePage(link) {
		this.activeLink = link;

		localStorage.setItem("admin-current-page" , link);
	}

	ngOnDestroy() {
		localStorage.removeItem("admin-current-page");

	}
}
