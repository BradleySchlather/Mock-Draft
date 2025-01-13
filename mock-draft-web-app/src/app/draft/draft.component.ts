import { Component, OnInit } from '@angular/core';
import { Player } from '../shared/models/player';
import { ApiService } from '../shared/services/api.service';
import { Team } from '../shared/models/team';
import { Pick } from '../shared/models/pick';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrl: './draft.component.scss'
})
export class DraftComponent implements OnInit {


  public positions = ['QB', 'RB', 'OL', 'C', 'TE', 'WR', 'DL', 'LB', 'DB'];
  public players: Player[] = [];
  public teams!: Team[];
  public draftOrder: string[] = [];
  public imageArr: string[] = [];
  public picks = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  private tradeTeam1 = '';
  private tradeTeam2 = '';
  public tradeTeam1Index = 0;
  public tradeIsActive = false;

  constructor(private apiService: ApiService) { }

  //Option: Ensure save button populates on the bottom of the page and stays there as the user scrolls when user makes a change

  //To Do Right Now: alter below code to pull data from the database
  //Need to make edits in case user wants to trade with a team that doensn't have first round pick
  ngOnInit(): void {
    // this.apiService.getPlayers().subscribe(data => {
    //   this.players = data;
    // })
    //change argument to get from actual userId
    this.apiService.getMockDraft(1).subscribe(data => {
      debugger;
      //To Do Right Now: Assign data to variables and get component setup
    })
    // this.apiService.getTeams().subscribe(data => {
    //   this.teams = data;
    //   let indexForPicks = 0;
    //   this.teams.forEach(element => {
    //     element.pickNumbers.forEach(pickNumber => {
    //       if (pickNumber== indexForPicks) {
    //         this.draftOrder.push(element.name);
    //         this.imageArr.push(`../../assets/${element.name}Logo.gif`);
    //       }
    //       indexForPicks++;
    //     })
    //   });
    // })
  }



  public trade(index: number) {
    if (this.tradeTeam1 == '') {
      this.tradeTeam1 = this.draftOrder[index];
      this.tradeTeam1Index = index;
      this.tradeIsActive = true;
    }
    else {
      this.tradeTeam2 = this.draftOrder[index];
      this.draftOrder[index] = this.tradeTeam1;
      this.draftOrder[this.tradeTeam1Index] = this.tradeTeam2;
      this.tradeTeam1 = '';
      this.tradeIsActive = false;
    }
  }

  public onSave(): void {
    //Will use proc to set picks for user in database. proc will be called from .NET backend. When onSave() is called, picks will be sent to database for that user
    //To Do: Ensure I capture all data for trades too
    //To Do: need to prevent player from being added twice when I call onSave()
    //To Do: will send user to account creation screen if user doesn't have an account
  }
}