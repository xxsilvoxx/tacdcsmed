import { TestBed } from '@angular/core/testing';

import { ResidenciasService } from './residencias.service';

describe('ResidenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResidenciasService = TestBed.get(ResidenciasService);
    expect(service).toBeTruthy();
  });
});
