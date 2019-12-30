import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-thank-you-modal',
  templateUrl: './thank-you-modal.component.html',
  styleUrls: ['./thank-you-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ThankYouModalComponent implements OnInit {

  @Input() successfulPostIn: boolean;
  @Output() successfulPostOut = new EventEmitter<void>();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openVerticallyCentered(content) {
    if(this.successfulPostIn) {
      this.successfulPostOut.emit();
      this.modalService.open(content, {centered: true});
    } else {
      window.scroll(0, 0);
    }
  }

}
