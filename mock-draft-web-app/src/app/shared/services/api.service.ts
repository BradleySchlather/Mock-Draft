import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${environment.apiUrl}/getplayers`)
  }
}
