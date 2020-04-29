import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { antPath } from 'leaflet-ant-path';


interface Radius {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {

  map:any;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    private _router: Router
  ) { }

  name: string;


  ngOnInit(): void {
    this.name = localStorage.getItem('name');

    this.map = L.map('main_map').setView([46.204391, 6.143158], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.marker([46.947456, 7.451123]).bindPopup('<b>Hello!!</b>').addTo(this.map);

    antPath([[46.204391, 6.143158], [	46.947456, 7.451123]], {color: '#FF0000', weight: 5, opacity: 0.6}).addTo(this.map);
    antPath([[46.204391, 6.143158], [47.559601, 7.588576]], {color: '#0000FF', weight: 5, opacity: 0.6, reverse: true,}).addTo(this.map);
  }
  radius: Radius[] = [
    {value: '5', viewValue: 'Radius(5km)'},
    {value: '10', viewValue: 'Radius(10km)'},
    {value: '20', viewValue: 'Radius(20km)'},
    {value: '30', viewValue: 'Radius(30km)'}
  ];

}


