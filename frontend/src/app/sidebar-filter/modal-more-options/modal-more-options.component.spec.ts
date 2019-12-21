import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMoreOptionsComponent } from './modal-more-options.component';

describe('ModalMoreOptionsComponent', () => {
  let component: ModalMoreOptionsComponent;
  let fixture: ComponentFixture<ModalMoreOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMoreOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMoreOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
