import { Component, OnInit } from '@angular/core';
import { Player } from '../shared/models/player';
import { ApiService } from '../shared/services/api.service';
import { Team } from '../shared/models/team';
import { Pick } from '../shared/models/pick';
import { MatDialog } from '@angular/material/dialog';
import { TradeDialogComponent } from '../shared/dialogs/trade-dialog/trade-dialog.component';
import { TradeDataToDialog } from '../shared/models/trade';

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

  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  //To Do: Setup Trade Dialog

  ngOnInit(): void {
    this.apiService.getPlayers().subscribe(data => {
      this.players = data;
    })
    this.apiService.getTeams().subscribe(data => {
      this.teams = data;
      let indexForPicks = 0;
      this.teams.forEach(element => {
        element.pickNumbers.forEach(pickNumbersElement => {
          if (pickNumbersElement == indexForPicks) {
            this.draftOrder.push(element.name);
            this.imageArr.push(`../../assets/${element.name}Logo.gif`);
          }
          indexForPicks++;
        })
      });
    })
  }

  public openTradeDialog(index: number, teams: Team[] = this.teams) {
    let dataToPass: TradeDataToDialog = { index, teams }
    this.dialog.open(TradeDialogComponent, {
      data: dataToPass
    }).afterClosed().subscribe(confirmed => {
      if (confirmed)
        //To Do: This is where I'll need to get the teams again, which will populate the correct order following the trade
        console.log('Replacement for getting Teams List');
    })
  }

  public onSave(): void {
    //Will use proc to set picks for user in database. proc will be called from .NET backend. When onSave() is called, picks will be sent to database for that user
    //To Do: need to prevent player from being added twice when I call onSave()
  }
}
