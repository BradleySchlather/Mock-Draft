import { Component } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  //To Do: Add a standard image array from the db when user isn't logged in.
  //To Do: Create Default For Player List and put in method called getDefaultPlayerList()
  //To Do: Will send user to account creation screen if user doesn't have an account.
  //To Do: Create a team needs dialog that the user can view by clicking a button in draft component
  //To Do: Add Drag and Drop Icon to playerlist.
  //To Do: Change Background of each clickable section of the banner on hover.
  //To Do: Add SSL To backend
  //To Do: Need to add a simulator that allows the user to be a team of his choice.
  //To Do: Create an after the draft endpoint that allows for user to choose from a 1-10 selector of how good the pick was. Will also allow for user to make notes.
  //To Do: Also need to allow them to make predictions prior to season start, such as SB winner, playoff teams, and other things of the like. NEW COMPONENT CALLED 2025 - 2026 SEASON PREDICTIONS.
  
  //Future: Sign in with google
  //Future: Also need to add week by week options to pick who they think will win.
}