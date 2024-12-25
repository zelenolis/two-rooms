import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class TeamNameService {
  private teamName = 'team0'

  setName(name: string) {
    this.teamName = name
  }

  getName(): string {
    /// if name '' check local storage if no -> load from server
    return this.teamName
  }
}
