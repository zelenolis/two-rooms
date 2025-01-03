import { TestBed } from '@angular/core/testing';

import { CheckRepeatDatesService } from './check-repeat-dates.service';

describe('CheckRepeatDatesService', () => {
  let service: CheckRepeatDatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckRepeatDatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
