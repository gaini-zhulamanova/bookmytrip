import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant';
import { RestaurantService } from './restaurant.service';
import { Hotel } from './hotel/Hotel';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  restaurants: Restaurant[] = [];
  newRestaurantName: string = "";
  newCity: string = "";
  newPriceLevel: number;
  newId: number = 0;
  restaurantToUpdate: number;
  restaurantToDelete: number;

  

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurantService.getAllRestaurants().subscribe(restaurantsFromBackend => {
      console.log("Restaurants von Backend empfangen");
      console.log("Ich möchte daten sehen")
      console.log(restaurantsFromBackend);
      this.restaurants = restaurantsFromBackend;
    });

  }

  createNewRestaurant() {
    let newRestaurant = new Restaurant();
    newRestaurant.name = this.newRestaurantName;
    newRestaurant.city = this.newCity;
    newRestaurant.priceLevel = this.newPriceLevel;
    newRestaurant.id = this.newId;
    this.restaurantService.addRestaurant(newRestaurant).subscribe(newAddedRestaurant => {
      console.log("Neues Restaurant wurde hinzugefügt");
      this.restaurants.push(newAddedRestaurant);
    });

  }

  updateRestaurant() {
    let restaurant = this.restaurants.find(restaurantToFilter => restaurantToFilter.id === this.restaurantToUpdate);
    if (restaurant) {
      console.log(restaurant)
      restaurant.name = restaurant.name + 'ABC';
    }
    this.restaurantService.updateRestaurant(this.restaurantToUpdate, restaurant).subscribe(returnValue => {
      this.restaurants = this.restaurants.filter(restaurantsToFilter => restaurantsToFilter.id !== this.restaurantToUpdate);
      this.restaurants.push(restaurant);
      console.log('Update hat funktioniert');
    }, error => {
      console.log(error)
      console.log('Jetzt ist ein Fehler passiert');
    });
  }

  deleteRestaurant() {
    this.restaurantService.deleteRestaurant(this.restaurantToDelete).subscribe(ok => {
      console.log('Entfernen hat funktioniert');
      this.restaurants = this.restaurants.filter(restaurantsToFilter => restaurantsToFilter.id !== this.restaurantToDelete);
    }, error => {
      console.log('Es kam zu einem Fehler beim Entfernen');
    })
  }
}