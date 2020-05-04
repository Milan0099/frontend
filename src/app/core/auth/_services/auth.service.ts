import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../_models';
import {map} from 'rxjs/operators';


const BASE_URL = 'http://localhost:4201/api/users/';
const ADMIN_URL = 'http://localhost:4201/api/admin/';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject  = new BehaviorSubject <any>(localStorage.getItem('token'));
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
    return this.http.post(BASE_URL + 'login', payload)
      .pipe(map(res => {
        if (res['success'] === true) {
          localStorage.setItem('token', res['token']);
          localStorage.setItem('name', res['data'].name);
          localStorage.setItem('email', res['data'].email);
          localStorage.setItem('role', res['data'].role);
          this.currentUserSubject.next(res['token'])
        }
        return res;
      }))
  }

  add_profile(profile): Observable<any> {
    return this.http.post(BASE_URL + 'add_profile', profile)
  }

  submit_adv(submit_info): Observable<any> {
    return this.http.post(BASE_URL + 'submit_adv', submit_info)
  }

  admin(payload): Observable<any> {
    return this.http.post(ADMIN_URL + 'login', payload)
      .pipe(map(res => {
        if (res['success'] === true) {
          localStorage.setItem('token', res['token']);
          localStorage.setItem('role', res['data'].role);
          this.currentUserSubject.next(res['token'])
        }
        return res
      }))
  }

  getUsers() {
    return this.http.get(ADMIN_URL + 'getUsers')
  }
}
