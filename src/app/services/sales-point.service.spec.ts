import { TestBed } from '@angular/core/testing';

import { SalesPointService } from './sales-point.service';

describe('SalesPointService', () => {
  let service: SalesPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
