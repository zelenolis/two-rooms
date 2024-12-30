import { TestBed } from '@angular/core/testing';

import { PushNewBookService } from './push-new-book.service';

describe('PushNewBookService', () => {
  let service: PushNewBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PushNewBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
