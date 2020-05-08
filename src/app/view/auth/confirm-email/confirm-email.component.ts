import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: AuthService,
    private _router: Router
  ) { }

  confirmEmail: FormGroup;
  submitted = false;
  ngOnInit(): void {
    this.confirmEmail = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {return this.confirmEmail.controls}
  onSubmit() {
    this.submitted = true;
    if (this.confirmEmail.invalid) {
      return;
    }

    const _user: { email: string}[] = [
      {
        'email': this.f.email.value,
      }
    ];
    this.userService.confirmEmail(_user[0]).subscribe(res => {
      if (res['success'] === true) {
        if (confirm(res['msg'])) {
          this.userService.rVerify(_user[0]).subscribe(res => {
            console.log(res)
          });
          this._router.navigate(['auth/confirmVerify']);
        }
        else {
          return false;
        }
      }
      else {
        if (confirm(res['msg'])) {
          this._router.navigate([''])
        }
        else {
          return false;
        }
      }
    })
  }

  click_back() {
    this._router.navigate(['auth/login'])
  }
}
