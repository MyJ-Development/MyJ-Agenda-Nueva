import { TestBed } from '@angular/core/testing';

import { PeticionesGetService } from './peticiones-get.service';

describe('PeticionesGetService', () => {
  let service: PeticionesGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeticionesGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
