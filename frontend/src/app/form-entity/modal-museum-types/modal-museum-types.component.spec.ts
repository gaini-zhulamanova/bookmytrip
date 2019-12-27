import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMuseumTypesComponent } from './modal-museum-types.component';

describe('ModalMuseumTypesComponent', () => {
  let component: ModalMuseumTypesComponent;
  let fixture: ComponentFixture<ModalMuseumTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMuseumTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMuseumTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
