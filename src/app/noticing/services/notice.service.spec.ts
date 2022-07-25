import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NoticeService } from './notice.service';

describe('NoticeService', () => {
  let service: NoticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(NoticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
