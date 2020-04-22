import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../_models';


const BASE_URL = 'http://localhost:4201/api/users/';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient
  ) {}

  register(user: User): Observable<any> {
    return this.http.post(BASE_URL + 'register', user)
  }

  email_verify(code: string) {
    return this.http.post( BASE_URL + 'email_verify', {'code': code})
  }

  login(user): Observable<any>  {
    return this.http.post(BASE_URL + 'login', user)
  }
}
