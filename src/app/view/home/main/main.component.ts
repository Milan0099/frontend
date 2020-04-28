import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

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

  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    private _router: Router
  ) { }

  name: string;


  ngOnInit(): void {
    this.name = localStorage.getItem('name');
  }
  radius: Radius[] = [
    {value: '5', viewValue: 'Radius(5km)'},
    {value: '10', viewValue: 'Radius(10km)'},
    {value: '30', viewValue: 'Radius(30km)'}
  ];
}
