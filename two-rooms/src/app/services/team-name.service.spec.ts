import { TestBed } from '@angular/core/testing'

import { TeamNameService } from './team-name.service'

describe('TeamNameService', () => {
  let service: TeamNameService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(TeamNameService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
