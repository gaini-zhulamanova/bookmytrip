import { TestBed } from '@angular/core/testing';

import { MuseumTypeService } from './museum-type.service';

describe('MuseumTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MuseumTypeService = TestBed.get(MuseumTypeService);
    expect(service).toBeTruthy();
  });
});
