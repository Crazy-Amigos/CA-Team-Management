import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {User} from '../variable/users';
import {map} from 'rxjs/internal/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  private token: string

  constructor(
    private http: HttpClient,
    private router: Router,
    public jwtHelper: JwtHelperService) { }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }
  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }
  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/login');
  }
  public getUserDetails(): User {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
    let base;
    if (method === 'post') {
      base = this.http.post(`/amigosApi/auth/${type}`, user);
    } else {
      base = this.http.get(`/amigosApi/auth/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
          // alert('Saved Success');
        }
        return data;
      })
    );

    return request;
  }
  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('mean-token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

}
export interface TokenPayload {
  email: string;
  password: string;
}
interface TokenResponse {
  token: string;
}
