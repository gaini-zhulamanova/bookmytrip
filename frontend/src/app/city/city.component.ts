import { Component, OnInit } from '@angular/core';
import { CityService } from './city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  cities: string[] = [];

  constructor(private cityService: CityService) {}

  ngOnInit() {
    this.cityService.getAllCities()
      .subscribe(citiesList => this.cities = citiesList);
  }
}
