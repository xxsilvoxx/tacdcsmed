import { TestBed } from '@angular/core/testing';

import { MedicamentoPessoaService } from './medicamento-pessoa.service';

describe('MedicamentoPessoaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicamentoPessoaService = TestBed.get(MedicamentoPessoaService);
    expect(service).toBeTruthy();
  });
});
