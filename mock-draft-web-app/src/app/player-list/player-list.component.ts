import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Player } from '../shared/models/player';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { ApiService } from '../shared/services/api.service';
import { debug } from 'console';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss'
})
export class PlayerListComponent implements OnInit {

  //To Do: Allow user to drag and drop to change the player list
  //To Do: Have a Bust Option. Could be a button or a select that has other options in it
  //To Do: Add a Freshman to Senior column that also indicates if player has been redshirted. See what cfb25 calls it
  //To Do: 

  public loading = true;
  public players: Player[] = [];
  public displayedColumns: String[] = ['rank', 'playerName', 'position', 'heightWeight', 'college'];
  public dataSource = new MatTableDataSource(this.players);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild("tableContainer", { read: ElementRef }) tableContainer!: ElementRef;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getPlayers().subscribe(data => {
      this.players = data;
      this.setDataSource(this.players)
    })
  }

  private setDataSource(data: Player[]): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  drop(event: CdkDragDrop<any[], any[], any>) {
    moveItemInArray(this.players, event.previousIndex, event.currentIndex);
    let rank = 1;
    this.players.forEach(element => {
      element.rank = rank;
      rank++
    });
    this.setDataSource(this.players);
  }

  //To Do: Need a save button and onSave() function that sends the list of player names as a string to the api and database to a separate table that holds all user predictions. One
  //column will be userId, one will be players as a string, one will be draft picks
  //To Do: Will need to pull the list
}
