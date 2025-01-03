import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { Team } from '../models/team';
import { environment } from '../../../environments/environment';
import { Scoreboard } from '../models/scoreboard';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getPlayerList(userId: number): Observable<Player[]> {
    return this.http.get<Player[]>(`${environment.apiUrl}/getplayerlist?userId=${userId}`);
  }

  public getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${environment.apiUrl}/getplayers`);
  }

  public getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${environment.apiUrl}/getteams`);
  }

  public getScoreboard(): Observable<Scoreboard[]> {
    return this.http.get<Scoreboard[]>(`${environment.apiUrl}/getscoreboard`);
  }
}