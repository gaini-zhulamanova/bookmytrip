import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent implements OnInit, OnChanges {

  currentRate: string;
  @Input() ratingIn: string;
  @Output() ratingOut = new EventEmitter<string>();

  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = false;
   }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.currentRate = this.ratingIn;
  }

  isLastStar(index: number) {
    return index === 4;
  }

  onClick() {
    this.ratingOut.emit(this.currentRate);
  }
}
