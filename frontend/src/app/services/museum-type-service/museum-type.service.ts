import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MuseumTypeService {

  private url = 'http://localhost:8080/book-my-trip/museum-types';
  constructor(private http: HttpClient) { }

  public getAll(): Observable<string[]>{
    return this.http.get<string[]>(this.url);
  }
}
