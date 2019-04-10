import { TestBed } from '@angular/core/testing';

import { OcenyService } from './oceny.service';

describe('OcenyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OcenyService = TestBed.get(OcenyService);
    expect(service).toBeTruthy();
  });
});
