import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal-more-options',
  templateUrl: './modal-more-options.component.html',
  styleUrls: ['./modal-more-options.component.css'],
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
export class ModalMoreOptionsComponent implements OnInit {

  entries: string;
  choice: string;
  @Input() options: string[];

  constructor(private modalService: NgbModal,
              private route: ActivatedRoute) { }

  openVerticallyCentered(content) {
    this.modalService.open(content, {centered: true});
  }

  ngOnInit() {
    this.entries = this.route.snapshot.params.entries;
    if(this.entries === "restaurants") {
      this.choice = "Küche";
    } else if (this.entries === "museen") {
      this.choice = "Museumsart";
    }
  }

  chooseOption(option: string) {
    
  }

}
