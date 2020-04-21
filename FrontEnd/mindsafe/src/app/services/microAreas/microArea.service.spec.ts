import { TestBed } from '@angular/core/testing';

import {  MicroAreasService } from './microArea.service';

describe('MicroAreasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MicroAreasService = TestBed.get(MicroAreasService);
    expect(service).toBeTruthy();
  });
});
