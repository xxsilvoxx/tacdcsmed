import { TestBed } from '@angular/core/testing';

import { UbsService } from './ubs.service';

describe('UbsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UbsService = TestBed.get(UbsService);
    expect(service).toBeTruthy();
  });
});
