import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { EntryService } from '../service/entry.service';
import { ReviewService } from '../service/review.service';
import { Review } from '../entity/review';
import { resolve } from 'url';

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
  reviewerName: string;
  reviewTitle: string;
  comment: string;
  dateTime: string;

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

  valideUserInput(): boolean {
    return this.rating !== undefined && 
           (this.reviewTitle !== undefined && this.reviewTitle !== '');
  }

  setRating(rating: string) {
    this.rating = rating;
  }

  setDateTime() {
    const options = {day: 'numeric', month: 'short', year: 'numeric', 
                     hour: 'numeric', minute: 'numeric'};
    this.dateTime = new Date().toLocaleString('de-DE', options);
  }

  setReviewerName() {
    if(this.reviewerName === undefined || this.reviewerName === '') {
      this.reviewerName = 'Anonym';
    }
  }

  buildReview(): Review {
    let review: Review = {
      entry: {id: this.entryId},
      rating: +this.rating,
      comment: this.comment,
      reviewerName: this.reviewerName,
      reviewTitle: this.reviewTitle,
      dateTime: this.dateTime
    };
    return review;
  }

  updateEntry() {
    this.entryService.update(this.city, this.entries, this.entryId, this.entry)
      .subscribe(entry => entry);
  }

  navigateAfterSuccessfulSubmission() {
    setTimeout(() =>
      {this.modalService.dismissAll('content');
      this.router.navigate(['book-my-trip', this.city, this.entries, this.entryId]);
      }, 2500);
  }

  handleSubmission() {
    this.setDateTime();
    this.setReviewerName();

    this.reviewService.add(this.city, this.entries, this.entryId, this.buildReview())
      .subscribe(review => {this.updateEntry();
        this.navigateAfterSuccessfulSubmission()});
  }

  cancel() {
    this.router.navigate(['book-my-trip', this.city, this.entries, this.entryId])
  }
}
