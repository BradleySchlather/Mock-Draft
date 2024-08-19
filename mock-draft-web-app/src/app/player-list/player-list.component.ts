import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Player } from '../shared/models/player';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { ApiService } from '../shared/services/api.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss'
})
export class PlayerListComponent implements OnInit {

  //Currently working on: Need to find how to adjust rankings for players when filtering
  //To Do: Have a Bust Option. Could be a button or a select that has other options in it. Should make the background of that element red
  //To Do: Have a Gem Option. Button that changes the background to green. Need to have a player notes section where the user can add notes about the player
  //To Do: Add a Freshman to Senior column that also indicates if player has been redshirted. See what cfb25 calls it
  //To Do: Add links to other websites that have data about players
  //To Do: Filter by position only. Will need to use the main dataSource to switch users being selected by overall but I will also need to move around the filterData so that it reflects
  //the proper rank when still sorting, but I won't send that rank to the database

  public loading = true;
  public positionSelected = 'All Pos';
  public masterPlayers: Player[] = [];
  public filterPlayers: Player[] = [];
  public displayedColumns: string[] = ['rank', 'playerName', 'position', 'heightWeight', 'college', 'bustOrGem'];
  public positions: string[] = ['QB', 'RB', 'FB', 'WR', 'TE', 'OT', 'OG', 'C', 'EDGE', 'DT', 'LB', 'CB', 'S', 'K', 'P'];
  public dataSource = new MatTableDataSource(this.filterPlayers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild("tableContainer", { read: ElementRef }) tableContainer!: ElementRef;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getPlayers().subscribe(data => {
      this.masterPlayers = data;
      this.filterPlayers = data;
      this.setDataSource(this.filterPlayers);
    })
  }

  private setDataSource(data: Player[]): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public drop(event: CdkDragDrop<any[], any[], any>) {
    moveItemInArray(this.filterPlayers, event.previousIndex, event.currentIndex);
    let rank = 1;
    this.filterPlayers.forEach(element => {
      element.rank = rank;
      rank++
    });
    this.setDataSource(this.filterPlayers);
  }

  public filterByPos(): void {
    let filterObject = this.masterPlayers;
    if (this.positionSelected == 'All Pos')
      this.filterPlayers = [...this.masterPlayers];
    else {
      filterObject = filterObject.filter(player => player.position.toLowerCase().trim() == this.positionSelected.toLowerCase().trim());
      this.filterPlayers = [...filterObject];
    }
    this.setDataSource(this.filterPlayers);
  }

  /* To Do: Need a save button and onSave() function that sends the list of player names as a string to the api and database to a separate table that holds all user predictions. One
  column will be userId, one will be players as a string, one will be draft picks */
  //To Do: Will need to pull the list and organize for each user dynamically.
}
