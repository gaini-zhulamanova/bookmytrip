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
      city: 'Berlin',
      location: 'Berlin',
      description: 'Hier ist Berlin',
      img: '/assets/Berlin.jpg',
     },

     {
      city: 'Frankfurt',
      location: 'Frankfurt am Main',
      description: 'Hier ist Frankfurt',
      img: '/assets/Frankfurt.jpg',
     },

     {
      city: 'Hamburg',
      location: 'Hamburg',
      description: 'Hier ist Hamburg',
      img: '/assets/Hamburg.jpg',
     }
   ]
  ngOnInit() {
   
  }

  onCitySelectionByImg(city: string) {
    this.router.navigate(['book-my-trip', city, 'restaurants']);
  }


}
