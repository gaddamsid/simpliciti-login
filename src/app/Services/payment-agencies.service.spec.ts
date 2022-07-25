import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PaymentAgenciesService } from './payment-agencies.service';

describe('PaymentAgenciesService', () => {
  let service: PaymentAgenciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PaymentAgenciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
