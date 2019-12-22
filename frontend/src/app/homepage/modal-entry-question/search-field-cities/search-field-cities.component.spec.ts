import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFieldCitiesComponent } from './search-field-cities.component';

describe('SearchFieldCitiesComponent', () => {
  let component: SearchFieldCitiesComponent;
  let fixture: ComponentFixture<SearchFieldCitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFieldCitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFieldCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
