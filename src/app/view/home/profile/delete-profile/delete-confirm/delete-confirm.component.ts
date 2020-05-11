import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../../core/auth/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  fromPage: any;
  constructor(
    private userService: AuthService,
    private _router: Router,
    private dialogRef: MatDialogRef<DeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fromPage = this.data.myData;
  }
  ngOnInit(): void {
    console.log(this.fromPage)
  }

  public back_button(): void {
    this.dialogRef.close();
  }
  delete() {
    this.userService.delete({'email': this.fromPage}).subscribe(res => {
      if (res['success'] === true) {
        alert(res['msg']);
        localStorage.clear();
        this._router.navigate(['auth/login'])
      }
    })
  }
}
