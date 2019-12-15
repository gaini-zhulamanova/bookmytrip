import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-with-filters',
  templateUrl: './page-with-filters.component.html',
  styleUrls: ['./page-with-filters.component.css']
})
export class PageWithFiltersComponent implements OnInit {

  showDiv = true;

   toggleSidebar() {
    if(this.showDiv === true){
      this.showDiv = false;
    } else {
      this.showDiv = true;
    }
  }

  constructor() {

   }


  ngOnInit() {
  }

}
