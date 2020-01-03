import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from 'src/app/services/city-service/city.service';

@Component({
  selector: 'app-search-field-cities',
  templateUrl: './search-field-cities.component.html',
  styleUrls: ['./search-field-cities.component.css']
})
export class SearchFieldCitiesComponent implements OnInit {

  cities: string[];
  @Output() chosenCity = new EventEmitter<string>();
  searchText: string;

  constructor(private cityService: CityService,
              private router: Router) {}

  ngOnInit() {
    this.cityService.getAllCities()
      .subscribe(citiesList => this.cities = citiesList);        
  }

  chooseCity(city: string) {
    this.chosenCity.emit(city);
  }
}
