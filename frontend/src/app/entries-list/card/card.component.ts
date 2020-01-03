import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntryService } from 'src/app/services/entry-service/entry.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

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
    .then(() => window.location.reload())
    .then(() => window.scroll(0,0));
  }

  isIcon(isMouseOverIcon: boolean) {
    this.isMouseOverIcon = isMouseOverIcon;
  }

  onDelete(id: number) {
    this.entryService.delete(this.city, this.entriesURL, id)
      .subscribe(_ => window.location.reload());
  }

  toEntryForm(id: number) {
    this.router.navigate(['book-my-trip', this.city, this.entriesURL, id, 'editieren']);
  }
}
