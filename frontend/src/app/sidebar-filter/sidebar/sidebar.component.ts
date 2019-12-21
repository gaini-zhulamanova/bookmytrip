import { Component, OnInit } from '@angular/core';
import { CuisineService } from 'src/app/service/cuisine.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  cuisines: string[];
  priceLevels: string[];
  entries: string;
  museumTypes: string;

  constructor(private route: ActivatedRoute,
              private cuisineService: CuisineService) { }

  ngOnInit() {
    this.entries = this.route.snapshot.params.entries
    
    this.initiliseFilter();
  }

  initiliseFilter() {
    if(this.entries === 'restaurants' || this.entries === 'museen') {
      this.priceLevels = ['Günstig','Mittel','Teuer'];
    }
    if(this.entries === 'restaurants') {
      this.cuisineService.getAll()
        .subscribe(cuisines => this.cuisines = cuisines);
    }
  }

}
