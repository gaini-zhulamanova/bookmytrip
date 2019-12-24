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
  optionsType: string;
  priceLevels: string[];
  stars: string[];
  entries: string;

  chosenOption: string;

  constructor(private route: ActivatedRoute,
              private cuisineService: CuisineService,
              private museumTypeService: MuseumTypeService) { }

  ngOnInit() {
    this.entries = this.route.snapshot.params.entries
    
    this.initiliseFilter();
  }

  initiliseFilter() {
    if(!this.entryTypeMatches('hotels')) {
      this.priceLevels = ['Günstig','Mittel','Teuer'];
    }
    
    if(this.entryTypeMatches('hotels')) {
      this.stars = ['1 Stern','2 Sterne','3 Sterne','4 Sterne','5 Sterne'];
    }

    if(this.entryTypeMatches('restaurants')) {
      this.optionsTitle = 'Küchen';
      this.cuisineService.getAll()
        .subscribe(cuisines => this.options = cuisines);
    }

    if(this.entryTypeMatches('museen')) {
      this.optionsTitle = 'Museumsarten';
      this.museumTypeService.getAll()
        .subscribe(museumTypes => this.options = museumTypes);
    }
  }

  entryTypeMatches(entries: string): boolean {
    return this.entries === entries;
  }


}
