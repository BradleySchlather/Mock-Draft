import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TradeDataToDialog } from '../../models/trade';
import { ApiService } from '../../services/api.service';
import { Team } from '../../models/team';


@Component({
  selector: 'app-trade-dialog',
  templateUrl: './trade-dialog.component.html',
  styleUrl: './trade-dialog.component.scss'
})
export class TradeDialogComponent {

  constructor(private dialog: MatDialogRef<TradeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: TradeDataToDialog, private apiService: ApiService) { }

  public team1: string = '';
  public team2: string = '';
  public teams: Team[] = [];

  public closeDialog(bool: boolean): void {
    this.dialog.close(bool);
  }

  public addTrade(): void {

  }

}
