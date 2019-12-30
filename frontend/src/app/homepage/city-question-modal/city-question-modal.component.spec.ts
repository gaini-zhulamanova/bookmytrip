import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityQuestionModalComponent } from './city-question-modal.component';

describe('CityQuestionModalComponent', () => {
  let component: CityQuestionModalComponent;
  let fixture: ComponentFixture<CityQuestionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityQuestionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityQuestionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
