import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Museum } from './museum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MuseumService {

  private url = 'http://localhost:8081/book-my-trip/Berlin/museums';
  constructor(private http: HttpClient) {}

  public index(): Observable<Museum[]> {
    return this.http.get<Museum[]>(this.url);
  }

  public show(id: number): Observable<Museum> {
    return this.http.get<Museum>(this.url + '/' + id);
  }

  public showByName(name: string): Observable<Museum> {
    return this.http.get<Museum>(this.url + '/search?name=' + name);
  }

  public showByFilter(
    type: string,
    priceLevel: string,
    rating: string
  )
  : Observable<Museum[]> {

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
    return this.http.get<Museum[]>(this.url + '/filter', {params: params});
  }

  public addMuseum(museum: Museum): Observable<Museum> {
    return this.http.post<Museum>(this.url, museum);
  }

  public updateMuseums(id: number, museum: Museum): Observable<any> {
    if (!museum) {
      return this.http.put<any>(this.url + '/' + id, {});
    } else {
      return this.http.put<any>(this.url + '/' + id, museum);
    }
  }

  public deleteMuseums(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id);
  }
}
