import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../shared/dialogs/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title: string = "Title Placeholder"

  constructor(private dialog: MatDialog) { }

  public openLogin(): void {
    this.dialog.open(LoginComponent, {
      width: '600px',
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        //To Do: 'Login Successful' Message to user
      }
    })
  }
}

//To Do: Change Background of each clickable section of the banner on hover