import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../models/user';
import { ApiService } from '../../services/api.service';

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

  //To Do: On account creation there will be an active column in the table that will automatically be set to false or 0. 
  //Email user on account creation. This will contain a link to confirm their account.

  constructor(
    private dialogRef: MatDialogRef<SignUpComponent>, private apiService: ApiService) { }

  public close(): void {
    this.dialogRef.close(false);
  }

  public createUser(): void {
    let user: User = {userName: this.userName, email: this.email, password: this.password};
    this.apiService.createUser(user).subscribe(data => {
      //To Do: Create user message that says the account was created. Please login.
      this.confirm();
    })
  }

  public confirm(): void {
    this.dialogRef.close(true);
  }

}