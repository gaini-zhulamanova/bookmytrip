import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../service/review.service';
import { EntryService } from '../service/entry.service';
import { Review } from '../entity/review';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entry-item',
  templateUrl: './entry-item.component.html',
  styleUrls: ['./entry-item.component.css']
})
export class EntryItemComponent implements OnInit {

  city: string;
  entries: string;
  entryType: string;
  id: number;
  entry: any;
  reviews: Review[];
  entriesURL: string;

  constructor(private entryService: EntryService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.city = this.route.snapshot.params.city;
    this.entries = this.route.snapshot.params.entries;
    this.id = this.route.snapshot.params.id;

    this.entryService.showById(this.city, this.entries, this.id)
      .subscribe(entry => this.entry = entry);

    this.setEntryType();
  }

  setEntryType() {
    if(this.entries === 'restaurants') {
      this.entryType = 'Restaurant';
    } else if(this.entries === 'hotels') {
      this.entryType = 'Hotel';
    } else if(this.entries === 'museen') {
      this.entryType = 'Museum';
    }
  }

  entryTypeMatches(entryType: string): boolean {
    return this.entries === entryType;
  }

  isNull(element: any): boolean {
    return element === null || element === undefined
  }

  toReviewForm() {
    this.router.navigate(['book-my-trip', this.city, this.entries, this.id, 'bewertungen', 'neu'])
      .then(() => location.reload());
  }

  handleBackButton(){
    this.router.navigate(['book-my-trip', this.city, this.entries]);
  }
}
