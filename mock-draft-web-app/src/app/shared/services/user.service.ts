import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  public userId = signal(0);
  public userName = signal('');
  public email = signal('');
  // public isDialogOpen = signal(false);

  public getUserData(user: User): void {
    this.apiService.getUser(user).subscribe(data => {
      this.userId.set(data.userId ?? 0);
      this.userName.set(data.userName ?? '');
      this.email.set(data.email ?? '');
    })
  }
}
