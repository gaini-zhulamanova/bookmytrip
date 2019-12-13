import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWithFiltersComponent } from './page-with-filters.component';

describe('PageWithFiltersComponent', () => {
  let component: PageWithFiltersComponent;
  let fixture: ComponentFixture<PageWithFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageWithFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWithFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
