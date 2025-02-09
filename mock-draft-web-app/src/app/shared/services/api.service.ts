import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { Team } from '../models/team';
import { environment } from '../../../environments/environment';
import { Scoreboard } from '../models/scoreboard';
import { SetUsersPlayersOrTeams } from '../models/setUsersPlayersOrTeams';
import { PlayerNotes } from '../models/playerNotes';
import { User } from '../models/user';
import { MockDraft } from '../models/mockDraft';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //To Do: Make this a post instead of a get so it's safer
  public getPlayerList(userId: number): Observable<Player[]>{
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

  public setUsersPlayersDraftOrder(playersDraft: SetUsersPlayersOrTeams) {
    return this.http.post<any>(`${environment.apiUrl}/setuserplayersdraftorder`, playersDraft);
  }

  public setUsersTeams(usersTeams: SetUsersPlayersOrTeams) {
    return this.http.post<any>(`${environment.apiUrl}/setusersteams`, usersTeams)
  }

  public setUsersPlayerList(playerList: SetUsersPlayersOrTeams) {
    return this.http.post<any>(`${environment.apiUrl}/setusersplayerslist`, playerList)
  }

  public setPlayerNotes(notes: PlayerNotes) {
    return this.http.post<any>(`${environment.apiUrl}/setplayernotes`, notes);
  }

  public setPlayerIsBustOrStar(notes: PlayerNotes) {
    return this.http.post<any>(`${environment.apiUrl}/setplayerisbustorisstar`, notes);
  }

  public getUser(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/getuser`, user);
  }

  public createUser(user: User) {
    return this.http.post<any>(`${environment.apiUrl}/createuser`, user);
  }

  //To Do: make this a post instead of a get because it's safer
  public getMockDraft(userId: number) {
    return this.http.get<MockDraft>(`${environment.apiUrl}/getmockdraft?userId=${userId}`)
  }

}