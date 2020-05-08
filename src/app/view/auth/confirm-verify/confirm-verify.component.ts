import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/_services';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-confirm-verify',
  templateUrl: './confirm-verify.component.html',
  styleUrls: ['./confirm-verify.component.scss']
})
export class ConfirmVerifyComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: AuthService,
    public dialog: MatDialog,
    private _router: Router
  ) { }

  confirmVerify: FormGroup;
  submitted = false;
  myEmail: string;
  ngOnInit(): void {
    this.confirmVerify = this.formBuilder.group({
      code: ['', Validators.required],
    });
  }

  get f() {return this.confirmVerify.controls}

  onSubmit() {
    this.submitted = true;
    if (this.confirmVerify.invalid) {
      return;
    }
    const code = this.f.code.value;
    this.userService.confirmVerify({'code': code}).subscribe(res => {
      if (res['success'] === false) {
        alert(res['msg']);
        return false
      }
      else {
        alert(res['msg']);
        this.myEmail = res['data'];
        const dialogRef = this.dialog.open(ResetPasswordComponent, {
          width: '20%',
          data: {myEmail: this.myEmail}
        });

        dialogRef.afterClosed().subscribe(result => [
          console.log(result)
        ])
      }
    })
  }

    click_back() {
    this._router.navigate(['auth/confirmEmail'])
  }
}
