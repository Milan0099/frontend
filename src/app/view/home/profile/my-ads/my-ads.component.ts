import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  style: Styles[] = [
    {id: 1, name: 'All', status: true},
    {id: 2, name: 'Pending', status: false},
    {id: 3, name: 'Expired', status: false},
    {id: 4, name: 'Active', status: false},
    {id: 5, name: 'Off', status: false},
    {id: 6, name: 'Not Paid', status: false},
  ];

  ngOnInit(): void {
  }

  change_style(id) {
    this.style.forEach(function (item) {
      item.id == id ? item.status = true: item.status = false
    })
  }

}
