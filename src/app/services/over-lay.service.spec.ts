import { TestBed } from '@angular/core/testing';

import { OverLayService } from './over-lay.service';

describe('OverLayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OverLayService = TestBed.get(OverLayService);
    expect(service).toBeTruthy();
  });
});
