import { TestBed } from '@angular/core/testing'

import { BookThisService } from './book-this.service'

describe('BookThisService', () => {
  let service: BookThisService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(BookThisService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
