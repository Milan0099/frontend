import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: AuthService,
    private _router: Router
  ) {}

  login: FormGroup;
  loading = false;
  submitted = false;
  hide = true;

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {return this.login.controls}
  onSubmit() {
    this.submitted = true;
    if (this.login.invalid) {
      return;
    }

    const _user: { email: string; password: string }[] = [
      {
        'email' : this.f.email.value,
        'password' : this.f.password.value
      }
    ];

    this.loading = true;
    this.userService.admin(_user[0])
      .pipe(first())
      .subscribe(res => {
        if (res['success'] === true) {
          alert(res['msg']);
          this._router.navigate(['admin/main'])
        }
        else {
          alert(res['msg']);
          return false
          }
      })
  }
}
