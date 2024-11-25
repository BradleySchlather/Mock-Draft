import { Component } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  //To Do: Need to add a login.
  //To Do: I need to check the way I'm copying objects. Currently using soft copies which could lead to issues in future.
  //To Do: Need to add a simulator that allows the user to be a team of his choice.
  //To Do: Add an option to upgrade the user's account for a small subscription fee.
  //To Do: Also need to add week by week options to pick who they think will win.
  //To Do: Also need to allow them to make predictions prior to season start, such as SB winner, playoff teams, and other things of the like.
}