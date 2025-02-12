import { Component, effect, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

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

  constructor(private dialogRef: MatDialogRef<LoginComponent>, private userService: UserService, private authService: AuthService) {
    effect(() => {
      if(this.userId() > 0 && this.hasIdChanged) {
        this.confirm();
      }
    })
  }

  public logIn() {
    this.authService.login(this.email, this.password).subscribe(response => {
      alert("Login successful");
    }, error => {
      alert("Login failed");
    });
  }

  public close(): void {
    this.dialogRef.close(false);
  }

  public confirm(): void {
    this.dialogRef.close(true);
  }

}