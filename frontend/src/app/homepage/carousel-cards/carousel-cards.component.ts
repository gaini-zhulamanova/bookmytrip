import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel-cards',
  templateUrl: './carousel-cards.component.html',
  styleUrls: ['./carousel-cards.component.css'],

})
export class CarouselCardsComponent implements OnInit {

  constructor(private router: Router) {}

  city_list = [
    {
    location: 'Berlin',
    description: 'Hauptstadt von Deutschland',
    img: '/assets/berlin.jpg',
    },
    {
    location: 'Frankfurt',
    description: 'Deutschlands schönste Skyline',
    img: '/assets/frankfurt.jpg',
    },
    {
    location: 'Hamburg',
    description: 'Die größte Hafenstadt Deutschlands',
    img: '/assets/hamburg.jpg',
    }
  ]

  ngOnInit() {}

  onCitySelectionByImg(city: string) {
    this.router.navigate(['book-my-trip', city, 'restaurants']);
  }
}
