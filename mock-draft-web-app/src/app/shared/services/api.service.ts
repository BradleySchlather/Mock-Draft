import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { Team } from '../models/team';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${environment.apiUrl}/getplayers`)
  }

  public getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${environment.apiUrl}/getteams`)
  }
}