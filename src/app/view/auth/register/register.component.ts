import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/auth/_services';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../../../core/auth/_models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit  {
  constructor(
    private formBuilder: FormBuilder,
    private userService: AuthService,
    private _router: Router
  ) {
  }
  signin: FormGroup;
  loading = false;
  submitted = false;
  hide = true;

  ngOnInit(): void {
    this.signin = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.requiredTrue],
    });
  }

  get f() {return this.signin.controls}

  onSubmit() {
    this.submitted = true;
    if (this.signin.invalid) {
      return;
    }

    const _user: User[] = [
      {
        'name' : this.f.name.value,
        'email' : this.f.email.value,
        'password' : this.f.password.value
      }
    ];

    this.loading = true;

    this.userService.register(_user[0])
      .pipe(first())
      .subscribe(res => {
        if (res['success'] === false) {
          alert(res['data'])
        }
        else {
          this._router.navigate(['auth/email_verify'])
        }
      });
    this.loading = false
  }

  sign_in() {
    this._router.navigate(['auth/login'])
  }

}
