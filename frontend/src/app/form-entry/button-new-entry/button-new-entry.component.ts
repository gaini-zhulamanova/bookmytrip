import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-button-new-entry',
  templateUrl: './button-new-entry.component.html',
  styleUrls: ['./button-new-entry.component.css']
})
export class ButtonNewEntryComponent implements OnInit {

  entriesURL: string;
  city: string;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.entriesURL = this.route.snapshot.params.entries;
    this.city = this.route.snapshot.params.city;
  }

  toForm() {
    if (this.city && this.entriesURL) {
      this.router.navigate(['book-my-trip', this.city, this.entriesURL, 'neu']);
    } else {
      this.router.navigate(['book-my-trip', 'neu']);
    } 
  }
}
