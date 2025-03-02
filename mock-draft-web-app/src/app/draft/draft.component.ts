import { AfterViewInit, ChangeDetectorRef, Component, computed, effect, inject, OnInit } from '@angular/core';
import { Player } from '../shared/models/player';
import { ApiService } from '../shared/services/api.service';
import { Team } from '../shared/models/team';
import { Pick } from '../shared/models/pick';
import { UserService } from '../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange } from '@angular/material/select';
import { timeout } from 'rxjs';
import { After } from 'v8';
import { UserTipsComponent } from '../shared/dialogs/user-tips/user-tips.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrl: './draft.component.scss'
})
export class DraftComponent implements OnInit{

  public loading = true;
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
  private userIdLastValue = -1;
  public userId = computed(() => {
    if(this.userService.userId() == 0 && this.userIdLastValue != 0) {
      this.setDraftToDefault();
      this.loading = false;
    }
    this.userIdLastValue = this.userService.userId();
    return this.userService.userId();
  })

  constructor(private apiService: ApiService, private userService: UserService, private dialog: MatDialog) {
    effect(() => {
      if(this.userId() > 0) {
        this.setMockDraft();
      }
    })
  }
  
  ngOnInit(): void {
    if(this.userId() == 0 || !this.userId()) {
      this.userService.getUserDataFromToken();
      if(this.userId() == 0) {
        this.loading = false;
      }
    }
  }

  private setMockDraft(): void {
    if(this.userId() != 0) {
      if(this.picks.find(pick => pick != ' ')) {
        this.openUserTips();
      }
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
          this.loading = false;
      })
    }
    else {
      this.setDraftToDefault();
    }
  }

    public openUserTips(): void {
      this.dialog.open(UserTipsComponent, {
        width: '600px',
        data: {title: 'Draft Tips', message: 'This is your 2025 NFL mock draft. Please select a player for each pick. The intent is to correctly guess where the player will be picked, along with the team that will pick them. Trades are also available to correctly predict which team will begin in each slot. These selections will no longer be available 5 minutes prior to the draft taking place. Good luck!'}
      })
    }

  public setDraftToDefault() {
    this.picks = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    this.pickIds = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.tradeTeam1 = '';
    this.tradeTeam2 = '';
    this.tradeTeam1Index = 0;
    this.tradeIsActive = false;
    this.draftOrder = [];
  }

  public setPick(index: number, event: MatSelectChange): void {
    if(event.value) {
      let player = this.players.find(player => player.playerName == event.value);
      if(player) {
        this.picks[index] = player.playerName;
        this.pickIds[index] = player.playerId;
      }
    }
    else {
      this.picks[index] = ' ';
      this.pickIds[index] = 0;
    }
    this.setUsersPlayersDraftOrder();
  }

  public playerAlreadyPicked(pickId: number): boolean {
    return this.pickIds.includes(pickId);
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
    }, err => {
      this.snackBar.open('Unable to Save Selection', 'X', {
        duration: 3000
      })
    });
  }

  public trackByIndex(index: number, item: any) {
    return index;
  }
}