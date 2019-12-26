import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FormComponent implements OnInit {

  city: string;
  entries: string;
  entryId: string;
  reviewId: string;

  rating: string;

  constructor(private modalService: NgbModal,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.city = this.route.snapshot.params.city;
    this.entries = this.route.snapshot.params.entries;
    this.entryId = this.route.snapshot.params.id;
    this.reviewId = this.route.snapshot.params.reviewId;
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, {centered: true});
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
