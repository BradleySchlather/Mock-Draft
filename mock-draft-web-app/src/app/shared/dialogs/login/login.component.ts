import { Component, computed, effect, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private snackBar = inject(MatSnackBar);
  public title = 'Log In';
  public errorExists = false;
  public email = '';
  public password = '';
  private hasIdChanged = false;
  
  private userId = computed(() => {
    if (this.userService.userId() > 0) {
      this.close();
    }
    return this.userService.userId();
  })

  constructor(private dialogRef: MatDialogRef<LoginComponent>, private userService: UserService, private authService: AuthService, private dialog: MatDialog) {
    effect(() => {
      if(this.userId() > 0 && this.hasIdChanged) {
        this.confirm();
      }
    })
  }

  public logIn() {
    this.authService.login(this.email, this.password).subscribe(response => {
      this.userService.getUserData({email: this.email, password: this.password});
      this.confirm();
    }, error => {
      this.snackBar.open('username or Password Incorrect', 'X', {
        duration: 3000
      });
    });
  }

  public openCreateAccount(): void {
    this.dialog.open(SignUpComponent, {
      width: '600px',
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.snackBar.open('Account Successfully Created - Please Sign In', 'X', {
          duration: 5000
        });
      }
    })
  }

  public close(): void {
    this.dialogRef.close(false);
  }

  public confirm(): void {
    this.dialogRef.close(true);
  }

}