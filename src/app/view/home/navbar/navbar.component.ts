import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

interface Language {
  name: string;
  flag: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    private _router: Router
  ) { }

  name: string;

  states: Language[] = [
    {name: 'English', flag: 'US'},
    {name: 'German', flag: 'DE'},
    {name: 'French', flag: 'FR'},
    {name: 'Italian', flag: 'IT'},
  ];

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  home_page() {
    this._router.navigate(['home'])
  }

  my_profile() {
    this._router.navigate(['home/profile'])
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['auth/login'])
  }
}
