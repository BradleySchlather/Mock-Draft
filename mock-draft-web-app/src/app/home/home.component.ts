import { Component } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  //To Do: Stop loading when there is no userId for each component.
  //To Do: Add a standard image array from the db when user isn't logged.
  //To Do: Will send user to account creation screen if user doesn't have an account.
  //To Do: Add Drag and Drop Icon to playerlist.
  //To Do: Change Background of each clickable section of the banner on hover.
  //To Do: Create an after the draft endpoint that allows for user to choose from a 1-10 selector of how good the pick was. Will also allow for user to make notes.
  //To Do: I need to check the way I'm copying objects. Currently using soft copies which could lead to issues in future.
  //To Do: Need to add a simulator that allows the user to be a team of his choice.
  //To Do: Also need to add week by week options to pick who they think will win.
  //To Do: Also need to allow them to make predictions prior to season start, such as SB winner, playoff teams, and other things of the like.
  //To Do: Add links to other websites that have data about players.
  //To Do: Add an option to upgrade the user's account for a small subscription fee.
}