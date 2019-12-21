import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() entries: any[];
  entriesURL: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.entriesURL = this.route.snapshot.params.entries;
  }

  entryTypeMatches(entryType: string): boolean {
    return this.entriesURL === entryType;
  }

}
