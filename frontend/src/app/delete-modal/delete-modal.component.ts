import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DeleteModalComponent implements OnInit {

  @Input() elementId: number;
  @Output() isMouseOverIcon = new EventEmitter<boolean>();
  @Output() deleteElementById = new EventEmitter<number>();
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, {centered: true});
  }

  setChoice(isDelete: boolean) {
    if(isDelete){
      this.deleteElementById.emit(this.elementId);
    } else {
      this.modalService.dismissAll();
    }
  }

  isIcon(isIcon: boolean) {
    this.isMouseOverIcon.emit(isIcon);
  }
}
