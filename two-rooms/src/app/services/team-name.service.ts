import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamNameService {

  private teamName = 'no team'
  
  setName(name: string) {
    this.teamName = name
  }

  getName(): string {
    return this.teamName
  }
}
