import { Component, inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../models/user';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private snackBar = inject(MatSnackBar);
  public title = 'Create Account';
  public errorExists = false;
  public email = '';
  public username = '';
  public password = '';

  //Email user on account creation. This will contain a link to confirm their account.

  constructor(
    private dialogRef: MatDialogRef<SignUpComponent>, private apiService: ApiService) { }

  public close(): void {
    this.dialogRef.close(false);
  }

  public createUser(): void {
    let user: User = {username: this.username, email: this.email, password: this.password};
    this.apiService.createUser(user).subscribe(data => {
      this.confirm();
    })
  }

  public confirm(): void {
    this.dialogRef.close(true);
  }

}