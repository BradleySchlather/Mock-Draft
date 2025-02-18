import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    return new Observable(observer => {
      this.http.post<{ token: string }>(`${environment.apiUrl}/auth/login`, { email, password }).subscribe(response => {
        localStorage.setItem('authToken', response.token);
        observer.next(response);
        observer.complete();
      }, error => observer.error(error));
    });
  }

  public logout(): void {
    localStorage.removeItem('authToken');
  }

  public getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  public getUser(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return new Observable(observer => {
        observer.error("No token found");
      });
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(`${environment.apiUrl}/getuser`, { headers });
  }

  public getDecodedToken(): any {
    const token = localStorage.getItem('authToken');

    if (!token) return null;
  
    try {
      const base64Url = token.split('.')[1]; // Extract payload part
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = JSON.parse(atob(base64));
  
      return decodedPayload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
