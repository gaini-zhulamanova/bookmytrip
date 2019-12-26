import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { EntryService } from '../service/entry.service';
import { ReviewService } from '../service/review.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FormComponent implements OnInit {

  city: string;
  entries: string;
  entryId: number;
  reviewId: number;

  entry: any;
  entryType: string;

  rating: string;

  constructor(private modalService: NgbModal,
              private route: ActivatedRoute,
              private router: Router,
              private entryService: EntryService,
              private reviewService: ReviewService) { }

  openVerticallyCentered(content) {
    this.modalService.open(content, {centered: true});
  }

  ngOnInit() {
    this.city = this.route.snapshot.params.city;
    this.entries = this.route.snapshot.params.entries;
    this.entryId = this.route.snapshot.params.id;
    this.reviewId = this.route.snapshot.params.reviewId;

    this.entryService.showById(this.city, this.entries, this.entryId)
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

  setRating(rating: string) {
    this.rating = rating;
    console.log(this.rating);
  }

  cancel() {
    this.router.navigate(['book-my-trip', this.city, this.entries, this.entryId])
  }

  submit() {

  }

}
