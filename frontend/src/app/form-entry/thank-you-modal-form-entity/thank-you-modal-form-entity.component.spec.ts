import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouModalFormEntityComponent } from './thank-you-modal-form-entity.component';

describe('ThankYouModalFormEntityComponent', () => {
  let component: ThankYouModalFormEntityComponent;
  let fixture: ComponentFixture<ThankYouModalFormEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThankYouModalFormEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankYouModalFormEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
