import { TestBed } from '@angular/core/testing';

import { UpcomingExamsService } from './upcoming-exams.service';

describe('UpcomingExamsService', () => {
  let service: UpcomingExamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpcomingExamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
