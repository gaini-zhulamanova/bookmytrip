import { Component, OnInit } from '@angular/core';
import { CuisineService } from 'src/app/service/cuisine.service';
import { ActivatedRoute } from '@angular/router';
import { MuseumTypeService } from 'src/app/service/museum-type.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  options: string[];
  optionsTitle: string;
  priceLevels: string[];
  showPriceLevel: boolean = false;
  stars: number[];
  isHotelCategory: boolean = false;
  entries: string;

  constructor(private route: ActivatedRoute,
              private cuisineService: CuisineService,
              private museumTypeService: MuseumTypeService) { }

  ngOnInit() {
    this.entries = this.route.snapshot.params.entries
    
    this.initiliseFilter();
  }
  

  initiliseFilter() {
    if(this.entries === 'restaurants' || this.entries === 'museen') {
      this.priceLevels = ['Günstig','Mittel','Teuer'];
      this.showPriceLevel = true;
    }
    
    if(this.entries === 'hotels') {
      this.isHotelCategory = true;
      this.stars = [1,2,3,4,5];
    }

    if(this.entries === 'restaurants') {
      this.optionsTitle = 'Küchen';
      this.cuisineService.getAll()
        .subscribe(cuisines => this.options = cuisines);
    }

    if(this.entries === 'museen') {
      this.optionsTitle = 'Museumsarten';
      this.museumTypeService.getAll()
        .subscribe(museumTypes => this.options = museumTypes);
    }
  }

}
