import { Component, computed, effect, inject, Input, OnInit, Signal, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../shared/dialogs/login/login.component';
import { SignUpComponent } from '../shared/dialogs/sign-up/sign-up.component';
import { UserService } from '../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  @Input() title: string = "Title Placeholder";
  private snackBar = inject(MatSnackBar);
  public userService = inject(UserService);
  public userId = computed(() => {
    return this.userService.userId();
  })
  public username = computed(() => {
    return this.userService.username();
  })
  
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    setTimeout(() => {
      if(this.userId() == 0) {
        this.openLogin();
      }
    }, 300);
  }
  public logout(): void {
    this.userService.logout();
    this.openLogin();
  }

  public openLogin(): void {
    this.dialog.open(LoginComponent, {
      width: '600px',
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.snackBar.open('Successfully Logged In', 'X', {
          duration: 5000
        });
      }
    })
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
}
