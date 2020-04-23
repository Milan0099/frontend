import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../_models';
import {map} from 'rxjs/operators';


const BASE_URL = 'http://localhost:4201/api/users/';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject  = new BehaviorSubject <User>(JSON.parse(localStorage.getItem('token')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value
  }

  register(user: User): Observable<any> {
    return this.http.post(BASE_URL + 'register', user)
  }

  email_verify(code: string) {
    return this.http.post( BASE_URL + 'email_verify', {'code': code})
  }

  login(payload): Observable<any>  {
    console.log(payload);
    return this.http.post(BASE_URL + 'login', payload)
      .pipe(map(res => {
        if (res['success'] === true) {
          console.log('token', res['token']);
          localStorage.setItem('token', res['token']);
          localStorage.setItem('name', res['data'].name);
          this.currentUserSubject.next(res['token'])
        }
        return res;
      }))
  }
}
