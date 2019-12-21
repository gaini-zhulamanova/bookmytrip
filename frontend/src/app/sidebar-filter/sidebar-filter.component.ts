import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../service/restaurant.service';
import { MuseumService } from '../service/museum.service';
import { HotelService } from '../service/hotel.service';


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

  entries: any[];
  service: any;

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private route: ActivatedRoute,
              private restService: RestaurantService,
              private museumService: MuseumService,
              private hotelService: HotelService) {}

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
    this.nameOfEntry = this.route.snapshot.queryParams.name;

    this.getEntryType();

    if(this.nameOfEntry) {
      this.showByName(this.nameOfEntry);
    } else {
      this.getAll();
    }
  
  }

  getEntryType() {
    switch(this.entriesURL) {
      case "restaurants":
        this.service = this.restService;
        break;
      case "museen":
        this.service = this.museumService;
        break;
      case "hotels":
        this.service = this.hotelService;
        break;
      default:
        break;
    }
  }

  getAll(){
    this.service.getAll(this.city)
      .subscribe(e => this.entries = e);
  }

  showByName(searchText: string) {
    this.router.navigate(['book-my-trip', this.city, this.entriesURL], 
    {queryParams: {name: searchText}})

    this.service.showByName(this.city, searchText)
      .subscribe(e => this.entries = e);
  }
}
