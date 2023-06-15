import { TestBed } from '@angular/core/testing';

import { SellersServiceService } from './sellers-service.service';

describe('SellersServiceService', () => {
  let service: SellersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
