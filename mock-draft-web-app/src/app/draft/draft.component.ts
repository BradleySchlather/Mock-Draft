import { AfterViewInit, ChangeDetectorRef, Component, computed, effect, inject, OnInit } from '@angular/core';
import { Player } from '../shared/models/player';
import { ApiService } from '../shared/services/api.service';
import { Team } from '../shared/models/team';
import { Pick } from '../shared/models/pick';
import { UserService } from '../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrl: './draft.component.scss'
})
export class DraftComponent implements OnInit {

  public loading = true;
  public positions = ['QB', 'RB', 'OL', 'C', 'TE', 'WR', 'DL', 'LB', 'DB'];
  public players: Player[] = [];
  public teams!: Team[];
  public draftOrder: string[] = [];
  public imageArr: string[] = [];
  public playersNamesOnly: string[] = [];
  public pickIds = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public picks = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  private tradeTeam1 = '';
  private tradeTeam2 = '';
  public tradeTeam1Index = 0;
  public tradeIsActive = false;
  private snackBar = inject(MatSnackBar);
  public userId = computed(() => {
    return this.userService.userId();
  })

  constructor(private apiService: ApiService, private userService: UserService, private cdr: ChangeDetectorRef) {
    effect(() => {
      this.setMockDraft();
      this.loading = false;
    })
  }

  //To Do: will send user to account creation screen if user doesn't have an account

  //To Do: Need to make edits in case user wants to trade with a team that doesn't have first round pick
  
  ngOnInit(): void {
    if(this.userId() == 0 || !this.userId()) {
      this.userService.getUserDataFromToken();
      this.setMockDraft();
    }
    else {
      this.setMockDraft();
    }
  }

  private setMockDraft() {
    if(this.userId() != 0) {
      this.apiService.getMockDraft(this.userId()).subscribe(data => {
        this.players = data.players;
        this.players.forEach(player => {
          this.playersNamesOnly.push(player.playerName);
        })
        this.teams = data.teams;
        for (let i = 0; i < this.picks.length; i++) {
          const player = this.players[this.players.findIndex(x => x.playerId == data.userSelections.playerDraftOrder[i])];
          if (player) {
            this.picks[i] = player.playerName;
            this.pickIds[i] = player.playerId;
          }
          else {
            this.picks[i] = ' ';
            this.pickIds[i]= 0
          }
        }
  
        for (let i = 0; i < data.userSelections.teamsDraftOrder.length; i++) {
          const teamName = this.teams[this.teams.findIndex(x => x.id == data.userSelections.teamsDraftOrder[i])]?.name;
          this.draftOrder[i] = teamName;
          this.imageArr.push(`../../assets/${teamName}Logo.gif`);
        }
      })
    }
    else {
      this.picks = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
      this.pickIds = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.tradeTeam1 = '';
      this.tradeTeam2 = '';
      this.tradeTeam1Index = 0;
      this.tradeIsActive = false;
      this.imageArr = [];
      this.draftOrder = [];
    }
  }

  public setPick(index: number, event: MatSelectChange): void {
     let player = this.players.find(player => player.playerName == event.value);
     if(player) {
      this.picks[index] = player.playerName;
      this.pickIds[index] = player.playerId;
      this.setUsersPlayersDraftOrder();
      this.cdr.detectChanges();
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
    })
    this.apiService.setUsersTeams({ playersOrTeams: teamIdsInOrder.toString(), userId: this.userId()}).subscribe(data => {
      this.snackBar.open('Trade Saved', 'X', {
        duration: 3000
      });
    }, err => {this.snackBar.open('Unable to Save Trade')})
  }

  public setUsersPlayersDraftOrder(): void {
    this.apiService.setUsersPlayersDraftOrder({ playersOrTeams: this.pickIds.toString(), userId: this.userId()}).subscribe(data => {
      this.snackBar.open('Selection Saved', 'X', {
        duration: 3000
      });
    }, err => {this.snackBar.open('Unable to Save Selection')})
  }

  public trackByIndex(index: number, item: any) {
    return index;
  }
}