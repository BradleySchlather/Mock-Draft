import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Player } from '../shared/models/player';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss'
})
export class PlayerListComponent {

  public loading = true;
  public players: Player[] = [];
  public displayedColumns: String[] = ['rank', 'name', 'position', 'college', 'heightWeight', 'college'];
  public datasource = new MatTableDataSource(this.players);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild("tableContainer", { read: ElementRef }) tableContainer!: ElementRef;

  constructor() { }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.players, event.previousIndex, event.currentIndex);
  }

}
