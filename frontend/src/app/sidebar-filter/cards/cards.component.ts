import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntryService } from 'src/app/service/entry.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() entries: any[];
  entriesURL: string;
  city: string;

  isMouseOverIcon: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private entryService: EntryService) { }

  ngOnInit() {
    this.entriesURL = this.route.snapshot.params.entries;
    this.city = this.route.snapshot.params.city;
  }

  entryTypeMatches(entryType: string): boolean {
    return this.entriesURL === entryType;
  }

  toDetails(id: number) {
    this.router.navigate(['book-my-trip', this.city, this.entriesURL, id])
      .then(() => location.reload());
  }

  isIcon(isMouseOverIcon: boolean) {
    this.isMouseOverIcon = isMouseOverIcon;
  }

  onDelete(id: number) {
    this.entryService.delete(this.city, this.entriesURL, id)
      .subscribe(_ => window.location.reload());
  }

  toEntryForm(id: number) {
    console.log("Nun soll es zum Form gehen!");
    // this.router.navigate(['book-my-trip', ...])
  }
}
