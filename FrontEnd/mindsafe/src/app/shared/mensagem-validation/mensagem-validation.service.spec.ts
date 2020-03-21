import { TestBed } from '@angular/core/testing';

import { MensagemValidationService } from './mensagem-validation.service';

describe('MensagemValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MensagemValidationService = TestBed.get(MensagemValidationService);
    expect(service).toBeTruthy();
  });
});
