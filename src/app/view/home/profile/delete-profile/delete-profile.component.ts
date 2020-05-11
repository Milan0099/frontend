import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/auth/_services';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss']
})
export class DeleteProfileComponent implements OnInit {

  constructor(
    private userService: AuthService,
    private _router: Router,
    private dialog: MatDialog
  ) { }

  success: string;
  myEmail: string;
  totalAdv: string;
  ngOnInit(): void {
    this.myEmail = localStorage.getItem('email');

    this.userService.getAllInfo({'email': this.myEmail}).subscribe(res => {
      this.totalAdv = res['data'].length;
    })
  }


  profileDelete(): void {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '370px',
      data: {myData: this.myEmail}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.success = result;
    })
  }

}
