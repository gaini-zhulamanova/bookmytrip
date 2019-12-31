import { Component, OnInit, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/entity-models/review.model';
import { ReviewService } from 'src/app/services/review-service/review.service';
import { EntryService } from 'src/app/services/entry-service/entry.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  city: string;
  entries: string;
  id: number;

  @Input() entry: any;
  reviews: Review[];

  constructor(config: NgbRatingConfig,
              private router: Router,
              private route: ActivatedRoute,
              private reviewService: ReviewService,
              private entryService: EntryService) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {

    this.city = this.route.snapshot.params.city;
    this.entries = this.route.snapshot.params.entries;
    this.id = this.route.snapshot.params.id;

    this.reviewService.getAll(this.city, this.entries, this.id)
      .subscribe(reviews => this.reviews = reviews);
  }
  
  toReviewForm(reviewId: number) {
    this.router.navigate(['book-my-trip', this.city, this.entries, this.id, 
      'bewertungen', reviewId, 'editieren']);
  }

  updateEntry() {
    this.entryService.update(this.city, this.entries, this.id, this.entry)
      .subscribe(entry => entry);
  }

  onDelete(reviewId: number) {
    this.reviewService.delete(this.city, this.entries, this.id, reviewId)
        .subscribe(_ => {this.updateEntry();
                        location.reload()});
  }
}
