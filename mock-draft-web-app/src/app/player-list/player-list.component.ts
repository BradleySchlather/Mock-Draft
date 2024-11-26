import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Player } from '../shared/models/player';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { ApiService } from '../shared/services/api.service';
import { elementAt, filter } from 'rxjs';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss'
})
export class PlayerListComponent implements OnInit {

  //To Do: Add Drag and Drop Icon
  //To Do: Add Notes Section for comments
  //To Do: Add Download to Excel (Maybe)
  //To Do: Add links to other websites that have data about players

  public loading = true;
  public positionSelected = 'All Pos';
  public isFiltered = false;
  public masterPlayers: Player[] = [];
  public filterPlayers: Player[] = [];
  public displayedColumns: string[] = ['rank', 'playerName', 'position', 'heightWeight', 'college', 'class', 'bustOrGem'];
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

  public resetRank(players: Player[], previousIndex: number, currentIndex: number): void {
    if (!this.isFiltered) {
      let rank = 1;
      players.forEach(element => {
        element.rank = rank;
        rank++;
      });
    }
    else {
      let rankArr: number[] = [];
      players.forEach(element => {
        rankArr.push(element.rank);
      });
      rankArr.sort((a, b) => a - b);
      let lowerIndex = 0;
      let higherIndex = 0;
      if (previousIndex < currentIndex) {
        lowerIndex = previousIndex;
        higherIndex = currentIndex;
      }
      else {
        lowerIndex = currentIndex;
        higherIndex = previousIndex;
      }
      for (let index = lowerIndex; index < higherIndex + 1; index++) {
        this.filterPlayers[index].rank = rankArr[index];
      }
      this.setDataSource(this.filterPlayers)
      this.masterPlayers = this.reorderPlayerArr(this.masterPlayers);
    }
  }

  private reorderPlayerArr(playerArr: Player[]): Player[] {
    let rank = 1;
    let tempPlayerArr: Player[] = [];
    while (rank < this.masterPlayers.length + 1) {
      playerArr.forEach(element => {
        element.rank == rank ? tempPlayerArr.push(element) : null;
      });
      rank++;
    }
    return tempPlayerArr;
  }

  public drop(event: CdkDragDrop<any[], any[], any>) {
    moveItemInArray(this.filterPlayers, event.previousIndex, event.currentIndex);
    this.resetRank(this.filterPlayers, event.previousIndex, event.currentIndex);
    this.setDataSource(this.filterPlayers);
  }

  public filterByPos(): void {
    let filterObject = this.masterPlayers;
    if (this.positionSelected == 'All Pos') {
      this.masterPlayers = this.reorderPlayerArr(this.masterPlayers);
      this.filterPlayers = [...this.masterPlayers];
      this.isFiltered = false;
    }
    else {
      filterObject = filterObject.filter(player => player.position.toLowerCase().trim() == this.positionSelected.toLowerCase().trim());
      this.filterPlayers = [...filterObject];
      this.filterPlayers = this.reorderPlayerArr(this.filterPlayers);
      this.isFiltered = true;
    }
    this.setDataSource(this.filterPlayers);
  }

  public changeColorToBust(player: Player): void {
    if (player.isBust)
      player.isBust = false;
    else {
      player.isBust = true;
      player.isStar = false;
    }
  }

  public changeColorToStar(player: Player): void {
    if (player.isStar)
      player.isStar = false;
    else {
      player.isStar = true;
      player.isBust = false;
    }
  }

  /* To Do: Need a save button and onSave() function that sends the list of player names as a string to the api and database to a separate table that holds all user predictions. One
  column will be userId, one will be players as a string, one will be draft picks */
  //To Do: Will need to pull the list and organize for each user dynamically.
}
