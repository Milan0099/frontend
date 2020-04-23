import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  name: string;

  ngOnInit(): void {
    this.name = localStorage.getItem('name')
  }
  logout() {
    localStorage.clear();
    this._router.navigate(['auth/login'])
  }
}
