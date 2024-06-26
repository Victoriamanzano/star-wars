import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@app/core/environments/environment';
import { User } from '../models';


@Injectable({ providedIn: 'root' })

export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  logIn(username: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
         this.userSubject.next(user);
         return user;
      }));
  }

  logOut() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  signUp(user: User) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }


}
