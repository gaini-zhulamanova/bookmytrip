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
  id: number;
  entry: any;
  reviews: Review[];
  entriesURL: string;

  constructor(private entryService: EntryService,
              private reviewService: ReviewService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {

    this.city = this.route.snapshot.params.city;
    this.entries = this.route.snapshot.params.entries;
    this.id = this.route.snapshot.params.id;
    this.entriesURL = this.route.snapshot.params.entries;

    this.entryService.showById(this.city, this.entries, this.id)
      .subscribe(entry => this.entry = entry);

    this.reviewService.getAll(this.city, this.entries, this.id)
      .subscribe(reviews => this.reviews = reviews);

  }

  entryTypeMatches(entryType: string): boolean {
    return this.entriesURL === entryType;
  }

  toEntryForm(id: number) {
    this.router.navigate(['book-my-trip' + this.city + this.entries + this.id + '/' + 'bewertungen/' + 'neu']);
  }

  handleBackButton(){
    this.location.back();
  }
}
