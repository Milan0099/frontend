import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as L from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { Router } from '@angular/router';

interface Radius {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }
  public colors = [
    {id: 1, title: 'My Ass', status: false},
    {id: 2, title: 'My Profile', status: true},
    {id: 3, title: 'Submit Ad', status: false},
  ];

  map:any;

  ngOnInit(): void {
    this.map = L.map('profile_map').setView([46.204391, 6.143158], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.marker([46.947456, 7.451123]).bindPopup('<b>Hello!! Rastislav</b>').addTo(this.map);
  }

  radius: Radius[] = [
    {value: '5', viewValue: 'Radius(5km)'},
    {value: '10', viewValue: 'Radius(10km)'},
    {value: '20', viewValue: 'Radius(20km)'},
    {value: '30', viewValue: 'Radius(30km)'}
  ];
  logout() {
    localStorage.clear();
    this._router.navigate(['auth/login'])
  }

  change_tab(id) {
    this.colors.forEach(function (item) {
      item.id == id ? item.status=true:item.status = false
    })
  }
}
