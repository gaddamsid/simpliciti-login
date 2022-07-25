import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PaymentIvrService } from './payment-ivr.service';

describe('PaymentIvrService', () => {
  let service: PaymentIvrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PaymentIvrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
