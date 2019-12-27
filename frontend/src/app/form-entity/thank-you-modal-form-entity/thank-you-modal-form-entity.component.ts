import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-thank-you-modal-form-entity',
  templateUrl: './thank-you-modal-form-entity.component.html',
  styleUrls: ['./thank-you-modal-form-entity.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ThankYouModalFormEntityComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  ngOnInit() {
  }

}
