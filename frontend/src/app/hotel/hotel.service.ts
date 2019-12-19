import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel } from './Hotel';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private url = 'http://localhost:8080/book-my-trip/Berlin/hotels';
  constructor(private http: HttpClient) { }

  public addHotel(hotels: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.url, hotels);
  }

  public getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.url);
  }

  
  public updateHotel(id: number, hotel: Hotel): Observable<any> {
    if (!hotel) {
      return this.http.put<any>(this.url + '/' + id, {});
    } else {
      return this.http.put<any>(this.url + '/' + id, hotel);
    }
  }


  public deleteHotel(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id);
  }
}


