import { TestBed } from '@angular/core/testing';

import { CausaPessoaService } from './causa-pessoa.service';

describe('CausaPessoaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CausaPessoaService = TestBed.get(CausaPessoaService);
    expect(service).toBeTruthy();
  });
});
