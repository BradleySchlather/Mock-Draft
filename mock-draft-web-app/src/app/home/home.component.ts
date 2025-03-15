import { computed, Component } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { UserService } from '../shared/services/user.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  //To Do: Force the user to have an alpha, numeric, and special character for password (use chatGPT)
  //To Do: Change Background of each clickable section of the banner on hover
  //To Do: Edit for different screen sizes
  //To Do: Stop showing user tips for big board when the user has already seen it
  //To Do: Add friends for users and allow to see friends big board and draft
  //To Do: Add SSL
  
  //Future: Email user to verify account creation.
  //Future: Allow for resetting password
  //To Do (maybe): Create Default For Player List and put in method called getDefaultPlayerList()
  //To Do (maybe): Add a standard image array from the db when user isn't logged in
  //Future: Add animations for certain things
  //Future: Create a team needs dialog that the user can view by clicking a button in draft component
  //Future: Also need to allow them to make predictions prior to season start, such as SB winner, playoff teams, and other things of the like. NEW COMPONENT CALLED 2025 - 2026 SEASON PREDICTIONS.
  //Future: Create an after the draft endpoint that allows for user to choose from a 1-10 selector of how good the pick was. Will also allow for user to make notes.
  //Future: Need to add a simulator that allows the user to be a team of his choice.
  //Future: Sign in with google
  //Future: Also need to add week by week options to pick who they think will win.
  
  public userId = computed(() => {
    return this.userService.userId();
  })

  public features = [
    { title: 'Mock Drafts', description: 'Create and share your own draft predictions.' },
    { title: 'Game Predictions', description: 'Predict game outcomes and track your accuracy.' },
    { title: 'Community Rankings', description: 'See rankings and insights from other fans.' }
  ];

constructor(private userService: UserService, private router: Router) {}
  

  ngOnInit(): void {
    if(this.userId() == 0 || !this.userId()) {
      this.userService.getUserDataFromToken();
      if(this.userId() == 0) {
      }
    }
  }

  public routeToDraft(): void {
    this.router.navigate(['/draft']);

  }

}