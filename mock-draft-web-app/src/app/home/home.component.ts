import { Component } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  //To Do: Force the user to have an alpha, numeric, and special character
  //To Do: Same player not allowed to be chosen in draft component
  //To Do: Create a team needs dialog that the user can view by clicking a button in draft component
  //To Do: Change Background of each clickable section of the banner on hover
  //To Do: Add friends for users and allow to see friends big board and draft
  //To Do: Stop showing user tips for big board when the user has already seen it
  //To Do: Add SSL To backend
  //To Do: Email user on account creation. This will contain a link to confirm their account.
  //To Do: Https?
  //To Do: Edit for different screen sizes
  
  //To Do (maybe): Create Default For Player List and put in method called getDefaultPlayerList()
  //To Do (maybe): Add a standard image array from the db when user isn't logged in
  
  //Future: Also need to allow them to make predictions prior to season start, such as SB winner, playoff teams, and other things of the like. NEW COMPONENT CALLED 2025 - 2026 SEASON PREDICTIONS.
  //Future: Create an after the draft endpoint that allows for user to choose from a 1-10 selector of how good the pick was. Will also allow for user to make notes.
  //Future: Need to add a simulator that allows the user to be a team of his choice.
  //Future: Sign in with google
  //Future: Also need to add week by week options to pick who they think will win.
}