import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant';
import { RestaurantService } from './restaurant/restaurant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
    title = 'Book My Trip';
}
