import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-upload-image',
	templateUrl: './upload-image.component.html',
	styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
	uploadForm: FormGroup;
	image : string;
	imageError: string;

	constructor(
		public dialogRef: MatDialogRef<UploadImageComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private formBuilder: FormBuilder,
		private userService: UserService) {}


	ngOnInit(): void {    
		this.uploadForm = this.formBuilder.group({
			image: ['', Validators.required]
		});
	}


	onNoClick(): void {
		this.dialogRef.close();
	}


	onFileSelect(event) {
		const file = event.target.files[0];

		if (event.target.files.length > 0 && /\.(jpe?g|png|gif|bmp)$/i.test(file.name) ) {
			const file = event.target.files[0];
			this.uploadForm.get('image').setValue(file);
			
			var reader = new FileReader();
			reader.onload = (event: any) => {
				this.image = event.target.result;
			}

			reader.readAsDataURL(event.target.files[0]);
			this.imageError = '';
		}
		else {
			this.image = '';
			this.imageError = 'Image is invalid';
		}
	}


	submitImage() {
		const formData = new FormData();
		formData.append('file', this.uploadForm.get('image').value);
	
		this.userService.uploadImage(formData).subscribe(()=> {
			this.dialogRef.close([]);
		});
	}
}
