import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent implements OnInit {

    ctrl = new FormControl(null, Validators.required);

  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }

  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = false;
   }

  ngOnInit() {
  }

}
