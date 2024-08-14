import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Player } from '../shared/models/player';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss'
})
export class PlayerListComponent implements OnInit {

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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.players, event.previousIndex, event.currentIndex);
  }

}
