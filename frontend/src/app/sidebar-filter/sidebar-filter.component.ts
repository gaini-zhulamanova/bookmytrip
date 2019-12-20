import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../service/restaurant.service';
import { Restaurant } from '../entity/restaurant';
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

  entries: any[];

  constructor(private breakpointObserver: BreakpointObserver,
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
    this.city = this.route.snapshot.paramMap.get('city');
    this.entriesURL = this.route.snapshot.paramMap.get('entries');

    // this.showAll();
    this.setEntryType();
  }

  showAll() {
    this.restService.getAll(this.city, this.entriesURL)
      .subscribe(r => this.entries = r);
  }

  setEntryType() {
    switch(this.entriesURL) {
      case "restaurants":
        this.restService.getAll(this.city, this.entriesURL)
          .subscribe(r => this.entries = r);
        break;
      case "museen":
        this.museumService.getAll(this.city, this.entriesURL)
          .subscribe(r => this.entries = r);
        break;
      // case "hotels":
      //   this.hotelService.getAll(this.city, this.entriesURL)
      //     .subscribe(r => this.entries = r);
      //   break;
      default:
        break;
    }
  }
}
