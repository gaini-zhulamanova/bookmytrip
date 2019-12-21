import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Museum } from '../entity/museum';

@Injectable({
  providedIn: 'root'
})
export class MuseumService {

  private url = 'http://localhost:8080/book-my-trip/';
  constructor(private http: HttpClient) {}

  public getAll(city: string): Observable<Museum[]>{
    return this.http.get<Museum[]>(this.url + city + '/museums');
  }

  public show(city: string, id: number): Observable<Museum> {
    return this.http.get<Museum>(this.url + city + '/museums/' + id);
  }

  public showByName(city: string, name: string): Observable<Museum> {
    return this.http.get<Museum>(this.url + city + '/museums/search?name=' + name);
  }

  public showByFilter(city: string, 
                      type: string,
                      priceLevel: string,
                      rating: string): Observable<Museum[]> {

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
    return this.http.get<Museum[]>(this.url + city + '/museums/filter', {params: params});
  }

  public add(city: string, museum: Museum): Observable<Museum> {
    return this.http.post<Museum>(this.url + city + '/museums', museum);
  }

  public update(city: string, id: number, museum: Museum): Observable<any> {
      return this.http.put<any>(this.url + city + '/museums/' + id, museum);
  }

  public delete(city: string, id: number): Observable<any> {
    return this.http.delete<any>(this.url + city + '/museums/' + id);
  }
}
