import { Component, OnInit, Input } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/service/review.service';
import { Review } from 'src/app/entity/review';
import { EntryService } from 'src/app/service/entry.service';

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
      'bewertungen', reviewId, 'editieren'])
      .then(() => location.reload());
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
