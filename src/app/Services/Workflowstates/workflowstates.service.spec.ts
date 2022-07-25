import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { WorkflowstatesService } from './workflowstates.service';

describe('WorkflowstatesService', () => {
  let service: WorkflowstatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(WorkflowstatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
