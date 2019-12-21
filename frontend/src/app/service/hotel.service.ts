import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../entity/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private url = 'http://localhost:8080/book-my-trip/';
  constructor(private http: HttpClient) {}

  public getAll(city: string): Observable<Hotel[]>{
    return this.http.get<Hotel[]>(this.url + city + '/hotels');
  }

  public showById(city: string, id: number): Observable<Hotel> {
    return this.http.get<Hotel>(this.url + city + '/hotels/' + id);
  }

  public showByName(city: string, name: string): Observable<Hotel> {
    return this.http.get<Hotel>(this.url + city + '/hotels/search?name=' + name);
  }

  public showByFilter(city: string,
                      type: string,
                      priceLevel: string,
                      rating: string): Observable<Hotel[]> {

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
    return this.http.get<Hotel[]>(this.url + city + '/hotels/filter', {params: params});
  }

  public add(city: string, hotel: Hotel): Observable<Hotel>{
    return this.http.post<Hotel>(this.url + city + '/hotels', hotel);
  }

  public update(city: string, id: number, hotel: Hotel): Observable<any> {
    return this.http.put<any>(this.url + city + '/hotels/' + id, hotel);
  }

  public delete(city: string, id: number): Observable<any> {
    return this.http.delete<any>(this.url + city + '/hotels/' + id);
  }
}
