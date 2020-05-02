import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import * as L from 'leaflet';

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
  radius: Radius[] = [
    {value: '5', viewValue: 'Radius(5km)'},
    {value: '10', viewValue: 'Radius(10km)'},
    {value: '20', viewValue: 'Radius(20km)'},
    {value: '30', viewValue: 'Radius(30km)'}
  ];

  @Output() public sidenavToggle = new EventEmitter();

  constructor() { }

  name: string;

  ngOnInit(): void {
    this.name = localStorage.getItem('name');

    this.map = L.map('main_map').setView([46.204391, 6.143158], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  click_keyword(event) {

  }
}


