import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent implements OnInit {

  currentRate: string;
  @Output() rating = new EventEmitter<string>();

  constructor(config: NgbRatingConfig) {
    config.max = 5;
   }

  ngOnInit() {
  }

  onClick() {
    this.rating.emit(this.currentRate);
  }
}
