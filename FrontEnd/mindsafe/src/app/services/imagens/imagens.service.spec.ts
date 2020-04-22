import { TestBed } from '@angular/core/testing';

import { ImagensService } from './imagens.service';

describe('ImagensService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImagensService = TestBed.get(ImagensService);
    expect(service).toBeTruthy();
  });
});
