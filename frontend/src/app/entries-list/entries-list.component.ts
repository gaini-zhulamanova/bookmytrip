import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { EntryService } from '../services/entry-service/entry.service';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.css']
})
export class EntriesListComponent {

  isCollapsed = false;

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

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private route: ActivatedRoute,
              private entryService: EntryService) {}

  drawerToggle(){
    this.isCollapsed = !this.isCollapsed;
  }

 /*  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    ); */  

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
  }

  getAll(){
    this.entryService.getAll(this.city, this.entriesURL)
      .subscribe(e => this.entries = e);
  }

  showByName(searchText: string) {
    this.router.navigate(['book-my-trip', this.city, this.entriesURL], 
      {queryParams: {name: searchText}})

    this.entryService.showByName(this.city, this.entriesURL, searchText)
      .subscribe(e => this.entries = e);
  }

  showByFilter() {
    this.router.navigate(['book-my-trip', this.city, this.entriesURL], 
      {queryParams: {küche: this.cuisine, bewertung: this.rating, preisstufe: this.priceLevel,
                     frühstück: this.breakfast, sterne: this.stars, museumsart: this.museumType}});

    this.entryService.showByFilter(this.city, this.entriesURL, this.cuisine, 
      this.rating, this.priceLevel, this.breakfast, this.stars, this.museumType)
      .subscribe(e => this.entries = e);
  }

  sortArray(sortBy: string, direction: string) {
    this.entries = this.entries.sort((e1,e2) => {
      if (this.transformForSort(e1, sortBy) > this.transformForSort(e2, sortBy)) {
        return this.directionCheck(direction);
      }
      if (this.transformForSort(e1, sortBy) < this.transformForSort(e2, sortBy)) {
        return - this.directionCheck(direction);
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
}
