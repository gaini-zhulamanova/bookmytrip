import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCardsComponent } from './city-cards.component';

describe('CityCardsComponent', () => {
  let component: CityCardsComponent;
  let fixture: ComponentFixture<CityCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
