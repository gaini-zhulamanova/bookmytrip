import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Restaurant } from '../entity/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private url = 'http://localhost:8080/book-my-trip/';
  constructor(private http: HttpClient) {}

  public getAll(city: string, entries: string): Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>(this.url + city + '/' + entries);
  }

  public showById(id: number, city: string, entries: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.url + city + '/' + entries + '/' + id);
  }

  public showByName(name: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.url + '/search?name=' + name);
  }

  public showByFilter(
    type: string,
    priceLevel: string,
    rating: string
  ): Observable<Restaurant[]> {

    let params = new HttpParams();
    if (type) {
      params = params.append('type', type);
    }
    if (priceLevel) {
      params = params.append('priceLevel', priceLevel);
    }
    if (rating) {
      params = params.append('rating', rating);
    }    
    return this.http.get<Restaurant[]>(this.url + '/filter', {params: params});
  }

  public addRestaurant(restaurants: Restaurant): Observable<Restaurant>{
    return this.http.post<Restaurant>(this.url, restaurants);
  }

  public updateRestaurant(id: number, restaurant: Restaurant, city: string, entries: string): Observable<any> {
    return this.http.put<any>(this.url + city + '/' + entries + '/' + id, restaurant);
  }

  public deleteRestaurant(id: number, city: string, entries: string): Observable<any> {
    return this.http.delete<any>(this.url + city + '/' + entries + '/' + id);
  }
}
