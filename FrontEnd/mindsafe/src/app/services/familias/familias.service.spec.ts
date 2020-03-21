import { TestBed } from '@angular/core/testing';

import { FamiliasService } from './familias.service';

describe('FamiliasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FamiliasService = TestBed.get(FamiliasService);
    expect(service).toBeTruthy();
  });
});
