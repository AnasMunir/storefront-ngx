import { TestBed } from '@angular/core/testing';

import { FishryService } from './fishry.service';

describe('FishryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FishryService = TestBed.get(FishryService);
    expect(service).toBeTruthy();
  });
});
