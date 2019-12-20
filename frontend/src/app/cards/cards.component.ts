import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '../entity/restaurant';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() entries: any[];

  constructor() { }

  ngOnInit() {
  }

}
