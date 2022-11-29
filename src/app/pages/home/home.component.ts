import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  listings = [
    {
      title: 'House',
      price: 100000,
      address: '123 Main St',
    },
    {
      title: 'Condo',
      price: 200000,
      address: '456 Main St',
    },
  ];
}
