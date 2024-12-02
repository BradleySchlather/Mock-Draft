import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  public title = 'Create Account';
  public errorExists = false;
  public email = '';
  public userName = '';
  public password = '';

  constructor(
    private dialogRef: MatDialogRef<SignUpComponent>) { }
  //To Do: Need to add auth

  public logIn(): void {
    //To Do: login logic
  }

  public close(): void {
    this.dialogRef.close(false);
  }

  public confirm(): void {
    this.dialogRef.close(true);
  }
}
