import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carousel-cards',
  templateUrl: './carousel-cards.component.html',
  styleUrls: ['./carousel-cards.component.css'],

})
export class CarouselCardsComponent implements OnInit {

  constructor() {
    
   }

   city_list = [
     {
      city: ' City 1',
      location: 'Berlin',
      description: 'Hier ist Berlin',
      img: '/assets/berlin.jpg',
     },

     {
      city: ' City 2',
      location: 'Frankfurt am Main',
      description: 'Hier ist Frankfurt',
      img: '/assets/frankfurt.jpg',
     },

     {
      city: ' City 3',
      location: 'Hamburg',
      description: 'Hier ist Hamburg',
      img: '/assets/hamburg.jpg',
     }
   ]
  ngOnInit() {
   
  }




}
