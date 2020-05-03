import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
let self;

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {

  constructor(
    private _router: Router
  ) {
    self = this;
  }


  public sidebar=[
    {id: 1, icon: 'palette', name: 'Dashboard', status: false, url: 'admin/main'},
    {id: 2, icon: 'supervised_user_circle', name: 'User', status: false, url: 'admin/main/users'},
    {id: 3, icon: 'how_to_reg', name: 'Profile', status: false, url: 'admin/main/'},
    {id: 4, icon: 'add_location', name: 'Ads', status: false, url: 'admin/main/advertise'},
    {id: 5, icon: 'spa', name: 'Submit', status: false, url: 'admin/main'},
  ];
  ngOnInit(): void {
  }

  change_page(id) {
    self.sidebar.forEach(function (item) {
      item.status = item.id === id;
      if (item.status) {
        item.status = true;
        self._router.navigate([item.url])
      }
    })
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['admin'])
  }
}
