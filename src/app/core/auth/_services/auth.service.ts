import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models';
import { map } from 'rxjs/operators';


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
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('token'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(user: User): Observable<any> {

    return this.http.post(BASE_URL + 'register', user);
  }

  email_verify(code: string) {
    return this.http.post(BASE_URL + 'email_verify', {'code': code});
  }

  login(payload): Observable<any> {
    return this.http.post(BASE_URL + 'login', payload)
      .pipe(map(res => {
        if (res['success'] === true) {
          localStorage.setItem('token', res['token']);
          localStorage.setItem('name', res['data'].name);
          localStorage.setItem('email', res['data'].email);
          localStorage.setItem('role', res['data'].role);
          this.currentUserSubject.next(res['token']);
        }
        return res;
      }));
  }

  confirmEmail(payload): Observable<object> {
    return this.http.post(BASE_URL + 'confirmEmail', payload)
  }

  rVerify(payload): Observable<object> {
    return this.http.post(BASE_URL + 'rVerify', payload)
  }

  confirmVerify(payload): Observable<object> {
    return this.http.post(BASE_URL + 'confirmVerify', payload)
  }

  resetPassword(payload): Observable<object> {
    return this.http.post(BASE_URL + 'resetPassword', payload)
  }

  add_profile(profile): Observable<any> {
    return this.http.post(BASE_URL + 'add_profile', profile);
  }

  submit_adv(submit_info): Observable<any> {
    return this.http.post(BASE_URL + 'advertise', submit_info);
  }

  upload_advertise(fileToUpload: File): Observable<Object> {
    const endpoint = BASE_URL + 'featuredImage';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData);
  }

  multi_image(multiImageUpload: any[]): Observable<any> {
    const endPoint = BASE_URL + 'multipleFiles';
    const formData: FormData = new FormData();
    for (let i = 0; i < multiImageUpload.length; i++) {
      formData.append('file[]', multiImageUpload[i], multiImageUpload[i].name);
    }
    return this.http.post(endPoint, formData);
  }
  upload_video(videoFile: File): Observable<Object> {
    const endpoint = BASE_URL + 'videoFile';
    const formData: FormData = new FormData();
    formData.append('file', videoFile, videoFile.name);
    return this.http.post(endpoint, formData)
  }

  getAllAdv(myEmail): Observable<Object> {
    return this.http.post(BASE_URL + 'getAllAdv', myEmail)
  }

  getStatus(status): Observable<Object> {
    return this.http.post(BASE_URL + 'myAdvStatus', status)
  }

  getAllInfo(payload): Observable<object> {
    return this.http.post(BASE_URL + 'getAllInfo', payload)
  }

  delete(payload): Observable<object> {
    return this.http.post(BASE_URL + 'delete', payload)
  }

  admin(payload): Observable<any> {
    return this.http.post(ADMIN_URL + 'login', payload)
      .pipe(map(res => {
        if (res['success'] === true) {
          localStorage.setItem('token', res['token']);
          localStorage.setItem('role', res['data'].role);
          this.currentUserSubject.next(res['token']);
        }
        return res;
      }));
  }

  getUsers() {
    return this.http.get(ADMIN_URL + 'getUsers');
  }
}
