import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Player } from '../shared/models/player';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss'
})
export class PlayerListComponent {

  public loading = true;
  public players: Player[] = [];
  public displayedColumns: String[] = ['rank', 'name', 'position', 'college', 'heightWeight', 'college'];

  //players will end up in database and removed from player-list-change component
  public tempPlayers: Player[] = [
    {rank: 1, name: 'Marvin Harrison Jr.', position: 'WR', heightWeight: '6-4 / 205', college: "Ohio St"},
    {rank: 2, name: 'Caleb Williams', position: 'QB', heightWeight: '6-1 / 215', college: "USC"},
    {rank: 3, name: 'Olumuyiwa Fashanu', position: 'OT', heightWeight: '6-6 / 316', college: "PSU"},
    {rank: 4, name: 'Brock Bowers', position: 'TE', heightWeight: '6-4 / 240', college: "Georgia"},
    {rank: 5, name: 'Joe Alt', position: 'OT', heightWeight: '6-7 / 322', college: "ND"},
    {rank: 6, name: 'Drake Maye', position: 'QB', heightWeight: '6-4 / 230', college: "UNC"},
    {rank: 7, name: 'JC Latham', position: 'OT', heightWeight: '6-6 / 360', college: "Bama"},
    {rank: 8, name: 'Laiatu Latu', position: 'EDGE', heightWeight: '6-5 / 265', college: "UCLA"},
    {rank: 9, name: 'Jared Verse', position: 'EDGE', heightWeight: '6-4 / 260', college: "FSU"},
    {rank: 10, name: 'Dallas Turner', position: 'EDGE', heightWeight: '6-4 / 252', college: "Bama"}
  ];

  public datasource = new MatTableDataSource(this.tempPlayers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild("tableContainer", { read: ElementRef }) tableContainer!: ElementRef;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tempPlayers, event.previousIndex, event.currentIndex);
  }

}
