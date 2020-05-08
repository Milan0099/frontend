import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/auth/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss']
})
export class DeleteProfileComponent implements OnInit {

  constructor(
    private userService: AuthService,
    private _router: Router
  ) { }

  myEmail: string;
  totalAdv: string;
  ngOnInit(): void {
    this.myEmail = localStorage.getItem('email');

    this.userService.getAllInfo({'email': this.myEmail}).subscribe(res => {
      this.totalAdv = res['data'].length;
    })
  }

  back_button() {
    this._router.navigate(['home/profile'])
  }

  delete() {
    if (confirm('Do you want to delete your account')) {
      this.userService.delete({'email': this.myEmail}).subscribe(res => {
        if (res['success'] === true) {
          localStorage.clear();
          this._router.navigate(['auth/login'])
        }
      })
    }
    else {
      return false;
    }
  }

}
