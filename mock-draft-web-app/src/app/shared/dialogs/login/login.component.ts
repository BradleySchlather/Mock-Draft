import { Component, effect, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  //To Do: Create a post login and post account creation success message
  private snackBar = inject(MatSnackBar);
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
      this.confirm();
    }, error => {
      this.snackBar.open('Username or Password Incorrect', 'X', {
        duration: 3000
      });
    });
  }

  public close(): void {
    this.dialogRef.close(false);
  }

  public confirm(): void {
    this.dialogRef.close(true);
  }

}