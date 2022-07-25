import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { QueuesApiservices} from './queues-apiservices.ts.service';

describe('QueuesApiservices.TsService', () => {
  let service: QueuesApiservices

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(QueuesApiservices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
