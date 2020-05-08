import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/_services';
import { Router } from '@angular/router';
import { MustMatch } from './_helpers/must-match.validator';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: AuthService,
    private dialog: MatDialog,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.fromPage = this.data.myEmail;
    }

  resetPassword: FormGroup;
  submitted = false;
  hide = true;
  fromPage: any;
  dialogRef: string;
  ngOnInit(): void {
    this.resetPassword = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }
  get f() {return this.resetPassword.controls}

  onSubmit() {
    this.submitted = true;

    if (this.resetPassword.invalid) {
      return;
    }
    this.resetPassword.value['email'] = this.fromPage;
    this.userService.resetPassword(this.resetPassword.value).subscribe(res => {
      if (res['success'] === true) {
        alert(res['msg']);

        this._router.navigate(['auth/login'])
      }
    })
  }

}
