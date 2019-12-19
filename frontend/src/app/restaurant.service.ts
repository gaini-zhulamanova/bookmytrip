import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from './restaurant';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private url = 'http://localhost:8080/book-my-trip/Berlin/restaurants';
  constructor(private http: HttpClient) { }

  public addRestaurant(restaurants: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.url, restaurants);
  }

  public getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url);
  }

  public updateRestaurant(id: number, restaurant: Restaurant): Observable<any> {
    if (!restaurant) {
      return this.http.put<any>(this.url + '/' + id, {});
    } else {
      return this.http.put<any>(this.url + '/' + id, restaurant);
    }
  }

  public deleteRestaurant(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id);
  }
}

