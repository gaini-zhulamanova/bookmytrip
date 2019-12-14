import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEntryQuestionComponent } from './modal-entry-question.component';

describe('ModalEntryQuestionComponent', () => {
  let component: ModalEntryQuestionComponent;
  let fixture: ComponentFixture<ModalEntryQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEntryQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEntryQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
