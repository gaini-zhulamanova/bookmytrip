import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEntityComponent } from './form-entity.component';

describe('FormEntityComponent', () => {
  let component: FormEntityComponent;
  let fixture: ComponentFixture<FormEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
