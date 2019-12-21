import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { EntryService } from '../service/entry.service';

@Component({
  selector: 'app-sidebar-filter',
  templateUrl: './sidebar-filter.component.html',
  styleUrls: ['./sidebar-filter.component.css']
})
export class SidebarFilterComponent {

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
  type:string;

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
      this.type = params['typ'];
    });

    if(this.nameOfEntry) {
      this.showByName(this.nameOfEntry);
    } else if (this.rating || this.priceLevel || this.cuisine ||
               this.breakfast || this.stars || this.type) {
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
                     frühstück: this.breakfast, sterne: this.stars, typ: this.type}});

    this.entryService.showByFilter(this.city, this.entriesURL, this.cuisine, 
      this.rating, this.priceLevel, this.breakfast, this.stars, this.type)
      .subscribe(e => this.entries = e);
  }
}
