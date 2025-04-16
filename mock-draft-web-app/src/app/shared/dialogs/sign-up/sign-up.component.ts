import { Component, inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { User } from '../../models/user';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public passwordForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<SignUpComponent>, private apiService: ApiService, private fb: FormBuilder) {
      this.passwordForm = this.fb.group({
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
          ]
        ]
      });
    }

  public close(): void {
    this.dialogRef.close(false);
  }

  public createUser(): void {
    let user: User = {username: this.username, email: this.email, password: this.passwordForm.get('password')?.value};
    this.apiService.createUser(user).subscribe(data => {
      this.confirm();
    })
  }

  public get passwordControl() {
    return this.passwordForm.get('password');
  }

  public confirm(): void {
    this.dialogRef.close(true);
  }

}