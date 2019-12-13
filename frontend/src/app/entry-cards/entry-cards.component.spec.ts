import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryCardsComponent } from './entry-cards.component';

describe('EntryCardsComponent', () => {
  let component: EntryCardsComponent;
  let fixture: ComponentFixture<EntryCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
