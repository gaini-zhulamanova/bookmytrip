import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonNewEntryItemComponent } from './button-new-entry-item.component';

describe('ButtonNewEntryItemComponent', () => {
  let component: ButtonNewEntryItemComponent;
  let fixture: ComponentFixture<ButtonNewEntryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonNewEntryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonNewEntryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
