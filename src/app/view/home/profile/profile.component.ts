import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { antPath } from 'leaflet-ant-path';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  map:any;

  ngOnInit(): void {
    this.map = L.map('map').setView([46.204391, 6.143158], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.marker([0, 0]).bindPopup('<b>Hello!!</b>').addTo(this.map);
  }

}
