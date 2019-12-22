import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CityService } from 'src/app/service/city.service';
import { Router } from '@angular/router';

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
              private router: Router) { }

  ngOnInit() {
    this.cityService.getAllCities()
      .subscribe(citiesList => this.cities = citiesList);        
  }

  chooseCity(city: string) {
    this.chosenCity.emit(city);
  }
}
