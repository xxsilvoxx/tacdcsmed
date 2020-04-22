import { TestBed } from '@angular/core/testing';

import { BairrosService } from './bairros.service';

describe('BairrosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BairrosService = TestBed.get(BairrosService);
    expect(service).toBeTruthy();
  });
});
