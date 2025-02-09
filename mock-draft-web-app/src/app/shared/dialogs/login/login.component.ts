import { Component, effect, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  //To Do: Create a post login and post account creation success message

  public title = 'Log In';
  public errorExists = false;
  public email = '';
  public password = '';
  private userId = this.userService.userId;
  private hasIdChanged = false;

  constructor(private dialogRef: MatDialogRef<LoginComponent>, private userService: UserService) {
    effect(() => {
      if(this.userId() > 0 && this.hasIdChanged) {
        this.confirm();
      }
    })
  }
  //To Do: Need to add auth

  public logIn(): void {
    this.hasIdChanged = true;
    this.userService.getUserData({ email: this.email, password: this.password});

  }

  public close(): void {
    this.dialogRef.close(false);
  }

  public confirm(): void {
    this.dialogRef.close(true);
  }

}