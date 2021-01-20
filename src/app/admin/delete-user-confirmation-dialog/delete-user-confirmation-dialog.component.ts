import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user-confirmation-dialog',
  templateUrl: './delete-user-confirmation-dialog.component.html',
  styleUrls: ['./delete-user-confirmation-dialog.component.css']
})
export class DeleteUserConfirmationDialogComponent implements OnInit {
  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<DeleteUserConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log("Data " + data.user)
    }

  onNoClick(): void {
    // Close dialog
    this.dialogRef.close();
  }


  delete() {
    // Delete connection
    this.userService.delete(this.data.user.id)
      .subscribe();

    // Close dialog
    this.dialogRef.close();
  }

  
}
