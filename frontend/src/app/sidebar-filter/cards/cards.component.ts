import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() entries: any[];
  entriesURL: string;
  city: string;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.entriesURL = this.route.snapshot.params.entries;
    this.city = this.route.snapshot.params.city;
  }

  entryTypeMatches(entryType: string): boolean {
    return this.entriesURL === entryType;
  }

  toDetails(id: number) {
    this.router.navigate(['book-my-trip', this.city, this.entriesURL, id]);
  }
}
