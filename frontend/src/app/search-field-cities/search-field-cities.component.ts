import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-field-cities',
  templateUrl: './search-field-cities.component.html',
  styleUrls: ['./search-field-cities.component.css']
})
export class SearchFieldCitiesComponent implements OnInit {

  searchText: string;
  dataset = ['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt am Main', 'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dortmund', 'Essen'];

  constructor() { }

  ngOnInit() {
  }

}
