import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/auth/_services';
import { SafeHtmlPipe } from '../../../../safe-html.pipe';

interface Styles {
  id: number,
  name: string,
  status: boolean
}

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.scss']
})
export class MyAdsComponent implements OnInit {

  constructor(
    private userService: AuthService
  ) { }

  style: Styles[] = [
    {id: 1, name: 'All', status: true},
    {id: 2, name: 'Pending', status: false},
    {id: 3, name: 'Expired', status: false},
    {id: 4, name: 'Active', status: false},
    {id: 5, name: 'Off', status: false},
    {id: 6, name: 'Not Paid', status: false},
  ];

  current_email: string;
  public myAdv: any;
  ngOnInit(): void {
    this.current_email = localStorage.getItem('email');

    this.userService.getAllAdv({'email': this.current_email}).subscribe(res => {
      console.log('my adv--', res['data']);
      this.myAdv = res['data'];
    })
  }

  change_style(id) {
    let status_name = {};
    this.style.forEach(function (item) {
      item.id == id ? item.status = true: item.status = false;
      if (item.id == id) {
        status_name = item.name;
      }
    });
    this.userService.getStatus({'myEmail': this.current_email, 'status': status_name}).subscribe(res => {
      this.myAdv = res['msg']
    })
  }
}
