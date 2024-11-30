import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public title = 'Log In';
  public errorExists = false;
  public userName = '';
  public password = '';


  constructor(
    private dialogRef: MatDialogRef<LoginComponent>) { }

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