import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-museum-types',
  templateUrl: './modal-museum-types.component.html',
  styleUrls: ['./modal-museum-types.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalMuseumTypesComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  ngOnInit() {
  }

}
