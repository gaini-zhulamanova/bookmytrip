import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntryService } from '../services/entry-service/entry.service';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.css']
})
export class EntriesListComponent {

  city: string;
  entriesURL: string;
  nameOfEntry: string;
  
  //Query params
  rating: string;
  priceLevel: string;
  cuisine: string;
  breakfast: string;
  stars: string;
  museumType:string;

  entries: any[];

  isMouseOverSortIcon: boolean;
  isMouseOverFilterIcon: boolean;
  selectedIcon: string;

  isSideNavOpen: boolean;
  sortBy: string;
  direction: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private entryService: EntryService) {} 

  ngOnInit() {    
    this.city = this.route.snapshot.params.city;
    this.entriesURL = this.route.snapshot.params.entries;

    this.route.queryParams.subscribe(params => {
      this.nameOfEntry = params['name'];
      this.rating = params['bewertung'];
      this.priceLevel = params['preisstufe'];
      this.cuisine = params['küche'];
      this.breakfast = params['frühstück'];
      this.stars = params['sterne'];
      this.museumType = params['museumsart'];
    });

    if(this.nameOfEntry) {
      this.showByName(this.nameOfEntry);
    } else if (this.rating || this.priceLevel || this.cuisine ||
               this.breakfast || this.stars || this.museumType) {
      this.showByFilter();
    } else {
      this.getAll();
    }

    this.sortBy = 'name';
    this.direction = 'ASC';
  }

  getAll(){
    this.entryService.getAll(this.city, this.entriesURL)
    .subscribe(e => {this.entries = e;
                     this.sortArray()});
  }

  showByName(searchText: string) {
    this.router.navigate(['book-my-trip', this.city, this.entriesURL], 
      {queryParams: {name: searchText}})

    this.entryService.showByName(this.city, this.entriesURL, searchText)
      .subscribe(e => {this.entries = e;
                       this.sortArray()});
  }

  showByFilter() {
    this.router.navigate(['book-my-trip', this.city, this.entriesURL], 
      {queryParams: {küche: this.cuisine, bewertung: this.rating, preisstufe: this.priceLevel,
                     frühstück: this.breakfast, sterne: this.stars, museumsart: this.museumType}});

    this.entryService.showByFilter(this.city, this.entriesURL, this.cuisine, 
      this.rating, this.priceLevel, this.breakfast, this.stars, this.museumType)
        .subscribe(e => {this.entries = e;
                         this.sortArray()});
  }

  sortArray() {
    this.isSideNavOpen = false;

    this.entries = this.entries.sort((e1,e2) => {
      if (this.transformForSort(e1, this.sortBy) > this.transformForSort(e2, this.sortBy)) {
        return this.directionCheck(this.direction);
      }
      if (this.transformForSort(e1, this.sortBy) < this.transformForSort(e2, this.sortBy)) {
        return - this.directionCheck(this.direction);
      }
      return 0;
    });
  }

  transformForSort(entry: any, sortBy:string) {
    if(sortBy === 'name') {
      return entry[sortBy].toLowerCase();
    }
    return entry[sortBy];
  }

  directionCheck(direction: string) {
    if(direction === 'DESC') {
      return -1
    }
    return 1;
  }
  
  isFilter(isMouseOverFilterIcon: boolean) {
    this.isMouseOverFilterIcon = isMouseOverFilterIcon;
    if(this.isMouseOverFilterIcon) {
      this.selectedIcon = 'filter';
    }
  }

  isSort(isMouseOverSortIcon: boolean) {
    this.isMouseOverSortIcon = isMouseOverSortIcon;
    if(this.isMouseOverSortIcon) {
      this.selectedIcon = 'sort';
    }
  }

  setSortBy(sortBy: string) {
    this.sortBy = sortBy;
  }

  setDirection(direction: string) {
    this.direction = direction;
  }
}
