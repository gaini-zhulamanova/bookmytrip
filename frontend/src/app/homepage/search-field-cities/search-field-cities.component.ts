import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CityService } from 'src/app/service/city.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-field-cities',
  templateUrl: './search-field-cities.component.html',
  styleUrls: ['./search-field-cities.component.css']
})
export class SearchFieldCitiesComponent implements OnInit {

  cities: string[];

  chosenCity: string;

  searchText: string;

  constructor(private modalService: NgbModal, private cityService: CityService,
              private router: Router) { }

  ngOnInit() {
    this.cityService.getAllCities()
      .subscribe(citiesList => this.cities = citiesList);        
  }

  chooseCity(city: string) {
    this.chosenCity = city;
  }

  toSidebarFilter() {
    this.router.navigate(['book-my-trip', this.chosenCity, 'restaurants']);
  }
}
