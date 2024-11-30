import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Scoreboard } from '../shared/models/scoreboard';
import { ApiService } from '../shared/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss'
})
export class ScoreboardComponent implements OnInit {

  public scoreboard: Scoreboard[] = [];
  public dataSource = new MatTableDataSource(this.scoreboard);
  public displayedColumns: string[] = ['ranking', 'userName', 'score', 'correctFirstRoundPicks', 'totalFirstRoundPredictions', 'totalPredictionPercentage', 'predictedTrades'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild("tableContainer", { read: ElementRef }) tableContainer!: ElementRef;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getScoreboard().subscribe(data => {
      this.scoreboard = data;
      this.setDataSource(this.scoreboard);
    })
  }

  private setDataSource(data: Scoreboard[]): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  //To Do: This will show all users and their respective score
  //To Do: This will also have a button to click that allows user to check the box score of that user, i.e. the specifics that got them that score
  //To Do: Have a friends option that allows the users to only show their friends
  //To Do: It might not be a bad idea to make this part of the home page
}