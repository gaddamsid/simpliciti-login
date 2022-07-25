import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CourtschedulingService } from './courtscheduling.service';

describe('CourtschedulingService', () => {
  let service: CourtschedulingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CourtschedulingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
