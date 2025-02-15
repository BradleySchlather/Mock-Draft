import { AfterViewInit, Component, computed, effect, inject, OnInit } from '@angular/core';
import { Player } from '../shared/models/player';
import { ApiService } from '../shared/services/api.service';
import { Team } from '../shared/models/team';
import { Pick } from '../shared/models/pick';
import { UserService } from '../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrl: './draft.component.scss'
})
export class DraftComponent implements AfterViewInit {


  public positions = ['QB', 'RB', 'OL', 'C', 'TE', 'WR', 'DL', 'LB', 'DB'];
  public players: Player[] = [];
  public teams!: Team[];
  public draftOrder: string[] = [];
  public imageArr: string[] = [];
  public playersNamesOnly: string[] = [];
  public picks = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  private tradeTeam1 = '';
  private tradeTeam2 = '';
  public tradeTeam1Index = 0;
  public tradeIsActive = false;
  private snackBar = inject(MatSnackBar);
  public userId = computed(() => {
    return this.userService.userId();
  })

  constructor(private apiService: ApiService, private userService: UserService) {
  }

  //To Do: will send user to account creation screen if user doesn't have an account

  //To Do: Need to make edits in case user wants to trade with a team that doesn't have first round pick
  
  ngAfterViewInit(): void {
    if(this.userId() != 0) {
      this.apiService.getMockDraft(this.userId()).subscribe(data => {
        this.players = data.players;
        this.players.forEach(player => {
          this.playersNamesOnly.push(player.playerName);
        })
        this.teams = data.teams;
        for (let i = 0; i < this.picks.length; i++) {
          const playerName = this.players[this.players.findIndex(x => x.playerId == data.userSelections.playerDraftOrder[i])]?.playerName;
          playerName == undefined ? this.picks[i] = '' : this.picks[i] = playerName;
        }
  
        for (let i = 0; i < data.userSelections.teamsDraftOrder.length; i++) {
          const teamName = this.teams[this.teams.findIndex(x => x.id == data.userSelections.teamsDraftOrder[i])]?.name;
          this.draftOrder[i] = teamName;
          this.imageArr.push(`../../assets/${teamName}Logo.gif`);
        }
      })
    }
    else {
      this.picks = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
      this.tradeTeam1 = '';
      this.tradeTeam2 = '';
      this.tradeTeam1Index = 0;
      this.tradeIsActive = false;
      this.imageArr = [];
      this.draftOrder = [];
    }
  }

  public trade(index: number): void {
    if (this.tradeTeam1 == '') {
      this.tradeTeam1 = this.draftOrder[index];
      this.tradeTeam1Index = index;
      this.tradeIsActive = true;
    }
    else {
      this.tradeTeam2 = this.draftOrder[index];
      this.draftOrder[index] = this.tradeTeam1;
      this.imageArr[index] = `../../assets/${this.tradeTeam1}Logo.gif`
      this.draftOrder[this.tradeTeam1Index] = this.tradeTeam2;
      this.imageArr[this.tradeTeam1Index] = `../../assets/${this.tradeTeam2}Logo.gif`;
      this.tradeTeam1 = '';
      this.tradeIsActive = false;
      this.setUsersTeamsDraftOrder();
    }
  }

  public setUsersTeamsDraftOrder(): void {
    let teamIdsInOrder: string[] = [];
    this.draftOrder.forEach(teamName => {
      teamIdsInOrder.push(this.teams.find(team => team.name == teamName)?.id.toString() || '');
      console.log(teamIdsInOrder)
    })
    this.apiService.setUsersTeams({ playersOrTeams: teamIdsInOrder.toString(), userId: this.userId()}).subscribe(data => {
      this.snackBar.open('Trade Saved');
    }, err => {this.snackBar.open('Unable to Save Trade')})
  }

  public setUsersPlayersDraftOrder(): void {
    this.apiService.setUsersPlayersDraftOrder({ playersOrTeams: this.picks.toString(), userId: this.userId()}).subscribe(data => {
      this.snackBar.open('Selection Saved')
    }, err => {this.snackBar.open('Unable to Save Selection')})
  }
}