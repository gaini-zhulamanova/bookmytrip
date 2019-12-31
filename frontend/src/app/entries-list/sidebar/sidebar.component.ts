import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuisineService } from 'src/app/services/cuisine-service/cuisine.service';
import { MuseumTypeService } from 'src/app/services/museum-type-service/museum-type.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() selectedIcon: string;
  @Output() sortByOut = new EventEmitter<string>();
  @Output() directionOut = new EventEmitter<string>();
  @Output() sortButtonPressed = new EventEmitter<void>();

  sortBy: string = 'name';
  direction: string = 'ASC';

  options: string[];
  optionsTitle: string;
  priceLevelArray: string[];
  starsArray: string[];
  entries: string;
  city: string;

  //Query params
  checkedOption: string;
  cuisine: string;
  museumType:string;
  checkedRating: string;
  checkedPriceLevel: string;
  checkedStars: string;
  checkedBreakfastIncl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cuisineService: CuisineService,
              private museumTypeService: MuseumTypeService) { }

  ngOnInit() {
    this.entries = this.route.snapshot.params.entries;
    this.city = this.route.snapshot.params.city;

    this.initiliseFilter();
  }

  initiliseFilter() {
    if(!this.entryTypeMatches('hotels')) {
      this.priceLevelArray = ['Günstig','Mittel','Teuer'];
    }
    
    if(this.entryTypeMatches('hotels')) {
      this.starsArray = ['1 Stern','2 Sterne','3 Sterne','4 Sterne','5 Sterne'];
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

  chooseOption() {
    if(this.entryTypeMatches('restaurants')) {
      this.cuisine = this.checkedOption;
    } else if(this.entryTypeMatches('museen')) {
      this.museumType = this.checkedOption;
    }
  }

  handleChoice(option: string) {
    this.checkedOption = option;
  }

  handleFilter() {
    this.chooseOption();

    this.router.navigate(['book-my-trip', this.city, this.entries], 
      {queryParams: {küche: this.cuisine, bewertung: this.checkedRating, preisstufe: this.checkedPriceLevel,
                     frühstück: this.checkedBreakfastIncl, sterne: this.checkedStars, museumsart: this.museumType}})
      .then(() => window.location.reload())
      .then(() => window.scroll(0,0));        
  }

  isHighestRating(rating: number): boolean {
    return rating === 5;
  }

  hideChoice(): boolean {
    return this.options[0] === this.checkedOption 
            || this.options[1] === this.checkedOption
            || this.options[2] === this.checkedOption
            || this.checkedOption === undefined;
  }

  emitSortBy(sortBy: string) {
    this.sortByOut.emit(sortBy);
  }

  emitDirection(direction: string) {
    this.directionOut.emit(direction);
  }

  handleSort() {
    this.sortButtonPressed.emit(); 
  }

}
