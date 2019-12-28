import { Component, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/service/review.service';
import { Review } from 'src/app/entity/review';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  city: string;
  entry: any;
  entries: string;
  entryId: number;
  id: number;

  reviews: Review[];
  rating: string;
  reviewerName: string;
  reviewTitle: string;
  comment: string;
  dateTime: string;

  isMouseOverIcon: boolean;

  constructor(config: NgbRatingConfig,
              private router: Router,
              private route: ActivatedRoute,
              private reviewService: ReviewService) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {

    this.city = this.route.snapshot.params.city;
    this.entries = this.route.snapshot.params.entries;
    this.id = this.route.snapshot.params.id;
    this.entryId = this.route.snapshot.params.entryId;

    this.reviewService.getAll(this.city, this.entries, this.entryId)
      .subscribe(reviews => this.reviews = reviews);
  }
  
  toEntryForm(id: number) {
    this.router.navigate(['book-my-trip' + this.city + this.entries + this.id + '/' + 'bewertungen/' + 'neu']);
  }

  onDelete(id: number) {
    console.log("Nun soll das Element gelöscht werden, vorher aber vllt Fragen ob man sich sicher ist?");
    // this.entryService.delete(this.city, this.entriesURL, id)
    //   .subscribe(_ => window.location.reload());
  }

  isIcon(isMouseOverIcon: boolean) {
    this.isMouseOverIcon = isMouseOverIcon;
  }
}
