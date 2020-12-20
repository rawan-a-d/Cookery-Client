import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	constructor(private router: Router,
							private route: ActivatedRoute
		) { }

	ngOnInit(): void {
	}


	onSelected() {
		
		// change route
		this.router.navigate(['statistics'], {relativeTo: this.route});
	
	}


	onTabChanged(event: MatTabChangeEvent): void {
		switch (event.index) {
			case 0: // index of the tab
				// this is our stub tab for link
				this.router.navigate(['statistics'], {relativeTo: this.route});
				break;
			case 1:
				this.router.navigate(['users'], {relativeTo: this.route});
				break;
			case 2:
				this.router.navigate(['recipes'], {relativeTo: this.route});
				break;
		}
	}

}
