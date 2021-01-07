import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileDTO } from 'src/app/models/ProfileDTO';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  profile: ProfileDTO;

  form = new FormGroup(
    {
      name: new FormControl('', 
        [
          Validators.required,
          Validators.minLength(5),
        ]),
      email: new FormControl('', 
        [
          Validators.required, 
          Validators.email
        ]),
      // password: new FormControl('', 
      //   Validators.required
      // ),
      // confirmPassword: new FormControl('', 
      //   Validators.required
      // ),
    
    },
    // PasswordValidators.passwordsShouldMatch
  );

  constructor(
    public dialogRef: MatDialogRef<UpdateProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private authService: AuthService) {
      this.profile = data.profile;
  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
  }


  get name () {
    return this.form.get('name');
  }

  get email () {
    return this.form.get('email');
  }

  get password () {
    return this.form.get('password');
  }

  get confirmPassword () {
    return this.form.get('confirmPassword');
  }

  updateProfile() {
    // send to backend
    let id = this.profile.user.id;
    let name = this.profile.user.name;
    let email = this.profile.user.email;

    let user = new User(id, name, email);

    this.userService.update(user)
      .subscribe(() => {
        this.dialogRef.close([]);
      });
  }

  
}
