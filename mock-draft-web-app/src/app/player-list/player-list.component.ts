import { Component, computed, effect, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Player } from '../shared/models/player';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { ApiService } from '../shared/services/api.service';
import { elementAt, filter } from 'rxjs';
import { NotesComponent } from '../shared/dialogs/notes/notes.component';
import { MatDialog } from '@angular/material/dialog';
import { PlayerNotes } from '../shared/models/playerNotes';
import { SetUsersPlayersOrTeams } from '../shared/models/setUsersPlayersOrTeams';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss'
})
export class PlayerListComponent implements OnInit {

  //To Do: Add Drag and Drop Icon
  //To Do: Add Download to Excel (Maybe)
  //To Do: Add links to other websites that have data about players
  //To Do: Currently there's a bug that's preventing the filter from working unless a player is moved on the list. The list is probably not being set initially

  public loading = true;
  public positionSelected = 'All Pos';
  public isFiltered = false;
  public masterPlayers: Player[] = [];
  public filterPlayers: Player[] = [];
  public displayedColumns: string[] = ['playerRank', 'playerName', 'position', 'heightWeight', 'college', 'playerClass', 'bustOrGem', 'notes'];
  public positions: string[] = ['QB', 'RB', 'FB', 'WR', 'TE', 'OT', 'OG', 'C', 'EDGE', 'DT', 'LB', 'CB', 'S', 'K', 'P'];
  public dataSource = new MatTableDataSource(this.filterPlayers);
  private snackBar = inject(MatSnackBar);
  public userId = computed(() => {
    return this.userService.userId();
  })
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild("tableContainer", { read: ElementRef }) tableContainer!: ElementRef;

  constructor(private apiService: ApiService, private userService: UserService, private dialog: MatDialog) {
    effect(() => {
      this.getPlayerList();
    })
  }

  ngOnInit(): void {
    //To Do: Need loading spinner
    if(this.userId() == 0 || !this.userId()) {
      this.userService.getUserDataFromToken();
    }
    this.getPlayerList();
  }

  private getPlayerList(): void {
    if(this.userId() > 0) {
      this.apiService.getPlayerList(this.userId()).subscribe(data => {
        this.masterPlayers = data;
        this.filterPlayers = data;
        this.setDataSource(this.filterPlayers);
      })
    }
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
        element.playerRank = rank;
        rank++;
      });
      this.setRankInDatabase(players);
    }
    else {
      let rankArr: number[] = [];
      players.forEach(element => {
        rankArr.push(element.playerRank);
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
        this.filterPlayers[index].playerRank = rankArr[index];
      }
      this.setDataSource(this.filterPlayers)
      this.masterPlayers = this.reorderPlayerArr(this.masterPlayers);
      this.setRankInDatabase(this.masterPlayers);
    }
  }

  //To Do: Need to get userId from the service
  private setRankInDatabase(player: Player[]) {
    let playerIdsSorted: number[] = [];
    for (let i = 0; i < this.masterPlayers.length; i++) {
      const element = this.masterPlayers[i];
      if (element.playerRank == i + 1) {
        playerIdsSorted.push(element.playerId);
        continue;
      }
    }
    let userPlayerList: SetUsersPlayersOrTeams = {userId: 1, playersOrTeams: playerIdsSorted.toString()};
    this.apiService.setUsersPlayerList(userPlayerList).subscribe(rsp => {});
  }

  private reorderPlayerArr(playerArr: Player[]): Player[] {
    let rank = 1;
    let tempPlayerArr: Player[] = [];
    while (rank < this.masterPlayers.length + 1) {
      playerArr.forEach(element => {
        element.playerRank == rank ? tempPlayerArr.push(element) : null;
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
    this.setStarOrBustInDatabase(player);
  }

  public changeColorToStar(player: Player): void {
    if (player.isStar)
      player.isStar = false;
    else {
      player.isStar = true;
      player.isBust = false;
    }
    this.setStarOrBustInDatabase(player);
  }

  public setStarOrBustInDatabase(player: Player) {
    //To Do: Need to get userId from the service
    let notes: PlayerNotes = {userId: 1, playerId: player.playerId, isStar: player.isStar, isBust: player.isBust}
    this.apiService.setPlayerIsBustOrStar(notes).subscribe(rsp => {
    })
  }

  public openNotesDialog(player: Player): void {
    this.dialog.open(NotesComponent, {
      width: '600px',
      data: player
    }).afterClosed().subscribe(note => {
      if (note) {
        player.note = note;
      }
    })
  }

  //To Do: Will need to pull the list and organize for each user dynamically.
}