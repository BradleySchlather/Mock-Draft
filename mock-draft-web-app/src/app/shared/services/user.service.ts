import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService, private authService: AuthService) { }

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

  public getUserDataFromToken(): void {
    const decodedToken = this.authService.getDecodedToken();
    if(decodedToken) {
      let email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      this.apiService.getUserDataFromToken(email).subscribe(data => {
        this.userId.set(data.userId ?? 0);
        this.userName.set(data.userName ?? '');
        this.email.set(data.email ?? '');
      })
    }
  }
}
