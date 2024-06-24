import { TestBed } from '@angular/core/testing';

import { FundraiserRequestService } from './fundraiser-request.service';

describe('FundraiserRequestService', () => {
  let service: FundraiserRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundraiserRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
