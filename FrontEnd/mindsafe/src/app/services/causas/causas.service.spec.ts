import { TestBed } from '@angular/core/testing';

import { CausasService } from './causas.service';

describe('CausasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CausasService = TestBed.get(CausasService);
    expect(service).toBeTruthy();
  });
});
