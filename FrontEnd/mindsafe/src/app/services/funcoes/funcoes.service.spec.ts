import { TestBed } from '@angular/core/testing';

import { FuncoesService } from './funcoes.service';

describe('FuncoesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FuncoesService = TestBed.get(FuncoesService);
    expect(service).toBeTruthy();
  });
});
