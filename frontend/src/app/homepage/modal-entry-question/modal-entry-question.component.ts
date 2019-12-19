import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modal-entry-question',
  templateUrl: './modal-entry-question.component.html',
  styleUrls: ['./modal-entry-question.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class ModalEntryQuestionComponent implements OnInit {

  city: string;

  constructor(private modalService: NgbModal,
              private router: Router) { }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  ngOnInit() {
  }

  toSidebarFilter(city: string) {
    this.router.navigate(['book-my-trip', city, 'restaurants']);
  }

}
