import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMoreOptionsComponent } from './filter-more-options.component';

describe('FilterMoreOptionsComponent', () => {
  let component: FilterMoreOptionsComponent;
  let fixture: ComponentFixture<FilterMoreOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterMoreOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMoreOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
