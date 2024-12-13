import { TestBed } from '@angular/core/testing';

import { GetAllBooksService } from './get-all-books.service';

describe('GetAllBooksService', () => {
  let service: GetAllBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
