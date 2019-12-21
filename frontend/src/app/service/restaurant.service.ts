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

  public getAll(city: string): Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>(this.url + city + '/restaurants');
  }

  public showById(city: string, id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.url + city + '/restaurants/' + id);
  }

  public showByName(city: string, name: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url + city + '/restaurants/search?name=' + name);
  }

  public showByFilter(city: string,
                      type: string,
                      priceLevel: string,
                      rating: string): Observable<Restaurant[]> {

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
    return this.http.get<Restaurant[]>(this.url + city + '/restaurants/filter', {params: params});
  }

  public add(city: string, restaurants: Restaurant): Observable<Restaurant>{
    return this.http.post<Restaurant>(this.url + city + '/restaurants', restaurants);
  }

  public update(city: string, id: number, restaurant: Restaurant): Observable<any> {
    return this.http.put<any>(this.url + city + '/restaurants/' + id, restaurant);
  }

  public delete(city: string, id: number): Observable<any> {
    return this.http.delete<any>(this.url + city + '/restaurants/' + id);
  }
}
