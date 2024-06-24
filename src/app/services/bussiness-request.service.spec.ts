import { TestBed } from '@angular/core/testing';

import { BussinessRequestService } from './bussiness-request.service';

describe('BussinessRequestService', () => {
  let service: BussinessRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BussinessRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
