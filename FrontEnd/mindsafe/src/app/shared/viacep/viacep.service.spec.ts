import { TestBed } from '@angular/core/testing';

import { ViacepService } from './viacep.service';

describe('ViacepService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViacepService = TestBed.get(ViacepService);
    expect(service).toBeTruthy();
  });
});
