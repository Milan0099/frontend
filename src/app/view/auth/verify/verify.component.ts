import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/auth/_services';
import {Router} from '@angular/router';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: AuthService,
    private _router: Router
  ) { }

  email_verify: FormGroup;
  submitted = false;
  ngOnInit(): void {
    this.email_verify = this.formBuilder.group({
      code: ['', Validators.required],
    });
  }

  get f() {return this.email_verify.controls}

  onSubmit() {
    this.submitted = true;
    if (this.email_verify.invalid) {
      return;
    }
    const code = this.f.code.value;

    this.userService.email_verify(code)
      .pipe()
      .subscribe(res => {
        if (res['success'] === false) {
          alert(res['data']);
          return false
        }
        else {
          alert(res['data']);
          this._router.navigate(['auth/login'])
        }
      })
  }

  click_back() {
    this._router.navigate(['auth'])
  }
}
