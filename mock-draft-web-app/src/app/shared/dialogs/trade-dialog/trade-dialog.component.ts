import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TradeDataToDialog } from '../../models/trade';
import { ApiService } from '../../services/api.service';
import { Team } from '../../models/team';


@Component({
  selector: 'app-trade-dialog',
  templateUrl: './trade-dialog.component.html',
  styleUrl: './trade-dialog.component.scss'
})
export class TradeDialogComponent implements OnInit {

  constructor(private dialog: MatDialogRef<TradeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: TradeDataToDialog, private apiService: ApiService) { }

  public team1Name: string = ''
  public team2Name: string = '';
  public teams: Team[] = [];

  ngOnInit(): void {
    this.teams = this.data.teams;
    this.team1Name = this.teams[this.data.index].name;
  }

  public closeDialog(bool: boolean): void {
    this.dialog.close(bool);
  }

  public addTrade(): void {
    //To Do: API Service Call to add the trade
    //To Do: Ensure I cover all bases once the trade is made, i.e. remove that pick from the previous team and ensure it isn't there for the current team.
  }

}
