import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/auth/_services';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class LoginComponent implements OnInit  {
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
    this.userService.login(_user[0])
      .pipe(first())
      .subscribe(res => {
        console.log('res', res);
        if (res['success'] === true) {
          alert(res['msg']);
          this._router.navigate(['home'])
        }
        else {
          if (res['data'] === null) {
            if (confirm(res['msg'])) {
              this._router.navigate([''])
            }
            else {
              return false;
            }
          }
          else {
            if (res['data'].active === '1') {
              alert(res['msg']);
              return false;
            }
            else {
              if (confirm(res['msg'])) {
                this._router.navigate(['auth/email_verify'])
              }
              else {
                return false;
              }
            }
          }
        }
      })
  }


  sign_up() {
    this._router.navigate([''])
  }
}
