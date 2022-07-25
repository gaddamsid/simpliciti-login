import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ClientManagementService } from './client-management.service';

describe('ClientManagementService', () => {
  let service: ClientManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ClientManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
