import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonNewEntryComponent } from './button-new-entry.component';

describe('ButtonNewEntryComponent', () => {
  let component: ButtonNewEntryComponent;
  let fixture: ComponentFixture<ButtonNewEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonNewEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonNewEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
