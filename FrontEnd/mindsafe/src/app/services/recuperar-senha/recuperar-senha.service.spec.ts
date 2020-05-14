import { TestBed } from '@angular/core/testing';

import { RecuperarSenhaService } from './recuperar-senha.service';

describe('RecuperarSenhaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecuperarSenhaService = TestBed.get(RecuperarSenhaService);
    expect(service).toBeTruthy();
  });
});
